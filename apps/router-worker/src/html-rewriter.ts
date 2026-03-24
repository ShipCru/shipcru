// Two modes:
// - 'include': force hard nav for paths IN the list (used on Vercel pages — list = migrated paths)
// - 'exclude': force hard nav for paths NOT IN the list (used on Cloudflare pages — list = migrated paths)
// Both modes use the same migrated paths list, just inverted logic. Only one list to maintain.
type InterceptMode = 'include' | 'exclude'

class NavigationInterceptor implements HTMLRewriterElementContentHandlers {
  private paths: string[]
  private mode: InterceptMode

  constructor(paths: string[], mode: InterceptMode) {
    this.paths = paths
    this.mode = mode
  }

  element(element: Element) {
    element.prepend(
      `<script>
(function() {
  var paths = ${JSON.stringify(this.paths)};
  var mode = "${this.mode}";

  function matchesPaths(href) {
    var clean = href.split('?')[0].split('#')[0];
    return paths.some(function(p) {
      if (p.endsWith('/*')) {
        var prefix = p.slice(0, -2);
        return clean === prefix || clean.indexOf(prefix + '/') === 0;
      }
      return clean === p;
    });
  }

  function shouldForceHardNav(href) {
    if (!href || !href.startsWith('/')) return false;
    // 'include' mode: force hard nav if href IS in the list (navigating TO a migrated page)
    // 'exclude' mode: force hard nav if href is NOT in the list (navigating AWAY from migrated pages)
    return mode === 'include' ? matchesPaths(href) : !matchesPaths(href);
  }

  // 1. Click interceptor (capture phase — fires before React)
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href');
    if (shouldForceHardNav(href)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      window.location.href = href;
    }
  }, true);

  // 2. history.pushState patch (catches router.push)
  var origPush = history.pushState.bind(history);
  history.pushState = function(state, title, url) {
    if (url && shouldForceHardNav(String(url))) {
      window.location.href = String(url);
      return;
    }
    return origPush(state, title, url);
  };

  var origReplace = history.replaceState.bind(history);
  history.replaceState = function(state, title, url) {
    if (url && shouldForceHardNav(String(url))) {
      window.location.href = String(url);
      return;
    }
    return origReplace(state, title, url);
  };
})();
</script>`,
      { html: true },
    )
  }
}

export function injectNavigationInterceptor(
  response: Response,
  migratedPaths: string[],
  mode: InterceptMode,
): Response {
  const contentType = response.headers.get('Content-Type') || ''
  if (!contentType.includes('text/html')) return response

  return new HTMLRewriter()
    .on('head', new NavigationInterceptor(migratedPaths, mode))
    .transform(response)
}

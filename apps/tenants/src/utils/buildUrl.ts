import type { Page } from '@/payload-types';

import { getServerSideURL } from './getURL';

export function getPathFromBreadcrumbs(breadcrumbs?: Page['breadcrumbs']): string | undefined {
	if (!Array.isArray(breadcrumbs) || breadcrumbs.length === 0) {
		return undefined;
	}

	const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
	if (!lastBreadcrumb?.url) {
		return undefined;
	}

	return lastBreadcrumb.url.replace(/^\//, '');
}

type PagesOptions = {
	collection: 'pages';
	breadcrumbs: Page['breadcrumbs'];
	slug?: string;
};

type BuildUrlOptions = PagesOptions;

export function buildUrl(params: BuildUrlOptions & { absolute?: boolean }): string {
	const baseUrl = getServerSideURL();

	let relativePath = '';
	switch (params.collection) {
		case 'pages': {
			const finalSlug = params.breadcrumbs ? getPathFromBreadcrumbs(params.breadcrumbs) : undefined;

			relativePath = !finalSlug || finalSlug === 'home' ? '' : `/${finalSlug}`;
			break;
		}
	}

	const fullPath = `${relativePath}`;
	return params.absolute ? `${baseUrl}${fullPath}` : fullPath;
}

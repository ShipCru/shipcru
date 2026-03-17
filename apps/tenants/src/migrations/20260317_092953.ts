import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds" AS ENUM('heading', 'description');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_blog_flds" AS ENUM('heading', 'description');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds" AS ENUM('heading', 'description');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_flds" AS ENUM('heading', 'description');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_cta_flds" AS ENUM('heading', 'description');
  CREATE TYPE "public"."_locales" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('super-admin');
  CREATE TYPE "public"."enum_users_tenants_roles" AS ENUM('tenant-admin', 'editor');
  CREATE TYPE "public"."enum_pages_blocks_hero_split_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_pages_blocks_hero_split_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_pages_blocks_blog_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_pages_blocks_blog_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_pages_blocks_blog_section_group" AS ENUM('before', 'test', 'after');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_section_group" AS ENUM('before', 'test', 'after');
  CREATE TYPE "public"."enum_pages_blocks_metrics_metrics_icon" AS ENUM('activity', 'activity-heart', 'airplay', 'airpods', 'alarm-clock', 'alarm-clock-check', 'alarm-clock-minus', 'alarm-clock-off', 'alarm-clock-plus', 'alert-circle', 'alert-hexagon', 'alert-octagon', 'alert-square', 'alert-triangle', 'align-bottom-01', 'align-bottom-02', 'align-center', 'align-horizontal-centre-01', 'align-horizontal-centre-02', 'align-justify', 'align-left', 'align-left-01', 'align-left-02', 'align-right', 'align-right-01', 'align-right-02', 'align-top-arrow-01', 'align-top-arrow-02', 'align-vertical-center-01', 'align-vertical-center-02', 'anchor', 'annotation', 'annotation-alert', 'annotation-check', 'annotation-dots', 'annotation-heart', 'annotation-info', 'annotation-plus', 'annotation-question', 'annotation-x', 'announcement-01', 'announcement-02', 'announcement-03', 'archive', 'arrow-block-down', 'arrow-block-left', 'arrow-block-right', 'arrow-block-up', 'arrow-circle-broken-down', 'arrow-circle-broken-down-left', 'arrow-circle-broken-down-right', 'arrow-circle-broken-left', 'arrow-circle-broken-right', 'arrow-circle-broken-up', 'arrow-circle-broken-up-left', 'arrow-circle-broken-up-right', 'arrow-circle-down', 'arrow-circle-down-left', 'arrow-circle-down-right', 'arrow-circle-left', 'arrow-circle-right', 'arrow-circle-up', 'arrow-circle-up-left', 'arrow-circle-up-right', 'arrow-down', 'arrow-down-left', 'arrow-down-right', 'arrow-left', 'arrow-narrow-down', 'arrow-narrow-down-left', 'arrow-narrow-down-right', 'arrow-narrow-left', 'arrow-narrow-right', 'arrow-narrow-up', 'arrow-narrow-up-left', 'arrow-narrow-up-right', 'arrow-right', 'arrow-square-down', 'arrow-square-down-left', 'arrow-square-down-right', 'arrow-square-left', 'arrow-square-right', 'arrow-square-up', 'arrow-square-up-left', 'arrow-square-up-right', 'arrow-up', 'arrow-up-left', 'arrow-up-right', 'arrows-down', 'arrows-left', 'arrows-right', 'arrows-triangle', 'arrows-up', 'asterisk-01', 'asterisk-02', 'at-sign', 'atom-01', 'atom-02', 'attachment-01', 'attachment-02', 'award-01', 'award-02', 'award-03', 'award-04', 'award-05', 'backpack', 'bank', 'bank-note-01', 'bank-note-02', 'bank-note-03', 'bar-chart-01', 'bar-chart-02', 'bar-chart-03', 'bar-chart-04', 'bar-chart-05', 'bar-chart-06', 'bar-chart-07', 'bar-chart-08', 'bar-chart-09', 'bar-chart-10', 'bar-chart-11', 'bar-chart-12', 'bar-chart-circle-01', 'bar-chart-circle-02', 'bar-chart-circle-03', 'bar-chart-square-01', 'bar-chart-square-02', 'bar-chart-square-03', 'bar-chart-square-down', 'bar-chart-square-minus', 'bar-chart-square-plus', 'bar-chart-square-up', 'bar-line-chart', 'battery-charging-01', 'battery-charging-02', 'battery-empty', 'battery-full', 'battery-low', 'battery-mid', 'beaker-01', 'beaker-02', 'bell-01', 'bell-02', 'bell-03', 'bell-04', 'bell-minus', 'bell-off-01', 'bell-off-02', 'bell-off-03', 'bell-plus', 'bell-ringing-01', 'bell-ringing-02', 'bell-ringing-03', 'bell-ringing-04', 'bezier-curve-01', 'bezier-curve-02', 'bezier-curve-03', 'bluetooth-connect', 'bluetooth-off', 'bluetooth-on', 'bluetooth-signal', 'bold-01', 'bold-02', 'bold-square', 'book-closed', 'book-open-01', 'book-open-02', 'bookmark', 'bookmark-add', 'bookmark-check', 'bookmark-minus', 'bookmark-x', 'box', 'brackets', 'brackets-check', 'brackets-ellipses', 'brackets-minus', 'brackets-plus', 'brackets-slash', 'brackets-x', 'briefcase-01', 'briefcase-02', 'browser', 'brush-01', 'brush-02', 'brush-03', 'building-01', 'building-02', 'building-03', 'building-04', 'building-05', 'building-06', 'building-07', 'building-08', 'bus', 'calculator', 'calendar', 'calendar-check-01', 'calendar-check-02', 'calendar-date', 'calendar-heart-01', 'calendar-heart-02', 'calendar-minus-01', 'calendar-minus-02', 'calendar-plus-01', 'calendar-plus-02', 'camera-01', 'camera-02', 'camera-03', 'camera-lens', 'camera-off', 'camera-plus', 'car-01', 'car-02', 'certificate-01', 'certificate-02', 'chart-breakout-circle', 'chart-breakout-square', 'check', 'check-circle', 'check-circle-broken', 'check-done-01', 'check-done-02', 'check-heart', 'check-square', 'check-square-broken', 'check-verified-01', 'check-verified-02', 'check-verified-03', 'chevron-down', 'chevron-down-double', 'chevron-left', 'chevron-left-double', 'chevron-right', 'chevron-right-double', 'chevron-selector-horizontal', 'chevron-selector-vertical', 'chevron-up', 'chevron-up-double', 'chrome-cast', 'circle', 'circle-cut', 'clapperboard', 'clipboard', 'clipboard-attachment', 'clipboard-check', 'clipboard-download', 'clipboard-minus', 'clipboard-plus', 'clipboard-x', 'clock', 'clock-check', 'clock-fast-forward', 'clock-plus', 'clock-refresh', 'clock-rewind', 'clock-snooze', 'clock-stopwatch', 'cloud-01', 'cloud-02', 'cloud-03', 'cloud-blank-01', 'cloud-blank-02', 'cloud-lightning', 'cloud-moon', 'cloud-off', 'cloud-raining-01', 'cloud-raining-02', 'cloud-raining-03', 'cloud-raining-04', 'cloud-raining-05', 'cloud-raining-06', 'cloud-snowing-01', 'cloud-snowing-02', 'cloud-sun-01', 'cloud-sun-02', 'cloud-sun-03', 'code-01', 'code-02', 'code-browser', 'code-circle-01', 'code-circle-02', 'code-circle-03', 'code-snippet-01', 'code-snippet-02', 'code-square-01', 'code-square-02', 'codepen', 'coins-01', 'coins-02', 'coins-03', 'coins-04', 'coins-hand', 'coins-stacked-01', 'coins-stacked-02', 'coins-stacked-03', 'coins-stacked-04', 'coins-swap-01', 'coins-swap-02', 'colors', 'colors-1', 'columns-01', 'columns-02', 'columns-03', 'command', 'compass', 'compass-01', 'compass-02', 'compass-03', 'container', 'contrast-01', 'contrast-02', 'contrast-03', 'copy-01', 'copy-02', 'copy-03', 'copy-04', 'copy-05', 'copy-06', 'copy-07', 'corner-down-left', 'corner-down-right', 'corner-left-down', 'corner-left-up', 'corner-right-down', 'corner-right-up', 'corner-up-left', 'corner-up-right', 'cpu-chip-01', 'cpu-chip-02', 'credit-card-01', 'credit-card-02', 'credit-card-check', 'credit-card-down', 'credit-card-download', 'credit-card-edit', 'credit-card-lock', 'credit-card-minus', 'credit-card-plus', 'credit-card-refresh', 'credit-card-search', 'credit-card-shield', 'credit-card-up', 'credit-card-upload', 'credit-card-x', 'crop-01', 'crop-02', 'cryptocurrency-01', 'cryptocurrency-02', 'cryptocurrency-03', 'cryptocurrency-04', 'cube-01', 'cube-02', 'cube-03', 'cube-04', 'cube-outline', 'currency-bitcoin', 'currency-bitcoin-circle', 'currency-dollar', 'currency-dollar-circle', 'currency-ethereum', 'currency-ethereum-circle', 'currency-euro', 'currency-euro-circle', 'currency-pound', 'currency-pound-circle', 'currency-ruble', 'currency-ruble-circle', 'currency-rupee', 'currency-rupee-circle', 'currency-yen', 'currency-yen-circle', 'cursor-01', 'cursor-02', 'cursor-03', 'cursor-04', 'cursor-box', 'cursor-click-01', 'cursor-click-02', 'data', 'database-01', 'database-02', 'database-03', 'dataflow-01', 'dataflow-02', 'dataflow-03', 'dataflow-04', 'delete', 'diamond-01', 'diamond-02', 'dice-1', 'dice-2', 'dice-3', 'dice-4', 'dice-5', 'dice-6', 'disc-01', 'disc-02', 'distribute-spacing-horizontal', 'distribute-spacing-vertical', 'divide-01', 'divide-02', 'divide-03', 'divider', 'dotpoints-01', 'dotpoints-02', 'dots-grid', 'dots-horizontal', 'dots-vertical', 'download-01', 'download-02', 'download-03', 'download-04', 'download-cloud-01', 'download-cloud-02', 'drop', 'droplets-01', 'droplets-02', 'droplets-03', 'dropper', 'edit-01', 'edit-02', 'edit-03', 'edit-04', 'edit-05', 'equal', 'equal-not', 'eraser', 'expand-01', 'expand-02', 'expand-03', 'expand-04', 'expand-05', 'expand-06', 'eye', 'eye-off', 'face-content', 'face-frown', 'face-happy', 'face-id', 'face-id-square', 'face-neutral', 'face-sad', 'face-smile', 'face-wink', 'fast-backward', 'fast-forward', 'feather', 'figma', 'file-01', 'file-02', 'file-03', 'file-04', 'file-05', 'file-06', 'file-07', 'file-attachment-01', 'file-attachment-02', 'file-attachment-03', 'file-attachment-04', 'file-attachment-05', 'file-check-01', 'file-check-02', 'file-check-03', 'file-code-01', 'file-code-02', 'file-download-01', 'file-download-02', 'file-download-03', 'file-heart-01', 'file-heart-02', 'file-heart-03', 'file-lock-01', 'file-lock-02', 'file-lock-03', 'file-minus-01', 'file-minus-02', 'file-minus-03', 'file-plus-01', 'file-plus-02', 'file-plus-03', 'file-question-01', 'file-question-02', 'file-question-03', 'file-search-01', 'file-search-02', 'file-search-03', 'file-shield-01', 'file-shield-02', 'file-shield-03', 'file-x-01', 'file-x-02', 'file-x-03', 'film-01', 'film-02', 'film-03', 'filter-funnel-01', 'filter-funnel-02', 'filter-lines', 'fingerprint-01', 'fingerprint-02', 'fingerprint-03', 'fingerprint-04', 'flag-01', 'flag-02', 'flag-03', 'flag-04', 'flag-05', 'flag-06', 'flash', 'flash-off', 'flex-align-bottom', 'flex-align-left', 'flex-align-right', 'flex-align-top', 'flip-backward', 'flip-forward', 'folder', 'folder-check', 'folder-closed', 'folder-code', 'folder-download', 'folder-lock', 'folder-minus', 'folder-plus', 'folder-question', 'folder-search', 'folder-shield', 'folder-x', 'framer', 'gaming-pad-01', 'gaming-pad-02', 'gift-01', 'gift-02', 'git-branch-01', 'git-branch-02', 'git-commit', 'git-merge', 'git-pull-request', 'glasses-01', 'glasses-02', 'globe-01', 'globe-02', 'globe-03', 'globe-04', 'globe-05', 'globe-06', 'globe-slated-01', 'globe-slated-02', 'google-chrome', 'graduation-hat-01', 'graduation-hat-02', 'grid-01', 'grid-02', 'grid-03', 'grid-dots-blank', 'grid-dots-bottom', 'grid-dots-horizontal-center', 'grid-dots-left', 'grid-dots-outer', 'grid-dots-right', 'grid-dots-top', 'grid-dots-vertical-center', 'hand', 'hard-drive', 'hash-01', 'hash-02', 'heading-01', 'heading-02', 'heading-square', 'headphones-01', 'headphones-02', 'heart', 'heart-circle', 'heart-hand', 'heart-hexagon', 'heart-octagon', 'heart-rounded', 'heart-square', 'hearts', 'help-circle', 'help-octagon', 'help-octagon-1', 'help-square', 'hexagon-01', 'hexagon-02', 'home-01', 'home-02', 'home-03', 'home-04', 'home-05', 'home-line', 'home-smile', 'horizontal-bar-chart-01', 'horizontal-bar-chart-02', 'horizontal-bar-chart-03', 'hourglass-01', 'hourglass-02', 'hourglass-03', 'hurricane-01', 'hurricane-02', 'hurricane-03', 'image-01', 'image-02', 'image-03', 'image-04', 'image-05', 'image-check', 'image-down', 'image-indent-left', 'image-indent-right', 'image-left', 'image-plus', 'image-right', 'image-up', 'image-user', 'image-user-check', 'image-user-down', 'image-user-left', 'image-user-plus', 'image-user-right', 'image-user-up', 'image-user-x', 'image-x', 'inbox-01', 'inbox-02', 'infinity', 'info-circle', 'info-hexagon', 'info-octagon', 'info-square', 'intersect-circle', 'intersect-square', 'italic-01', 'italic-02', 'italic-square', 'key-01', 'key-02', 'keyboard-01', 'keyboard-02', 'laptop-01', 'laptop-02', 'layer-single', 'layers-three-01', 'layers-three-02', 'layers-two-01', 'layers-two-02', 'layout-alt-01', 'layout-alt-02', 'layout-alt-03', 'layout-alt-04', 'layout-bottom', 'layout-grid-01', 'layout-grid-02', 'layout-left', 'layout-right', 'layout-top', 'left-indent-01', 'left-indent-02', 'letter-spacing-01', 'letter-spacing-02', 'life-buoy-01', 'life-buoy-02', 'lightbulb-01', 'lightbulb-02', 'lightbulb-03', 'lightbulb-04', 'lightbulb-05', 'lightning-01', 'lightning-02', 'line-chart-down-01', 'line-chart-down-02', 'line-chart-down-03', 'line-chart-down-04', 'line-chart-down-05', 'line-chart-up-01', 'line-chart-up-02', 'line-chart-up-03', 'line-chart-up-04', 'line-chart-up-05', 'line-height', 'link-01', 'link-02', 'link-03', 'link-04', 'link-05', 'link-broken-01', 'link-broken-02', 'link-external-01', 'link-external-02', 'list', 'loading-01', 'loading-02', 'loading-03', 'lock-01', 'lock-02', 'lock-03', 'lock-04', 'lock-keyhole-circle', 'lock-keyhole-square', 'lock-unlocked-01', 'lock-unlocked-02', 'lock-unlocked-03', 'lock-unlocked-04', 'log-in-01', 'log-in-02', 'log-in-03', 'log-in-04', 'log-out-01', 'log-out-02', 'log-out-03', 'log-out-04', 'luggage-01', 'luggage-02', 'luggage-03', 'magic-wand-01', 'magic-wand-02', 'mail-01', 'mail-02', 'mail-03', 'mail-04', 'mail-05', 'map-01', 'map-02', 'mark', 'marker-pin-01', 'marker-pin-02', 'marker-pin-03', 'marker-pin-04', 'marker-pin-05', 'marker-pin-06', 'maximize-01', 'maximize-02', 'medical-circle', 'medical-cross', 'medical-square', 'menu-01', 'menu-02', 'menu-03', 'menu-04', 'menu-05', 'message-alert-circle', 'message-alert-square', 'message-chat-circle', 'message-chat-square', 'message-check-circle', 'message-check-square', 'message-circle-01', 'message-circle-02', 'message-dots-circle', 'message-dots-square', 'message-heart-circle', 'message-heart-square', 'message-notification-circle', 'message-notification-square', 'message-plus-circle', 'message-plus-square', 'message-question-circle', 'message-question-square', 'message-smile-circle', 'message-smile-square', 'message-square-01', 'message-square-02', 'message-text-circle-01', 'message-text-circle-02', 'message-text-square-01', 'message-text-square-02', 'message-x-circle', 'message-x-square', 'microphone-01', 'microphone-02', 'microphone-off-01', 'microphone-off-02', 'microscope', 'minimize-01', 'minimize-02', 'minus', 'minus-circle', 'minus-square', 'modem-01', 'modem-02', 'monitor-01', 'monitor-02', 'monitor-03', 'monitor-04', 'monitor-05', 'moon-01', 'moon-02', 'moon-eclipse', 'moon-star', 'mouse', 'move', 'music-note-01', 'music-note-02', 'music-note-plus', 'navigation-pointer-01', 'navigation-pointer-02', 'navigation-pointer-off-01', 'navigation-pointer-off-02', 'notification-box', 'notification-message', 'notification-text', 'octagon', 'package', 'package-check', 'package-minus', 'package-plus', 'package-search', 'package-x', 'paint', 'paint-pour', 'palette', 'paperclip', 'paragraph-spacing', 'paragraph-wrap', 'passcode', 'passcode-lock', 'passport', 'pause-circle', 'pause-square', 'pen-tool-01', 'pen-tool-02', 'pen-tool-minus', 'pen-tool-plus', 'pencil-01', 'pencil-02', 'pencil-line', 'pentagon', 'percent-01', 'percent-02', 'percent-03', 'perspective-01', 'perspective-02', 'phone', 'phone-01', 'phone-02', 'phone-call-01', 'phone-call-02', 'phone-hang-up', 'phone-incoming-01', 'phone-incoming-02', 'phone-outgoing-01', 'phone-outgoing-02', 'phone-pause', 'phone-plus', 'phone-x', 'pie-chart-01', 'pie-chart-02', 'pie-chart-03', 'pie-chart-04', 'piggy-bank-01', 'piggy-bank-02', 'pilcrow-01', 'pilcrow-02', 'pilcrow-square', 'pin-01', 'pin-02', 'placeholder', 'plane', 'play', 'play-circle', 'play-square', 'plus', 'plus-circle', 'plus-square', 'podcast', 'power-01', 'power-02', 'power-03', 'presentation-chart-01', 'presentation-chart-02', 'presentation-chart-03', 'printer', 'puzzle-piece-01', 'puzzle-piece-02', 'qr-code-01', 'qr-code-02', 'receipt', 'receipt-check', 'recording-01', 'recording-02', 'recording-03', 'reflect-01', 'reflect-02', 'refresh-ccw-01', 'refresh-ccw-02', 'refresh-ccw-03', 'refresh-ccw-04', 'refresh-ccw-05', 'refresh-cw-01', 'refresh-cw-02', 'refresh-cw-03', 'refresh-cw-04', 'refresh-cw-05', 'repeat-01', 'repeat-02', 'repeat-03', 'repeat-04', 'reverse-left', 'reverse-right', 'right-indent-01', 'right-indent-02', 'rocket-01', 'rocket-02', 'roller-brush', 'route', 'rows-01', 'rows-02', 'rows-03', 'rss-01', 'rss-02', 'ruler', 'safe', 'sale-01', 'sale-02', 'sale-03', 'sale-04', 'save-01', 'save-02', 'save-03', 'scale-01', 'scale-02', 'scale-03', 'scales-01', 'scales-02', 'scan', 'scissors-01', 'scissors-02', 'scissors-cut-01', 'scissors-cut-02', 'search-lg', 'search-md', 'search-refraction', 'search-sm', 'send-01', 'send-02', 'send-03', 'server-01', 'server-02', 'server-03', 'server-04', 'server-05', 'server-06', 'settings-01', 'settings-02', 'settings-03', 'settings-04', 'share-01', 'share-02', 'share-03', 'share-04', 'share-05', 'share-06', 'share-07', 'shield-01', 'shield-02', 'shield-03', 'shield-dollar', 'shield-off', 'shield-plus', 'shield-tick', 'shield-zap', 'shopping-bag-01', 'shopping-bag-02', 'shopping-bag-03', 'shopping-cart-01', 'shopping-cart-02', 'shopping-cart-03', 'shuffle-01', 'shuffle-02', 'signal-01', 'signal-02', 'signal-03', 'simcard', 'skew', 'skip-back', 'skip-forward', 'slash-circle-01', 'slash-circle-02', 'slash-divider', 'slash-octagon', 'sliders-01', 'sliders-02', 'sliders-03', 'sliders-04', 'snowflake-01', 'snowflake-02', 'spacing-height-01', 'spacing-height-02', 'spacing-width-01', 'spacing-width-02', 'speaker-01', 'speaker-02', 'speaker-03', 'speedometer-01', 'speedometer-02', 'speedometer-03', 'speedometer-04', 'square', 'stand', 'star-01', 'star-02', 'star-03', 'star-04', 'star-05', 'star-06', 'star-07', 'stars-01', 'stars-02', 'stars-03', 'sticker-circle', 'sticker-square', 'stop', 'stop-circle', 'stop-square', 'strikethrough-01', 'strikethrough-02', 'strikethrough-square', 'subscript', 'sun', 'sun-setting-01', 'sun-setting-02', 'sun-setting-03', 'sunrise', 'sunset', 'switch-horizontal-01', 'switch-horizontal-02', 'switch-vertical-01', 'switch-vertical-02', 'table', 'tablet-01', 'tablet-02', 'tag-01', 'tag-02', 'tag-03', 'target-01', 'target-02', 'target-03', 'target-04', 'target-05', 'telescope', 'terminal', 'terminal-browser', 'terminal-circle', 'terminal-square', 'text-input', 'thermometer-01', 'thermometer-02', 'thermometer-03', 'thermometer-cold', 'thermometer-warm', 'thumbs-down', 'thumbs-up', 'ticket-01', 'ticket-02', 'toggle-01-left', 'toggle-01-right', 'toggle-02-left', 'toggle-02-right', 'toggle-03-left', 'toggle-03-right', 'tool-01', 'tool-02', 'train', 'tram', 'transform', 'translate-01', 'translate-02', 'trash-01', 'trash-02', 'trash-03', 'trash-04', 'trend-down-01', 'trend-down-02', 'trend-up-01', 'trend-up-02', 'triangle', 'trophy-01', 'trophy-02', 'truck-01', 'truck-02', 'tv-01', 'tv-02', 'tv-03', 'type-01', 'type-02', 'type-square', 'type-strikethrough-01', 'type-strikethrough-02', 'umbrella-01', 'umbrella-02', 'umbrella-03', 'underline-01', 'underline-02', 'underline-square', 'upload-01', 'upload-02', 'upload-03', 'upload-04', 'upload-cloud-01', 'upload-cloud-02', 'usb-flash-drive', 'user-01', 'user-02', 'user-03', 'user-check-01', 'user-check-02', 'user-circle', 'user-down-01', 'user-down-02', 'user-edit', 'user-left-01', 'user-left-02', 'user-minus-01', 'user-minus-02', 'user-plus-01', 'user-plus-02', 'user-right-01', 'user-right-02', 'user-square', 'user-up-01', 'user-up-02', 'user-x-01', 'user-x-02', 'users-01', 'users-02', 'users-03', 'users-check', 'users-down', 'users-edit', 'users-left', 'users-minus', 'users-plus', 'users-right', 'users-up', 'users-x', 'variable', 'video-recorder', 'video-recorder-off', 'virus', 'voicemail', 'volume-max', 'volume-min', 'volume-minus', 'volume-plus', 'volume-x', 'wallet-01', 'wallet-02', 'wallet-03', 'wallet-04', 'wallet-05', 'watch-circle', 'watch-square', 'waves', 'webcam-01', 'webcam-02', 'wifi', 'wifi-off', 'wind-01', 'wind-02', 'wind-03', 'x', 'x-circle', 'x-close', 'x-square', 'youtube', 'zap', 'zap-circle', 'zap-fast', 'zap-off', 'zap-square', 'zoom-in', 'zoom-out');
  CREATE TYPE "public"."enum_pages_blocks_metrics_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_pages_blocks_metrics_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_pages_blocks_metrics_section_group" AS ENUM('before', 'test', 'after');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'tertiary', 'link-gray', 'link-color');
  CREATE TYPE "public"."enum_pages_blocks_cta_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_pages_blocks_cta_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_group" AS ENUM('before', 'test', 'after');
  CREATE TYPE "public"."enum_pages_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_split_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_split_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_section_group" AS ENUM('before', 'test', 'after');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_section_group" AS ENUM('before', 'test', 'after');
  CREATE TYPE "public"."enum__pages_v_blocks_metrics_metrics_icon" AS ENUM('activity', 'activity-heart', 'airplay', 'airpods', 'alarm-clock', 'alarm-clock-check', 'alarm-clock-minus', 'alarm-clock-off', 'alarm-clock-plus', 'alert-circle', 'alert-hexagon', 'alert-octagon', 'alert-square', 'alert-triangle', 'align-bottom-01', 'align-bottom-02', 'align-center', 'align-horizontal-centre-01', 'align-horizontal-centre-02', 'align-justify', 'align-left', 'align-left-01', 'align-left-02', 'align-right', 'align-right-01', 'align-right-02', 'align-top-arrow-01', 'align-top-arrow-02', 'align-vertical-center-01', 'align-vertical-center-02', 'anchor', 'annotation', 'annotation-alert', 'annotation-check', 'annotation-dots', 'annotation-heart', 'annotation-info', 'annotation-plus', 'annotation-question', 'annotation-x', 'announcement-01', 'announcement-02', 'announcement-03', 'archive', 'arrow-block-down', 'arrow-block-left', 'arrow-block-right', 'arrow-block-up', 'arrow-circle-broken-down', 'arrow-circle-broken-down-left', 'arrow-circle-broken-down-right', 'arrow-circle-broken-left', 'arrow-circle-broken-right', 'arrow-circle-broken-up', 'arrow-circle-broken-up-left', 'arrow-circle-broken-up-right', 'arrow-circle-down', 'arrow-circle-down-left', 'arrow-circle-down-right', 'arrow-circle-left', 'arrow-circle-right', 'arrow-circle-up', 'arrow-circle-up-left', 'arrow-circle-up-right', 'arrow-down', 'arrow-down-left', 'arrow-down-right', 'arrow-left', 'arrow-narrow-down', 'arrow-narrow-down-left', 'arrow-narrow-down-right', 'arrow-narrow-left', 'arrow-narrow-right', 'arrow-narrow-up', 'arrow-narrow-up-left', 'arrow-narrow-up-right', 'arrow-right', 'arrow-square-down', 'arrow-square-down-left', 'arrow-square-down-right', 'arrow-square-left', 'arrow-square-right', 'arrow-square-up', 'arrow-square-up-left', 'arrow-square-up-right', 'arrow-up', 'arrow-up-left', 'arrow-up-right', 'arrows-down', 'arrows-left', 'arrows-right', 'arrows-triangle', 'arrows-up', 'asterisk-01', 'asterisk-02', 'at-sign', 'atom-01', 'atom-02', 'attachment-01', 'attachment-02', 'award-01', 'award-02', 'award-03', 'award-04', 'award-05', 'backpack', 'bank', 'bank-note-01', 'bank-note-02', 'bank-note-03', 'bar-chart-01', 'bar-chart-02', 'bar-chart-03', 'bar-chart-04', 'bar-chart-05', 'bar-chart-06', 'bar-chart-07', 'bar-chart-08', 'bar-chart-09', 'bar-chart-10', 'bar-chart-11', 'bar-chart-12', 'bar-chart-circle-01', 'bar-chart-circle-02', 'bar-chart-circle-03', 'bar-chart-square-01', 'bar-chart-square-02', 'bar-chart-square-03', 'bar-chart-square-down', 'bar-chart-square-minus', 'bar-chart-square-plus', 'bar-chart-square-up', 'bar-line-chart', 'battery-charging-01', 'battery-charging-02', 'battery-empty', 'battery-full', 'battery-low', 'battery-mid', 'beaker-01', 'beaker-02', 'bell-01', 'bell-02', 'bell-03', 'bell-04', 'bell-minus', 'bell-off-01', 'bell-off-02', 'bell-off-03', 'bell-plus', 'bell-ringing-01', 'bell-ringing-02', 'bell-ringing-03', 'bell-ringing-04', 'bezier-curve-01', 'bezier-curve-02', 'bezier-curve-03', 'bluetooth-connect', 'bluetooth-off', 'bluetooth-on', 'bluetooth-signal', 'bold-01', 'bold-02', 'bold-square', 'book-closed', 'book-open-01', 'book-open-02', 'bookmark', 'bookmark-add', 'bookmark-check', 'bookmark-minus', 'bookmark-x', 'box', 'brackets', 'brackets-check', 'brackets-ellipses', 'brackets-minus', 'brackets-plus', 'brackets-slash', 'brackets-x', 'briefcase-01', 'briefcase-02', 'browser', 'brush-01', 'brush-02', 'brush-03', 'building-01', 'building-02', 'building-03', 'building-04', 'building-05', 'building-06', 'building-07', 'building-08', 'bus', 'calculator', 'calendar', 'calendar-check-01', 'calendar-check-02', 'calendar-date', 'calendar-heart-01', 'calendar-heart-02', 'calendar-minus-01', 'calendar-minus-02', 'calendar-plus-01', 'calendar-plus-02', 'camera-01', 'camera-02', 'camera-03', 'camera-lens', 'camera-off', 'camera-plus', 'car-01', 'car-02', 'certificate-01', 'certificate-02', 'chart-breakout-circle', 'chart-breakout-square', 'check', 'check-circle', 'check-circle-broken', 'check-done-01', 'check-done-02', 'check-heart', 'check-square', 'check-square-broken', 'check-verified-01', 'check-verified-02', 'check-verified-03', 'chevron-down', 'chevron-down-double', 'chevron-left', 'chevron-left-double', 'chevron-right', 'chevron-right-double', 'chevron-selector-horizontal', 'chevron-selector-vertical', 'chevron-up', 'chevron-up-double', 'chrome-cast', 'circle', 'circle-cut', 'clapperboard', 'clipboard', 'clipboard-attachment', 'clipboard-check', 'clipboard-download', 'clipboard-minus', 'clipboard-plus', 'clipboard-x', 'clock', 'clock-check', 'clock-fast-forward', 'clock-plus', 'clock-refresh', 'clock-rewind', 'clock-snooze', 'clock-stopwatch', 'cloud-01', 'cloud-02', 'cloud-03', 'cloud-blank-01', 'cloud-blank-02', 'cloud-lightning', 'cloud-moon', 'cloud-off', 'cloud-raining-01', 'cloud-raining-02', 'cloud-raining-03', 'cloud-raining-04', 'cloud-raining-05', 'cloud-raining-06', 'cloud-snowing-01', 'cloud-snowing-02', 'cloud-sun-01', 'cloud-sun-02', 'cloud-sun-03', 'code-01', 'code-02', 'code-browser', 'code-circle-01', 'code-circle-02', 'code-circle-03', 'code-snippet-01', 'code-snippet-02', 'code-square-01', 'code-square-02', 'codepen', 'coins-01', 'coins-02', 'coins-03', 'coins-04', 'coins-hand', 'coins-stacked-01', 'coins-stacked-02', 'coins-stacked-03', 'coins-stacked-04', 'coins-swap-01', 'coins-swap-02', 'colors', 'colors-1', 'columns-01', 'columns-02', 'columns-03', 'command', 'compass', 'compass-01', 'compass-02', 'compass-03', 'container', 'contrast-01', 'contrast-02', 'contrast-03', 'copy-01', 'copy-02', 'copy-03', 'copy-04', 'copy-05', 'copy-06', 'copy-07', 'corner-down-left', 'corner-down-right', 'corner-left-down', 'corner-left-up', 'corner-right-down', 'corner-right-up', 'corner-up-left', 'corner-up-right', 'cpu-chip-01', 'cpu-chip-02', 'credit-card-01', 'credit-card-02', 'credit-card-check', 'credit-card-down', 'credit-card-download', 'credit-card-edit', 'credit-card-lock', 'credit-card-minus', 'credit-card-plus', 'credit-card-refresh', 'credit-card-search', 'credit-card-shield', 'credit-card-up', 'credit-card-upload', 'credit-card-x', 'crop-01', 'crop-02', 'cryptocurrency-01', 'cryptocurrency-02', 'cryptocurrency-03', 'cryptocurrency-04', 'cube-01', 'cube-02', 'cube-03', 'cube-04', 'cube-outline', 'currency-bitcoin', 'currency-bitcoin-circle', 'currency-dollar', 'currency-dollar-circle', 'currency-ethereum', 'currency-ethereum-circle', 'currency-euro', 'currency-euro-circle', 'currency-pound', 'currency-pound-circle', 'currency-ruble', 'currency-ruble-circle', 'currency-rupee', 'currency-rupee-circle', 'currency-yen', 'currency-yen-circle', 'cursor-01', 'cursor-02', 'cursor-03', 'cursor-04', 'cursor-box', 'cursor-click-01', 'cursor-click-02', 'data', 'database-01', 'database-02', 'database-03', 'dataflow-01', 'dataflow-02', 'dataflow-03', 'dataflow-04', 'delete', 'diamond-01', 'diamond-02', 'dice-1', 'dice-2', 'dice-3', 'dice-4', 'dice-5', 'dice-6', 'disc-01', 'disc-02', 'distribute-spacing-horizontal', 'distribute-spacing-vertical', 'divide-01', 'divide-02', 'divide-03', 'divider', 'dotpoints-01', 'dotpoints-02', 'dots-grid', 'dots-horizontal', 'dots-vertical', 'download-01', 'download-02', 'download-03', 'download-04', 'download-cloud-01', 'download-cloud-02', 'drop', 'droplets-01', 'droplets-02', 'droplets-03', 'dropper', 'edit-01', 'edit-02', 'edit-03', 'edit-04', 'edit-05', 'equal', 'equal-not', 'eraser', 'expand-01', 'expand-02', 'expand-03', 'expand-04', 'expand-05', 'expand-06', 'eye', 'eye-off', 'face-content', 'face-frown', 'face-happy', 'face-id', 'face-id-square', 'face-neutral', 'face-sad', 'face-smile', 'face-wink', 'fast-backward', 'fast-forward', 'feather', 'figma', 'file-01', 'file-02', 'file-03', 'file-04', 'file-05', 'file-06', 'file-07', 'file-attachment-01', 'file-attachment-02', 'file-attachment-03', 'file-attachment-04', 'file-attachment-05', 'file-check-01', 'file-check-02', 'file-check-03', 'file-code-01', 'file-code-02', 'file-download-01', 'file-download-02', 'file-download-03', 'file-heart-01', 'file-heart-02', 'file-heart-03', 'file-lock-01', 'file-lock-02', 'file-lock-03', 'file-minus-01', 'file-minus-02', 'file-minus-03', 'file-plus-01', 'file-plus-02', 'file-plus-03', 'file-question-01', 'file-question-02', 'file-question-03', 'file-search-01', 'file-search-02', 'file-search-03', 'file-shield-01', 'file-shield-02', 'file-shield-03', 'file-x-01', 'file-x-02', 'file-x-03', 'film-01', 'film-02', 'film-03', 'filter-funnel-01', 'filter-funnel-02', 'filter-lines', 'fingerprint-01', 'fingerprint-02', 'fingerprint-03', 'fingerprint-04', 'flag-01', 'flag-02', 'flag-03', 'flag-04', 'flag-05', 'flag-06', 'flash', 'flash-off', 'flex-align-bottom', 'flex-align-left', 'flex-align-right', 'flex-align-top', 'flip-backward', 'flip-forward', 'folder', 'folder-check', 'folder-closed', 'folder-code', 'folder-download', 'folder-lock', 'folder-minus', 'folder-plus', 'folder-question', 'folder-search', 'folder-shield', 'folder-x', 'framer', 'gaming-pad-01', 'gaming-pad-02', 'gift-01', 'gift-02', 'git-branch-01', 'git-branch-02', 'git-commit', 'git-merge', 'git-pull-request', 'glasses-01', 'glasses-02', 'globe-01', 'globe-02', 'globe-03', 'globe-04', 'globe-05', 'globe-06', 'globe-slated-01', 'globe-slated-02', 'google-chrome', 'graduation-hat-01', 'graduation-hat-02', 'grid-01', 'grid-02', 'grid-03', 'grid-dots-blank', 'grid-dots-bottom', 'grid-dots-horizontal-center', 'grid-dots-left', 'grid-dots-outer', 'grid-dots-right', 'grid-dots-top', 'grid-dots-vertical-center', 'hand', 'hard-drive', 'hash-01', 'hash-02', 'heading-01', 'heading-02', 'heading-square', 'headphones-01', 'headphones-02', 'heart', 'heart-circle', 'heart-hand', 'heart-hexagon', 'heart-octagon', 'heart-rounded', 'heart-square', 'hearts', 'help-circle', 'help-octagon', 'help-octagon-1', 'help-square', 'hexagon-01', 'hexagon-02', 'home-01', 'home-02', 'home-03', 'home-04', 'home-05', 'home-line', 'home-smile', 'horizontal-bar-chart-01', 'horizontal-bar-chart-02', 'horizontal-bar-chart-03', 'hourglass-01', 'hourglass-02', 'hourglass-03', 'hurricane-01', 'hurricane-02', 'hurricane-03', 'image-01', 'image-02', 'image-03', 'image-04', 'image-05', 'image-check', 'image-down', 'image-indent-left', 'image-indent-right', 'image-left', 'image-plus', 'image-right', 'image-up', 'image-user', 'image-user-check', 'image-user-down', 'image-user-left', 'image-user-plus', 'image-user-right', 'image-user-up', 'image-user-x', 'image-x', 'inbox-01', 'inbox-02', 'infinity', 'info-circle', 'info-hexagon', 'info-octagon', 'info-square', 'intersect-circle', 'intersect-square', 'italic-01', 'italic-02', 'italic-square', 'key-01', 'key-02', 'keyboard-01', 'keyboard-02', 'laptop-01', 'laptop-02', 'layer-single', 'layers-three-01', 'layers-three-02', 'layers-two-01', 'layers-two-02', 'layout-alt-01', 'layout-alt-02', 'layout-alt-03', 'layout-alt-04', 'layout-bottom', 'layout-grid-01', 'layout-grid-02', 'layout-left', 'layout-right', 'layout-top', 'left-indent-01', 'left-indent-02', 'letter-spacing-01', 'letter-spacing-02', 'life-buoy-01', 'life-buoy-02', 'lightbulb-01', 'lightbulb-02', 'lightbulb-03', 'lightbulb-04', 'lightbulb-05', 'lightning-01', 'lightning-02', 'line-chart-down-01', 'line-chart-down-02', 'line-chart-down-03', 'line-chart-down-04', 'line-chart-down-05', 'line-chart-up-01', 'line-chart-up-02', 'line-chart-up-03', 'line-chart-up-04', 'line-chart-up-05', 'line-height', 'link-01', 'link-02', 'link-03', 'link-04', 'link-05', 'link-broken-01', 'link-broken-02', 'link-external-01', 'link-external-02', 'list', 'loading-01', 'loading-02', 'loading-03', 'lock-01', 'lock-02', 'lock-03', 'lock-04', 'lock-keyhole-circle', 'lock-keyhole-square', 'lock-unlocked-01', 'lock-unlocked-02', 'lock-unlocked-03', 'lock-unlocked-04', 'log-in-01', 'log-in-02', 'log-in-03', 'log-in-04', 'log-out-01', 'log-out-02', 'log-out-03', 'log-out-04', 'luggage-01', 'luggage-02', 'luggage-03', 'magic-wand-01', 'magic-wand-02', 'mail-01', 'mail-02', 'mail-03', 'mail-04', 'mail-05', 'map-01', 'map-02', 'mark', 'marker-pin-01', 'marker-pin-02', 'marker-pin-03', 'marker-pin-04', 'marker-pin-05', 'marker-pin-06', 'maximize-01', 'maximize-02', 'medical-circle', 'medical-cross', 'medical-square', 'menu-01', 'menu-02', 'menu-03', 'menu-04', 'menu-05', 'message-alert-circle', 'message-alert-square', 'message-chat-circle', 'message-chat-square', 'message-check-circle', 'message-check-square', 'message-circle-01', 'message-circle-02', 'message-dots-circle', 'message-dots-square', 'message-heart-circle', 'message-heart-square', 'message-notification-circle', 'message-notification-square', 'message-plus-circle', 'message-plus-square', 'message-question-circle', 'message-question-square', 'message-smile-circle', 'message-smile-square', 'message-square-01', 'message-square-02', 'message-text-circle-01', 'message-text-circle-02', 'message-text-square-01', 'message-text-square-02', 'message-x-circle', 'message-x-square', 'microphone-01', 'microphone-02', 'microphone-off-01', 'microphone-off-02', 'microscope', 'minimize-01', 'minimize-02', 'minus', 'minus-circle', 'minus-square', 'modem-01', 'modem-02', 'monitor-01', 'monitor-02', 'monitor-03', 'monitor-04', 'monitor-05', 'moon-01', 'moon-02', 'moon-eclipse', 'moon-star', 'mouse', 'move', 'music-note-01', 'music-note-02', 'music-note-plus', 'navigation-pointer-01', 'navigation-pointer-02', 'navigation-pointer-off-01', 'navigation-pointer-off-02', 'notification-box', 'notification-message', 'notification-text', 'octagon', 'package', 'package-check', 'package-minus', 'package-plus', 'package-search', 'package-x', 'paint', 'paint-pour', 'palette', 'paperclip', 'paragraph-spacing', 'paragraph-wrap', 'passcode', 'passcode-lock', 'passport', 'pause-circle', 'pause-square', 'pen-tool-01', 'pen-tool-02', 'pen-tool-minus', 'pen-tool-plus', 'pencil-01', 'pencil-02', 'pencil-line', 'pentagon', 'percent-01', 'percent-02', 'percent-03', 'perspective-01', 'perspective-02', 'phone', 'phone-01', 'phone-02', 'phone-call-01', 'phone-call-02', 'phone-hang-up', 'phone-incoming-01', 'phone-incoming-02', 'phone-outgoing-01', 'phone-outgoing-02', 'phone-pause', 'phone-plus', 'phone-x', 'pie-chart-01', 'pie-chart-02', 'pie-chart-03', 'pie-chart-04', 'piggy-bank-01', 'piggy-bank-02', 'pilcrow-01', 'pilcrow-02', 'pilcrow-square', 'pin-01', 'pin-02', 'placeholder', 'plane', 'play', 'play-circle', 'play-square', 'plus', 'plus-circle', 'plus-square', 'podcast', 'power-01', 'power-02', 'power-03', 'presentation-chart-01', 'presentation-chart-02', 'presentation-chart-03', 'printer', 'puzzle-piece-01', 'puzzle-piece-02', 'qr-code-01', 'qr-code-02', 'receipt', 'receipt-check', 'recording-01', 'recording-02', 'recording-03', 'reflect-01', 'reflect-02', 'refresh-ccw-01', 'refresh-ccw-02', 'refresh-ccw-03', 'refresh-ccw-04', 'refresh-ccw-05', 'refresh-cw-01', 'refresh-cw-02', 'refresh-cw-03', 'refresh-cw-04', 'refresh-cw-05', 'repeat-01', 'repeat-02', 'repeat-03', 'repeat-04', 'reverse-left', 'reverse-right', 'right-indent-01', 'right-indent-02', 'rocket-01', 'rocket-02', 'roller-brush', 'route', 'rows-01', 'rows-02', 'rows-03', 'rss-01', 'rss-02', 'ruler', 'safe', 'sale-01', 'sale-02', 'sale-03', 'sale-04', 'save-01', 'save-02', 'save-03', 'scale-01', 'scale-02', 'scale-03', 'scales-01', 'scales-02', 'scan', 'scissors-01', 'scissors-02', 'scissors-cut-01', 'scissors-cut-02', 'search-lg', 'search-md', 'search-refraction', 'search-sm', 'send-01', 'send-02', 'send-03', 'server-01', 'server-02', 'server-03', 'server-04', 'server-05', 'server-06', 'settings-01', 'settings-02', 'settings-03', 'settings-04', 'share-01', 'share-02', 'share-03', 'share-04', 'share-05', 'share-06', 'share-07', 'shield-01', 'shield-02', 'shield-03', 'shield-dollar', 'shield-off', 'shield-plus', 'shield-tick', 'shield-zap', 'shopping-bag-01', 'shopping-bag-02', 'shopping-bag-03', 'shopping-cart-01', 'shopping-cart-02', 'shopping-cart-03', 'shuffle-01', 'shuffle-02', 'signal-01', 'signal-02', 'signal-03', 'simcard', 'skew', 'skip-back', 'skip-forward', 'slash-circle-01', 'slash-circle-02', 'slash-divider', 'slash-octagon', 'sliders-01', 'sliders-02', 'sliders-03', 'sliders-04', 'snowflake-01', 'snowflake-02', 'spacing-height-01', 'spacing-height-02', 'spacing-width-01', 'spacing-width-02', 'speaker-01', 'speaker-02', 'speaker-03', 'speedometer-01', 'speedometer-02', 'speedometer-03', 'speedometer-04', 'square', 'stand', 'star-01', 'star-02', 'star-03', 'star-04', 'star-05', 'star-06', 'star-07', 'stars-01', 'stars-02', 'stars-03', 'sticker-circle', 'sticker-square', 'stop', 'stop-circle', 'stop-square', 'strikethrough-01', 'strikethrough-02', 'strikethrough-square', 'subscript', 'sun', 'sun-setting-01', 'sun-setting-02', 'sun-setting-03', 'sunrise', 'sunset', 'switch-horizontal-01', 'switch-horizontal-02', 'switch-vertical-01', 'switch-vertical-02', 'table', 'tablet-01', 'tablet-02', 'tag-01', 'tag-02', 'tag-03', 'target-01', 'target-02', 'target-03', 'target-04', 'target-05', 'telescope', 'terminal', 'terminal-browser', 'terminal-circle', 'terminal-square', 'text-input', 'thermometer-01', 'thermometer-02', 'thermometer-03', 'thermometer-cold', 'thermometer-warm', 'thumbs-down', 'thumbs-up', 'ticket-01', 'ticket-02', 'toggle-01-left', 'toggle-01-right', 'toggle-02-left', 'toggle-02-right', 'toggle-03-left', 'toggle-03-right', 'tool-01', 'tool-02', 'train', 'tram', 'transform', 'translate-01', 'translate-02', 'trash-01', 'trash-02', 'trash-03', 'trash-04', 'trend-down-01', 'trend-down-02', 'trend-up-01', 'trend-up-02', 'triangle', 'trophy-01', 'trophy-02', 'truck-01', 'truck-02', 'tv-01', 'tv-02', 'tv-03', 'type-01', 'type-02', 'type-square', 'type-strikethrough-01', 'type-strikethrough-02', 'umbrella-01', 'umbrella-02', 'umbrella-03', 'underline-01', 'underline-02', 'underline-square', 'upload-01', 'upload-02', 'upload-03', 'upload-04', 'upload-cloud-01', 'upload-cloud-02', 'usb-flash-drive', 'user-01', 'user-02', 'user-03', 'user-check-01', 'user-check-02', 'user-circle', 'user-down-01', 'user-down-02', 'user-edit', 'user-left-01', 'user-left-02', 'user-minus-01', 'user-minus-02', 'user-plus-01', 'user-plus-02', 'user-right-01', 'user-right-02', 'user-square', 'user-up-01', 'user-up-02', 'user-x-01', 'user-x-02', 'users-01', 'users-02', 'users-03', 'users-check', 'users-down', 'users-edit', 'users-left', 'users-minus', 'users-plus', 'users-right', 'users-up', 'users-x', 'variable', 'video-recorder', 'video-recorder-off', 'virus', 'voicemail', 'volume-max', 'volume-min', 'volume-minus', 'volume-plus', 'volume-x', 'wallet-01', 'wallet-02', 'wallet-03', 'wallet-04', 'wallet-05', 'watch-circle', 'watch-square', 'waves', 'webcam-01', 'webcam-02', 'wifi', 'wifi-off', 'wind-01', 'wind-02', 'wind-03', 'x', 'x-circle', 'x-close', 'x-square', 'youtube', 'zap', 'zap-circle', 'zap-fast', 'zap-off', 'zap-square', 'zoom-in', 'zoom-out');
  CREATE TYPE "public"."enum__pages_v_blocks_metrics_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum__pages_v_blocks_metrics_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum__pages_v_blocks_metrics_section_group" AS ENUM('before', 'test', 'after');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'tertiary', 'link-gray', 'link-color');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_group" AS ENUM('before', 'test', 'after');
  CREATE TYPE "public"."enum__pages_v_version_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_industries_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_job_titles_suffix_strategy" AS ENUM('redirect-301', 'redirect-302', 'rel-canonical');
  CREATE TYPE "public"."enum_job_titles_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_resume_content_type" AS ENUM('skill', 'experience', 'summary', 'accomplishment', 'affiliation', 'certification');
  CREATE TYPE "public"."enum_word_form_sets_type" AS ENUM('resumeWord', 'verb', 'adjective', 'contentWord');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_section_block_type" AS ENUM('heroSplit', 'blog', 'testimonials', 'metrics', 'cta');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_action" AS ENUM('hide', 'override-props');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_section_group" AS ENUM('before', 'test', 'after');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_blog_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_blog_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_cta_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_cta_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_tmpl_ovrd_target_type" AS ENUM('industry-category', 'industry', 'job-title');
  CREATE TYPE "public"."enum_tenants_supported_locales" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_tenant_page_configs_mode" AS ENUM('all', 'include', 'exclude');
  CREATE TYPE "public"."enum_tenant_page_configs_job_title_mode" AS ENUM('all-in-industries', 'specific', 'exclude-specific');
  CREATE TYPE "public"."enum_tenant_page_configs_keyword_landings_mode" AS ENUM('all', 'include', 'exclude');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_default_templates_blocks_hero_split_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_default_templates_blocks_hero_split_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_default_templates_blocks_blog_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_default_templates_blocks_blog_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_default_templates_blocks_blog_section_group" AS ENUM('before', 'test', 'after');
  CREATE TYPE "public"."enum_default_templates_blocks_testimonials_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_default_templates_blocks_testimonials_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_default_templates_blocks_testimonials_section_group" AS ENUM('before', 'test', 'after');
  CREATE TYPE "public"."enum_default_templates_blocks_metrics_metrics_icon" AS ENUM('activity', 'activity-heart', 'airplay', 'airpods', 'alarm-clock', 'alarm-clock-check', 'alarm-clock-minus', 'alarm-clock-off', 'alarm-clock-plus', 'alert-circle', 'alert-hexagon', 'alert-octagon', 'alert-square', 'alert-triangle', 'align-bottom-01', 'align-bottom-02', 'align-center', 'align-horizontal-centre-01', 'align-horizontal-centre-02', 'align-justify', 'align-left', 'align-left-01', 'align-left-02', 'align-right', 'align-right-01', 'align-right-02', 'align-top-arrow-01', 'align-top-arrow-02', 'align-vertical-center-01', 'align-vertical-center-02', 'anchor', 'annotation', 'annotation-alert', 'annotation-check', 'annotation-dots', 'annotation-heart', 'annotation-info', 'annotation-plus', 'annotation-question', 'annotation-x', 'announcement-01', 'announcement-02', 'announcement-03', 'archive', 'arrow-block-down', 'arrow-block-left', 'arrow-block-right', 'arrow-block-up', 'arrow-circle-broken-down', 'arrow-circle-broken-down-left', 'arrow-circle-broken-down-right', 'arrow-circle-broken-left', 'arrow-circle-broken-right', 'arrow-circle-broken-up', 'arrow-circle-broken-up-left', 'arrow-circle-broken-up-right', 'arrow-circle-down', 'arrow-circle-down-left', 'arrow-circle-down-right', 'arrow-circle-left', 'arrow-circle-right', 'arrow-circle-up', 'arrow-circle-up-left', 'arrow-circle-up-right', 'arrow-down', 'arrow-down-left', 'arrow-down-right', 'arrow-left', 'arrow-narrow-down', 'arrow-narrow-down-left', 'arrow-narrow-down-right', 'arrow-narrow-left', 'arrow-narrow-right', 'arrow-narrow-up', 'arrow-narrow-up-left', 'arrow-narrow-up-right', 'arrow-right', 'arrow-square-down', 'arrow-square-down-left', 'arrow-square-down-right', 'arrow-square-left', 'arrow-square-right', 'arrow-square-up', 'arrow-square-up-left', 'arrow-square-up-right', 'arrow-up', 'arrow-up-left', 'arrow-up-right', 'arrows-down', 'arrows-left', 'arrows-right', 'arrows-triangle', 'arrows-up', 'asterisk-01', 'asterisk-02', 'at-sign', 'atom-01', 'atom-02', 'attachment-01', 'attachment-02', 'award-01', 'award-02', 'award-03', 'award-04', 'award-05', 'backpack', 'bank', 'bank-note-01', 'bank-note-02', 'bank-note-03', 'bar-chart-01', 'bar-chart-02', 'bar-chart-03', 'bar-chart-04', 'bar-chart-05', 'bar-chart-06', 'bar-chart-07', 'bar-chart-08', 'bar-chart-09', 'bar-chart-10', 'bar-chart-11', 'bar-chart-12', 'bar-chart-circle-01', 'bar-chart-circle-02', 'bar-chart-circle-03', 'bar-chart-square-01', 'bar-chart-square-02', 'bar-chart-square-03', 'bar-chart-square-down', 'bar-chart-square-minus', 'bar-chart-square-plus', 'bar-chart-square-up', 'bar-line-chart', 'battery-charging-01', 'battery-charging-02', 'battery-empty', 'battery-full', 'battery-low', 'battery-mid', 'beaker-01', 'beaker-02', 'bell-01', 'bell-02', 'bell-03', 'bell-04', 'bell-minus', 'bell-off-01', 'bell-off-02', 'bell-off-03', 'bell-plus', 'bell-ringing-01', 'bell-ringing-02', 'bell-ringing-03', 'bell-ringing-04', 'bezier-curve-01', 'bezier-curve-02', 'bezier-curve-03', 'bluetooth-connect', 'bluetooth-off', 'bluetooth-on', 'bluetooth-signal', 'bold-01', 'bold-02', 'bold-square', 'book-closed', 'book-open-01', 'book-open-02', 'bookmark', 'bookmark-add', 'bookmark-check', 'bookmark-minus', 'bookmark-x', 'box', 'brackets', 'brackets-check', 'brackets-ellipses', 'brackets-minus', 'brackets-plus', 'brackets-slash', 'brackets-x', 'briefcase-01', 'briefcase-02', 'browser', 'brush-01', 'brush-02', 'brush-03', 'building-01', 'building-02', 'building-03', 'building-04', 'building-05', 'building-06', 'building-07', 'building-08', 'bus', 'calculator', 'calendar', 'calendar-check-01', 'calendar-check-02', 'calendar-date', 'calendar-heart-01', 'calendar-heart-02', 'calendar-minus-01', 'calendar-minus-02', 'calendar-plus-01', 'calendar-plus-02', 'camera-01', 'camera-02', 'camera-03', 'camera-lens', 'camera-off', 'camera-plus', 'car-01', 'car-02', 'certificate-01', 'certificate-02', 'chart-breakout-circle', 'chart-breakout-square', 'check', 'check-circle', 'check-circle-broken', 'check-done-01', 'check-done-02', 'check-heart', 'check-square', 'check-square-broken', 'check-verified-01', 'check-verified-02', 'check-verified-03', 'chevron-down', 'chevron-down-double', 'chevron-left', 'chevron-left-double', 'chevron-right', 'chevron-right-double', 'chevron-selector-horizontal', 'chevron-selector-vertical', 'chevron-up', 'chevron-up-double', 'chrome-cast', 'circle', 'circle-cut', 'clapperboard', 'clipboard', 'clipboard-attachment', 'clipboard-check', 'clipboard-download', 'clipboard-minus', 'clipboard-plus', 'clipboard-x', 'clock', 'clock-check', 'clock-fast-forward', 'clock-plus', 'clock-refresh', 'clock-rewind', 'clock-snooze', 'clock-stopwatch', 'cloud-01', 'cloud-02', 'cloud-03', 'cloud-blank-01', 'cloud-blank-02', 'cloud-lightning', 'cloud-moon', 'cloud-off', 'cloud-raining-01', 'cloud-raining-02', 'cloud-raining-03', 'cloud-raining-04', 'cloud-raining-05', 'cloud-raining-06', 'cloud-snowing-01', 'cloud-snowing-02', 'cloud-sun-01', 'cloud-sun-02', 'cloud-sun-03', 'code-01', 'code-02', 'code-browser', 'code-circle-01', 'code-circle-02', 'code-circle-03', 'code-snippet-01', 'code-snippet-02', 'code-square-01', 'code-square-02', 'codepen', 'coins-01', 'coins-02', 'coins-03', 'coins-04', 'coins-hand', 'coins-stacked-01', 'coins-stacked-02', 'coins-stacked-03', 'coins-stacked-04', 'coins-swap-01', 'coins-swap-02', 'colors', 'colors-1', 'columns-01', 'columns-02', 'columns-03', 'command', 'compass', 'compass-01', 'compass-02', 'compass-03', 'container', 'contrast-01', 'contrast-02', 'contrast-03', 'copy-01', 'copy-02', 'copy-03', 'copy-04', 'copy-05', 'copy-06', 'copy-07', 'corner-down-left', 'corner-down-right', 'corner-left-down', 'corner-left-up', 'corner-right-down', 'corner-right-up', 'corner-up-left', 'corner-up-right', 'cpu-chip-01', 'cpu-chip-02', 'credit-card-01', 'credit-card-02', 'credit-card-check', 'credit-card-down', 'credit-card-download', 'credit-card-edit', 'credit-card-lock', 'credit-card-minus', 'credit-card-plus', 'credit-card-refresh', 'credit-card-search', 'credit-card-shield', 'credit-card-up', 'credit-card-upload', 'credit-card-x', 'crop-01', 'crop-02', 'cryptocurrency-01', 'cryptocurrency-02', 'cryptocurrency-03', 'cryptocurrency-04', 'cube-01', 'cube-02', 'cube-03', 'cube-04', 'cube-outline', 'currency-bitcoin', 'currency-bitcoin-circle', 'currency-dollar', 'currency-dollar-circle', 'currency-ethereum', 'currency-ethereum-circle', 'currency-euro', 'currency-euro-circle', 'currency-pound', 'currency-pound-circle', 'currency-ruble', 'currency-ruble-circle', 'currency-rupee', 'currency-rupee-circle', 'currency-yen', 'currency-yen-circle', 'cursor-01', 'cursor-02', 'cursor-03', 'cursor-04', 'cursor-box', 'cursor-click-01', 'cursor-click-02', 'data', 'database-01', 'database-02', 'database-03', 'dataflow-01', 'dataflow-02', 'dataflow-03', 'dataflow-04', 'delete', 'diamond-01', 'diamond-02', 'dice-1', 'dice-2', 'dice-3', 'dice-4', 'dice-5', 'dice-6', 'disc-01', 'disc-02', 'distribute-spacing-horizontal', 'distribute-spacing-vertical', 'divide-01', 'divide-02', 'divide-03', 'divider', 'dotpoints-01', 'dotpoints-02', 'dots-grid', 'dots-horizontal', 'dots-vertical', 'download-01', 'download-02', 'download-03', 'download-04', 'download-cloud-01', 'download-cloud-02', 'drop', 'droplets-01', 'droplets-02', 'droplets-03', 'dropper', 'edit-01', 'edit-02', 'edit-03', 'edit-04', 'edit-05', 'equal', 'equal-not', 'eraser', 'expand-01', 'expand-02', 'expand-03', 'expand-04', 'expand-05', 'expand-06', 'eye', 'eye-off', 'face-content', 'face-frown', 'face-happy', 'face-id', 'face-id-square', 'face-neutral', 'face-sad', 'face-smile', 'face-wink', 'fast-backward', 'fast-forward', 'feather', 'figma', 'file-01', 'file-02', 'file-03', 'file-04', 'file-05', 'file-06', 'file-07', 'file-attachment-01', 'file-attachment-02', 'file-attachment-03', 'file-attachment-04', 'file-attachment-05', 'file-check-01', 'file-check-02', 'file-check-03', 'file-code-01', 'file-code-02', 'file-download-01', 'file-download-02', 'file-download-03', 'file-heart-01', 'file-heart-02', 'file-heart-03', 'file-lock-01', 'file-lock-02', 'file-lock-03', 'file-minus-01', 'file-minus-02', 'file-minus-03', 'file-plus-01', 'file-plus-02', 'file-plus-03', 'file-question-01', 'file-question-02', 'file-question-03', 'file-search-01', 'file-search-02', 'file-search-03', 'file-shield-01', 'file-shield-02', 'file-shield-03', 'file-x-01', 'file-x-02', 'file-x-03', 'film-01', 'film-02', 'film-03', 'filter-funnel-01', 'filter-funnel-02', 'filter-lines', 'fingerprint-01', 'fingerprint-02', 'fingerprint-03', 'fingerprint-04', 'flag-01', 'flag-02', 'flag-03', 'flag-04', 'flag-05', 'flag-06', 'flash', 'flash-off', 'flex-align-bottom', 'flex-align-left', 'flex-align-right', 'flex-align-top', 'flip-backward', 'flip-forward', 'folder', 'folder-check', 'folder-closed', 'folder-code', 'folder-download', 'folder-lock', 'folder-minus', 'folder-plus', 'folder-question', 'folder-search', 'folder-shield', 'folder-x', 'framer', 'gaming-pad-01', 'gaming-pad-02', 'gift-01', 'gift-02', 'git-branch-01', 'git-branch-02', 'git-commit', 'git-merge', 'git-pull-request', 'glasses-01', 'glasses-02', 'globe-01', 'globe-02', 'globe-03', 'globe-04', 'globe-05', 'globe-06', 'globe-slated-01', 'globe-slated-02', 'google-chrome', 'graduation-hat-01', 'graduation-hat-02', 'grid-01', 'grid-02', 'grid-03', 'grid-dots-blank', 'grid-dots-bottom', 'grid-dots-horizontal-center', 'grid-dots-left', 'grid-dots-outer', 'grid-dots-right', 'grid-dots-top', 'grid-dots-vertical-center', 'hand', 'hard-drive', 'hash-01', 'hash-02', 'heading-01', 'heading-02', 'heading-square', 'headphones-01', 'headphones-02', 'heart', 'heart-circle', 'heart-hand', 'heart-hexagon', 'heart-octagon', 'heart-rounded', 'heart-square', 'hearts', 'help-circle', 'help-octagon', 'help-octagon-1', 'help-square', 'hexagon-01', 'hexagon-02', 'home-01', 'home-02', 'home-03', 'home-04', 'home-05', 'home-line', 'home-smile', 'horizontal-bar-chart-01', 'horizontal-bar-chart-02', 'horizontal-bar-chart-03', 'hourglass-01', 'hourglass-02', 'hourglass-03', 'hurricane-01', 'hurricane-02', 'hurricane-03', 'image-01', 'image-02', 'image-03', 'image-04', 'image-05', 'image-check', 'image-down', 'image-indent-left', 'image-indent-right', 'image-left', 'image-plus', 'image-right', 'image-up', 'image-user', 'image-user-check', 'image-user-down', 'image-user-left', 'image-user-plus', 'image-user-right', 'image-user-up', 'image-user-x', 'image-x', 'inbox-01', 'inbox-02', 'infinity', 'info-circle', 'info-hexagon', 'info-octagon', 'info-square', 'intersect-circle', 'intersect-square', 'italic-01', 'italic-02', 'italic-square', 'key-01', 'key-02', 'keyboard-01', 'keyboard-02', 'laptop-01', 'laptop-02', 'layer-single', 'layers-three-01', 'layers-three-02', 'layers-two-01', 'layers-two-02', 'layout-alt-01', 'layout-alt-02', 'layout-alt-03', 'layout-alt-04', 'layout-bottom', 'layout-grid-01', 'layout-grid-02', 'layout-left', 'layout-right', 'layout-top', 'left-indent-01', 'left-indent-02', 'letter-spacing-01', 'letter-spacing-02', 'life-buoy-01', 'life-buoy-02', 'lightbulb-01', 'lightbulb-02', 'lightbulb-03', 'lightbulb-04', 'lightbulb-05', 'lightning-01', 'lightning-02', 'line-chart-down-01', 'line-chart-down-02', 'line-chart-down-03', 'line-chart-down-04', 'line-chart-down-05', 'line-chart-up-01', 'line-chart-up-02', 'line-chart-up-03', 'line-chart-up-04', 'line-chart-up-05', 'line-height', 'link-01', 'link-02', 'link-03', 'link-04', 'link-05', 'link-broken-01', 'link-broken-02', 'link-external-01', 'link-external-02', 'list', 'loading-01', 'loading-02', 'loading-03', 'lock-01', 'lock-02', 'lock-03', 'lock-04', 'lock-keyhole-circle', 'lock-keyhole-square', 'lock-unlocked-01', 'lock-unlocked-02', 'lock-unlocked-03', 'lock-unlocked-04', 'log-in-01', 'log-in-02', 'log-in-03', 'log-in-04', 'log-out-01', 'log-out-02', 'log-out-03', 'log-out-04', 'luggage-01', 'luggage-02', 'luggage-03', 'magic-wand-01', 'magic-wand-02', 'mail-01', 'mail-02', 'mail-03', 'mail-04', 'mail-05', 'map-01', 'map-02', 'mark', 'marker-pin-01', 'marker-pin-02', 'marker-pin-03', 'marker-pin-04', 'marker-pin-05', 'marker-pin-06', 'maximize-01', 'maximize-02', 'medical-circle', 'medical-cross', 'medical-square', 'menu-01', 'menu-02', 'menu-03', 'menu-04', 'menu-05', 'message-alert-circle', 'message-alert-square', 'message-chat-circle', 'message-chat-square', 'message-check-circle', 'message-check-square', 'message-circle-01', 'message-circle-02', 'message-dots-circle', 'message-dots-square', 'message-heart-circle', 'message-heart-square', 'message-notification-circle', 'message-notification-square', 'message-plus-circle', 'message-plus-square', 'message-question-circle', 'message-question-square', 'message-smile-circle', 'message-smile-square', 'message-square-01', 'message-square-02', 'message-text-circle-01', 'message-text-circle-02', 'message-text-square-01', 'message-text-square-02', 'message-x-circle', 'message-x-square', 'microphone-01', 'microphone-02', 'microphone-off-01', 'microphone-off-02', 'microscope', 'minimize-01', 'minimize-02', 'minus', 'minus-circle', 'minus-square', 'modem-01', 'modem-02', 'monitor-01', 'monitor-02', 'monitor-03', 'monitor-04', 'monitor-05', 'moon-01', 'moon-02', 'moon-eclipse', 'moon-star', 'mouse', 'move', 'music-note-01', 'music-note-02', 'music-note-plus', 'navigation-pointer-01', 'navigation-pointer-02', 'navigation-pointer-off-01', 'navigation-pointer-off-02', 'notification-box', 'notification-message', 'notification-text', 'octagon', 'package', 'package-check', 'package-minus', 'package-plus', 'package-search', 'package-x', 'paint', 'paint-pour', 'palette', 'paperclip', 'paragraph-spacing', 'paragraph-wrap', 'passcode', 'passcode-lock', 'passport', 'pause-circle', 'pause-square', 'pen-tool-01', 'pen-tool-02', 'pen-tool-minus', 'pen-tool-plus', 'pencil-01', 'pencil-02', 'pencil-line', 'pentagon', 'percent-01', 'percent-02', 'percent-03', 'perspective-01', 'perspective-02', 'phone', 'phone-01', 'phone-02', 'phone-call-01', 'phone-call-02', 'phone-hang-up', 'phone-incoming-01', 'phone-incoming-02', 'phone-outgoing-01', 'phone-outgoing-02', 'phone-pause', 'phone-plus', 'phone-x', 'pie-chart-01', 'pie-chart-02', 'pie-chart-03', 'pie-chart-04', 'piggy-bank-01', 'piggy-bank-02', 'pilcrow-01', 'pilcrow-02', 'pilcrow-square', 'pin-01', 'pin-02', 'placeholder', 'plane', 'play', 'play-circle', 'play-square', 'plus', 'plus-circle', 'plus-square', 'podcast', 'power-01', 'power-02', 'power-03', 'presentation-chart-01', 'presentation-chart-02', 'presentation-chart-03', 'printer', 'puzzle-piece-01', 'puzzle-piece-02', 'qr-code-01', 'qr-code-02', 'receipt', 'receipt-check', 'recording-01', 'recording-02', 'recording-03', 'reflect-01', 'reflect-02', 'refresh-ccw-01', 'refresh-ccw-02', 'refresh-ccw-03', 'refresh-ccw-04', 'refresh-ccw-05', 'refresh-cw-01', 'refresh-cw-02', 'refresh-cw-03', 'refresh-cw-04', 'refresh-cw-05', 'repeat-01', 'repeat-02', 'repeat-03', 'repeat-04', 'reverse-left', 'reverse-right', 'right-indent-01', 'right-indent-02', 'rocket-01', 'rocket-02', 'roller-brush', 'route', 'rows-01', 'rows-02', 'rows-03', 'rss-01', 'rss-02', 'ruler', 'safe', 'sale-01', 'sale-02', 'sale-03', 'sale-04', 'save-01', 'save-02', 'save-03', 'scale-01', 'scale-02', 'scale-03', 'scales-01', 'scales-02', 'scan', 'scissors-01', 'scissors-02', 'scissors-cut-01', 'scissors-cut-02', 'search-lg', 'search-md', 'search-refraction', 'search-sm', 'send-01', 'send-02', 'send-03', 'server-01', 'server-02', 'server-03', 'server-04', 'server-05', 'server-06', 'settings-01', 'settings-02', 'settings-03', 'settings-04', 'share-01', 'share-02', 'share-03', 'share-04', 'share-05', 'share-06', 'share-07', 'shield-01', 'shield-02', 'shield-03', 'shield-dollar', 'shield-off', 'shield-plus', 'shield-tick', 'shield-zap', 'shopping-bag-01', 'shopping-bag-02', 'shopping-bag-03', 'shopping-cart-01', 'shopping-cart-02', 'shopping-cart-03', 'shuffle-01', 'shuffle-02', 'signal-01', 'signal-02', 'signal-03', 'simcard', 'skew', 'skip-back', 'skip-forward', 'slash-circle-01', 'slash-circle-02', 'slash-divider', 'slash-octagon', 'sliders-01', 'sliders-02', 'sliders-03', 'sliders-04', 'snowflake-01', 'snowflake-02', 'spacing-height-01', 'spacing-height-02', 'spacing-width-01', 'spacing-width-02', 'speaker-01', 'speaker-02', 'speaker-03', 'speedometer-01', 'speedometer-02', 'speedometer-03', 'speedometer-04', 'square', 'stand', 'star-01', 'star-02', 'star-03', 'star-04', 'star-05', 'star-06', 'star-07', 'stars-01', 'stars-02', 'stars-03', 'sticker-circle', 'sticker-square', 'stop', 'stop-circle', 'stop-square', 'strikethrough-01', 'strikethrough-02', 'strikethrough-square', 'subscript', 'sun', 'sun-setting-01', 'sun-setting-02', 'sun-setting-03', 'sunrise', 'sunset', 'switch-horizontal-01', 'switch-horizontal-02', 'switch-vertical-01', 'switch-vertical-02', 'table', 'tablet-01', 'tablet-02', 'tag-01', 'tag-02', 'tag-03', 'target-01', 'target-02', 'target-03', 'target-04', 'target-05', 'telescope', 'terminal', 'terminal-browser', 'terminal-circle', 'terminal-square', 'text-input', 'thermometer-01', 'thermometer-02', 'thermometer-03', 'thermometer-cold', 'thermometer-warm', 'thumbs-down', 'thumbs-up', 'ticket-01', 'ticket-02', 'toggle-01-left', 'toggle-01-right', 'toggle-02-left', 'toggle-02-right', 'toggle-03-left', 'toggle-03-right', 'tool-01', 'tool-02', 'train', 'tram', 'transform', 'translate-01', 'translate-02', 'trash-01', 'trash-02', 'trash-03', 'trash-04', 'trend-down-01', 'trend-down-02', 'trend-up-01', 'trend-up-02', 'triangle', 'trophy-01', 'trophy-02', 'truck-01', 'truck-02', 'tv-01', 'tv-02', 'tv-03', 'type-01', 'type-02', 'type-square', 'type-strikethrough-01', 'type-strikethrough-02', 'umbrella-01', 'umbrella-02', 'umbrella-03', 'underline-01', 'underline-02', 'underline-square', 'upload-01', 'upload-02', 'upload-03', 'upload-04', 'upload-cloud-01', 'upload-cloud-02', 'usb-flash-drive', 'user-01', 'user-02', 'user-03', 'user-check-01', 'user-check-02', 'user-circle', 'user-down-01', 'user-down-02', 'user-edit', 'user-left-01', 'user-left-02', 'user-minus-01', 'user-minus-02', 'user-plus-01', 'user-plus-02', 'user-right-01', 'user-right-02', 'user-square', 'user-up-01', 'user-up-02', 'user-x-01', 'user-x-02', 'users-01', 'users-02', 'users-03', 'users-check', 'users-down', 'users-edit', 'users-left', 'users-minus', 'users-plus', 'users-right', 'users-up', 'users-x', 'variable', 'video-recorder', 'video-recorder-off', 'virus', 'voicemail', 'volume-max', 'volume-min', 'volume-minus', 'volume-plus', 'volume-x', 'wallet-01', 'wallet-02', 'wallet-03', 'wallet-04', 'wallet-05', 'watch-circle', 'watch-square', 'waves', 'webcam-01', 'webcam-02', 'wifi', 'wifi-off', 'wind-01', 'wind-02', 'wind-03', 'x', 'x-circle', 'x-close', 'x-square', 'youtube', 'zap', 'zap-circle', 'zap-fast', 'zap-off', 'zap-square', 'zoom-in', 'zoom-out');
  CREATE TYPE "public"."enum_default_templates_blocks_metrics_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_default_templates_blocks_metrics_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_default_templates_blocks_metrics_section_group" AS ENUM('before', 'test', 'after');
  CREATE TYPE "public"."enum_default_templates_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_default_templates_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'tertiary', 'link-gray', 'link-color');
  CREATE TYPE "public"."enum_default_templates_blocks_cta_heading_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_default_templates_blocks_cta_description_mode" AS ENUM('fixed', 'variation');
  CREATE TYPE "public"."enum_default_templates_blocks_cta_section_group" AS ENUM('before', 'test', 'after');
  CREATE TYPE "public"."enum_header_nav_items_dropdown_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_type" AS ENUM('link', 'dropdown');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_suffix_variations_canonical_strategy" AS ENUM('redirect-301', 'redirect-302', 'rel-canonical');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_tenants_roles" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_users_tenants_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric
  );
  
  CREATE TABLE "pages_blocks_hero_split_review_avatars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_hero_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_mode" "enum_pages_blocks_hero_split_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum_pages_blocks_hero_split_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"image_id" integer,
  	"review_rating" varchar DEFAULT '5.0',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_split_locales" (
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"form_placeholder" varchar DEFAULT 'Enter your email',
  	"form_button_label" varchar DEFAULT 'Get started',
  	"form_helper_text" varchar DEFAULT 'We care about your data in our privacy policy.',
  	"review_text" varchar DEFAULT 'from 200+ reviews',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_blog_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"thumbnail_id" integer,
  	"published_at" varchar,
  	"author_image_id" integer
  );
  
  CREATE TABLE "pages_blocks_blog_articles_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"category_name" varchar,
  	"reading_time" varchar,
  	"author_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_blog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_mode" "enum_pages_blocks_blog_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum_pages_blocks_blog_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"section_id" varchar,
  	"section_group" "enum_pages_blocks_blog_section_group" DEFAULT 'test',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_locales" (
  	"label" varchar DEFAULT 'Blog',
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"form_placeholder" varchar DEFAULT 'Enter your email',
  	"form_button_label" varchar DEFAULT 'Subscribe',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author_image_id" integer,
  	"company_name" varchar,
  	"company_logo_id" integer,
  	"company_logo_dark_id" integer
  );
  
  CREATE TABLE "pages_blocks_testimonials_reviews_locales" (
  	"quote" varchar,
  	"author_name" varchar,
  	"author_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_mode" "enum_pages_blocks_testimonials_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum_pages_blocks_testimonials_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"section_id" varchar,
  	"section_group" "enum_pages_blocks_testimonials_section_group" DEFAULT 'test',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_locales" (
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_metrics_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_metrics_metrics_icon",
  	"cta_link" varchar
  );
  
  CREATE TABLE "pages_blocks_metrics_metrics_locales" (
  	"label" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_mode" "enum_pages_blocks_metrics_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum_pages_blocks_metrics_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"section_id" varchar,
  	"section_group" "enum_pages_blocks_metrics_section_group" DEFAULT 'test',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_metrics_locales" (
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"variant" "enum_pages_blocks_cta_links_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_mode" "enum_pages_blocks_cta_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum_pages_blocks_cta_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"section_id" varchar,
  	"section_group" "enum_pages_blocks_cta_section_group" DEFAULT 'test',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"meta_robots" "enum_pages_meta_robots" DEFAULT 'index',
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"author_id" integer,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_split_review_avatars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_mode" "enum__pages_v_blocks_hero_split_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum__pages_v_blocks_hero_split_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"image_id" integer,
  	"review_rating" varchar DEFAULT '5.0',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_split_locales" (
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"form_placeholder" varchar DEFAULT 'Enter your email',
  	"form_button_label" varchar DEFAULT 'Get started',
  	"form_helper_text" varchar DEFAULT 'We care about your data in our privacy policy.',
  	"review_text" varchar DEFAULT 'from 200+ reviews',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_blog_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"thumbnail_id" integer,
  	"published_at" varchar,
  	"author_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_articles_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"category_name" varchar,
  	"reading_time" varchar,
  	"author_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_blog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_mode" "enum__pages_v_blocks_blog_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum__pages_v_blocks_blog_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"section_id" varchar,
  	"section_group" "enum__pages_v_blocks_blog_section_group" DEFAULT 'test',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_locales" (
  	"label" varchar DEFAULT 'Blog',
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"form_placeholder" varchar DEFAULT 'Enter your email',
  	"form_button_label" varchar DEFAULT 'Subscribe',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_image_id" integer,
  	"company_name" varchar,
  	"company_logo_id" integer,
  	"company_logo_dark_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_reviews_locales" (
  	"quote" varchar,
  	"author_name" varchar,
  	"author_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_mode" "enum__pages_v_blocks_testimonials_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum__pages_v_blocks_testimonials_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"section_id" varchar,
  	"section_group" "enum__pages_v_blocks_testimonials_section_group" DEFAULT 'test',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_locales" (
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_metrics_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_metrics_metrics_icon",
  	"cta_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_metrics_metrics_locales" (
  	"label" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_mode" "enum__pages_v_blocks_metrics_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum__pages_v_blocks_metrics_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"section_id" varchar,
  	"section_group" "enum__pages_v_blocks_metrics_section_group" DEFAULT 'test',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_metrics_locales" (
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"variant" "enum__pages_v_blocks_cta_links_variant" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_mode" "enum__pages_v_blocks_cta_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum__pages_v_blocks_cta_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"section_id" varchar,
  	"section_group" "enum__pages_v_blocks_cta_section_group" DEFAULT 'test',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_meta_robots" "enum__pages_v_version_meta_robots" DEFAULT 'index',
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_author_id" integer,
  	"version_parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "industry_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "industry_categories_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "industries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer,
  	"meta_robots" "enum_industries_meta_robots" DEFAULT 'index',
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"origin_source_id" integer,
  	"origin_imported_at" timestamp(3) with time zone,
  	"origin_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "industries_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "job_titles_suggested_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content_id" integer NOT NULL,
  	"experience_score" numeric DEFAULT 0,
  	"interest_score" numeric DEFAULT 0
  );
  
  CREATE TABLE "job_titles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"override_suffix" boolean DEFAULT false,
  	"suffix_adjective_id" integer,
  	"suffix_builder_id" integer,
  	"suffix_content_word_id" integer,
  	"suffix_strategy" "enum_job_titles_suffix_strategy",
  	"meta_robots" "enum_job_titles_meta_robots" DEFAULT 'index',
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"probability" numeric DEFAULT 0,
  	"origin_source_id" integer,
  	"origin_imported_at" timestamp(3) with time zone,
  	"origin_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "job_titles_locales" (
  	"name" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "job_titles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"industries_id" integer
  );
  
  CREATE TABLE "resume_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_resume_content_type" NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"origin_source_id" integer,
  	"origin_imported_at" timestamp(3) with time zone,
  	"origin_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resume_content_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "sources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "content_variations_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"weight" numeric DEFAULT 1
  );
  
  CREATE TABLE "content_variations_options_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "content_variations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"assignment_key" varchar,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "word_form_sets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"type" "enum_word_form_sets_type" NOT NULL,
  	"tenant_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "word_form_sets_locales" (
  	"rw_singular" varchar,
  	"rw_plural" varchar,
  	"rw_capitalized" varchar,
  	"rw_abbreviated" varchar,
  	"rw_abbreviatedcapitalized" varchar,
  	"rw_pluralcapitalized" varchar,
  	"rw_pluralabbreviated" varchar,
  	"rw_pluralabbreviatedcapitalized" varchar,
  	"v_worder" varchar,
  	"v_singular" varchar,
  	"v_capitalized" varchar,
  	"v_wordercapitalized" varchar,
  	"v_wording" varchar,
  	"v_wordingcapitalized" varchar,
  	"v_past" varchar,
  	"v_pastcapitalized" varchar,
  	"adj_singular" varchar,
  	"adj_capitalized" varchar,
  	"adj_adverb" varchar,
  	"adj_adverbcapitalized" varchar,
  	"cw_singular" varchar,
  	"cw_plural" varchar,
  	"cw_capitalized" varchar,
  	"cw_pluralcapitalized" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tmpl_ovrd_sect_ovrd" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_block_type" "enum_tmpl_ovrd_sect_ovrd_section_block_type",
  	"action" "enum_tmpl_ovrd_sect_ovrd_action" DEFAULT 'override-props',
  	"locked" boolean DEFAULT false,
  	"section_group" "enum_tmpl_ovrd_sect_ovrd_section_group",
  	"ovrds_herosplit_heading_mode" "enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_heading_mode" DEFAULT 'fixed',
  	"ovrds_herosplit_heading_variation_set_id" integer,
  	"ovrds_herosplit_description_mode" "enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_description_mode" DEFAULT 'fixed',
  	"ovrds_herosplit_description_variation_set_id" integer,
  	"ovrds_blog_heading_mode" "enum_tmpl_ovrd_sect_ovrd_ovrds_blog_heading_mode" DEFAULT 'fixed',
  	"ovrds_blog_heading_variation_set_id" integer,
  	"ovrds_blog_description_mode" "enum_tmpl_ovrd_sect_ovrd_ovrds_blog_description_mode" DEFAULT 'fixed',
  	"ovrds_blog_description_variation_set_id" integer,
  	"ovrds_testimonials_heading_mode" "enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_heading_mode" DEFAULT 'fixed',
  	"ovrds_testimonials_heading_variation_set_id" integer,
  	"ovrds_testimonials_description_mode" "enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_description_mode" DEFAULT 'fixed',
  	"ovrds_testimonials_description_variation_set_id" integer,
  	"ovrds_metrics_heading_mode" "enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_heading_mode" DEFAULT 'fixed',
  	"ovrds_metrics_heading_variation_set_id" integer,
  	"ovrds_metrics_description_mode" "enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_description_mode" DEFAULT 'fixed',
  	"ovrds_metrics_description_variation_set_id" integer,
  	"ovrds_cta_heading_mode" "enum_tmpl_ovrd_sect_ovrd_ovrds_cta_heading_mode" DEFAULT 'fixed',
  	"ovrds_cta_heading_variation_set_id" integer,
  	"ovrds_cta_description_mode" "enum_tmpl_ovrd_sect_ovrd_ovrds_cta_description_mode" DEFAULT 'fixed',
  	"ovrds_cta_description_variation_set_id" integer,
  	"advanced_overrides" jsonb
  );
  
  CREATE TABLE "tmpl_ovrd_sect_ovrd_locales" (
  	"ovrds_herosplit_heading_fixed_text" varchar,
  	"ovrds_herosplit_description_fixed_text" varchar,
  	"ovrds_blog_heading_fixed_text" varchar,
  	"ovrds_blog_description_fixed_text" varchar,
  	"ovrds_testimonials_heading_fixed_text" varchar,
  	"ovrds_testimonials_description_fixed_text" varchar,
  	"ovrds_metrics_heading_fixed_text" varchar,
  	"ovrds_metrics_description_fixed_text" varchar,
  	"ovrds_cta_heading_fixed_text" varchar,
  	"ovrds_cta_description_fixed_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "tmpl_ovrd" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"tenant_id" integer,
  	"target_type" "enum_tmpl_ovrd_target_type",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tmpl_ovrd_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"industry_categories_id" integer,
  	"industries_id" integer,
  	"job_titles_id" integer
  );
  
  CREATE TABLE "tenants_supported_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_tenants_supported_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tenants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"domain" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tenant_page_configs_keyword_landings_patterns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pattern" varchar
  );
  
  CREATE TABLE "tenant_page_configs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"mode" "enum_tenant_page_configs_mode" DEFAULT 'all',
  	"job_title_mode" "enum_tenant_page_configs_job_title_mode" DEFAULT 'all-in-industries',
  	"keyword_landings_enabled" boolean DEFAULT false,
  	"keyword_landings_mode" "enum_tenant_page_configs_keyword_landings_mode" DEFAULT 'all',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tenant_page_configs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"industries_id" integer,
  	"job_titles_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"industry_categories_id" integer,
  	"industries_id" integer,
  	"job_titles_id" integer,
  	"resume_content_id" integer,
  	"sources_id" integer,
  	"content_variations_id" integer,
  	"word_form_sets_id" integer,
  	"tmpl_ovrd_id" integer,
  	"tenants_id" integer,
  	"tenant_page_configs_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "default_templates_blocks_hero_split_review_avatars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "default_templates_blocks_hero_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_mode" "enum_default_templates_blocks_hero_split_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum_default_templates_blocks_hero_split_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"image_id" integer,
  	"review_rating" varchar DEFAULT '5.0',
  	"block_name" varchar
  );
  
  CREATE TABLE "default_templates_blocks_hero_split_locales" (
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"form_placeholder" varchar DEFAULT 'Enter your email',
  	"form_button_label" varchar DEFAULT 'Get started',
  	"form_helper_text" varchar DEFAULT 'We care about your data in our privacy policy.',
  	"review_text" varchar DEFAULT 'from 200+ reviews',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "default_templates_blocks_blog_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"thumbnail_id" integer,
  	"published_at" varchar,
  	"author_image_id" integer
  );
  
  CREATE TABLE "default_templates_blocks_blog_articles_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"category_name" varchar,
  	"reading_time" varchar,
  	"author_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "default_templates_blocks_blog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_mode" "enum_default_templates_blocks_blog_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum_default_templates_blocks_blog_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"section_id" varchar,
  	"section_group" "enum_default_templates_blocks_blog_section_group" DEFAULT 'test',
  	"block_name" varchar
  );
  
  CREATE TABLE "default_templates_blocks_blog_locales" (
  	"label" varchar DEFAULT 'Blog',
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"form_placeholder" varchar DEFAULT 'Enter your email',
  	"form_button_label" varchar DEFAULT 'Subscribe',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "default_templates_blocks_testimonials_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author_image_id" integer,
  	"company_name" varchar,
  	"company_logo_id" integer,
  	"company_logo_dark_id" integer
  );
  
  CREATE TABLE "default_templates_blocks_testimonials_reviews_locales" (
  	"quote" varchar,
  	"author_name" varchar,
  	"author_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "default_templates_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_mode" "enum_default_templates_blocks_testimonials_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum_default_templates_blocks_testimonials_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"section_id" varchar,
  	"section_group" "enum_default_templates_blocks_testimonials_section_group" DEFAULT 'test',
  	"block_name" varchar
  );
  
  CREATE TABLE "default_templates_blocks_testimonials_locales" (
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "default_templates_blocks_metrics_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_default_templates_blocks_metrics_metrics_icon",
  	"cta_link" varchar
  );
  
  CREATE TABLE "default_templates_blocks_metrics_metrics_locales" (
  	"label" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "default_templates_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_mode" "enum_default_templates_blocks_metrics_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum_default_templates_blocks_metrics_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"section_id" varchar,
  	"section_group" "enum_default_templates_blocks_metrics_section_group" DEFAULT 'test',
  	"block_name" varchar
  );
  
  CREATE TABLE "default_templates_blocks_metrics_locales" (
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "default_templates_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_default_templates_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"variant" "enum_default_templates_blocks_cta_links_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "default_templates_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "default_templates_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_mode" "enum_default_templates_blocks_cta_heading_mode" DEFAULT 'fixed',
  	"heading_variation_set_id" integer,
  	"description_mode" "enum_default_templates_blocks_cta_description_mode" DEFAULT 'fixed',
  	"description_variation_set_id" integer,
  	"section_id" varchar,
  	"section_group" "enum_default_templates_blocks_cta_section_group" DEFAULT 'test',
  	"block_name" varchar
  );
  
  CREATE TABLE "default_templates_blocks_cta_locales" (
  	"heading_fixed_text" varchar,
  	"description_fixed_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "default_templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "default_templates_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "header_nav_items_dropdown_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_dropdown_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "header_nav_items_dropdown_items_locales" (
  	"link_label" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_header_nav_items_type" DEFAULT 'link',
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"link_label" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "suffix_variations_resume_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"word_form_set_id" integer NOT NULL,
  	"weight" numeric DEFAULT 1,
  	"is_canonical" boolean DEFAULT false
  );
  
  CREATE TABLE "suffix_variations_adjectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"word_form_set_id" integer NOT NULL,
  	"weight" numeric DEFAULT 1,
  	"is_canonical" boolean DEFAULT false
  );
  
  CREATE TABLE "suffix_variations_builders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"word_form_set_id" integer NOT NULL,
  	"weight" numeric DEFAULT 1,
  	"is_canonical" boolean DEFAULT false
  );
  
  CREATE TABLE "suffix_variations_content_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"word_form_set_id" integer NOT NULL,
  	"weight" numeric DEFAULT 1,
  	"is_canonical" boolean DEFAULT false
  );
  
  CREATE TABLE "suffix_variations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"default_suffix_count" numeric DEFAULT 3,
  	"canonical_strategy" "enum_suffix_variations_canonical_strategy" DEFAULT 'rel-canonical',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_tenants_roles" ADD CONSTRAINT "users_tenants_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users_tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_split_review_avatars" ADD CONSTRAINT "pages_blocks_hero_split_review_avatars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_split_review_avatars" ADD CONSTRAINT "pages_blocks_hero_split_review_avatars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_split" ADD CONSTRAINT "pages_blocks_hero_split_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_split" ADD CONSTRAINT "pages_blocks_hero_split_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_split" ADD CONSTRAINT "pages_blocks_hero_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_split" ADD CONSTRAINT "pages_blocks_hero_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_split_locales" ADD CONSTRAINT "pages_blocks_hero_split_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_articles" ADD CONSTRAINT "pages_blocks_blog_articles_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_articles" ADD CONSTRAINT "pages_blocks_blog_articles_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_articles" ADD CONSTRAINT "pages_blocks_blog_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_articles_locales" ADD CONSTRAINT "pages_blocks_blog_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_blog_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog" ADD CONSTRAINT "pages_blocks_blog_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog" ADD CONSTRAINT "pages_blocks_blog_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog" ADD CONSTRAINT "pages_blocks_blog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_locales" ADD CONSTRAINT "pages_blocks_blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_reviews" ADD CONSTRAINT "pages_blocks_testimonials_reviews_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_reviews" ADD CONSTRAINT "pages_blocks_testimonials_reviews_company_logo_id_media_id_fk" FOREIGN KEY ("company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_reviews" ADD CONSTRAINT "pages_blocks_testimonials_reviews_company_logo_dark_id_media_id_fk" FOREIGN KEY ("company_logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_reviews" ADD CONSTRAINT "pages_blocks_testimonials_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_reviews_locales" ADD CONSTRAINT "pages_blocks_testimonials_reviews_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_locales" ADD CONSTRAINT "pages_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics_metrics" ADD CONSTRAINT "pages_blocks_metrics_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics_metrics_locales" ADD CONSTRAINT "pages_blocks_metrics_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_metrics_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics" ADD CONSTRAINT "pages_blocks_metrics_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics" ADD CONSTRAINT "pages_blocks_metrics_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics" ADD CONSTRAINT "pages_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics_locales" ADD CONSTRAINT "pages_blocks_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links_locales" ADD CONSTRAINT "pages_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_split_review_avatars" ADD CONSTRAINT "_pages_v_blocks_hero_split_review_avatars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_split_review_avatars" ADD CONSTRAINT "_pages_v_blocks_hero_split_review_avatars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_split" ADD CONSTRAINT "_pages_v_blocks_hero_split_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_split" ADD CONSTRAINT "_pages_v_blocks_hero_split_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_split" ADD CONSTRAINT "_pages_v_blocks_hero_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_split" ADD CONSTRAINT "_pages_v_blocks_hero_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_split_locales" ADD CONSTRAINT "_pages_v_blocks_hero_split_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_articles" ADD CONSTRAINT "_pages_v_blocks_blog_articles_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_articles" ADD CONSTRAINT "_pages_v_blocks_blog_articles_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_articles" ADD CONSTRAINT "_pages_v_blocks_blog_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_articles_locales" ADD CONSTRAINT "_pages_v_blocks_blog_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_blog_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog" ADD CONSTRAINT "_pages_v_blocks_blog_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog" ADD CONSTRAINT "_pages_v_blocks_blog_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog" ADD CONSTRAINT "_pages_v_blocks_blog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_locales" ADD CONSTRAINT "_pages_v_blocks_blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_reviews" ADD CONSTRAINT "_pages_v_blocks_testimonials_reviews_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_reviews" ADD CONSTRAINT "_pages_v_blocks_testimonials_reviews_company_logo_id_media_id_fk" FOREIGN KEY ("company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_reviews" ADD CONSTRAINT "_pages_v_blocks_testimonials_reviews_company_logo_dark_id_media_id_fk" FOREIGN KEY ("company_logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_reviews" ADD CONSTRAINT "_pages_v_blocks_testimonials_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_reviews_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_reviews_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics_metrics" ADD CONSTRAINT "_pages_v_blocks_metrics_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics_metrics_locales" ADD CONSTRAINT "_pages_v_blocks_metrics_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_metrics_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics" ADD CONSTRAINT "_pages_v_blocks_metrics_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics" ADD CONSTRAINT "_pages_v_blocks_metrics_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics" ADD CONSTRAINT "_pages_v_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics_locales" ADD CONSTRAINT "_pages_v_blocks_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links_locales" ADD CONSTRAINT "_pages_v_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industry_categories_locales" ADD CONSTRAINT "industry_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industry_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries" ADD CONSTRAINT "industries_category_id_industry_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."industry_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries" ADD CONSTRAINT "industries_origin_source_id_sources_id_fk" FOREIGN KEY ("origin_source_id") REFERENCES "public"."sources"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries_locales" ADD CONSTRAINT "industries_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries_locales" ADD CONSTRAINT "industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_titles_suggested_content" ADD CONSTRAINT "job_titles_suggested_content_content_id_resume_content_id_fk" FOREIGN KEY ("content_id") REFERENCES "public"."resume_content"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_titles_suggested_content" ADD CONSTRAINT "job_titles_suggested_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_titles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_titles" ADD CONSTRAINT "job_titles_suffix_adjective_id_word_form_sets_id_fk" FOREIGN KEY ("suffix_adjective_id") REFERENCES "public"."word_form_sets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_titles" ADD CONSTRAINT "job_titles_suffix_builder_id_word_form_sets_id_fk" FOREIGN KEY ("suffix_builder_id") REFERENCES "public"."word_form_sets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_titles" ADD CONSTRAINT "job_titles_suffix_content_word_id_word_form_sets_id_fk" FOREIGN KEY ("suffix_content_word_id") REFERENCES "public"."word_form_sets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_titles" ADD CONSTRAINT "job_titles_origin_source_id_sources_id_fk" FOREIGN KEY ("origin_source_id") REFERENCES "public"."sources"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_titles_locales" ADD CONSTRAINT "job_titles_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_titles_locales" ADD CONSTRAINT "job_titles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_titles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_titles_rels" ADD CONSTRAINT "job_titles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."job_titles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_titles_rels" ADD CONSTRAINT "job_titles_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_content" ADD CONSTRAINT "resume_content_origin_source_id_sources_id_fk" FOREIGN KEY ("origin_source_id") REFERENCES "public"."sources"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resume_content_locales" ADD CONSTRAINT "resume_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_variations_options" ADD CONSTRAINT "content_variations_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_variations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_variations_options_locales" ADD CONSTRAINT "content_variations_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_variations_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_variations" ADD CONSTRAINT "content_variations_parent_id_content_variations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "word_form_sets" ADD CONSTRAINT "word_form_sets_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "word_form_sets_locales" ADD CONSTRAINT "word_form_sets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."word_form_sets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_herosplit_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("ovrds_herosplit_heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_herosplit_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("ovrds_herosplit_description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_blog_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("ovrds_blog_heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_blog_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("ovrds_blog_description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_testimonials_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("ovrds_testimonials_heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_testimonials_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("ovrds_testimonials_description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_metrics_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("ovrds_metrics_heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_metrics_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("ovrds_metrics_description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_cta_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("ovrds_cta_heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_ovrds_cta_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("ovrds_cta_description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tmpl_ovrd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_sect_ovrd_locales" ADD CONSTRAINT "tmpl_ovrd_sect_ovrd_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tmpl_ovrd_sect_ovrd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd" ADD CONSTRAINT "tmpl_ovrd_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_rels" ADD CONSTRAINT "tmpl_ovrd_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tmpl_ovrd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_rels" ADD CONSTRAINT "tmpl_ovrd_rels_industry_categories_fk" FOREIGN KEY ("industry_categories_id") REFERENCES "public"."industry_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_rels" ADD CONSTRAINT "tmpl_ovrd_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tmpl_ovrd_rels" ADD CONSTRAINT "tmpl_ovrd_rels_job_titles_fk" FOREIGN KEY ("job_titles_id") REFERENCES "public"."job_titles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tenants_supported_locales" ADD CONSTRAINT "tenants_supported_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tenant_page_configs_keyword_landings_patterns" ADD CONSTRAINT "tenant_page_configs_keyword_landings_patterns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tenant_page_configs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tenant_page_configs" ADD CONSTRAINT "tenant_page_configs_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tenant_page_configs_rels" ADD CONSTRAINT "tenant_page_configs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tenant_page_configs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tenant_page_configs_rels" ADD CONSTRAINT "tenant_page_configs_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tenant_page_configs_rels" ADD CONSTRAINT "tenant_page_configs_rels_job_titles_fk" FOREIGN KEY ("job_titles_id") REFERENCES "public"."job_titles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_industry_categories_fk" FOREIGN KEY ("industry_categories_id") REFERENCES "public"."industry_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_job_titles_fk" FOREIGN KEY ("job_titles_id") REFERENCES "public"."job_titles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resume_content_fk" FOREIGN KEY ("resume_content_id") REFERENCES "public"."resume_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sources_fk" FOREIGN KEY ("sources_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_content_variations_fk" FOREIGN KEY ("content_variations_id") REFERENCES "public"."content_variations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_word_form_sets_fk" FOREIGN KEY ("word_form_sets_id") REFERENCES "public"."word_form_sets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_template_overrides_fk" FOREIGN KEY ("tmpl_ovrd_id") REFERENCES "public"."tmpl_ovrd"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenant_page_configs_fk" FOREIGN KEY ("tenant_page_configs_id") REFERENCES "public"."tenant_page_configs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_hero_split_review_avatars" ADD CONSTRAINT "default_templates_blocks_hero_split_review_avatars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_hero_split_review_avatars" ADD CONSTRAINT "default_templates_blocks_hero_split_review_avatars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates_blocks_hero_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_hero_split" ADD CONSTRAINT "default_templates_blocks_hero_split_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_hero_split" ADD CONSTRAINT "default_templates_blocks_hero_split_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_hero_split" ADD CONSTRAINT "default_templates_blocks_hero_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_hero_split" ADD CONSTRAINT "default_templates_blocks_hero_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_hero_split_locales" ADD CONSTRAINT "default_templates_blocks_hero_split_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates_blocks_hero_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_blog_articles" ADD CONSTRAINT "default_templates_blocks_blog_articles_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_blog_articles" ADD CONSTRAINT "default_templates_blocks_blog_articles_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_blog_articles" ADD CONSTRAINT "default_templates_blocks_blog_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_blog_articles_locales" ADD CONSTRAINT "default_templates_blocks_blog_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates_blocks_blog_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_blog" ADD CONSTRAINT "default_templates_blocks_blog_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_blog" ADD CONSTRAINT "default_templates_blocks_blog_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_blog" ADD CONSTRAINT "default_templates_blocks_blog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_blog_locales" ADD CONSTRAINT "default_templates_blocks_blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_testimonials_reviews" ADD CONSTRAINT "default_templates_blocks_testimonials_reviews_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_testimonials_reviews" ADD CONSTRAINT "default_templates_blocks_testimonials_reviews_company_logo_id_media_id_fk" FOREIGN KEY ("company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_testimonials_reviews" ADD CONSTRAINT "default_templates_blocks_testimonials_reviews_company_logo_dark_id_media_id_fk" FOREIGN KEY ("company_logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_testimonials_reviews" ADD CONSTRAINT "default_templates_blocks_testimonials_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_testimonials_reviews_locales" ADD CONSTRAINT "default_templates_blocks_testimonials_reviews_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates_blocks_testimonials_reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_testimonials" ADD CONSTRAINT "default_templates_blocks_testimonials_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_testimonials" ADD CONSTRAINT "default_templates_blocks_testimonials_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_testimonials" ADD CONSTRAINT "default_templates_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_testimonials_locales" ADD CONSTRAINT "default_templates_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_metrics_metrics" ADD CONSTRAINT "default_templates_blocks_metrics_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_metrics_metrics_locales" ADD CONSTRAINT "default_templates_blocks_metrics_metrics_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates_blocks_metrics_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_metrics" ADD CONSTRAINT "default_templates_blocks_metrics_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_metrics" ADD CONSTRAINT "default_templates_blocks_metrics_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_metrics" ADD CONSTRAINT "default_templates_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_metrics_locales" ADD CONSTRAINT "default_templates_blocks_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_cta_links" ADD CONSTRAINT "default_templates_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_cta_links_locales" ADD CONSTRAINT "default_templates_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_cta" ADD CONSTRAINT "default_templates_blocks_cta_heading_variation_set_id_content_variations_id_fk" FOREIGN KEY ("heading_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_cta" ADD CONSTRAINT "default_templates_blocks_cta_description_variation_set_id_content_variations_id_fk" FOREIGN KEY ("description_variation_set_id") REFERENCES "public"."content_variations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_cta" ADD CONSTRAINT "default_templates_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_blocks_cta_locales" ADD CONSTRAINT "default_templates_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."default_templates_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_rels" ADD CONSTRAINT "default_templates_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."default_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "default_templates_rels" ADD CONSTRAINT "default_templates_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_dropdown_items" ADD CONSTRAINT "header_nav_items_dropdown_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_dropdown_items_locales" ADD CONSTRAINT "header_nav_items_dropdown_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_dropdown_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "suffix_variations_resume_words" ADD CONSTRAINT "suffix_variations_resume_words_word_form_set_id_word_form_sets_id_fk" FOREIGN KEY ("word_form_set_id") REFERENCES "public"."word_form_sets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "suffix_variations_resume_words" ADD CONSTRAINT "suffix_variations_resume_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."suffix_variations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "suffix_variations_adjectives" ADD CONSTRAINT "suffix_variations_adjectives_word_form_set_id_word_form_sets_id_fk" FOREIGN KEY ("word_form_set_id") REFERENCES "public"."word_form_sets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "suffix_variations_adjectives" ADD CONSTRAINT "suffix_variations_adjectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."suffix_variations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "suffix_variations_builders" ADD CONSTRAINT "suffix_variations_builders_word_form_set_id_word_form_sets_id_fk" FOREIGN KEY ("word_form_set_id") REFERENCES "public"."word_form_sets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "suffix_variations_builders" ADD CONSTRAINT "suffix_variations_builders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."suffix_variations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "suffix_variations_content_words" ADD CONSTRAINT "suffix_variations_content_words_word_form_set_id_word_form_sets_id_fk" FOREIGN KEY ("word_form_set_id") REFERENCES "public"."word_form_sets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "suffix_variations_content_words" ADD CONSTRAINT "suffix_variations_content_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."suffix_variations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_tenants_roles_order_idx" ON "users_tenants_roles" USING btree ("order");
  CREATE INDEX "users_tenants_roles_parent_idx" ON "users_tenants_roles" USING btree ("parent_id");
  CREATE INDEX "users_tenants_order_idx" ON "users_tenants" USING btree ("_order");
  CREATE INDEX "users_tenants_parent_id_idx" ON "users_tenants" USING btree ("_parent_id");
  CREATE INDEX "users_tenants_tenant_idx" ON "users_tenants" USING btree ("tenant_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_tenant_idx" ON "media" USING btree ("tenant_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "pages_blocks_hero_split_review_avatars_order_idx" ON "pages_blocks_hero_split_review_avatars" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_split_review_avatars_parent_id_idx" ON "pages_blocks_hero_split_review_avatars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_split_review_avatars_image_idx" ON "pages_blocks_hero_split_review_avatars" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_split_order_idx" ON "pages_blocks_hero_split" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_split_parent_id_idx" ON "pages_blocks_hero_split" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_split_path_idx" ON "pages_blocks_hero_split" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_split_heading_heading_variation_set_idx" ON "pages_blocks_hero_split" USING btree ("heading_variation_set_id");
  CREATE INDEX "pages_blocks_hero_split_description_description_variatio_idx" ON "pages_blocks_hero_split" USING btree ("description_variation_set_id");
  CREATE INDEX "pages_blocks_hero_split_image_idx" ON "pages_blocks_hero_split" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_split_locales_locale_parent_id_unique" ON "pages_blocks_hero_split_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_blog_articles_order_idx" ON "pages_blocks_blog_articles" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_articles_parent_id_idx" ON "pages_blocks_blog_articles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_articles_thumbnail_idx" ON "pages_blocks_blog_articles" USING btree ("thumbnail_id");
  CREATE INDEX "pages_blocks_blog_articles_author_image_idx" ON "pages_blocks_blog_articles" USING btree ("author_image_id");
  CREATE UNIQUE INDEX "pages_blocks_blog_articles_locales_locale_parent_id_unique" ON "pages_blocks_blog_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_blog_order_idx" ON "pages_blocks_blog" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_parent_id_idx" ON "pages_blocks_blog" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_path_idx" ON "pages_blocks_blog" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_heading_heading_variation_set_idx" ON "pages_blocks_blog" USING btree ("heading_variation_set_id");
  CREATE INDEX "pages_blocks_blog_description_description_variation_set_idx" ON "pages_blocks_blog" USING btree ("description_variation_set_id");
  CREATE UNIQUE INDEX "pages_blocks_blog_locales_locale_parent_id_unique" ON "pages_blocks_blog_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_reviews_order_idx" ON "pages_blocks_testimonials_reviews" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_reviews_parent_id_idx" ON "pages_blocks_testimonials_reviews" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_reviews_author_image_idx" ON "pages_blocks_testimonials_reviews" USING btree ("author_image_id");
  CREATE INDEX "pages_blocks_testimonials_reviews_company_logo_idx" ON "pages_blocks_testimonials_reviews" USING btree ("company_logo_id");
  CREATE INDEX "pages_blocks_testimonials_reviews_company_logo_dark_idx" ON "pages_blocks_testimonials_reviews" USING btree ("company_logo_dark_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_reviews_locales_locale_parent_id_u" ON "pages_blocks_testimonials_reviews_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_heading_heading_variation_set_idx" ON "pages_blocks_testimonials" USING btree ("heading_variation_set_id");
  CREATE INDEX "pages_blocks_testimonials_description_description_variat_idx" ON "pages_blocks_testimonials" USING btree ("description_variation_set_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_locales_locale_parent_id_unique" ON "pages_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_metrics_metrics_order_idx" ON "pages_blocks_metrics_metrics" USING btree ("_order");
  CREATE INDEX "pages_blocks_metrics_metrics_parent_id_idx" ON "pages_blocks_metrics_metrics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_metrics_metrics_locales_locale_parent_id_unique" ON "pages_blocks_metrics_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_metrics_order_idx" ON "pages_blocks_metrics" USING btree ("_order");
  CREATE INDEX "pages_blocks_metrics_parent_id_idx" ON "pages_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_metrics_path_idx" ON "pages_blocks_metrics" USING btree ("_path");
  CREATE INDEX "pages_blocks_metrics_heading_heading_variation_set_idx" ON "pages_blocks_metrics" USING btree ("heading_variation_set_id");
  CREATE INDEX "pages_blocks_metrics_description_description_variation_s_idx" ON "pages_blocks_metrics" USING btree ("description_variation_set_id");
  CREATE UNIQUE INDEX "pages_blocks_metrics_locales_locale_parent_id_unique" ON "pages_blocks_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_links_locales_locale_parent_id_unique" ON "pages_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_heading_heading_variation_set_idx" ON "pages_blocks_cta" USING btree ("heading_variation_set_id");
  CREATE INDEX "pages_blocks_cta_description_description_variation_set_idx" ON "pages_blocks_cta" USING btree ("description_variation_set_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_breadcrumbs_order_idx" ON "pages_breadcrumbs" USING btree ("_order");
  CREATE INDEX "pages_breadcrumbs_parent_id_idx" ON "pages_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "pages_breadcrumbs_locale_idx" ON "pages_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "pages_breadcrumbs_doc_idx" ON "pages_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "pages_tenant_idx" ON "pages" USING btree ("tenant_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_author_idx" ON "pages" USING btree ("author_id");
  CREATE INDEX "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_blocks_hero_split_review_avatars_order_idx" ON "_pages_v_blocks_hero_split_review_avatars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_split_review_avatars_parent_id_idx" ON "_pages_v_blocks_hero_split_review_avatars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_split_review_avatars_image_idx" ON "_pages_v_blocks_hero_split_review_avatars" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hero_split_order_idx" ON "_pages_v_blocks_hero_split" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_split_parent_id_idx" ON "_pages_v_blocks_hero_split" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_split_path_idx" ON "_pages_v_blocks_hero_split" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_split_heading_heading_variation_set_idx" ON "_pages_v_blocks_hero_split" USING btree ("heading_variation_set_id");
  CREATE INDEX "_pages_v_blocks_hero_split_description_description_varia_idx" ON "_pages_v_blocks_hero_split" USING btree ("description_variation_set_id");
  CREATE INDEX "_pages_v_blocks_hero_split_image_idx" ON "_pages_v_blocks_hero_split" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_split_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_split_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_articles_order_idx" ON "_pages_v_blocks_blog_articles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_articles_parent_id_idx" ON "_pages_v_blocks_blog_articles" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_articles_thumbnail_idx" ON "_pages_v_blocks_blog_articles" USING btree ("thumbnail_id");
  CREATE INDEX "_pages_v_blocks_blog_articles_author_image_idx" ON "_pages_v_blocks_blog_articles" USING btree ("author_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_blog_articles_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_blog_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_order_idx" ON "_pages_v_blocks_blog" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_parent_id_idx" ON "_pages_v_blocks_blog" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_path_idx" ON "_pages_v_blocks_blog" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_blog_heading_heading_variation_set_idx" ON "_pages_v_blocks_blog" USING btree ("heading_variation_set_id");
  CREATE INDEX "_pages_v_blocks_blog_description_description_variation_s_idx" ON "_pages_v_blocks_blog" USING btree ("description_variation_set_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_blog_locales_locale_parent_id_unique" ON "_pages_v_blocks_blog_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_reviews_order_idx" ON "_pages_v_blocks_testimonials_reviews" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_reviews_parent_id_idx" ON "_pages_v_blocks_testimonials_reviews" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_reviews_author_image_idx" ON "_pages_v_blocks_testimonials_reviews" USING btree ("author_image_id");
  CREATE INDEX "_pages_v_blocks_testimonials_reviews_company_logo_idx" ON "_pages_v_blocks_testimonials_reviews" USING btree ("company_logo_id");
  CREATE INDEX "_pages_v_blocks_testimonials_reviews_company_logo_dark_idx" ON "_pages_v_blocks_testimonials_reviews" USING btree ("company_logo_dark_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_reviews_locales_locale_parent_i" ON "_pages_v_blocks_testimonials_reviews_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_heading_heading_variation_s_idx" ON "_pages_v_blocks_testimonials" USING btree ("heading_variation_set_id");
  CREATE INDEX "_pages_v_blocks_testimonials_description_description_var_idx" ON "_pages_v_blocks_testimonials" USING btree ("description_variation_set_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_locales_locale_parent_id_unique" ON "_pages_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_metrics_metrics_order_idx" ON "_pages_v_blocks_metrics_metrics" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_metrics_metrics_parent_id_idx" ON "_pages_v_blocks_metrics_metrics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_metrics_metrics_locales_locale_parent_id_uni" ON "_pages_v_blocks_metrics_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_metrics_order_idx" ON "_pages_v_blocks_metrics" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_metrics_parent_id_idx" ON "_pages_v_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_metrics_path_idx" ON "_pages_v_blocks_metrics" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_metrics_heading_heading_variation_set_idx" ON "_pages_v_blocks_metrics" USING btree ("heading_variation_set_id");
  CREATE INDEX "_pages_v_blocks_metrics_description_description_variatio_idx" ON "_pages_v_blocks_metrics" USING btree ("description_variation_set_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_metrics_locales_locale_parent_id_unique" ON "_pages_v_blocks_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_heading_heading_variation_set_idx" ON "_pages_v_blocks_cta" USING btree ("heading_variation_set_id");
  CREATE INDEX "_pages_v_blocks_cta_description_description_variation_se_idx" ON "_pages_v_blocks_cta" USING btree ("description_variation_set_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_version_breadcrumbs_order_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_pages_v_version_breadcrumbs_parent_id_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_breadcrumbs_locale_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_breadcrumbs_doc_idx" ON "_pages_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_tenant_idx" ON "_pages_v" USING btree ("version_tenant_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_author_idx" ON "_pages_v" USING btree ("version_author_id");
  CREATE INDEX "_pages_v_version_version_parent_idx" ON "_pages_v" USING btree ("version_parent_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE UNIQUE INDEX "industry_categories_slug_idx" ON "industry_categories" USING btree ("slug");
  CREATE INDEX "industry_categories_updated_at_idx" ON "industry_categories" USING btree ("updated_at");
  CREATE INDEX "industry_categories_created_at_idx" ON "industry_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "industry_categories_locales_locale_parent_id_unique" ON "industry_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "industries_category_idx" ON "industries" USING btree ("category_id");
  CREATE UNIQUE INDEX "industries_slug_idx" ON "industries" USING btree ("slug");
  CREATE INDEX "industries_origin_origin_source_idx" ON "industries" USING btree ("origin_source_id");
  CREATE INDEX "industries_updated_at_idx" ON "industries" USING btree ("updated_at");
  CREATE INDEX "industries_created_at_idx" ON "industries" USING btree ("created_at");
  CREATE INDEX "industries_meta_meta_image_idx" ON "industries_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "industries_locales_locale_parent_id_unique" ON "industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "job_titles_suggested_content_order_idx" ON "job_titles_suggested_content" USING btree ("_order");
  CREATE INDEX "job_titles_suggested_content_parent_id_idx" ON "job_titles_suggested_content" USING btree ("_parent_id");
  CREATE INDEX "job_titles_suggested_content_content_idx" ON "job_titles_suggested_content" USING btree ("content_id");
  CREATE INDEX "job_titles_suffix_adjective_idx" ON "job_titles" USING btree ("suffix_adjective_id");
  CREATE INDEX "job_titles_suffix_builder_idx" ON "job_titles" USING btree ("suffix_builder_id");
  CREATE INDEX "job_titles_suffix_content_word_idx" ON "job_titles" USING btree ("suffix_content_word_id");
  CREATE UNIQUE INDEX "job_titles_slug_idx" ON "job_titles" USING btree ("slug");
  CREATE INDEX "job_titles_origin_origin_source_idx" ON "job_titles" USING btree ("origin_source_id");
  CREATE INDEX "job_titles_updated_at_idx" ON "job_titles" USING btree ("updated_at");
  CREATE INDEX "job_titles_created_at_idx" ON "job_titles" USING btree ("created_at");
  CREATE INDEX "job_titles_meta_meta_image_idx" ON "job_titles_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "job_titles_locales_locale_parent_id_unique" ON "job_titles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "job_titles_rels_order_idx" ON "job_titles_rels" USING btree ("order");
  CREATE INDEX "job_titles_rels_parent_idx" ON "job_titles_rels" USING btree ("parent_id");
  CREATE INDEX "job_titles_rels_path_idx" ON "job_titles_rels" USING btree ("path");
  CREATE INDEX "job_titles_rels_industries_id_idx" ON "job_titles_rels" USING btree ("industries_id");
  CREATE INDEX "resume_content_type_idx" ON "resume_content" USING btree ("type");
  CREATE UNIQUE INDEX "resume_content_slug_idx" ON "resume_content" USING btree ("slug");
  CREATE INDEX "resume_content_origin_origin_source_idx" ON "resume_content" USING btree ("origin_source_id");
  CREATE INDEX "resume_content_updated_at_idx" ON "resume_content" USING btree ("updated_at");
  CREATE INDEX "resume_content_created_at_idx" ON "resume_content" USING btree ("created_at");
  CREATE UNIQUE INDEX "resume_content_locales_locale_parent_id_unique" ON "resume_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "sources_name_idx" ON "sources" USING btree ("name");
  CREATE UNIQUE INDEX "sources_slug_idx" ON "sources" USING btree ("slug");
  CREATE INDEX "sources_updated_at_idx" ON "sources" USING btree ("updated_at");
  CREATE INDEX "sources_created_at_idx" ON "sources" USING btree ("created_at");
  CREATE INDEX "content_variations_options_order_idx" ON "content_variations_options" USING btree ("_order");
  CREATE INDEX "content_variations_options_parent_id_idx" ON "content_variations_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "content_variations_options_locales_locale_parent_id_unique" ON "content_variations_options_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "content_variations_assignment_key_idx" ON "content_variations" USING btree ("assignment_key");
  CREATE INDEX "content_variations_parent_idx" ON "content_variations" USING btree ("parent_id");
  CREATE INDEX "content_variations_updated_at_idx" ON "content_variations" USING btree ("updated_at");
  CREATE INDEX "content_variations_created_at_idx" ON "content_variations" USING btree ("created_at");
  CREATE INDEX "word_form_sets_tenant_idx" ON "word_form_sets" USING btree ("tenant_id");
  CREATE INDEX "word_form_sets_updated_at_idx" ON "word_form_sets" USING btree ("updated_at");
  CREATE INDEX "word_form_sets_created_at_idx" ON "word_form_sets" USING btree ("created_at");
  CREATE UNIQUE INDEX "word_form_sets_locales_locale_parent_id_unique" ON "word_form_sets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_order_idx" ON "tmpl_ovrd_sect_ovrd" USING btree ("_order");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_parent_id_idx" ON "tmpl_ovrd_sect_ovrd" USING btree ("_parent_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_herosplit_heading_ovrds_herosp_idx" ON "tmpl_ovrd_sect_ovrd" USING btree ("ovrds_herosplit_heading_variation_set_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_herosplit_description_ovrds_he_idx" ON "tmpl_ovrd_sect_ovrd" USING btree ("ovrds_herosplit_description_variation_set_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_blog_heading_ovrds_blog_headin_idx" ON "tmpl_ovrd_sect_ovrd" USING btree ("ovrds_blog_heading_variation_set_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_blog_description_ovrds_blog_de_idx" ON "tmpl_ovrd_sect_ovrd" USING btree ("ovrds_blog_description_variation_set_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_testimonials_heading_ovrds_tes_idx" ON "tmpl_ovrd_sect_ovrd" USING btree ("ovrds_testimonials_heading_variation_set_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_testimonials_description_ovrds_idx" ON "tmpl_ovrd_sect_ovrd" USING btree ("ovrds_testimonials_description_variation_set_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_metrics_heading_ovrds_metrics__idx" ON "tmpl_ovrd_sect_ovrd" USING btree ("ovrds_metrics_heading_variation_set_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_metrics_description_ovrds_metr_idx" ON "tmpl_ovrd_sect_ovrd" USING btree ("ovrds_metrics_description_variation_set_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_cta_heading_ovrds_cta_heading__idx" ON "tmpl_ovrd_sect_ovrd" USING btree ("ovrds_cta_heading_variation_set_id");
  CREATE INDEX "tmpl_ovrd_sect_ovrd_ovrds_cta_description_ovrds_cta_desc_idx" ON "tmpl_ovrd_sect_ovrd" USING btree ("ovrds_cta_description_variation_set_id");
  CREATE UNIQUE INDEX "tmpl_ovrd_sect_ovrd_locales_locale_parent_id_unique" ON "tmpl_ovrd_sect_ovrd_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tmpl_ovrd_tenant_idx" ON "tmpl_ovrd" USING btree ("tenant_id");
  CREATE INDEX "tmpl_ovrd_updated_at_idx" ON "tmpl_ovrd" USING btree ("updated_at");
  CREATE INDEX "tmpl_ovrd_created_at_idx" ON "tmpl_ovrd" USING btree ("created_at");
  CREATE INDEX "tmpl_ovrd_rels_order_idx" ON "tmpl_ovrd_rels" USING btree ("order");
  CREATE INDEX "tmpl_ovrd_rels_parent_idx" ON "tmpl_ovrd_rels" USING btree ("parent_id");
  CREATE INDEX "tmpl_ovrd_rels_path_idx" ON "tmpl_ovrd_rels" USING btree ("path");
  CREATE INDEX "tmpl_ovrd_rels_industry_categories_id_idx" ON "tmpl_ovrd_rels" USING btree ("industry_categories_id");
  CREATE INDEX "tmpl_ovrd_rels_industries_id_idx" ON "tmpl_ovrd_rels" USING btree ("industries_id");
  CREATE INDEX "tmpl_ovrd_rels_job_titles_id_idx" ON "tmpl_ovrd_rels" USING btree ("job_titles_id");
  CREATE INDEX "tenants_supported_locales_order_idx" ON "tenants_supported_locales" USING btree ("order");
  CREATE INDEX "tenants_supported_locales_parent_idx" ON "tenants_supported_locales" USING btree ("parent_id");
  CREATE UNIQUE INDEX "tenants_slug_idx" ON "tenants" USING btree ("slug");
  CREATE UNIQUE INDEX "tenants_domain_idx" ON "tenants" USING btree ("domain");
  CREATE INDEX "tenants_updated_at_idx" ON "tenants" USING btree ("updated_at");
  CREATE INDEX "tenants_created_at_idx" ON "tenants" USING btree ("created_at");
  CREATE INDEX "tenant_page_configs_keyword_landings_patterns_order_idx" ON "tenant_page_configs_keyword_landings_patterns" USING btree ("_order");
  CREATE INDEX "tenant_page_configs_keyword_landings_patterns_parent_id_idx" ON "tenant_page_configs_keyword_landings_patterns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tenant_page_configs_tenant_idx" ON "tenant_page_configs" USING btree ("tenant_id");
  CREATE INDEX "tenant_page_configs_updated_at_idx" ON "tenant_page_configs" USING btree ("updated_at");
  CREATE INDEX "tenant_page_configs_created_at_idx" ON "tenant_page_configs" USING btree ("created_at");
  CREATE INDEX "tenant_page_configs_rels_order_idx" ON "tenant_page_configs_rels" USING btree ("order");
  CREATE INDEX "tenant_page_configs_rels_parent_idx" ON "tenant_page_configs_rels" USING btree ("parent_id");
  CREATE INDEX "tenant_page_configs_rels_path_idx" ON "tenant_page_configs_rels" USING btree ("path");
  CREATE INDEX "tenant_page_configs_rels_industries_id_idx" ON "tenant_page_configs_rels" USING btree ("industries_id");
  CREATE INDEX "tenant_page_configs_rels_job_titles_id_idx" ON "tenant_page_configs_rels" USING btree ("job_titles_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_industry_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("industry_categories_id");
  CREATE INDEX "payload_locked_documents_rels_industries_id_idx" ON "payload_locked_documents_rels" USING btree ("industries_id");
  CREATE INDEX "payload_locked_documents_rels_job_titles_id_idx" ON "payload_locked_documents_rels" USING btree ("job_titles_id");
  CREATE INDEX "payload_locked_documents_rels_resume_content_id_idx" ON "payload_locked_documents_rels" USING btree ("resume_content_id");
  CREATE INDEX "payload_locked_documents_rels_sources_id_idx" ON "payload_locked_documents_rels" USING btree ("sources_id");
  CREATE INDEX "payload_locked_documents_rels_content_variations_id_idx" ON "payload_locked_documents_rels" USING btree ("content_variations_id");
  CREATE INDEX "payload_locked_documents_rels_word_form_sets_id_idx" ON "payload_locked_documents_rels" USING btree ("word_form_sets_id");
  CREATE INDEX "payload_locked_documents_rels_tmpl_ovrd_id_idx" ON "payload_locked_documents_rels" USING btree ("tmpl_ovrd_id");
  CREATE INDEX "payload_locked_documents_rels_tenants_id_idx" ON "payload_locked_documents_rels" USING btree ("tenants_id");
  CREATE INDEX "payload_locked_documents_rels_tenant_page_configs_id_idx" ON "payload_locked_documents_rels" USING btree ("tenant_page_configs_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "default_templates_blocks_hero_split_review_avatars_order_idx" ON "default_templates_blocks_hero_split_review_avatars" USING btree ("_order");
  CREATE INDEX "default_templates_blocks_hero_split_review_avatars_parent_id_idx" ON "default_templates_blocks_hero_split_review_avatars" USING btree ("_parent_id");
  CREATE INDEX "default_templates_blocks_hero_split_review_avatars_image_idx" ON "default_templates_blocks_hero_split_review_avatars" USING btree ("image_id");
  CREATE INDEX "default_templates_blocks_hero_split_order_idx" ON "default_templates_blocks_hero_split" USING btree ("_order");
  CREATE INDEX "default_templates_blocks_hero_split_parent_id_idx" ON "default_templates_blocks_hero_split" USING btree ("_parent_id");
  CREATE INDEX "default_templates_blocks_hero_split_path_idx" ON "default_templates_blocks_hero_split" USING btree ("_path");
  CREATE INDEX "default_templates_blocks_hero_split_heading_heading_vari_idx" ON "default_templates_blocks_hero_split" USING btree ("heading_variation_set_id");
  CREATE INDEX "default_templates_blocks_hero_split_description_descript_idx" ON "default_templates_blocks_hero_split" USING btree ("description_variation_set_id");
  CREATE INDEX "default_templates_blocks_hero_split_image_idx" ON "default_templates_blocks_hero_split" USING btree ("image_id");
  CREATE UNIQUE INDEX "default_templates_blocks_hero_split_locales_locale_parent_id" ON "default_templates_blocks_hero_split_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "default_templates_blocks_blog_articles_order_idx" ON "default_templates_blocks_blog_articles" USING btree ("_order");
  CREATE INDEX "default_templates_blocks_blog_articles_parent_id_idx" ON "default_templates_blocks_blog_articles" USING btree ("_parent_id");
  CREATE INDEX "default_templates_blocks_blog_articles_thumbnail_idx" ON "default_templates_blocks_blog_articles" USING btree ("thumbnail_id");
  CREATE INDEX "default_templates_blocks_blog_articles_author_image_idx" ON "default_templates_blocks_blog_articles" USING btree ("author_image_id");
  CREATE UNIQUE INDEX "default_templates_blocks_blog_articles_locales_locale_parent" ON "default_templates_blocks_blog_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "default_templates_blocks_blog_order_idx" ON "default_templates_blocks_blog" USING btree ("_order");
  CREATE INDEX "default_templates_blocks_blog_parent_id_idx" ON "default_templates_blocks_blog" USING btree ("_parent_id");
  CREATE INDEX "default_templates_blocks_blog_path_idx" ON "default_templates_blocks_blog" USING btree ("_path");
  CREATE INDEX "default_templates_blocks_blog_heading_heading_variation__idx" ON "default_templates_blocks_blog" USING btree ("heading_variation_set_id");
  CREATE INDEX "default_templates_blocks_blog_description_description_va_idx" ON "default_templates_blocks_blog" USING btree ("description_variation_set_id");
  CREATE UNIQUE INDEX "default_templates_blocks_blog_locales_locale_parent_id_uniqu" ON "default_templates_blocks_blog_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "default_templates_blocks_testimonials_reviews_order_idx" ON "default_templates_blocks_testimonials_reviews" USING btree ("_order");
  CREATE INDEX "default_templates_blocks_testimonials_reviews_parent_id_idx" ON "default_templates_blocks_testimonials_reviews" USING btree ("_parent_id");
  CREATE INDEX "default_templates_blocks_testimonials_reviews_author_ima_idx" ON "default_templates_blocks_testimonials_reviews" USING btree ("author_image_id");
  CREATE INDEX "default_templates_blocks_testimonials_reviews_company_lo_idx" ON "default_templates_blocks_testimonials_reviews" USING btree ("company_logo_id");
  CREATE INDEX "default_templates_blocks_testimonials_reviews_company__1_idx" ON "default_templates_blocks_testimonials_reviews" USING btree ("company_logo_dark_id");
  CREATE UNIQUE INDEX "default_templates_blocks_testimonials_reviews_locales_locale" ON "default_templates_blocks_testimonials_reviews_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "default_templates_blocks_testimonials_order_idx" ON "default_templates_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "default_templates_blocks_testimonials_parent_id_idx" ON "default_templates_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "default_templates_blocks_testimonials_path_idx" ON "default_templates_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "default_templates_blocks_testimonials_heading_heading_va_idx" ON "default_templates_blocks_testimonials" USING btree ("heading_variation_set_id");
  CREATE INDEX "default_templates_blocks_testimonials_description_descri_idx" ON "default_templates_blocks_testimonials" USING btree ("description_variation_set_id");
  CREATE UNIQUE INDEX "default_templates_blocks_testimonials_locales_locale_parent_" ON "default_templates_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "default_templates_blocks_metrics_metrics_order_idx" ON "default_templates_blocks_metrics_metrics" USING btree ("_order");
  CREATE INDEX "default_templates_blocks_metrics_metrics_parent_id_idx" ON "default_templates_blocks_metrics_metrics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "default_templates_blocks_metrics_metrics_locales_locale_pare" ON "default_templates_blocks_metrics_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "default_templates_blocks_metrics_order_idx" ON "default_templates_blocks_metrics" USING btree ("_order");
  CREATE INDEX "default_templates_blocks_metrics_parent_id_idx" ON "default_templates_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "default_templates_blocks_metrics_path_idx" ON "default_templates_blocks_metrics" USING btree ("_path");
  CREATE INDEX "default_templates_blocks_metrics_heading_heading_variati_idx" ON "default_templates_blocks_metrics" USING btree ("heading_variation_set_id");
  CREATE INDEX "default_templates_blocks_metrics_description_description_idx" ON "default_templates_blocks_metrics" USING btree ("description_variation_set_id");
  CREATE UNIQUE INDEX "default_templates_blocks_metrics_locales_locale_parent_id_un" ON "default_templates_blocks_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "default_templates_blocks_cta_links_order_idx" ON "default_templates_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "default_templates_blocks_cta_links_parent_id_idx" ON "default_templates_blocks_cta_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "default_templates_blocks_cta_links_locales_locale_parent_id_" ON "default_templates_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "default_templates_blocks_cta_order_idx" ON "default_templates_blocks_cta" USING btree ("_order");
  CREATE INDEX "default_templates_blocks_cta_parent_id_idx" ON "default_templates_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "default_templates_blocks_cta_path_idx" ON "default_templates_blocks_cta" USING btree ("_path");
  CREATE INDEX "default_templates_blocks_cta_heading_heading_variation_s_idx" ON "default_templates_blocks_cta" USING btree ("heading_variation_set_id");
  CREATE INDEX "default_templates_blocks_cta_description_description_var_idx" ON "default_templates_blocks_cta" USING btree ("description_variation_set_id");
  CREATE UNIQUE INDEX "default_templates_blocks_cta_locales_locale_parent_id_unique" ON "default_templates_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "default_templates_rels_order_idx" ON "default_templates_rels" USING btree ("order");
  CREATE INDEX "default_templates_rels_parent_idx" ON "default_templates_rels" USING btree ("parent_id");
  CREATE INDEX "default_templates_rels_path_idx" ON "default_templates_rels" USING btree ("path");
  CREATE INDEX "default_templates_rels_pages_id_idx" ON "default_templates_rels" USING btree ("pages_id");
  CREATE INDEX "header_nav_items_dropdown_items_order_idx" ON "header_nav_items_dropdown_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_dropdown_items_parent_id_idx" ON "header_nav_items_dropdown_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_dropdown_items_locales_locale_parent_id_uni" ON "header_nav_items_dropdown_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "suffix_variations_resume_words_order_idx" ON "suffix_variations_resume_words" USING btree ("_order");
  CREATE INDEX "suffix_variations_resume_words_parent_id_idx" ON "suffix_variations_resume_words" USING btree ("_parent_id");
  CREATE INDEX "suffix_variations_resume_words_word_form_set_idx" ON "suffix_variations_resume_words" USING btree ("word_form_set_id");
  CREATE INDEX "suffix_variations_adjectives_order_idx" ON "suffix_variations_adjectives" USING btree ("_order");
  CREATE INDEX "suffix_variations_adjectives_parent_id_idx" ON "suffix_variations_adjectives" USING btree ("_parent_id");
  CREATE INDEX "suffix_variations_adjectives_word_form_set_idx" ON "suffix_variations_adjectives" USING btree ("word_form_set_id");
  CREATE INDEX "suffix_variations_builders_order_idx" ON "suffix_variations_builders" USING btree ("_order");
  CREATE INDEX "suffix_variations_builders_parent_id_idx" ON "suffix_variations_builders" USING btree ("_parent_id");
  CREATE INDEX "suffix_variations_builders_word_form_set_idx" ON "suffix_variations_builders" USING btree ("word_form_set_id");
  CREATE INDEX "suffix_variations_content_words_order_idx" ON "suffix_variations_content_words" USING btree ("_order");
  CREATE INDEX "suffix_variations_content_words_parent_id_idx" ON "suffix_variations_content_words" USING btree ("_parent_id");
  CREATE INDEX "suffix_variations_content_words_word_form_set_idx" ON "suffix_variations_content_words" USING btree ("word_form_set_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_tenants_roles" CASCADE;
  DROP TABLE "users_tenants" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero_split_review_avatars" CASCADE;
  DROP TABLE "pages_blocks_hero_split" CASCADE;
  DROP TABLE "pages_blocks_hero_split_locales" CASCADE;
  DROP TABLE "pages_blocks_blog_articles" CASCADE;
  DROP TABLE "pages_blocks_blog_articles_locales" CASCADE;
  DROP TABLE "pages_blocks_blog" CASCADE;
  DROP TABLE "pages_blocks_blog_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials_reviews" CASCADE;
  DROP TABLE "pages_blocks_testimonials_reviews_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials_locales" CASCADE;
  DROP TABLE "pages_blocks_metrics_metrics" CASCADE;
  DROP TABLE "pages_blocks_metrics_metrics_locales" CASCADE;
  DROP TABLE "pages_blocks_metrics" CASCADE;
  DROP TABLE "pages_blocks_metrics_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta_links_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_breadcrumbs" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_split_review_avatars" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_split" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_split_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_articles" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_articles_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_blog" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_reviews" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_reviews_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_metrics_metrics" CASCADE;
  DROP TABLE "_pages_v_blocks_metrics_metrics_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_metrics" CASCADE;
  DROP TABLE "_pages_v_blocks_metrics_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "industry_categories" CASCADE;
  DROP TABLE "industry_categories_locales" CASCADE;
  DROP TABLE "industries" CASCADE;
  DROP TABLE "industries_locales" CASCADE;
  DROP TABLE "job_titles_suggested_content" CASCADE;
  DROP TABLE "job_titles" CASCADE;
  DROP TABLE "job_titles_locales" CASCADE;
  DROP TABLE "job_titles_rels" CASCADE;
  DROP TABLE "resume_content" CASCADE;
  DROP TABLE "resume_content_locales" CASCADE;
  DROP TABLE "sources" CASCADE;
  DROP TABLE "content_variations_options" CASCADE;
  DROP TABLE "content_variations_options_locales" CASCADE;
  DROP TABLE "content_variations" CASCADE;
  DROP TABLE "word_form_sets" CASCADE;
  DROP TABLE "word_form_sets_locales" CASCADE;
  DROP TABLE "tmpl_ovrd_sect_ovrd" CASCADE;
  DROP TABLE "tmpl_ovrd_sect_ovrd_locales" CASCADE;
  DROP TABLE "tmpl_ovrd" CASCADE;
  DROP TABLE "tmpl_ovrd_rels" CASCADE;
  DROP TABLE "tenants_supported_locales" CASCADE;
  DROP TABLE "tenants" CASCADE;
  DROP TABLE "tenant_page_configs_keyword_landings_patterns" CASCADE;
  DROP TABLE "tenant_page_configs" CASCADE;
  DROP TABLE "tenant_page_configs_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "default_templates_blocks_hero_split_review_avatars" CASCADE;
  DROP TABLE "default_templates_blocks_hero_split" CASCADE;
  DROP TABLE "default_templates_blocks_hero_split_locales" CASCADE;
  DROP TABLE "default_templates_blocks_blog_articles" CASCADE;
  DROP TABLE "default_templates_blocks_blog_articles_locales" CASCADE;
  DROP TABLE "default_templates_blocks_blog" CASCADE;
  DROP TABLE "default_templates_blocks_blog_locales" CASCADE;
  DROP TABLE "default_templates_blocks_testimonials_reviews" CASCADE;
  DROP TABLE "default_templates_blocks_testimonials_reviews_locales" CASCADE;
  DROP TABLE "default_templates_blocks_testimonials" CASCADE;
  DROP TABLE "default_templates_blocks_testimonials_locales" CASCADE;
  DROP TABLE "default_templates_blocks_metrics_metrics" CASCADE;
  DROP TABLE "default_templates_blocks_metrics_metrics_locales" CASCADE;
  DROP TABLE "default_templates_blocks_metrics" CASCADE;
  DROP TABLE "default_templates_blocks_metrics_locales" CASCADE;
  DROP TABLE "default_templates_blocks_cta_links" CASCADE;
  DROP TABLE "default_templates_blocks_cta_links_locales" CASCADE;
  DROP TABLE "default_templates_blocks_cta" CASCADE;
  DROP TABLE "default_templates_blocks_cta_locales" CASCADE;
  DROP TABLE "default_templates" CASCADE;
  DROP TABLE "default_templates_rels" CASCADE;
  DROP TABLE "header_nav_items_dropdown_items" CASCADE;
  DROP TABLE "header_nav_items_dropdown_items_locales" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "suffix_variations_resume_words" CASCADE;
  DROP TABLE "suffix_variations_adjectives" CASCADE;
  DROP TABLE "suffix_variations_builders" CASCADE;
  DROP TABLE "suffix_variations_content_words" CASCADE;
  DROP TABLE "suffix_variations" CASCADE;
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_flds";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_blog_flds";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_flds";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_flds";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_cta_flds";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_users_tenants_roles";
  DROP TYPE "public"."enum_pages_blocks_hero_split_heading_mode";
  DROP TYPE "public"."enum_pages_blocks_hero_split_description_mode";
  DROP TYPE "public"."enum_pages_blocks_blog_heading_mode";
  DROP TYPE "public"."enum_pages_blocks_blog_description_mode";
  DROP TYPE "public"."enum_pages_blocks_blog_section_group";
  DROP TYPE "public"."enum_pages_blocks_testimonials_heading_mode";
  DROP TYPE "public"."enum_pages_blocks_testimonials_description_mode";
  DROP TYPE "public"."enum_pages_blocks_testimonials_section_group";
  DROP TYPE "public"."enum_pages_blocks_metrics_metrics_icon";
  DROP TYPE "public"."enum_pages_blocks_metrics_heading_mode";
  DROP TYPE "public"."enum_pages_blocks_metrics_description_mode";
  DROP TYPE "public"."enum_pages_blocks_metrics_section_group";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_variant";
  DROP TYPE "public"."enum_pages_blocks_cta_heading_mode";
  DROP TYPE "public"."enum_pages_blocks_cta_description_mode";
  DROP TYPE "public"."enum_pages_blocks_cta_section_group";
  DROP TYPE "public"."enum_pages_meta_robots";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_split_heading_mode";
  DROP TYPE "public"."enum__pages_v_blocks_hero_split_description_mode";
  DROP TYPE "public"."enum__pages_v_blocks_blog_heading_mode";
  DROP TYPE "public"."enum__pages_v_blocks_blog_description_mode";
  DROP TYPE "public"."enum__pages_v_blocks_blog_section_group";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_heading_mode";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_description_mode";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_section_group";
  DROP TYPE "public"."enum__pages_v_blocks_metrics_metrics_icon";
  DROP TYPE "public"."enum__pages_v_blocks_metrics_heading_mode";
  DROP TYPE "public"."enum__pages_v_blocks_metrics_description_mode";
  DROP TYPE "public"."enum__pages_v_blocks_metrics_section_group";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_variant";
  DROP TYPE "public"."enum__pages_v_blocks_cta_heading_mode";
  DROP TYPE "public"."enum__pages_v_blocks_cta_description_mode";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_group";
  DROP TYPE "public"."enum__pages_v_version_meta_robots";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_industries_meta_robots";
  DROP TYPE "public"."enum_job_titles_suffix_strategy";
  DROP TYPE "public"."enum_job_titles_meta_robots";
  DROP TYPE "public"."enum_resume_content_type";
  DROP TYPE "public"."enum_word_form_sets_type";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_section_block_type";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_action";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_section_group";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_heading_mode";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_herosplit_description_mode";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_blog_heading_mode";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_blog_description_mode";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_heading_mode";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_testimonials_description_mode";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_heading_mode";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_metrics_description_mode";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_cta_heading_mode";
  DROP TYPE "public"."enum_tmpl_ovrd_sect_ovrd_ovrds_cta_description_mode";
  DROP TYPE "public"."enum_tmpl_ovrd_target_type";
  DROP TYPE "public"."enum_tenants_supported_locales";
  DROP TYPE "public"."enum_tenant_page_configs_mode";
  DROP TYPE "public"."enum_tenant_page_configs_job_title_mode";
  DROP TYPE "public"."enum_tenant_page_configs_keyword_landings_mode";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_default_templates_blocks_hero_split_heading_mode";
  DROP TYPE "public"."enum_default_templates_blocks_hero_split_description_mode";
  DROP TYPE "public"."enum_default_templates_blocks_blog_heading_mode";
  DROP TYPE "public"."enum_default_templates_blocks_blog_description_mode";
  DROP TYPE "public"."enum_default_templates_blocks_blog_section_group";
  DROP TYPE "public"."enum_default_templates_blocks_testimonials_heading_mode";
  DROP TYPE "public"."enum_default_templates_blocks_testimonials_description_mode";
  DROP TYPE "public"."enum_default_templates_blocks_testimonials_section_group";
  DROP TYPE "public"."enum_default_templates_blocks_metrics_metrics_icon";
  DROP TYPE "public"."enum_default_templates_blocks_metrics_heading_mode";
  DROP TYPE "public"."enum_default_templates_blocks_metrics_description_mode";
  DROP TYPE "public"."enum_default_templates_blocks_metrics_section_group";
  DROP TYPE "public"."enum_default_templates_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_default_templates_blocks_cta_links_variant";
  DROP TYPE "public"."enum_default_templates_blocks_cta_heading_mode";
  DROP TYPE "public"."enum_default_templates_blocks_cta_description_mode";
  DROP TYPE "public"."enum_default_templates_blocks_cta_section_group";
  DROP TYPE "public"."enum_header_nav_items_dropdown_items_link_type";
  DROP TYPE "public"."enum_header_nav_items_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_suffix_variations_canonical_strategy";`)
}

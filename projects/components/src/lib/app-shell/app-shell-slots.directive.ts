import { Directive } from '@angular/core';

/** Header region for {@link AuAppShell}. */
@Directive({
  selector: '[auAppShellHeader]',
  host: { class: 'au-app-shell__header-slot' },
})
export class AuAppShellHeader {}

/** Optional full-width banner below the header (promos, alerts). */
@Directive({
  selector: '[auAppShellBanner]',
  host: { class: 'au-app-shell__banner-slot' },
})
export class AuAppShellBanner {}

/** Footer region for {@link AuAppShell}. */
@Directive({
  selector: '[auAppShellFooter]',
  host: { class: 'au-app-shell__footer-slot' },
})
export class AuAppShellFooter {}

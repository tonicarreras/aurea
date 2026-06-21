import { ChangeDetectionStrategy, Component, contentChild } from '@angular/core';

import { AuAppShellBanner, AuAppShellFooter, AuAppShellHeader } from './app-shell-slots.directive';

/**
 * Page shell: sticky header, optional banner, flexible main, footer at bottom.
 *
 * @remarks
 * - Use with `[auStack]` inside regions for spacing.
 * - Main grows (`flex: 1`) so the footer stays at the bottom on short pages.
 *
 * @example
 * ```html
 * <au-app-shell>
 *   <header auAppShellHeader>...</header>
 *   <div auAppShellBanner><au-message layout="banner" ... /></div>
 *   <main>...</main>
 *   <footer auAppShellFooter>...</footer>
 * </au-app-shell>
 * ```
 */
@Component({
  selector: 'au-app-shell',
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-app-shell',
  },
})
export class AuAppShell {
  /* v8 ignore start */
  readonly headerSlot = contentChild(AuAppShellHeader);
  readonly bannerSlot = contentChild(AuAppShellBanner);
  readonly footerSlot = contentChild(AuAppShellFooter);
  /* v8 ignore stop */
}

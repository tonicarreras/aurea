import { computed, DestroyRef, Directive, inject, input, signal } from '@angular/core';

export type AuThemeMode = 'light' | 'dark' | 'system' | 'high-contrast' | 'high-contrast-dark';

/**
 * Applies Aurea semantic colors by setting `data-au-theme` on the host element
 * (see `au-tokens.css`). Use on a layout root (`<body>`, shell div) or `document.documentElement`.
 *
 * - `light` / `dark` / `high-contrast` / `high-contrast-dark`: fixed palettes.
 * - `high-contrast` pairs with light appearance; `high-contrast-dark` with dark.
 * - `system`: follows `prefers-color-scheme` and updates when the OS preference changes.
 */
@Directive({
  selector: '[auTheme]',
  host: {
    '[attr.data-au-theme]': 'resolved()',
  },
})
export class AuTheme {
  private readonly destroyRef = inject(DestroyRef);

  readonly auTheme = input<AuThemeMode>('system');

  private readonly prefersDark = signal(false);

  readonly resolved = computed(() => {
    const mode = this.auTheme();
    if (
      mode === 'light' ||
      mode === 'dark' ||
      mode === 'high-contrast' ||
      mode === 'high-contrast-dark'
    ) {
      return mode;
    }
    return this.prefersDark() ? 'dark' : 'light';
  });

  private readonly systemColorSchemeBinding = this.bindSystemColorScheme();

  private bindSystemColorScheme(): void {
    if (typeof matchMedia === 'undefined') {
      return;
    }
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const sync = () => this.prefersDark.set(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    this.destroyRef.onDestroy(() => mq.removeEventListener('change', sync));
  }
}

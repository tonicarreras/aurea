import { computed, DestroyRef, Directive, inject, input, signal } from '@angular/core';

/**
 * Applies Aurea semantic colors by setting `data-au-theme` on the host element
 * (see `au-tokens.css`). Use on a layout root (`<body>`, shell div) or `document.documentElement`.
 *
 * - `light` / `dark`: fixed palette.
 * - `system`: follows `prefers-color-scheme` and updates when the OS preference changes.
 */
@Directive({
  standalone: true,
  selector: '[auTheme]',
  host: {
    '[attr.data-au-theme]': 'resolved()',
  },
})
export class AuTheme {
  readonly auTheme = input<'light' | 'dark' | 'system'>('system');

  private readonly prefersDark = signal(false);

  readonly resolved = computed(() => {
    const mode = this.auTheme();
    if (mode === 'light' || mode === 'dark') {
      return mode;
    }
    return this.prefersDark() ? 'dark' : 'light';
  });

  constructor() {
    if (typeof matchMedia === 'undefined') {
      return;
    }
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const sync = () => this.prefersDark.set(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    inject(DestroyRef).onDestroy(() => mq.removeEventListener('change', sync));
  }
}

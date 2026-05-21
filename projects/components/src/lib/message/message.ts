import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { AuIcon, type AuIconName } from '../icon/icon';

export type AuMessageVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

/**
 * Design-system **message**: inline callout for status, validation, or contextual help.
 *
 * @remarks
 * - **Variants:** default, success, warning, error, info (semantic surfaces from tokens).
 * - **Icons:** {@link AuIcon} Material-style glyphs; `default` has none.
 * - **Content:** `message` input or projected default slot; optional `title`.
 * - **Dismissible:** optional close control emits `dismiss`.
 * - **Accessibility:** `role` on the inner surface — `alert` (error/warning) or `status` (default/success/info).
 *
 * @example
 * ```html
 * <au-message variant="success" title="Saved" message="Your changes were stored." />
 * <au-message variant="error" [dismissible]="true" (dismiss)="onClose()">
 *   Please fix the highlighted fields.
 * </au-message>
 * ```
 */
@Component({
  selector: 'au-message',
  imports: [AuIcon],
  templateUrl: './message.html',
  styleUrl: './message.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-message',
    '[attr.data-au-variant]': 'variant()',
  },
})
export class AuMessage {
  readonly variant = input<AuMessageVariant>('default');

  readonly title = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  readonly message = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  readonly dismissible = input(false);

  readonly closeAriaLabel = input<string, string>('Dismiss message', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  readonly showIcon = input(true);

  readonly dismiss = output<void>();

  readonly showVariantIcon = computed(() => this.showIcon() && this.variant() !== 'default');

  readonly variantIcon = computed((): AuIconName | null => {
    switch (this.variant()) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      default:
        return null;
    }
  });

  readonly resolvedTitle = computed(() => this.title().trim());

  readonly resolvedMessage = computed(() => this.message().trim());

  readonly hasTitle = computed(() => this.resolvedTitle().length > 0);

  readonly showInputMessage = computed(() => this.resolvedMessage().length > 0);

  readonly liveRole = computed(() =>
    this.variant() === 'error' || this.variant() === 'warning' ? 'alert' : 'status',
  );

  onDismissClick(): void {
    this.dismiss.emit();
  }
}

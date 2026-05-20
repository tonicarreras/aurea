import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type AuMessageVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

/**
 * Design-system **message**: inline callout for status, validation, or contextual help.
 *
 * @remarks
 * - **Variants:** default, success, warning, error, info (semantic surfaces from tokens).
 * - **Icons:** Material-style glyphs (`check_circle`, `warning`, `error`, `info`); `default` has none.
 * - **Content:** `message` input or projected default slot; optional `title`.
 * - **Dismissible:** optional close control emits `dismiss`.
 * - **Accessibility:** `role="alert"` for error/warning; `role="status"` for default/success/info.
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
  templateUrl: './message.html',
  styleUrl: './message.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-message',
    '[attr.data-au-variant]': 'variant()',
    '[attr.role]': 'liveRole()',
  },
})
export class AuMessage {
  /** Visual tone: neutral or semantic state. */
  readonly variant = input<AuMessageVariant>('default');

  /** Optional heading above the body text. */
  readonly title = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  /** Body copy when not using projected content. */
  readonly message = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  /** Shows a dismiss button and emits `dismiss` when activated. */
  readonly dismissible = input(false);

  /** Accessible name for the dismiss control. */
  readonly closeAriaLabel = input<string, string>('Dismiss message', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  /** When false, hides the semantic icon (success, warning, error, info). `default` never shows an icon. */
  readonly showIcon = input(true);

  /** Emits when the user dismisses a dismissible message. */
  readonly dismiss = output<void>();

  /** Semantic variants only; `default` has no leading icon. */
  readonly showVariantIcon = computed(() => this.showIcon() && this.variant() !== 'default');

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

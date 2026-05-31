import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { AuIcon, type AuIconName } from '../icon/icon';

export type AuMessageVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type AuMessageLayout = 'inline' | 'banner';

/**
 * Design-system **message**: inline callout or full-width banner for status and notices.
 *
 * @remarks
 * - **Layout:** `inline` (default) for form/page context; `banner` for full-width persistent notices.
 * - **Variants:** default, success, warning, error, info (semantic surfaces from tokens).
 * - **Content:** `message` input or projected default slot; optional `title`.
 * - **Dismissible:** optional close control emits `dismiss`.
 * - **Action:** optional `actionLabel` + `(action)` (typical on `layout="banner"`).
 * - **Accessibility:** `role` on the inner surface — `alert` (error/warning) or `status` (default/success/info).
 *
 * @example
 * ```html
 * <au-message variant="success" title="Saved" message="Your changes were stored." />
 * <au-message layout="banner" variant="warning" title="Maintenance" message="Read-only until 18:00 UTC." [dismissible]="true" />
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
    '[attr.data-au-layout]': 'layout()',
  },
})
export class AuMessage {
  readonly variant = input<AuMessageVariant>('default');

  readonly layout = input<AuMessageLayout>('inline');

  readonly title = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  readonly message = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  readonly dismissible = input(false);

  readonly actionLabel = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  readonly closeAriaLabel = input<string, string>('Dismiss message', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  readonly showIcon = input(true);

  readonly dismiss = output<void>();

  readonly action = output<void>();

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

  readonly showAction = computed(() => this.actionLabel().trim().length > 0);

  readonly liveRole = computed(() =>
    this.variant() === 'error' || this.variant() === 'warning' ? 'alert' : 'status',
  );

  onDismissClick(): void {
    this.dismiss.emit();
  }

  onActionClick(): void {
    this.action.emit();
  }
}

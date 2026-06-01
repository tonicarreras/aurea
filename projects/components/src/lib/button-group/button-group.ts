import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type AuButtonGroupOrientation = 'horizontal' | 'vertical';

/**
 * Groups related {@link AuButton} actions with shared layout.
 *
 * @remarks
 * - Sets `role="group"`; label with `ariaLabel` or `ariaLabelledBy`.
 * - **`attached` (default):** shares borders between buttons (toolbar style).
 * - **`attached="false"`:** spaced buttons with gap.
 * - Exclusive toggles / form fields → `au-tabs` `variant="contained"` or `au-radio-group`.
 *
 * @example
 * ```html
 * <au-button-group ariaLabel="Document actions">
 *   <au-button variant="outline">Cancel</au-button>
 *   <au-button>Save</au-button>
 * </au-button-group>
 * ```
 */
@Component({
  selector: 'au-button-group',
  templateUrl: './button-group.html',
  styleUrl: './button-group.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-button-group',
    role: 'group',
    '[attr.data-au-attached]': 'attached() ? "" : null',
    '[attr.data-au-orientation]': 'orientation()',
    '[attr.aria-label]': 'resolvedAriaLabel()',
    '[attr.aria-labelledby]': 'resolvedAriaLabelledBy()',
  },
})
export class AuButtonGroup {
  readonly ariaLabel = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  readonly ariaLabelledBy = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  /** When true (default), buttons share edges in a single control track. */
  readonly attached = input(true);

  readonly orientation = input<AuButtonGroupOrientation>('horizontal');

  readonly resolvedAriaLabel = computed(() => {
    const label = this.ariaLabel().trim();
    return label.length > 0 ? label : null;
  });

  readonly resolvedAriaLabelledBy = computed(() => {
    const id = this.ariaLabelledBy().trim();
    return id.length > 0 ? id : null;
  });

  onFocusIn(event: FocusEvent): void {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
}

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Design-system **divider**: visual separator between sections or list items.
 *
 * @remarks
 * - **Horizontal:** full-width rule (default); optional `inset` indents the start edge.
 * - **Vertical:** use inside flex rows; stretches to the container cross-axis.
 * - **Label:** optional centered caption between two rules (horizontal only).
 * - **Accessibility:** `role="separator"` with `aria-orientation`.
 *
 * @example
 * ```html
 * <au-divider />
 * <au-divider inset />
 * <au-divider label="or" />
 * <div style="display: flex; gap: 1rem; height: 2rem">
 *   <span>Left</span>
 *   <au-divider orientation="vertical" />
 *   <span>Right</span>
 * </div>
 * ```
 */
@Component({
  selector: 'au-divider',
  templateUrl: './divider.html',
  styleUrl: './divider.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-divider',
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.data-au-orientation]': 'orientation()',
    '[attr.data-au-inset]': 'inset() ? "" : null',
    '[attr.data-au-labeled]': 'hasLabel() && orientation() === "horizontal" ? "" : null',
  },
})
export class AuDivider {
  /** Rule direction: horizontal (default) or vertical. */
  readonly orientation = input<DividerOrientation>('horizontal');

  /**
   * Indents the start edge of a horizontal divider (list/menu sections).
   * Ignored for vertical dividers and labeled dividers.
   */
  readonly inset = input(false);

  /** Optional centered label (horizontal only). */
  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  readonly resolvedLabel = computed(() => this.label().trim());
  readonly hasLabel = computed(() => this.resolvedLabel().length > 0);
}

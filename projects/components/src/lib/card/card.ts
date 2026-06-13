import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  input,
} from '@angular/core';
import type { AuSize } from '../au-size';
import { AuCardFooter } from './card-footer.directive';

export type AuCardVariant = 'elevated' | 'outlined' | 'filled';

/**
 * Design-system **card**: container for grouping related content with visual hierarchy.
 *
 * @remarks
 * - **Variants:** elevated (shadow), outlined (border), filled (background).
 * - **`interactive`:** hover elevation on elevated variant; use when the whole card is a link or click target.
 * - **Sizes:** sm (compact), md (default), lg (spacious).
 * - **Structure:** `[auCardMedia]`, `[auCardHeader]`, `[auCardBody]`, default slot, `[auCardFooter]`.
 * - **Footer:** import `AuCardFooter` in the host that projects `[auCardFooter]`.
 * - **Padding:** `.au-card__inner` wraps all regions except media.
 * - **Accessibility:** semantic `<article>`; include a heading in `[auCardHeader]` for the document outline.
 *
 * @example
 * ```html
 * <au-card>
 *   <img auCardMedia src="..." />
 *   <h3 auCardHeader>Title</h3>
 *   <p auCardBody>Content...</p>
 *   <div auCardFooter>Actions</div>
 * </au-card>
 * ```
 */
@Component({
  selector: 'au-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-card',
    '[attr.data-au-variant]': 'variant()',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-interactive]': 'interactive() ? "" : null',
  },
})
export class AuCard {
  /** Visual style: elevated (shadow), outlined (border), filled (background). */
  readonly variant = input<AuCardVariant>('elevated');
  /** Density: sm (compact), md (default), lg (spacious). */
  readonly size = input<AuSize>('md');

  /**
   * When true, elevated cards lift on hover (clickable tiles, links).
   * Static content should leave this false.
   */
  readonly interactive = input(false);

  readonly footerSlot = contentChild(AuCardFooter);

  /** True when `[auCardFooter]` content is projected. */
  readonly hasFooter = computed(() => this.footerSlot() !== undefined);
}

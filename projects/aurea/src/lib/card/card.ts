import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

/**
 * Design-system **card**: container for grouping related content with visual hierarchy.
 *
 * @remarks
 * - **Variants:** elevated (shadow), outlined (border), filled (background).
 * - **Sizes:** sm (compact), md (default), lg (spacious).
 * - **Structure:** `[auCardMedia]`, `[auCardHeader]`, `[auCardBody]`, default slot, `[auCardFooter]`.
 * - **Padding:** `.au-card__content` wraps all regions except media; default projected content is padded.
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-card',
    '[attr.data-au-variant]': 'variant()',
    '[attr.data-au-size]': 'size()',
  },
})
export class Card {
  /** Visual style: elevated (shadow), outlined (border), filled (background). */
  readonly variant = input<CardVariant>('elevated');
  /** Density: sm (compact), md (default), lg (spacious). */
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { AuSize } from '../au-size';

export type AuSkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded' | 'button';
export type AuSkeletonAnimation = 'pulse' | 'wave' | 'none';

/**
 * Design-system **skeleton**: placeholder shimmer while content loads.
 *
 * @remarks
 * - **Variants:** `text` (line), `circular` (avatar), `rectangular`, `rounded` (media/card), `button`.
 * - **Animation:** `pulse` (default), `wave` (gradient sweep), or `none`.
 * - **Sizing:** `size` presets per variant; optional `width` / `height` CSS overrides.
 * - **Accessibility:** decorative — `role="presentation"` and `aria-hidden="true"`. Mark the loading region `aria-busy` on a parent.
 *
 * @example
 * ```html
 * <au-skeleton variant="text" width="60%" />
 * <au-skeleton variant="circular" size="md" />
 * <div style="display: flex; gap: 1rem;">
 *   <au-skeleton variant="circular" size="lg" />
 *   <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
 *     <au-skeleton variant="text" width="40%" />
 *     <au-skeleton variant="text" />
 *   </div>
 * </div>
 * ```
 */
@Component({
  selector: 'au-skeleton',
  template: '',
  styleUrl: './skeleton.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-skeleton',
    role: 'presentation',
    'aria-hidden': 'true',
    '[attr.data-au-variant]': 'variant()',
    '[attr.data-au-animation]': 'animation()',
    '[attr.data-au-size]': 'size()',
    '[style.width]': 'resolvedWidth()',
    '[style.height]': 'resolvedHeight()',
    '[style.border-radius]': 'resolvedRadius()',
  },
})
export class AuSkeleton {
  /** Shape preset: text line, circle, block, rounded block, or button bar. */
  readonly variant = input<AuSkeletonVariant>('text');

  /** Motion: opacity pulse, horizontal wave, or static block. */
  readonly animation = input<AuSkeletonAnimation>('pulse');

  /** Density preset for `circular`, `button`, and default `text` line height. */
  readonly size = input<AuSize>('md');

  /** CSS width override (e.g. `100%`, `12rem`, `240px`). */
  readonly width = input<string, string | undefined>(undefined, {
    transform: (v) => (v == null || String(v).trim() === '' ? undefined : String(v)),
  });

  /** CSS height override (ignored for `text` unless set explicitly). */
  readonly height = input<string, string | undefined>(undefined, {
    transform: (v) => (v == null || String(v).trim() === '' ? undefined : String(v)),
  });

  /** Optional border-radius override (e.g. `0.5rem`). Variant presets apply when omitted. */
  readonly radius = input<string, string | undefined>(undefined, {
    transform: (v) => (v == null || String(v).trim() === '' ? undefined : String(v)),
  });

  readonly resolvedWidth = computed((): string | null => {
    const custom = this.width();
    if (custom) {
      return custom;
    }
    if (this.variant() === 'circular') {
      return null;
    }
    if (this.variant() === 'text') {
      return '100%';
    }
    return '100%';
  });

  readonly resolvedHeight = computed((): string | null => {
    const custom = this.height();
    if (custom) {
      return custom;
    }
    switch (this.variant()) {
      case 'text':
        return this.textLineHeight();
      case 'circular':
        return this.circularSize();
      case 'button':
        return this.buttonHeight();
      case 'rectangular':
        return '5rem';
      case 'rounded':
        return '6rem';
    }
  });

  readonly resolvedRadius = computed((): string | null => {
    const custom = this.radius();
    if (custom) {
      return custom;
    }
    switch (this.variant()) {
      case 'circular':
        return '50%';
      case 'rounded':
        return 'var(--au-radius-lg)';
      case 'button':
        return 'var(--au-radius-sm)';
      case 'text':
        return 'var(--au-radius-xs)';
      case 'rectangular':
        return 'var(--au-radius-sm)';
    }
  });

  private textLineHeight(): string {
    switch (this.size()) {
      case 'sm':
        return '0.75rem';
      case 'lg':
        return '1.125rem';
      default:
        return '0.875rem';
    }
  }

  private circularSize(): string {
    switch (this.size()) {
      case 'sm':
        return '2rem';
      case 'lg':
        return '3rem';
      default:
        return '2.5rem';
    }
  }

  private buttonHeight(): string {
    switch (this.size()) {
      case 'sm':
        return 'var(--au-size-field-h-sm)';
      case 'lg':
        return 'var(--au-touch-target-min)';
      default:
        return 'var(--au-size-field-h-md)';
    }
  }
}

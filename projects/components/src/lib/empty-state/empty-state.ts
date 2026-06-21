import { ChangeDetectionStrategy, Component, computed, contentChild, input } from '@angular/core';

import type { AuSize } from '../au-size';
import { AuIcon, type AuIconName } from '../icon/icon';
import { AuEmptyStateMedia } from './au-empty-state-media.directive';

export type AuEmptyStateHeadingLevel = 2 | 3 | 4;
export type AuEmptyStateSize = AuSize | 'editorial';

let nextEmptyStateTitleId = 0;

/**
 * Centered empty placeholder for lists, tables, panels, and search results.
 *
 * @remarks
 * - **Media (first match wins):** projected `[auEmptyStateMedia]`, then `imageSrc`, then `icon`.
 * - **Actions:** default slot for buttons/links after the copy.
 * - **Not for loading:** use {@link AuSkeleton} or {@link AuSpinner}; not for alerts → {@link AuMessage}.
 * - **Accessibility:** `role="region"` with `aria-labelledby` on the title; preset icon is decorative.
 *
 * @example
 * ```html
 * <!-- Preset icon -->
 * <au-empty-state icon="search" title="No results" />
 *
 * <!-- Image -->
 * <au-empty-state imageSrc="/assets/empty-inbox.svg" imageAlt="" title="Inbox zero" />
 *
 * <!-- Custom SVG -->
 * <au-empty-state title="No projects">
 *   <svg auEmptyStateMedia aria-hidden="true" ...></svg>
 * </au-empty-state>
 * ```
 */
@Component({
  selector: 'au-empty-state',
  imports: [AuIcon],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-empty-state',
    role: 'region',
    '[attr.aria-labelledby]': 'hasTitle() ? titleId : null',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuEmptyState {
  readonly title = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  readonly description = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  /** Preset glyph when no custom media or image is provided. */
  readonly icon = input<AuIconName | undefined>(undefined);

  /** Illustration URL; ignored when `[auEmptyStateMedia]` is projected. */
  readonly imageSrc = input<string, string | undefined>(undefined, {
    transform: (v) => {
      if (v == null) {
        return undefined;
      }
      const trimmed = String(v).trim();
      return trimmed.length > 0 ? trimmed : undefined;
    },
  });

  /** `alt` for `imageSrc`; use `""` for decorative images. */
  readonly imageAlt = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  readonly size = input<AuEmptyStateSize>('md');

  /** Heading level for the title (choose to fit surrounding outline). */
  readonly headingLevel = input<AuEmptyStateHeadingLevel>(2);

  /* v8 ignore start -- contentChild token reference is not invoked at runtime */
  private readonly projectedMedia = contentChild(AuEmptyStateMedia);
  /* v8 ignore end */

  protected readonly titleId = `au-empty-state-title-${++nextEmptyStateTitleId}`;

  readonly resolvedTitle = computed(() => this.title().trim());

  readonly resolvedDescription = computed(() => this.description().trim());

  readonly hasTitle = computed(() => this.resolvedTitle().length > 0);

  readonly hasDescription = computed(() => this.resolvedDescription().length > 0);

  readonly hasProjectedMedia = computed(() => this.projectedMedia() != null);

  readonly showImage = computed(() => !this.hasProjectedMedia() && this.imageSrc() != null);

  readonly showIcon = computed(
    () => !this.hasProjectedMedia() && !this.showImage() && this.icon() != null,
  );

  readonly imageIsDecorative = computed(() => this.imageAlt().trim().length === 0);
}

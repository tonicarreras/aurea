import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuSkeleton } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSkeleton],
  template: `
    <div class="docs-skeleton-profile" aria-busy="true">
      <au-skeleton variant="circular" size="lg" />
      <div class="docs-skeleton-profile__lines">
        <au-skeleton variant="text" width="40%" />
        <au-skeleton variant="text" />
        <au-skeleton variant="text" width="70%" />
      </div>
    </div>
  `,
  styles: [
    `
      .docs-skeleton-profile {
        display: flex;
        gap: var(--au-space-4);
        align-items: flex-start;
        max-width: 20rem;
      }
      .docs-skeleton-profile__lines {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--au-space-2);
      }
    `,
  ],
})
export class SkeletonDemo {}

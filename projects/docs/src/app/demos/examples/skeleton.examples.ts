import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuSkeleton } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-skeleton-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSkeleton],
  template: `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 16rem" aria-busy="true">
      <au-skeleton variant="text" width="60%" />
      <au-skeleton variant="text" />
    </div>
  `,
})
export class ExampleSkeletonTextDemo {}

@Component({
  selector: 'docs-example-skeleton-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSkeleton],
  template: `
    <div style="display: flex; gap: 1rem; max-width: 20rem" aria-busy="true">
      <au-skeleton variant="circular" size="lg" />
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem">
        <au-skeleton variant="text" width="40%" />
        <au-skeleton variant="text" />
      </div>
    </div>
  `,
})
export class ExampleSkeletonProfileDemo {}

@Component({
  selector: 'docs-example-skeleton-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSkeleton],
  template: `<au-skeleton variant="button" size="md" width="8rem" />`,
})
export class ExampleSkeletonButtonDemo {}

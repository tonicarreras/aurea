import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuEmptyState } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-empty-state',
  imports: [AuEmptyState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="docs-preview-empty-state">
    <au-empty-state
      icon="search"
      title="No results"
      description="Try another search."
    />
  </div>`,
  styles: `
    .docs-preview-empty-state {
      display: grid;
      place-items: center;
      min-height: 8rem;
    }
  `,
})
export class EmptyStateDemo {}

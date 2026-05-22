import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuBadge } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuBadge],
  template: `<div class="docs-preview docs-preview--row">
    <au-badge
      variant="accent"
      label="New"
    /><au-badge
      variant="success"
      label="3"
    />
  </div>`,
})
export class BadgeDemo {}

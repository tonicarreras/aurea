import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuChip, AuList } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuList, AuChip],
  template: `
    <div class="docs-preview docs-preview--row">
      <au-list [ariaLabel]="t().ariaLabel">
        <div class="docs-demo-row docs-demo-row--tight">
          <au-chip label="Angular" [removable]="true" />
          <au-chip label="TypeScript" [removable]="true" />
          <au-chip label="Vitest" [removable]="true" />
        </div>
      </au-list>
    </div>
  `,
})
export class ListDemo {
  readonly t = docsPreviewCopy('list');
}

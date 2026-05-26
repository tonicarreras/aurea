import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuTab, AuTabPanel, AuTabs } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTabs, AuTab, AuTabPanel],
  template: `
    <div class="docs-preview docs-preview--wide">
      <au-tabs
        [(value)]="tab"
        [ariaLabel]="t().ariaLabel"
      >
        <button
          type="button"
          auTab="general"
        >
          {{ t().general }}
        </button>
        <button
          type="button"
          auTab="seguridad"
        >
          {{ t().security }}
        </button>
        <div auTabPanel="general">
          <p>{{ t().generalPanel }}</p>
        </div>
        <div auTabPanel="seguridad">
          <p>{{ t().securityPanel }}</p>
        </div>
      </au-tabs>
    </div>
  `,
})
export class TabsDemo {
  readonly t = docsPreviewCopy('tabs');
  readonly tab = model('general');
}

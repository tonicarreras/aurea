import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton, AuButtonGroup } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-button-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButtonGroup, AuButton],
  template: `
    <div class="docs-preview">
      <au-button-group [ariaLabel]="t().ariaLabel">
        <au-button variant="outline">{{ t().cancel }}</au-button>
        <au-button>{{ t().save }}</au-button>
      </au-button-group>
    </div>
  `,
})
export class ButtonGroupDemo {
  readonly t = docsPreviewCopy('buttonGroup');
}

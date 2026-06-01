import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuDescriptionItem, AuDescriptionList } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-description-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuDescriptionList, AuDescriptionItem],
  template: `
    <div class="docs-preview">
      <au-description-list layout="horizontal">
        <au-description-item [term]="t().nameLabel">{{ t().nameValue }}</au-description-item>
        <au-description-item [term]="t().emailLabel">{{ t().emailValue }}</au-description-item>
      </au-description-list>
    </div>
  `,
})
export class DescriptionListDemo {
  readonly t = docsPreviewCopy('descriptionList');
}

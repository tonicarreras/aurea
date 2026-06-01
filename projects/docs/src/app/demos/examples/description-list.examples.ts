import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuDescriptionItem, AuDescriptionList } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-description-list-vertical',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuDescriptionList, AuDescriptionItem],
  template: `
    <au-description-list>
      <au-description-item [term]="t().nameLabel">{{ t().nameValue }}</au-description-item>
      <au-description-item [term]="t().roleLabel">{{ t().roleValue }}</au-description-item>
    </au-description-list>
  `,
})
export class ExampleDescriptionListVerticalDemo {
  readonly t = docsExampleLive('descriptionList');
}

@Component({
  selector: 'docs-example-description-list-columns',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuDescriptionList, AuDescriptionItem],
  template: `
    <au-description-list [columns]="2">
      <au-description-item [term]="t().nameLabel">{{ t().nameValue }}</au-description-item>
      <au-description-item [term]="t().emailLabel">{{ t().emailValue }}</au-description-item>
      <au-description-item [term]="t().roleLabel">{{ t().roleValue }}</au-description-item>
    </au-description-list>
  `,
})
export class ExampleDescriptionListColumnsDemo {
  readonly t = docsExampleLive('descriptionList');
}

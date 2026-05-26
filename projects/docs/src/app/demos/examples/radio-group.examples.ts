import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuFormField, AuRadioGroup } from '@aurea-design-system/components';
import { DocsLocaleService } from '../../core/docs-locale.service';
import { docsExampleLive } from '../../core/docs-example-live-copy';
import { getRadioOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-example-radio-group-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuRadioGroup],
  template: `
    <au-form-field [label]="t().basicLabel">
      <au-radio-group [options]="options()" />
    </au-form-field>
  `,
})
export class ExampleRadioGroupBasicDemo {
  private readonly i18n = inject(DocsLocaleService);
  readonly t = docsExampleLive('radioGroup');
  readonly options = computed(() => getRadioOptions(this.i18n.locale()));
}

@Component({
  selector: 'docs-example-radio-group-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuRadioGroup],
  template: `
    <au-form-field
      [label]="t().errorLabel"
      [errorMessage]="t().errorMessage"
      [invalid]="true"
    >
      <au-radio-group [options]="options()" />
    </au-form-field>
  `,
})
export class ExampleRadioGroupErrorDemo {
  private readonly i18n = inject(DocsLocaleService);
  readonly t = docsExampleLive('radioGroup');
  readonly options = computed(() => getRadioOptions(this.i18n.locale()));
}

@Component({
  selector: 'docs-example-radio-group-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuRadioGroup],
  template: `
    <au-form-field
      [label]="t().hintLabel"
      [hint]="t().hint"
    >
      <au-radio-group [options]="options()" />
    </au-form-field>
  `,
})
export class ExampleRadioGroupHintDemo {
  private readonly i18n = inject(DocsLocaleService);
  readonly t = docsExampleLive('radioGroup');
  readonly options = computed(() => getRadioOptions(this.i18n.locale()));
}

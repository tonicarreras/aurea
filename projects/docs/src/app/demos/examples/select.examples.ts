import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuFormField, AuSelect } from '@aurea-design-system/components';
import { DocsLocaleService } from '../../core/docs-locale.service';
import { docsExampleLive } from '../../core/docs-example-live-copy';
import { getSelectOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-example-select-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSelect],
  template: `
    <au-form-field [label]="t().basicLabel">
      <au-select [placeholder]="t().placeholder" [options]="options()" style="max-width: 16rem" />
    </au-form-field>
  `,
})
export class ExampleSelectBasicDemo {
  private readonly i18n = inject(DocsLocaleService);
  readonly t = docsExampleLive('select');
  readonly options = computed(() => getSelectOptions(this.i18n.locale()));
}

@Component({
  selector: 'docs-example-select-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSelect],
  template: `
    <au-form-field
      [label]="t().errorLabel"
      [errorMessage]="t().errorMessage"
      [invalid]="true"
    >
      <au-select [placeholder]="t().placeholder" [options]="options()" style="max-width: 16rem" />
    </au-form-field>
  `,
})
export class ExampleSelectErrorDemo {
  private readonly i18n = inject(DocsLocaleService);
  readonly t = docsExampleLive('select');
  readonly options = computed(() => getSelectOptions(this.i18n.locale()));
}

@Component({
  selector: 'docs-example-select-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSelect],
  template: `
    <au-form-field [label]="t().hintLabel" [hint]="t().hint">
      <au-select [placeholder]="t().placeholder" [options]="options()" style="max-width: 16rem" />
    </au-form-field>
  `,
})
export class ExampleSelectHintDemo {
  private readonly i18n = inject(DocsLocaleService);
  readonly t = docsExampleLive('select');
  readonly options = computed(() => getSelectOptions(this.i18n.locale()));
}

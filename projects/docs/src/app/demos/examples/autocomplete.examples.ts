import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuAutocomplete, AuFormField } from '@aurea-design-system/components';
import { DocsLocaleService } from '../../core/docs-locale.service';
import { docsExampleLive } from '../../core/docs-example-live-copy';
import { getAutocompleteOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-example-autocomplete-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuAutocomplete],
  template: `
    <au-form-field [label]="t().basic.label">
      <au-autocomplete
        [placeholder]="t().basic.placeholder"
        [options]="options()"
      />
    </au-form-field>
  `,
})
export class ExampleAutocompleteBasicDemo {
  private readonly i18n = inject(DocsLocaleService);
  readonly t = docsExampleLive('autocomplete');
  readonly options = computed(() => getAutocompleteOptions(this.i18n.locale()));
}

@Component({
  selector: 'docs-example-autocomplete-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuAutocomplete],
  template: `
    <au-form-field
      [label]="t().error.label"
      [errorMessage]="t().error.errorMessage"
      [invalid]="true"
    >
      <au-autocomplete
        [placeholder]="t().error.placeholder"
        [options]="options()"
      />
    </au-form-field>
  `,
})
export class ExampleAutocompleteErrorDemo {
  private readonly i18n = inject(DocsLocaleService);
  readonly t = docsExampleLive('autocomplete');
  readonly options = computed(() => getAutocompleteOptions(this.i18n.locale()));
}

@Component({
  selector: 'docs-example-autocomplete-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuAutocomplete],
  template: `
    <au-form-field
      [label]="t().hint.label"
      [hint]="t().hint.hint"
    >
      <au-autocomplete
        [placeholder]="t().hint.placeholder"
        [options]="options()"
      />
    </au-form-field>
  `,
})
export class ExampleAutocompleteHintDemo {
  private readonly i18n = inject(DocsLocaleService);
  readonly t = docsExampleLive('autocomplete');
  readonly options = computed(() => getAutocompleteOptions(this.i18n.locale()));
}

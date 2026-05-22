import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuSelect } from '@aurea-design-system/components';
import { selectOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-example-select-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSelect],
  template: `
    <au-form-field label="País">
      <au-select
        placeholder="Elige…"
        [options]="options"
        style="max-width: 16rem"
      />
    </au-form-field>
  `,
})
export class ExampleSelectBasicDemo {
  readonly options = selectOptions;
}

@Component({
  selector: 'docs-example-select-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSelect],
  template: `
    <au-form-field
      label="País"
      errorMessage="Selecciona un país."
      [invalid]="true"
    >
      <au-select
        placeholder="Elige…"
        [options]="options"
        style="max-width: 16rem"
      />
    </au-form-field>
  `,
})
export class ExampleSelectErrorDemo {
  readonly options = selectOptions;
}

@Component({
  selector: 'docs-example-select-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSelect],
  template: `
    <au-form-field
      label="País de residencia"
      hint="Usado para facturación y envíos."
    >
      <au-select
        placeholder="Elige…"
        [options]="options"
        style="max-width: 16rem"
      />
    </au-form-field>
  `,
})
export class ExampleSelectHintDemo {
  readonly options = selectOptions;
}

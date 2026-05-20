import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuSelect } from '@aurea-design-system/components';
import { selectOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-example-select-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSelect],
  template: `
    <au-select label="País" placeholder="Elige…" [options]="options" style="max-width: 16rem" />
  `,
})
export class ExampleSelectBasicDemo {
  readonly options = selectOptions;
}

@Component({
  selector: 'docs-example-select-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSelect],
  template: `
    <au-select
      label="País"
      placeholder="Elige…"
      [options]="options"
      [required]="true"
      errorMessage="Selecciona un país."
      style="max-width: 16rem"
    />
  `,
})
export class ExampleSelectErrorDemo {
  readonly options = selectOptions;
}

@Component({
  selector: 'docs-example-select-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSelect],
  template: `
    <au-select
      label="País de residencia"
      placeholder="Elige…"
      [options]="options"
      hint="Usado para facturación y envíos."
      style="max-width: 16rem"
    />
  `,
})
export class ExampleSelectHintDemo {
  readonly options = selectOptions;
}

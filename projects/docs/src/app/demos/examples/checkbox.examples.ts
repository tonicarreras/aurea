import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuCheckbox } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-checkbox-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCheckbox],
  template: `<au-checkbox label="Acepto los términos" />`,
})
export class ExampleCheckboxBasicDemo {}

@Component({
  selector: 'docs-example-checkbox-checked',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCheckbox],
  template: `<au-checkbox label="Newsletter" [checked]="true" />`,
})
export class ExampleCheckboxCheckedDemo {}

@Component({
  selector: 'docs-example-checkbox-indeterminate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCheckbox],
  template: `<au-checkbox label="Seleccionar todo" [indeterminate]="true" />`,
})
export class ExampleCheckboxIndeterminateDemo {}

// —— Switch ——

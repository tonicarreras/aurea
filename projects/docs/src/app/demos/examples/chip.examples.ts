import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuChip } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-chip-filled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChip],
  template: `<au-chip label="Angular" />`,
})
export class ExampleChipFilledDemo {}

@Component({
  selector: 'docs-example-chip-outline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChip],
  template: `<au-chip label="TypeScript" variant="outline" />`,
})
export class ExampleChipOutlineDemo {}

@Component({
  selector: 'docs-example-chip-removable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChip],
  template: `<au-chip label="Filtro activo" variant="accent" [removable]="true" />`,
})
export class ExampleChipRemovableDemo {}

// —— Snackbar ——

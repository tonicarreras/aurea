import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuTextarea } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-textarea-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTextarea],
  template: `<au-textarea label="Comentario" [rows]="3" placeholder="Escribe aquí…" style="max-width: 24rem" />`,
})
export class ExampleTextareaBasicDemo {}

@Component({
  selector: 'docs-example-textarea-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTextarea],
  template: `
    <au-textarea
      label="Bio"
      [rows]="4"
      hint="Máximo 280 caracteres."
      style="max-width: 24rem"
    />
  `,
})
export class ExampleTextareaHintDemo {}

@Component({
  selector: 'docs-example-textarea-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTextarea],
  template: `
    <au-textarea
      label="Comentario"
      [rows]="3"
      errorMessage="Añade al menos una frase."
      style="max-width: 24rem"
    />
  `,
})
export class ExampleTextareaErrorDemo {}

// —— Checkbox ——

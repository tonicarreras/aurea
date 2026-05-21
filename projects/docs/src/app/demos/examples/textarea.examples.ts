import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuTextarea } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-textarea-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuTextarea],
  template: `
    <au-form-field label="Comentario">
      <au-textarea [rows]="3" placeholder="Escribe aquí…" style="max-width: 24rem" />
    </au-form-field>
  `,
})
export class ExampleTextareaBasicDemo {}

@Component({
  selector: 'docs-example-textarea-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuTextarea],
  template: `
    <au-form-field label="Bio" hint="Máximo 280 caracteres.">
      <au-textarea [rows]="4" placeholder="Quién eres y qué haces…" style="max-width: 24rem" />
    </au-form-field>
  `,
})
export class ExampleTextareaHintDemo {}

@Component({
  selector: 'docs-example-textarea-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuTextarea],
  template: `
    <au-form-field
      label="Comentario"
      errorMessage="Añade al menos una frase."
      [invalid]="true"
    >
      <au-textarea [rows]="3" style="max-width: 24rem" />
    </au-form-field>
  `,
})
export class ExampleTextareaErrorDemo {}

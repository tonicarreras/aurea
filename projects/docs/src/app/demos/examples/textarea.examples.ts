import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuTextarea } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-textarea-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuTextarea],
  template: `
    <au-form-field [label]="t().commentLabel">
      <textarea auTextarea
        [rows]="3"
        [placeholder]="t().commentPlaceholder"></textarea>
    </au-form-field>
  `,
})
export class ExampleTextareaBasicDemo {
  readonly t = docsExampleLive('textarea');
}

@Component({
  selector: 'docs-example-textarea-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuTextarea],
  template: `
    <au-form-field
      [label]="t().bioLabel"
      [hint]="t().bioHint"
    >
      <textarea auTextarea
        [rows]="3"
        [placeholder]="t().bioPlaceholder"></textarea>
    </au-form-field>
  `,
})
export class ExampleTextareaHintDemo {
  readonly t = docsExampleLive('textarea');
}

@Component({
  selector: 'docs-example-textarea-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuTextarea],
  template: `
    <au-form-field
      [label]="t().errorLabel"
      [errorMessage]="t().errorMessage"
      [invalid]="true"
    >
      <textarea auTextarea [rows]="3"></textarea>
    </au-form-field>
  `,
})
export class ExampleTextareaErrorDemo {
  readonly t = docsExampleLive('textarea');
}

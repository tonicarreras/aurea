import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import {
  AuButton,
  AuDialog,
  AuDialogFooter,
  AuFormField,
  AuInputText,
} from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';
import { DEMO_STACK } from '../shared/demo-layout';

@Component({
  selector: 'docs-example-dialog-confirm',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuDialog, AuDialogFooter],
  template: `
    <au-button
      type="button"
      (click)="open.set(true)"
      >{{ t().confirmOpen }}</au-button
    >
    <au-dialog
      [(open)]="open"
      [title]="t().confirmTitle"
      size="sm"
    >
      <p>{{ t().confirmBody }}</p>
      <div auDialogFooter>
        <au-button
          style="margin-right: var(--au-space-2);"
          variant="secondary"
          type="button"
          (click)="open.set(false)"
          >{{ t().cancel }}</au-button
        >
        <au-button
          type="button"
          (click)="open.set(false)"
          >{{ t().delete }}</au-button
        >
      </div>
    </au-dialog>
  `,
})
export class ExampleDialogConfirmDemo {
  readonly t = docsExampleLive('dialog');
  readonly open = model(false);
}

@Component({
  selector: 'docs-example-dialog-form-validation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuDialog, AuDialogFooter, AuFormField, AuInputText],
  template: `
    <au-button
      type="button"
      (click)="open.set(true)"
      >{{ t().formOpen }}</au-button
    >
    <au-dialog
      [(open)]="open"
      [title]="t().formTitle"
      size="md"
    >
      <div class="docs-demo-stack">
        <au-form-field
          [label]="t().nameLabel"
          [errorMessage]="t().nameError"
          [invalid]="true"
        >
          <au-input-text
            [placeholder]="t().namePlaceholder"
            style="max-width: 100%"
          />
        </au-form-field>
        <au-form-field
          [label]="t().emailLabel"
          [errorMessage]="t().emailError"
          [invalid]="true"
        >
          <au-input-text
            type="email"
            [placeholder]="t().emailPlaceholder"
            style="max-width: 100%"
          />
        </au-form-field>
      </div>
      <div auDialogFooter>
        <au-button
          variant="secondary"
          type="button"
          (click)="open.set(false)"
          >{{ t().cancel }}</au-button
        >
        <au-button
          type="button"
          (click)="open.set(false)"
          >{{ t().save }}</au-button
        >
      </div>
    </au-dialog>
  `,
  styles: [DEMO_STACK],
})
export class ExampleDialogFormValidationDemo {
  readonly t = docsExampleLive('dialog');
  readonly open = model(false);
}

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
    <button auButton
      type="button"
      (click)="open.set(true)"
      >{{ t().confirmOpen }}</button
    >
    <au-dialog
      [(open)]="open"
      [title]="t().confirmTitle"
      size="sm"
    >
      <p>{{ t().confirmBody }}</p>
      <div auDialogFooter>
        <button auButton
          style="margin-right: var(--au-space-2);"
          variant="secondary"
          type="button"
          (click)="open.set(false)"
          >{{ t().cancel }}</button
        >
        <button auButton
          type="button"
          (click)="open.set(false)"
          >{{ t().delete }}</button
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
    <button auButton
      type="button"
      (click)="open.set(true)"
      >{{ t().formOpen }}</button
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
          <input auInputText
            [placeholder]="t().namePlaceholder"
            style="max-width: 100%"
          />
        </au-form-field>
        <au-form-field
          [label]="t().emailLabel"
          [errorMessage]="t().emailError"
          [invalid]="true"
        >
          <input auInputText
            type="email"
            [placeholder]="t().emailPlaceholder"
            style="max-width: 100%"
          />
        </au-form-field>
      </div>
      <div auDialogFooter>
        <button auButton
          variant="secondary"
          type="button"
          (click)="open.set(false)"
          >{{ t().cancel }}</button
        >
        <button auButton
          type="button"
          (click)="open.set(false)"
          >{{ t().save }}</button
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

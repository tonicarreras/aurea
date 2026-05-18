import { Component, input, model, output } from '@angular/core';
import { Button } from '../button/button';
import { Snackbar, type SnackbarPosition, type SnackbarVariant } from './snackbar';

/**
 * Storybook-only host: trigger + snackbar on a canvas that matches Aurea surfaces.
 * Not part of the published library API.
 */
@Component({
  selector: 'au-snackbar-story-host',
  imports: [Button, Snackbar],
  template: `
    <div class="au-snackbar-story-wrap">
      <div class="au-snackbar-story">
        @if (hint()) {
          <p class="au-snackbar-story__hint">{{ hint() }}</p>
        }
        <au-button type="button" (click)="show()">{{ triggerLabel() }}</au-button>
      </div>
      <au-snackbar
        [(open)]="open"
        [message]="message()"
        [variant]="variant()"
        [position]="position()"
        [durationMs]="durationMs()"
        [actionLabel]="actionLabel()"
        [showCloseButton]="showCloseButton()"
        (dismiss)="onDismiss()"
        (action)="onAction()"
      />
    </div>
  `,
  styles: [
    `
      .au-snackbar-story-wrap {
        min-height: 8rem;
      }

      .au-snackbar-story {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--au-space-3);
        min-height: 8rem;
        padding: var(--au-space-6);
        background: var(--au-color-surface-canvas);
        border: 1px dashed var(--au-color-border-subtle);
        border-radius: var(--au-radius-lg);
      }

      .au-snackbar-story__hint {
        margin: 0;
        max-width: 28rem;
        font-family: var(--au-font-sans);
        font-size: var(--au-text-sm);
        line-height: var(--au-leading-normal);
        color: var(--au-color-text-tertiary);
        text-align: center;
      }
    `,
  ],
})
export class SnackbarStoryHost {
  readonly hint = input('');
  readonly triggerLabel = input('Show snackbar');
  readonly open = model(false);
  readonly message = input('Changes saved successfully.');
  readonly variant = input<SnackbarVariant>('default');
  readonly position = input<SnackbarPosition>('bottom-center');
  readonly durationMs = input(5000);
  readonly actionLabel = input('');
  readonly showCloseButton = input(true);

  readonly dismiss = output<void>();
  readonly action = output<void>();

  show(): void {
    this.open.set(true);
  }

  onDismiss(): void {
    this.open.set(false);
    this.dismiss.emit();
  }

  onAction(): void {
    this.open.set(false);
    this.action.emit();
  }
}

import { Component, input } from '@angular/core';
import { AuButton } from '../button/button';
import { AuDialogFooter } from './dialog-footer.directive';
import { AuDialog } from './dialog';

/**
 * Storybook-only host: trigger + dialog on a canvas that matches Aurea surfaces.
 * Not part of the published library API.
 */
@Component({
  selector: 'au-dialog-story-host',
  imports: [AuButton, AuDialog, AuDialogFooter],
  template: `
    <div class="au-dialog-story" [attr.data-au-story-size]="size()">
      @if (hint()) {
        <p class="au-dialog-story__hint">{{ hint() }}</p>
      }
      <au-button type="button" (click)="open = true">{{ triggerLabel() }}</au-button>
      <au-dialog
        [(open)]="open"
        [title]="title()"
        [size]="size()"
        [showCloseButton]="showCloseButton()"
        [closeOnBackdrop]="closeOnBackdrop()"
        [closeOnEscape]="closeOnEscape()"
        [ariaLabel]="ariaLabel()"
        (close)="onDialogClose()"
      >
        <ng-content />
        @if (showDemoFooter()) {
          <div auDialogFooter>
            <au-button style="margin-right: var(--au-space-2);" variant="secondary" type="button" (click)="open = false">Cancel</au-button>
            <au-button type="button" (click)="open = false">Confirm</au-button>
          </div>
        }
      </au-dialog>
    </div>
  `,
  styles: [
    `
      .au-dialog-story {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--au-space-3);
        min-height: 11rem;
        padding: var(--au-space-6);
        background: var(--au-color-surface-canvas);
        border: 1px dashed var(--au-color-border-subtle);
        border-radius: var(--au-radius-lg);
      }

      .au-dialog-story__hint {
        margin: 0;
        max-width: 32rem;
        font-family: var(--au-font-sans);
        font-size: var(--au-text-sm);
        line-height: var(--au-leading-normal);
        color: var(--au-color-text-tertiary);
        text-align: center;
      }

      .au-dialog-story[data-au-story-size='full'] {
        min-height: 14rem;
      }
    `,
  ],
})
export class DialogStoryHost {
  open = false;

  readonly hint = input('');
  readonly triggerLabel = input('Open dialog');
  readonly title = input('Dialog title');
  readonly size = input<'sm' | 'md' | 'lg' | 'full'>('md');
  readonly showCloseButton = input(true);
  readonly closeOnBackdrop = input(true);
  readonly closeOnEscape = input(true);
  readonly ariaLabel = input('');
  /** Renders demo footer buttons that close the dialog (Storybook only). */
  readonly showDemoFooter = input(false);

  onDialogClose(): void {
    this.open = false;
  }
}

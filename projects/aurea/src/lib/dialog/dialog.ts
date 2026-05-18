import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';

/**
 * Design-system **dialog**: native `<dialog>` overlay for focused interactions.
 *
 * @remarks
 * - **Visibility:** `[(open)]` syncs with `showModal()` / `close()`; hidden when closed (`display: none`).
 * - **Sizes:** sm, md (default), lg, full.
 * - **Accessibility:** `aria-labelledby` when `title` is set; `aria-label` when only `ariaLabel` is set.
 * - **Dismiss:** backdrop click (outside panel), Escape (`closeOnEscape`), close button.
 *
 * @example
 * ```html
 * <au-dialog [(open)]="showDialog" title="Confirm">
 *   <p>Are you sure?</p>
 *   <div auDialogFooter>
 *     <au-button variant="secondary" (click)="showDialog = false">Cancel</au-button>
 *     <au-button (click)="confirm()">Confirm</au-button>
 *   </div>
 * </au-dialog>
 * ```
 */
@Component({
  selector: 'au-dialog',
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-dialog',
    '[attr.data-au-size]': 'size()',
  },
})
export class Dialog {
  private static nextTitleId = 0;

  private readonly dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  /** Controls visibility; two-way binding with `[(open)]`. */
  readonly open = model<boolean>(false);
  /** Emits when the dialog is dismissed. */
  readonly close = output<void>();
  /** Optional id prefix; title uses `${id()}-title` when set. */
  readonly id = input<string>('');
  /** Visible title (`h2`); drives `aria-labelledby` when non-empty. */
  readonly title = input<string>('');
  /** Accessible name when there is no visible title. */
  readonly ariaLabel = input<string>('');
  readonly showCloseButton = input<boolean>(true);
  /** Close when the user clicks the dimmed backdrop (outside the panel). */
  readonly closeOnBackdrop = input<boolean>(true);
  /** Close when the user presses Escape. */
  readonly closeOnEscape = input<boolean>(true);
  readonly size = input<'sm' | 'md' | 'lg' | 'full'>('md');

  private readonly titleDomId = `au-dialog-title-${++Dialog.nextTitleId}`;

  readonly titleHeadingId = computed(() => {
    const custom = this.id();
    return custom ? `${custom}-title` : this.titleDomId;
  });

  constructor() {
    let lastOpen: boolean | undefined;
    effect(() => {
      const isOpen = this.open();
      if (isOpen === lastOpen) {
        /* v8 ignore next -- @preserve: guard when unrelated signals re-run the effect */
        return;
      }
      lastOpen = isOpen;
      const dialog = this.dialogRef().nativeElement;
      if (isOpen) {
        this.openDialogElement(dialog);
      } else if (this.isDialogDisplayed(dialog)) {
        this.closeDialogElement(dialog);
      }
    });
  }

  private openDialogElement(dialog: HTMLDialogElement): void {
    const show = dialog.showModal?.bind(dialog);
    if (show) {
      show();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  private closeDialogElement(dialog: HTMLDialogElement): void {
    if (typeof dialog.close === 'function') {
      dialog.close();
      return;
    }
    if (!dialog.hasAttribute('open')) {
      return;
    }
    dialog.removeAttribute('open');
    dialog.dispatchEvent(new Event('close'));
  }

  private isDialogDisplayed(dialog: HTMLDialogElement): boolean {
    if (typeof dialog.close === 'function') {
      return dialog.open;
    }
    return dialog.hasAttribute('open');
  }

  onCloseButtonClick(): void {
    this.closeDialogElement(this.dialogRef().nativeElement);
  }

  onDialogClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop()) {
      return;
    }
    const target = event.target;
    if (target instanceof Element && target.closest('.au-dialog__panel')) {
      return;
    }
    this.closeDialogElement(this.dialogRef().nativeElement);
  }

  onDialogCancel(event: Event): void {
    if (!this.closeOnEscape()) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    const d = this.dialogRef().nativeElement;
    if (this.isDialogDisplayed(d)) {
      this.closeDialogElement(d);
    }
  }

  onDialogClose(): void {
    if (this.open()) {
      this.open.set(false);
      this.close.emit();
    }
  }
}

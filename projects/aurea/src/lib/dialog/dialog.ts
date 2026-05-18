import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { AuDialogFooter } from './dialog-footer.directive';
import {
  focusInitialInDialogPanel,
  handleDialogTabKeydown,
} from './dialog-focus-trap';

/**
 * Design-system **dialog**: native `<dialog>` overlay for focused interactions.
 *
 * @remarks
 * - **Visibility:** `[(open)]` syncs with `showModal()` / `close()` after render via `afterRenderEffect`.
 * - **Sizes:** sm, md (default), lg, full.
 * - **Accessibility:** `aria-labelledby` when `title` is set; `aria-label` when only `ariaLabel` is set.
 * - **Dismiss:** backdrop click (outside panel), Escape (`closeOnEscape`), close button.
 * - **Focus:** Tab cycles within the panel; focus returns to the trigger on close (WCAG modal pattern).
 * - **Footer:** import `AuDialogFooter` in the host that projects `[auDialogFooter]`.
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-dialog',
    '[attr.data-au-size]': 'size()',
  },
})
export class Dialog {
  private static nextTitleId = 0;

  private readonly host = inject(ElementRef<HTMLElement>);

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

  private readonly footerPresent = signal(false);

  @ContentChild(AuDialogFooter)
  set footerSlot(slot: AuDialogFooter | undefined) {
    this.footerPresent.set(slot != null);
  }

  /** True when `[auDialogFooter]` content is projected. */
  readonly hasFooter = this.footerPresent.asReadonly();

  private readonly titleDomId = `au-dialog-title-${++Dialog.nextTitleId}`;

  /** Element focused before the dialog opened; restored on close. */
  private savedFocus: HTMLElement | null = null;

  readonly titleHeadingId = computed(() => {
    const custom = this.id();
    return custom ? `${custom}-title` : this.titleDomId;
  });

  /** Syncs `open` to the native `<dialog>` once the view is in the DOM. */
  private readonly syncOpenToNativeDialog = afterRenderEffect(() => {
    this.applyOpenStateToNativeDialog();
  });

  private applyOpenStateToNativeDialog(): void {
    const isOpen = this.open();
    const dialog = this.host.nativeElement.querySelector('dialog');
    if (!dialog) {
      return;
    }
    if (isOpen) {
      this.openDialogElement(dialog);
    } else if (this.isDialogDisplayed(dialog)) {
      this.closeDialogElement(dialog);
    }
  }

  private openDialogElement(dialog: HTMLDialogElement): void {
    const wasDisplayed = this.isDialogDisplayed(dialog);
    if (!wasDisplayed) {
      this.savedFocus =
        typeof document !== 'undefined' && document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    }
    const show = dialog.showModal?.bind(dialog);
    if (show) {
      show();
    } else {
      dialog.setAttribute('open', '');
    }
    if (!wasDisplayed) {
      queueMicrotask(() => {
        if (!this.open()) {
          return;
        }
        const panel = dialog.querySelector<HTMLElement>('.au-dialog__panel');
        if (panel) {
          focusInitialInDialogPanel(panel);
        }
      });
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
    const dialog = this.host.nativeElement.querySelector('dialog');
    if (dialog) {
      this.closeDialogElement(dialog);
    }
  }

  onDialogClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop()) {
      return;
    }
    const target = event.target;
    if (target instanceof Element && target.closest('.au-dialog__panel')) {
      return;
    }
    const dialog = this.host.nativeElement.querySelector('dialog');
    if (dialog) {
      this.closeDialogElement(dialog);
    }
  }

  onDialogKeydown(event: KeyboardEvent): void {
    if (!this.open()) {
      return;
    }
    const dialog = this.host.nativeElement.querySelector('dialog');
    const panel = dialog?.querySelector('.au-dialog__panel') as HTMLElement | null;
    if (!panel) {
      return;
    }
    handleDialogTabKeydown(event, panel);
  }

  onDialogCancel(event: Event): void {
    if (!this.closeOnEscape()) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    const dialog = this.host.nativeElement.querySelector('dialog');
    if (dialog && this.isDialogDisplayed(dialog)) {
      this.closeDialogElement(dialog);
    }
  }

  onDialogClose(): void {
    if (this.open()) {
      this.open.set(false);
      this.close.emit();
    }
    this.restoreSavedFocus();
  }

  private restoreSavedFocus(): void {
    const el = this.savedFocus;
    this.savedFocus = null;
    if (el?.isConnected) {
      el.focus();
    }
  }
}

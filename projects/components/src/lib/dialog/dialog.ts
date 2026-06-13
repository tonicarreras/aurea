import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  contentChild,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { injectHostRef } from '../au-host-element';
import { AuIcon } from '../icon/icon';
import {
  createModalScrollAllowPredicate,
  installPageScrollPrevention,
} from '../overlay/prevent-page-scroll';
import { AuDialogFooter } from './dialog-footer.directive';
import { focusInitialInDialogPanel, handleDialogTabKeydown } from './dialog-focus-trap';

/**
 * Design-system **dialog**: native `<dialog>` overlay for focused interactions.
 *
 * @remarks
 * - **Visibility:** `[(open)]` syncs with `showModal()` / `close()` after render via `afterRenderEffect`.
 * - **Sizes:** sm, md (default), lg, full.
 * - **Accessibility:** `aria-labelledby` when `title` is set; `aria-label` when only `ariaLabel` is set.
 * - **Dismiss:** backdrop click (outside panel), Escape (`closeOnEscape`), close button.
 * - **Focus:** Tab cycles within the panel; focus returns to the trigger on close (WCAG modal pattern).
 * - **Scroll:** background wheel/touch scroll is blocked while open; scroll inside `.au-dialog__body` still works.
 * - **Footer:** import `AuDialogFooter` in the host that projects `[auDialogFooter]`.
 *
 * @example
 * ```html
 * <au-dialog [(open)]="showDialog" title="Confirm">
 *   <p>Are you sure?</p>
 *   <div auDialogFooter>
 *     <button auButton variant="secondary" (click)="showDialog = false">Cancel</button>
 *     <button auButton (click)="confirm()">Confirm</button>
 *   </div>
 * </au-dialog>
 * ```
 */
@Component({
  selector: 'au-dialog',
  imports: [AuIcon],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'au-dialog',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuDialog {
  private static nextTitleId = 0;

  private readonly host = injectHostRef<HTMLElement>();
  private readonly document = inject(DOCUMENT);

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

  /* v8 ignore start */
  readonly footerSlot = contentChild(AuDialogFooter);
  /* v8 ignore stop */

  /** True when `[auDialogFooter]` content is projected. */
  readonly hasFooter = computed(() => this.footerSlot() !== undefined);

  private readonly titleDomId = `au-dialog-title-${++AuDialog.nextTitleId}`;

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

  private readonly preventPageScrollWhileOpen = afterRenderEffect((onCleanup) => {
    if (!this.open()) {
      return;
    }

    onCleanup(
      installPageScrollPrevention(
        this.document,
        createModalScrollAllowPredicate(() => this.nativeDialog(), '.au-dialog__body'),
      ),
    );
  });

  private nativeDialog(): HTMLDialogElement | null {
    const el = this.host.nativeElement.querySelector('dialog');
    return el instanceof HTMLDialogElement ? el : null;
  }

  private applyOpenStateToNativeDialog(): void {
    const isOpen = this.open();
    const dialog = this.nativeDialog();
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
    this.open.set(false);
  }

  onDialogClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop()) {
      return;
    }
    const target = event.target;
    if (target instanceof Element && target.closest('.au-dialog__panel')) {
      return;
    }
    const dialog = this.nativeDialog();
    if (dialog) {
      this.closeDialogElement(dialog);
    }
  }

  onDialogKeydown(event: KeyboardEvent): void {
    if (!this.open()) {
      return;
    }
    const dialog = this.nativeDialog();
    const panel = dialog?.querySelector<HTMLElement>('.au-dialog__panel');
    if (!panel) {
      return;
    }
    handleDialogTabKeydown(event, panel);
  }

  onDialogCancel(event: Event): void {
    if (!this.closeOnEscape()) {
      event.preventDefault();
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

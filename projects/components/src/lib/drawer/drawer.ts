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
import { AuIcon } from '../icon/icon';
import { AuDialogFooter } from '../dialog/dialog-footer.directive';
import { focusInitialInDialogPanel, handleDialogTabKeydown } from '../dialog/dialog-focus-trap';

export type AuDrawerPosition = 'start' | 'end';
export type AuDrawerSize = 'sm' | 'md' | 'lg' | 'full';

/**
 * Side panel overlay for navigation, filters, or detail views.
 *
 * @remarks
 * - **Visibility:** `[(open)]` syncs with native `<dialog>` via `showModal()`.
 * - **Position:** `start` (left in LTR) or `end` (right in LTR).
 * - **Accessibility:** same focus trap as `au-dialog`; scroll is handled by native `showModal()`.
 * - **Footer:** project actions with `[auDrawerFooter]` (alias of `AuDialogFooter`).
 */
@Component({
  selector: 'au-drawer',
  imports: [AuIcon],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'au-drawer',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-position]': 'position()',
  },
})
export class AuDrawer {
  private static nextTitleId = 0;

  private readonly host = inject(ElementRef<HTMLElement>);
  private savedFocus: HTMLElement | null = null;

  readonly open = model<boolean>(false);
  readonly close = output<void>();
  readonly id = input<string>('');
  readonly title = input<string>('');
  readonly ariaLabel = input<string>('');
  readonly showCloseButton = input<boolean>(true);
  readonly closeOnBackdrop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly position = input<AuDrawerPosition>('end');
  readonly size = input<AuDrawerSize>('md');

  private readonly footerPresent = signal(false);

  @ContentChild(AuDialogFooter)
  set footerSlot(slot: AuDialogFooter | undefined) {
    this.footerPresent.set(slot != null);
  }

  readonly hasFooter = this.footerPresent.asReadonly();

  private readonly titleDomId = `au-drawer-title-${++AuDrawer.nextTitleId}`;

  readonly titleHeadingId = computed(() => {
    const custom = this.id();
    return custom ? `${custom}-title` : this.titleDomId;
  });

  private readonly syncOpenToNativeDialog = afterRenderEffect(() => {
    this.applyOpenStateToNativeDialog();
  });

  private nativeDialog(): HTMLDialogElement | null {
    const el = (this.host.nativeElement as HTMLElement).querySelector('dialog');
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
        const panel = dialog.querySelector<HTMLElement>('.au-drawer__panel');
        if (panel) {
          focusInitialInDialogPanel(panel);
        }
      });
    }
  }

  private closeDialogElement(dialog: HTMLDialogElement): void {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else if (dialog.hasAttribute('open')) {
      dialog.removeAttribute('open');
      dialog.dispatchEvent(new Event('close'));
    }
  }

  private isDialogDisplayed(dialog: HTMLDialogElement): boolean {
    if (typeof dialog.close === 'function') {
      return dialog.open;
    }
    return dialog.hasAttribute('open');
  }

  onCloseButtonClick(): void {
    const dialog = this.nativeDialog();
    if (dialog) {
      this.closeDialogElement(dialog);
    }
  }

  onDialogClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop()) {
      return;
    }
    const target = event.target;
    if (target instanceof Element && target.closest('.au-drawer__panel')) {
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
    const panel = dialog?.querySelector<HTMLElement>('.au-drawer__panel');
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
    const dialog = this.nativeDialog();
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

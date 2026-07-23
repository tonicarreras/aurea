import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Renderer2,
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
import { AuDialogFooter } from '../dialog/dialog-footer.directive';
import { focusInitialInDialogPanel, handleDialogTabKeydown } from '../dialog/dialog-focus-trap';
import {
  ensureModalDialogPortaledToBody,
  restoreModalDialogPortal,
  type ModalDialogPortalState,
} from '../overlay/modal-dialog-portal';
import {
  createModalDialogInteractionAllowPredicate,
  isModalPanelOrFloatingOverlayClick,
} from '../overlay/modal-backdrop-click';
import { installOutsideInteractionBlock } from '../overlay/floating-panel-interaction-guard';
import {
  createModalScrollAllowPredicate,
  installModalPageScrollPrevention,
} from '../overlay/prevent-page-scroll';

export type AuDrawerPosition = 'start' | 'end';
export type AuDrawerSize = 'sm' | 'md' | 'lg' | 'full';

/**
 * Side panel overlay for navigation, filters, or detail views.
 *
 * @remarks
 * - **Visibility:** `[(open)]` syncs with native `<dialog>` via `showModal()`.
 * - **Position:** `start` (left in LTR) or `end` (right in LTR).
 * - **Accessibility:** same focus trap as `au-dialog`; background wheel/touch scroll is blocked while open.
 * - **Portal:** native `<dialog>` moves to `document.body` while open so it covers the viewport.
 * - **Footer:** project actions with `[auDrawerFooter]` / `[auDialogFooter]`. Importing
 *   `AuDialogFooter` is recommended (enables `hasFooter()`); the attribute alone is enough to render.
 */
@Component({
  selector: 'au-drawer',
  imports: [AuIcon],
  templateUrl: './drawer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-drawer',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-position]': 'position()',
  },
})
export class AuDrawer {
  private static nextTitleId = 0;

  private readonly host = injectHostRef<HTMLElement>();
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogPortal: ModalDialogPortalState = { anchor: null, unbindHostContext: null };
  private nativeDialogEl: HTMLDialogElement | null = null;
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

  /* v8 ignore start */
  readonly footerSlot = contentChild(AuDialogFooter);
  /* v8 ignore stop */

  readonly hasFooter = computed(() => this.footerSlot() !== undefined);

  private readonly titleDomId = `au-drawer-title-${++AuDrawer.nextTitleId}`;

  readonly titleHeadingId = computed(() => {
    const custom = this.id();
    return custom ? `${custom}-title` : this.titleDomId;
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.nativeDialogEl) {
        restoreModalDialogPortal(this.document, this.nativeDialogEl, this.dialogPortal);
      }
    });
  }

  private readonly syncOpenToNativeDialog = afterRenderEffect(() => {
    this.applyOpenStateToNativeDialog();
  });

  private readonly preventPageScrollWhileOpen = afterRenderEffect((onCleanup) => {
    if (!this.open()) {
      return;
    }

    onCleanup(
      installModalPageScrollPrevention(
        this.document,
        createModalScrollAllowPredicate(() => this.nativeDialog(), '.au-drawer__body'),
      ),
    );
  });

  private readonly blockOutsideInteractionWhileOpen = afterRenderEffect((onCleanup) => {
    if (!this.open()) {
      return;
    }

    onCleanup(
      installOutsideInteractionBlock(
        this.document,
        createModalDialogInteractionAllowPredicate(() => this.nativeDialogEl),
      ),
    );
  });

  private nativeDialog(): HTMLDialogElement | null {
    if (this.nativeDialogEl?.isConnected) {
      return this.nativeDialogEl;
    }
    const el = this.host.nativeElement.querySelector('dialog');
    this.nativeDialogEl = el instanceof HTMLDialogElement ? el : null;
    return this.nativeDialogEl;
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
    ensureModalDialogPortaledToBody(
      this.document,
      this.renderer,
      dialog,
      this.dialogPortal,
      this.host.nativeElement,
    );
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
    this.open.set(false);
  }

  onDialogClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop()) {
      return;
    }
    const target = event.target;
    if (isModalPanelOrFloatingOverlayClick(target, '.au-drawer__panel')) {
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

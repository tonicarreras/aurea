import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  forwardRef,
  PLATFORM_ID,
  Renderer2,
  afterRenderEffect,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { bindDocumentDismiss } from '../overlay/document-dismiss';
import { TooltipOverlay } from '../overlay/tooltip-overlay';
import type { AuTooltipPlacement } from '../overlay/tooltip-position';
import { AU_MENU } from './au-menu.token';

/** Used by `forwardRef` in component providers (testable factory). */
export function auMenuSelfRef(): typeof AuMenu {
  return AuMenu;
}

/**
 * Dropdown menu anchored to a trigger. Panel is portaled to `document.body`.
 *
 * @remarks
 * - **Open state:** `[(open)]` with `openChange` output.
 * - **Trigger:** `auMenuTrigger` on the control that toggles the panel.
 * - **Items:** `au-menu-item` emits `select` and closes the menu.
 * - **Dismiss:** outside click, Escape, and window scroll.
 *
 * @example
 * ```html
 * <au-menu [(open)]="open">
 *   <au-button auMenuTrigger>Actions</au-button>
 *   <au-menu-item (select)="onEdit()">Edit</au-menu-item>
 * </au-menu>
 * ```
 */
@Component({
  selector: 'au-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: AU_MENU, useExisting: forwardRef(auMenuSelfRef) }],
  host: {
    class: 'au-menu',
  },
})
export class AuMenu {
  readonly open = model(false);
  readonly placement = input<AuTooltipPlacement>('bottom');
  readonly disabled = input(false);

  readonly openChange = output<boolean>();

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);

  private readonly overlay = new TooltipOverlay(
    this.document,
    this.renderer,
    inject(PLATFORM_ID),
    this.destroyRef,
  );

  protected readonly panelRef = viewChild<ElementRef<HTMLElement>>('panel');
  protected readonly triggerHost = signal<HTMLElement | null>(null);

  constructor() {
    bindDocumentDismiss(this.document, this.renderer, this.destroyRef, {
      onClick: (event) => this.onDocumentClick(event),
      onKeydown: (event) => this.onDocumentKeydown(event),
    });
    this.bindScrollDismiss();
  }

  /**
   * Closes the menu on window scroll — follows the standard UX pattern where
   * menus dismiss on scroll instead of repositioning like a tooltip or select listbox.
   */
  private bindScrollDismiss(): void {
    const win = this.document.defaultView;
    if (!win) return;
    const unlisten = this.renderer.listen(win, 'scroll', () => {
      if (!this.open()) {
        return;
      }
      this.overlay.detach();
      this.setOpen(false);
    });
    this.destroyRef.onDestroy(() => unlisten());
  }

  private readonly syncPanelOverlay = afterRenderEffect(() => {
    const panel = this.panelRef()?.nativeElement;
    const trigger = this.triggerHost();
    if (!this.open() || !panel || !trigger) {
      this.overlay.detach();
      return;
    }
    this.renderer.addClass(panel, 'au-floating-panel');
    this.renderer.addClass(panel, 'au-menu__panel');
    this.overlay.sync(panel, trigger, this.placement());
  });

  registerTrigger(el: HTMLElement): void {
    this.triggerHost.set(el);
  }

  toggle(): void {
    if (this.disabled()) {
      return;
    }
    this.setOpen(!this.open());
  }

  close(): void {
    if (!this.open()) {
      return;
    }
    this.setOpen(false);
  }

  private setOpen(value: boolean): void {
    this.open.set(value);
    this.openChange.emit(value);
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.open()) {
      return;
    }
    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }
    const host = this.host.nativeElement as HTMLElement;
    const panel = this.panelRef()?.nativeElement;
    if (host.contains(target) || panel?.contains(target)) {
      return;
    }
    this.close();
  }

  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.open() || event.key !== 'Escape') {
      return;
    }
    event.preventDefault();
    this.close();
  }
}

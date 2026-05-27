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
import { AU_POPOVER } from './au-popover.token';

/** Used by `forwardRef` in component providers (testable factory). */
export function auPopoverSelfRef(): typeof AuPopover {
  return AuPopover;
}

/**
 * Lightweight panel anchored to a trigger (filters, help, compact forms).
 *
 * @remarks
 * - Same overlay model as {@link AuMenu}: portaled panel, `[(open)]`, outside click, Escape.
 * - **Trigger:** `auPopoverTrigger`; `aria-haspopup="dialog"` on the trigger.
 *
 * @example
 * ```html
 * <au-popover [(open)]="filtersOpen">
 *   <au-button auPopoverTrigger>Filters</au-button>
 *   <p>Filter content</p>
 * </au-popover>
 * ```
 */
@Component({
  selector: 'au-popover',
  templateUrl: './popover.html',
  styleUrl: './popover.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: AU_POPOVER, useExisting: forwardRef(auPopoverSelfRef) }],
  host: {
    class: 'au-popover',
  },
})
export class AuPopover {
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
   * Closes the popover on window scroll — follows the same UX pattern as menu:
   * overlays that are not tooltips dismiss when the user scrolls.
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
    this.renderer.addClass(panel, 'au-popover__panel');
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

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
  signal,
  viewChild,
} from '@angular/core';
import { injectHostRef } from '../au-host-element';

import {
  focusInitialInDialogPanel,
  handleDialogTabKeydown,
} from '../dialog/dialog-focus-trap';
import { installPageScrollPrevention } from '../overlay/prevent-page-scroll';
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
 * - Same overlay model as {@link AuMenu}: portaled panel, `[(open)]`, outside click, Escape, scroll dismiss.
 * - **Trigger:** `auPopoverTrigger`; `aria-haspopup="dialog"` on the trigger.
 *
 * @example
 * ```html
 * <au-popover [(open)]="filtersOpen">
 *   <button auButton auPopoverTrigger>Filters</button>
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
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
})
export class AuPopover {
  readonly open = model(false);
  readonly placement = input<AuTooltipPlacement>('bottom');
  readonly disabled = input(false);

  private readonly host = injectHostRef<HTMLElement>();
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
  private savedTrigger: HTMLElement | null = null;

  private readonly syncPanelOverlay = afterRenderEffect(() => {
    const panel = this.panelRef()?.nativeElement;
    const trigger = this.triggerHost();
    const isOpen = this.open();

    if (!isOpen || !panel || !trigger) {
      if (!isOpen && this.savedTrigger?.isConnected) {
        this.savedTrigger.focus();
        this.savedTrigger = null;
      }
      this.overlay.detach();
      return;
    }

    this.renderer.addClass(panel, 'au-floating-panel');
    this.renderer.addClass(panel, 'au-popover__panel');
    this.overlay.sync(panel, trigger, this.placement());

    if (!panel.contains(this.document.activeElement)) {
      this.savedTrigger = trigger;
      focusInitialInDialogPanel(panel);
    }
  });

  private readonly preventPageScrollWhileOpen = afterRenderEffect((onCleanup) => {
    if (!this.open()) {
      return;
    }

    onCleanup(
      installPageScrollPrevention(this.document, (target) => {
        if (!(target instanceof Node)) {
          return false;
        }
        const panel = this.panelRef()?.nativeElement;
        const host = this.host.nativeElement;
        return host.contains(target) || !!panel?.contains(target);
      }),
    );
  });

  private readonly dismissOnScroll = afterRenderEffect((onCleanup) => {
    if (!this.open()) {
      return;
    }

    const onScroll = (event: Event): void => {
      const panel = this.panelRef()?.nativeElement;
      const target = event.target;
      if (panel && target instanceof Node && panel.contains(target)) {
        return;
      }
      this.close();
    };

    this.document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    onCleanup(() => {
      this.document.removeEventListener('scroll', onScroll, { capture: true });
    });
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
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.open()) {
      return;
    }
    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }
    const host = this.host.nativeElement;
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

  protected onPanelKeydown(event: KeyboardEvent): void {
    if (!this.open()) {
      return;
    }
    const panel = this.panelRef()?.nativeElement;
    if (!panel) {
      return;
    }
    handleDialogTabKeydown(event, panel);
  }
}

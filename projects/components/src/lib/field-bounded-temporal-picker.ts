import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  Renderer2,
  afterRenderEffect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';

import { injectHostRef } from './au-host-element';
import { TooltipOverlay } from './overlay/tooltip-overlay';
import type { TemporalPickerOption } from './field-temporal-options';

/** Internal scroll list picker — out-of-range values visible but disabled. */
@Component({
  selector: 'au-internal-temporal-picker-panel',
  template: `
    @if (open()) {
      <div
        #panel
        class="au-field-bounded-picker au-floating-panel"
        role="listbox"
        [attr.aria-label]="ariaLabel()"
        (keydown)="onPanelKeydown($event)"
      >
        @for (option of options(); track option.value) {
          <button
            type="button"
            class="au-field-bounded-picker__option"
            role="option"
            [disabled]="option.disabled"
            [class.au-field-bounded-picker__option--selected]="selected() === option.value"
            [attr.aria-selected]="selected() === option.value"
            [attr.aria-disabled]="option.disabled ? 'true' : null"
            (click)="onPick(option)"
          >
            {{ option.label }}
          </button>
        }
      </div>
    }
  `,
  styleUrl: './field-bounded-temporal-picker.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-internal-temporal-picker-panel',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
})
export class AuInternalTemporalPickerPanel {
  readonly open = input(false);
  readonly options = input<readonly TemporalPickerOption[]>([]);
  readonly selected = input<string | null>(null);
  readonly anchor = input<HTMLElement | null>(null);
  readonly ariaLabel = input('Choose a value');

  readonly pick = output<string>();
  readonly dismiss = output<void>();

  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectHostRef<HTMLElement>();

  private readonly overlay = new TooltipOverlay(
    this.document,
    this.renderer,
    this.platformId,
    this.destroyRef,
  );

  protected readonly panelRef = viewChild<ElementRef<HTMLElement>>('panel');

  private readonly syncPanelOverlay = afterRenderEffect(() => {
    const panel = this.panelRef()?.nativeElement;
    const anchor = this.anchor();
    if (!this.open() || !panel || !anchor) {
      this.overlay.detach();
      return;
    }
    this.renderer.addClass(panel, 'au-floating-panel');
    this.overlay.sync(panel, anchor, 'bottom');
  });

  onPick(option: TemporalPickerOption): void {
    if (option.disabled) {
      return;
    }
    this.pick.emit(option.value);
    this.dismiss.emit();
  }

  onPanelKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.dismiss.emit();
    }
  }

  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.open() || event.key !== 'Escape') {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.dismiss.emit();
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.open() || !isPlatformBrowser(this.platformId)) {
      return;
    }
    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }
    const panel = this.panelRef()?.nativeElement;
    const anchor = this.anchor();
    const hostEl = this.host.nativeElement;
    if (panel?.contains(target) || anchor?.contains(target) || hostEl.contains(target)) {
      return;
    }
    this.dismiss.emit();
  }
}

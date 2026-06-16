import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  Renderer2,
  afterRenderEffect,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { injectHostRef } from './au-host-element';
import { handleDialogTabKeydown } from './dialog/dialog-focus-trap';
import {
  createFloatingPanelAllowPredicate,
  createFloatingPanelScrollAllowPredicate,
  installOutsideInteractionBlock,
} from './overlay/floating-panel-interaction-guard';
import { installPageScrollPrevention } from './overlay/prevent-page-scroll';
import { TooltipOverlay } from './overlay/tooltip-overlay';
import {
  HOURS,
  MINUTES,
  formatTime,
  hourAriaLabel,
  isHourDisabled,
  isMinuteDisabled,
  isWithinTimeBounds,
  minuteAriaLabel,
  pad2,
  resolvePendingTime,
  shiftInRange,
  timeAriaLabel,
} from './time-picker-model';

type TimeColumn = 'hour' | 'minute';

/** Internal dual-column time picker for `input[auInputTime]`. */
@Component({
  selector: 'au-internal-time-picker-panel',
  template: `
    @if (open()) {
      <div
        #panel
        class="au-time-picker au-floating-panel"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="ariaLabel()"
        (keydown)="onPanelKeydown($event)"
      >
        <span
          class="au-time-picker__preview"
          aria-live="polite"
        >
          {{ previewLabel() }}
        </span>

        <div class="au-time-picker__columns">
          <div
            class="au-time-picker__column"
            role="listbox"
            [attr.aria-label]="hourColumnLabel()"
          >
            <span
              class="au-time-picker__column-label"
              [id]="hourLabelId()"
            >
              {{ hourColumnLabel() }}
            </span>
            @for (hour of hours; track hour) {
              <button
                type="button"
                class="au-time-picker__option"
                role="option"
                [disabled]="isHourOptionDisabled(hour)"
                [class.au-time-picker__option--selected]="pendingHour() === hour"
                [attr.aria-selected]="pendingHour() === hour"
                [attr.aria-label]="hourOptionLabel(hour)"
                [attr.data-value]="hour"
                [attr.tabindex]="activeColumn() === 'hour' && focusedHour() === hour ? 0 : -1"
                (click)="onPickHour(hour)"
              >
                {{ pad2(hour) }}
              </button>
            }
          </div>

          <div
            class="au-time-picker__column"
            role="listbox"
            [attr.aria-label]="minuteColumnLabel()"
          >
            <span
              class="au-time-picker__column-label"
              [id]="minuteLabelId()"
            >
              {{ minuteColumnLabel() }}
            </span>
            @for (minute of minutes; track minute) {
              <button
                type="button"
                class="au-time-picker__option"
                role="option"
                [disabled]="isMinuteOptionDisabled(minute)"
                [class.au-time-picker__option--selected]="pendingMinute() === minute"
                [attr.aria-selected]="pendingMinute() === minute"
                [attr.aria-label]="minuteOptionLabel(minute)"
                [attr.data-value]="minute"
                [attr.tabindex]="activeColumn() === 'minute' && focusedMinute() === minute ? 0 : -1"
                (click)="onPickMinute(minute)"
              >
                {{ pad2(minute) }}
              </button>
            }
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './field-time-picker-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-internal-time-picker-panel',
    '[id]': 'panelId() || null',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
})
export class AuInternalTimePickerPanel {
  private static nextLabelId = 0;

  readonly open = input(false);
  readonly panelId = input('');
  readonly selected = input<string | null>(null);
  readonly minTime = input<string | undefined>(undefined);
  readonly maxTime = input<string | undefined>(undefined);
  readonly anchor = input<HTMLElement | null>(null);
  readonly ariaLabel = input('Choose a time');
  readonly locale = input<string | undefined>(undefined);

  readonly pick = output<string>();
  readonly dismiss = output<void>();

  protected readonly hours = HOURS;
  protected readonly minutes = MINUTES;
  protected readonly pad2 = pad2;

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
  protected readonly hourLabelId = signal(
    `au-time-picker-hour-${++AuInternalTimePickerPanel.nextLabelId}`,
  );
  protected readonly minuteLabelId = signal(
    `au-time-picker-minute-${++AuInternalTimePickerPanel.nextLabelId}`,
  );

  protected readonly pendingHour = signal(0);
  protected readonly pendingMinute = signal(0);
  protected readonly focusedHour = signal(0);
  protected readonly focusedMinute = signal(0);
  protected readonly activeColumn = signal<TimeColumn>('hour');

  protected readonly previewLabel = computed(() =>
    timeAriaLabel(this.pendingHour(), this.pendingMinute(), this.locale()),
  );
  protected readonly hourColumnLabel = computed(() => 'Hours');
  protected readonly minuteColumnLabel = computed(() => 'Minutes');

  protected readonly enabledHours = computed(() =>
    HOURS.filter((hour) => !isHourDisabled(hour, this.minTime(), this.maxTime())),
  );

  protected readonly enabledMinutes = computed(() =>
    MINUTES.filter(
      (minute) => !isMinuteDisabled(this.pendingHour(), minute, this.minTime(), this.maxTime()),
    ),
  );

  private isInteractionAllowed(target: EventTarget | null): boolean {
    return createFloatingPanelAllowPredicate(
      this.host.nativeElement,
      () => this.panelRef()?.nativeElement,
      () => this.anchor(),
    )(target);
  }

  private isScrollAllowed(target: EventTarget | null, event?: WheelEvent | TouchEvent): boolean {
    return createFloatingPanelScrollAllowPredicate(
      this.host.nativeElement,
      () => this.panelRef()?.nativeElement,
      () => this.anchor(),
      '.au-time-picker__column',
    )(target, event);
  }

  private readonly preventPageScrollWhileOpen = afterRenderEffect((onCleanup) => {
    if (!this.open()) {
      return;
    }

    onCleanup(
      installPageScrollPrevention(this.document, (target, event) =>
        this.isScrollAllowed(target, event),
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
        (target) => this.isInteractionAllowed(target),
        () => this.dismiss.emit(),
      ),
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
      this.dismiss.emit();
    };

    this.document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    onCleanup(() => {
      this.document.removeEventListener('scroll', onScroll, { capture: true });
    });
  });

  private readonly syncPanelOverlay = afterRenderEffect(() => {
    const panel = this.panelRef()?.nativeElement;
    const anchor = this.anchor();
    if (!this.open() || !panel || !anchor) {
      this.overlay.detach();
      return;
    }
    this.renderer.addClass(panel, 'au-floating-panel');
    this.overlay.sync(panel, anchor, 'bottom');
    this.syncPendingFromSelection();
    queueMicrotask(() => this.focusActiveOption());
  });

  protected isHourOptionDisabled(hour: number): boolean {
    return isHourDisabled(hour, this.minTime(), this.maxTime());
  }

  protected isMinuteOptionDisabled(minute: number): boolean {
    return isMinuteDisabled(this.pendingHour(), minute, this.minTime(), this.maxTime());
  }

  protected hourOptionLabel(hour: number): string {
    return hourAriaLabel(hour, this.locale());
  }

  protected minuteOptionLabel(minute: number): string {
    return minuteAriaLabel(minute, this.locale());
  }

  onPickHour(hour: number): void {
    if (this.isHourOptionDisabled(hour)) {
      return;
    }
    this.pendingHour.set(hour);
    this.focusedHour.set(hour);
    this.activeColumn.set('minute');
    const minute = this.firstEnabledMinute(hour);
    this.pendingMinute.set(minute);
    this.focusedMinute.set(minute);
    queueMicrotask(() => this.focusActiveOption());
  }

  onPickMinute(minute: number): void {
    if (this.isMinuteOptionDisabled(minute)) {
      return;
    }
    this.pendingMinute.set(minute);
    this.emitPick(formatTime(this.pendingHour(), minute));
  }

  onPanelKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.dismiss.emit();
      return;
    }

    const panel = this.panelRef()?.nativeElement;
    if (panel && event.key === 'Tab') {
      handleDialogTabKeydown(event, panel);
      return;
    }

    if (event.key === 'PageUp' || event.key === 'PageDown') {
      event.preventDefault();
      this.activeColumn.set(event.key === 'PageUp' ? 'hour' : 'minute');
      queueMicrotask(() => this.focusActiveOption());
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.activeColumn.set(event.key === 'ArrowLeft' ? 'hour' : 'minute');
      queueMicrotask(() => this.focusActiveOption());
      return;
    }

    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'Home' ||
      event.key === 'End'
    ) {
      event.preventDefault();
      if (this.activeColumn() === 'hour') {
        const next = shiftInRange(this.enabledHours(), this.focusedHour(), event.key);
        if (next == null || next === this.focusedHour()) {
          return;
        }
        this.focusedHour.set(next);
        this.pendingHour.set(next);
        const minute = this.firstEnabledMinute(next);
        this.pendingMinute.set(minute);
        this.focusedMinute.set(minute);
      } else {
        const next = shiftInRange(this.enabledMinutes(), this.focusedMinute(), event.key);
        if (next == null || next === this.focusedMinute()) {
          return;
        }
        this.focusedMinute.set(next);
        this.pendingMinute.set(next);
      }
      queueMicrotask(() => this.focusActiveOption());
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (this.activeColumn() === 'hour') {
        this.activeColumn.set('minute');
        queueMicrotask(() => this.focusActiveOption());
        return;
      }
      this.emitPick(formatTime(this.pendingHour(), this.pendingMinute()));
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

  private syncPendingFromSelection(): void {
    const { hour, minute } = resolvePendingTime(this.selected(), this.minTime(), this.maxTime());
    this.pendingHour.set(hour);
    this.pendingMinute.set(minute);
    this.focusedHour.set(hour);
    this.focusedMinute.set(minute);
    this.activeColumn.set('hour');
  }

  private firstEnabledMinute(hour: number): number {
    for (const minute of MINUTES) {
      if (!isMinuteDisabled(hour, minute, this.minTime(), this.maxTime())) {
        return minute;
      }
    }
    return 0;
  }

  private emitPick(value: string): void {
    if (!isWithinTimeBounds(value, this.minTime(), this.maxTime())) {
      return;
    }
    this.pick.emit(value);
    this.dismiss.emit();
  }

  private focusActiveOption(): void {
    const panel = this.panelRef()?.nativeElement;
    if (!panel) {
      return;
    }
    const column = this.activeColumn();
    const value = column === 'hour' ? this.focusedHour() : this.focusedMinute();
    const selector =
      column === 'hour'
        ? `.au-time-picker__column:first-of-type .au-time-picker__option[data-value="${value}"]`
        : `.au-time-picker__column:last-of-type .au-time-picker__option[data-value="${value}"]`;
    const button = panel.querySelector<HTMLButtonElement>(selector);
    button?.focus();
    button?.scrollIntoView?.({ block: 'nearest' });
  }
}

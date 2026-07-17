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
  untracked,
  viewChild,
} from '@angular/core';

import { injectHostRef } from './au-host-element';
import {
  addMonths,
  buildMonthGrid,
  dayAriaLabel,
  formatIsoDate,
  isDateDisabled,
  monthTitle,
  parseIsoDate,
  resolveViewMonth,
  shiftFocusedDay,
  weekdayLabels,
} from './date-calendar-model';
import { AuIcon } from './icon/icon';
import {
  createFloatingPanelAllowPredicate,
  installOutsideInteractionBlock,
} from './overlay/floating-panel-interaction-guard';
import { handleDialogTabKeydown } from './dialog/dialog-focus-trap';
import { installPageScrollPrevention } from './overlay/prevent-page-scroll';
import { FloatingPickerOverlay } from './overlay/floating-picker-overlay';

/** Internal month-grid calendar for `input[auInputDate]`. */
@Component({
  selector: 'au-internal-date-calendar-panel',
  imports: [AuIcon],
  template: `
    @if (open()) {
      <div
        #panel
        class="au-date-calendar au-floating-panel"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="ariaLabel()"
        (keydown)="onPanelKeydown($event)"
      >
        <div class="au-date-calendar__header">
          <button
            type="button"
            class="au-date-calendar__nav"
            [attr.aria-label]="previousMonthLabel()"
            [disabled]="!canGoPrevious()"
            (click)="goPreviousMonth()"
          >
            <au-icon name="chevron-left" />
          </button>
          <h2
            class="au-date-calendar__title"
            [id]="titleId()"
          >
            {{ monthHeading() }}
          </h2>
          <button
            type="button"
            class="au-date-calendar__nav"
            [attr.aria-label]="nextMonthLabel()"
            [disabled]="!canGoNext()"
            (click)="goNextMonth()"
          >
            <au-icon name="chevron-right" />
          </button>
        </div>

        <div
          class="au-date-calendar__weekdays"
          aria-hidden="true"
        >
          @for (label of weekdays(); track $index) {
            <span class="au-date-calendar__weekday">{{ label }}</span>
          }
        </div>

        <div
          role="grid"
          [attr.aria-labelledby]="titleId()"
        >
          @for (week of weeks(); track $index) {
            <div
              class="au-date-calendar__week"
              role="row"
            >
              @for (day of week.days; track day.iso) {
                <button
                  type="button"
                  class="au-date-calendar__day"
                  role="gridcell"
                  [disabled]="day.disabled"
                  [class.au-date-calendar__day--outside]="!day.inCurrentMonth"
                  [class.au-date-calendar__day--today]="day.isToday"
                  [class.au-date-calendar__day--selected]="day.isSelected"
                  [attr.aria-selected]="day.isSelected"
                  [attr.aria-current]="day.isToday ? 'date' : null"
                  [attr.aria-label]="dayLabel(day.iso)"
                  [attr.tabindex]="day.iso === focusedIso() ? 0 : -1"
                  [attr.data-iso]="day.iso"
                  (click)="onPickDay(day.iso, day.disabled)"
                >
                  {{ day.day }}
                </button>
              }
            </div>
          }
        </div>
      </div>
    }
  `,
  styleUrl: './field-date-calendar-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-internal-date-calendar-panel',
    '[id]': 'panelId() || null',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
})
export class AuInternalDateCalendarPanel {
  private static nextTitleId = 0;

  readonly open = input(false);
  readonly panelId = input('');
  readonly selected = input<string | null>(null);
  readonly minDate = input<string | undefined>(undefined);
  readonly maxDate = input<string | undefined>(undefined);
  readonly anchor = input<HTMLElement | null>(null);
  /** Field row treated as inside the control for outside-click and scroll guards. */
  readonly controlRoot = input<HTMLElement | null>(null);
  readonly ariaLabel = input('Choose a date');
  readonly locale = input<string | undefined>(undefined);

  readonly pick = output<string>();
  readonly dismiss = output<void>();

  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectHostRef<HTMLElement>();

  private readonly overlay = new FloatingPickerOverlay(
    this.document,
    this.renderer,
    this.platformId,
    this.destroyRef,
  );

  protected readonly panelRef = viewChild<ElementRef<HTMLElement>>('panel');
  protected readonly titleId = signal(
    `au-date-calendar-title-${++AuInternalDateCalendarPanel.nextTitleId}`,
  );

  protected readonly viewYear = signal(new Date().getFullYear());
  protected readonly viewMonth = signal(new Date().getMonth());
  protected readonly focusedIso = signal(formatIsoDate(new Date()));

  protected readonly weekdays = computed(() => weekdayLabels(this.locale()));
  protected readonly monthHeading = computed(() =>
    monthTitle(this.viewYear(), this.viewMonth(), this.locale()),
  );
  protected readonly weeks = computed(() =>
    buildMonthGrid(
      this.viewYear(),
      this.viewMonth(),
      this.selected(),
      this.minDate(),
      this.maxDate(),
    ),
  );

  protected readonly canGoPrevious = computed(() => {
    const min = this.minDate();
    if (!min) {
      return true;
    }
    const { year, month } = addMonths(this.viewYear(), this.viewMonth(), -1);
    const lastOfPrev = new Date(year, month + 1, 0);
    return formatIsoDate(lastOfPrev) >= min;
  });

  protected readonly canGoNext = computed(() => {
    const max = this.maxDate();
    if (!max) {
      return true;
    }
    const { year, month } = addMonths(this.viewYear(), this.viewMonth(), 1);
    return formatIsoDate(new Date(year, month, 1)) <= max;
  });

  protected readonly previousMonthLabel = computed(() => 'Previous month');
  protected readonly nextMonthLabel = computed(() => 'Next month');

  protected dayLabel(iso: string): string {
    return dayAriaLabel(iso, this.locale());
  }

  private interactionRoot(): HTMLElement | null {
    return this.controlRoot() ?? this.anchor();
  }

  private isInteractionAllowed(target: EventTarget | null): boolean {
    return createFloatingPanelAllowPredicate(
      this.host.nativeElement,
      () => this.panelRef()?.nativeElement,
      () => this.interactionRoot(),
    )(target);
  }

  private readonly preventPageScrollWhileOpen = afterRenderEffect((onCleanup) => {
    if (!this.open()) {
      return;
    }

    onCleanup(
      installPageScrollPrevention(this.document, (target) => this.isInteractionAllowed(target)),
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
  });

  private readonly syncViewWhenOpened = afterRenderEffect(() => {
    if (!this.open()) {
      return;
    }
    this.selected();
    this.minDate();
    this.maxDate();
    this.syncViewFromSelection();
    queueMicrotask(() => this.focusActiveDay());
  });

  goPreviousMonth(): void {
    if (!this.canGoPrevious()) {
      return;
    }
    const next = addMonths(this.viewYear(), this.viewMonth(), -1);
    this.viewYear.set(next.year);
    this.viewMonth.set(next.month);
  }

  goNextMonth(): void {
    if (!this.canGoNext()) {
      return;
    }
    const next = addMonths(this.viewYear(), this.viewMonth(), 1);
    this.viewYear.set(next.year);
    this.viewMonth.set(next.month);
  }

  onPickDay(iso: string, disabled: boolean): void {
    if (disabled) {
      return;
    }
    this.pick.emit(iso);
    this.dismiss.emit();
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

    if (event.key === 'PageUp') {
      event.preventDefault();
      this.goPreviousMonth();
      return;
    }

    if (event.key === 'PageDown') {
      event.preventDefault();
      this.goNextMonth();
      return;
    }

    const focused = this.focusedIso();
    if (
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'Home' ||
      event.key === 'End'
    ) {
      event.preventDefault();
      const next = shiftFocusedDay(focused, event.key, this.minDate(), this.maxDate())!;
      if (next === focused) {
        return;
      }
      this.focusedIso.set(next);
      const date = parseIsoDate(next);
      this.viewYear.set(date.getFullYear());
      this.viewMonth.set(date.getMonth());
      queueMicrotask(() => this.focusActiveDay());
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!isDateDisabled(focused, this.minDate(), this.maxDate())) {
        this.onPickDay(focused, false);
      }
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
    const root = this.interactionRoot();
    const hostEl = this.host.nativeElement;
    if (panel?.contains(target) || root?.contains(target) || hostEl.contains(target)) {
      return;
    }
    this.dismiss.emit();
  }

  private syncViewFromSelection(): void {
    const { year, month } = resolveViewMonth(
      this.selected(),
      new Date(),
      this.minDate(),
      this.maxDate(),
    );
    this.viewYear.set(year);
    this.viewMonth.set(month);
    const selected = this.selected();
    if (selected && !isDateDisabled(selected, this.minDate(), this.maxDate())) {
      this.focusedIso.set(selected);
      return;
    }
    this.focusedIso.set(untracked(() => this.firstEnabledIso()));
  }

  private firstEnabledIso(): string {
    for (const week of this.weeks()) {
      for (const day of week.days) {
        if (!day.disabled) {
          return day.iso;
        }
      }
    }
    return formatIsoDate(new Date());
  }

  private focusActiveDay(): void {
    const panel = this.panelRef()?.nativeElement;
    if (!panel) {
      return;
    }
    const button = panel.querySelector<HTMLButtonElement>(
      `.au-date-calendar__day[data-iso="${this.focusedIso()}"]`,
    );
    button?.focus();
  }
}

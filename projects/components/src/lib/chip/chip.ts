import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { tabFocusState } from '../au-tab-focus-state';

export type AuChipVariant = 'filled' | 'outline' | 'accent';
export type AuChipSize = 'sm' | 'md';

/**
 * Aurea design system **chip**: compact label for filters, tags, or selections.
 *
 * @remarks
 * - **Static:** display-only tag (`label` or projected content).
 * - **Selectable:** toggle filter chip (`selectable` + `[(selected)]`, `aria-pressed`).
 * - **Removable:** dismissible tag with a dedicated remove control (`removable`, `removed` event).
 * - **Focus:** outer ring on Tab, inset on pointer (`tabFocusState` + `--from-tab` CSS).
 * - **Groups:** wrap chips in `role="list"` and set `inList` on each static/removable chip for `role="listitem"`.
 *
 * @example
 * ```html
 * <au-chip label="Angular" />
 * <au-chip label="TypeScript" removable (removed)="onRemove()" />
 * <au-chip label="Draft" selectable [(selected)]="draftOnly" />
 * ```
 */
@Component({
  selector: 'au-chip',
  templateUrl: './chip.html',
  styleUrl: './chip.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-chip',
    '[attr.data-au-variant]': 'variant()',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-selected]': 'selectable() && selected() ? "" : null',
    '[attr.role]': 'hostRole()',
  },
})
export class AuChip {
  /** Visible text when not using projected content. */
  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  /** Visual style: filled (default surface), outline (border), accent (selected/tinted). */
  readonly variant = input<AuChipVariant>('filled');

  /** Density: sm (compact), md (default). */
  readonly size = input<AuChipSize>('md');

  readonly disabled = input(false);

  /** Shows a remove button and emits `removed` (not combinable with `selectable`). */
  readonly removable = input(false);

  /** Toggle filter chip; uses `aria-pressed` on the inner control. */
  readonly selectable = input(false);

  /**
   * When true with a static/removable chip, sets `role="listitem"` on the host.
   * The parent wrapper must use `role="list"`.
   */
  readonly inList = input(false);

  /** Selected state when `selectable` is true. */
  readonly selected = model(false);

  /** Overrides the default remove button accessible name (`Remove {label}`). */
  readonly removeLabel = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  /** Emits when the remove control is activated. */
  readonly removed = output<void>();

  /** Emits when `selected` changes (selectable chips only). */
  readonly selectedChange = output<boolean>();

  /** Emits on primary chip activation (selectable toggle). */
  readonly click = output<MouseEvent>();

  protected readonly focusByTab = signal(false);

  private readonly host = inject(ElementRef<HTMLElement>);

  readonly hostRole = computed((): string | null => {
    if (this.selectable() || !this.inList()) {
      return null;
    }
    return 'listitem';
  });

  readonly removeAriaLabel = computed(() => {
    const custom = this.removeLabel().trim();
    if (custom.length > 0) {
      return custom;
    }
    const text = this.resolvedLabel().trim();
    return text.length > 0 ? `Remove ${text}` : 'Remove';
  });

  readonly resolvedLabel = computed(() => this.label().trim());

  protected onFocusin(): void {
    tabFocusState.attach();
    this.focusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  protected onFocusout(): void {
    this.focusByTab.set(false);
  }

  protected onChipClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    const next = !this.selected();
    this.selected.set(next);
    this.selectedChange.emit(next);
    this.click.emit(event);
  }

  protected onRemoveClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled()) {
      return;
    }
    this.removed.emit();
  }

  protected onRemoveKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled()) {
      return;
    }
    this.removed.emit();
  }

  /** Moves focus to the chip control (selectable) or remove button (removable). */
  focus(): void {
    const root = this.host.nativeElement;
    const surface = root.querySelector('.au-chip__surface');
    if (surface instanceof HTMLButtonElement) {
      surface.focus();
      return;
    }
    (root.querySelector('.au-chip__remove') as HTMLButtonElement | null)?.focus();
  }
}

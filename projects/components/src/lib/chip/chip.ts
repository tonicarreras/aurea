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
import { AuIcon } from '../icon/icon';
import { AuListItem } from '../list/au-list-item.directive';
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
 * - **Groups:** static/removable → {@link AuList}; selectable filters → {@link AuChipGroup}.
 * - **`selectable` and `removable` are mutually exclusive** (if both are set, both are ignored).
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
  imports: [AuIcon],
  templateUrl: './chip.html',
  styleUrl: './chip.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: AuListItem,
      inputs: ['auListItemDisabled: selectable'],
    },
  ],
  host: {
    class: 'au-chip',
    '[attr.data-au-variant]': 'variant()',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-selected]': 'isSelectable() && selected() ? "" : null',
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

  /** Shows a remove button and emits `removed` (mutually exclusive with `selectable`). */
  readonly removable = input(false);

  /** Toggle filter chip; uses `aria-pressed` (mutually exclusive with `removable`). */
  readonly selectable = input(false);

  /** True only when `selectable` and not `removable`. */
  readonly isSelectable = computed(() => this.selectable() && !this.removable());

  /** True only when `removable` and not `selectable`. */
  readonly isRemovable = computed(() => this.removable() && !this.selectable());

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
    const root = this.host.nativeElement as HTMLElement;
    const surface = root.querySelector('.au-chip__surface');
    if (surface instanceof HTMLButtonElement) {
      surface.focus();
      return;
    }
    root.querySelector<HTMLButtonElement>('.au-chip__remove')?.focus();
  }
}

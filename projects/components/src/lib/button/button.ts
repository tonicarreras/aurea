import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type { AuSize } from '../au-size';
import { tabFocusState } from '../au-tab-focus-state';

export type AuButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type AuButtonSize = AuSize;
export type AuButtonType = 'button' | 'submit' | 'reset';

/**
 * Aurea design system Button component.
 *
 * @remarks
 * - **Signals:** all inputs use Angular signals (`input()`, `model()`).
 * - **Variants:** primary (solid), secondary (filled), outline (border-only), ghost (text-only).
 * - **Sizes:** sm (compact), md (default), lg (prominent).
 * - **Focus:** outer ring on Tab, inset ring on click (`tabFocusState` + `--from-tab` CSS).
 * - **Accessibility:** WCAG 2.2 AA — focus rings, aria-busy for loading, keyboard navigation,
 *   reduced motion support, min 44x44 touch target on lg.
 *
 * @example
 * ```html
 * <au-button (click)="save()">Save</au-button>
 * <au-button variant="outline" size="sm">Cancel</au-button>
 * <au-button loading="true" disabled="true">Processing...</au-button>
 * ```
 */
@Component({
  selector: 'au-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-button',
    '[attr.data-au-variant]': 'variant()',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuButton {
  /** Visual style: primary (solid), secondary (filled), outline (border), ghost (text-only). */
  readonly variant = input<AuButtonVariant>('primary');
  /** Density: sm (compact), md (default), lg (prominent/touch-friendly). */
  readonly size = input<AuButtonSize>('md');
  /** Disables interaction and suppresses click events; inherits native `disabled` behavior. */
  readonly disabled = input(false);
  /** Shows a spinner and suppresses clicks; communicates async processing. */
  readonly loading = input(false);
  /** Native HTML type: 'button', 'submit', 'reset'. */
  readonly type = input<AuButtonType>('button');
  /** Native `name` attribute for form submission. */
  readonly name = input<string>('');
  /** Visible label (can be overridden for icons only). */
  readonly label = input<string>('');

  /** Emits on native click when not disabled or loading. */
  readonly click = output<MouseEvent>();

  /** Focus ring modality: outer ring on Tab, inset on click. */
  protected readonly focusByTab = signal(false);

  readonly buttonEl = viewChild.required<ElementRef<HTMLButtonElement>>('buttonEl');

  /** Projected label captured once when loading hides visible text. */
  private readonly projectedLabel = signal<string | null>(null);

  private readonly syncProjectedLabel = afterRenderEffect(() => {
    if (!this.loading() || this.label().trim()) {
      this.projectedLabel.set(null);
      return;
    }
    const text = this.buttonEl()
      .nativeElement.querySelector('.au-button__content')
      ?.textContent?.trim();
    this.projectedLabel.set(text || null);
  });

  /** Accessible name: explicit `label`, projected text while loading, or native content otherwise. */
  protected readonly effectiveAriaLabel = computed((): string | null => {
    const explicit = this.label().trim();
    if (explicit) {
      return explicit;
    }
    if (this.loading()) {
      return this.projectedLabel();
    }
    return null;
  });

  protected onFocusin(): void {
    tabFocusState.attach();
    this.focusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  protected onFocusout(): void {
    this.focusByTab.set(false);
  }

  protected onClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.click.emit(event);
  }

  focus(): void {
    this.buttonEl().nativeElement.focus();
  }
}
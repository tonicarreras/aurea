import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { AuButton } from '../button/button';

/**
 * Page navigation for list and table views.
 */
@Component({
  selector: 'au-pagination',
  imports: [AuButton],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-pagination',
    role: 'navigation',
    'aria-label': 'Pagination',
  },
})
export class AuPagination {
  /** Current page (1-based). */
  readonly page = input(1);
  /** Total number of pages (≥ 1). */
  readonly pageCount = input(1);
  readonly disabled = input(false);

  readonly pageChange = output<number>();

  readonly safePageCount = computed(() => Math.max(1, this.pageCount()));
  readonly safePage = computed(() => Math.min(Math.max(1, this.page()), this.safePageCount()));
  readonly canPrev = computed(() => !this.disabled() && this.safePage() > 1);
  readonly canNext = computed(() => !this.disabled() && this.safePage() < this.safePageCount());

  readonly pageItems = computed(() => {
    const total = this.safePageCount();
    const current = this.safePage();
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const pages = new Set<number>([1, total, current, current - 1, current + 1]);
    return [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  });

  protected goTo(page: number): void {
    if (this.disabled()) {
      return;
    }
    const next = Math.min(Math.max(1, page), this.safePageCount());
    if (next !== this.safePage()) {
      this.pageChange.emit(next);
    }
  }

  protected prev(): void {
    this.goTo(this.safePage() - 1);
  }

  protected next(): void {
    this.goTo(this.safePage() + 1);
  }

  protected showEllipsisBefore(index: number, pages: number[]): boolean {
    return index > 0 && pages[index] - pages[index - 1] > 1;
  }
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type AuDescriptionListLayout = 'vertical' | 'horizontal';
export type AuDescriptionListColumns = 1 | 2 | 3;

/**
 * Semantic key–value list (`dl`). Prefer {@link AuDescriptionItem} children; native `dt` / `dd` remain supported.
 */
@Component({
  selector: 'au-description-list',
  templateUrl: './description-list.html',
  styleUrl: './description-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-description-list',
    '[attr.data-au-layout]': 'layout()',
    '[attr.data-au-columns]': 'columns()',
  },
})
export class AuDescriptionList {
  readonly layout = input<AuDescriptionListLayout>('vertical');
  readonly columns = input<AuDescriptionListColumns>(1);
}

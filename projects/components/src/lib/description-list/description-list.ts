import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChildren, input } from '@angular/core';

import { AuDescriptionItem } from './description-item';

export type AuDescriptionListLayout = 'vertical' | 'horizontal';
export type AuDescriptionListColumns = 1 | 2 | 3;

/**
 * Semantic key–value list (`dl`). Prefer {@link AuDescriptionItem} children; native `dt` / `dd` remain supported.
 */
@Component({
  selector: 'au-description-list',
  imports: [NgTemplateOutlet],
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

  /* v8 ignore start -- contentChildren token reference is not invoked at runtime */
  readonly items = contentChildren(AuDescriptionItem);
  /* v8 ignore end */
}

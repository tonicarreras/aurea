import { ChangeDetectionStrategy, Component, TemplateRef, input, viewChild } from '@angular/core';

/**
 * One term/description pair inside {@link AuDescriptionList}.
 *
 * @remarks
 * Hidden host (like `au-table-column`); the list renders `<dt>` / `<dd>` inside its `<dl>`.
 * For rich markup, project native `<dt>` / `<dd>` on `au-description-list` instead.
 *
 * @example
 * ```html
 * <au-description-list>
 *   <au-description-item term="Email">ada@example.com</au-description-item>
 * </au-description-list>
 * ```
 */
@Component({
  selector: 'au-description-item',
  templateUrl: './description-item.html',
  styleUrl: './description-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-description-item',
    hidden: '',
    '[attr.data-au-description-item]': '""',
  },
})
export class AuDescriptionItem {
  /** Term label rendered in `<dt>`. */
  readonly term = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  /** Projected description body rendered inside `<dd>`. */
  readonly detailTemplate = viewChild.required<TemplateRef<void>>('detail');
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * One term/description pair inside {@link AuDescriptionList}.
 *
 * @remarks
 * Renders native `<dt>` and `<dd>` with `display: contents` on the host so grid and column layouts apply.
 * For rich markup or custom structure, project native `<dt>` / `<dd>` on `au-description-list` instead.
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
  },
})
export class AuDescriptionItem {
  /** Term label rendered in `<dt>`. */
  readonly term = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { AuIconName, AuIconSize } from './icon-glyphs';

export type { AuIconName, AuIconSize } from './icon-glyphs';
export { AU_ICON_NAMES } from './icon-glyphs';

/**
 * Design-system **icon**: shared SVG glyphs (consistent 24×24 outline set).
 *
 * @remarks
 * Decorative by default (`aria-hidden`). Use on buttons with an accessible name on the control.
 */
@Component({
  selector: 'au-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-icon',
    '[attr.data-au-icon]': 'name()',
    '[attr.data-au-size]': 'size()',
    'aria-hidden': 'true',
  },
})
export class AuIcon {
  readonly name = input.required<AuIconName>();
  readonly size = input<AuIconSize>('md');
}

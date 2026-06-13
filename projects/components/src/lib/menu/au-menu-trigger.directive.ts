import { Directive, inject } from '@angular/core';

import { injectHostRef } from '../au-host-element';
import { AU_MENU } from './au-menu.token';

@Directive({
  selector: '[auMenuTrigger]',
  host: {
    '(click)': 'onClick($event)',
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-expanded]': 'menu.open()',
  },
})
export class AuMenuTrigger {
  protected readonly menu = inject(AU_MENU);
  private readonly host = injectHostRef<HTMLElement>();

  constructor() {
    this.menu.registerTrigger(this.host.nativeElement);
  }

  protected onClick(event: MouseEvent): void {
    event.stopPropagation();
    this.menu.toggle();
  }
}

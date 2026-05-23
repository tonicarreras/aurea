import { Directive, ElementRef, inject } from '@angular/core';

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
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    this.menu.registerTrigger(this.host.nativeElement as HTMLElement);
  }

  protected onClick(event: MouseEvent): void {
    event.stopPropagation();
    this.menu.toggle();
  }
}

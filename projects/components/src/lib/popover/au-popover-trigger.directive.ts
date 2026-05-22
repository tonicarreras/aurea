import { Directive, ElementRef, inject } from '@angular/core';

import { AU_POPOVER } from './au-popover.token';

@Directive({
  selector: '[auPopoverTrigger]',
  host: {
    '(click)': 'onClick($event)',
    '[attr.aria-expanded]': 'popover.open()',
    '[attr.aria-haspopup]': '"dialog"',
  },
})
export class AuPopoverTrigger {
  protected readonly popover = inject(AU_POPOVER);
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    this.popover.registerTrigger(this.host.nativeElement);
  }

  protected onClick(event: MouseEvent): void {
    event.stopPropagation();
    this.popover.toggle();
  }
}

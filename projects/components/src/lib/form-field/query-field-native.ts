import type { ElementRef } from '@angular/core';

/** Primary native control inside a field component host (stable class selectors). */
export function queryFieldNative<T extends HTMLElement>(
  host: ElementRef<HTMLElement>,
  selector: string,
): T {
  return host.nativeElement.querySelector<T>(selector)!;
}

import { DestroyRef, ElementRef, afterNextRender } from '@angular/core';

/** Wire a native DOM event without colliding with an `@Output` of the same name. */
export function bindHostDomEvent<T extends HTMLElement>(
  host: ElementRef<T>,
  destroyRef: DestroyRef,
  eventName: string,
  handler: (event: Event) => void,
  options?: AddEventListenerOptions,
): void {
  afterNextRender(() => {
    const el = host.nativeElement;
    const listener = (event: Event) => handler(event);
    el.addEventListener(eventName, listener, options);
    destroyRef.onDestroy(() => el.removeEventListener(eventName, listener, options));
  });
}

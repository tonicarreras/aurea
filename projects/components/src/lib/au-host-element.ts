import { ElementRef, inject } from '@angular/core';

/**
 * Typed {@link ElementRef} for directives and components that read the host DOM.
 * Prefer over `inject(ElementRef<T>)` — ESLint-safe and consistent across Aurea DS.
 */
export function injectHostRef<T extends HTMLElement>(): ElementRef<T> {
  return inject(ElementRef) as ElementRef<T>;
}

/** Native host element for the current directive or component. */
export function injectHostElement<T extends HTMLElement>(): T {
  return injectHostRef<T>().nativeElement;
}

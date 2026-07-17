import type { ElementRef } from '@angular/core';
import { describe, expect, it } from 'vitest';

import { sortRegistryByDomOrder } from './projection-bridge';

type Entry = { element: ElementRef<HTMLElement> };

function entry(element: HTMLElement): Entry {
  return { element: { nativeElement: element } as ElementRef<HTMLElement> };
}

describe('sortRegistryByDomOrder', () => {
  it('returns registries with fewer than two entries unchanged', () => {
    const root = document.createElement('div');
    const entries = [entry(document.createElement('button'))];

    expect(sortRegistryByDomOrder(entries, root)).toBe(entries);
  });

  it('preserves order when an entry is outside the root', () => {
    const root = document.createElement('div');
    const inside = entry(document.createElement('button'));
    root.append(inside.element.nativeElement);
    const outside = entry(document.createElement('button'));

    expect(sortRegistryByDomOrder([outside, inside], root)).toEqual([outside, inside]);
  });

  it('sorts following and preceding entries into document order', () => {
    const root = document.createElement('div');
    const first = entry(document.createElement('button'));
    const second = entry(document.createElement('button'));
    root.append(first.element.nativeElement, second.element.nativeElement);

    expect(sortRegistryByDomOrder([first, second], root)).toEqual([first, second]);
    expect(sortRegistryByDomOrder([second, first], root)).toEqual([first, second]);
  });

  it('preserves order when entries refer to the same node', () => {
    const root = document.createElement('div');
    const button = document.createElement('button');
    root.append(button);
    const first = entry(button);
    const second = entry(button);

    expect(sortRegistryByDomOrder([first, second], root)).toEqual([first, second]);
  });
});

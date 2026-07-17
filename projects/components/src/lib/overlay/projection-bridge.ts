import type { ElementRef } from '@angular/core';

/** Sort projected registry entries by document order inside `root`. */
export function sortRegistryByDomOrder<T extends { element: ElementRef<HTMLElement> }>(
  entries: readonly T[],
  root: HTMLElement,
): readonly T[] {
  if (entries.length < 2) {
    return entries;
  }
  return [...entries].sort((a, b) => {
    const aNode = a.element.nativeElement;
    const bNode = b.element.nativeElement;
    if (!root.contains(aNode) || !root.contains(bNode)) {
      return 0;
    }
    const relation = aNode.compareDocumentPosition(bNode);
    if (relation & Node.DOCUMENT_POSITION_FOLLOWING) {
      return -1;
    }
    if (relation & Node.DOCUMENT_POSITION_PRECEDING) {
      return 1;
    }
    return 0;
  });
}

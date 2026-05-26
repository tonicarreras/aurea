import type { DestroyRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

/** Registers document click/keydown via Renderer2; torn down on destroy. */
export function bindDocumentDismiss(
  document: Document,
  renderer: Renderer2,
  destroyRef: DestroyRef,
  handlers: {
    onClick: (event: MouseEvent) => void;
    onKeydown: (event: KeyboardEvent) => void;
  },
): void {
  const unlistenClick = renderer.listen(document, 'click', handlers.onClick);
  const unlistenKeydown = renderer.listen(document, 'keydown', handlers.onKeydown);
  destroyRef.onDestroy(() => {
    unlistenClick();
    unlistenKeydown();
  });
}

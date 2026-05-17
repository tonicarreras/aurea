/**
 * Focus modality for “outer” rings on Tab only: `pointerdown` clears the next `focusin` as keyboard
 * navigation. Used by control rows (input, textarea, …).
 */
export const tabFocusState = (() => {
  let nextFocusIsFromTab = false;
  let documentListeners = false;
  return {
    attach() {
      if (documentListeners || typeof document === 'undefined') {
        return;
      }
      documentListeners = true;
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          nextFocusIsFromTab = true;
        }
      });
      document.addEventListener('pointerdown', () => {
        nextFocusIsFromTab = false;
      });
    },
    takeNextFocusIsFromTab(): boolean {
      const v = nextFocusIsFromTab;
      nextFocusIsFromTab = false;
      return v;
    },
  };
})();

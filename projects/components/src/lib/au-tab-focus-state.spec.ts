import { tabFocusState } from './au-tab-focus-state';

describe('tabFocusState', () => {
  it('attach registers listeners once', () => {
    tabFocusState.attach();
    tabFocusState.attach();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    expect(tabFocusState.takeNextFocusIsFromTab()).toBe(true);
    expect(tabFocusState.takeNextFocusIsFromTab()).toBe(false);
  });

  it('pointerdown clears tab modality before next focus', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    expect(tabFocusState.takeNextFocusIsFromTab()).toBe(false);
  });

  it('non-Tab keydown does not arm tab modality', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(tabFocusState.takeNextFocusIsFromTab()).toBe(false);
  });
});

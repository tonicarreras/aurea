import {
  focusInitialInDialogPanel,
  getDialogFocusableElements,
  handleDialogTabKeydown,
} from './dialog-focus-trap';

describe('dialog-focus-trap', () => {
  function panelWith(...html: string[]): HTMLElement {
    const panel = document.createElement('div');
    panel.className = 'au-dialog__panel';
    panel.innerHTML = html.join('');
    document.body.append(panel);
    return panel;
  }

  afterEach(() => {
    document.body.replaceChildren();
  });

  it('lists focusable elements in order', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<input id="b" />',
      '<button type="button" disabled id="c">C</button>',
    );
    const ids = getDialogFocusableElements(panel).map((el) => el.id);
    expect(ids).toEqual(['a', 'b']);
  });

  it('excludes hidden and aria-hidden elements', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<button type="button" hidden id="h">H</button>',
      '<button type="button" aria-hidden="true" id="ah">AH</button>',
    );
    expect(getDialogFocusableElements(panel).map((el) => el.id)).toEqual(['a']);
  });

  it('does not trap Tab from a middle focusable', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<button type="button" id="b">B</button>',
      '<button type="button" id="c">C</button>',
    );
    const b = panel.querySelector('#b') as HTMLButtonElement;
    b.focus();
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    handleDialogTabKeydown(ev, panel);
    expect(ev.defaultPrevented).toBe(false);
  });

  it('does not trap Shift+Tab from a middle focusable', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<button type="button" id="b">B</button>',
      '<button type="button" id="c">C</button>',
    );
    const b = panel.querySelector('#b') as HTMLButtonElement;
    b.focus();
    const ev = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    handleDialogTabKeydown(ev, panel);
    expect(ev.defaultPrevented).toBe(false);
  });

  it('wraps Tab from last to first', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<button type="button" id="b">B</button>',
    );
    const a = panel.querySelector('#a') as HTMLButtonElement;
    const b = panel.querySelector('#b') as HTMLButtonElement;
    b.focus();
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    handleDialogTabKeydown(ev, panel);
    expect(ev.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(a);
  });

  it('wraps Shift+Tab from first to last', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<button type="button" id="b">B</button>',
    );
    const a = panel.querySelector('#a') as HTMLButtonElement;
    const b = panel.querySelector('#b') as HTMLButtonElement;
    a.focus();
    const ev = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    handleDialogTabKeydown(ev, panel);
    expect(ev.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(b);
  });

  it('wraps Shift+Tab from outside to last focusable', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<button type="button" id="b">B</button>',
    );
    const b = panel.querySelector('#b') as HTMLButtonElement;
    const outside = document.createElement('button');
    outside.type = 'button';
    document.body.append(outside);
    outside.focus();
    const ev = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    handleDialogTabKeydown(ev, panel);
    expect(ev.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(b);
  });

  it('pulls focus into the panel when Tab escapes outside', () => {
    const panel = panelWith('<button type="button" id="a">A</button>');
    const outside = document.createElement('button');
    outside.type = 'button';
    document.body.append(outside);
    outside.focus();
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    handleDialogTabKeydown(ev, panel);
    expect(document.activeElement).toBe(panel.querySelector('#a'));
  });

  it('does nothing when the panel has no focusable elements', () => {
    const panel = panelWith('<p>Text only</p>');
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    handleDialogTabKeydown(ev, panel);
    expect(ev.defaultPrevented).toBe(false);
  });

  it('ignores non-Tab keys', () => {
    const panel = panelWith('<button type="button">A</button>');
    const ev = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    handleDialogTabKeydown(ev, panel);
    expect(ev.defaultPrevented).toBe(false);
  });

  it('focusInitialInDialogPanel focuses first control', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<button type="button" id="b">B</button>',
    );
    focusInitialInDialogPanel(panel);
    expect(document.activeElement?.id).toBe('a');
  });

  it('focusInitialInDialogPanel focuses panel when empty', () => {
    const panel = panelWith('<p>Text only</p>');
    focusInitialInDialogPanel(panel);
    expect(document.activeElement).toBe(panel);
    expect(panel.tabIndex).toBe(-1);
  });

  it('focusInitialInDialogPanel does not override an existing tabindex', () => {
    const panel = panelWith('<p>Text only</p>');
    panel.tabIndex = 0;
    focusInitialInDialogPanel(panel);
    expect(document.activeElement).toBe(panel);
    expect(panel.tabIndex).toBe(0);
  });
});

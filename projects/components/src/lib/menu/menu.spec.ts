import { forwardRef } from '@angular/core';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuButton } from '../button/button';
import { AuMenu, auMenuSelfRef } from './menu';
import { AuMenuItem, AuMenuTrigger } from './index';
import { resetOpenMenuForTests } from './menu-open-registry';

@Component({
  imports: [AuMenu, AuMenuTrigger, AuMenuItem, AuButton],
  template: `
    <au-menu
      [(open)]="open"
      [disabled]="disabled"
    >
      <au-button auMenuTrigger>Open</au-button>
      <au-menu-item (select)="selected = true">Action</au-menu-item>
      <au-menu-item (select)="onSecond()">Second</au-menu-item>
      <au-menu-item
        (select)="onThird()"
        [disabled]="thirdDisabled"
        >Third</au-menu-item
      >
    </au-menu>
  `,
})
class Host {
  open = false;
  disabled = false;
  selected = false;
  thirdDisabled = false;
  secondSelected = false;

  onSecond(): void {
    this.secondSelected = true;
  }

  onThird(): void {
    // no-op for coverage
  }
}

@Component({
  imports: [AuMenu, AuMenuTrigger, AuButton],
  template: `
    <au-menu [(open)]="open">
      <au-button auMenuTrigger>Open</au-button>
    </au-menu>
  `,
})
class HostNoItems {
  open = false;
}

@Component({
  imports: [AuMenu, AuMenuTrigger, AuMenuItem, AuButton],
  template: `
    <au-menu [(open)]="openA">
      <au-button auMenuTrigger>Menu A</au-button>
      <au-menu-item>Action A</au-menu-item>
    </au-menu>
    <au-menu [(open)]="openB">
      <au-button auMenuTrigger>Menu B</au-button>
      <au-menu-item>Action B</au-menu-item>
    </au-menu>
  `,
})
class TwoMenusHost {
  openA = false;
  openB = false;
}

function menuInstance(fixture: ReturnType<typeof TestBed.createComponent<Host>>): AuMenu {
  return fixture.debugElement.query(By.directive(AuMenu)).componentInstance as AuMenu;
}

describe('AuMenu provider', () => {
  it('forwardRef factory resolves to AuMenu', () => {
    expect(auMenuSelfRef()).toBe(AuMenu);
    expect(forwardRef(auMenuSelfRef)).toBeDefined();
  });
});

describe('AuMenu', () => {
  beforeEach(() => {
    resetOpenMenuForTests();
    document.body.querySelectorAll('.au-menu__panel').forEach((el) => el.remove());
  });

  it('closes the previously open menu when another opens', () => {
    const fixture = TestBed.createComponent(TwoMenusHost);
    fixture.detectChanges();
    const triggers = fixture.nativeElement.querySelectorAll('button');
    (triggers[0] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.openA).toBe(true);
    expect(fixture.componentInstance.openB).toBe(false);

    (triggers[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.openA).toBe(false);
    expect(fixture.componentInstance.openB).toBe(true);
  });

  it('emits openChange when toggled', () => {
    const fixture = TestBed.createComponent(Host);
    const emissions: boolean[] = [];
    menuInstance(fixture).openChange.subscribe((v) => emissions.push(v));
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    expect(emissions).toEqual([true]);
    trigger.click();
    fixture.detectChanges();
    expect(emissions).toEqual([true, false]);
  });

  it('detaches overlay when destroyed while open', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    expect(document.body.querySelector('.au-menu__panel')).toBeTruthy();
    fixture.destroy();
  });

  it('opens on trigger click and selects an item', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(true);
    const menu = menuInstance(fixture) as unknown as {
      panelRef: () => { nativeElement: HTMLElement } | undefined;
    };
    expect(menu.panelRef()?.nativeElement.classList.contains('au-menu__panel')).toBe(true);
    const item = document.body.querySelector('.au-menu-item__btn') as HTMLButtonElement | null;
    expect(item).toBeTruthy();
    item!.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toBe(true);
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('does not toggle when disabled', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('ignores non-Escape keys', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(true);
  });

  it('closes on Escape', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('ignores document click when closed', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('keeps open when clicking inside the portaled panel', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    const panel = document.body.querySelector('.au-menu__panel') as HTMLElement;
    expect(panel).toBeTruthy();
    panel.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(true);
  });

  it('ignores Escape when closed', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('closes on outside click', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('ignores document click when target is not a Node', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    const menu = menuInstance(fixture);
    const handler = (menu as unknown as { onDocumentClick: (e: MouseEvent) => void })
      .onDocumentClick;
    handler.call(menu, { target: null } as unknown as MouseEvent);
    expect(fixture.componentInstance.open).toBe(true);
  });

  it('no-op close when already closed', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const menu = menuInstance(fixture);
    menu.close();
    menu.close();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('keeps open when clicking inside the menu host', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    const menuHost = fixture.nativeElement.querySelector('au-menu') as HTMLElement;
    menuHost.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(true);
  });

  describe('keyboard navigation', () => {
    function getPanel(_fixture: ReturnType<typeof TestBed.createComponent<Host>>): HTMLElement {
      return document.body.querySelector('.au-menu__panel')!;
    }

    function getMenuItems(
      _fixture: ReturnType<typeof TestBed.createComponent<Host>>,
    ): HTMLButtonElement[] {
      return Array.from(
        document.body.querySelectorAll('.au-menu-item__btn'),
      ) as HTMLButtonElement[];
    }

    it('moves focus on ArrowDown', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      expect(btn[0]).toBe(document.activeElement);
      const panel = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      expect(document.activeElement).toBe(btn[1]);
    });

    it('moves focus on ArrowUp and wraps around', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      btn[1].focus();
      fixture.detectChanges();
      const panel = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      expect(document.activeElement).toBe(btn[0]);
    });

    it('wraps ArrowDown from last to first', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      btn[btn.length - 1].focus();
      fixture.detectChanges();
      const panel = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      expect(document.activeElement).toBe(btn[0]);
    });

    it('wraps ArrowUp from first to last', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      expect(document.activeElement).toBe(btn[0]);
      const panel = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      expect(document.activeElement).toBe(btn[btn.length - 1]);
    });

    it('moves to first item on Home', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      btn[1].focus();
      fixture.detectChanges();
      const panel = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
      fixture.detectChanges();
      expect(document.activeElement).toBe(btn[0]);
    });

    it('moves to last item on End', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      expect(document.activeElement).toBe(btn[0]);
      const panel = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
      fixture.detectChanges();
      expect(document.activeElement).toBe(btn[btn.length - 1]);
    });

    it('skips disabled items on arrow navigation', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.thirdDisabled = true;
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      // Only 2 enabled items (first and second, third is disabled)
      expect(document.activeElement).toBe(btn[0]);
      const panel = getPanel(fixture);
      // ArrowDown from first -> second (skip disabled third)
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      expect(document.activeElement).toBe(btn[1]);
      // ArrowDown from second -> wraps to first (skip disabled third)
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      expect(document.activeElement).toBe(btn[0]);
    });

    it('ignores non-navigation keys', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      expect(document.activeElement).toBe(btn[0]);
      const panel = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
      fixture.detectChanges();
      // Focus should remain on first item (no change)
      expect(document.activeElement).toBe(btn[0]);
    });

    it('no-ops panel keydown when closed (direct call)', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.detectChanges();
      const menu = menuInstance(fixture);
      const handler = (menu as unknown as { onPanelKeydown: (e: KeyboardEvent) => void })
        .onPanelKeydown;
      handler.call(menu, new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      // Should not throw
      expect(fixture.componentInstance.open).toBe(false);
    });

    it('no-ops panel keydown with empty item list (direct call)', () => {
      const fixture = TestBed.createComponent(HostNoItems);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const menu = fixture.debugElement.query(By.directive(AuMenu))
        .componentInstance as unknown as {
        onPanelKeydown: (e: KeyboardEvent) => void;
      };
      menu.onPanelKeydown.call(menu, new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      // Should not throw — items.length === 0 branch (line 155)
      expect(fixture.componentInstance.open).toBe(true);
    });

    it('findFocusedItemIndex returns -1 when activeElement is null', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.detectChanges();
      const menu = menuInstance(fixture) as unknown as {
        findFocusedItemIndex: (items: unknown[]) => number;
        enabledMenuItems: () => unknown[];
      };
      const items = (menu as unknown as { enabledMenuItems: () => unknown[] }).enabledMenuItems();
      // Simulate document.activeElement === null to hit the !active guard
      const origDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'activeElement');
      Object.defineProperty(document, 'activeElement', {
        configurable: true,
        get: () => null,
      });
      const idx = (
        menu as unknown as {
          findFocusedItemIndex: (items: unknown[]) => number;
        }
      ).findFocusedItemIndex(items);
      expect(idx).toBe(-1);
      // Restore
      if (origDescriptor) {
        Object.defineProperty(document, 'activeElement', origDescriptor);
      }
    });

    it('no-ops panel keydown when activeElement is null', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const origDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'activeElement');
      Object.defineProperty(document, 'activeElement', {
        configurable: true,
        get: () => null,
      });
      const panel = document.body.querySelector('.au-menu__panel') as HTMLElement;
      // ArrowDown: cur < 0 → 0 (line 162)
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      // ArrowUp: cur < 0 → items.length - 1 (line 169)
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      // Both should not throw
      expect(fixture.componentInstance.open).toBe(true);
      if (origDescriptor) {
        Object.defineProperty(document, 'activeElement', origDescriptor);
      }
    });

    it('registerMenuItem handles duplicate registration', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.detectChanges();
      const menu = menuInstance(fixture) as unknown as {
        registerMenuItem: (item: unknown) => void;
        enabledMenuItems: () => unknown[];
      };
      const items = menu.enabledMenuItems();
      expect(items.length).toBeGreaterThan(0);
      // Register the first item again — signal should dedupe
      menu.registerMenuItem(items[0]);
      expect(menu.enabledMenuItems().length).toBe(items.length);
    });

    it('closes when the page scrolls outside the panel', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      document.dispatchEvent(new Event('scroll'));
      fixture.detectChanges();
      expect(fixture.componentInstance.open).toBe(false);
    });

    it('stays open when scrolling inside the panel', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const panel = document.body.querySelector('.au-menu__panel') as HTMLElement;
      panel.dispatchEvent(new Event('scroll', { bubbles: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.open).toBe(true);
    });

    it('unregisterMenuItem removes items from keyboard navigation', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.detectChanges();
      const menu = menuInstance(fixture) as unknown as {
        unregisterMenuItem: (item: AuMenuItem) => void;
        enabledMenuItems: () => AuMenuItem[];
        activeMenuItem: () => AuMenuItem | null;
      };
      const items = menu.enabledMenuItems();
      expect(items.length).toBeGreaterThan(0);
      (menu as unknown as { focusMenuItem: (item: AuMenuItem) => void }).focusMenuItem(items[0]);
      menu.unregisterMenuItem(items[0]);
      expect(menu.enabledMenuItems()).toHaveLength(items.length - 1);
      expect(menu.activeMenuItem()).toBeNull();
    });

    it('sets roving tabindex so only the active item is tabbable', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      expect(btn[0].getAttribute('tabindex')).toBe('0');
      expect(btn[1].getAttribute('tabindex')).toBe('-1');
      expect(btn[2].getAttribute('tabindex')).toBe('-1');
      const panel = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      expect(btn[0].getAttribute('tabindex')).toBe('-1');
      expect(btn[1].getAttribute('tabindex')).toBe('0');
    });

    it('typeahead focuses the next item matching the typed character', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      expect(document.activeElement).toBe(btn[0]);
      const panel = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 's', bubbles: true }));
      fixture.detectChanges();
      expect(document.activeElement).toBe(btn[1]);
      expect(btn[1].textContent?.trim()).toBe('Second');
    });

    it('ignores typeahead for non-character keys', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      const panel = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();
      expect(document.activeElement).toBe(btn[0]);
    });

    it('no-ops typeahead when there are no enabled items (direct call)', () => {
      const fixture = TestBed.createComponent(HostNoItems);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const menu = fixture.debugElement.query(By.directive(AuMenu))
        .componentInstance as unknown as {
        handleTypeahead: (key: string) => void;
      };
      expect(() => menu.handleTypeahead.call(menu, 'a')).not.toThrow();
    });

    it('no-ops typeahead for punctuation (direct call)', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      const menu = menuInstance(fixture) as unknown as {
        handleTypeahead: (key: string) => void;
      };
      menu.handleTypeahead.call(menu, '!');
      expect(document.activeElement).toBe(btn[0]);
    });

    it('typeahead wraps to earlier items when no match after current', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      btn[1].focus();
      fixture.detectChanges();
      const panel = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
      fixture.detectChanges();
      expect(document.activeElement).toBe(btn[0]);
    });

    it('ignores typeahead when no item matches the character', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      const panel = getPanel(fixture);
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', bubbles: true }));
      fixture.detectChanges();
      expect(document.activeElement).toBe(btn[0]);
    });

    it('typeahead searches from the first item when no item is focused (direct call)', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const btn = getMenuItems(fixture);
      const menu = menuInstance(fixture) as unknown as {
        handleTypeahead: (key: string) => void;
        findFocusedItemIndex: (items: AuMenuItem[]) => number;
      };
      vi.spyOn(menu, 'findFocusedItemIndex').mockReturnValue(-1);
      menu.handleTypeahead('s');
      fixture.detectChanges();
      expect(document.activeElement).toBe(btn[1]);
    });

    it('skips undefined entries while typeahead iterates items (direct call)', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.detectChanges();
      const menu = menuInstance(fixture) as unknown as {
        handleTypeahead: (key: string) => void;
        enabledMenuItems: () => AuMenuItem[];
        findFocusedItemIndex: (items: AuMenuItem[]) => number;
      };
      const mockItem = {
        labelText: () => 'Action',
        focus: vi.fn(),
      } as unknown as AuMenuItem;
      vi.spyOn(menu, 'findFocusedItemIndex').mockReturnValue(-1);
      vi.spyOn(menu, 'enabledMenuItems').mockReturnValue([
        mockItem,
        undefined as unknown as AuMenuItem,
      ]);
      menu.handleTypeahead('s');
    });

    it('cleans up listeners when destroyed while open', () => {
      const fixture = TestBed.createComponent(Host);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      expect(() => fixture.destroy()).not.toThrow();
    });
  });
});

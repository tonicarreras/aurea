import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuTab } from './au-tab.directive';
import { AuTabPanel } from './au-tab-panel.directive';
import { AuTabs } from './tabs';

async function flushTabsSelection(): Promise<void> {
  await new Promise<void>((resolve) => queueMicrotask(() => resolve()));
}

describe('AuTabs', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuTabs],
    }).compileComponents();
  });

  it('defaults variant to line and size to md',async  () => {
    const fix = TestBed.createComponent(AuTabs);
    await fix.whenStable();
    const host = fix.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-variant')).toBe('line');
    expect(host.getAttribute('data-au-size')).toBe('md');
    expect(host.getAttribute('data-au-orientation')).toBe('horizontal');
  });

  it('applies variant and orientation attributes',async  () => {
    const fix = TestBed.createComponent(AuTabs);
    fix.componentRef.setInput('variant', 'contained');
    fix.componentRef.setInput('orientation', 'vertical');
    fix.componentRef.setInput('size', 'lg');
    await fix.whenStable();
    const host = fix.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-variant')).toBe('contained');
    expect(host.getAttribute('data-au-orientation')).toBe('vertical');
    expect(host.getAttribute('data-au-size')).toBe('lg');
  });

  it('renders tablist with aria-label', async () => {
    const fix = TestBed.createComponent(TestTabsComponent);
    await fix.whenStable();
    await fix.whenStable();
    const list = fix.debugElement.query(By.css('.au-tabs__list'))!.nativeElement;
    expect(list.getAttribute('role')).toBe('tablist');
    expect(list.getAttribute('aria-label')).toBe('Demo tabs');
    expect(list.getAttribute('aria-orientation')).toBeNull();
  });

  it('selects first tab when value is empty', async () => {
    const fix = TestBed.createComponent(TestTabsComponent);
    await fix.whenStable();
    await fix.whenStable();
    await flushTabsSelection();
    expect(fix.componentInstance.active).toBe('profile');
  });

  it('shows only the active panel', async () => {
    const fix = TestBed.createComponent(TestTabsComponent);
    await fix.whenStable();
    await fix.whenStable();
    await flushTabsSelection();
    await fix.whenStable();
    const panels = fix.nativeElement.querySelectorAll('[role="tabpanel"]');
    expect(panels.length).toBe(2);
    const visible = [...panels].filter((p: Element) => !p.hasAttribute('hidden'));
    expect(visible.length).toBe(1);
    expect(visible[0]!.textContent).toContain('Profile body');
  });

  it('switches panel on tab click',async  () => {
    const fix = TestBed.createComponent(TestTabsComponent);
    await fix.whenStable();
    const billingTab = fix.nativeElement.querySelector(
      'button[auTab="billing"]',
    ) as HTMLButtonElement;
    billingTab.click();
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('billing');
    const panel = fix.nativeElement.querySelector('[auTabPanel="billing"]') as HTMLElement;
    expect(panel.hasAttribute('hidden')).toBe(false);
  });

  it('emits valueChange when selection changes',async  () => {
    const fix = TestBed.createComponent(TestTabsComponent);
    await fix.whenStable();
    let next = '';
    fix.debugElement
      .query(By.directive(AuTabs))!
      .componentInstance.value.subscribe((v: string) => (next = v));
    const billingTab = fix.nativeElement.querySelector(
      'button[auTab="billing"]',
    ) as HTMLButtonElement;
    billingTab.click();
    expect(next).toBe('billing');
  });

  it('does not emit valueChange when selecting the same tab', async () => {
    const fix = TestBed.createComponent(TestTabsComponent);
    await fix.whenStable();
    await fix.whenStable();
    fix.componentInstance.active = 'profile';
    await fix.whenStable();
    const tabs = fix.debugElement.query(By.directive(AuTabs))!.componentInstance as AuTabs;
    let count = 0;
    tabs.value.subscribe(() => count++);
    tabs.selectTab('profile');
    expect(count).toBe(0);
  });

  it('marks selected tab with aria-selected and tabindex 0', async () => {
    const fix = TestBed.createComponent(TestTabsComponent);
    await fix.whenStable();
    await fix.whenStable();
    await flushTabsSelection();
    await fix.whenStable();
    const profile = fix.nativeElement.querySelector('button[auTab="profile"]') as HTMLButtonElement;
    const billing = fix.nativeElement.querySelector('button[auTab="billing"]') as HTMLButtonElement;
    expect(profile.getAttribute('aria-selected')).toBe('true');
    expect(profile.getAttribute('tabindex')).toBe('0');
    expect(billing.getAttribute('aria-selected')).toBe('false');
    expect(billing.getAttribute('tabindex')).toBe('-1');
  });

  it('links tab aria-controls to panel id',async  () => {
    const fix = TestBed.createComponent(TestTabsComponent);
    await fix.whenStable();
    const profile = fix.nativeElement.querySelector('button[auTab="profile"]') as HTMLButtonElement;
    const panel = fix.nativeElement.querySelector('[auTabPanel="profile"]') as HTMLElement;
    expect(profile.getAttribute('aria-controls')).toBe(panel.id);
  });

  it('moves selection on ArrowRight', async () => {
    const fix = TestBed.createComponent(TestThreeTabsComponent);
    await fix.whenStable();
    await fix.whenStable();
    const list = fix.debugElement.query(By.css('.au-tabs__list'));
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('b');
  });

  it('moves selection on ArrowLeft', async () => {
    const fix = TestBed.createComponent(TestThreeTabsComponent);
    fix.componentInstance.active = 'b';
    await fix.whenStable();
    await fix.whenStable();
    const list = fix.debugElement.query(By.css('.au-tabs__list'));
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
    );
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('a');
  });

  it('keyboard nav uses index 0 when value does not match a tab', async () => {
    const fix = TestBed.createComponent(TestTabsUnknownValueComponent);
    await fix.whenStable();
    await fix.whenStable();
    await flushTabsSelection();
    fix.componentInstance.active = 'missing';
    await fix.whenStable();
    const list = fix.debugElement.query(By.css('.au-tabs__list'));
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('b');
  });

  it('vertical keyboard uses ArrowUp when value does not match a tab', async () => {
    const fix = TestBed.createComponent(TestThreeTabsComponent);
    fix.componentInstance.orientation = 'vertical';
    await fix.whenStable();
    await fix.whenStable();
    await flushTabsSelection();
    fix.componentInstance.active = 'missing';
    await fix.whenStable();
    const list = fix.debugElement.query(By.css('.au-tabs__list'));
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }),
    );
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('c');
  });

  it('jumps to first and last tab with Home and End', async () => {
    const fix = TestBed.createComponent(TestThreeTabsComponent);
    fix.componentInstance.active = 'b';
    await fix.whenStable();
    await fix.whenStable();
    const list = fix.debugElement.query(By.css('.au-tabs__list'));
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'End', bubbles: true }),
    );
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('c');
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'Home', bubbles: true }),
    );
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('a');
  });

  it('uses ArrowDown in vertical orientation', async () => {
    const fix = TestBed.createComponent(TestThreeTabsComponent);
    fix.componentInstance.orientation = 'vertical';
    await fix.whenStable();
    await fix.whenStable();
    const list = fix.debugElement.query(By.css('.au-tabs__list'));
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
    );
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('b');
  });

  it('ignores unrelated keys on tablist', async () => {
    const fix = TestBed.createComponent(TestThreeTabsComponent);
    await fix.whenStable();
    await fix.whenStable();
    const list = fix.debugElement.query(By.css('.au-tabs__list'));
    const ev = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    list.triggerEventHandler('keydown', ev);
    expect(fix.componentInstance.active).toBe('a');
  });

  it('skips disabled tabs in keyboard navigation', async () => {
    const fix = TestBed.createComponent(TestTabsWithDisabledComponent);
    await fix.whenStable();
    await fix.whenStable();
    const list = fix.debugElement.query(By.css('.au-tabs__list'));
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('c');
  });

  it('does not select disabled tab on click', async () => {
    const fix = TestBed.createComponent(TestTabsWithDisabledComponent);
    await fix.whenStable();
    await fix.whenStable();
    const disabled = fix.nativeElement.querySelector('button[auTab="b"]') as HTMLButtonElement;
    disabled.click();
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('a');
  });

  it('uses custom id prefix for tab and panel ids', async () => {
    const fix = TestBed.createComponent(TestTabsWithIdComponent);
    await fix.whenStable();
    await fix.whenStable();
    const tab = fix.nativeElement.querySelector('button[auTab="profile"]') as HTMLButtonElement;
    expect(tab.id).toBe('settings-tab-profile');
  });

  it('onListKeydown is noop when no enabled tabs', () => {
    const fix = TestBed.createComponent(AuTabs);
    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
    fix.componentInstance.onListKeydown(ev);
    expect(ev.defaultPrevented).toBe(false);
  });

  it('tabIdFor and panelIdFor use resolved id',async  () => {
    const fix = TestBed.createComponent(AuTabs);
    fix.componentRef.setInput('id', 'x');
    await fix.whenStable();
    expect(fix.componentInstance.tabIdFor('one')).toBe('x-tab-one');
    expect(fix.componentInstance.panelIdFor('one')).toBe('x-panel-one');
  });

  it('prevents default when clicking a disabled tab', async () => {
    const fix = TestBed.createComponent(TestTabsWithDisabledComponent);
    await fix.whenStable();
    await flushTabsSelection();
    const tab = fix.debugElement.query(By.css('button[auTab="b"]'))!;
    const ev = new MouseEvent('click', { bubbles: true, cancelable: true });
    const prevent = vi.spyOn(ev, 'preventDefault');
    tab.triggerEventHandler('click', ev);
    expect(prevent).toHaveBeenCalled();
  });

  it('does not register the same tab twice', async () => {
    const fix = TestBed.createComponent(TestTabsComponent);
    await fix.whenStable();
    await flushTabsSelection();
    const tabs = fix.debugElement.query(By.directive(AuTabs))!.componentInstance as AuTabs;
    const first = fix.debugElement.query(By.directive(AuTab))!.injector.get(AuTab);
    tabs.registerTab(first);
    expect(tabs.getEnabledTabs().length).toBe(2);
  });

  it('resolvedId is generated when id input is empty',async  () => {
    const fix = TestBed.createComponent(AuTabs);
    await fix.whenStable();
    expect(fix.componentInstance.resolvedId()).toMatch(/^au-tabs-\d+$/);
  });
});

@Component({
  selector: 'test-tabs',
  imports: [AuTabs, AuTab, AuTabPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-tabs
      [(value)]="active"
      ariaLabel="Demo tabs"
    >
      <button
        type="button"
        auTab="profile"
      >
        Profile
      </button>
      <button
        type="button"
        auTab="billing"
      >
        Billing
      </button>
      <div auTabPanel="profile">Profile body</div>
      <div auTabPanel="billing">Billing body</div>
    </au-tabs>
  `,
})
class TestTabsComponent {
  active = '';
}

@Component({
  selector: 'test-tabs-id',
  imports: [AuTabs, AuTab, AuTabPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-tabs
      [(value)]="active"
      id="settings"
      ariaLabel="Demo tabs"
    >
      <button
        type="button"
        auTab="profile"
      >
        Profile
      </button>
      <button
        type="button"
        auTab="billing"
      >
        Billing
      </button>
      <div auTabPanel="profile">Profile body</div>
      <div auTabPanel="billing">Billing body</div>
    </au-tabs>
  `,
})
class TestTabsWithIdComponent {
  active = '';
}

@Component({
  selector: 'test-three-tabs',
  imports: [AuTabs, AuTab, AuTabPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-tabs
      [(value)]="active"
      [orientation]="orientation"
      ariaLabel="Three"
    >
      <button
        type="button"
        auTab="a"
      >
        A
      </button>
      <button
        type="button"
        auTab="b"
      >
        B
      </button>
      <button
        type="button"
        auTab="c"
      >
        C
      </button>
      <div auTabPanel="a">A</div>
      <div auTabPanel="b">B</div>
      <div auTabPanel="c">C</div>
    </au-tabs>
  `,
})
class TestThreeTabsComponent {
  active = '';
  orientation: 'horizontal' | 'vertical' = 'horizontal';
}

@Component({
  selector: 'test-tabs-disabled',
  imports: [AuTabs, AuTab, AuTabPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-tabs
      [(value)]="active"
      ariaLabel="Disabled"
    >
      <button
        type="button"
        auTab="a"
      >
        A
      </button>
      <button
        type="button"
        auTab="b"
        [auTabDisabled]="true"
      >
        B
      </button>
      <button
        type="button"
        auTab="c"
      >
        C
      </button>
      <div auTabPanel="a">A</div>
      <div auTabPanel="b">B</div>
      <div auTabPanel="c">C</div>
    </au-tabs>
  `,
})
class TestTabsWithDisabledComponent {
  active = '';
}

@Component({
  selector: 'test-tabs-unknown-value',
  imports: [AuTabs, AuTab, AuTabPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-tabs
      [(value)]="active"
      ariaLabel="Unknown value"
    >
      <button
        type="button"
        auTab="a"
      >
        A
      </button>
      <button
        type="button"
        auTab="b"
      >
        B
      </button>
      <div auTabPanel="a">A</div>
      <div auTabPanel="b">B</div>
    </au-tabs>
  `,
})
class TestTabsUnknownValueComponent {
  active = 'missing';
}

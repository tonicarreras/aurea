import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuTab } from './au-tab.directive';
import { AuTabPanel } from './au-tab-panel.directive';
import { AuTabs } from './tabs';

describe('AuTabPanel', () => {
  it('is defined', () => {
    expect(AuTabPanel).toBeDefined();
  });
});

@Component({
  selector: 'test-tabs-panel',
  imports: [AuTabs, AuTab, AuTabPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-tabs
      value="a"
      ariaLabel="Test"
    >
      <button
        type="button"
        auTab="a"
      >
        A
      </button>
      <div auTabPanel="a">Panel A</div>
    </au-tabs>
  `,
})
class TestTabsPanelComponent {}

describe('AuTabPanel integration', () => {
  it('sets tabpanel role and ids on the aria host', async () => {
    const fix = TestBed.createComponent(TestTabsPanelComponent);
    await fix.whenStable();
    await fix.whenStable();
    const panel = fix.nativeElement.querySelector('[data-au-panel-host="a"]') as HTMLElement;
    expect(panel.getAttribute('role')).toBe('tabpanel');
    expect(panel.id).toContain('-panel-a');
    expect(panel.getAttribute('aria-labelledby')).toContain('-tab-a');
    expect(panel.textContent).toContain('Panel A');
  });
});

import { Component } from '@angular/core';
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
  template: `
    <au-tabs value="a" ariaLabel="Test">
      <button type="button" auTab="a">A</button>
      <div auTabPanel="a">Panel A</div>
    </au-tabs>
  `,
})
class TestTabsPanelComponent {}

describe('AuTabPanel integration', () => {
  it('sets tabpanel role and ids', () => {
    const fix = TestBed.createComponent(TestTabsPanelComponent);
    fix.detectChanges();
    const panel = fix.nativeElement.querySelector('[auTabPanel]') as HTMLElement;
    expect(panel.getAttribute('role')).toBe('tabpanel');
    expect(panel.id).toContain('-panel-a');
    expect(panel.getAttribute('aria-labelledby')).toContain('-tab-a');
  });
});

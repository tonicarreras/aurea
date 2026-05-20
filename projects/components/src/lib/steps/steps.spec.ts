import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuStep } from './au-step.directive';
import { AuStepPanel } from './au-step-panel.directive';
import { AuSteps } from './steps';

@Component({
  imports: [AuSteps, AuStep, AuStepPanel],
  template: `
    <au-steps [(value)]="active" ariaLabel="Doc sections">
      <button type="button" auStep="overview">Overview</button>
      <button type="button" auStep="api">API</button>
      <div auStepPanel="overview">Overview body</div>
      <div auStepPanel="api">API body</div>
    </au-steps>
  `,
})
class TestStepsHost {
  active = '';
}

describe('AuSteps', () => {
  it('selects first step when value is empty', async () => {
    const fix = TestBed.createComponent(TestStepsHost);
    fix.detectChanges();
    await fix.whenStable();
    await new Promise<void>((resolve) => queueMicrotask(() => resolve()));
    fix.detectChanges();
    expect(fix.componentInstance.active).toBe('overview');
  });

  it('shows all panels in sections layout', async () => {
    @Component({
      imports: [AuSteps, AuStep, AuStepPanel],
      template: `
        <au-steps layout="sections" [(value)]="active" ariaLabel="Sections">
          <button type="button" auStep="overview">Overview</button>
          <button type="button" auStep="api">API</button>
          <div auStepPanel="overview">Overview body</div>
          <div auStepPanel="api">API body</div>
        </au-steps>
      `,
    })
    class SectionsHost {
      active = 'overview';
    }

    const fix = TestBed.createComponent(SectionsHost);
    fix.detectChanges();
    await fix.whenStable();
    await new Promise<void>((resolve) => queueMicrotask(() => resolve()));
    fix.detectChanges();
    const panels = fix.nativeElement.querySelectorAll('[role="region"]');
    expect(panels.length).toBe(2);
    const hidden = [...panels].filter((p: Element) => p.hasAttribute('hidden'));
    expect(hidden.length).toBe(0);
  });

  it('hides inactive panels when host has display flex', async () => {
    @Component({
      imports: [AuSteps, AuStep, AuStepPanel],
      styles: [
        `
          .panel-host {
            display: flex;
          }
        `,
      ],
      template: `
        <au-steps [(value)]="active" ariaLabel="Tabs">
          <button type="button" auStep="overview">Overview</button>
          <button type="button" auStep="api">API</button>
          <div class="panel-host" auStepPanel="overview">Overview body</div>
          <div class="panel-host" auStepPanel="api">API body</div>
        </au-steps>
      `,
    })
    class FlexPanelHost {
      active = '';
    }

    const fix = TestBed.createComponent(FlexPanelHost);
    fix.detectChanges();
    await fix.whenStable();
    await new Promise<void>((resolve) => queueMicrotask(() => resolve()));
    fix.detectChanges();
    const apiPanel = fix.nativeElement.querySelector('[auStepPanel="api"]') as HTMLElement;
    expect(getComputedStyle(apiPanel).display).toBe('none');
  });

  it('switches panel on step click', async () => {
    const fix = TestBed.createComponent(TestStepsHost);
    fix.detectChanges();
    await fix.whenStable();
    await new Promise<void>((resolve) => queueMicrotask(() => resolve()));
    const apiStep = fix.nativeElement.querySelector('button[auStep="api"]') as HTMLButtonElement;
    apiStep.click();
    fix.detectChanges();
    expect(fix.componentInstance.active).toBe('api');
    const panel = fix.nativeElement.querySelector('[auStepPanel="api"]') as HTMLElement;
    expect(panel.hasAttribute('hidden')).toBe(false);
  });
});

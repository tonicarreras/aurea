import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuStep } from './au-step.directive';
import { AuStepPanel } from './au-step-panel.directive';
import { AuSteps } from './steps';

async function flushStepsSelection(): Promise<void> {
  await new Promise<void>((resolve) => queueMicrotask(() => resolve()));
}

@Component({
  imports: [AuSteps, AuStep, AuStepPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-steps
      [(value)]="active"
      ariaLabel="Doc sections"
    >
      <button
        type="button"
        auStep="overview"
      >
        Overview
      </button>
      <button
        type="button"
        auStep="api"
      >
        API
      </button>
      <div auStepPanel="overview">Overview body</div>
      <div auStepPanel="api">API body</div>
    </au-steps>
  `,
})
class TestStepsHost {
  active = '';
}

@Component({
  imports: [AuSteps, AuStep, AuStepPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-steps
      layout="sections"
      [(value)]="active"
      ariaLabel="Sections"
    >
      <button
        type="button"
        auStep="overview"
      >
        Overview
      </button>
      <button
        type="button"
        auStep="api"
      >
        API
      </button>
      <div auStepPanel="overview">Overview body</div>
      <div auStepPanel="api">API body</div>
    </au-steps>
  `,
})
class SectionsHost {
  active = 'overview';
}

@Component({
  imports: [AuSteps, AuStep, AuStepPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-steps
      layout="sections"
      [(value)]="active"
      id="doc"
      ariaLabel="Doc scroll"
    >
      <button
        type="button"
        auStep="overview"
      >
        Overview
      </button>
      <button
        type="button"
        auStep="api"
      >
        API
      </button>
      <div auStepPanel="overview">Overview body</div>
      <div auStepPanel="api">API body</div>
    </au-steps>
  `,
})
class SectionsScrollHost {
  active = 'overview';
}

@Component({
  imports: [AuSteps, AuStep, AuStepPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-steps
      [(value)]="active"
      ariaLabel="Three steps"
    >
      <button
        type="button"
        auStep="a"
      >
        A
      </button>
      <button
        type="button"
        auStep="b"
      >
        B
      </button>
      <button
        type="button"
        auStep="c"
      >
        C
      </button>
      <div auStepPanel="a">A</div>
      <div auStepPanel="b">B</div>
      <div auStepPanel="c">C</div>
    </au-steps>
  `,
})
class TestThreeStepsHost {
  active = '';
}

@Component({
  imports: [AuSteps, AuStep, AuStepPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-steps
      [(value)]="active"
      ariaLabel="Disabled"
    >
      <button
        type="button"
        auStep="a"
      >
        A
      </button>
      <button
        type="button"
        auStep="b"
        [auStepDisabled]="true"
      >
        B
      </button>
      <button
        type="button"
        auStep="c"
      >
        C
      </button>
      <div auStepPanel="a">A</div>
      <div auStepPanel="b">B</div>
      <div auStepPanel="c">C</div>
    </au-steps>
  `,
})
class TestStepsWithDisabledHost {
  active = '';
}

@Component({
  imports: [AuSteps, AuStep, AuStepPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-steps
      [(value)]="active"
      id="settings"
      ariaLabel="With id"
    >
      <button
        type="button"
        auStep="profile"
      >
        Profile
      </button>
      <button
        type="button"
        auStep="billing"
      >
        Billing
      </button>
      <div auStepPanel="profile">Profile body</div>
      <div auStepPanel="billing">Billing body</div>
    </au-steps>
  `,
})
class TestStepsWithIdHost {
  active = '';
}

@Component({
  imports: [AuSteps, AuStep, AuStepPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-steps
      [(value)]="active"
      ariaLabel="Unknown value"
    >
      <button
        type="button"
        auStep="a"
      >
        A
      </button>
      <button
        type="button"
        auStep="b"
      >
        B
      </button>
      <div auStepPanel="a">A</div>
      <div auStepPanel="b">B</div>
    </au-steps>
  `,
})
class TestStepsUnknownValueHost {
  active = 'missing';
}

describe('AuSteps', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuSteps],
    }).compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('defaults layout to tabs and size to md',async  () => {
    const fix = TestBed.createComponent(AuSteps);
    await fix.whenStable();
    const host = fix.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-layout')).toBe('tabs');
    expect(host.getAttribute('data-au-size')).toBe('md');
  });

  it('selects first step when value is empty', async () => {
    const fix = TestBed.createComponent(TestStepsHost);
    await fix.whenStable();
    await fix.whenStable();
    await flushStepsSelection();
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('overview');
  });

  it('shows all panels in sections layout', async () => {
    const fix = TestBed.createComponent(SectionsHost);
    await fix.whenStable();
    await fix.whenStable();
    await flushStepsSelection();
    await fix.whenStable();
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
        <au-steps
          [(value)]="active"
          ariaLabel="Tabs"
        >
          <button
            type="button"
            auStep="overview"
          >
            Overview
          </button>
          <button
            type="button"
            auStep="api"
          >
            API
          </button>
          <div
            class="panel-host"
            auStepPanel="overview"
          >
            Overview body
          </div>
          <div
            class="panel-host"
            auStepPanel="api"
          >
            API body
          </div>
        </au-steps>
      `,
    })
    class FlexPanelHost {
      active = '';
    }

    const fix = TestBed.createComponent(FlexPanelHost);
    await fix.whenStable();
    await fix.whenStable();
    await flushStepsSelection();
    await fix.whenStable();
    const apiPanel = fix.nativeElement.querySelector('[auStepPanel="api"]') as HTMLElement;
    expect(getComputedStyle(apiPanel).display).toBe('none');
  });

  it('switches panel on step click', async () => {
    const fix = TestBed.createComponent(TestStepsHost);
    await fix.whenStable();
    await fix.whenStable();
    await flushStepsSelection();
    const apiStep = fix.nativeElement.querySelector('button[auStep="api"]') as HTMLButtonElement;
    apiStep.click();
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('api');
    const panel = fix.nativeElement.querySelector('[auStepPanel="api"]') as HTMLElement;
    expect(panel.hasAttribute('hidden')).toBe(false);
  });

  it('keyboard navigation uses first step when current value is unknown', async () => {
    const fix = TestBed.createComponent(TestThreeStepsHost);
    await fix.whenStable();
    await fix.whenStable();
    await flushStepsSelection();
    const steps = fix.debugElement.query(By.directive(AuSteps))!.componentInstance as AuSteps;
    steps.value.set('ghost');
    const list = fix.debugElement.query(By.css('.au-steps__list'))!;
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'End', bubbles: true }),
    );
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('c');
  });

  it('navigates steps with arrow keys', async () => {
    const fix = TestBed.createComponent(TestThreeStepsHost);
    await fix.whenStable();
    await fix.whenStable();
    await flushStepsSelection();
    const list = fix.debugElement.query(By.css('.au-steps__list'))!;
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('b');
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
    );
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('a');
  });

  it('navigates to first and last step with Home and End', async () => {
    const fix = TestBed.createComponent(TestThreeStepsHost);
    await fix.whenStable();
    await fix.whenStable();
    await flushStepsSelection();
    const list = fix.debugElement.query(By.css('.au-steps__list'))!;
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

  it('ignores unrelated keys on steplist', async () => {
    const fix = TestBed.createComponent(TestThreeStepsHost);
    await fix.whenStable();
    await fix.whenStable();
    await flushStepsSelection();
    const list = fix.debugElement.query(By.css('.au-steps__list'))!;
    const ev = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    list.triggerEventHandler('keydown', ev);
    expect(fix.componentInstance.active).toBe('a');
    expect(ev.defaultPrevented).toBe(false);
  });

  it('skips disabled steps in keyboard navigation', async () => {
    const fix = TestBed.createComponent(TestStepsWithDisabledHost);
    await fix.whenStable();
    await fix.whenStable();
    await flushStepsSelection();
    const list = fix.debugElement.query(By.css('.au-steps__list'))!;
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('c');
  });

  it('does not select disabled step on click', async () => {
    const fix = TestBed.createComponent(TestStepsWithDisabledHost);
    await fix.whenStable();
    await flushStepsSelection();
    const disabled = fix.nativeElement.querySelector('button[auStep="b"]') as HTMLButtonElement;
    disabled.click();
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('a');
  });

  it('prevents default when clicking a disabled step', async () => {
    const fix = TestBed.createComponent(TestStepsWithDisabledHost);
    await fix.whenStable();
    await flushStepsSelection();
    const step = fix.debugElement.query(By.css('button[auStep="b"]'))!;
    const ev = new MouseEvent('click', { bubbles: true, cancelable: true });
    const prevent = vi.spyOn(ev, 'preventDefault');
    step.triggerEventHandler('click', ev);
    expect(prevent).toHaveBeenCalled();
  });

  it('uses custom id prefix for step and panel ids', async () => {
    const fix = TestBed.createComponent(TestStepsWithIdHost);
    await fix.whenStable();
    await flushStepsSelection();
    const step = fix.nativeElement.querySelector('button[auStep="profile"]') as HTMLButtonElement;
    expect(step.id).toBe('settings-step-profile');
    const panel = fix.nativeElement.querySelector('[auStepPanel="profile"]') as HTMLElement;
    expect(panel.id).toBe('settings-panel-profile');
  });

  it('onListKeydown is noop when no enabled steps', () => {
    const fix = TestBed.createComponent(AuSteps);
    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
    fix.componentInstance.onListKeydown(ev);
    expect(ev.defaultPrevented).toBe(false);
  });

  it('stepIdFor and panelIdFor use resolved id',async  () => {
    const fix = TestBed.createComponent(AuSteps);
    fix.componentRef.setInput('id', 'x');
    await fix.whenStable();
    expect(fix.componentInstance.stepIdFor('one')).toBe('x-step-one');
    expect(fix.componentInstance.panelIdFor('one')).toBe('x-panel-one');
  });

  it('does not register the same step twice', async () => {
    const fix = TestBed.createComponent(TestStepsHost);
    await fix.whenStable();
    await flushStepsSelection();
    const steps = fix.debugElement.query(By.directive(AuSteps))!.componentInstance as AuSteps;
    const first = fix.debugElement.query(By.directive(AuStep))!.injector.get(AuStep);
    steps.registerStep(first);
    expect(steps.getEnabledSteps().length).toBe(2);
  });

  it('resolvedId is generated when id input is empty',async  () => {
    const fix = TestBed.createComponent(AuSteps);
    await fix.whenStable();
    expect(fix.componentInstance.resolvedId()).toMatch(/^au-steps-\d+$/);
  });

  it('does not emit valueChange when selecting the current step', async () => {
    const fix = TestBed.createComponent(TestStepsHost);
    await fix.whenStable();
    await flushStepsSelection();
    const steps = fix.debugElement.query(By.directive(AuSteps))!.componentInstance as AuSteps;
    let count = 0;
    steps.value.subscribe(() => count++);
    steps.selectStep('overview');
    expect(count).toBe(0);
  });

  it('resets to first enabled step when value is unknown', async () => {
    const fix = TestBed.createComponent(TestStepsUnknownValueHost);
    await fix.whenStable();
    await flushStepsSelection();
    await fix.whenStable();
    expect(fix.componentInstance.active).toBe('a');
  });

  it('re-selects first step after unregistering the active step', async () => {
    const fix = TestBed.createComponent(TestStepsHost);
    fix.detectChanges();
    await flushStepsSelection();
    const steps = fix.debugElement.query(By.directive(AuSteps))!.componentInstance as AuSteps;
    const apiStep = fix.debugElement
      .queryAll(By.directive(AuStep))
      .map((el) => el.injector.get(AuStep))
      .find((s) => s.auStep() === 'api')!;
    fix.componentInstance.active = 'api';
    fix.detectChanges();
    steps.unregisterStep(apiStep);
    await flushStepsSelection();
    fix.detectChanges();
    expect(fix.componentInstance.active).toBe('overview');
  });

  it('scrolls to panel in sections layout on step click', async () => {
    const panel = document.createElement('div');
    panel.id = 'doc-panel-api';
    const scrollIntoView = vi.fn();
    panel.scrollIntoView = scrollIntoView as typeof panel.scrollIntoView;
    document.body.append(panel);

    const fix = TestBed.createComponent(SectionsScrollHost);
    await fix.whenStable();
    await flushStepsSelection();

    const apiStep = fix.nativeElement.querySelector('button[auStep="api"]') as HTMLButtonElement;
    apiStep.click();
    await fix.whenStable();

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    panel.remove();
  });

  it('scrollToPanel calls scrollIntoView when element exists',async  () => {
    const panel = document.createElement('div');
    panel.id = 'doc-panel-api';
    const scrollIntoView = vi.fn();
    panel.scrollIntoView = scrollIntoView as typeof panel.scrollIntoView;
    document.body.append(panel);

    const fix = TestBed.createComponent(AuSteps);
    fix.componentRef.setInput('id', 'doc');
    await fix.whenStable();
    fix.componentInstance.scrollToPanel('api');
    expect(scrollIntoView).toHaveBeenCalled();
    panel.remove();
  });

  it('scrollToPanel is noop when document is undefined',async  () => {
    const fix = TestBed.createComponent(AuSteps);
    await fix.whenStable();
    const saved = globalThis.document;
    vi.stubGlobal('document', undefined);
    try {
      expect(() => fix.componentInstance.scrollToPanel('x')).not.toThrow();
    } finally {
      vi.stubGlobal('document', saved);
    }
  });

  it('focuses step from keyboard navigation', async () => {
    const fix = TestBed.createComponent(TestThreeStepsHost);
    await fix.whenStable();
    await flushStepsSelection();
    const bStep = fix.nativeElement.querySelector('button[auStep="b"]') as HTMLButtonElement;
    const focusSpy = vi.spyOn(bStep, 'focus');
    const list = fix.debugElement.query(By.css('.au-steps__list'))!;
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    await fix.whenStable();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('applies focus-by-tab class after Tab key', async () => {
    const fix = TestBed.createComponent(TestStepsHost);
    await fix.whenStable();
    await flushStepsSelection();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    const overview = fix.nativeElement.querySelector(
      'button[auStep="overview"]',
    ) as HTMLButtonElement;
    overview.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await fix.whenStable();
    expect(overview.classList.contains('au-steps__step--from-tab')).toBe(true);
    overview.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    await fix.whenStable();
    expect(overview.classList.contains('au-steps__step--from-tab')).toBe(false);
  });

  it('sections steps use aria-current instead of tab role', async () => {
    const fix = TestBed.createComponent(SectionsHost);
    await fix.whenStable();
    await flushStepsSelection();
    const overview = fix.nativeElement.querySelector(
      'button[auStep="overview"]',
    ) as HTMLButtonElement;
    expect(overview.getAttribute('role')).toBeNull();
    expect(overview.getAttribute('aria-current')).toBe('true');
  });
});

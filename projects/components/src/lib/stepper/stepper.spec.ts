import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuStepperStep } from './au-stepper-step.directive';
import { AuStepperPanel } from './au-stepper-panel.directive';
import { AuStepper } from './stepper';

async function flushStepperSelection(): Promise<void> {
  await new Promise<void>((resolve) => queueMicrotask(() => resolve()));
}

@Component({
  imports: [AuStepper, AuStepperStep, AuStepperPanel],
  template: `
    <au-stepper
      [(value)]="active"
      ariaLabel="Checkout"
      [linear]="linear"
    >
      <button
        type="button"
        auStep="account"
        [auStepCompleted]="accountDone"
      >
        Account
      </button>
      <button
        type="button"
        auStep="shipping"
        [auStepCompleted]="shippingDone"
      >
        Shipping
      </button>
      <button
        type="button"
        auStep="review"
      >
        Review
      </button>

      <div auStepPanel="account">Account body</div>
      <div auStepPanel="shipping">Shipping body</div>
      <div auStepPanel="review">Review body</div>
    </au-stepper>
  `,
})
class StepperHost {
  active = '';
  linear = true;
  accountDone = false;
  shippingDone = false;
}

describe('AuStepper', () => {
  it('selects first step by default', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();
    expect(fix.componentInstance.active).toBe('account');
  });

  it('shows only active panel', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();

    const account = fix.nativeElement.querySelector('[auStepPanel="account"]') as HTMLElement;
    const shipping = fix.nativeElement.querySelector('[auStepPanel="shipping"]') as HTMLElement;
    expect(account.hasAttribute('hidden')).toBe(false);
    expect(shipping.hasAttribute('hidden')).toBe(true);
  });

  it('blocks jumping ahead in linear mode', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();

    const review = fix.nativeElement.querySelector('button[auStep="review"]') as HTMLButtonElement;
    review.click();
    fix.detectChanges();

    expect(fix.componentInstance.active).toBe('account');
  });

  it('allows moving to next step in linear mode', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.componentInstance.accountDone = true;
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();

    const shipping = fix.nativeElement.querySelector(
      'button[auStep="shipping"]',
    ) as HTMLButtonElement;
    shipping.click();
    fix.detectChanges();

    expect(fix.componentInstance.active).toBe('shipping');
  });

  it('allows jumping in non-linear mode', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.componentInstance.linear = false;
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();

    const review = fix.nativeElement.querySelector('button[auStep="review"]') as HTMLButtonElement;
    review.click();
    fix.detectChanges();

    expect(fix.componentInstance.active).toBe('review');
  });

  it('marks completed steps with class', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.componentInstance.accountDone = true;
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();

    const account = fix.nativeElement.querySelector(
      'button[auStep="account"]',
    ) as HTMLButtonElement;
    expect(account.classList.contains('au-stepper__step--completed')).toBe(true);
  });

  it('supports keyboard navigation between enabled steps', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.componentInstance.accountDone = true;
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();

    const list = fix.debugElement.query(By.css('.au-stepper__list'))!;
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    fix.detectChanges();

    expect(fix.componentInstance.active).toBe('shipping');
  });

  it('calls isStepCompleted for a completed step', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.componentInstance.accountDone = true;
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();
    const stepper = fix.debugElement.children[0].componentInstance as AuStepper;
    expect(stepper.isStepCompleted('account')).toBe(true);
    expect(stepper.isStepCompleted('shipping')).toBe(false);
  });

  it('registerStep is idempotent', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();
    const stepper = fix.debugElement.children[0].componentInstance as AuStepper;
    const steps = stepper.getSteps();
    const first = steps[0]!;
    const initialCount = steps.length;
    stepper.registerStep(first);
    expect(stepper.getSteps().length).toBe(initialCount);
  });

  it('navigation falls back to index 0 when current step is disabled', async () => {
    @Component({
      imports: [AuStepper, AuStepperStep, AuStepperPanel],
      template: `
        <au-stepper
          [(value)]="active"
          ariaLabel="Test"
        >
          <button
            type="button"
            auStep="a"
            [auStepDisabled]="true"
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
        </au-stepper>
      `,
    })
    class DisabledFirstHost {
      active = 'a';
    }

    const fix = TestBed.createComponent(DisabledFirstHost);
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();

    // Stepper should auto-select first enabled step (b)
    const stepper = fix.debugElement.children[0].componentInstance as AuStepper;
    expect(stepper.value()).toBe('b');
    expect(stepper.getSteps().length).toBe(3);

    // Force value to the disabled step
    stepper.value.set('a');
    fix.detectChanges();

    // Now navigate — currentIndex will be -1 because 'a' is disabled
    const list = fix.debugElement.query(By.css('.au-stepper__list'))!;
    expect(() => {
      list.triggerEventHandler(
        'keydown',
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
      );
      fix.detectChanges();
    }).not.toThrow();
  });

  it('rejects non-registered step via canSelect', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();
    const stepper = fix.debugElement.children[0].componentInstance as AuStepper;
    expect(stepper.canSelect('non-existent')).toBe(false);
  });

  it('selecting current step is a no-op', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();

    const account = fix.nativeElement.querySelector(
      'button[auStep="account"]',
    ) as HTMLButtonElement;
    account.click();
    fix.detectChanges();
    expect(fix.componentInstance.active).toBe('account');
  });

  it('does not navigate when all steps are disabled', async () => {
    @Component({
      imports: [AuStepper, AuStepperStep, AuStepperPanel],
      template: `
        <au-stepper
          [(value)]="active"
          ariaLabel="Disabled"
        >
          <button
            type="button"
            auStep="a"
            [auStepDisabled]="true"
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
          <div auStepPanel="a">A</div>
          <div auStepPanel="b">B</div>
        </au-stepper>
      `,
    })
    class AllDisabledHost {
      active = '';
    }

    const fix = TestBed.createComponent(AllDisabledHost);
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();

    const list = fix.debugElement.query(By.css('.au-stepper__list'))!;
    expect(() => {
      list.triggerEventHandler(
        'keydown',
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
      );
      fix.detectChanges();
    }).not.toThrow();
  });

  it('does not select disabled step', async () => {
    @Component({
      imports: [AuStepper, AuStepperStep, AuStepperPanel],
      template: `
        <au-stepper
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
          <div auStepPanel="a">A</div>
          <div auStepPanel="b">B</div>
        </au-stepper>
      `,
    })
    class DisabledHost {
      active = '';
    }

    const fix = TestBed.createComponent(DisabledHost);
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();

    const disabled = fix.nativeElement.querySelector('button[auStep="b"]') as HTMLButtonElement;
    disabled.click();
    fix.detectChanges();

    expect(fix.componentInstance.active).toBe('a');
  });

  it('generates id when none is provided', () => {
    const fix = TestBed.createComponent(AuStepper);
    fix.detectChanges();
    expect(fix.componentInstance.resolvedId()).toMatch(/^au-stepper-\d+$/);
  });

  it('does not block optional steps in linear mode', async () => {
    @Component({
      imports: [AuStepper, AuStepperStep, AuStepperPanel],
      template: `
        <au-stepper
          [(value)]="active"
          ariaLabel="Test"
          [linear]="true"
        >
          <button
            type="button"
            auStep="first"
            [auStepCompleted]="true"
          >
            First
          </button>
          <button
            type="button"
            auStep="second"
          >
            Second
          </button>
          <button
            type="button"
            auStep="third"
            [auStepOptional]="true"
          >
            Third
          </button>
          <button
            type="button"
            auStep="fourth"
          >
            Fourth
          </button>
          <div auStepPanel="first">First</div>
          <div auStepPanel="second">Second</div>
          <div auStepPanel="third">Third</div>
          <div auStepPanel="fourth">Fourth</div>
        </au-stepper>
      `,
    })
    class OptionalHost {
      active = 'first';
    }

    const fix = TestBed.createComponent(OptionalHost);
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();

    // Second is adjacent (currentIndex + 1) — not blocked
    const second = fix.nativeElement.querySelector('button[auStep="second"]') as HTMLButtonElement;
    expect(second.classList.contains('au-stepper__step--blocked')).toBe(false);

    // Third (optional) should NOT be blocked even though second is incomplete
    const third = fix.nativeElement.querySelector('button[auStep="third"]') as HTMLButtonElement;
    expect(third.classList.contains('au-stepper__step--blocked')).toBe(false);

    // Fourth (non-optional, past the optional) IS blocked because second is not done
    const fourth = fix.nativeElement.querySelector('button[auStep="fourth"]') as HTMLButtonElement;
    expect(fourth.classList.contains('au-stepper__step--blocked')).toBe(true);

    // Clicking optional step should work
    third.click();
    fix.detectChanges();
    expect(fix.componentInstance.active).toBe('third');
  });

  it('applies error class when step has error', async () => {
    @Component({
      imports: [AuStepper, AuStepperStep, AuStepperPanel],
      template: `
        <au-stepper
          [(value)]="active"
          ariaLabel="Test"
        >
          <button
            type="button"
            auStep="a"
            [auStepError]="true"
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
        </au-stepper>
      `,
    })
    class ErrorHost {
      active = 'a';
    }

    const fix = TestBed.createComponent(ErrorHost);
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();

    const step = fix.nativeElement.querySelector('button[auStep="a"]') as HTMLButtonElement;
    expect(step.classList.contains('au-stepper__step--error')).toBe(true);
  });

  it('navigates left with ArrowLeft', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.componentInstance.accountDone = true;
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();

    // Navigate forward first to shipping
    const list = fix.debugElement.query(By.css('.au-stepper__list'))!;
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    fix.detectChanges();
    expect(fix.componentInstance.active).toBe('shipping');

    // Navigate back with ArrowLeft
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
    );
    fix.detectChanges();
    expect(fix.componentInstance.active).toBe('account');
  });

  it('focuses first and last enabled step with Home and End', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.componentInstance.accountDone = true;
    fix.componentInstance.shippingDone = true;
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();
    const list = fix.debugElement.query(By.css('.au-stepper__list'))!;

    // Navigate to shipping first
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    fix.detectChanges();
    expect(fix.componentInstance.active).toBe('shipping');

    // Press Home to go back to first step (account)
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'Home', bubbles: true }),
    );
    fix.detectChanges();
    expect(fix.componentInstance.active).toBe('account');

    // Press End to go to last step (review)
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'End', bubbles: true }),
    );
    fix.detectChanges();
    expect(fix.componentInstance.active).toBe('review');
  });

  it('does not navigate on non-navigation keys', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();
    const list = fix.debugElement.query(By.css('.au-stepper__list'))!;
    // ArrowDown is not in the navigation set
    list.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
    );
    fix.detectChanges();
    expect(fix.componentInstance.active).toBe('account');
  });

  it('handles focusout on a step without error', async () => {
    const fix = TestBed.createComponent(StepperHost);
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();
    const step = fix.nativeElement.querySelector('button[auStep="account"]') as HTMLButtonElement;
    expect(() => {
      step.dispatchEvent(new FocusEvent('focusout'));
      fix.detectChanges();
    }).not.toThrow();
  });

  it('supports vertical layout', async () => {
    @Component({
      imports: [AuStepper, AuStepperStep, AuStepperPanel],
      template: `
        <au-stepper
          [(value)]="active"
          ariaLabel="Test"
          layout="vertical"
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
        </au-stepper>
      `,
    })
    class VerticalHost {
      active = 'a';
    }

    const fix = TestBed.createComponent(VerticalHost);
    fix.detectChanges();
    await flushStepperSelection();
    fix.detectChanges();

    const stepper = fix.nativeElement.querySelector('au-stepper') as HTMLElement;
    expect(stepper.getAttribute('data-au-layout')).toBe('vertical');
  });
});

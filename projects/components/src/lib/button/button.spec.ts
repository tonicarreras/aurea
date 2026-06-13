import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuButton, type AuButtonVariant } from './au-button.directive';

@Component({
  imports: [AuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<button auButton type="button" [loading]="loading">Save changes</button>`,
})
class ButtonLoadingHost {
  loading = true;
}

@Component({
  imports: [AuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<button auButton type="button" (click)="count = count + 1">Go</button>`,
})
class ButtonClickHost {
  count = 0;
}

@Component({
  imports: [AuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      auButton
      type="button"
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
      [loading]="loading()"
      [name]="name()"
      [type]="buttonType()"
      [label]="label()"
      (click)="onClick($event)"
    >
      Test
    </button>
  `,
})
class ButtonHost {
  readonly variant = input<AuButtonVariant>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly name = input('');
  readonly buttonType = input<'button' | 'submit' | 'reset'>('button');
  readonly label = input('');

  clicks: MouseEvent[] = [];
  onClick(event: MouseEvent): void {
    this.clicks.push(event);
  }
}

describe('AuButton', () => {
  let fixture: ComponentFixture<ButtonHost>;
  let directive: AuButton;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonHost);
    directive = fixture.debugElement.query(By.directive(AuButton))!.injector.get(AuButton);
    await fixture.whenStable();
  });

  it('creates', () => {
    expect(directive).toBeTruthy();
  });

  it('has default variant primary', () => {
    expect(directive.variant()).toBe('primary');
  });

  it('has default size md', () => {
    expect(directive.size()).toBe('md');
  });

  it('renders button element', () => {
    expect(fixture.nativeElement.querySelector('button')).toBeTruthy();
  });

  it('applies host classes', () => {
    expect(fixture.nativeElement.querySelector('button').classList.contains('au-button')).toBe(true);
  });

  it('sets data-au-size attribute',async  () => {
    fixture.componentRef.setInput('size', 'lg');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('button').getAttribute('data-au-size')).toBe('lg');
  });

  it('sets data-au-variant attribute',async  () => {
    fixture.componentRef.setInput('variant', 'outline');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('button').getAttribute('data-au-variant')).toBe(
      'outline',
    );
  });

  it('forwards native click to parent handler once per activation', async () => {
    const hostFixture = TestBed.createComponent(ButtonClickHost);
    await hostFixture.whenStable();
    hostFixture.nativeElement.querySelector('button').click();
    expect(hostFixture.componentInstance.count).toBe(1);
  });

  it('does not invoke parent click handler when disabled', async () => {
    @Component({
      imports: [AuButton],
      template: `<button auButton type="button" [disabled]="true" (click)="count = count + 1">Go</button>`,
    })
    class DisabledClickHost {
      count = 0;
    }
    const hostFixture = TestBed.createComponent(DisabledClickHost);
    await hostFixture.whenStable();
    hostFixture.nativeElement.querySelector('button').click();
    expect(hostFixture.componentInstance.count).toBe(0);
  });

  it('does not invoke parent click handler when loading', async () => {
    @Component({
      imports: [AuButton],
      template: `<button auButton type="button" [loading]="true" (click)="count = count + 1">Go</button>`,
    })
    class LoadingClickHost {
      count = 0;
    }
    const hostFixture = TestBed.createComponent(LoadingClickHost);
    await hostFixture.whenStable();
    hostFixture.nativeElement.querySelector('button').click();
    expect(hostFixture.componentInstance.count).toBe(0);
  });

  it('sets aria-busy when loading',async  () => {
    fixture.componentRef.setInput('loading', true);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('button').getAttribute('aria-busy')).toBe('true');
  });

  it('uses aria-disabled instead of native disabled when loading',async  () => {
    fixture.componentRef.setInput('loading', true);
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.hasAttribute('disabled')).toBe(false);
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('sets disabled attribute when disabled',async  () => {
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('button').hasAttribute('disabled')).toBe(true);
  });

  it('focus() forwards to native button', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const spy = vi.spyOn(button, 'focus');
    directive.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('sets native name, type, and aria-label from inputs',async  () => {
    fixture.componentRef.setInput('name', 'submit-btn');
    fixture.componentRef.setInput('buttonType', 'submit');
    fixture.componentRef.setInput('label', 'Send form');
    await fixture.whenStable();
    const btn = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(btn.getAttribute('name')).toBe('submit-btn');
    expect(btn.getAttribute('type')).toBe('submit');
    expect(btn.getAttribute('aria-label')).toBe('Send form');
  });

  it('applies from-tab class after Tab then focusin',async  () => {
    const btnDe = fixture.debugElement.query(By.css('button'))!;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    btnDe.triggerEventHandler('focusin', new FocusEvent('focusin'));
    await fixture.whenStable();
    expect(btnDe.nativeElement.classList.contains('au-button--from-tab')).toBe(true);
    btnDe.triggerEventHandler('focusout', new FocusEvent('focusout'));
    await fixture.whenStable();
    expect(btnDe.nativeElement.classList.contains('au-button--from-tab')).toBe(false);
  });

  it('prevents default on click when disabled',async  () => {
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    const ev = new MouseEvent('click', { cancelable: true, bubbles: true });
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
  });

  it('prevents default on click when loading',async  () => {
    fixture.componentRef.setInput('loading', true);
    await fixture.whenStable();
    const ev = new MouseEvent('click', { cancelable: true, bubbles: true });
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
  });
});

describe('AuButton loading with projected text', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonLoadingHost],
    }).compileComponents();
  });

  it('hides projected text visually and exposes it via aria-label',async  () => {
    const fix = TestBed.createComponent(ButtonLoadingHost);
    await fix.whenStable();
    const button = fix.nativeElement.querySelector('button') as HTMLButtonElement;
    const content = fix.nativeElement.querySelector('.au-button__content') as HTMLElement;
    expect(content.classList.contains('au-button__content--hidden')).toBe(true);
    expect(content.getAttribute('aria-hidden')).toBe('true');
    expect(button.getAttribute('aria-label')).toBe('Save changes');
    expect(fix.nativeElement.querySelector('.au-button__spinner')).toBeTruthy();
  });

  it('uses md spinner size on lg loading buttons', async () => {
    @Component({
      imports: [AuButton],
      template: `<button auButton type="button" size="lg" [loading]="true">Save</button>`,
    })
    class LgLoadingHost {}
    const hostFixture = TestBed.createComponent(LgLoadingHost);
    await hostFixture.whenStable();
    expect(hostFixture.nativeElement.querySelector('au-spinner')?.getAttribute('data-au-size')).toBe(
      'md',
    );
  });
});

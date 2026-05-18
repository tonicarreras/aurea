import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('has default variant primary', () => {
    expect(component.variant()).toBe('primary');
  });

  it('has default size md', () => {
    expect(component.size()).toBe('md');
  });

  it('renders button element', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('applies host classes', () => {
    const host = fixture.nativeElement;
    expect(host.classList.contains('au-button')).toBe(true);
  });

  it('sets data-au-size attribute', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const host = fixture.nativeElement;
    expect(host.getAttribute('data-au-size')).toBe('lg');
  });

  it('sets data-au-variant attribute', () => {
    fixture.componentRef.setInput('variant', 'outline');
    fixture.detectChanges();
    const host = fixture.nativeElement;
    expect(host.getAttribute('data-au-variant')).toBe('outline');
  });

  it('emits click event', async () => {
    const emitted: MouseEvent[] = [];
    component.click.subscribe((e) => emitted.push(e));

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitted.length).toBe(1);
  });

  it('does not emit click when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const emitted: MouseEvent[] = [];
    component.click.subscribe((e) => emitted.push(e));

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitted.length).toBe(0);
  });

  it('does not emit click when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const emitted: MouseEvent[] = [];
    component.click.subscribe((e) => emitted.push(e));

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitted.length).toBe(0);
  });

  it('sets aria-busy when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  it('uses aria-disabled instead of native disabled when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.hasAttribute('disabled')).toBe(false);
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('sets disabled attribute when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.hasAttribute('disabled')).toBe(true);
  });

  it('focus() forwards to native button', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const spy = vi.spyOn(button, 'focus');
    component.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('sets native name, type, and aria-label from inputs', () => {
    fixture.componentRef.setInput('name', 'submit-btn');
    fixture.componentRef.setInput('type', 'submit');
    fixture.componentRef.setInput('label', 'Send form');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(btn.getAttribute('name')).toBe('submit-btn');
    expect(btn.getAttribute('type')).toBe('submit');
    expect(btn.getAttribute('aria-label')).toBe('Send form');
  });

  it('applies from-tab class after Tab then focusin', () => {
    const btnDe = fixture.debugElement.query(By.css('button'))!;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    btnDe.triggerEventHandler('focusin', new FocusEvent('focusin'));
    fixture.detectChanges();
    expect(btnDe.nativeElement.classList.contains('au-button__element--from-tab')).toBe(true);
    btnDe.triggerEventHandler('focusout', new FocusEvent('focusout'));
    fixture.detectChanges();
    expect(btnDe.nativeElement.classList.contains('au-button__element--from-tab')).toBe(false);
  });

  it('prevents default on click when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const btnDe = fixture.debugElement.query(By.css('button'))!;
    const ev = new MouseEvent('click', { cancelable: true });
    btnDe.triggerEventHandler('click', ev);
    expect(ev.defaultPrevented).toBe(true);
  });

  it('prevents default on click when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const btnDe = fixture.debugElement.query(By.css('button'))!;
    const ev = new MouseEvent('click', { cancelable: true });
    btnDe.triggerEventHandler('click', ev);
    expect(ev.defaultPrevented).toBe(true);
  });
});
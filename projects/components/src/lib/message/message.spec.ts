import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuMessage } from './message';

describe('AuMessage', () => {
  let fixture: ComponentFixture<AuMessage>;
  let component: AuMessage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(AuMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('defaults to default variant and status role on surface', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-variant')).toBe('default');
    expect(host.querySelector('.au-message__surface')?.getAttribute('role')).toBe('status');
    expect(host.getAttribute('role')).toBeNull();
  });

  it('uses alert role on surface for error and warning', () => {
    fixture.componentRef.setInput('variant', 'error');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.au-message__surface')?.getAttribute('role')).toBe(
      'alert',
    );

    fixture.componentRef.setInput('variant', 'warning');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.au-message__surface')?.getAttribute('role')).toBe(
      'alert',
    );
  });

  it('renders title and message', () => {
    fixture.componentRef.setInput('title', 'Heads up');
    fixture.componentRef.setInput('message', 'Details here.');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.au-message__title')?.textContent?.trim()).toBe(
      'Heads up',
    );
    expect(fixture.nativeElement.querySelector('.au-message__text')?.textContent?.trim()).toBe(
      'Details here.',
    );
  });

  it('does not render an icon for the default variant', () => {
    fixture.componentRef.setInput('variant', 'default');
    fixture.componentRef.setInput('showIcon', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.au-message__icon')).toBeNull();
  });

  it('renders a semantic icon when variant is not default', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.au-message__icon')).not.toBeNull();
  });

  it('hides icon when showIcon is false', () => {
    fixture.componentRef.setInput('variant', 'info');
    fixture.componentRef.setInput('showIcon', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.au-message__icon')).toBeNull();
  });

  it('shows dismiss control and emits dismiss', () => {
    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();
    let n = 0;
    component.dismiss.subscribe(() => n++);
    const close = fixture.nativeElement.querySelector('.au-message__close') as HTMLButtonElement;
    expect(close.getAttribute('aria-label')).toBe('Dismiss message');
    close.click();
    expect(n).toBe(1);
  });

  it('applies custom close aria label', () => {
    fixture.componentRef.setInput('dismissible', true);
    fixture.componentRef.setInput('closeAriaLabel', 'Cerrar aviso');
    fixture.detectChanges();
    const close = fixture.nativeElement.querySelector('.au-message__close') as HTMLButtonElement;
    expect(close.getAttribute('aria-label')).toBe('Cerrar aviso');
  });

  it('treats null closeAriaLabel as empty', () => {
    fixture.componentRef.setInput('dismissible', true);
    fixture.componentRef.setInput('closeAriaLabel', null as unknown as string);
    fixture.detectChanges();
    const close = fixture.nativeElement.querySelector('.au-message__close') as HTMLButtonElement;
    expect(close.getAttribute('aria-label')).toBe('');
  });

  it('sets semantic variant on host', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-au-variant')).toBe('success');
  });

  it('variantIcon is null for default variant', () => {
    fixture.componentRef.setInput('variant', 'default');
    fixture.detectChanges();
    expect(component.variantIcon()).toBeNull();
  });

  it('maps variant to icon names', () => {
    fixture.componentRef.setInput('variant', 'info');
    fixture.detectChanges();
    expect(component.variantIcon()).toBe('info');
    fixture.componentRef.setInput('variant', 'warning');
    fixture.detectChanges();
    expect(component.variantIcon()).toBe('warning');
  });

  it('treats null title and message as empty', () => {
    fixture.componentRef.setInput('title', null as unknown as string);
    fixture.componentRef.setInput('message', null as unknown as string);
    fixture.detectChanges();
    expect(component.hasTitle()).toBe(false);
    expect(component.showInputMessage()).toBe(false);
  });

});

@Component({
  imports: [AuMessage],
  template: `<au-message variant="error">Projected body</au-message>`,
})
class MessageProjectionHost {}

describe('AuMessage projection', () => {
  it('renders projected content when message input is empty', () => {
    const fix = TestBed.createComponent(MessageProjectionHost);
    fix.detectChanges();
    const text = fix.nativeElement.querySelector('.au-message__text');
    expect(text?.textContent?.trim()).toBe('Projected body');
  });
});

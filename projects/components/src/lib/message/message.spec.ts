import { Component, ChangeDetectionStrategy } from '@angular/core';
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
    await fixture.whenStable();
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

  it('uses alert role on surface for error and warning', async () => {
    fixture.componentRef.setInput('variant', 'error');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.au-message__surface')?.getAttribute('role')).toBe(
      'alert',
    );

    fixture.componentRef.setInput('variant', 'warning');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.au-message__surface')?.getAttribute('role')).toBe(
      'alert',
    );
  });

  it('renders title and message', async () => {
    fixture.componentRef.setInput('title', 'Heads up');
    fixture.componentRef.setInput('message', 'Details here.');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.au-message__title')?.textContent?.trim()).toBe(
      'Heads up',
    );
    expect(fixture.nativeElement.querySelector('.au-message__text')?.textContent?.trim()).toBe(
      'Details here.',
    );
  });

  it('does not render an icon for the default variant', async () => {
    fixture.componentRef.setInput('variant', 'default');
    fixture.componentRef.setInput('showIcon', true);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.au-message__icon')).toBeNull();
  });

  it('renders a semantic icon when variant is not default', async () => {
    fixture.componentRef.setInput('variant', 'success');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.au-message__icon')).not.toBeNull();
  });

  it('hides icon when showIcon is false', async () => {
    fixture.componentRef.setInput('variant', 'info');
    fixture.componentRef.setInput('showIcon', false);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.au-message__icon')).toBeNull();
  });

  it('shows dismiss control and emits dismiss', async () => {
    fixture.componentRef.setInput('dismissible', true);
    await fixture.whenStable();
    let n = 0;
    component.dismiss.subscribe(() => n++);
    const close = fixture.nativeElement.querySelector('.au-message__close') as HTMLButtonElement;
    expect(close.getAttribute('aria-label')).toBe('Dismiss message');
    close.click();
    expect(n).toBe(1);
  });

  it('applies custom close aria label', async () => {
    fixture.componentRef.setInput('dismissible', true);
    fixture.componentRef.setInput('closeAriaLabel', 'Cerrar aviso');
    await fixture.whenStable();
    const close = fixture.nativeElement.querySelector('.au-message__close') as HTMLButtonElement;
    expect(close.getAttribute('aria-label')).toBe('Cerrar aviso');
  });

  it('treats null closeAriaLabel as empty', async () => {
    fixture.componentRef.setInput('dismissible', true);
    fixture.componentRef.setInput('closeAriaLabel', null as unknown as string);
    await fixture.whenStable();
    const close = fixture.nativeElement.querySelector('.au-message__close') as HTMLButtonElement;
    expect(close.getAttribute('aria-label')).toBe('');
  });

  it('sets semantic variant on host', async () => {
    fixture.componentRef.setInput('variant', 'success');
    await fixture.whenStable();
    expect(fixture.nativeElement.getAttribute('data-au-variant')).toBe('success');
  });

  it('variantIcon is null for default variant', async () => {
    fixture.componentRef.setInput('variant', 'default');
    await fixture.whenStable();
    expect(component.variantIcon()).toBeNull();
  });

  it('maps variant to icon names', async () => {
    fixture.componentRef.setInput('variant', 'info');
    await fixture.whenStable();
    expect(component.variantIcon()).toBe('info');
    fixture.componentRef.setInput('variant', 'warning');
    await fixture.whenStable();
    expect(component.variantIcon()).toBe('warning');
  });

  it('treats null title and message as empty', async () => {
    fixture.componentRef.setInput('title', null as unknown as string);
    fixture.componentRef.setInput('message', null as unknown as string);
    await fixture.whenStable();
    expect(component.hasTitle()).toBe(false);
    expect(component.showInputMessage()).toBe(false);
  });

  it('defaults layout to inline', () => {
    expect(fixture.nativeElement.getAttribute('data-au-layout')).toBe('inline');
  });

  it('sets banner layout on host', async () => {
    fixture.componentRef.setInput('layout', 'banner');
    await fixture.whenStable();
    expect(fixture.nativeElement.getAttribute('data-au-layout')).toBe('banner');
  });

  it('renders action button and emits action', async () => {
    fixture.componentRef.setInput('actionLabel', 'Learn more');
    await fixture.whenStable();
    let n = 0;
    component.action.subscribe(() => n++);
    const action = fixture.nativeElement.querySelector('.au-message__action') as HTMLButtonElement;
    action.click();
    expect(n).toBe(1);
  });

  it('treats null actionLabel as empty', async () => {
    fixture.componentRef.setInput('actionLabel', null as unknown as string);
    await fixture.whenStable();
    expect(component.showAction()).toBe(false);
  });

  it('maps success variant to check-circle icon', async () => {
    fixture.componentRef.setInput('variant', 'success');
    await fixture.whenStable();
    expect(component.variantIcon()).toBe('check-circle');
  });

  it('maps error variant to icon', async () => {
    fixture.componentRef.setInput('variant', 'error');
    await fixture.whenStable();
    expect(component.variantIcon()).toBe('error');
  });
});

@Component({
  imports: [AuMessage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<au-message variant="error">Projected body</au-message>`,
})
class MessageProjectionHost {}

describe('AuMessage projection', () => {
  it('renders projected content when message input is empty', async () => {
    const fix = TestBed.createComponent(MessageProjectionHost);
    await fix.whenStable();
    const text = fix.nativeElement.querySelector('.au-message__text');
    expect(text?.textContent?.trim()).toBe('Projected body');
  });
});

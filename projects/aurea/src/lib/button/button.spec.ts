import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@vitest/expect';
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
    component.size.set('lg');
    fixture.detectChanges();
    const host = fixture.nativeElement;
    expect(host.getAttribute('data-au-size')).toBe('lg');
  });

  it('sets data-au-variant attribute', () => {
    component.variant.set('outline');
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
    component.disabled.set(true);
    fixture.detectChanges();

    const emitted: MouseEvent[] = [];
    component.click.subscribe((e) => emitted.push(e));

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitted.length).toBe(0);
  });

  it('does not emit click when loading', () => {
    component.loading.set(true);
    fixture.detectChanges();

    const emitted: MouseEvent[] = [];
    component.click.subscribe((e) => emitted.push(e));

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitted.length).toBe(0);
  });

  it('sets aria-busy when loading', () => {
    component.loading.set(true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  it('sets disabled attribute when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.hasAttribute('disabled')).toBe(true);
  });
});
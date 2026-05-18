import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Card } from './card';

describe('Card', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
    }).compileComponents();
  });

  it('renders with elevated variant by default', () => {
    const fix = TestBed.createComponent(Card);
    fix.detectChanges();
    const host = fix.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-variant')).toBe('elevated');
    expect(host.classList.contains('au-card')).toBe(true);
  });

  it('applies variant attribute to host', () => {
    const fix = TestBed.createComponent(Card);
    fix.componentRef.setInput('variant', 'outlined');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-variant')).toBe('outlined');
  });

  it('applies filled variant', () => {
    const fix = TestBed.createComponent(Card);
    fix.componentRef.setInput('variant', 'filled');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-variant')).toBe('filled');
  });

  it('applies size attribute to host', () => {
    const fix = TestBed.createComponent(Card);
    fix.componentRef.setInput('size', 'sm');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('sm');
  });

  it('applies lg size', () => {
    const fix = TestBed.createComponent(Card);
    fix.componentRef.setInput('size', 'lg');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('lg');
  });

  it('default size is md', () => {
    const fix = TestBed.createComponent(Card);
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('md');
  });

  it('renders content projection', () => {
    const fix = TestBed.createComponent(TestCardComponent);
    fix.detectChanges();
    const content = fix.debugElement.query(By.css('.test-content'))!;
    expect(content).toBeTruthy();
    expect(content.nativeElement.textContent).toBe('Projected content');
  });

  it('applies padding on default projected content via au-card__content', () => {
    const fix = TestBed.createComponent(TestCardComponent);
    fix.detectChanges();
    const region = fix.debugElement.query(By.css('.au-card__content'))!.nativeElement as HTMLElement;
    const style = getComputedStyle(region);
    expect(style.paddingTop).not.toBe('0px');
    expect(style.paddingLeft).not.toBe('0px');
  });

  it('variant input has correct default value', () => {
    const fix = TestBed.createComponent(Card);
    fix.detectChanges();
    expect(fix.componentInstance.variant()).toBe('elevated');
  });

  it('size input has correct default value', () => {
    const fix = TestBed.createComponent(Card);
    fix.detectChanges();
    expect(fix.componentInstance.size()).toBe('md');
  });
});

@Component({
  selector: 'test-card',
  standalone: true,
  imports: [Card],
  template: `
    <au-card>
      <span class="test-content">Projected content</span>
    </au-card>
  `,
})
class TestCardComponent {}
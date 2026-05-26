import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuCardBody } from './card-body.directive';
import { AuCardFooter } from './card-footer.directive';
import { AuCardHeader } from './card-header.directive';
import { AuCard } from './card';

describe('AuCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuCard],
    }).compileComponents();
  });

  it('renders with elevated variant by default', () => {
    const fix = TestBed.createComponent(AuCard);
    fix.detectChanges();
    const host = fix.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-variant')).toBe('elevated');
    expect(host.classList.contains('au-card')).toBe(true);
  });

  it('applies variant attribute to host', () => {
    const fix = TestBed.createComponent(AuCard);
    fix.componentRef.setInput('variant', 'outlined');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-variant')).toBe('outlined');
  });

  it('applies filled variant', () => {
    const fix = TestBed.createComponent(AuCard);
    fix.componentRef.setInput('variant', 'filled');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-variant')).toBe('filled');
  });

  it('applies size attribute to host', () => {
    const fix = TestBed.createComponent(AuCard);
    fix.componentRef.setInput('size', 'sm');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('sm');
  });

  it('applies lg size', () => {
    const fix = TestBed.createComponent(AuCard);
    fix.componentRef.setInput('size', 'lg');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('lg');
  });

  it('default size is md', () => {
    const fix = TestBed.createComponent(AuCard);
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

  it('applies padding on default projected content via au-card__inner', () => {
    const fix = TestBed.createComponent(TestCardComponent);
    fix.detectChanges();
    const region = fix.debugElement.query(By.css('.au-card__inner'))!.nativeElement as HTMLElement;
    const style = getComputedStyle(region);
    expect(style.paddingTop).not.toBe('0px');
    expect(style.paddingLeft).not.toBe('0px');
  });

  it('zeros projected header and body block margins', () => {
    const fix = TestBed.createComponent(TestCardSlotsComponent);
    fix.detectChanges();
    const header = fix.nativeElement.querySelector('[auCardHeader]') as HTMLElement;
    const body = fix.nativeElement.querySelector('[auCardBody]') as HTMLElement;
    for (const el of [header, body]) {
      const { marginTop, marginBottom } = getComputedStyle(el);
      expect(marginTop === '0px' || marginTop === '0').toBe(true);
      expect(marginBottom === '0px' || marginBottom === '0').toBe(true);
    }
  });

  it('does not render footer when auCardFooter is absent', () => {
    const fix = TestBed.createComponent(TestCardComponent);
    fix.detectChanges();
    expect(fix.nativeElement.querySelector('.au-card__footer')).toBeNull();
  });

  it('hasFooter is false when auCardFooter is absent', () => {
    const fix = TestBed.createComponent(TestCardComponent);
    fix.detectChanges();
    const card = fix.debugElement.query(By.directive(AuCard))!.componentInstance as AuCard;
    expect(card.hasFooter()).toBe(false);
  });

  it('renders footer when auCardFooter is projected', () => {
    const fix = TestBed.createComponent(TestCardWithFooterComponent);
    fix.detectChanges();
    const footer = fix.nativeElement.querySelector('.au-card__footer');
    expect(footer).toBeTruthy();
    expect(footer?.textContent).toContain('Save');
  });

  it('hasFooter is true when auCardFooter is projected', () => {
    const fix = TestBed.createComponent(TestCardWithFooterComponent);
    fix.detectChanges();
    const card = fix.debugElement.query(By.directive(AuCard))!.componentInstance as AuCard;
    expect(card.hasFooter()).toBe(true);
  });

  it('variant input has correct default value', () => {
    const fix = TestBed.createComponent(AuCard);
    fix.detectChanges();
    expect(fix.componentInstance.variant()).toBe('elevated');
  });

  it('size input has correct default value', () => {
    const fix = TestBed.createComponent(AuCard);
    fix.detectChanges();
    expect(fix.componentInstance.size()).toBe('md');
  });
});

@Component({
  selector: 'test-card',
  imports: [AuCard],
  template: `
    <au-card>
      <span class="test-content">Projected content</span>
    </au-card>
  `,
})
class TestCardComponent {}

@Component({
  selector: 'test-card-slots',
  imports: [AuCard, AuCardHeader, AuCardBody],
  template: `
    <au-card>
      <h3 auCardHeader>Title</h3>
      <p auCardBody>Body</p>
    </au-card>
  `,
})
class TestCardSlotsComponent {}

@Component({
  selector: 'test-card-footer',
  imports: [AuCard, AuCardHeader, AuCardBody, AuCardFooter],
  template: `
    <au-card>
      <h3 auCardHeader>Title</h3>
      <p auCardBody>Body</p>
      <button
        type="button"
        auCardFooter
      >
        Save
      </button>
    </au-card>
  `,
})
class TestCardWithFooterComponent {}

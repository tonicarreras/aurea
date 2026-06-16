import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuCardFooter } from './card-footer.directive';
import { AuCard } from './card';

describe('AuCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuCard],
    }).compileComponents();
  });

  it('renders with elevated variant by default', async () => {
    const fix = TestBed.createComponent(AuCard);
    await fix.whenStable();
    const host = fix.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-variant')).toBe('elevated');
    expect(host.classList.contains('au-card')).toBe(true);
  });

  it('applies variant attribute to host', async () => {
    const fix = TestBed.createComponent(AuCard);
    fix.componentRef.setInput('variant', 'outlined');
    await fix.whenStable();
    expect(fix.nativeElement.getAttribute('data-au-variant')).toBe('outlined');
  });

  it('applies filled variant', async () => {
    const fix = TestBed.createComponent(AuCard);
    fix.componentRef.setInput('variant', 'filled');
    await fix.whenStable();
    expect(fix.nativeElement.getAttribute('data-au-variant')).toBe('filled');
  });

  it('applies size attribute to host', async () => {
    const fix = TestBed.createComponent(AuCard);
    fix.componentRef.setInput('size', 'sm');
    await fix.whenStable();
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('sm');
  });

  it('applies lg size', async () => {
    const fix = TestBed.createComponent(AuCard);
    fix.componentRef.setInput('size', 'lg');
    await fix.whenStable();
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('lg');
  });

  it('default size is md', async () => {
    const fix = TestBed.createComponent(AuCard);
    await fix.whenStable();
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('md');
  });

  it('renders content projection', async () => {
    const fix = TestBed.createComponent(TestCardComponent);
    await fix.whenStable();
    const content = fix.debugElement.query(By.css('.test-content'))!;
    expect(content.nativeElement.textContent).toBe('Projected content');
  });

  it('applies padding on default projected content via au-card__inner', async () => {
    const fix = TestBed.createComponent(TestCardComponent);
    await fix.whenStable();
    const region = fix.debugElement.query(By.css('.au-card__inner'))!.nativeElement as HTMLElement;
    const style = getComputedStyle(region);
    expect(style.paddingTop).not.toBe('0px');
    expect(style.paddingLeft).not.toBe('0px');
  });

  it('zeros projected header and body block margins', async () => {
    const fix = TestBed.createComponent(TestCardSlotsComponent);
    await fix.whenStable();
    const header = fix.nativeElement.querySelector('[auCardHeader]') as HTMLElement;
    const body = fix.nativeElement.querySelector('[auCardBody]') as HTMLElement;
    for (const el of [header, body]) {
      const { marginTop, marginBottom } = getComputedStyle(el);
      expect(marginTop === '0px' || marginTop === '0').toBe(true);
      expect(marginBottom === '0px' || marginBottom === '0').toBe(true);
    }
  });

  it('does not render footer when auCardFooter is absent', async () => {
    const fix = TestBed.createComponent(TestCardComponent);
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('.au-card__footer')).toBeNull();
  });

  it('hasFooter is false when auCardFooter is absent', async () => {
    const fix = TestBed.createComponent(TestCardComponent);
    await fix.whenStable();
    const card = fix.debugElement.query(By.directive(AuCard))!.componentInstance as AuCard;
    expect(card.hasFooter()).toBe(false);
    expect(card.footerSlot()).toBeUndefined();
  });

  it('renders footer when auCardFooter is projected', async () => {
    const fix = TestBed.createComponent(TestCardWithFooterComponent);
    await fix.whenStable();
    const footer = fix.nativeElement.querySelector('.au-card__footer');
    expect(footer?.textContent).toContain('Save');
  });

  it('hasFooter is true when auCardFooter is projected', async () => {
    const fix = TestBed.createComponent(TestCardWithFooterComponent);
    await fix.whenStable();
    const card = fix.debugElement.query(By.directive(AuCard))!.componentInstance as AuCard;
    expect(card.hasFooter()).toBe(true);
    expect(card.footerSlot()).toBeDefined();
  });

  it('variant input has correct default value', async () => {
    const fix = TestBed.createComponent(AuCard);
    await fix.whenStable();
    expect(fix.componentInstance.variant()).toBe('elevated');
  });

  it('size input has correct default value', async () => {
    const fix = TestBed.createComponent(AuCard);
    await fix.whenStable();
    expect(fix.componentInstance.size()).toBe('md');
  });

  it('does not set data-au-interactive by default', async () => {
    const fix = TestBed.createComponent(AuCard);
    await fix.whenStable();
    expect(fix.nativeElement.hasAttribute('data-au-interactive')).toBe(false);
  });

  it('sets data-au-interactive when interactive is true', async () => {
    const fix = TestBed.createComponent(AuCard);
    fix.componentRef.setInput('interactive', true);
    await fix.whenStable();
    expect(fix.nativeElement.getAttribute('data-au-interactive')).toBe('');
  });
});

@Component({
  selector: 'test-card',
  imports: [AuCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-card>
      <span class="test-content">Projected content</span>
    </au-card>
  `,
})
class TestCardComponent {}

@Component({
  selector: 'test-card-slots',
  imports: [AuCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  imports: [AuCard, AuCardFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

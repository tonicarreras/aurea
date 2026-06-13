import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuDivider } from './divider';

describe('AuDivider', () => {
  let fixture: ComponentFixture<AuDivider>;
  let component: AuDivider;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuDivider],
    }).compileComponents();

    fixture = TestBed.createComponent(AuDivider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('uses separator semantics with horizontal orientation by default', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('role')).toBe('separator');
    expect(host.getAttribute('aria-orientation')).toBe('horizontal');
    expect(host.getAttribute('data-au-orientation')).toBe('horizontal');
    expect(host.getAttribute('data-au-inset')).toBeNull();
    expect(host.getAttribute('data-au-labeled')).toBeNull();
  });

  it('applies vertical orientation',async  () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('aria-orientation')).toBe('vertical');
    expect(host.getAttribute('data-au-orientation')).toBe('vertical');
  });

  it('applies inset on the host',async  () => {
    fixture.componentRef.setInput('inset', true);
    await fixture.whenStable();
    expect(fixture.nativeElement.getAttribute('data-au-inset')).toBe('');
  });

  it('renders a centered label between rules',async  () => {
    fixture.componentRef.setInput('label', 'or');
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-labeled')).toBe('');
    expect(host.querySelector('.au-divider__label')?.textContent?.trim()).toBe('or');
    expect(host.querySelectorAll('.au-divider__rule').length).toBe(2);
  });

  it('ignores whitespace-only labels',async  () => {
    fixture.componentRef.setInput('label', '   ');
    await fixture.whenStable();
    expect(component.hasLabel()).toBe(false);
    expect(fixture.nativeElement.querySelector('.au-divider__label')).toBeNull();
  });

  it('transforms null label to empty string',async  () => {
    fixture.componentRef.setInput('label', null as unknown as string);
    await fixture.whenStable();
    expect(component.resolvedLabel()).toBe('');
    expect(component.hasLabel()).toBe(false);
  });

  it('does not render labeled layout when orientation is vertical',async  () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.componentRef.setInput('label', 'or');
    await fixture.whenStable();
    expect(fixture.nativeElement.getAttribute('data-au-labeled')).toBeNull();
    expect(fixture.nativeElement.querySelector('.au-divider__label')).toBeNull();
  });
});

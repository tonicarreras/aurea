import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Divider } from './divider';

describe('Divider', () => {
  let fixture: ComponentFixture<Divider>;
  let component: Divider;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Divider],
    }).compileComponents();

    fixture = TestBed.createComponent(Divider);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('applies vertical orientation', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('aria-orientation')).toBe('vertical');
    expect(host.getAttribute('data-au-orientation')).toBe('vertical');
  });

  it('applies inset on the host', () => {
    fixture.componentRef.setInput('inset', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-au-inset')).toBe('');
  });

  it('renders a centered label between rules', () => {
    fixture.componentRef.setInput('label', 'or');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-labeled')).toBe('');
    expect(host.querySelector('.au-divider__label')?.textContent?.trim()).toBe('or');
    expect(host.querySelectorAll('.au-divider__rule').length).toBe(2);
  });

  it('ignores whitespace-only labels', () => {
    fixture.componentRef.setInput('label', '   ');
    fixture.detectChanges();
    expect(component.hasLabel()).toBe(false);
    expect(fixture.nativeElement.querySelector('.au-divider__label')).toBeNull();
  });

  it('transforms null label to empty string', () => {
    fixture.componentRef.setInput('label', null as unknown as string);
    fixture.detectChanges();
    expect(component.resolvedLabel()).toBe('');
    expect(component.hasLabel()).toBe(false);
  });

  it('does not render labeled layout when orientation is vertical', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.componentRef.setInput('label', 'or');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-au-labeled')).toBeNull();
    expect(fixture.nativeElement.querySelector('.au-divider__label')).toBeNull();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuSkeleton } from './skeleton';

describe('AuSkeleton', () => {
  let fixture: ComponentFixture<AuSkeleton>;
  let component: AuSkeleton;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(AuSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('is decorative for assistive tech', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('role')).toBe('presentation');
    expect(host.getAttribute('aria-hidden')).toBe('true');
    expect(host.classList.contains('au-skeleton')).toBe(true);
  });

  it('defaults to text variant with pulse animation', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-variant')).toBe('text');
    expect(host.getAttribute('data-au-animation')).toBe('pulse');
    expect(host.getAttribute('data-au-size')).toBe('md');
  });

  it('applies circular variant dimensions from size', () => {
    fixture.componentRef.setInput('variant', 'circular');
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-variant')).toBe('circular');
    expect(host.style.height).toBe('3rem');
    expect(host.style.borderRadius).toBe('var(--au-radius-dot)');
  });

  it('applies custom width and height overrides', () => {
    fixture.componentRef.setInput('variant', 'rectangular');
    fixture.componentRef.setInput('width', '12rem');
    fixture.componentRef.setInput('height', '4rem');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.width).toBe('12rem');
    expect(host.style.height).toBe('4rem');
  });

  it('uses button height tokens for button variant', () => {
    fixture.componentRef.setInput('variant', 'button');
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.height).toBe('var(--au-size-field-h-sm)');
    expect(host.style.borderRadius).toBe('var(--au-radius-control)');
  });

  it('supports wave animation and none', () => {
    fixture.componentRef.setInput('animation', 'wave');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-au-animation')).toBe('wave');

    fixture.componentRef.setInput('animation', 'none');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-au-animation')).toBe('none');
  });

  it('applies rounded variant radius preset', () => {
    fixture.componentRef.setInput('variant', 'rounded');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.borderRadius).toBe('var(--au-radius-surface)');
  });

  it('applies custom radius override', () => {
    fixture.componentRef.setInput('radius', '1rem');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.borderRadius).toBe('1rem');
  });

  it('treats null radius input as undefined', () => {
    fixture.componentRef.setInput('variant', 'text');
    fixture.componentRef.setInput('radius', null as unknown as string);
    fixture.detectChanges();
    expect(fixture.nativeElement.style.borderRadius).toBe('var(--au-radius-field)');
  });

  it('treats empty width input as undefined', () => {
    fixture.componentRef.setInput('variant', 'rectangular');
    fixture.componentRef.setInput('width', '   ');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.width).toBe('100%');
  });

  it('treats null width and height inputs as undefined', () => {
    fixture.componentRef.setInput('variant', 'rectangular');
    fixture.componentRef.setInput('width', null as unknown as string);
    fixture.componentRef.setInput('height', null as unknown as string);
    fixture.detectChanges();
    expect(fixture.nativeElement.style.width).toBe('100%');
    expect(fixture.nativeElement.style.height).toBe('5rem');
  });

  it('applies text line heights for sm and lg', () => {
    fixture.componentRef.setInput('variant', 'text');
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.height).toBe('0.75rem');

    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.height).toBe('1.125rem');
  });

  it('applies circular sm and md sizes', () => {
    fixture.componentRef.setInput('variant', 'circular');
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.height).toBe('2rem');

    fixture.componentRef.setInput('size', 'md');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.height).toBe('2.5rem');
  });

  it('applies button md and lg heights', () => {
    fixture.componentRef.setInput('variant', 'button');
    fixture.componentRef.setInput('size', 'md');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.height).toBe('var(--au-size-field-h-md)');

    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.height).toBe('var(--au-touch-target-min)');
  });

  it('applies rectangular default height and radius presets', () => {
    fixture.componentRef.setInput('variant', 'rectangular');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.height).toBe('5rem');
    expect(fixture.nativeElement.style.borderRadius).toBe('var(--au-radius-control)');
  });

  it('applies text variant radius preset', () => {
    fixture.componentRef.setInput('variant', 'text');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.borderRadius).toBe('var(--au-radius-field)');
  });
});

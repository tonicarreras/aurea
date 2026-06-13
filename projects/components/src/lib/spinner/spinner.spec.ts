import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuSpinner } from './spinner';

describe('AuSpinner', () => {
  let fixture: ComponentFixture<AuSpinner>;
  let component: AuSpinner;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuSpinner],
    }).compileComponents();

    fixture = TestBed.createComponent(AuSpinner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('exposes status semantics on the host', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('role')).toBe('status');
    expect(host.getAttribute('aria-busy')).toBe('true');
    expect(host.getAttribute('aria-label')).toBe('Loading');
    expect(host.classList.contains('au-spinner')).toBe(true);
    expect(host.querySelector('.au-spinner__label')).toBeNull();
  });

  it('defaults to md size', () => {
    expect(fixture.nativeElement.getAttribute('data-au-size')).toBe('md');
    expect(fixture.nativeElement.querySelector('.au-spinner__svg')).toBeTruthy();
  });

  it('applies size on the host', async () => {
    fixture.componentRef.setInput('size', 'lg');
    await fixture.whenStable();
    expect(fixture.nativeElement.getAttribute('data-au-size')).toBe('lg');
  });

  it('shows visible label copy and links it with aria-labelledby', async () => {
    fixture.componentRef.setInput('label', 'Saving changes');
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    const labelEl = host.querySelector('.au-spinner__label');
    expect(labelEl?.textContent).toBe('Saving changes');
    expect(host.getAttribute('aria-labelledby')).toBe(labelEl?.id ?? null);
    expect(host.getAttribute('aria-label')).toBeNull();
    expect(host.classList.contains('au-spinner--labeled')).toBe(true);
  });

  it('trims whitespace from label', async () => {
    fixture.componentRef.setInput('label', '  Fetching  ');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.au-spinner__label')?.textContent).toBe('Fetching');
  });

  it('falls back to glyph-only when label is empty', async () => {
    fixture.componentRef.setInput('label', '   ');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.au-spinner__label')).toBeNull();
    expect(fixture.nativeElement.getAttribute('aria-label')).toBe('Loading');
  });

  it('omits live-region semantics when decorative', async () => {
    fixture.componentRef.setInput('decorative', true);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('role')).toBeNull();
    expect(host.getAttribute('aria-busy')).toBeNull();
    expect(host.getAttribute('aria-label')).toBeNull();
    expect(host.getAttribute('aria-hidden')).toBe('true');
    expect(host.classList.contains('au-spinner--decorative')).toBe(true);
  });

  it('hides visible label when decorative even if label is set', async () => {
    fixture.componentRef.setInput('label', 'Saving changes');
    fixture.componentRef.setInput('decorative', true);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.au-spinner__label')).toBeNull();
  });

  it('renders track and arc rings', () => {
    const svg = fixture.nativeElement.querySelector('.au-spinner__svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(fixture.nativeElement.querySelector('.au-spinner__track')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.au-spinner__arc')).toBeTruthy();
  });
});

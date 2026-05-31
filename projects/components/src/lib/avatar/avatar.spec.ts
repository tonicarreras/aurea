import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuAvatar } from './avatar';

describe('AuAvatar', () => {
  let fixture: ComponentFixture<AuAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuAvatar],
    }).compileComponents();

    fixture = TestBed.createComponent(AuAvatar);
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders initials from a full name', () => {
    fixture.componentRef.setInput('name', 'Jane Doe');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent?.trim()).toBe('JD');
    expect(fixture.nativeElement.getAttribute('role')).toBe('img');
    expect(fixture.nativeElement.getAttribute('aria-label')).toBe('Jane Doe');
  });

  it('renders single-word initials', () => {
    fixture.componentRef.setInput('name', 'Aurea');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent?.trim()).toBe('AU');
  });

  it('renders placeholder when name is empty', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent?.trim()).toBe('?');
    expect(fixture.nativeElement.getAttribute('aria-label')).toBe('?');
  });

  it('renders image when src is set', () => {
    fixture.componentRef.setInput('src', 'https://example.com/a.png');
    fixture.componentRef.setInput('alt', 'Jane Doe');
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.alt).toBe('Jane Doe');
    expect(fixture.nativeElement.getAttribute('role')).toBeNull();
  });

  it('falls back to initials when the image fails to load', () => {
    fixture.componentRef.setInput('src', 'https://example.com/broken.png');
    fixture.componentRef.setInput('alt', 'Jane Doe');
    fixture.componentRef.setInput('name', 'Jane Doe');
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img')).toBeNull();
    expect(fixture.nativeElement.textContent?.trim()).toBe('JD');
  });

  it('applies size and shape on host', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('shape', 'square');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-size')).toBe('lg');
    expect(host.getAttribute('data-au-shape')).toBe('square');
  });

  it('hides from accessibility tree when decorative', () => {
    fixture.componentRef.setInput('name', 'Jane Doe');
    fixture.componentRef.setInput('decorative', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
    expect(fixture.nativeElement.getAttribute('aria-label')).toBeNull();
  });
});

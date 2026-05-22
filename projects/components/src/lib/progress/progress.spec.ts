import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuProgress } from './progress';

describe('AuProgress', () => {
  let fixture: ComponentFixture<AuProgress>;
  let component: AuProgress;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuProgress],
    }).compileComponents();

    fixture = TestBed.createComponent(AuProgress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('exposes progressbar semantics in determinate mode', () => {
    fixture.componentRef.setInput('value', 50);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('role')).toBe('progressbar');
    expect(el.getAttribute('aria-valuenow')).toBe('50');
    expect(el.getAttribute('aria-valuemin')).toBe('0');
    expect(el.getAttribute('aria-valuemax')).toBe('100');
    expect(el.getAttribute('aria-valuetext')).toBe('50%');
    expect(el.getAttribute('aria-label')).toBe('Progress, 50%');
  });

  it('uses custom aria-valuetext from label', () => {
    fixture.componentRef.setInput('label', ' Uploading ');
    fixture.detectChanges();
    expect(component.ariaValueText()).toBe('Uploading');
  });

  it('uses Loading text in indeterminate mode', () => {
    fixture.componentRef.setInput('mode', 'indeterminate');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('aria-valuenow')).toBeNull();
    expect(component.ariaValueText()).toBe('Loading');
    expect((fixture.nativeElement as HTMLElement).getAttribute('aria-label')).toBe('Loading');
  });

  it('clamps value to max for percent', () => {
    fixture.componentRef.setInput('value', 200);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();
    expect(component.percent()).toBe(100);
  });

  it('transforms null label to empty string', () => {
    fixture.componentRef.setInput('label', null as unknown as string);
    fixture.detectChanges();
    expect(component.ariaValueText()).toBe('0%');
  });
});

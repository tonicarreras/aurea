import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuFieldset } from './fieldset';

describe('AuFieldset', () => {
  let fixture: ComponentFixture<AuFieldset>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AuFieldset] }).compileComponents();
    fixture = TestBed.createComponent(AuFieldset);
  });

  it('renders legend and description', () => {
    fixture.componentRef.setInput('legend', 'Address');
    fixture.componentRef.setInput('description', 'Shipping details');
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('.au-fieldset__legend')?.textContent).toBe('Address');
    expect(root.querySelector('.au-fieldset__description')?.textContent).toBe('Shipping details');
    expect(root.querySelector('fieldset')?.disabled).toBe(false);
  });

  it('omits legend when blank', () => {
    fixture.componentRef.setInput('legend', '   ');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.au-fieldset__legend')).toBeNull();
  });

  it('disables the native fieldset', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect((fixture.nativeElement.querySelector('fieldset') as HTMLFieldSetElement).disabled).toBe(
      true,
    );
  });

  it('coerces nullish description to empty', () => {
    fixture.componentRef.setInput('description', null as unknown as string);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.au-fieldset__description')).toBeNull();
  });

  it('coerces nullish legend to empty', () => {
    fixture.componentRef.setInput('legend', null as unknown as string);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.au-fieldset__legend')).toBeNull();
  });
});

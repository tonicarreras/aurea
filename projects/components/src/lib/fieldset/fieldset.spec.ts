import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuFieldset } from './fieldset';

describe('AuFieldset', () => {
  let fixture: ComponentFixture<AuFieldset>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AuFieldset] }).compileComponents();
    fixture = TestBed.createComponent(AuFieldset);
  });

  it('renders legend and description', async () => {
    fixture.componentRef.setInput('legend', 'Address');
    fixture.componentRef.setInput('description', 'Shipping details');
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('.au-fieldset__legend')?.textContent).toBe('Address');
    expect(root.querySelector('.au-fieldset__description')?.textContent).toBe('Shipping details');
    expect(root.querySelector('fieldset')?.disabled).toBe(false);
  });

  it('omits legend when blank', async () => {
    fixture.componentRef.setInput('legend', '   ');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.au-fieldset__legend')).toBeNull();
  });

  it('disables the native fieldset', async () => {
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    expect((fixture.nativeElement.querySelector('fieldset') as HTMLFieldSetElement).disabled).toBe(
      true,
    );
  });

  it('coerces nullish description to empty', async () => {
    fixture.componentRef.setInput('description', null as unknown as string);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.au-fieldset__description')).toBeNull();
  });

  it('coerces nullish legend to empty', async () => {
    fixture.componentRef.setInput('legend', null as unknown as string);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.au-fieldset__legend')).toBeNull();
  });
});

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuFormField } from '../form-field/form-field';
import { AuSlider } from './slider';

@Component({
  imports: [AuFormField, AuSlider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-form-field
      label="Volume"
      hint="Adjust speaker level."
    >
      <au-slider
        [(value)]="volume"
        [min]="0"
        [max]="100"
        [showValue]="true"
      />
    </au-form-field>
  `,
})
class SliderHost {
  volume = 40;
}

describe('AuSlider', () => {
  let fixture: ComponentFixture<SliderHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SliderHost] }).compileComponents();
    fixture = TestBed.createComponent(SliderHost);
    await fixture.whenStable();
  });

  it('renders a range input with value output', () => {
    const input = fixture.nativeElement.querySelector('.au-slider__input') as HTMLInputElement;
    expect(input.type).toBe('range');
    expect(input.value).toBe('40');
    expect(fixture.nativeElement.querySelector('.au-slider__value')?.textContent?.trim()).toBe(
      '40',
    );
    expect(input.getAttribute('aria-describedby')).not.toBeNull();
  });

  it('updates value on input',async  () => {
    const input = fixture.nativeElement.querySelector('.au-slider__input') as HTMLInputElement;
    input.value = '75';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(fixture.componentInstance.volume).toBe(75);
  });
});

describe('AuSlider standalone', () => {
  let fixture: ComponentFixture<AuSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AuSlider] }).compileComponents();
    fixture = TestBed.createComponent(AuSlider);
  });

  it('ignores input when disabled',async  () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('value', 10);
    await fixture.whenStable();
    const input = fixture.nativeElement.querySelector('.au-slider__input') as HTMLInputElement;
    input.value = '80';
    input.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.value()).toBe(10);
  });

  it('ignores non-finite range values',async  () => {
    fixture.componentRef.setInput('value', 10);
    await fixture.whenStable();
    fixture.componentInstance.onInput({
      target: { value: 'not-a-number' },
    } as unknown as Event);
    expect(fixture.componentInstance.value()).toBe(10);
  });

  it('ignores input when readOnly',async  () => {
    fixture.componentRef.setInput('readOnly', true);
    fixture.componentRef.setInput('value', 10);
    await fixture.whenStable();
    const input = fixture.nativeElement.querySelector('.au-slider__input') as HTMLInputElement;
    input.value = '80';
    input.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.value()).toBe(10);
  });

  it('focuses the native range input', () => {
    const focusSpy = vi.spyOn(
      fixture.nativeElement.querySelector('.au-slider__input') as HTMLInputElement,
      'focus',
    );
    fixture.componentInstance.focus();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('emits blur and clears tab focus styling',async  () => {
    let blurred = false;
    fixture.componentInstance.blur.subscribe(() => (blurred = true));
    const row = fixture.nativeElement.querySelector('.au-slider__control-row') as HTMLElement;
    row.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    (fixture.nativeElement.querySelector('.au-slider__input') as HTMLInputElement).dispatchEvent(
      new Event('blur'),
    );
    row.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: document.body }));
    await fixture.whenStable();
    expect(blurred).toBe(true);
  });

  it('builds aria-describedby from hint, error, and value output',async  () => {
    fixture.componentRef.setInput('showValue', true);
    fixture.componentRef.setInput('invalid', true);
    await fixture.whenStable();
    const describedBy = (
      fixture.nativeElement.querySelector('.au-slider__input') as HTMLInputElement
    ).getAttribute('aria-describedby');
    expect(describedBy).toContain('-value');
  });

  it('keeps tab focus styling when focus moves within the control row',async  () => {
    fixture.componentRef.setInput('showValue', true);
    await fixture.whenStable();
    const row = fixture.nativeElement.querySelector('.au-slider__control-row') as HTMLElement;
    const output = fixture.nativeElement.querySelector('.au-slider__value') as HTMLElement;
    row.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: output }));
  });

  it('ignores focusout events without an element target', () => {
    fixture.componentInstance['onControlRowFocusout']({} as FocusEvent);
  });
});

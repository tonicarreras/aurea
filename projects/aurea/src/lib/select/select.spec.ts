import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { Select, SelectOption } from './select';

describe('Select', () => {
  const testOptions: SelectOption[] = [
    { value: 'opt1', label: 'Option One' },
    { value: 'opt2', label: 'Option Two' },
    { value: 'opt3', label: 'Option Three' },
  ];

  function querySelect(fixture: ComponentFixture<Select>): HTMLSelectElement {
    return fixture.debugElement.query(By.css('.au-select__element'))!.nativeElement as HTMLSelectElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Select],
    }).compileComponents();
  });

  it('binds value on change (model) and select reflects value', async () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const comp = fix.componentInstance;
    const el = querySelect(fix);
    el.value = 'opt2';
    el.dispatchEvent(new Event('change'));
    fix.detectChanges();
    expect(comp.value()).toBe('opt2');
  });

  it('emits valueChange via outputToObservable', async () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    fix.detectChanges();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.valueChange).pipe(take(1))),
    );
    const el = querySelect(fix);
    el.value = 'opt3';
    el.dispatchEvent(new Event('change'));
    const v = await p;
    expect(v).toBe('opt3');
  });

  it('shows error, aria-errormessage, and invalid on the select', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('id', 'f-select');
    fix.componentRef.setInput('errorMessage', 'This field is required');
    fix.detectChanges();
    const select = querySelect(fix);
    expect(select.getAttribute('aria-invalid')).toBe('true');
    expect(select.getAttribute('aria-errormessage')).toBe('f-select-error');
    const errText = fix.debugElement.query(By.css('.au-select__error-text'));
    expect(errText?.nativeElement.textContent?.trim()).toBe('This field is required');
  });

  it('does not emit when disabled and changing', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () => outputToObservable(comp.valueChange).subscribe(() => n++));
    fix.detectChanges();
    const el = querySelect(fix);
    el.value = 'opt2';
    el.dispatchEvent(new Event('change'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('renders placeholder option when provided', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('placeholder', 'Select one...');
    fix.detectChanges();
    const options = fix.debugElement.queryAll(By.css('option'));
    expect(options.length).toBe(4); // placeholder + 3 options
    expect(options[0].nativeElement.value).toBe('');
    expect(options[0].nativeElement.textContent).toBe('Select one...');
  });

  it('renders option disabled when option has disabled flag', () => {
    const optionsWithDisabled: SelectOption[] = [
      { value: 'opt1', label: 'Option One' },
      { value: 'opt2', label: 'Option Two', disabled: true },
    ];
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', optionsWithDisabled);
    fix.detectChanges();
    const options = fix.debugElement.queryAll(By.css('option'));
    expect(options[1].nativeElement.disabled).toBe(true);
  });

  it('renders label when provided', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('label', 'Choose option');
    fix.detectChanges();
    const label = fix.debugElement.query(By.css('.au-select__label'));
    expect(label?.nativeElement.textContent).toContain('Choose option');
  });
});
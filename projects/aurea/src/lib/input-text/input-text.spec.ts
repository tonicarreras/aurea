import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { InputText } from './input-text';

describe('InputText', () => {
  function queryInput(fixture: ComponentFixture<InputText>): HTMLInputElement {
    return fixture.debugElement.query(By.css('.au-input-text__input'))!.nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputText],
    }).compileComponents();
  });

  it('binds value on input (model) and input reflects value', async () => {
    const fix = TestBed.createComponent(InputText);
    fix.detectChanges();
    const comp = fix.componentInstance;
    const el = queryInput(fix);
    el.value = 'hello';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(comp.value()).toBe('hello');
  });

  it('emits valueChange via outputToObservable', async () => {
    const fix = TestBed.createComponent(InputText);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    fix.detectChanges();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.valueChange).pipe(take(1))),
    );
    const el = queryInput(fix);
    el.value = 'x';
    el.dispatchEvent(new Event('input'));
    const v = await p;
    expect(v).toBe('x');
  });

  it('shows error, aria-errormessage, and invalid on the input (not the host)', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('id', 'f-email');
    fix.componentRef.setInput('errorMessage', 'This field is required');
    fix.detectChanges();
    const input = queryInput(fix);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-errormessage')).toBe('f-email-error');
    const errText = fix.debugElement.query(By.css('.au-input-text__error-text'));
    expect(errText?.nativeElement.textContent?.trim()).toBe('This field is required');
  });

  it('does not emit when disabled and typing', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('disabled', true);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () => outputToObservable(comp.valueChange).subscribe(() => n++));
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = 'x';
    el.dispatchEvent(new Event('input'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });
});

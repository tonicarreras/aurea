import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { Textarea } from './textarea';

describe('Textarea', () => {
  function queryTextarea(fixture: ComponentFixture<Textarea>): HTMLTextAreaElement {
    return fixture.debugElement.query(By.css('.au-textarea__input'))!.nativeElement as HTMLTextAreaElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Textarea],
    }).compileComponents();
  });

  it('binds value on input (model) and textarea reflects value', async () => {
    const fix = TestBed.createComponent(Textarea);
    fix.detectChanges();
    const comp = fix.componentInstance;
    const el = queryTextarea(fix);
    el.value = 'line\n2';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(comp.value()).toBe('line\n2');
  });

  it('emits valueChange via outputToObservable', async () => {
    const fix = TestBed.createComponent(Textarea);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    fix.detectChanges();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.valueChange).pipe(take(1))),
    );
    const el = queryTextarea(fix);
    el.value = 'change';
    el.dispatchEvent(new Event('input'));
    const v = await p;
    expect(v).toBe('change');
  });

  it('shows error, aria-errormessage, and invalid on the textarea', () => {
    const fix = TestBed.createComponent(Textarea);
    fix.componentRef.setInput('id', 'f-bio');
    fix.componentRef.setInput('errorMessage', 'Too short');
    fix.detectChanges();
    const ta = queryTextarea(fix);
    expect(ta.getAttribute('aria-invalid')).toBe('true');
    expect(ta.getAttribute('aria-errormessage')).toBe('f-bio-error');
    const err = fix.debugElement.query(By.css('.au-textarea__error-text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('Too short');
  });
});

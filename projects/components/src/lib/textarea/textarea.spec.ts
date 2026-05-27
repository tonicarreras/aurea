import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuTextarea } from './textarea';
import {
  AuTextareaTestHost,
  applyFieldHarnessInputs,
  createFieldFixture,
  queryControl,
} from '../form-field/form-field.spec-hosts';

describe('AuTextarea', () => {
  function CONTROL(fixture: ComponentFixture<AuTextareaTestHost>) {
    return queryControl(fixture, AuTextarea);
  }

  function queryTextarea(fixture: ComponentFixture<AuTextareaTestHost>): HTMLTextAreaElement {
    return fixture.debugElement.query(By.css('textarea'))!.nativeElement as HTMLTextAreaElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuTextareaTestHost],
    }).compileComponents();
  });

  it('binds value on input (model) and textarea reflects value', async () => {
    const fix = createFieldFixture(AuTextareaTestHost);
    fix.detectChanges();
    const comp = CONTROL(fix);
    const el = queryTextarea(fix);
    el.value = 'line\n2';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(comp.value()).toBe('line\n2');
  });

  it('sets null when cleared', () => {
    const fix = createFieldFixture(AuTextareaTestHost, { label: 'Notes' }, (f) => {
      f.componentInstance.value = 'text';
    });
    const el = queryTextarea(fix);
    el.value = '';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('inputDisplay is empty when value is null', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      applyFieldHarnessInputs(f, { label: 'x' });
    });
    expect(CONTROL(fix).inputDisplay()).toBe('');
  });

  it('emits valueChange via outputToObservable', async () => {
    const fix = createFieldFixture(AuTextareaTestHost);
    const comp = CONTROL(fix);
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
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      applyFieldHarnessInputs(f, { controlId: 'f-bio' });
      applyFieldHarnessInputs(f, { errorMessage: 'Too short' });
    });
    const ta = queryTextarea(fix);
    expect(ta.getAttribute('aria-invalid')).toBe('true');
    expect(ta.getAttribute('aria-errormessage')).toBe('f-bio-error');
    const err = fix.debugElement.query(By.css('[role="alert"]'));
    expect(err?.nativeElement.textContent?.trim()).toContain('Too short');
  });

  it('onControlRowFocusin runs', () => {
    const fix = createFieldFixture(AuTextareaTestHost);
    CONTROL(fix).onControlRowFocusin();
  });

  it('emits blur from native blur', () => {
    const fix = createFieldFixture(AuTextareaTestHost);
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    fix.detectChanges();
    queryTextarea(fix).dispatchEvent(new FocusEvent('blur'));
    expect(n).toBe(1);
  });

  it('focus() focuses the native textarea', () => {
    const fix = createFieldFixture(AuTextareaTestHost);
    fix.detectChanges();
    const el = queryTextarea(fix);
    const spy = vi.spyOn(el, 'focus');
    CONTROL(fix).focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('sets hint and aria-describedby', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      applyFieldHarnessInputs(f, { hint: 'Max 500 chars' });
    });
    const ta = queryTextarea(fix);
    const hint = fix.debugElement.query(By.css('[id$="-hint"]'))!.nativeElement;
    expect(ta.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('shows required marker when required and showRequired', () => {
    const fix = createFieldFixture(AuTextareaTestHost, { label: 'Bio' }, (f) => {
      f.componentInstance.required = true;
    });
    const label = fix.debugElement.query(By.css('label[for]'))!.nativeElement;
    expect(label.textContent?.replace(/\s+/g, ' ').trim()).toContain('*');
  });

  it('hides required marker when showRequired false', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      applyFieldHarnessInputs(f, { label: 'Bio' });
      f.componentInstance.required = true;
      f.componentRef.setInput('ffShowRequired', false);
    });
    const label = fix.debugElement.query(By.css('label[for]'))!.nativeElement;
    expect(label.textContent).not.toContain('*');
  });

  it('sets wrap hard attribute', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      f.componentInstance.wrap = 'hard';
    });
    expect(queryTextarea(fix).getAttribute('wrap')).toBe('hard');
  });

  it('sets spellcheck when true or false', () => {
    const fixTrue = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      f.componentInstance.spellcheck = true;
    });
    expect(queryTextarea(fixTrue).getAttribute('spellcheck')).toBe('true');

    const fixFalse = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      f.componentInstance.spellcheck = false;
    });
    expect(queryTextarea(fixFalse).getAttribute('spellcheck')).toBe('false');

    const fixUndef = createFieldFixture(AuTextareaTestHost);
    fixUndef.detectChanges();
    expect(queryTextarea(fixUndef).getAttribute('spellcheck')).toBeNull();
  });

  it('binds resize style', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      f.componentInstance.resize = 'none';
    });
    expect(queryTextarea(fix).style.resize).toBe('none');
  });

  it('sets rows and cols', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      f.componentInstance.rows = 6;
      f.componentInstance.cols = 40;
    });
    const ta = queryTextarea(fix);
    expect(ta.getAttribute('rows')).toBe('6');
    expect(ta.getAttribute('cols')).toBe('40');
  });

  it('sets readOnly', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      f.componentInstance.readOnly = true;
    });
    expect(queryTextarea(fix).readOnly).toBe(true);
  });

  it('shows error from errors when no manual message', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      f.componentInstance.errors = [{ kind: 'maxLength', message: 'Too long' }] as any;
    });
    const err = fix.debugElement.query(By.css('[role="alert"]'));
    expect(err?.nativeElement.textContent?.trim()).toContain('Too long');
  });

  it('uses kind when message missing in errors', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      f.componentInstance.errors = [{ kind: 'required' }] as any;
    });
    const err = fix.debugElement.query(By.css('[role="alert"]'));
    expect(err?.nativeElement.textContent?.trim()).toContain('required');
  });

  it('marks aria-invalid when invalid without message', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      f.componentInstance.invalid = true;
    });
    expect(queryTextarea(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('does not emit when disabled', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      f.componentInstance.disabled = true;
    });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () =>
      outputToObservable(comp.valueChange).subscribe(() => n++),
    );
    fix.detectChanges();
    const el = queryTextarea(fix);
    el.value = 'x';
    el.dispatchEvent(new Event('input'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('generates id when id omitted', () => {
    const fix = createFieldFixture(AuTextareaTestHost);
    fix.detectChanges();
    expect(queryTextarea(fix).id.startsWith('au-field-')).toBe(true);
  });

  it('onControlRowFocusout ignores non-HTMLElement', () => {
    const fix = createFieldFixture(AuTextareaTestHost);
    fix.detectChanges();
    CONTROL(fix).onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout returns when focus stays inside row', () => {
    const fix = createFieldFixture(AuTextareaTestHost);
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('div:has(> textarea)'))!.nativeElement;
    const ta = queryTextarea(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: ta });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(ev);
  });

  it('prefers manual errorMessage over errors', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      applyFieldHarnessInputs(f, { errorMessage: 'Manual' });
      f.componentInstance.errors = [{ kind: 'x', message: 'ignored' }] as any;
    });
    expect(
      fix.debugElement.query(By.css('[role="alert"]'))?.nativeElement.textContent?.trim(),
    ).toContain('Manual');
  });

  it('applies and clears from-tab on control row', () => {
    const fix = createFieldFixture(AuTextareaTestHost);
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('div:has(> textarea)'))!.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement
      .query(By.css('.au-textarea__control-row'))!
      .triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(row.classList.contains('au-textarea__control-row--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    fix.detectChanges();
    expect(row.classList.contains('au-textarea__control-row--from-tab')).toBe(false);
  });

  it('displayError returns empty when first error has no usable message or kind', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      f.componentInstance.errors = [{ message: '', kind: '' }];
    });
    expect(CONTROL(fix).displayError()).toBe('');
  });

  it('placeholder transform passes through non-null strings', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      f.componentInstance.placeholder = 'Type here';
    });
    expect(CONTROL(fix).placeholder()).toBe('Type here');
  });

  it('coerces numeric placeholder through transform', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      f.componentInstance.placeholder = 42 as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('42');
  });

  it('normalizes nullish placeholder transform', () => {
    const fix = createFieldFixture(AuTextareaTestHost, undefined, (f) => {
      f.componentInstance.placeholder = undefined as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('');
  });
});

import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuTextarea } from './textarea';

describe('AuTextarea', () => {
  function queryTextarea(fixture: ComponentFixture<AuTextarea>): HTMLTextAreaElement {
    return fixture.debugElement.query(By.css('.au-textarea__input'))!.nativeElement as HTMLTextAreaElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuTextarea],
    }).compileComponents();
  });

  it('binds value on input (model) and textarea reflects value', async () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.detectChanges();
    const comp = fix.componentInstance;
    const el = queryTextarea(fix);
    el.value = 'line\n2';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(comp.value()).toBe('line\n2');
  });

  it('sets null when cleared', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('label', 'Notes');
    fix.componentRef.setInput('value', 'text');
    fix.detectChanges();
    const el = queryTextarea(fix);
    el.value = '';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('inputDisplay is empty when value is null', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('label', 'x');
    fix.detectChanges();
    expect(fix.componentInstance.inputDisplay()).toBe('');
  });

  it('emits valueChange via outputToObservable', async () => {
    const fix = TestBed.createComponent(AuTextarea);
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
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('id', 'f-bio');
    fix.componentRef.setInput('errorMessage', 'Too short');
    fix.detectChanges();
    const ta = queryTextarea(fix);
    expect(ta.getAttribute('aria-invalid')).toBe('true');
    expect(ta.getAttribute('aria-errormessage')).toBe('f-bio-error');
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('Too short');
  });

  it('emits blur from native blur', () => {
    const fix = TestBed.createComponent(AuTextarea);
    let n = 0;
    fix.componentInstance.blur.subscribe(() => n++);
    fix.detectChanges();
    queryTextarea(fix).dispatchEvent(new FocusEvent('blur'));
    expect(n).toBe(1);
  });

  it('focus() focuses the native textarea', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.detectChanges();
    const el = queryTextarea(fix);
    const spy = vi.spyOn(el, 'focus');
    fix.componentInstance.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('sets hint and aria-describedby', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('hint', 'Max 500 chars');
    fix.detectChanges();
    const ta = queryTextarea(fix);
    const hint = fix.debugElement.query(By.css('.au-textarea__hint'))!.nativeElement;
    expect(ta.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('shows required marker when required and showRequired', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('label', 'Bio');
    fix.componentRef.setInput('required', true);
    fix.detectChanges();
    const label = fix.debugElement.query(By.css('.au-textarea__label'))!.nativeElement;
    expect(label.textContent?.replace(/\s+/g, ' ').trim()).toContain('*');
  });

  it('hides required marker when showRequired false', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('label', 'Bio');
    fix.componentRef.setInput('required', true);
    fix.componentRef.setInput('showRequired', false);
    fix.detectChanges();
    const label = fix.debugElement.query(By.css('.au-textarea__label'))!.nativeElement;
    expect(label.textContent).not.toContain('*');
  });

  it('sets wrap hard attribute', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('wrap', 'hard');
    fix.detectChanges();
    expect(queryTextarea(fix).getAttribute('wrap')).toBe('hard');
  });

  it('sets spellcheck when true or false', () => {
    const fixTrue = TestBed.createComponent(AuTextarea);
    fixTrue.componentRef.setInput('spellcheck', true);
    fixTrue.detectChanges();
    expect(queryTextarea(fixTrue).getAttribute('spellcheck')).toBe('true');

    const fixFalse = TestBed.createComponent(AuTextarea);
    fixFalse.componentRef.setInput('spellcheck', false);
    fixFalse.detectChanges();
    expect(queryTextarea(fixFalse).getAttribute('spellcheck')).toBe('false');

    const fixUndef = TestBed.createComponent(AuTextarea);
    fixUndef.detectChanges();
    expect(queryTextarea(fixUndef).getAttribute('spellcheck')).toBeNull();
  });

  it('binds resize style', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('resize', 'none');
    fix.detectChanges();
    expect(queryTextarea(fix).style.resize).toBe('none');
  });

  it('sets rows and cols', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('rows', 6);
    fix.componentRef.setInput('cols', 40);
    fix.detectChanges();
    const ta = queryTextarea(fix);
    expect(ta.getAttribute('rows')).toBe('6');
    expect(ta.getAttribute('cols')).toBe('40');
  });

  it('sets readOnly', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    expect(queryTextarea(fix).readOnly).toBe(true);
  });

  it('shows error from errors when no manual message', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('errors', [{ kind: 'maxLength', message: 'Too long' }] as any);
    fix.detectChanges();
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('Too long');
  });

  it('uses kind when message missing in errors', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('errors', [{ kind: 'required' }] as any);
    fix.detectChanges();
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('required');
  });

  it('marks aria-invalid when invalid without message', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('invalid', true);
    fix.detectChanges();
    expect(queryTextarea(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('does not emit when disabled', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('disabled', true);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () => outputToObservable(comp.valueChange).subscribe(() => n++));
    fix.detectChanges();
    const el = queryTextarea(fix);
    el.value = 'x';
    el.dispatchEvent(new Event('input'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('generates id when id omitted', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.detectChanges();
    expect(queryTextarea(fix).id.startsWith('au-textarea-')).toBe(true);
  });

  it('onControlRowFocusout ignores non-HTMLElement', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.detectChanges();
    fix.componentInstance.onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout returns when focus stays inside row', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-textarea__control-row'))!.nativeElement;
    const ta = queryTextarea(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: ta });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(ev);
  });

  it('prefers manual errorMessage over errors', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('errorMessage', 'Manual');
    fix.componentRef.setInput('errors', [{ kind: 'x', message: 'ignored' }] as any);
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-field-error__text'))?.nativeElement.textContent?.trim()).toBe('Manual');
  });

  it('applies and clears from-tab on control row', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-textarea__control-row'))!.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement.query(By.css('.au-textarea__control-row'))!.triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(row.classList.contains('au-textarea__control-row--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(out);
    fix.detectChanges();
    expect(row.classList.contains('au-textarea__control-row--from-tab')).toBe(false);
  });

  it('normalizes nullish string inputs in transforms', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('label', null as unknown as string);
    fix.componentRef.setInput('hint', undefined as unknown as string);
    fix.componentRef.setInput('errorMessage', null as unknown as string);
    fix.componentRef.setInput('placeholder', undefined as unknown as string);
    fix.detectChanges();
    expect(fix.componentInstance.label()).toBe('');
    expect(fix.componentInstance.hint()).toBe('');
    expect(fix.componentInstance.errorMessage()).toBe('');
    expect(fix.componentInstance.placeholder()).toBe('');
  });

  it('displayError returns empty when first error has no usable message or kind', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('errors', [{ message: '', kind: '' }] as any);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('');
  });

  it('placeholder transform passes through non-null strings', () => {
    const fix = TestBed.createComponent(AuTextarea);
    fix.componentRef.setInput('placeholder', 'Type here');
    fix.detectChanges();
    expect(fix.componentInstance.placeholder()).toBe('Type here');
  });
});

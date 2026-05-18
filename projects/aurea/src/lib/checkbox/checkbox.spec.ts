import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  function queryInput(fixture: ComponentFixture<Checkbox>): HTMLInputElement {
    return fixture.debugElement.query(By.css('.au-checkbox__element'))!.nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkbox],
    }).compileComponents();
  });

  it('binds checked value on change (model)', async () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.detectChanges();
    const comp = fix.componentInstance;
    const el = queryInput(fix);
    el.checked = true;
    el.dispatchEvent(new Event('change'));
    fix.detectChanges();
    expect(comp.checked()).toBe(true);
  });

  it('emits checkedChange via outputToObservable', async () => {
    const fix = TestBed.createComponent(Checkbox);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    fix.detectChanges();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.checkedChange).pipe(take(1))),
    );
    const el = queryInput(fix);
    el.checked = true;
    el.dispatchEvent(new Event('change'));
    const v = await p;
    expect(v).toBe(true);
  });

  it('shows label and links via for/id', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('label', 'Accept terms');
    fix.componentRef.setInput('id', 'test-checkbox');
    fix.componentRef.setInput('required', true);
    fix.detectChanges();
    const label = fix.debugElement.query(By.css('.au-checkbox__label'));
    expect(label?.nativeElement.textContent?.trim()).toBe('Accept terms*');
    const input = queryInput(fix);
    expect(input.id).toBe('test-checkbox');
  });

  it('sets aria-checked for indeterminate state', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('indeterminate', true);
    fix.detectChanges();
    const input = queryInput(fix);
    expect(input.getAttribute('aria-checked')).toBe('mixed');
  });

  it('shows description with aria-describedby', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('label', 'Subscribe');
    fix.componentRef.setInput('description', 'Weekly updates');
    fix.detectChanges();
    const input = queryInput(fix);
    const desc = fix.debugElement.query(By.css('.au-checkbox__description'));
    expect(desc?.nativeElement.id.length).toBeGreaterThan(0);
    expect(input.getAttribute('aria-describedby')).toBe(desc?.nativeElement.id);
    expect(desc?.nativeElement.textContent?.trim()).toBe('Weekly updates');
  });

  it('shows manual errorMessage, aria-invalid, and aria-errormessage', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('label', 'Agree');
    fix.componentRef.setInput('errorMessage', 'You must accept.');
    fix.detectChanges();
    const input = queryInput(fix);
    const err = fix.debugElement.query(By.css('.au-checkbox__error'));
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-errormessage')).toBe(err?.nativeElement.id);
    expect(err?.nativeElement.getAttribute('role')).toBe('alert');
    expect(err?.nativeElement.textContent?.replace(/\s+/g, ' ').trim()).toContain('You must accept.');
    const wrap = fix.debugElement.query(By.css('.au-checkbox__wrapper'))!.nativeElement;
    expect(wrap.classList.contains('au-checkbox__wrapper--invalid')).toBe(true);
  });

  it('uses first signal-form errors entry when errorMessage is empty', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('label', 'Agree');
    fix.componentRef.setInput('errors', [{ kind: 'required', message: 'Required field' }]);
    fix.detectChanges();
    const err = fix.debugElement.query(By.css('.au-checkbox__error'));
    expect(err?.nativeElement.textContent?.replace(/\s+/g, ' ').trim()).toContain('Required field');
  });

  it('uses kind when message missing in errors', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('label', 'Agree');
    fix.componentRef.setInput('errors', [{ kind: 'pattern' }] as any);
    fix.detectChanges();
    const err = fix.debugElement.query(By.css('.au-checkbox__error-text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('pattern');
  });

  it('displayError returns empty when first error has no usable message or kind', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('label', 'Agree');
    fix.componentRef.setInput('errors', [{ message: '', kind: '' }] as any);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('');
  });

  it('sets aria-invalid from invalid input without visible error text', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('label', 'Agree');
    fix.componentRef.setInput('invalid', true);
    fix.detectChanges();
    const input = queryInput(fix);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(fix.debugElement.query(By.css('.au-checkbox__error'))).toBeNull();
    expect(input.getAttribute('aria-errormessage')).toBeNull();
  });

  it('does not emit when disabled', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('disabled', true);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () => outputToObservable(comp.checkedChange).subscribe(() => n++));
    fix.detectChanges();
    const el = queryInput(fix);
    el.checked = true;
    el.dispatchEvent(new Event('change'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('sets name and size on host and input', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('name', 'agree');
    fix.componentRef.setInput('size', 'sm');
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('name')).toBe('agree');
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('sm');
  });

  it('onFocusHost is a no-op (legacy compat, no blur emission)', () => {
    const fix = TestBed.createComponent(Checkbox);
    let n = 0;
    fix.componentInstance.blur.subscribe(() => n++);
    fix.componentInstance.onFocusHost();
    expect(n).toBe(0);
  });

  it('focus() focuses the native input', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.detectChanges();
    const el = queryInput(fix);
    const spy = vi.spyOn(el, 'focus');
    fix.componentInstance.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('generates id when id input is empty', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.detectChanges();
    expect(queryInput(fix).id.startsWith('au-checkbox-')).toBe(true);
  });

  it('sets aria-checked true when checked', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('checked', true);
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('aria-checked')).toBe('true');
  });

  it('does not set aria-describedby without description', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('label', 'Only');
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('aria-describedby')).toBeNull();
  });

  it('onFocusout returns early for non-HTMLElement currentTarget', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.detectChanges();
    const ev = { currentTarget: {}, relatedTarget: null } as unknown as FocusEvent;
    fix.componentInstance.onFocusout(ev);
  });

  it('onFocusout returns when focus stays inside wrapper', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('label', 'X');
    fix.detectChanges();
    const wrapper = fix.debugElement.query(By.css('.au-checkbox__wrapper'))!.nativeElement;
    const label = fix.debugElement.query(By.css('.au-checkbox__label'))!.nativeElement;
    const ev = new FocusEvent('focusout', { relatedTarget: label });
    Object.defineProperty(ev, 'currentTarget', { value: wrapper, configurable: true });
    fix.componentInstance.onFocusout(ev);
  });

  it('sets aria-required when required', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('required', true);
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('aria-required')).toBe('true');
  });

  it('clears focus-by-tab when focus leaves wrapper', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('label', 'X');
    fix.detectChanges();
    const wrapDe = fix.debugElement.query(By.css('.au-checkbox__wrapper'))!;
    const wrap = wrapDe.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    wrapDe.triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(wrap.classList.contains('au-checkbox__wrapper--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: wrap, configurable: true });
    fix.componentInstance.onFocusout(out);
    fix.detectChanges();
    expect(wrap.classList.contains('au-checkbox__wrapper--from-tab')).toBe(false);
  });

  it('normalizes nullish label, description, and errorMessage transforms', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('label', null as unknown as string);
    fix.componentRef.setInput('description', undefined as unknown as string);
    fix.componentRef.setInput('errorMessage', null as unknown as string);
    fix.detectChanges();
    expect(fix.componentInstance.label()).toBe('');
    expect(fix.componentInstance.description()).toBe('');
    expect(fix.componentInstance.errorMessage()).toBe('');
  });

  it('stringifies non-null label and description', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('label', 'A');
    fix.componentRef.setInput('description', 'B');
    fix.detectChanges();
    expect(fix.componentInstance.label()).toBe('A');
    expect(fix.componentInstance.description()).toBe('B');
  });
});
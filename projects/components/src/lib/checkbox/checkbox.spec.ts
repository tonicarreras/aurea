import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { describe, expect, it, vi } from 'vitest';
import { AU_FIELD_AUTO_ID_PATTERN } from '../form-field/au-field-id-generator';
import { AuCheckbox } from './au-checkbox.directive';
import {
  AuCheckboxTestHost,
  applyFieldHarnessInputs,
  createFieldFixture,
  queryControl,
} from '../form-field/form-field.spec-hosts';

describe('AuCheckbox standalone', () => {
  @Component({
    imports: [AuCheckbox],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<input
      type="checkbox"
      auCheckbox
      [label]="label"
    />`,
  })
  class StandaloneHost {
    label = 'Accept terms';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandaloneHost],
    }).compileComponents();
  });

  it('renders without a parent au-form-field', async () => {
    const fix = TestBed.createComponent(StandaloneHost);
    await fix.whenStable();
    const input = fix.nativeElement.querySelector('.au-checkbox__element') as HTMLInputElement;
    expect(input.id).toMatch(AU_FIELD_AUTO_ID_PATTERN);
    expect(fix.nativeElement.querySelector('.au-checkbox__label')?.textContent).toContain(
      'Accept terms',
    );
  });
});

describe('AuCheckbox', () => {
  function CONTROL(fixture: ComponentFixture<AuCheckboxTestHost>) {
    return queryControl(fixture, AuCheckbox);
  }

  function queryInput(fixture: ComponentFixture<AuCheckboxTestHost>): HTMLInputElement {
    return fixture.debugElement.query(By.css('.au-checkbox__element'))!
      .nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuCheckboxTestHost],
    }).compileComponents();
  });

  it('onInput updates checked from native input event', () => {
    const fix = createFieldFixture(AuCheckboxTestHost);
    const el = queryInput(fix);
    el.checked = true;
    const ev = new Event('input');
    Object.defineProperty(ev, 'target', { value: el, configurable: true });
    CONTROL(fix).onInput(ev);
    expect(CONTROL(fix).checked()).toBe(true);
  });

  it('binds checked value on change (model)', async () => {
    const fix = createFieldFixture(AuCheckboxTestHost);
    await fix.whenStable();
    const comp = CONTROL(fix);
    const el = queryInput(fix);
    el.checked = true;
    el.dispatchEvent(new Event('change'));
    await fix.whenStable();
    expect(comp.checked()).toBe(true);
  });

  it('emits checkedChange via outputToObservable', async () => {
    const fix = createFieldFixture(AuCheckboxTestHost);
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    await fix.whenStable();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.checked).pipe(take(1))),
    );
    const el = queryInput(fix);
    el.checked = true;
    el.dispatchEvent(new Event('change'));
    const v = await p;
    expect(v).toBe(true);
  });

  it('shows label and links via for/id', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'Accept terms';
      f.componentInstance.required = true;
      applyFieldHarnessInputs(f, { controlId: 'test-checkbox' });
    });
    const label = fix.debugElement.query(By.css('.au-checkbox__label'));
    expect(label?.nativeElement.textContent?.replace(/\s+/g, ' ').trim()).toContain('Accept terms');
    expect(label?.nativeElement.textContent).toContain('*');
    expect(label?.nativeElement.textContent).toContain('(required)');
    const input = queryInput(fix);
    expect(input.id).toBe('test-checkbox');
  });

  it('sets native indeterminate for indeterminate state', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.indeterminate = true;
    });
    const input = queryInput(fix);
    expect(input.indeterminate).toBe(true);
    expect(input.getAttribute('aria-checked')).toBeNull();
  });

  it('hides required marker when showRequired is false', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'Accept terms';
      f.componentInstance.required = true;
      f.componentInstance.showRequired = false;
    });
    const label = fix.debugElement.query(By.css('.au-checkbox__label'));
    expect(label?.nativeElement.textContent?.trim()).toBe('Accept terms');
    expect(fix.nativeElement.querySelector('.au-checkbox__required')).toBeNull();
  });

  it('shows signal-form error message when errorMessage is empty', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'Agree';
      f.componentInstance.errors = [{ message: 'Required', kind: 'required' }];
    });
    expect(CONTROL(fix).displayError()).toBe('Required');
  });

  it('falls back to error kind when message is missing', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'Agree';
      f.componentInstance.errors = [{ kind: 'required' }];
    });
    expect(CONTROL(fix).displayError()).toBe('required');
  });

  it('shows description with aria-describedby', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'Subscribe';
      f.componentInstance.description = 'Weekly updates';
    });
    const input = queryInput(fix);
    const desc = fix.debugElement.query(By.css('.au-checkbox__description'));
    expect(desc?.nativeElement.id.length).toBeGreaterThan(0);
    expect(input.getAttribute('aria-describedby')).toBe(desc?.nativeElement.id);
    expect(desc?.nativeElement.textContent?.trim()).toBe('Weekly updates');
  });

  it('shows manual errorMessage, aria-invalid, and aria-errormessage', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'Agree';
      applyFieldHarnessInputs(f, { errorMessage: 'You must accept.' });
    });
    const input = queryInput(fix);
    const err = fix.debugElement.query(By.css('.au-field-error'));
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-errormessage')).toBe(err?.nativeElement.id);
    expect(err?.nativeElement.getAttribute('role')).toBe('alert');
    expect(err?.nativeElement.textContent?.replace(/\s+/g, ' ').trim()).toContain(
      'You must accept.',
    );
    const wrap = fix.debugElement.query(By.css('.au-checkbox__wrapper'))!.nativeElement;
    expect(wrap.classList.contains('au-checkbox__wrapper--invalid')).toBe(true);
  });

  it('uses first signal-form errors entry when errorMessage is empty', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'Agree';
      f.componentInstance.errors = [{ kind: 'required', message: 'Required field' }];
    });
    const err = fix.debugElement.query(By.css('.au-field-error'));
    expect(err?.nativeElement.textContent?.replace(/\s+/g, ' ').trim()).toContain('Required field');
  });

  it('renders only description when label is empty', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = '';
      f.componentInstance.description = 'Just description';
    });
    const content = fix.debugElement.query(By.css('.au-checkbox__content'));
    expect(content).toBeTruthy();
    const label = fix.debugElement.query(By.css('.au-checkbox__label'));
    expect(label).toBeNull();
    const desc = fix.debugElement.query(By.css('.au-checkbox__description'));
    expect(desc?.nativeElement.textContent?.trim()).toBe('Just description');
  });

  it('uses kind when message missing in errors', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.errors = [{ kind: 'pattern' }] as any;
    });
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('pattern');
  });

  it('displayError returns empty when first error has no usable message or kind', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'Agree';
      f.componentInstance.errors = [{ message: '', kind: '' }] as any;
    });
    expect(CONTROL(fix).displayError()).toBe('');
  });

  it('sets aria-invalid from invalid input without visible error text', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'Agree';
      f.componentInstance.invalid = true;
    });
    const input = queryInput(fix);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(fix.debugElement.query(By.css('.au-field-error'))).toBeNull();
    expect(input.getAttribute('aria-errormessage')).toMatch(/-error$/);
    expect(input.getAttribute('aria-describedby')).toMatch(/-error$/);
  });

  it('normalizes nullish label and description transforms', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = null as unknown as string;
      f.componentInstance.description = undefined as unknown as string;
    });
    expect(CONTROL(fix).label()).toBe('');
    expect(CONTROL(fix).description()).toBe('');
  });

  it('emits blur when focus leaves the checkbox shell', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'Agree';
    });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    const row = fix.debugElement.query(By.css('.au-checkbox__wrapper'))!.nativeElement;
    const out = document.createElement('button');
    document.body.appendChild(out);
    const ev = new FocusEvent('focusout', { relatedTarget: out });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlFocusout(ev);
    out.remove();
    expect(n).toBe(1);
  });

  it('does not emit when disabled', async () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.disabled = true;
    });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () =>
      outputToObservable(comp.checked).subscribe(() => n++),
    );
    await fix.whenStable();
    const el = queryInput(fix);
    el.checked = true;
    el.dispatchEvent(new Event('change'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('sets name and size on host and input', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.name = 'agree';
      f.componentInstance.size = 'sm';
    });
    expect(queryInput(fix).getAttribute('name')).toBe('agree');
    expect(queryInput(fix).getAttribute('data-au-size')).toBe('sm');
  });

  it('focus() focuses the native input', async () => {
    const fix = createFieldFixture(AuCheckboxTestHost);
    await fix.whenStable();
    const el = queryInput(fix);
    const spy = vi.spyOn(el, 'focus');
    CONTROL(fix).focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('generates id when id input is empty', async () => {
    const fix = createFieldFixture(AuCheckboxTestHost);
    await fix.whenStable();
    expect(queryInput(fix).id.startsWith('au-field-')).toBe(true);
  });

  it('sets native checked when checked', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.checked = true;
    });
    expect(queryInput(fix).checked).toBe(true);
    expect(queryInput(fix).getAttribute('aria-checked')).toBeNull();
  });

  it('does not set aria-describedby without description', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'Only';
    });
    expect(queryInput(fix).getAttribute('aria-describedby')).toBeNull();
  });

  it('includes form-field hint in aria-describedby', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'Agree';
      applyFieldHarnessInputs(f, { hint: 'Optional info' });
    });
    const hint = fix.debugElement.query(By.css('.au-form-field__hint'));
    const input = queryInput(fix);
    expect(input.getAttribute('aria-describedby')).toContain(hint?.nativeElement.id);
  });

  it('onControlFocusout returns early for non-HTMLElement currentTarget', async () => {
    const fix = createFieldFixture(AuCheckboxTestHost);
    await fix.whenStable();
    const ev = { currentTarget: {}, relatedTarget: null } as unknown as FocusEvent;
    CONTROL(fix).onControlFocusout(ev);
  });

  it('onControlFocusout returns when focus stays inside wrapper', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'X';
    });
    const wrapper = fix.debugElement.query(By.css('.au-checkbox__wrapper'))!.nativeElement;
    const label = fix.debugElement.query(By.css('.au-checkbox__label'))!.nativeElement;
    const ev = new FocusEvent('focusout', { relatedTarget: label });
    Object.defineProperty(ev, 'currentTarget', { value: wrapper, configurable: true });
    CONTROL(fix).onControlFocusout(ev);
  });

  it('sets aria-required when required', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.required = true;
    });
    expect(queryInput(fix).getAttribute('aria-required')).toBe('true');
  });

  it('clears focus-by-tab when focus leaves wrapper', async () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'X';
    });
    const wrapDe = fix.debugElement.query(By.css('.au-checkbox__wrapper'))!;
    const wrap = wrapDe.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    wrap.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await fix.whenStable();
    expect(wrap.classList.contains('au-checkbox__wrapper--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: wrap, configurable: true });
    CONTROL(fix).onControlFocusout(out);
    await fix.whenStable();
    expect(wrap.classList.contains('au-checkbox__wrapper--from-tab')).toBe(false);
  });

  it('stringifies non-null label and description', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'A';
      f.componentInstance.description = 'B';
    });
    expect(CONTROL(fix).label()).toBe('A');
    expect(CONTROL(fix).description()).toBe('B');
  });

  it('coerces numeric label and description through transform', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 1 as unknown as string;
      f.componentInstance.description = 2 as unknown as string;
    });
    expect(CONTROL(fix).label()).toBe('1');
    expect(CONTROL(fix).description()).toBe('2');
  });

  it('applies sr-only to label content when hideLabel is true', async () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'Pick me';
      f.componentInstance.hideLabel = true;
    });
    await fix.whenStable();
    const content = fix.nativeElement.querySelector('.au-checkbox__content') as HTMLElement;
    expect(content.classList.contains('au-sr-only')).toBe(true);
  });

  it('removes label node when label is cleared after render', async () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.label = 'Terms';
      f.componentInstance.description = 'Details';
    });
    await fix.whenStable();
    const dir = CONTROL(fix);
    vi.spyOn(dir, 'label').mockReturnValue('');
    (dir as unknown as { syncLabelContent(): void }).syncLabelContent();
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('.au-checkbox__label')).toBeFalsy();
  });

  it('removes description when cleared after render', async () => {
    const fix = createFieldFixture(AuCheckboxTestHost, undefined, (f) => {
      f.componentInstance.description = 'Details';
    });
    await fix.whenStable();
    const dir = CONTROL(fix);
    vi.spyOn(dir, 'description').mockReturnValue('');
    (dir as unknown as { syncLabelContent(): void }).syncLabelContent();
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('.au-checkbox__description')).toBeFalsy();
  });

  it('ensureShell returns when parent is not an HTMLElement', async () => {
    const fix = createFieldFixture(AuCheckboxTestHost, { label: 'Terms' });
    await fix.whenStable();
    const dir = CONTROL(fix) as unknown as {
      ensureShell(): void;
      host: { nativeElement: HTMLInputElement };
    };
    const input = dir.host.nativeElement;
    document.createDocumentFragment().appendChild(input);
    expect(() => dir.ensureShell()).not.toThrow();
  });

  it('syncWrapperState returns when wrapper is missing', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, { label: 'Terms' });
    const dir = CONTROL(fix) as unknown as { syncWrapperState(): void; wrapperEl: null };
    dir.wrapperEl = null;
    expect(() => dir.syncWrapperState()).not.toThrow();
  });

  it('syncLabelContent returns when content node is missing', () => {
    const fix = createFieldFixture(AuCheckboxTestHost, { label: 'Terms' });
    const dir = CONTROL(fix) as unknown as { syncLabelContent(): void; contentEl: null };
    dir.contentEl = null;
    expect(() => dir.syncLabelContent()).not.toThrow();
  });

  it('emits blur from wrapper focusout listener', async () => {
    const fix = createFieldFixture(AuCheckboxTestHost, { label: 'Terms' });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    await fix.whenStable();
    const wrapper = fix.debugElement.query(By.css('.au-checkbox__wrapper'))!.nativeElement;
    wrapper.dispatchEvent(
      new FocusEvent('focusout', { bubbles: true, relatedTarget: document.body }),
    );
    expect(n).toBe(1);
  });
});

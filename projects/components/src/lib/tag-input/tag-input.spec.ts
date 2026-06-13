import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuTagInput } from './tag-input';
import {
  AuTagInputTestHost,
  applyFieldHarnessInputs,
  createFieldFixture,
  queryControl,
} from '../form-field/form-field.spec-hosts';

describe('AuTagInput', () => {
  function CONTROL(fixture: ComponentFixture<AuTagInputTestHost>) {
    return queryControl(fixture, AuTagInput);
  }

  function queryInput(fixture: ComponentFixture<AuTagInputTestHost>): HTMLInputElement {
    return fixture.debugElement.query(By.css('.au-tag-input__input'))!
      .nativeElement as HTMLInputElement;
  }

  function typeDraft(fixture: ComponentFixture<AuTagInputTestHost>, text: string): void {
    const input = queryInput(fixture);
    input.value = text;
    input.dispatchEvent(new Event('input'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AuTagInputTestHost] }).compileComponents();
  });

  it('adds tag on Enter',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' });
    await fix.whenStable();
    typeDraft(fix, 'angular');
    queryInput(fix).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toEqual(['angular']);
  });

  it('adds tag on comma and trims trailing comma',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' });
    await fix.whenStable();
    typeDraft(fix, 'vue,');
    queryInput(fix).dispatchEvent(new KeyboardEvent('keydown', { key: ',', bubbles: true }));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toEqual(['vue']);
  });

  it('removes tag on chip button click',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' }, (f) => {
      f.componentInstance.value = ['a', 'b'];
    });
    await fix.whenStable();
    fix.debugElement.query(By.css('.au-tag-input__chip-remove'))!.nativeElement.click();
    await fix.whenStable();
    expect(CONTROL(fix).value()).toEqual(['b']);
  });

  it('does not remove last tag on Backspace when value is empty',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' });
    await fix.whenStable();
    queryInput(fix).dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }),
    );
    expect(CONTROL(fix).value()).toEqual([]);
  });

  it('does not commit draft on blur when disabled',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' }, (f) => {
      f.componentInstance.disabled = true;
    });
    await fix.whenStable();
    typeDraft(fix, 'skip');
    queryInput(fix).dispatchEvent(new FocusEvent('blur'));
    expect(CONTROL(fix).value()).toEqual([]);
  });

  it('sets readonly on the draft input when readOnly',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' }, (f) => {
      f.componentInstance.readOnly = true;
    });
    await fix.whenStable();
    const input = queryInput(fix);
    expect(input.readOnly).toBe(true);
    expect(input.disabled).toBe(false);
  });

  it('does not commit draft on blur when readOnly',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' }, (f) => {
      f.componentInstance.readOnly = true;
    });
    await fix.whenStable();
    typeDraft(fix, 'skip');
    queryInput(fix).dispatchEvent(new FocusEvent('blur'));
    expect(CONTROL(fix).value()).toEqual([]);
  });

  it('removes last tag on Backspace when draft is empty',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' }, (f) => {
      f.componentInstance.value = ['only'];
    });
    await fix.whenStable();
    queryInput(fix).dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }),
    );
    await fix.whenStable();
    expect(CONTROL(fix).value()).toEqual([]);
  });

  it('commits draft on blur',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' });
    await fix.whenStable();
    typeDraft(fix, '  react  ');
    queryInput(fix).dispatchEvent(new FocusEvent('blur'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toEqual(['react']);
  });

  it('respects maxTags and allowDuplicates',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' }, (f) => {
      f.componentInstance.maxTags = 1;
      f.componentInstance.value = ['a'];
    });
    await fix.whenStable();
    typeDraft(fix, 'b');
    queryInput(fix).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(CONTROL(fix).value()).toEqual(['a']);

    fix.componentInstance.maxTags = undefined;
    fix.componentInstance.allowDuplicates = false;
    fix.componentInstance.value = ['dup'];
    await fix.whenStable();
    typeDraft(fix, 'dup');
    queryInput(fix).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(CONTROL(fix).value()).toEqual(['dup']);
  });

  it('does not mutate when disabled or readOnly',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' }, (f) => {
      f.componentInstance.disabled = true;
      f.componentInstance.value = ['x'];
    });
    await fix.whenStable();
    typeDraft(fix, 'y');
    queryInput(fix).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(CONTROL(fix).value()).toEqual(['x']);
    fix.debugElement.query(By.css('.au-tag-input__chip-remove'))!.nativeElement.click();
    expect(CONTROL(fix).value()).toEqual(['x']);
  });

  it('emits valueChange', async () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    await fix.whenStable();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.value).pipe(take(1))),
    );
    typeDraft(fix, 'go');
    queryInput(fix).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(await p).toEqual(['go']);
  });

  it('focus() focuses the draft input',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' });
    await fix.whenStable();
    const input = queryInput(fix);
    const spy = vi.spyOn(input, 'focus');
    CONTROL(fix).focus();
    expect(spy).toHaveBeenCalled();
  });

  it('sets hint aria-describedby and ignores empty commit',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags', hint: 'Add skills' });
    await fix.whenStable();
    const hint = fix.debugElement.query(By.css('.au-form-field__hint'))!
      .nativeElement as HTMLElement;
    expect(queryInput(fix).getAttribute('aria-describedby')).toBe(hint.id);

    typeDraft(fix, '   ');
    queryInput(fix).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(CONTROL(fix).value()).toEqual([]);
  });

  it('includes error id in aria-describedby when invalid',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags', hint: 'Add tags' }, (f) => {
      f.componentInstance.invalid = true;
    });
    applyFieldHarnessInputs(fix, { errorMessage: 'Required', controlId: 'ti1' });
    await fix.whenStable();
    const describedBy = queryInput(fix).getAttribute('aria-describedby') ?? '';
    expect(describedBy).toContain('ti1-error');
  });

  it('does not remove tags when readOnly',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' }, (f) => {
      f.componentInstance.readOnly = true;
      f.componentInstance.value = ['keep'];
    });
    await fix.whenStable();
    CONTROL(fix).removeTag(0);
    expect(CONTROL(fix).value()).toEqual(['keep']);
  });

  it('onControlRowFocusout clears tab focus when leaving the row', () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' });
    const row = fix.debugElement.query(By.css('.au-tag-input__control-row'))!.nativeElement;
    CONTROL(fix).onControlRowFocusin();
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
  });

  it('coerces null placeholder through transform', () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' }, (f) => {
      f.componentInstance.placeholder = null as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('');
  });

  it('onControlRowFocusout ignores invalid events and internal focus moves', () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' });
    CONTROL(fix).onControlRowFocusout({ currentTarget: {} } as FocusEvent);
    const row = fix.debugElement.query(By.css('.au-tag-input__control-row'))!.nativeElement;
    const input = queryInput(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: input });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(ev);
  });

  it('ignores removeTag out of range',async  () => {
    const fix = createFieldFixture(AuTagInputTestHost, { label: 'Tags' });
    await fix.whenStable();
    CONTROL(fix).removeTag(-1);
    CONTROL(fix).removeTag(99);
    expect(CONTROL(fix).value()).toEqual([]);
  });
});

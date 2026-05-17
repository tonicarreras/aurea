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
    fix.detectChanges();
    const label = fix.debugElement.query(By.css('.au-checkbox__label'));
    expect(label?.nativeElement.textContent?.trim()).toBe('Accept terms*');
    const input = queryInput(fix);
    expect(input.id).toBe('test-checkbox');
  });

  it('sets aria-checked for indeterminate state', () => {
    const fix = TestBed.createComponent(Checkbox);
    fix.componentRef.setInput('checked', 'indeterminate');
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
    expect(input.getAttribute('aria-describedby')).toBe('au-checkbox-1-desc');
    const desc = fix.debugElement.query(By.css('.au-checkbox__description'));
    expect(desc?.nativeElement.textContent?.trim()).toBe('Weekly updates');
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
});
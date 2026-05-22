import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuList } from '../list/list';
import { AuChip } from './chip';

describe('AuChip', () => {
  let fixture: ComponentFixture<AuChip>;
  let component: AuChip;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuChip],
    }).compileComponents();

    fixture = TestBed.createComponent(AuChip);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'TypeScript');
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders label text', () => {
    expect(fixture.nativeElement.textContent).toContain('TypeScript');
  });

  it('omits listitem role on host by default', () => {
    expect(fixture.nativeElement.getAttribute('role')).toBeNull();
  });

  it('applies default variant and size on host', () => {
    const host = fixture.nativeElement;
    expect(host.getAttribute('data-au-variant')).toBe('filled');
    expect(host.getAttribute('data-au-size')).toBe('md');
  });

  it('emits removed when remove control is clicked', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();
    let n = 0;
    component.removed.subscribe(() => n++);
    const remove = fixture.nativeElement.querySelector('.au-chip__remove') as HTMLButtonElement;
    remove.click();
    expect(n).toBe(1);
  });

  it('does not emit removed when disabled', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    let n = 0;
    component.removed.subscribe(() => n++);
    const removeDe = fixture.debugElement.query(By.css('.au-chip__remove'))!;
    const ev = new MouseEvent('click', { cancelable: true, bubbles: true });
    removeDe.triggerEventHandler('click', ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(n).toBe(0);
  });

  it('remove button uses custom removeLabel', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.componentRef.setInput('removeLabel', 'Dismiss tag');
    fixture.detectChanges();
    const remove = fixture.nativeElement.querySelector('.au-chip__remove') as HTMLButtonElement;
    expect(remove.getAttribute('aria-label')).toBe('Dismiss tag');
  });

  it('remove button aria-label falls back to Remove {label}', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();
    const remove = fixture.nativeElement.querySelector('.au-chip__remove') as HTMLButtonElement;
    expect(remove.getAttribute('aria-label')).toBe('Remove TypeScript');
  });

  it('remove button aria-label is Remove when label empty', () => {
    fixture.componentRef.setInput('label', '');
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();
    const remove = fixture.nativeElement.querySelector('.au-chip__remove') as HTMLButtonElement;
    expect(remove.getAttribute('aria-label')).toBe('Remove');
  });

  it('remove reacts to Enter and Space', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();
    let n = 0;
    component.removed.subscribe(() => n++);
    const removeDe = fixture.debugElement.query(By.css('.au-chip__remove'))!;
    removeDe.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
    );
    expect(n).toBe(1);
    removeDe.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: ' ', bubbles: true }),
    );
    expect(n).toBe(2);
  });

  it('ignores other keys on remove', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();
    let n = 0;
    component.removed.subscribe(() => n++);
    fixture.debugElement
      .query(By.css('.au-chip__remove'))!
      .triggerEventHandler(
        'keydown',
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
    expect(n).toBe(0);
  });

  it('ignores both selectable and removable when set together', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();
    expect(component.isSelectable()).toBe(false);
    expect(component.isRemovable()).toBe(false);
    expect(fixture.nativeElement.querySelector('.au-chip__remove')).toBeNull();
    expect(fixture.nativeElement.querySelector('button.au-chip__surface')).toBeNull();
  });

  it('selectable chip toggles selected and emits', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('role')).toBeNull();
    const surface = fixture.nativeElement.querySelector('.au-chip__surface') as HTMLButtonElement;
    expect(surface.getAttribute('aria-pressed')).toBe('false');
    let selected: boolean | undefined;
    component.selectedChange.subscribe((v) => (selected = v));
    surface.click();
    fixture.detectChanges();
    expect(component.selected()).toBe(true);
    expect(selected).toBe(true);
    expect(surface.getAttribute('aria-pressed')).toBe('true');
    expect(fixture.nativeElement.getAttribute('data-au-selected')).toBe('');
  });

  it('selectable chip does not toggle when disabled', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    let n = 0;
    component.selectedChange.subscribe(() => n++);
    const surfaceDe = fixture.debugElement.query(By.css('.au-chip__surface'))!;
    const ev = new MouseEvent('click', { cancelable: true });
    surfaceDe.triggerEventHandler('click', ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(n).toBe(0);
  });

  it('focus() focuses selectable surface', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();
    const surface = fixture.nativeElement.querySelector('.au-chip__surface') as HTMLButtonElement;
    const spy = vi.spyOn(surface, 'focus');
    component.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('focus() focuses remove button when removable', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();
    const remove = fixture.nativeElement.querySelector('.au-chip__remove') as HTMLButtonElement;
    const spy = vi.spyOn(remove, 'focus');
    component.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('applies from-tab class on selectable chip after Tab focus', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();
    const surfaceDe = fixture.debugElement.query(By.css('.au-chip__surface'))!;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    surfaceDe.triggerEventHandler('focusin', new FocusEvent('focusin'));
    fixture.detectChanges();
    expect(surfaceDe.nativeElement.classList.contains('au-chip__surface--from-tab')).toBe(true);
    surfaceDe.triggerEventHandler('focusout', new FocusEvent('focusout'));
    fixture.detectChanges();
    expect(surfaceDe.nativeElement.classList.contains('au-chip__surface--from-tab')).toBe(false);
  });

  it('transforms null label to empty string', () => {
    fixture.componentRef.setInput('label', null as unknown as string);
    fixture.detectChanges();
    expect(component.resolvedLabel()).toBe('');
  });

  it('transforms null removeLabel to empty string', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.componentRef.setInput('removeLabel', null as unknown as string);
    fixture.detectChanges();
    expect(component.removeLabel()).toBe('');
    const remove = fixture.nativeElement.querySelector('.au-chip__remove') as HTMLButtonElement;
    expect(remove.getAttribute('aria-label')).toBe('Remove TypeScript');
  });

  it('selectable chip emits click on toggle', () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();
    let clicks = 0;
    component.click.subscribe(() => clicks++);
    (fixture.nativeElement.querySelector('.au-chip__surface') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(clicks).toBe(1);
  });

  it('onRemoveKeydown does not emit when disabled', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    let n = 0;
    component.removed.subscribe(() => n++);
    fixture.debugElement
      .query(By.css('.au-chip__remove'))!
      .triggerEventHandler(
        'keydown',
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
      );
    expect(n).toBe(0);
  });

  it('applies from-tab class on remove control after Tab focus', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();
    const removeDe = fixture.debugElement.query(By.css('.au-chip__remove'))!;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    removeDe.triggerEventHandler('focusin', new FocusEvent('focusin'));
    fixture.detectChanges();
    expect(removeDe.nativeElement.classList.contains('au-chip__remove--from-tab')).toBe(true);
  });
});

@Component({
  imports: [AuList, AuChip],
  template: `
    <au-list>
      <au-chip
        label="Angular"
        [removable]="true"
      />
    </au-list>
  `,
})
class ChipInListHost {}

describe('AuChip with AuList', () => {
  it('uses listitem when projected inside au-list', () => {
    const fix = TestBed.createComponent(ChipInListHost);
    fix.detectChanges();
    expect(fix.nativeElement.querySelector('au-chip')?.getAttribute('role')).toBe('listitem');
  });

  it('omits listitem when selectable inside au-list', () => {
    @Component({
      imports: [AuList, AuChip],
      template: `<au-list
        ><au-chip
          label="Filter"
          [selectable]="true"
      /></au-list>`,
    })
    class SelectableInListHost {}

    const fix = TestBed.createComponent(SelectableInListHost);
    fix.detectChanges();
    expect(fix.nativeElement.querySelector('au-chip')?.getAttribute('role')).toBeNull();
  });
});

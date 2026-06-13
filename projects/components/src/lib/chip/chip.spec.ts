import { Component, ChangeDetectionStrategy } from '@angular/core';
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
    await fixture.whenStable();
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

  it('emits removed when remove control is clicked', async () => {
    fixture.componentRef.setInput('removable', true);
    await fixture.whenStable();
    let n = 0;
    component.removed.subscribe(() => n++);
    const remove = fixture.nativeElement.querySelector('.au-chip__remove') as HTMLButtonElement;
    remove.click();
    expect(n).toBe(1);
  });

  it('does not emit removed when disabled', async () => {
    fixture.componentRef.setInput('removable', true);
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    let n = 0;
    component.removed.subscribe(() => n++);
    const removeDe = fixture.debugElement.query(By.css('.au-chip__remove'))!;
    const ev = new MouseEvent('click', { cancelable: true, bubbles: true });
    removeDe.triggerEventHandler('click', ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(n).toBe(0);
  });

  it('remove button uses custom removeLabel', async () => {
    fixture.componentRef.setInput('removable', true);
    fixture.componentRef.setInput('removeLabel', 'Dismiss tag');
    await fixture.whenStable();
    const remove = fixture.nativeElement.querySelector('.au-chip__remove') as HTMLButtonElement;
    expect(remove.getAttribute('aria-label')).toBe('Dismiss tag');
  });

  it('remove button aria-label falls back to Remove {label}', async () => {
    fixture.componentRef.setInput('removable', true);
    await fixture.whenStable();
    const remove = fixture.nativeElement.querySelector('.au-chip__remove') as HTMLButtonElement;
    expect(remove.getAttribute('aria-label')).toBe('Remove TypeScript');
  });

  it('remove button aria-label is Remove when label empty', async () => {
    fixture.componentRef.setInput('label', '');
    fixture.componentRef.setInput('removable', true);
    await fixture.whenStable();
    const remove = fixture.nativeElement.querySelector('.au-chip__remove') as HTMLButtonElement;
    expect(remove.getAttribute('aria-label')).toBe('Remove');
  });

  it('remove reacts to Enter and Space', async () => {
    fixture.componentRef.setInput('removable', true);
    await fixture.whenStable();
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

  it('ignores other keys on remove', async () => {
    fixture.componentRef.setInput('removable', true);
    await fixture.whenStable();
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

  it('ignores both selectable and removable when set together', async () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.componentRef.setInput('removable', true);
    await fixture.whenStable();
    expect(component.isSelectable()).toBe(false);
    expect(component.isRemovable()).toBe(false);
    expect(fixture.nativeElement.querySelector('.au-chip__remove')).toBeNull();
    expect(fixture.nativeElement.querySelector('button.au-chip__surface')).toBeNull();
  });

  it('selectable chip toggles selected and emits', async () => {
    fixture.componentRef.setInput('selectable', true);
    await fixture.whenStable();
    expect(fixture.nativeElement.getAttribute('role')).toBeNull();
    const surface = fixture.nativeElement.querySelector('.au-chip__surface') as HTMLButtonElement;
    expect(surface.getAttribute('aria-pressed')).toBe('false');
    let selected: boolean | undefined;
    component.selected.subscribe((v: boolean) => {
      selected = v;
    });
    surface.click();
    await fixture.whenStable();
    expect(component.selected()).toBe(true);
    expect(selected).toBe(true);
    expect(surface.getAttribute('aria-pressed')).toBe('true');
    expect(fixture.nativeElement.getAttribute('data-au-selected')).toBe('');
  });

  it('selectable chip does not toggle when disabled', async () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    let n = 0;
    component.selected.subscribe(() => n++);
    const surfaceDe = fixture.debugElement.query(By.css('.au-chip__surface'))!;
    const ev = new MouseEvent('click', { cancelable: true });
    surfaceDe.triggerEventHandler('click', ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(n).toBe(0);
  });

  it('focus() focuses selectable surface', async () => {
    fixture.componentRef.setInput('selectable', true);
    await fixture.whenStable();
    const surface = fixture.nativeElement.querySelector('.au-chip__surface') as HTMLButtonElement;
    const spy = vi.spyOn(surface, 'focus');
    component.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('focus() focuses remove button when removable', async () => {
    fixture.componentRef.setInput('removable', true);
    await fixture.whenStable();
    const remove = fixture.nativeElement.querySelector('.au-chip__remove') as HTMLButtonElement;
    const spy = vi.spyOn(remove, 'focus');
    component.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('applies from-tab class on selectable chip after Tab focus', async () => {
    fixture.componentRef.setInput('selectable', true);
    await fixture.whenStable();
    const surfaceDe = fixture.debugElement.query(By.css('.au-chip__surface'))!;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    surfaceDe.triggerEventHandler('focusin', new FocusEvent('focusin'));
    await fixture.whenStable();
    expect(surfaceDe.nativeElement.classList.contains('au-chip__surface--from-tab')).toBe(true);
    surfaceDe.triggerEventHandler('focusout', new FocusEvent('focusout'));
    await fixture.whenStable();
    expect(surfaceDe.nativeElement.classList.contains('au-chip__surface--from-tab')).toBe(false);
  });

  it('transforms null label to empty string', async () => {
    fixture.componentRef.setInput('label', null as unknown as string);
    await fixture.whenStable();
    expect(component.resolvedLabel()).toBe('');
  });

  it('transforms null removeLabel to empty string', async () => {
    fixture.componentRef.setInput('removable', true);
    fixture.componentRef.setInput('removeLabel', null as unknown as string);
    await fixture.whenStable();
    expect(component.removeLabel()).toBe('');
    const remove = fixture.nativeElement.querySelector('.au-chip__remove') as HTMLButtonElement;
    expect(remove.getAttribute('aria-label')).toBe('Remove TypeScript');
  });

  it('selectable chip emits click on toggle', async () => {
    fixture.componentRef.setInput('selectable', true);
    await fixture.whenStable();
    let clicks = 0;
    component.click.subscribe(() => clicks++);
    (fixture.nativeElement.querySelector('.au-chip__surface') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(clicks).toBe(1);
  });

  it('onRemoveKeydown does not emit when disabled', async () => {
    fixture.componentRef.setInput('removable', true);
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
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

  it('applies from-tab class on remove control after Tab focus', async () => {
    fixture.componentRef.setInput('removable', true);
    await fixture.whenStable();
    // Dispatch Tab first so tabFocusState sets the flag
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    const remove = fixture.nativeElement.querySelector('.au-chip__remove') as HTMLButtonElement;
    remove.dispatchEvent(new FocusEvent('focusin'));
    await fixture.whenStable();
    expect(remove.classList.contains('au-chip__remove--from-tab')).toBe(true);
  });

  it('renders ng-content fallback when label is empty', async () => {
    fixture.componentRef.setInput('label', '');
    await fixture.whenStable();
    // Static chip (non-selectable, non-removable) with empty label
    expect(component.resolvedLabel()).toBe('');
    const labelSpan = fixture.nativeElement.querySelector('.au-chip__label');
    expect(labelSpan).toBeTruthy();
  });

  it('renders ng-content fallback in selectable chip when label is empty', async () => {
    fixture.componentRef.setInput('selectable', true);
    fixture.componentRef.setInput('label', '');
    await fixture.whenStable();
    expect(component.resolvedLabel()).toBe('');
    const labelSpan = fixture.nativeElement.querySelector('.au-chip__label');
    expect(labelSpan).toBeTruthy();
  });
});

@Component({
  imports: [AuList, AuChip],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  it('uses listitem when projected inside au-list', async () => {
    const fix = TestBed.createComponent(ChipInListHost);
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('au-chip')?.getAttribute('role')).toBe('listitem');
  });

  it('omits listitem when selectable inside au-list', async () => {
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
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('au-chip')?.getAttribute('role')).toBeNull();
  });
});

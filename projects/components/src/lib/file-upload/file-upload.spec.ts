import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuFormField } from '../form-field/form-field';
import { AuFileUpload } from './file-upload';

function createFile(name: string, size = 12): File {
  return new File(['x'.repeat(size)], name, { type: 'text/plain' });
}

@Component({
  imports: [AuFormField, AuFileUpload],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-form-field
      label="Attachments"
      hint="PDF or images only."
    >
      <au-file-upload #upload />
    </au-form-field>
  `,
})
class FileUploadHost {
  upload!: AuFileUpload;
}

describe('AuFileUpload', () => {
  let fixture: ComponentFixture<FileUploadHost>;
  let upload: AuFileUpload;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FileUploadHost] }).compileComponents();
    fixture = TestBed.createComponent(FileUploadHost);
    await fixture.whenStable();
    upload = fixture.debugElement.query(By.directive(AuFileUpload)).componentInstance;
  });

  it('handles native change with no files', () => {
    const input = document.createElement('input');
    Object.defineProperty(input, 'files', { value: null, configurable: true });
    upload['onInputChange']({ target: input } as unknown as Event);
    expect(upload.value()).toEqual([]);
  });

  it('emits blur from the hidden input', () => {
    let blurred = false;
    upload.blur.subscribe(() => (blurred = true));
    (
      fixture.nativeElement.querySelector('.au-file-upload__input') as HTMLInputElement
    ).dispatchEvent(new Event('blur'));
    expect(blurred).toBe(true);
  });

  it('emits valueChange when files are added', () => {
    const file = createFile('notes.txt');
    let emitted: File[] | undefined;
    const inj = TestBed.inject(Injector);
    runInInjectionContext(inj, () =>
      outputToObservable(upload.value).subscribe((next: File[]) => {
        emitted = next;
      }),
    );
    upload['addFiles']([file]);
    expect(emitted).toEqual([file]);
  });

  it('reflects accept on the native input', async () => {
    @Component({
      imports: [AuFormField, AuFileUpload],
      template: `
        <au-form-field label="Attachments">
          <au-file-upload accept=".pdf" />
        </au-form-field>
      `,
    })
    class AcceptHost {}

    const acceptFixture = TestBed.createComponent(AcceptHost);
    await acceptFixture.whenStable();
    expect(
      (
        acceptFixture.nativeElement.querySelector('.au-file-upload__input') as HTMLInputElement
      ).getAttribute('accept'),
    ).toBe('.pdf');
  });

  it('adds files from the native input',async  () => {
    const file = createFile('notes.txt');
    upload['addFiles']([file]);
    await fixture.whenStable();
    expect(upload.value()).toEqual([file]);
    expect(upload.controlId()).toBeTruthy();
    const input = fixture.nativeElement.querySelector('.au-file-upload__input') as HTMLInputElement;
    expect(input.id).toBe(upload.controlId());
    expect(fixture.nativeElement.querySelector('.au-file-upload__item-name')?.textContent).toBe(
      'notes.txt',
    );
  });

  it('opens the native file picker on browse', () => {
    const input = fixture.nativeElement.querySelector('.au-file-upload__input') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');
    upload['onBrowseClick']();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('removes a listed file',async  () => {
    const file = createFile('draft.pdf');
    upload.value.set([file]);
    await fixture.whenStable();
    (fixture.nativeElement.querySelector('.au-file-upload__remove') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(upload.value()).toEqual([]);
  });

  it('does not remove files when disabled', async () => {
    const disabledFixture = TestBed.createComponent(AuFileUpload);
    disabledFixture.componentRef.setInput('disabled', true);
    await disabledFixture.whenStable();
    const file = createFile('draft.pdf');
    disabledFixture.componentInstance.value.set([file]);
    disabledFixture.componentInstance['removeFile'](0);
    expect(disabledFixture.componentInstance.value()).toEqual([file]);
  });

  it('replaces files when multiple is false', async () => {
    const singleFixture = TestBed.createComponent(AuFileUpload);
    singleFixture.componentRef.setInput('multiple', false);
    await singleFixture.whenStable();
    const first = createFile('a.txt');
    const second = createFile('b.txt');
    singleFixture.componentInstance['addFiles']([first]);
    singleFixture.componentInstance['addFiles']([second]);
    expect(singleFixture.componentInstance.value()).toEqual([second]);
  });
});

describe('AuFileUpload standalone', () => {
  let fixture: ComponentFixture<AuFileUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AuFileUpload] }).compileComponents();
    fixture = TestBed.createComponent(AuFileUpload);
    await fixture.whenStable();
  });

  it('sets dragover host class',async  () => {
    fixture.componentInstance['onDragOver']({
      preventDefault: () => undefined,
    } as DragEvent);
    await fixture.whenStable();
    expect(fixture.nativeElement.classList.contains('au-file-upload--dragover')).toBe(true);
  });

  it('formats file sizes', () => {
    expect(fixture.componentInstance['formatSize'](512)).toBe('512 B');
    expect(fixture.componentInstance['formatSize'](2048)).toBe('2.0 KB');
    expect(fixture.componentInstance['formatSize'](2 * 1024 * 1024)).toBe('2.0 MB');
  });

  it('handles drop and dragleave',async  () => {
    const file = createFile('drop.txt');
    fixture.componentInstance['onDrop']({
      preventDefault: () => undefined,
      dataTransfer: { files: [file] },
    } as unknown as DragEvent);
    await fixture.whenStable();
    expect(fixture.componentInstance.value()).toEqual([file]);

    fixture.componentInstance['onDragLeave']({ preventDefault: () => undefined } as DragEvent);
    await fixture.whenStable();
    expect(fixture.nativeElement.classList.contains('au-file-upload--dragover')).toBe(false);
  });

  it('ignores interactions when disabled',async  () => {
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    fixture.componentInstance['onBrowseClick']();
    fixture.componentInstance['onDrop']({
      preventDefault: () => undefined,
      dataTransfer: { files: [createFile('x.txt')] },
    } as unknown as DragEvent);
    expect(fixture.componentInstance.value()).toEqual([]);
  });

  it('handles drop without a data transfer', () => {
    fixture.componentInstance['onDrop']({
      preventDefault: () => undefined,
      dataTransfer: null,
    } as unknown as DragEvent);
    expect(fixture.componentInstance.value()).toEqual([]);
  });

  it('ignores empty file batches', () => {
    fixture.componentInstance['addFiles']([]);
    expect(fixture.componentInstance.value()).toEqual([]);
  });

  it('clears the native input after selection', () => {
    const input = document.createElement('input');
    input.type = 'file';
    fixture.componentInstance['onInputChange']({ target: input } as unknown as Event);
    expect(input.value).toBe('');
  });

  it('ignores dragover when disabled',async  () => {
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    fixture.componentInstance['onDragOver']({ preventDefault: () => undefined } as DragEvent);
    expect(fixture.componentInstance['dragOver']()).toBe(false);
  });

  it('links aria-describedby to field errors when invalid',async  () => {
    fixture.componentRef.setInput('invalid', true);
    await fixture.whenStable();
    const describedBy = fixture.nativeElement
      .querySelector('.au-file-upload__input')
      ?.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
  });

  it('links aria-describedby to field hint inside form-field', async () => {
    @Component({
      imports: [AuFormField, AuFileUpload],
      template: `
        <au-form-field
          label="Attachments"
          hint="PDF only."
        >
          <au-file-upload />
        </au-form-field>
      `,
    })
    class HintHost {}

    const hintFixture = TestBed.createComponent(HintHost);
    await hintFixture.whenStable();
    const uploadInstance = hintFixture.debugElement.query(By.directive(AuFileUpload))
      .componentInstance as AuFileUpload;
    expect(uploadInstance.ariaDescribedBy()).toContain('hint');
  });

  it('uses the form-field control id on the native input', async () => {
    @Component({
      imports: [AuFormField, AuFileUpload],
      template: `
        <au-form-field label="Attachments">
          <au-file-upload />
        </au-form-field>
      `,
    })
    class IdHost {}

    const idFixture = TestBed.createComponent(IdHost);
    await idFixture.whenStable();
    const uploadInstance = idFixture.debugElement.query(By.directive(AuFileUpload))
      .componentInstance as AuFileUpload;
    const input = idFixture.nativeElement.querySelector(
      '.au-file-upload__input',
    ) as HTMLInputElement;
    expect(input.id).toBe(uploadInstance.controlId());
  });

  it('syncs invalid state from signal-form errors',async  () => {
    fixture.componentRef.setInput('errors', [{ kind: 'required', message: 'Pick a file.' }]);
    await fixture.whenStable();
    expect(
      (
        fixture.nativeElement.querySelector('.au-file-upload__input') as HTMLInputElement
      ).getAttribute('aria-invalid'),
    ).toBe('true');
  });
});

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
    fixture.detectChanges();
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

  it('reflects accept on the native input', () => {
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
    acceptFixture.detectChanges();
    expect(
      (
        acceptFixture.nativeElement.querySelector('.au-file-upload__input') as HTMLInputElement
      ).getAttribute('accept'),
    ).toBe('.pdf');
  });

  it('adds files from the native input', () => {
    const file = createFile('notes.txt');
    upload['addFiles']([file]);
    fixture.detectChanges();
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

  it('removes a listed file', () => {
    const file = createFile('draft.pdf');
    upload.value.set([file]);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.au-file-upload__remove') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(upload.value()).toEqual([]);
  });

  it('does not remove files when disabled', async () => {
    const disabledFixture = TestBed.createComponent(AuFileUpload);
    disabledFixture.componentRef.setInput('disabled', true);
    disabledFixture.detectChanges();
    const file = createFile('draft.pdf');
    disabledFixture.componentInstance.value.set([file]);
    disabledFixture.componentInstance['removeFile'](0);
    expect(disabledFixture.componentInstance.value()).toEqual([file]);
  });

  it('replaces files when multiple is false', async () => {
    const singleFixture = TestBed.createComponent(AuFileUpload);
    singleFixture.componentRef.setInput('multiple', false);
    singleFixture.detectChanges();
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
    fixture.detectChanges();
  });

  it('sets dragover host class', () => {
    fixture.componentInstance['onDragOver']({
      preventDefault: () => undefined,
    } as DragEvent);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('au-file-upload--dragover')).toBe(true);
  });

  it('formats file sizes', () => {
    expect(fixture.componentInstance['formatSize'](512)).toBe('512 B');
    expect(fixture.componentInstance['formatSize'](2048)).toBe('2.0 KB');
    expect(fixture.componentInstance['formatSize'](2 * 1024 * 1024)).toBe('2.0 MB');
  });

  it('handles drop and dragleave', () => {
    const file = createFile('drop.txt');
    fixture.componentInstance['onDrop']({
      preventDefault: () => undefined,
      dataTransfer: { files: [file] },
    } as unknown as DragEvent);
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toEqual([file]);

    fixture.componentInstance['onDragLeave']({ preventDefault: () => undefined } as DragEvent);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('au-file-upload--dragover')).toBe(false);
  });

  it('ignores interactions when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
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

  it('ignores dragover when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    fixture.componentInstance['onDragOver']({ preventDefault: () => undefined } as DragEvent);
    expect(fixture.componentInstance['dragOver']()).toBe(false);
  });

  it('links aria-describedby to field errors when invalid', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    const describedBy = fixture.nativeElement
      .querySelector('.au-file-upload__input')
      ?.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
  });

  it('links aria-describedby to field hint inside form-field', () => {
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
    hintFixture.detectChanges();
    const uploadInstance = hintFixture.debugElement.query(By.directive(AuFileUpload))
      .componentInstance as AuFileUpload;
    expect(uploadInstance.ariaDescribedBy()).toContain('hint');
  });

  it('uses the form-field control id on the native input', () => {
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
    idFixture.detectChanges();
    const uploadInstance = idFixture.debugElement.query(By.directive(AuFileUpload))
      .componentInstance as AuFileUpload;
    const input = idFixture.nativeElement.querySelector(
      '.au-file-upload__input',
    ) as HTMLInputElement;
    expect(input.id).toBe(uploadInstance.controlId());
  });

  it('syncs invalid state from signal-form errors', () => {
    fixture.componentRef.setInput('errors', [{ kind: 'required', message: 'Pick a file.' }]);
    fixture.detectChanges();
    expect(
      (
        fixture.nativeElement.querySelector('.au-file-upload__input') as HTMLInputElement
      ).getAttribute('aria-invalid'),
    ).toBe('true');
  });
});

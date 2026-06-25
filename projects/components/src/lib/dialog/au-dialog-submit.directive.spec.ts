import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuDialogSubmit } from './au-dialog-submit.directive';

@Component({
  imports: [AuDialogSubmit],
  template: `
    <form id="target-form"></form>
    <button auDialogSubmit="target-form">Send</button>
  `,
})
class Host {}

describe('AuDialogSubmit', () => {
  it('sets type=submit and associates the form by id', async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    fix.detectChanges();

    const btn = fix.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(btn.type).toBe('submit');
    expect(btn.getAttribute('form')).toBe('target-form');
  });
});

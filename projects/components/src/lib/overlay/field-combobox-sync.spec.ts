import { Component, model, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import type { AuFieldOption } from '../field-option';
import { installComboboxDisplaySync } from './field-combobox-sync';

@Component({ template: '' })
class DisplaySyncHost {
  readonly value = signal<string | null>(null);
  readonly options = signal<readonly AuFieldOption[]>([]);
  readonly panelOpen = signal(false);
  readonly comboboxValue = model('previous');

  constructor() {
    installComboboxDisplaySync({
      value: this.value,
      options: this.options,
      panelOpen: this.panelOpen,
      comboboxValue: this.comboboxValue,
    });
  }
}

describe('installComboboxDisplaySync', () => {
  it('uses the value when the matching option has no label', () => {
    const fixture = TestBed.createComponent(DisplaySyncHost);
    fixture.componentInstance.value.set('code');
    fixture.componentInstance.options.set([
      { value: 'code', label: undefined } as unknown as AuFieldOption,
    ]);

    TestBed.flushEffects();

    expect(fixture.componentInstance.comboboxValue()).toBe('code');
  });

  it('clears the display when the value is null and no option matches', () => {
    const fixture = TestBed.createComponent(DisplaySyncHost);
    TestBed.flushEffects();

    expect(fixture.componentInstance.comboboxValue()).toBe('');
  });

  it('uses an empty string when a matching option and value are nullish', () => {
    const fixture = TestBed.createComponent(DisplaySyncHost);
    fixture.componentInstance.options.set([
      { value: null, label: undefined } as unknown as AuFieldOption,
    ]);
    TestBed.flushEffects();

    expect(fixture.componentInstance.comboboxValue()).toBe('');
  });
});

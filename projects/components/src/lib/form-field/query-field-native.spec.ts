import { Component, ElementRef, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { queryFieldNative } from './query-field-native';

@Component({
  template: '<input class="probe-input" />',
})
class ProbeHost {
  readonly host = inject(ElementRef<HTMLElement>);
}

describe('queryFieldNative', () => {
  it('returns the element matching the selector inside the host', () => {
    const fixture = TestBed.createComponent(ProbeHost);
    fixture.detectChanges();
    const input = queryFieldNative<HTMLInputElement>(fixture.componentInstance.host, '.probe-input');
    expect(input.tagName).toBe('INPUT');
    expect(input.classList.contains('probe-input')).toBe(true);
  });
});

import { APP_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { AuFieldIdGenerator, AU_FIELD_AUTO_ID_PATTERN } from './au-field-id-generator';

describe('AuFieldIdGenerator', () => {
  it('returns sequential unique au-field ids with the default APP_ID', () => {
    TestBed.configureTestingModule({});
    const generator = TestBed.inject(AuFieldIdGenerator);
    const first = generator.nextFieldId();
    const second = generator.nextFieldId();
    expect(first).toMatch(AU_FIELD_AUTO_ID_PATTERN);
    expect(second).toMatch(AU_FIELD_AUTO_ID_PATTERN);
    expect(first).not.toBe(second);
  });

  it('namespaces ids with a custom APP_ID', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: APP_ID, useValue: 'docs' }],
    });
    const generator = TestBed.inject(AuFieldIdGenerator);
    expect(generator.nextFieldId()).toMatch(/^au-field-docs-\d+$/);
  });
});

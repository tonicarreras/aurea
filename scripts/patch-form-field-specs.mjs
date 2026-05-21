#!/usr/bin/env node
/**
 * One-off patch: wrap control specs with au-form-field-harness hosts.
 * Run from repo root: node scripts/patch-form-field-specs.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';

const patches = [
  {
    file: 'projects/components/src/lib/textarea/textarea.spec.ts',
    control: 'AuTextarea',
    host: 'AuTextareaFieldHost',
    queryFn: 'queryTextareaHost',
    controlFn: 'queryTextareaControl',
    inputClass: 'au-textarea__input',
    controlRow: 'au-textarea__control-row',
    oldImport: "import { AuTextarea } from './textarea';",
    testingImport: `import {
  AuTextareaFieldHost,
  applyFieldHarnessInputs,
  createTextareaFieldFixture,
  queryTextareaControl,
  queryTextareaHostInput,
} from '../form-field/form-field.testing';`,
  },
];

for (const p of patches) {
  let s = readFileSync(p.file, 'utf8');
  if (s.includes(p.host)) {
    console.log('skip', p.file);
    continue;
  }
  s = s.replace(p.oldImport, p.testingImport);
  writeFileSync(p.file, s);
  console.log('patched', p.file);
}

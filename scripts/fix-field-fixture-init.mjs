import { readFileSync, writeFileSync } from 'node:fs';

const files = [
  'projects/components/src/lib/autocomplete/autocomplete.spec.ts',
  'projects/components/src/lib/select/select.spec.ts',
  'projects/components/src/lib/radio-group/radio-group.spec.ts',
  'projects/components/src/lib/checkbox/checkbox.spec.ts',
  'projects/components/src/lib/input-number/input-number.spec.ts',
  'projects/components/src/lib/input-date/input-date.spec.ts',
  'projects/components/src/lib/textarea/textarea.spec.ts',
];

for (const path of files) {
  let s = readFileSync(path, 'utf8');
  const before = s;
  s = s.replace(
    /const fix = createFieldFixture\(([^)]+)\);\n    fix\.componentInstance\.options = ([^;\n]+);\n    fix\.detectChanges\(\);/g,
    'const fix = createFieldFixture($1, undefined, (f) => { f.componentInstance.options = $2; });',
  );
  s = s.replace(
    /const fix = createFieldFixture\(([^)]+)\);\n    fix\.componentInstance\.label = ([^;\n]+);\n    fix\.detectChanges\(\);/g,
    'const fix = createFieldFixture($1, undefined, (f) => { f.componentInstance.label = $2; });',
  );
  if (s !== before) {
    writeFileSync(path, s);
    console.log('patched', path);
  }
}

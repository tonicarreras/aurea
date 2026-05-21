import { readFileSync, writeFileSync } from 'node:fs';

const specFiles = [
  'projects/components/src/lib/autocomplete/autocomplete.spec.ts',
  'projects/components/src/lib/select/select.spec.ts',
  'projects/components/src/lib/radio-group/radio-group.spec.ts',
  'projects/components/src/lib/textarea/textarea.spec.ts',
  'projects/components/src/lib/checkbox/checkbox.spec.ts',
  'projects/components/src/lib/input-number/input-number.spec.ts',
  'projects/components/src/lib/input-date/input-date.spec.ts',
];

const hostProps = [
  'errors',
  'invalid',
  'minFilterLength',
  'noResultsText',
  'caseSensitive',
  'strictSelection',
  'minDate',
  'maxDate',
];

function fixFile(path) {
  let s = readFileSync(path, 'utf8');
  const before = s;

  for (const prop of hostProps) {
    s = s.replace(
      new RegExp(`fix\\.componentRef\\.setInput\\(['"]${prop}['"],\\s*([^;]+)\\);`, 'g'),
      `fix.componentInstance.${prop} = $1;`,
    );
  }

  const optionVars = ['testOptions', 'opts', 'optionsWithDisabled'];
  for (const v of optionVars) {
    s = s.replace(
      new RegExp(
        `const fix = createFieldFixture\\((Au\\w+TestHost)\\);\\n    fix\\.componentInstance\\.options = ${v};\\n    fix\\.detectChanges\\(\\);`,
        'g',
      ),
      `const fix = createFieldFixture($1, undefined, (f) => { f.componentInstance.options = ${v}; });`,
    );
    s = s.replace(
      new RegExp(
        `const fix = createFieldFixture\\((Au\\w+TestHost), ([^)]+)\\);\\n    fix\\.componentInstance\\.options = ${v};\\n    fix\\.detectChanges\\(\\);`,
        'g',
      ),
      `const fix = createFieldFixture($1, $2, (f) => { f.componentInstance.options = ${v}; });`,
    );
  }

  // label/hint assignments after create (checkbox inline label)
  s = s.replace(
    /const fix = createFieldFixture\((AuCheckboxTestHost)\);\n    fix\.componentInstance\.label = ([^;\n]+);\n    fix\.detectChanges\(\);/g,
    'const fix = createFieldFixture($1, undefined, (f) => { f.componentInstance.label = $2; });',
  );

  s = s.replace(
    /const fix = createFieldFixture\((AuCheckboxTestHost)\);\n    fix\.componentInstance\.label = ([^;\n]+);\n    applyFieldHarnessInputs\([^)]+\);\n    fix\.componentInstance\.required = true;\n    fix\.detectChanges\(\);/g,
    'const fix = createFieldFixture($1, undefined, (f) => { f.componentInstance.label = $2; f.componentInstance.required = true; });',
  );

  if (s !== before) {
    writeFileSync(path, s);
    console.log('patched', path);
  }
}

for (const f of specFiles) {
  fixFile(`/home/tonicarreras/apps/aurea/${f}`);
}

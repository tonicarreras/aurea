#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const repo = new URL('..', import.meta.url).pathname;

const controls = [
  {
    name: 'Textarea',
    file: 'projects/components/src/lib/textarea/textarea.spec.ts',
    selector: 'au-textarea',
    inputClass: 'au-textarea__input',
    rowClass: 'au-textarea__control-row',
    queryHost: 'queryTextareaHostInput',
    queryControl: 'queryTextareaControl',
    create: 'createTextareaFieldFixture',
    host: 'AuTextareaFieldHost',
    oldImport: "import { AuTextarea } from './textarea';",
    newImport: `import { AuTextarea } from './textarea';
import {
  AuTextareaFieldHost,
  applyFieldHarnessInputs,
  createTextareaFieldFixture,
  queryTextareaControl,
  queryTextareaHostInput,
} from '../form-field/form-field.testing';`,
  },
  {
    name: 'InputNumber',
    file: 'projects/components/src/lib/input-number/input-number.spec.ts',
    selector: 'au-input-number',
    inputClass: 'au-input-number__input',
    rowClass: 'au-input-number__control-row',
    queryHost: 'queryInputNumberHostInput',
    queryControl: 'queryInputNumberControl',
    create: 'createInputNumberFieldFixture',
    host: 'AuInputNumberFieldHost',
    oldImport: "import { AuInputNumber } from './input-number';",
    newImport: `import { AuInputNumber } from './input-number';
import {
  AuInputNumberFieldHost,
  applyFieldHarnessInputs,
  createInputNumberFieldFixture,
  queryInputNumberControl,
  queryInputNumberHostInput,
} from '../form-field/form-field.testing';`,
  },
  {
    name: 'InputDate',
    file: 'projects/components/src/lib/input-date/input-date.spec.ts',
    selector: 'au-input-date',
    inputClass: 'au-input-date__input',
    rowClass: 'au-input-date__control-row',
    queryHost: 'queryInputDateHostInput',
    queryControl: 'queryInputDateControl',
    create: 'createInputDateFieldFixture',
    host: 'AuInputDateFieldHost',
    oldImport: "import { AuInputDate } from './input-date';",
    newImport: `import { AuInputDate } from './input-date';
import {
  AuInputDateFieldHost,
  applyFieldHarnessInputs,
  createInputDateFieldFixture,
  queryInputDateControl,
  queryInputDateHostInput,
} from '../form-field/form-field.testing';`,
  },
  {
    name: 'Switch',
    file: 'projects/components/src/lib/switch/switch.spec.ts',
    selector: 'au-switch',
    inputClass: 'au-switch__element',
    rowClass: 'au-switch__control-row',
    queryHost: 'querySwitchHostInput',
    queryControl: 'querySwitchControl',
    create: 'createSwitchFieldFixture',
    host: 'AuSwitchFieldHost',
    oldImport: "import { AuSwitch } from './switch';",
    newImport: `import { AuSwitch } from './switch';
import {
  AuSwitchFieldHost,
  applyFieldHarnessInputs,
  createSwitchFieldFixture,
  querySwitchControl,
  querySwitchHostInput,
} from '../form-field/form-field.testing';`,
    inlineLabel: true,
  },
  {
    name: 'Checkbox',
    file: 'projects/components/src/lib/checkbox/checkbox.spec.ts',
    selector: 'au-checkbox',
    inputClass: 'au-checkbox__element',
    rowClass: 'au-checkbox__wrapper',
    queryHost: 'queryCheckboxHostInput',
    queryControl: 'queryCheckboxControl',
    create: 'createCheckboxFieldFixture',
    host: 'AuCheckboxFieldHost',
    oldImport: "import { AuCheckbox } from './checkbox';",
    newImport: `import { AuCheckbox } from './checkbox';
import {
  AuCheckboxFieldHost,
  applyFieldHarnessInputs,
  createCheckboxFieldFixture,
  queryCheckboxControl,
  queryCheckboxHostInput,
} from '../form-field/form-field.testing';`,
    inlineLabel: true,
  },
  {
    name: 'Select',
    file: 'projects/components/src/lib/select/select.spec.ts',
    selector: 'au-select',
    inputClass: 'au-select__trigger',
    rowClass: 'au-select__control-row',
    queryHost: 'querySelectHostTrigger',
    queryControl: 'querySelectControl',
    create: 'createSelectFieldFixture',
    host: 'AuSelectFieldHost',
    oldImport: "import { AuSelect } from './select';",
    newImport: `import { AuSelect } from './select';
import {
  AuSelectFieldHost,
  applyFieldHarnessInputs,
  createSelectFieldFixture,
  querySelectControl,
  querySelectHostTrigger,
} from '../form-field/form-field.testing';`,
  },
  {
    name: 'Autocomplete',
    file: 'projects/components/src/lib/autocomplete/autocomplete.spec.ts',
    selector: 'au-autocomplete',
    inputClass: 'au-autocomplete__input',
    rowClass: 'au-autocomplete__control-row',
    queryHost: 'queryAutocompleteHostInput',
    queryControl: 'queryAutocompleteControl',
    create: 'createAutocompleteFieldFixture',
    host: 'AuAutocompleteFieldHost',
    oldImport: "import { AuAutocomplete } from './autocomplete';",
    newImport: `import { AuAutocomplete } from './autocomplete';
import {
  AuAutocompleteFieldHost,
  applyFieldHarnessInputs,
  createAutocompleteFieldFixture,
  queryAutocompleteControl,
  queryAutocompleteHostInput,
} from '../form-field/form-field.testing';`,
  },
  {
    name: 'RadioGroup',
    file: 'projects/components/src/lib/radio-group/radio-group.spec.ts',
    selector: 'au-radio-group',
    inputClass: 'au-radio',
    rowClass: 'au-radio-group',
    queryHost: 'queryRadioGroupHost',
    queryControl: 'queryRadioGroupControl',
    create: 'createRadioGroupFieldFixture',
    host: 'AuRadioGroupFieldHost',
    oldImport: "import { AuRadioGroup } from './radio-group';",
    newImport: `import { AuRadioGroup } from './radio-group';
import {
  AuRadioGroupFieldHost,
  applyFieldHarnessInputs,
  createRadioGroupFieldFixture,
  queryRadioGroupControl,
  queryRadioGroupHost,
} from '../form-field/form-field.testing';`,
  },
];

function migrateSpec(c) {
  const path = repo + c.file;
  let s = readFileSync(path, 'utf8');
  if (s.includes(c.host)) {
    console.log('skip', c.file);
    return;
  }

  s = s.replace(c.oldImport, c.newImport);

  const compName = `Au${c.name}`;
  s = s.replaceAll(`ComponentFixture<${compName}>`, `ComponentFixture<${c.host}>`);
  s = s.replaceAll(`TestBed.createComponent(${compName})`, `${c.create}()`);

  s = s.replace(
    new RegExp(`function query\\w+\\(fixture: ComponentFixture<${c.host}>\\)[\\s\\S]*?\\n\\}`, 'm'),
    `function queryInput(fixture: ComponentFixture<${c.host}>) {
    return ${c.queryHost}(fixture);
  }

  function queryControl(fixture: ComponentFixture<${c.host}>) {
    return ${c.queryControl}(fixture);
  }`,
  );

  s = s.replaceAll(`imports: [${compName}]`, `imports: [${c.host}]`);

  // Field chrome -> harness
  s = s.replace(
    /fix\.componentRef\.setInput\('label',\s*([^)]+)\);\n/g,
    (_, v) => `applyFieldHarnessInputs(fix, { label: ${v.trim()} });\n`,
  );
  s = s.replace(
    /fix\.componentRef\.setInput\('hint',\s*([^)]+)\);\n/g,
    (_, v) => `applyFieldHarnessInputs(fix, { hint: ${v.trim()} });\n`,
  );
  s = s.replace(
    /fix\.componentRef\.setInput\('errorMessage',\s*([^)]+)\);\n/g,
    (_, v) => `applyFieldHarnessInputs(fix, { errorMessage: ${v.trim()} });\n`,
  );
  s = s.replace(
    /fix\.componentRef\.setInput\('id',\s*([^)]+)\);\n/g,
    (_, v) => `applyFieldHarnessInputs(fix, { controlId: ${v.trim()} });\n`,
  );

  // Control inputs stay on host instance
  s = s.replaceAll('fix.componentRef.setInput(', 'fix.componentInstance.hostSetInput?.(');
  // revert - host uses properties not setInput for control

  writeFileSync(path, s);
  console.log('migrated', c.file);
}

for (const c of controls) {
  migrateSpec(c);
}

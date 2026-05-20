#!/usr/bin/env node
/**
 * Splits monolithic docs demo files into per-component modules.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const docsApp = path.join(root, 'projects/docs/src/app');

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.endsWith('\n') ? content : content + '\n');
  console.log('wrote', path.relative(root, filePath));
}

function extractBetween(src, start, end) {
  const i = src.indexOf(start);
  if (i < 0) throw new Error(`start not found: ${start.slice(0, 40)}`);
  const j = end ? src.indexOf(end, i) : src.length;
  if (end && j < 0) throw new Error(`end not found: ${end.slice(0, 40)}`);
  return src.slice(i, j).trim();
}

function splitComponents(src, selectorPrefix) {
  const re = new RegExp(
    `@Component\\(\\{[\\s\\S]*?selector:\\s*'${selectorPrefix}[^']+'`,
    'g',
  );
  const starts = [...src.matchAll(re)].map((m) => m.index);
  return starts.map((start, i) => {
    const end = i + 1 < starts.length ? starts[i + 1] : src.length;
    return src.slice(start, end).trim();
  });
}

function slugFromSelector(block, prefix) {
  const m = block.match(new RegExp(`selector:\\s*'${prefix}([^']+)'`));
  return m ? m[1] : null;
}

function importsForExampleBlock(block) {
  const set = new Set();
  const map = [
    [/AuAutocomplete/g, 'AuAutocomplete'],
    [/AuButton/g, 'AuButton'],
    [/AuCardFooter|auCardFooter/g, 'AuCardFooter'],
    [/AuCard|auCardHeader/g, 'AuCard'],
    [/AuCheckbox/g, 'AuCheckbox'],
    [/AuChip/g, 'AuChip'],
    [/AuDialogFooter|auDialogFooter/g, 'AuDialogFooter'],
    [/AuDialog/g, 'AuDialog'],
    [/AuDivider/g, 'AuDivider'],
    [/AuInputDate/g, 'AuInputDate'],
    [/AuInputNumber/g, 'AuInputNumber'],
    [/AuInputText/g, 'AuInputText'],
    [/AuRadioGroup/g, 'AuRadioGroup'],
    [/AuSelect/g, 'AuSelect'],
    [/AuSnackbar/g, 'AuSnackbar'],
    [/AuSwitch/g, 'AuSwitch'],
    [/AuTabPanel|auTabPanel/g, 'AuTabPanel'],
    [/AuTab[^P]|auTab=/g, 'AuTab'],
    [/AuTabs/g, 'AuTabs'],
    [/AuTextarea/g, 'AuTextarea'],
    [/AuTooltip|auTooltip/g, 'AuTooltip'],
    [/RadioOption\[\]/g, 'type RadioOption'],
  ];
  for (const [re, sym] of map) {
    if (re.test(block)) set.add(sym);
  }
  return [...set].sort().join(', ');
}

const slugGroups = {
  button: /^docs-example-button-/,
  'input-text': /^docs-example-input-text-/,
  textarea: /^docs-example-textarea-/,
  checkbox: /^docs-example-checkbox-/,
  switch: /^docs-example-switch-/,
  select: /^docs-example-select-/,
  autocomplete: /^docs-example-autocomplete-/,
  'radio-group': /^docs-example-radio-group-/,
  'input-number': /^docs-example-input-number-/,
  'input-date': /^docs-example-input-date-/,
  dialog: /^docs-example-dialog-/,
  card: /^docs-example-card-/,
  tabs: /^docs-example-tabs-/,
  chip: /^docs-example-chip-/,
  snackbar: /^docs-example-snackbar-/,
  divider: /^docs-example-divider-/,
  tooltip: /^docs-example-tooltip-/,
};

const previewGroups = {
  button: /^docs-preview-button$/,
  'input-text': /^docs-preview-input-text$/,
  textarea: /^docs-preview-textarea$/,
  checkbox: /^docs-preview-checkbox$/,
  switch: /^docs-preview-switch$/,
  select: /^docs-preview-select$/,
  autocomplete: /^docs-preview-autocomplete$/,
  'radio-group': /^docs-preview-radio-group$/,
  'input-number': /^docs-preview-input-number$/,
  'input-date': /^docs-preview-input-date$/,
  dialog: /^docs-preview-dialog$/,
  card: /^docs-preview-card$/,
  tabs: /^docs-preview-tabs$/,
  chip: /^docs-preview-chip$/,
  snackbar: /^docs-preview-snackbar$/,
  divider: /^docs-preview-divider$/,
  tooltip: /^docs-preview-tooltip$/,
};

function layoutImport(slug, block) {
  if (block.includes('DEMO_ROW_TIGHT') || (slug === 'chip' && block.includes('docs-demo-row')))
    return "\nimport { DEMO_ROW_TIGHT } from '../shared/demo-layout';";
  if (block.includes('DEMO_ROW') || block.includes('docs-demo-row'))
    return "\nimport { DEMO_ROW } from '../shared/demo-layout';";
  if (block.includes('DEMO_STACK') || block.includes('docs-demo-stack'))
    return "\nimport { DEMO_STACK } from '../shared/demo-layout';";
  return '';
}

function fixtureImport(slug) {
  if (slug === 'select') return "\nimport { selectOptions } from '../shared/demo-fixtures';";
  if (slug === 'autocomplete') return "\nimport { autocompleteOptions } from '../shared/demo-fixtures';";
  if (slug === 'radio-group') return "\nimport { radioOptions } from '../shared/demo-fixtures';";
  return '';
}

const angularImport =
  "import { ChangeDetectionStrategy, Component, model } from '@angular/core';";

const exampleSrc = fs.readFileSync(
  path.join(docsApp, 'demos/component-doc-example-demos.ts'),
  'utf8',
).replace(/^const DEMO_ROW[\s\S]*?^];/m, '')
  .replace(/^const DEMO_STACK[\s\S]*?`;[\s\S]*?^const radioOptions[\s\S]*?^];/m, '');

const exampleBlocks = splitComponents(exampleSrc, 'docs-example-');
const bySlug = Object.fromEntries(Object.keys(slugGroups).map((s) => [s, []]));

for (const block of exampleBlocks) {
  const sel = slugFromSelector(block, 'docs-example-');
  if (!sel) continue;
  for (const [slug, re] of Object.entries(slugGroups)) {
    if (re.test(`docs-example-${sel}`)) {
      bySlug[slug].push(block.replace(/styles: \[DEMO_ROW\]/g, 'styles: [DEMO_ROW]').replace(/styles: \[DEMO_STACK\]/g, 'styles: [DEMO_STACK]'));
      break;
    }
  }
}

for (const [slug, blocks] of Object.entries(bySlug)) {
  const body = blocks.join('\n\n');
  const imports = importsForExampleBlock(body);
  const needsModel = body.includes('model(');
  const ang = needsModel
    ? angularImport
    : "import { ChangeDetectionStrategy, Component } from '@angular/core';";
  write(
    path.join(docsApp, `demos/examples/${slug}.examples.ts`),
    `${ang}
import { ${imports} } from '@aurea-design-system/components';${layoutImport(slug, body)}${fixtureImport(slug)}

${body}
`,
  );
}

const previewSrc = fs.readFileSync(path.join(docsApp, 'demos/component-demos.ts'), 'utf8')
  .replace(/^const selectOptions[\s\S]*?^];/m, '')
  .replace(/^const autocompleteOptions[\s\S]*?^];/m, '')
  .replace(/^const radioOptions[\s\S]*?^];/m, '');

const previewBlocks = splitComponents(previewSrc, 'docs-preview-');
const byPreview = Object.fromEntries(Object.keys(previewGroups).map((s) => [s, []]));

for (const block of previewBlocks) {
  const sel = slugFromSelector(block, 'docs-preview-');
  if (!sel) continue;
  for (const [slug, re] of Object.entries(previewGroups)) {
    if (re.test(`docs-preview-${sel}`)) {
      let b = block
        .replace(/styles: \[\s*`[^`]*docs-demo-row[^`]*`[\s\S]*?\]/g, 'styles: [DEMO_ROW]')
        .replace(/styles: \[\s*`[^`]*docs-demo-stack[^`]*`[\s\S]*?\]/g, 'styles: [DEMO_STACK]');
      if (slug === 'chip') b = b.replace('styles: [DEMO_ROW]', 'styles: [DEMO_ROW_TIGHT]');
      byPreview[slug].push(b);
      break;
    }
  }
}

for (const [slug, blocks] of Object.entries(byPreview)) {
  const body = blocks.join('\n\n');
  const imports = importsForExampleBlock(body);
  const needsModel = body.includes('model(');
  const ang = needsModel
    ? angularImport
    : "import { ChangeDetectionStrategy, Component } from '@angular/core';";
  write(
    path.join(docsApp, `demos/previews/${slug}.preview.ts`),
    `${ang}
import { ${imports} } from '@aurea-design-system/components';${layoutImport(slug, body)}${fixtureImport(slug)}

${body}
`,
  );
}

write(
  path.join(docsApp, 'demos/examples/index.ts'),
  Object.keys(slugGroups).map((s) => `export * from './${s}.examples';`).join('\n') + '\n',
);
write(
  path.join(docsApp, 'demos/previews/index.ts'),
  Object.keys(previewGroups).map((s) => `export * from './${s}.preview';`).join('\n') + '\n',
);

// —— i18n examples (metadata only, per slug) ——
for (const locale of ['es', 'en']) {
  const src = fs.readFileSync(
    path.join(docsApp, `i18n/locales/${locale}/examples.ts`),
    'utf8',
  );
  const recordBody = src.slice(src.indexOf('export const COMPONENT_DOC_EXAMPLES'));
  const keys = [...recordBody.matchAll(/^\s{2}(?:'([^']+)'|(\w+)):\s*\[/gm)].map((m) => m[1] ?? m[2]);

  for (const key of keys) {
    const quoted = key.includes('-') ? `'${key}'` : key;
    const block = extractBetween(
      recordBody,
      `${quoted}: [`,
      keys.indexOf(key) < keys.length - 1
        ? `${keys[keys.indexOf(key) + 1].includes('-') ? `'${keys[keys.indexOf(key) + 1]}'` : keys[keys.indexOf(key) + 1]}: [`
        : '  ],\n};',
    );
    const arrayContent = block
      .replace(/^[^:]+:\s*\[/, '')
      .replace(/\s*\],?\s*$/, '')
      .trim();
    const demoImports = [...new Set([...arrayContent.matchAll(/demoComponent:\s*(\w+)/g)].map((m) => m[1]))].sort();

    write(
      path.join(docsApp, `i18n/locales/${locale}/examples/${key}.ts`),
      `import {
${demoImports.map((n) => `  ${n},`).join('\n')}
} from '../../../../demos/examples/${key}.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
${arrayContent}
];
`,
    );
  }

  const exportName = locale === 'es' ? 'COMPONENT_DOC_EXAMPLES_ES' : 'COMPONENT_DOC_EXAMPLES_EN';
  write(
    path.join(docsApp, `i18n/locales/${locale}/examples/index.ts`),
    `${keys.map((k) => `import { examples as ${k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Examples } from './${k}';`).join('\n')}
import type { ComponentDocExample } from '../../../types/example';

export type { ComponentDocExample } from '../../../types/example';

export const ${exportName}: Record<string, ComponentDocExample[]> = {
${keys.map((k) => `  ${k.includes('-') ? `'${k}'` : k}: ${k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Examples,`).join('\n')}
};
`,
  );
}

console.log('Done.');

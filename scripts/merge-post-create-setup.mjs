import { readFileSync, writeFileSync } from 'node:fs';

const files = [
  'projects/components/src/lib/autocomplete/autocomplete.spec.ts',
  'projects/components/src/lib/select/select.spec.ts',
  'projects/components/src/lib/radio-group/radio-group.spec.ts',
  'projects/components/src/lib/checkbox/checkbox.spec.ts',
  'projects/components/src/lib/textarea/textarea.spec.ts',
];

const repo = '/home/tonicarreras/apps/aurea/';

const setupLine =
  /^\s*(fix\w*)\.(componentInstance\.\w+ = [^;]+;|componentRef\.setInput\([^;]+;)\s*$/;
const applyLine = /^\s*(fix\w*)\.componentRef\.setInput\(/;
const createRe =
  /^(\s*)const (fix\w*) = createFieldFixture\(([^;]+)\);$/;

for (const rel of files) {
  const path = repo + rel;
  const lines = readFileSync(path, 'utf8').split('\n');
  const out = [];
  let i = 0;
  let changed = false;

  while (i < lines.length) {
    const m = lines[i].match(createRe);
    if (!m) {
      out.push(lines[i]);
      i++;
      continue;
    }

    const [, indent, varName, hostArgs] = m;
    const setup = [];
    let j = i + 1;

    while (j < lines.length) {
      const line = lines[j];
      if (line.trim() === `${varName}.detectChanges();`) {
        j++;
        break;
      }
      if (
        line.match(new RegExp(`^\\s*${varName}\\.componentInstance\\.`)) ||
        line.match(new RegExp(`^\\s*${varName}\\.componentRef\\.setInput\\(`)) ||
        line.match(new RegExp(`^\\s*applyFieldHarnessInputs\\(${varName}`))
      ) {
        setup.push(line);
        j++;
        continue;
      }
      break;
    }

    if (setup.length === 0) {
      out.push(lines[i]);
      i++;
      continue;
    }

    changed = true;
    const initBody = setup
      .map((line) => {
        let l = line.replace(new RegExp(`\\b${varName}\\.componentInstance\\.`, 'g'), 'f.componentInstance.');
        l = l.replace(new RegExp(`\\b${varName}\\.componentRef\\.`, 'g'), 'f.componentRef.');
        l = l.replace(new RegExp(`applyFieldHarnessInputs\\(${varName}`, 'g'), 'applyFieldHarnessInputs(f');
        return l;
      })
      .join('\n');

    const hasFieldArg = hostArgs.includes('undefined') || hostArgs.includes('{');
    let args = hostArgs;
    if (!hasFieldArg) {
      args = `${hostArgs}, undefined`;
    }
    out.push(`${indent}const ${varName} = createFieldFixture(${args}, (f) => {`);
    out.push(initBody);
    out.push(`${indent}});`);
    i = j;
  }

  if (changed) {
    writeFileSync(path, out.join('\n'));
    console.log('merged', rel);
  }
}

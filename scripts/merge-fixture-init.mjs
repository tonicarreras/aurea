import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const files = globSync('projects/components/src/lib/**/*.spec.ts', {
  cwd: '/home/tonicarreras/apps/aurea',
  absolute: true,
});

const propRe =
  /const (\w+) = createFieldFixture\(([^)]+)(?:, ([^)]+))?\);\n(?:    applyFieldHarnessInputs\(\1, ([^)]+)\);\n)?((?:    \1\.componentInstance\.\w+ = [^;\n]+;\n)+)    \1\.detectChanges\(\);/g;

for (const path of files) {
  let s = readFileSync(path, 'utf8');
  const before = s;
  s = s.replace(propRe, (_m, varName, host, fieldArg, harnessArg, assigns) => {
    const field = fieldArg ?? (harnessArg ? harnessArg : 'undefined');
    const body = assigns
      .trim()
      .split('\n')
      .map((line) => line.replace(`    ${varName}.componentInstance.`, '    f.componentInstance.'))
      .join('\n');
    return `const ${varName} = createFieldFixture(${host}, ${field}, (f) => {\n${body}\n});`;
  });
  if (s !== before) {
    writeFileSync(path, s);
    console.log('patched', path);
  }
}

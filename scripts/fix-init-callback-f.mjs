import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const files = globSync('projects/components/src/lib/**/*.spec.ts', {
  cwd: '/home/tonicarreras/apps/aurea',
  absolute: true,
});

for (const path of files) {
  let s = readFileSync(path, 'utf8');
  const before = s;
  s = s.replace(
    /\(f\) => \{\n(\s*)fix\.componentInstance\./g,
    '(f) => {\n$1f.componentInstance.',
  );
  if (s !== before) {
    writeFileSync(path, s);
    console.log('fixed', path);
  }
}

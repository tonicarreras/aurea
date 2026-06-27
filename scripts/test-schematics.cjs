#!/usr/bin/env node
/**
 * Integration tests for ng-add schematic (requires built schematics in dist/).
 */
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { SchematicTestRunner, UnitTestTree } = require('@angular-devkit/schematics/testing');
const { EmptyTree } = require('@angular-devkit/schematics');

const collectionPath = join(__dirname, '../dist/components/schematics/collection.json');

function createHostTree() {
  const tree = new UnitTestTree(new EmptyTree());
  tree.create(
    'angular.json',
    JSON.stringify(
      {
        projects: {
          app: {
            architect: {
              build: {
                options: {
                  styles: ['src/styles.css'],
                },
              },
            },
          },
        },
        defaultProject: 'app',
      },
      null,
      2,
    ),
  );
  return tree;
}

function readStyles(tree) {
  const config = JSON.parse(tree.readContent('angular.json'));
  return config.projects.app.architect.build.options.styles;
}

async function main() {
  const runner = new SchematicTestRunner('aurea-schematics', collectionPath);
  let failed = 0;

  const pkgRoot = join(__dirname, '../dist/components');
  const { createRequire } = require('module');
  const req = createRequire(join(pkgRoot, 'package.json'));
  try {
    req('./schematics/ng-add/index.cjs');
  } catch (err) {
    console.error('FAIL: schematic factory must load under package "type": "module"');
    console.error(err);
    failed++;
  }

  const host = createHostTree();
  let result = await runner.runSchematic('ng-add', {}, host);
  const styles = readStyles(result);
  if (!styles.includes('node_modules/@aurea-design-system/components/styles/au-tokens.css')) {
    console.error('FAIL: au-tokens.css not added');
    failed++;
  }
  if (!styles.includes('node_modules/@aurea-design-system/components/styles/aurea-global.css')) {
    console.error('FAIL: aurea-global.css not added');
    failed++;
  }

  result = await runner.runSchematic('ng-add', {}, result);
  const tokenCount = readStyles(result).filter((s) => s.includes('au-tokens.css')).length;
  if (tokenCount !== 1) {
    console.error(`FAIL: expected 1 au-tokens.css entry, got ${tokenCount}`);
    failed++;
  }

  const emptyRunner = new SchematicTestRunner('aurea-schematics', collectionPath);
  const warnTree = new UnitTestTree(new EmptyTree());
  const logs = [];
  emptyRunner.logger.subscribe((entry) => logs.push(entry.message));
  await emptyRunner.runSchematic('ng-add', {}, warnTree);
  if (!logs.some((m) => m.includes('No angular.json found'))) {
    console.error('FAIL: expected warning when angular.json missing');
    failed++;
  }

  if (failed > 0) {
    process.exit(1);
  }
  console.log('Schematic tests OK (4 checks).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

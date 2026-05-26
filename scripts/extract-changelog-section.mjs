#!/usr/bin/env node
/**
 * Prints the CHANGELOG section for a semver (stdout). Used by publish.yml for GitHub Release body.
 * Usage: node scripts/extract-changelog-section.mjs 0.9.0
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const version = process.argv[2];
if (!version) {
  console.error('Usage: extract-changelog-section.mjs <semver>');
  process.exit(1);
}

const changelog = readFileSync(join(process.cwd(), 'CHANGELOG.md'), 'utf8');
const header = `## [${version}]`;
const start = changelog.indexOf(header);
if (start === -1) {
  console.error(`No CHANGELOG section found for ${version}`);
  process.exit(1);
}

const afterHeader = changelog.indexOf('\n', start) + 1;
const nextSection = changelog.indexOf('\n## ', afterHeader);
const body = (
  nextSection === -1 ? changelog.slice(afterHeader) : changelog.slice(afterHeader, nextSection)
).trim();

console.log(`# @aurea-design-system/components ${version}\n\n${body}`);

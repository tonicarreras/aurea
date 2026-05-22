export interface StoryDocsWhenToUse {
  use: string[];
  avoid: string[];
}

export interface StoryDocsAnatomyRow {
  region: string;
  notes: string;
}

export interface StoryDocsTokenRow {
  concern: string;
  examples: string;
}

export interface StoryDocsA11yRow {
  topic: string;
  detail: string;
}

export interface StoryDocsKeyboardRow {
  interaction: string;
  behavior: string;
}

export interface StoryDocsOverviewInput {
  overview: string;
  whenToUse: StoryDocsWhenToUse;
  anatomy: StoryDocsAnatomyRow[];
  accessibility: StoryDocsA11yRow[];
  keyboard?: StoryDocsKeyboardRow[];
  tokens?: StoryDocsTokenRow[];
  extra?: string;
}

/** Builds the standard Aurea Storybook component docs markdown (matches input-text sections). */
export function buildStoryDocsOverview(input: StoryDocsOverviewInput): string {
  const useRows = input.whenToUse.use.map((u) => `| ${u} | |`).join('\n');
  const avoidRows = input.whenToUse.avoid.map((a) => `| | ${a} |`).join('\n');
  const anatomyRows = input.anatomy.map((r) => `| ${r.region} | ${r.notes} |`).join('\n');
  const a11yRows = input.accessibility.map((a) => `| ${a.topic} | ${a.detail} |`).join('\n');

  let md = `## Overview

${input.overview}

## When to use

| Use | Prefer something else |
|-----|------------------------|
${useRows}
${avoidRows}

## Anatomy

| Region | Notes |
|--------|-------|
${anatomyRows}
`;

  if (input.keyboard?.length) {
    const kbRows = input.keyboard.map((k) => `| ${k.interaction} | ${k.behavior} |`).join('\n');
    md += `
## Keyboard and focus

| Interaction | Behavior |
|-------------|----------|
${kbRows}
`;
  }

  md += `
## Accessibility

| Topic | Implementation |
|-------|----------------|
${a11yRows}
`;

  if (input.tokens?.length) {
    const tokenRows = input.tokens.map((t) => `| ${t.concern} | ${t.examples} |`).join('\n');
    md += `
## Design tokens (reference)

| Concern | Token examples |
|---------|----------------|
${tokenRows}

See **docs/DESIGN.md** for the full token model.
`;
  }

  if (input.extra) {
    md += `\n${input.extra}\n`;
  }

  return md.trim();
}

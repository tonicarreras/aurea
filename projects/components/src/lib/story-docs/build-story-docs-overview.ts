export type StoryDocsLocale = 'en' | 'es';

const HEADINGS: Record<
  StoryDocsLocale,
  {
    overview: string;
    whenToUse: string;
    useCol: string;
    avoidCol: string;
    anatomy: string;
    regionCol: string;
    notesCol: string;
    keyboard: string;
    interactionCol: string;
    behaviorCol: string;
    accessibility: string;
    topicCol: string;
    implementationCol: string;
    tokens: string;
    concernCol: string;
    examplesCol: string;
    tokensFooter: string;
  }
> = {
  en: {
    overview: 'Overview',
    whenToUse: 'When to use',
    useCol: 'Use',
    avoidCol: 'Prefer something else',
    anatomy: 'Anatomy',
    regionCol: 'Region',
    notesCol: 'Notes',
    keyboard: 'Keyboard and focus',
    interactionCol: 'Interaction',
    behaviorCol: 'Behavior',
    accessibility: 'Accessibility',
    topicCol: 'Topic',
    implementationCol: 'Implementation',
    tokens: 'Design tokens (reference)',
    concernCol: 'Concern',
    examplesCol: 'Token examples',
    tokensFooter: 'See **docs/DESIGN.md** for the full token model.',
  },
  es: {
    overview: 'Resumen',
    whenToUse: 'Cuándo usarlo',
    useCol: 'Usar',
    avoidCol: 'Mejor alternativa',
    anatomy: 'Anatomía',
    regionCol: 'Región',
    notesCol: 'Notas',
    keyboard: 'Teclado y foco',
    interactionCol: 'Interacción',
    behaviorCol: 'Comportamiento',
    accessibility: 'Accesibilidad',
    topicCol: 'Tema',
    implementationCol: 'Implementación',
    tokens: 'Tokens de diseño (referencia)',
    concernCol: 'Aspecto',
    examplesCol: 'Ejemplos de tokens',
    tokensFooter: 'Consulta **docs/DESIGN.md** para el modelo completo de tokens.',
  },
};

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

/** Builds the standard Aurea Storybook component docs markdown (matches docs site overview). */
export function buildStoryDocsOverview(
  input: StoryDocsOverviewInput,
  locale: StoryDocsLocale = 'en',
): string {
  const h = HEADINGS[locale];
  const useRows = input.whenToUse.use.map((u) => `| ${u} | |`).join('\n');
  const avoidRows = input.whenToUse.avoid.map((a) => `| | ${a} |`).join('\n');
  const anatomyRows = input.anatomy.map((r) => `| ${r.region} | ${r.notes} |`).join('\n');
  const a11yRows = input.accessibility.map((a) => `| ${a.topic} | ${a.detail} |`).join('\n');

  let md = `## ${h.overview}

${input.overview}

## ${h.whenToUse}

| ${h.useCol} | ${h.avoidCol} |
|-----|------------------------|
${useRows}
${avoidRows}

## ${h.anatomy}

| ${h.regionCol} | ${h.notesCol} |
|--------|-------|
${anatomyRows}
`;

  if (input.keyboard?.length) {
    const kbRows = input.keyboard.map((k) => `| ${k.interaction} | ${k.behavior} |`).join('\n');
    md += `
## ${h.keyboard}

| ${h.interactionCol} | ${h.behaviorCol} |
|-------------|----------|
${kbRows}
`;
  }

  md += `
## ${h.accessibility}

| ${h.topicCol} | ${h.implementationCol} |
|-------|----------------|
${a11yRows}
`;

  if (input.tokens?.length) {
    const tokenRows = input.tokens.map((t) => `| ${t.concern} | ${t.examples} |`).join('\n');
    md += `
## ${h.tokens}

| ${h.concernCol} | ${h.examplesCol} |
|---------|----------------|
${tokenRows}

${h.tokensFooter}
`;
  }

  if (input.extra) {
    md += `\n${input.extra}\n`;
  }

  return md.trim();
}

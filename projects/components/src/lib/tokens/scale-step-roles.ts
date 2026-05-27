/**
 * Radix-aligned functional roles for Aurea's 12-step color scales.
 * Same step numbers map to the same UI purpose across neutral, action, and semantic scales.
 */

export type AureaScaleStepGroupId =
  | 'backgrounds'
  | 'interactive'
  | 'borders'
  | 'solid'
  | 'text';

export interface AureaScaleStepGroup {
  readonly id: AureaScaleStepGroupId;
  /** Column group heading (Radix Colors style). */
  readonly title: string;
  readonly steps: readonly [number, number] | readonly [number, number, number];
  /** One short label per step in this group (tooltip / docs). */
  readonly stepLabels: readonly string[];
}

/** Steps 1–12 grouped like https://www.radix-ui.com/colors */
export const AUREA_SCALE_STEP_GROUPS: readonly AureaScaleStepGroup[] = [
  {
    id: 'backgrounds',
    title: 'Backgrounds',
    steps: [1, 2],
    stepLabels: ['App background', 'Subtle background'],
  },
  {
    id: 'interactive',
    title: 'Interactive components',
    steps: [3, 4, 5],
    stepLabels: ['UI element background', 'UI element background (hover)', 'UI element background (active)'],
  },
  {
    id: 'borders',
    title: 'Borders and separators',
    steps: [6, 7, 8],
    stepLabels: ['Subtle borders', 'UI element border and focus rings', 'Stronger borders'],
  },
  {
    id: 'solid',
    title: 'Solid colors',
    steps: [9, 10],
    stepLabels: ['Solid background', 'Solid background (hover)'],
  },
  {
    id: 'text',
    title: 'Accessible text',
    steps: [11, 12],
    stepLabels: ['Low-contrast text', 'High-contrast text'],
  },
] as const;

export const AUREA_SCALE_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

const STEP_ROLE_BY_NUMBER = new Map<number, { group: AureaScaleStepGroup; label: string }>(
  AUREA_SCALE_STEP_GROUPS.flatMap((group) =>
    group.steps.map((step, index) => [
      step,
      { group, label: group.stepLabels[index] ?? '' },
    ]),
  ),
);

/** Full tooltip: e.g. "Step 9 · Solid colors · Solid background" */
export function aureaScaleStepTooltip(step: number): string {
  const role = STEP_ROLE_BY_NUMBER.get(step);
  if (!role) {
    return `Step ${step}`;
  }
  return `Step ${step} · ${role.group.title} · ${role.label}`;
}

/** Group that contains this step (1–12). */
export function aureaScaleStepGroup(step: number): AureaScaleStepGroup | undefined {
  return STEP_ROLE_BY_NUMBER.get(step)?.group;
}

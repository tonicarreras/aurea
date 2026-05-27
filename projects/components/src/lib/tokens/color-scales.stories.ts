import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';
import {
  AUREA_SCALE_STEP_GROUPS,
  AUREA_SCALE_STEPS,
  aureaScaleStepTooltip,
} from './scale-step-roles';

const SCALE_NAMES = ['neutral', 'action', 'error', 'success', 'warning', 'info'] as const;

const SCALE_LABELS: Record<string, string> = {
  neutral: 'Neutral (slate-gray)',
  action: 'Action (blue)',
  error: 'Error (red)',
  success: 'Success (green)',
  warning: 'Warning (amber)',
  info: 'Info (sky-blue)',
};

const meta: Meta = {
  title: 'Aurea/Color Scales',
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('color-scales' as never),
};

export default meta;
type Story = StoryObj;

function groupHeaderRow(): string {
  return AUREA_SCALE_STEP_GROUPS.map(
    (group) => `
      <th
        colspan="${group.steps.length}"
        style="
          padding: 6px 4px;
          font-size: 10px;
          font-weight: 600;
          text-align: center;
          color: var(--au-scale-neutral-11);
          border-bottom: 1px solid var(--au-scale-neutral-5);
        "
      >${group.title}</th>`,
  ).join('');
}

function stepNumberRow(): string {
  return AUREA_SCALE_STEPS.map(
    (step) => `
      <th
        style="font-size: 10px; color: var(--au-scale-neutral-10); font-weight: 500; padding: 4px 2px;"
        title="${aureaScaleStepTooltip(step)}"
      >${step}</th>`,
  ).join('');
}

function swatchBlock(theme: 'light' | 'dark' | 'toolbar'): string {
  const themeAttr = theme === 'dark' ? `data-au-theme="dark"` : '';
  const sectionLabel =
    theme === 'toolbar'
      ? 'Current toolbar theme'
      : theme === 'light'
        ? 'Light theme'
        : 'Dark theme';

  const scaleRows = SCALE_NAMES.map(
    (scale) => `
      <tr>
        <td style="padding: 4px 12px 4px 0; white-space: nowrap; font-size: 12px; color: var(--au-scale-neutral-11); vertical-align: middle;">${SCALE_LABELS[scale]}</td>
        ${AUREA_SCALE_STEPS.map((step) => {
          const group = AUREA_SCALE_STEP_GROUPS.find((g) => (g.steps as readonly number[]).includes(step));
          const groupIndex = group ? (group.steps as readonly number[]).indexOf(step) : -1;
          const roleLabel = group && groupIndex >= 0 ? group.stepLabels[groupIndex] : '';
          const borderLeft =
            groupIndex === 0 ? 'border-left: 2px solid var(--au-scale-neutral-5);' : '';
          return `
            <td style="padding: 2px; ${borderLeft}">
              <div style="
                width: 32px; height: 32px; border-radius: 6px;
                background: var(--au-scale-${scale}-${step});
                border: 1px solid var(--au-scale-neutral-6);
                box-shadow: 0 1px 2px rgba(0,0,0,0.06);
              " title="${aureaScaleStepTooltip(step)}&#10;--au-scale-${scale}-${step}"></div>
              <div style="font-size: 8px; text-align: center; margin-top: 2px; color: var(--au-scale-neutral-9); max-width: 4.5rem; line-height: 1.2;">${roleLabel}</div>
            </td>`;
        }).join('')}
      </tr>`,
  ).join('');

  return `
    <div ${themeAttr} style="
      background: var(--au-scale-neutral-3);
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 16px;
    ">
      <h3 style="
        font-size: 14px; font-weight: 600; margin: 0 0 12px 0;
        color: var(--au-scale-neutral-12);
      ">${sectionLabel}</h3>
      <div style="overflow-x: auto;">
        <table style="border-collapse: collapse;">
          <thead>
            <tr>
              <th style="width: 8rem;"></th>
              ${groupHeaderRow()}
            </tr>
            <tr>
              <th></th>
              ${stepNumberRow()}
            </tr>
          </thead>
          <tbody>
            ${scaleRows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export const AllScales: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All 6 twelve-step scales in **light** and **dark** side-by-side, with **Radix-style column groups** (Backgrounds → Interactive → Borders → Solid → Accessible text). This comparison is fixed and does not depend on the Storybook theme toolbar.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [] },
    template: `
      <div style="font-family: var(--au-font-sans, system-ui, sans-serif); max-width: 100%;">
        <p style="font-size: 13px; color: #5c6b7d; margin: 0 0 16px; max-width: 52rem;">
          Steps 1–12 follow the same functional roles as
          <a href="https://www.radix-ui.com/colors" target="_blank" rel="noopener noreferrer">Radix Colors</a>.
          Semantic tokens in <code>au-tokens.css</code> pick specific steps (e.g. action-9 for primary buttons).
        </p>
        ${swatchBlock('light')}
        ${swatchBlock('dark')}
      </div>
    `,
  }),
};

export const ToolbarThemeScale: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Single scale matrix bound to the active Storybook theme toolbar (`auTheme` + high-contrast). Use this story to validate that theme switching is applied.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [] },
    template: `
      <div style="font-family: var(--au-font-sans, system-ui, sans-serif); max-width: 100%;">
        <p style="font-size: 13px; color: #5c6b7d; margin: 0 0 16px; max-width: 52rem;">
          This table follows the current Storybook toolbar theme.
        </p>
        ${swatchBlock('toolbar')}
      </div>
    `,
  }),
};

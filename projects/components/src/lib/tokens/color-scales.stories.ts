import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

/**
 * Swatch grid for each scale step.
 * Displayed in a single row so the lightness progression is immediately visible.
 */
const SCALE_NAMES = ['neutral', 'action', 'error', 'success', 'warning', 'info'] as const;
const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

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

function swatchBlock(theme: 'light' | 'dark'): string {
  const themeAttr =
    theme === 'dark' ? `data-au-theme="dark"` : '';
  const sectionLabel = theme === 'light' ? 'Light theme' : 'Dark theme';

  const scaleRows = SCALE_NAMES.map(
    (scale) => `
      <tr>
        <td style="padding: 4px 12px 4px 0; white-space: nowrap; font-size: 12px; color: var(--au-scale-neutral-11);">${SCALE_LABELS[scale]}</td>
        ${STEPS.map(
          (step) => `
            <td style="padding: 2px;">
              <div style="
                width: 32px; height: 32px; border-radius: 6px;
                background: var(--au-scale-${scale}-${step});
                border: 1px solid var(--au-scale-neutral-6);
                box-shadow: 0 1px 2px rgba(0,0,0,0.06);
              " title="--au-scale-${scale}-${step}"></div>
              <div style="font-size: 9px; text-align: center; margin-top: 2px; color: var(--au-scale-neutral-10);">${step}</div>
            </td>`,
        ).join('')}
      </tr>`,
  ).join('');

  return `
    <div ${themeAttr} style="
      background: var(--au-scale-neutral-1);
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 16px;
    ">
      <h3 style="
        font-size: 14px; font-weight: 600; margin: 0 0 12px 0;
        color: var(--au-scale-neutral-11);
      ">${sectionLabel}</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            ${STEPS.map((s) => `<th style="font-size: 10px; color: var(--au-scale-neutral-10); font-weight: 400;">${s}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${scaleRows}
        </tbody>
      </table>
    </div>
  `;
}

export const AllScales: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All 6 12-step color scales in **light** and **dark** themes. Each swatch shows the value of `--au-scale-{name}-{step}`. Steps 1–12 progress from lightest to darkest relative to the theme.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [] },
    template: `
      <div style="font-family: var(--au-font-sans, system-ui, sans-serif); max-width: 800px;">
        ${swatchBlock('light')}
        ${swatchBlock('dark')}
      </div>
    `,
  }),
};

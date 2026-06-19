import type { Meta, StoryObj } from '@storybook/angular';

import { AuButton } from '../button';
import { AuCard } from '../card';
import { AuCardFooter } from '../card/card-footer.directive';
import { AuCluster, AuSection, AuSplit, AuStack } from '../layout';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

const storyImports = {
  imports: [AuStack, AuCluster, AuSplit, AuSection, AuCard, AuCardFooter, AuButton],
};

const meta: Meta = {
  title: 'Aurea/Layout',
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('layout'),
};

export default meta;
type Story = StoryObj;

export const Stack: Story = {
  render: () => ({
    ...storyImports,
    template: `
      <div auStack gap="md" separator="solid" style="max-width: 24rem">
        <p style="margin:0">First block</p>
        <p style="margin:0">Second block</p>
        <p style="margin:0">Third block</p>
      </div>
    `,
  }),
};

export const Cluster: Story = {
  render: () => ({
    ...storyImports,
    template: `
      <div auCluster gap="sm" justify="end" style="max-width: 24rem">
        <button auButton variant="ghost" type="button">Cancel</button>
        <button auButton type="button">Save</button>
      </div>
    `,
  }),
};

export const Split: Story = {
  render: () => ({
    ...storyImports,
    template: `
      <div auSplit ratio="1:2" gap="lg" style="max-width: 36rem">
        <div>
          <strong>Notifications</strong>
          <p style="margin:0.25rem 0 0;color:var(--au-color-text-secondary)">Email alerts for billing.</p>
        </div>
        <div auCluster gap="sm" justify="end">
          <button auButton variant="outline" type="button">Configure</button>
        </div>
      </div>
    `,
  }),
};

export const CardComposition: Story = {
  render: () => ({
    ...storyImports,
    template: `
      <au-card variant="elevated" style="max-width: 28rem">
        <div auSection padding="lg">
          <div auStack gap="sm">
            <span auCardHeader>Revenue</span>
            <span auCardBody style="font-size:var(--au-text-xl)">$24,500</span>
          </div>
        </div>
        <div auCardFooter>
          <div auCluster gap="sm" justify="end">
            <button auButton variant="ghost" type="button">Details</button>
            <button auButton type="button">Export</button>
          </div>
        </div>
      </au-card>
    `,
  }),
};

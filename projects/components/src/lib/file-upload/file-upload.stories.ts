import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuFormField } from '../form-field/form-field';
import { AuFileUpload } from './file-upload';

const meta: Meta<AuFileUpload> = {
  title: 'Aurea/FileUpload',
  component: AuFileUpload,
  tags: ['autodocs', 'au', 'beta'],
  parameters: storyMetaParameters('file-upload'),
  argTypes: {
    multiple: { control: 'boolean', table: { category: 'Behavior' } },
    accept: { control: 'text', table: { category: 'Behavior' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    browseLabel: { control: 'text', table: { category: 'Content' } },
    dropLabel: { control: 'text', table: { category: 'Content' } },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance' },
    },
  },
  args: {
    multiple: true,
    accept: '',
    disabled: false,
    browseLabel: 'Browse files',
    dropLabel: 'Drag files here or browse',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<AuFileUpload>;

export const Default: Story = {
  render: (args) => ({
    props: { ...args, files: [] as File[] },
    moduleMetadata: { imports: [AuFormField, AuFileUpload] },
    template: `
      <au-form-field label="Attachments" hint="PDF or images up to 10 MB each.">
        <au-file-upload
          [(value)]="files"
          [multiple]="multiple"
          [accept]="accept"
          [disabled]="disabled"
          [browseLabel]="browseLabel"
          [dropLabel]="dropLabel"
          [size]="size"
        />
      </au-form-field>
    `,
  }),
};

export const SingleFile: Story = {
  args: { multiple: false, dropLabel: 'Drop a file here or browse' },
  render: Default.render,
};

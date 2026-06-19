import type { ThemeHostOverride } from '../../types/themes';

export const THEME_HOST_OVERRIDES_EN: ThemeHostOverride[] = [
  {
    host: 'au-card',
    token: '--au-card-padding',
    description: 'Inner padding; `size` on the host sets sm/md/lg presets.',
  },
  {
    host: 'au-card',
    token: '--au-card-main-gap',
    description: 'Gap between header and body.',
  },
  {
    host: 'au-card',
    token: '--au-card-footer-gap',
    description: 'Footer spacing and top border inset.',
  },
  {
    host: 'au-table',
    token: '--au-table-row-hover',
    description: 'Row background on pointer hover.',
  },
  {
    host: 'au-table',
    token: '--au-table-row-stripe',
    description: 'Alternating row background when `striped` is enabled.',
  },
  {
    host: 'au-table',
    token: '--au-table-header-bg',
    description: 'Header row background.',
  },
  {
    host: 'au-table',
    token: '--au-table-cell-x / --au-table-cell-y',
    description: 'Cell padding; `[data-au-compact]` tightens both.',
  },
  {
    host: 'au-message',
    token: '--au-message-bg / --au-message-border',
    description: 'Surface colors; variant presets set defaults you can override.',
  },
  {
    host: 'au-message',
    token: '--au-message-accent / --au-message-title',
    description: 'Icon accent and title color on the host.',
  },
  {
    host: 'textarea.au-textarea',
    token: '--au-textarea-min-h-md',
    description: 'Minimum height; `size` on the host adjusts sm/md/lg presets.',
  },
  {
    host: 'textarea.au-textarea',
    token: '--au-textarea-pad-block',
    description: 'Vertical padding inside the native textarea.',
  },
  {
    host: 'textarea.au-textarea',
    token: '--au-textarea-pad-inline',
    description: 'Horizontal padding; aligns with field `size` presets.',
  },
  {
    host: 'au-accordion',
    token: 'data-au-variant',
    description: '`plain` (default) or `contained` for a raised surface shell.',
  },
  {
    host: '[auStack]',
    token: '--au-stack-gap',
    description: 'Column gap between children; `gap` input sets the default.',
  },
  {
    host: '[auCluster]',
    token: '--au-cluster-gap',
    description: 'Inline row gap between wrapped items.',
  },
  {
    host: '[auSplit]',
    token: '--au-split-ratio',
    description: 'Grid template columns; `ratio` input sets presets like `1:2`.',
  },
  {
    host: '[auSection]',
    token: '--au-section-padding',
    description: 'Block padding; `padding` input uses the shared spacing scale.',
  },
];

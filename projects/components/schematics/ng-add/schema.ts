export interface Schema {
  project?: string;
  /** `custom` generates src/styles/aurea-theme-bridge.css with token override placeholders. */
  theme?: 'default' | 'custom';
}

import type { ComponentStylingToken } from '../../core/component-docs.registry';

export interface ThemeTokenGroup {
  title: string;
  description?: string;
  tokens: ComponentStylingToken[];
}

/** Per-component CSS variables set on the custom element host. */
export interface ThemeHostOverride {
  host: string;
  token: string;
  description: string;
}

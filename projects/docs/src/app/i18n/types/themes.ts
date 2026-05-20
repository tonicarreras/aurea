import type { ComponentStylingToken } from '../../core/component-docs.registry';

export interface ThemeTokenGroup {
  title: string;
  description?: string;
  tokens: ComponentStylingToken[];
}

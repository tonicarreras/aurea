import type { StorybookConfig } from '@storybook/angular';

/**
 * In Storybook 10 the **Interactions** panel (debug `play`) lives in the manager by default;
 * you do not need `@storybook/addon-interactions` (still a separate v8/9 package on npm).
 * @see https://storybook.js.org/docs/writing-tests/interaction-testing
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: [
    { from: '../src/lib/tokens', to: '/au-tokens' },
    { from: '../src/lib/styles', to: '/au-styles' },
    { from: '../src/lib/storybook', to: '/au-storybook' },
  ],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-onboarding'],
  framework: '@storybook/angular',
};
export default config;

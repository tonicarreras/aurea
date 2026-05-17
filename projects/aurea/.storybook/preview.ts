import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';

setCompodocJson(docJson);

/**
 * a11y (addon 10): use `parameters.a11y` only.
 * @see https://storybook.js.org/docs/writing-tests/accessibility-testing
 */
const preview: Preview = {
  parameters: {
    layout: 'padded',
    docs: {
      toc: true,
    },
    a11y: {
      /* Avoid re-running axe on every keystroke/arg: the a11y panel runs when you click Run. */
      manual: true,
      config: {
        rules: [],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

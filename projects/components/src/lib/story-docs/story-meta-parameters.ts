import { getStoryOverview, type StoryOverviewSlug } from './get-story-overview';

/**
 * Storybook canvas meta parameters. Layout defaults to `padded` in `.storybook/preview.ts`.
 * Pass a component slug so Autodocs respects the Storybook `docsLocale` toolbar global.
 */
export function storyMetaParameters(slug: StoryOverviewSlug) {
  return {
    docs: {
      extractArgTypes: () => ({}),
      description: {
        get component() {
          return getStoryOverview(slug);
        },
      },
    },
  };
}

/**
 * Storybook canvas meta parameters. Layout defaults to `padded` in `.storybook/preview.ts`
 * (top-left, 16px padding). Do not set `layout: 'centered'` on stories — it vertically centers
 * the canvas and breaks visual consistency across the catalog.
 */
export function storyMetaParameters(componentDocs: string) {
  return {
    docs: {
      extractArgTypes: () => ({}),
      description: { component: componentDocs },
    },
  };
}

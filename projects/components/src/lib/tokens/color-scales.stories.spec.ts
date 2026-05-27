/**
 * Verifies the color-scales Storybook story file exists and exports
 * a valid CSF meta object.
 *
 * This file acts as the Strict TDD RED gate for Task 3. It tries to
 * import the story module — if the file doesn't exist, the build fails.
 */
describe('color-scales.stories.ts', () => {
  it('exports a default meta object', async () => {
    // Dynamic import (no .ts extension — module resolution works at runtime)
    const story = await import('./color-scales.stories');
    expect(story.default).toBeDefined();
    expect(story.default.title).toBe('Aurea/Color Scales');
  });

  it('exports at least one story', async () => {
    const story = await import('./color-scales.stories');
    // count exports minus default
    const storyCount = Object.keys(story).filter((k) => k !== 'default').length;
    expect(storyCount).toBeGreaterThanOrEqual(1);
  });
});

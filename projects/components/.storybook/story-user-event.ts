import { userEvent as defaultUserEvent } from 'storybook/test';

/** Per-keystroke delay when `play` autoplays in the Storybook canvas (readable demo). */
const CANVAS_PLAY_DELAY_MS = 90;

const isTestRunner =
  typeof navigator !== 'undefined' && /StorybookTestRunner/.test(navigator.userAgent);

/**
 * `userEvent` for story `play` functions.
 * - Storybook canvas: slower typing/clicks so autoplay is easy to follow.
 * - test-storybook: default speed for CI.
 */
export const playUserEvent = isTestRunner
  ? defaultUserEvent
  : defaultUserEvent.setup({ delay: CANVAS_PLAY_DELAY_MS });

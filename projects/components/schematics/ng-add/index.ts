import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';
import type { Schema as NgAddSchema } from './schema';

const TOKEN_STYLE = 'node_modules/@aurea-design-system/components/styles/au-tokens.css';
const GLOBAL_STYLE = 'node_modules/@aurea-design-system/components/styles/aurea-global.css';
const CHROME_STYLE = 'node_modules/@aurea-design-system/components/styles/aurea-chrome.css';
const THEME_BRIDGE_FILE = 'src/styles/aurea-theme-bridge.css';

const THEME_BRIDGE_TEMPLATE = `/**
 * Aurea white-label theme bridge — override semantic tokens for your brand.
 * Import AFTER au-tokens.css and BEFORE aurea-global.css (or aurea-chrome.css).
 */

:root,
[data-au-theme='light'] {
  --au-color-surface-base: var(--au-color-surface-base);
  --au-color-surface-raised: var(--au-color-surface-raised);
  --au-color-text-primary: var(--au-color-text-primary);
  --au-color-text-secondary: var(--au-color-text-secondary);
  --au-color-border-default: var(--au-color-border-default);
  --au-color-action-primary: var(--au-color-action-primary);
  --au-color-action-primary-hover: var(--au-color-action-primary-hover);
  --au-radius-surface: 1rem;
  --au-radius-field: 0.625rem;
}

[data-au-theme='dark'] {
  /* Mirror the same roles for dark appearance */
}
`;

function addStylesToProject(options: NgAddSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const angularJson = tree.read('angular.json');
    if (!angularJson) {
      context.logger.warn(
        'No angular.json found. Add these styles manually to your global stylesheet:\n' +
          `  ${TOKEN_STYLE}\n  ${GLOBAL_STYLE}`,
      );
      return tree;
    }

    const config = JSON.parse(angularJson.toString('utf-8')) as {
      projects?: Record<string, { architect?: { build?: { options?: { styles?: string[] } } } }>;
      defaultProject?: string;
    };

    const projectName =
      options.project ?? config.defaultProject ?? Object.keys(config.projects ?? {})[0];

    const project = config.projects?.[projectName];
    const styles = project?.architect?.build?.options?.styles;
    if (!styles) {
      context.logger.warn(
        `Could not find styles array for project "${projectName}". Add imports manually.`,
      );
      return tree;
    }

    const stylePaths = [TOKEN_STYLE];
    if (options.theme === 'custom') {
      stylePaths.push(THEME_BRIDGE_FILE);
    }
    stylePaths.push(GLOBAL_STYLE);

    for (const path of stylePaths) {
      if (!styles.includes(path)) {
        styles.push(path);
      }
    }

    tree.overwrite('angular.json', JSON.stringify(config, null, 2));
    context.logger.info(`Aurea styles added to project "${projectName}".`);
    return tree;
  };
}

function addThemeBridge(options: NgAddSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (options.theme !== 'custom') {
      return tree;
    }

    const target = normalize(THEME_BRIDGE_FILE);
    if (tree.exists(target)) {
      context.logger.info(`Theme bridge already exists at ${target}.`);
      return tree;
    }

    tree.create(target, THEME_BRIDGE_TEMPLATE);
    context.logger.info(`Created ${target} — edit semantic token overrides for your brand.`);
    return tree;
  };
}

function printNextSteps(options: NgAddSchema): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    const chromeHint =
      options.theme === 'custom'
        ? `\n  5. Optional slimmer CSS: swap aurea-global.css for ${CHROME_STYLE} if you only need field chrome.`
        : '';
    context.logger.info(`
Aurea ng-add complete.

Next steps:
  1. Import components per feature: import { AuButton } from '@aurea-design-system/components';
  2. Theme: set data-au-theme="light|dark|high-contrast|high-contrast-dark" on <html> or use AuTheme directive.
  3. Density (optional): data-au-density="compact|comfortable|spacious" or auDensity on shell.
  4. Signal forms: see https://aurea-ds.netlify.app/en/guides/signal-forms${chromeHint}

Docs: https://aurea-ds.netlify.app/
`);
    return _tree;
  };
}

export default function ngAdd(options: NgAddSchema): Rule {
  return chain([addThemeBridge(options), addStylesToProject(options), printNextSteps(options)]);
}

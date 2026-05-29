import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import type { Schema as NgAddSchema } from './schema';

const TOKEN_STYLE = 'node_modules/@aurea-design-system/components/styles/au-tokens.css';
const THEME_DEFAULT_STYLE =
  'node_modules/@aurea-design-system/components/styles/au-theme-default.css';
const PRIMITIVES_STYLE = 'node_modules/@aurea-design-system/components/styles/au-primitives.css';
const ERROR_STYLE = 'node_modules/@aurea-design-system/components/styles/au-field-error.css';
const LISTBOX_STYLE = 'node_modules/@aurea-design-system/components/styles/au-field-listbox.css';

function addStylesToProject(options: NgAddSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const angularJson = tree.read('angular.json');
    if (!angularJson) {
      context.logger.warn(
        'No angular.json found. Add these styles manually to your global stylesheet:\n' +
          `  ${TOKEN_STYLE}\n  ${ERROR_STYLE}` +
          (options.includeListboxStyles !== false ? `\n  ${LISTBOX_STYLE}` : ''),
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

    const toAdd = [THEME_DEFAULT_STYLE, ERROR_STYLE];
    if (options.includeListboxStyles !== false) {
      toAdd.push(LISTBOX_STYLE);
    }

    for (const path of toAdd) {
      if (!styles.includes(path)) {
        styles.push(path);
      }
    }

    tree.overwrite('angular.json', JSON.stringify(config, null, 2));
    context.logger.info(`Aurea styles added to project "${projectName}".`);
    return tree;
  };
}

function printNextSteps(): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info(`
Aurea ng-add complete.

Next steps:
  1. Import components per feature: import { AuButton } from '@aurea-design-system/components';
   2. Theme: use ${THEME_DEFAULT_STYLE} (imports scale tokens + component skin).
   3. Theme attribute: data-au-theme="light|dark|high-contrast|high-contrast-dark" or use AuTheme directive.
   4. Density (optional): data-au-density="compact|comfortable|spacious" or auDensity on shell.
   5. Signal forms: see https://aurea-ds.netlify.app/en/guides/signal-forms

Docs: https://aurea-ds.netlify.app/
`);
    return _tree;
  };
}

export default function ngAdd(options: NgAddSchema): Rule {
  return chain([addStylesToProject(options), printNextSteps()]);
}

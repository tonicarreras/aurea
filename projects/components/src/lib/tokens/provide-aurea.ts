import {
  DOCUMENT,
  EnvironmentProviders,
  inject,
  InjectionToken,
  makeEnvironmentProviders,
  PLATFORM_ID,
  provideAppInitializer,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { type AuThemeConfig } from './au-theme-config';

export type { AuThemeConfig } from './au-theme-config';

export const AU_THEME_CONFIG = new InjectionToken<AuThemeConfig>('AU_THEME_CONFIG', {
  factory: () => ({}),
});

const THEME_VAR_MAP: Record<keyof AuThemeConfig, string> = {
  actionPrimary: '--au-color-action-primary',
  actionPrimaryHover: '--au-color-action-primary-hover',
  actionPrimaryPressed: '--au-color-action-primary-pressed',
  radiusSurface: '--au-radius-surface',
  radiusField: '--au-radius-field',
  fontSans: '--au-font-sans',
  fontMono: '--au-font-mono',
};

function applyThemeVars(doc: Document, config: AuThemeConfig): void {
  const root = doc.documentElement;
  for (const [key, cssVar] of Object.entries(THEME_VAR_MAP) as [keyof AuThemeConfig, string][]) {
    const value = config[key];
    if (value !== undefined) {
      root.style.setProperty(cssVar, value);
    }
  }
}

export interface AuConfig {
  theme?: AuThemeConfig;
}

/**
 * Optional bootstrap theming: writes semantic CSS variables on `:root` in the browser.
 * Complements `[auTheme]` (light/dark/HC) and static `au-tokens.css`.
 */
export function provideAurea(config: AuConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: AU_THEME_CONFIG, useValue: config.theme ?? {} },
    provideAppInitializer(() => {
      const doc = inject(DOCUMENT);
      const platformId = inject(PLATFORM_ID);
      const themeConfig = inject(AU_THEME_CONFIG);
      if (isPlatformBrowser(platformId)) {
        applyThemeVars(doc, themeConfig);
      }
    }),
  ]);
}

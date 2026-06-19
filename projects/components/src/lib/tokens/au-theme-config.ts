/**
 * Subset of semantic tokens overridable at bootstrap via {@link provideAurea}.
 * Keys map to `--au-*` custom properties on `:root`.
 */
export interface AuThemeConfig {
  actionPrimary?: string;
  actionPrimaryHover?: string;
  actionPrimaryPressed?: string;
  radiusSurface?: string;
  radiusField?: string;
  fontSans?: string;
  fontMono?: string;
}

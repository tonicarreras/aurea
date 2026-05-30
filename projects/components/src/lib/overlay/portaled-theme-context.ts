/** Theme/density attrs copied onto portaled overlays so tokens match the trigger subtree. */
export const PORTALED_THEME_ATTR = 'data-au-theme';
export const PORTALED_DENSITY_ATTR = 'data-au-density';

/** Copy `data-au-theme` and `data-au-density` from anchor ancestors onto a portaled node. */
export function syncPortaledThemeContext(target: HTMLElement, anchor: HTMLElement): void {
  syncAttrFromAncestor(target, anchor, PORTALED_THEME_ATTR);
  syncAttrFromAncestor(target, anchor, PORTALED_DENSITY_ATTR);
}

/** Remove theme/density attrs set by {@link syncPortaledThemeContext}. */
export function clearPortaledThemeContext(target: HTMLElement): void {
  target.removeAttribute(PORTALED_THEME_ATTR);
  target.removeAttribute(PORTALED_DENSITY_ATTR);
}

/**
 * Keeps a portaled node in sync when theme/density ancestors change (e.g. demo frame toggle).
 * Returns a disconnect function — call on overlay detach.
 */
export function bindPortaledThemeContextObserver(
  target: HTMLElement,
  anchor: HTMLElement,
): () => void {
  if (typeof MutationObserver === 'undefined') {
    return () => {};
  }

  const sources = collectThemeContextSources(anchor);
  if (sources.length === 0) {
    return () => {};
  }

  const observer = new MutationObserver(() => {
    syncPortaledThemeContext(target, anchor);
  });

  for (const source of sources) {
    observer.observe(source, {
      attributes: true,
      attributeFilter: [PORTALED_THEME_ATTR, PORTALED_DENSITY_ATTR],
    });
  }

  return () => observer.disconnect();
}

function collectThemeContextSources(anchor: HTMLElement): HTMLElement[] {
  const sources = new Set<HTMLElement>();
  const theme = anchor.closest(`[${PORTALED_THEME_ATTR}]`);
  const density = anchor.closest(`[${PORTALED_DENSITY_ATTR}]`);
  if (theme instanceof HTMLElement) {
    sources.add(theme);
  }
  if (density instanceof HTMLElement) {
    sources.add(density);
  }
  return [...sources];
}

function syncAttrFromAncestor(target: HTMLElement, anchor: HTMLElement, attr: string): void {
  const source = anchor.closest(`[${attr}]`);
  if (source instanceof HTMLElement) {
    const value = source.getAttribute(attr);
    if (value) {
      target.setAttribute(attr, value);
      return;
    }
  }
  target.removeAttribute(attr);
}

/**
 * DTCG 2025.10 helpers for Aurea design token export/validation.
 */

const DTCG_SCHEMA = 'https://www.designtokens.org/schemas/2025.10/format.json';

/** @param {string} hex */
export function normalizeHex(hex) {
  let h = hex.replace('#', '').toLowerCase();
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (h.length === 8) {
    h = h.slice(0, 6);
  }
  if (!/^[0-9a-f]{6}$/.test(h)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return `#${h}`;
}

/** @param {string} hex */
export function hexToSrgbColor(hex) {
  const normalized = normalizeHex(hex);
  const h = normalized.slice(1);
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const round = (n) => Math.round(n * 1e6) / 1e6;
  return {
    colorSpace: 'srgb',
    components: [round(r), round(g), round(b)],
    hex: normalized,
  };
}

/** @param {string} css */
export function parseCssDimension(css) {
  const m = String(css).match(/^([\d.]+)(px|rem)$/);
  if (!m) {
    throw new Error(`Invalid CSS dimension: ${css}`);
  }
  return { value: Number(m[1]), unit: m[2] };
}

/** @param {string} hex */
export function colorToken(hex) {
  return { $value: hexToSrgbColor(hex), $type: 'color' };
}

/** @param {string} css */
export function dimensionToken(css) {
  return { $value: parseCssDimension(css), $type: 'dimension' };
}

/** @param {number} n */
export function numberToken(n) {
  return { $value: n, $type: 'number' };
}

/**
 * @param {Record<string, unknown>} parent
 * @param {string} key
 */
function promoteTokenToDefault(parent, key) {
  const node = parent[key];
  if (!node || node.$type !== 'color') {
    return;
  }
  parent[key] = { default: { $value: node.$value, $type: node.$type } };
}

/**
 * Insert a color token without mixing token leaves and groups (DTCG rule).
 * @param {Record<string, unknown>} tree
 * @param {string[]} parts
 * @param {string} hex
 */
export function setColorPath(tree, parts, hex) {
  let cur = tree;
  for (let i = 0; i < parts.length; i++) {
    const key = parts[i];
    const isLast = i === parts.length - 1;

    if (isLast) {
      const token = colorToken(hex);
      const existing = cur[key];
      if (
        existing &&
        typeof existing === 'object' &&
        !existing.$type &&
        Object.keys(existing).some((k) => !k.startsWith('$'))
      ) {
        existing.default = token;
      } else {
        cur[key] = token;
      }
      return;
    }

    cur[key] = cur[key] ?? {};
    if (cur[key].$type === 'color') {
      promoteTokenToDefault(cur, key);
    }
    cur = cur[key];
  }
}

/**
 * @param {unknown} value
 * @returns {string | null}
 */
export function hexFromTokenValue(value) {
  if (typeof value === 'string' && value.startsWith('#')) {
    return normalizeHex(value);
  }
  if (value && typeof value === 'object' && typeof value.hex === 'string') {
    return normalizeHex(value.hex);
  }
  return null;
}

/**
 * @param {unknown} obj
 * @param {string[]} out
 */
export function collectTokenHexes(obj, out = []) {
  if (!obj || typeof obj !== 'object') {
    return out;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) {
      collectTokenHexes(item, out);
    }
    return out;
  }
  if (obj.$type === 'color' && obj.$value) {
    const hex = hexFromTokenValue(obj.$value);
    if (hex) {
      out.push(hex);
    }
  }
  for (const [key, val] of Object.entries(obj)) {
    if (!key.startsWith('$')) {
      collectTokenHexes(val, out);
    }
  }
  return out;
}

export { DTCG_SCHEMA };

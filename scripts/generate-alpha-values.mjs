#!/usr/bin/env node
/**
 * Generate 8-digit hex alpha scale values for Aurea Design System.
 * Run once to produce CSS output, paste into au-scales.css.
 * Zero dependencies, Node.js built-ins only.
 */
const ALPHA = [0.012, 0.031, 0.051, 0.078, 0.122, 0.180, 0.278, 0.447, 0.651, 0.749, 0.878, 0.973];

const HUES = {
  light: {
    neutral: [0, 0, 0],
    action: [0, 128, 255],
    error: [224, 0, 48],
    success: [0, 179, 104],
    warning: [255, 160, 0],
    info: [0, 128, 204],
  },
  dark: {
    neutral: [255, 255, 255],
    action: [0, 80, 204],
    error: [204, 0, 48],
    success: [0, 153, 85],
    warning: [204, 128, 0],
    info: [0, 102, 153],
  },
};

function toHex(n) {
  return Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0');
}

for (const [theme, hues] of Object.entries(HUES)) {
  for (const [scale, [r, g, b]] of Object.entries(hues)) {
    for (let i = 0; i < 12; i++) {
      const aa = Math.round(ALPHA[i] * 255).toString(16).padStart(2, '0');
      console.log(`  --au-scale-${scale}-A${i+1}: #${toHex(r)}${toHex(g)}${toHex(b)}${aa};`);
    }
  }
}

import { colord } from 'colord';

export function getContrastRatio(color1, color2) {
  return colord(color1).contrast(color2);
}

export function isAccessible(foreground, background) {
  const ratio = getContrastRatio(foreground, background);
  return {
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
    ratio: ratio.toFixed(2)
  };
}

export function isValidHex(hex) {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

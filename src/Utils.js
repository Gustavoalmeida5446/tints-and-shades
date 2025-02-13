import tinycolor from "tinycolor2";

export function generateTints(hex, levels = 10) {
  const baseColor = tinycolor(hex);
  if (!baseColor.isValid()) return [];

  return Array.from({ length: levels }).map((_, i) => {
    if (i === 0) return baseColor.toHexString();
    
    const ratio = i / (levels - 1);
    return tinycolor.mix(baseColor, "#ffffff", ratio * 100).toHexString();
  });
};

export function generateShades(hex, levels = 10) {
  const baseColor = tinycolor(hex);
  if (!baseColor.isValid()) return [];

  return Array.from({ length: levels }).map((_, i) => {
    if (i === 0) return baseColor.toHexString();
    
    const ratio = i / (levels - 1);
    return tinycolor.mix(baseColor, "#000000", ratio * 100).toHexString();
  });
};


export function convertColor(hex) {
  const color = tinycolor(hex);
  if (!color.isValid()) return null;

  const rgb = color.toRgb();
  const hsl = color.toHsl();
  const hsv = color.toHsv();
  const cmyk = hexToCmyk(hex);

  return {
    hex: color.toHexString(),
    rgb: { r: rgb.r, g: rgb.g, b: rgb.b },
    hsl: { h: hsl.h, s: hsl.s * 100, l: hsl.l * 100 },
    hsv: { h: hsv.h, s: hsv.s * 100, v: hsv.v * 100 },
    cmyk,
  };
}

function hexToCmyk(hex) {
  const { r, g, b } = tinycolor(hex).toRgb();
  const k = 1 - Math.max(r / 255, g / 255, b / 255);
  const c = (1 - r / 255 - k) / (1 - k) || 0;
  const m = (1 - g / 255 - k) / (1 - k) || 0;
  const y = (1 - b / 255 - k) / (1 - k) || 0;

  return { c: c * 100, m: m * 100, y: y * 100, k: k * 100 };
}

export const getColorConversions = (convertedColor) => {
  return {
    rgb: `RGB: (${convertedColor.rgb.r}, ${convertedColor.rgb.g}, ${convertedColor.rgb.b})`,
    hsl: `HSL: (${convertedColor.hsl.h.toFixed(2)}, ${convertedColor.hsl.s.toFixed(2)}%, ${convertedColor.hsl.l.toFixed(2)}%)`,
    hsv: `HSV: (${convertedColor.hsv.h.toFixed(2)}, ${convertedColor.hsv.s.toFixed(2)}%, ${convertedColor.hsv.v.toFixed(2)}%)`,
    cmyk: `CMYK: (${convertedColor.cmyk.c.toFixed(2)}%, ${convertedColor.cmyk.m.toFixed(2)}%, ${convertedColor.cmyk.y.toFixed(2)}%, ${convertedColor.cmyk.k.toFixed(2)}%)`,
  };
};
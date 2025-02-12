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
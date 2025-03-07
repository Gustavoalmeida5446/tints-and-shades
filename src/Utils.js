import tinycolor from "tinycolor2";

export const rgb = (colorHex) => {
  return tinycolor(colorHex).toRgbString();
};

export const hsl = (colorHex) => {
  return tinycolor(colorHex).toHslString();
};

export const cmyk = (colorHex) => {
  const { r, g, b } = tinycolor(colorHex).toRgb();

  if (r === 0 && g === 0 && b === 0) {
    return "cmyk(0%, 0%, 0%, 100%)";
  }
  let c = 1 - r / 255;
  let m = 1 - g / 255;
  let y = 1 - b / 255;

  const k = Math.min(c, m, y);
  c = ((c - k) / (1 - k)) * 100;
  m = ((m - k) / (1 - k)) * 100;
  y = ((y - k) / (1 - k)) * 100;

  return `cmyk(${Math.round(c)}%, ${Math.round(m)}%, ${Math.round(y)}%, ${Math.round(k * 100)}%)`;
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {

    const alertBox = document.createElement("div");
    alertBox.textContent = `${text} copied`;
    alertBox.classList.add("alert-box"); 
    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
    }, 1000);
  });
};

export const triad = (colorHex) => {
  const mainColor = tinycolor(colorHex);
  return mainColor.triad().map((color, index) => ({
    color: color,
    hex: color.toHexString(),
    id: `triad-${index}`,
  }));
};

export const tetrad = (colorHex) => {
  const mainColor = tinycolor(colorHex);
  return mainColor.tetrad().map((color, index) => ({
    color: color,
    hex: color.toHexString(),
    id: `tetrad-${index}`,
  }));
};

export const complement = (colorHex) => {
  const mainColor = tinycolor(colorHex);
  return mainColor.splitcomplement().map((color, index) => ({
    color: color,
    hex: color.toHexString(),
    id: `splitComplement-${index}`,
  }));
};

export const shades = (colorHex) => {
  return Array.from({ length: 10 }, (_, i) => {
    const percentage = (i / 9) * 100;
    return {
      hex: tinycolor.mix(colorHex, "#000000", percentage).toHexString(),
      id: `shade-${i}`,
    }
  });
};

export const tints = (colorHex) => {
  return Array.from({ length: 10 }, (_, i) => {
    const percentage = (i / 9) * 100;
    return {
      hex: tinycolor.mix(colorHex, "#ffffff", percentage).toHexString(),
      id: `tint-${i}`,
    }
  });
};

export const getTextColor = (hexColor) => {
  return tinycolor.mostReadable(hexColor, ["#000000", "#FFFFFF"]).toHexString();
};
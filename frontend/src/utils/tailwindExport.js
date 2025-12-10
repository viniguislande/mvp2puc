export function generateTailwindConfig(palette) {
  const paletteName = palette.name.toLowerCase().replace(/\s+/g, '-');

  const config = {
    theme: {
      extend: {
        colors: {
          [paletteName]: palette.shades
        }
      }
    }
  };

  return `// tailwind.config.js
export default ${JSON.stringify(config, null, 2)}`;
}

export function generateCSSVariables(palette) {
  const paletteName = palette.name.toLowerCase().replace(/\s+/g, '-');
  let css = ':root {\n';

  Object.entries(palette.shades).forEach(([tone, hex]) => {
    css += `  --${paletteName}-${tone}: ${hex};\n`;
  });

  css += '}';
  return css;
}

export function generateJSON(palette) {
  return JSON.stringify({
    name: palette.name,
    base_color: palette.base_color,
    shades: palette.shades
  }, null, 2);
}

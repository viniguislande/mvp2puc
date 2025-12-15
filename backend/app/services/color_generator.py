from colorsys import rgb_to_hls, hls_to_rgb
from typing import Dict

def hex_to_rgb(hex_color: str) -> tuple:
    """Convert hex to RGB tuple (0-255)"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(r: int, g: int, b: int) -> str:
    """Convert RGB to hex"""
    return '#{:02x}{:02x}{:02x}'.format(r, g, b)

def generate_tailwind_shades(base_hex: str) -> Dict[str, str]:
    """
    Generate Tailwind-style shades (50-900) from a base color
    """
    # Convert hex to RGB
    r, g, b = hex_to_rgb(base_hex)

    # Convert RGB to HLS
    h, l, s = rgb_to_hls(r/255, g/255, b/255)

    # Define luminosities for each shade
    luminosities = {
        '50': 0.95,
        '100': 0.90,
        '200': 0.80,
        '300': 0.70,
        '400': 0.60,
        '500': l,       # base color
        '600': l * 0.85 if l > 0.15 else l * 0.75,
        '700': l * 0.70 if l > 0.15 else l * 0.60,
        '800': l * 0.55 if l > 0.15 else l * 0.45,
        '900': l * 0.40 if l > 0.15 else l * 0.30
    }

    shades = {}
    for shade, lum in luminosities.items():
        # Convert HLS back to RGB
        r2, g2, b2 = hls_to_rgb(h, lum, s)

        # Convert to hex
        hex_color = rgb_to_hex(
            int(r2 * 255),
            int(g2 * 255),
            int(b2 * 255)
        )
        shades[shade] = hex_color

    return shades

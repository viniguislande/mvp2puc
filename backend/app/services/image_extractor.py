from colorthief import ColorThief
import io
import base64
from typing import List

def extract_palette_from_image(base64_image: str, color_count: int = 5) -> List[str]:
    """
    Extract color palette from base64 image
    Returns list of hex colors
    """
    try:
        # Decode base64 (remove data:image/...;base64, prefix if exists)
        if ',' in base64_image:
            base64_image = base64_image.split(',')[1]

        image_data = base64.b64decode(base64_image)

        # Create ColorThief object
        color_thief = ColorThief(io.BytesIO(image_data))

        # Get palette
        palette = color_thief.get_palette(color_count=color_count, quality=1)

        # Convert RGB to hex
        hex_colors = []
        for rgb in palette:
            hex_color = '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])
            hex_colors.append(hex_color)

        return hex_colors

    except Exception as e:
        raise ValueError(f"Error extracting colors from image: {str(e)}")

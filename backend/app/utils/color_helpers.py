"""
Color helper utilities
"""

def validate_hex_color(hex_color: str) -> bool:
    """Validate if string is a valid hex color"""
    if not hex_color.startswith('#'):
        return False
    if len(hex_color) != 7:
        return False
    try:
        int(hex_color[1:], 16)
        return True
    except ValueError:
        return False

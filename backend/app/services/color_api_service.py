import httpx
from typing import List, Dict

COLOR_API_BASE = "https://www.thecolorapi.com"

async def get_color_harmonies(base_hex: str, mode: str, count: int = 5) -> List[str]:
    """
    Get color harmonies from The Color API
    Modes: analogic, complement, triad, quad
    """
    hex_without_hash = base_hex.lstrip('#')

    url = f"{COLOR_API_BASE}/scheme"
    params = {
        "hex": hex_without_hash,
        "mode": mode,
        "count": count
    }

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        colors = []
        for color in data.get('colors', []):
            colors.append(color['hex']['value'])

        return colors

async def get_color_info(hex_color: str) -> Dict:
    """Get detailed info about a color"""
    hex_without_hash = hex_color.lstrip('#')

    url = f"{COLOR_API_BASE}/id"
    params = {"hex": hex_without_hash}

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        return response.json()

from fastapi import APIRouter, HTTPException, Query
import httpx

router = APIRouter(prefix="/api/external", tags=["external"])

UNSPLASH_ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY"  # Will be replaced

@router.get("/unsplash")
async def search_unsplash(
    query: str = Query(..., description="Search query"),
    per_page: int = Query(10, ge=1, le=30)
):
    """Search images on Unsplash"""
    if not UNSPLASH_ACCESS_KEY or UNSPLASH_ACCESS_KEY == "YOUR_UNSPLASH_ACCESS_KEY":
        raise HTTPException(
            status_code=501,
            detail="Unsplash API key not configured"
        )

    url = "https://api.unsplash.com/search/photos"
    headers = {"Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"}
    params = {
        "query": query,
        "per_page": per_page
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(url, headers=headers, params=params)
            response.raise_for_status()
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/color-info")
async def get_color_info(hex: str = Query(..., description="Hex color without #")):
    """Get color info from The Color API"""
    from app.services.color_api_service import get_color_info

    try:
        hex_with_hash = f"#{hex}" if not hex.startswith('#') else hex
        info = await get_color_info(hex_with_hash)
        return info
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

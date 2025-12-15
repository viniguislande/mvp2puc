from pydantic import BaseModel, Field
from typing import Optional, Dict, List
from datetime import datetime

# Palette Schemas
class PaletteCreate(BaseModel):
    name: str
    description: Optional[str] = None
    base_color: str = Field(..., pattern=r'^#[0-9A-Fa-f]{6}$')
    project_id: Optional[int] = None
    tags: Optional[str] = None

class PaletteUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[str] = None

class PaletteResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    base_color: str
    shades: Dict[str, str]
    project_id: Optional[int]
    tags: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

# Project Schemas
class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None

class ProjectResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

# Generation Schemas
class GenerateShadesRequest(BaseModel):
    base_color: str = Field(..., pattern=r'^#[0-9A-Fa-f]{6}$')

class GenerateShadesResponse(BaseModel):
    base_color: str
    shades: Dict[str, str]

class HarmonyRequest(BaseModel):
    base_color: str = Field(..., pattern=r'^#[0-9A-Fa-f]{6}$')
    mode: str = Field(..., pattern=r'^(analogic|complement|triad|quad)$')

class ImagePaletteRequest(BaseModel):
    image_base64: str
    color_count: int = Field(default=5, ge=2, le=10)

class PaginatedResponse(BaseModel):
    items: List[PaletteResponse]
    total: int
    page: int
    limit: int
    pages: int

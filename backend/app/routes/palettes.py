from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.palette import Palette, Project
from app.schemas.palette import (
    PaletteCreate, PaletteUpdate, PaletteResponse,
    ProjectCreate, ProjectResponse,
    GenerateShadesRequest, GenerateShadesResponse,
    HarmonyRequest, ImagePaletteRequest,
    PaginatedResponse
)
from app.services.color_generator import generate_tailwind_shades
from app.services.color_api_service import get_color_harmonies
from app.services.image_extractor import extract_palette_from_image

router = APIRouter(prefix="/api", tags=["palettes"])

# PALETTES CRUD

@router.post("/palettes", response_model=PaletteResponse, status_code=201)
async def create_palette(palette_data: PaletteCreate, db: Session = Depends(get_db)):
    """Create a new palette"""
    # Generate shades from base color
    shades = generate_tailwind_shades(palette_data.base_color)

    palette = Palette(
        name=palette_data.name,
        description=palette_data.description,
        base_color=palette_data.base_color,
        shades=shades,
        project_id=palette_data.project_id,
        tags=palette_data.tags
    )

    db.add(palette)
    db.commit()
    db.refresh(palette)

    return palette

@router.get("/palettes", response_model=PaginatedResponse)
async def list_palettes(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    tag: Optional[str] = None,
    project_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """List palettes with pagination and filters"""
    query = db.query(Palette)

    if tag:
        query = query.filter(Palette.tags.contains(tag))
    if project_id:
        query = query.filter(Palette.project_id == project_id)

    total = query.count()

    palettes = query.offset((page - 1) * limit).limit(limit).all()
    pages = (total + limit - 1) // limit

    return PaginatedResponse(
        items=palettes,
        total=total,
        page=page,
        limit=limit,
        pages=pages
    )

@router.get("/palettes/{palette_id}", response_model=PaletteResponse)
async def get_palette(palette_id: int, db: Session = Depends(get_db)):
    """Get palette by ID"""
    palette = db.query(Palette).filter(Palette.id == palette_id).first()
    if not palette:
        raise HTTPException(status_code=404, detail="Palette not found")
    return palette

@router.put("/palettes/{palette_id}", response_model=PaletteResponse)
async def update_palette(
    palette_id: int,
    palette_data: PaletteUpdate,
    db: Session = Depends(get_db)
):
    """Update palette"""
    palette = db.query(Palette).filter(Palette.id == palette_id).first()
    if not palette:
        raise HTTPException(status_code=404, detail="Palette not found")

    if palette_data.name:
        palette.name = palette_data.name
    if palette_data.description is not None:
        palette.description = palette_data.description
    if palette_data.tags is not None:
        palette.tags = palette_data.tags

    db.commit()
    db.refresh(palette)
    return palette

@router.delete("/palettes/{palette_id}", status_code=204)
async def delete_palette(palette_id: int, db: Session = Depends(get_db)):
    """Delete palette"""
    palette = db.query(Palette).filter(Palette.id == palette_id).first()
    if not palette:
        raise HTTPException(status_code=404, detail="Palette not found")

    db.delete(palette)
    db.commit()
    return None

# COLOR GENERATION

@router.post("/palettes/generate", response_model=GenerateShadesResponse)
async def generate_shades(request: GenerateShadesRequest):
    """Generate Tailwind shades from base color"""
    shades = generate_tailwind_shades(request.base_color)
    return GenerateShadesResponse(
        base_color=request.base_color,
        shades=shades
    )

@router.post("/palettes/harmonies")
async def generate_harmonies(request: HarmonyRequest):
    """Generate color harmonies using The Color API"""
    try:
        colors = await get_color_harmonies(request.base_color, request.mode)
        return {
            "base_color": request.base_color,
            "mode": request.mode,
            "colors": colors
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/palettes/from-image")
async def extract_from_image(request: ImagePaletteRequest):
    """Extract color palette from image"""
    try:
        colors = extract_palette_from_image(
            request.image_base64,
            request.color_count
        )
        return {
            "colors": colors,
            "count": len(colors)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# PROJECTS

@router.post("/projects", response_model=ProjectResponse, status_code=201)
async def create_project(project_data: ProjectCreate, db: Session = Depends(get_db)):
    """Create a new project"""
    project = Project(
        name=project_data.name,
        description=project_data.description
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.get("/projects", response_model=List[ProjectResponse])
async def list_projects(db: Session = Depends(get_db)):
    """List all projects"""
    return db.query(Project).all()

@router.get("/projects/{project_id}/palettes", response_model=List[PaletteResponse])
async def get_project_palettes(project_id: int, db: Session = Depends(get_db)):
    """Get all palettes from a project"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project.palettes

@router.delete("/projects/{project_id}", status_code=204)
async def delete_project(project_id: int, db: Session = Depends(get_db)):
    """Delete project"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()
    return None

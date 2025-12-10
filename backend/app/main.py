from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_tables
from app.routes import palettes, external

app = FastAPI(
    title="Palette Generator API",
    description="API for generating Tailwind CSS color palettes",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(palettes.router)
app.include_router(external.router)

@app.on_event("startup")
async def startup():
    create_tables()

@app.get("/")
async def root():
    return {
        "name": "Palette Generator API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

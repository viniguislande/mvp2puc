from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    palettes = relationship("Palette", back_populates="project", cascade="all, delete-orphan")

class Palette(Base):
    __tablename__ = "palettes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    base_color = Column(String, nullable=False)  # Hex color
    shades = Column(JSON, nullable=False)  # {"50": "#...", "100": "#..."}
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    tags = Column(String)  # Comma separated
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    project = relationship("Project", back_populates="palettes")

# Palette Generator - Backend API

API REST para geração de paletas de cores estilo Tailwind CSS.

## Funcionalidades

- Geração automática de tons 50-900 a partir de uma cor base
- Geração de harmonias de cores (análoga, complementar, tríade, tetrádica)
- Extração de paletas de imagens
- CRUD completo de paletas
- Organização por projetos
- Integração com The Color API
- Integração com Unsplash API

## Tecnologias

- FastAPI
- SQLAlchemy
- SQLite
- The Color API
- Unsplash API

## Instalação Local

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Docker

```bash
docker build -t palette-backend .
docker run -p 8000:8000 palette-backend
```

## API Externa

**The Color API**: https://www.thecolorapi.com
- Sem necessidade de API key
- Usada para gerar harmonias de cores

**Unsplash API**: https://unsplash.com/developers
- Requer cadastro gratuito e Access Key
- Usada para buscar imagens

## Endpoints Principais

- `POST /api/palettes` - Criar paleta
- `GET /api/palettes` - Listar paletas
- `GET /api/palettes/{id}` - Detalhar paleta
- `PUT /api/palettes/{id}` - Atualizar paleta
- `DELETE /api/palettes/{id}` - Deletar paleta
- `POST /api/palettes/generate` - Gerar tons de uma cor
- `POST /api/palettes/harmonies` - Gerar harmonias
- `POST /api/palettes/from-image` - Extrair cores de imagem

Documentação completa: http://localhost:8000/docs

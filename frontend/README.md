# Palette Generator - Frontend

Interface web para geração de paletas de cores estilo Tailwind CSS.

## Funcionalidades

- Color picker interativo
- Geração automática de tons 50-900
- Harmonias de cores (análoga, complementar, tríade, tetrádica)
- Extração de cores de imagens
- Preview de componentes UI
- Export em múltiplos formatos (Tailwind, CSS, JSON)
- Gerenciamento de paletas salvas

## Tecnologias

- React 18
- Vite
- Tailwind CSS
- React Router
- React Colorful
- Axios
- React Dropzone

## Instalação Local

```bash
npm install
npm run dev
```

## Docker

```bash
docker build -t palette-frontend .
docker run -p 3000:80 palette-frontend
```

## Integração com Backend

A aplicação se comunica com o backend através de:
- Base URL: `http://localhost:8000/api`

Certifique-se de que o backend esteja rodando na porta 8000.

# 🎨 Palette Generator - Tailwind CSS

Gerador completo de paletas de cores estilo Tailwind CSS com backend FastAPI e frontend React.

## 📋 Sobre o Projeto

Este é um projeto acadêmico que permite:
- Gerar automaticamente tons 50-900 a partir de uma cor base
- Criar harmonias de cores (análoga, complementar, tríade, tetrádica)
- Extrair paletas de cores de imagens
- Visualizar componentes UI com as cores geradas
- Exportar paletas em múltiplos formatos (Tailwind config, CSS variables, JSON)
- Salvar e gerenciar paletas favoritas

## 🏗️ Estrutura do Projeto

```
mvp2puc/
├── backend/          # API FastAPI
│   ├── app/
│   │   ├── models/       # Modelos SQLAlchemy
│   │   ├── schemas/      # Schemas Pydantic
│   │   ├── routes/       # Rotas da API
│   │   ├── services/     # Lógica de negócio
│   │   └── utils/        # Utilitários
│   ├── Dockerfile
│   ├── requirements.txt
│   └── README.md
│
└── frontend/         # React App
    ├── src/
    │   ├── components/   # Componentes React
    │   ├── pages/        # Páginas
    │   ├── services/     # API client
    │   └── utils/        # Utilitários
    ├── Dockerfile
    ├── package.json
    └── README.md
```

## 🚀 Como Executar

### Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

O backend estará disponível em: http://localhost:8000
Documentação da API: http://localhost:8000/docs

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em: http://localhost:5173

## 🐳 Docker

### Backend

```bash
cd backend
docker build -t palette-backend .
docker run -p 8000:8000 palette-backend
```

### Frontend

```bash
cd frontend
docker build -t palette-frontend .
docker run -p 3000:80 palette-frontend
```

## 🔧 Tecnologias Utilizadas

### Backend
- **FastAPI** - Framework web moderno e rápido
- **SQLAlchemy** - ORM para banco de dados
- **SQLite** - Banco de dados
- **Pydantic** - Validação de dados
- **The Color API** - API externa para harmonias de cores
- **ColorThief** - Extração de cores de imagens

### Frontend
- **React 18** - Biblioteca UI
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **React Router** - Roteamento
- **React Colorful** - Color picker
- **Axios** - Cliente HTTP
- **React Dropzone** - Upload de imagens
- **Lucide React** - Ícones

## 📚 API Endpoints

### Paletas
- `POST /api/palettes` - Criar paleta
- `GET /api/palettes` - Listar paletas (com paginação)
- `GET /api/palettes/{id}` - Obter paleta por ID
- `PUT /api/palettes/{id}` - Atualizar paleta
- `DELETE /api/palettes/{id}` - Deletar paleta

### Geração de Cores
- `POST /api/palettes/generate` - Gerar tons 50-900
- `POST /api/palettes/harmonies` - Gerar harmonias de cores
- `POST /api/palettes/from-image` - Extrair cores de imagem

### Projetos
- `POST /api/projects` - Criar projeto
- `GET /api/projects` - Listar projetos
- `GET /api/projects/{id}/palettes` - Paletas de um projeto
- `DELETE /api/projects/{id}` - Deletar projeto

### Externos
- `GET /api/external/color-info` - Informações sobre cor
- `GET /api/external/unsplash` - Buscar imagens (requer API key)

## 🎨 Funcionalidades

### 1. Geração de Tons Tailwind
Escolha uma cor base e gere automaticamente os tons 50-900 seguindo o padrão Tailwind CSS.

### 2. Harmonias de Cores
Gere paletas harmônicas usando teoria das cores:
- **Análoga**: Cores adjacentes no círculo cromático
- **Complementar**: Cores opostas
- **Tríade**: Três cores equidistantes
- **Tetrádica**: Quatro cores formando um retângulo

### 3. Extração de Imagens
Faça upload de uma imagem e extraia automaticamente as cores dominantes.

### 4. Preview de Componentes
Visualize como as cores ficam em componentes UI reais:
- Botões (primary, secondary, outline)
- Cards
- Alerts
- Badges

### 5. Export
Exporte sua paleta em múltiplos formatos:
- **Tailwind Config**: Para usar em `tailwind.config.js`
- **CSS Variables**: Variáveis CSS customizadas
- **JSON**: Formato estruturado para integração

### 6. Gerenciamento de Paletas
- Salve suas paletas favoritas
- Organize por projetos
- Adicione tags para facilitar a busca
- Edite e delete paletas

## 🌐 APIs Externas

### The Color API
- **URL**: https://www.thecolorapi.com
- **Uso**: Geração de harmonias de cores
- **Autenticação**: Não requerida
- **Status**: Integrada e funcionando

### Unsplash API (Opcional)
- **URL**: https://unsplash.com/developers
- **Uso**: Busca de imagens para extração de cores
- **Autenticação**: Requer Access Key gratuito
- **Status**: Configurável (opcional)

## 📝 Notas de Desenvolvimento

### Algoritmo de Geração de Tons
O sistema utiliza o espaço de cores HLS (Hue, Lightness, Saturation) para gerar tons consistentes:
1. Converte a cor base de HEX para RGB
2. Transforma RGB em HLS
3. Mantém Hue e Saturation constantes
4. Varia a Lightness para criar os tons
5. Converte de volta para HEX

### Banco de Dados
O projeto usa SQLite por simplicidade, mas pode ser facilmente adaptado para PostgreSQL ou MySQL modificando a `DATABASE_URL` em `backend/app/database.py`.

## 🤝 Contribuindo

Este é um projeto acadêmico, mas sugestões são bem-vindas!

## 📄 Licença

Projeto acadêmico - Livre para uso educacional

## 👨‍💻 Autor

Desenvolvido como projeto acadêmico MVP

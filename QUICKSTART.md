# Guia Rápido de Inicialização

## Projeto Completo Implementado

Todo o código foi criado e está pronto para uso. Siga os passos abaixo para executar o projeto.

## Estrutura do Projeto

```
mvp2puc/
├── backend/          # API FastAPI - 23 arquivos criados
├── frontend/         # React App - 30 arquivos criados
└── README.md         # Documentação completa
```

**Total: 53 arquivos criados**

## Como Executar

### Backend (FastAPI)

```bash
# Navegar para a pasta do backend
cd backend

# Criar ambiente virtual (recomendado)
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Executar o servidor
uvicorn app.main:app --reload

# Backend rodando em: http://localhost:8000
# Documentação API: http://localhost:8000/docs
```

### Frontend (React + Vite)

**Em outro terminal:**

```bash
# Navegar para a pasta do frontend
cd frontend

# Instalar dependências
npm install

# Executar o servidor de desenvolvimento
npm run dev

# Frontend rodando em: http://localhost:5173
```

## Acesse a Aplicação

Abra seu navegador em: **http://localhost:5173**

## Testando as Funcionalidades

### 1. Geração de Paleta Básica
1. Acesse o **Generator**
2. Escolha uma cor no color picker
3. Clique em "Gerar Tons"
4. Veja os tons 50-900 gerados automaticamente

### 2. Harmonias de Cores
1. Clique em um dos botões de harmonia (Análoga, Complementar, etc.)
2. Escolha uma das cores geradas
3. A paleta será atualizada

### 3. Extração de Imagem
1. Arraste uma imagem para a área de upload
2. As cores dominantes serão extraídas
3. A primeira cor se torna a cor base

### 4. Preview e Export
1. Veja os componentes UI com suas cores
2. Escolha o formato de export (Tailwind, CSS, JSON)
3. Copie o código

### 5. Salvar Paleta
1. Clique em "Salvar Paleta"
2. Preencha o nome e outras informações
3. Acesse "My Palettes" para ver suas paletas salvas

## Executar com Docker (Opcional)

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

## Endpoints da API

### Testar no navegador ou Postman:

- **Health Check**: http://localhost:8000/health
- **Swagger Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Exemplos de Requisições:

**Gerar Tons:**
```bash
curl -X POST http://localhost:8000/api/palettes/generate \
  -H "Content-Type: application/json" \
  -d '{"base_color": "#3b82f6"}'
```

**Gerar Harmonias:**
```bash
curl -X POST http://localhost:8000/api/palettes/harmonies \
  -H "Content-Type: application/json" \
  -d '{"base_color": "#3b82f6", "mode": "analogic"}'
```

**Listar Paletas:**
```bash
curl http://localhost:8000/api/palettes
```

## Verificar Instalação

### Backend
```bash
cd backend
python -c "import fastapi; print('FastAPI instalado:', fastapi.__version__)"
```

### Frontend
```bash
cd frontend
npm list react vite
```

## Solução de Problemas

### Backend não inicia
- Verifique se Python 3.8+ está instalado: `python --version`
- Tente reinstalar dependências: `pip install -r requirements.txt --force-reinstall`

### Frontend não inicia
- Verifique se Node.js 16+ está instalado: `node --version`
- Delete `node_modules` e reinstale: `rm -rf node_modules && npm install`

### Erro de CORS
- Verifique se o backend está rodando na porta 8000
- O frontend está configurado para usar `http://localhost:8000/api`

### Banco de dados
- O banco SQLite será criado automaticamente em `backend/palettes.db`
- Para resetar: delete o arquivo e reinicie o backend

## Próximos Passos

1. **Crie sua primeira paleta** no Generator
2. **Experimente diferentes harmonias** de cores
3. **Upload uma foto** e veja as cores extraídas
4. **Salve suas paletas favoritas**
5. **Exporte** para usar em seus projetos

## Funcionalidades Implementadas

- Geração automática de tons 50-900
- Harmonias de cores (4 tipos)
- Extração de cores de imagens
- Preview de componentes UI
- Export em 3 formatos
- CRUD completo de paletas
- Sistema de projetos e tags
- Busca e filtros
- Interface responsiva
- API REST completa
- Documentação Swagger
- Dockerfiles prontos

## Documentação

- **README.md** - Documentação completa do projeto
- **backend/README.md** - Documentação da API
- **frontend/README.md** - Documentação do frontend
- **http://localhost:8000/docs** - Documentação interativa da API

## Pronto

Seu projeto está completo e funcionando! Divirta-se criando paletas de cores incríveis!

---

**Desenvolvido usando FastAPI + React + Tailwind CSS**

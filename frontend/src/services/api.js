import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || 'Erro ao processar requisição';
    toast.error(message);
    return Promise.reject(error);
  }
);

// Palettes
export const createPalette = async (data) => {
  const response = await api.post('/palettes', data);
  return response.data;
};

export const getPalettes = async (params = {}) => {
  const response = await api.get('/palettes', { params });
  return response.data;
};

export const getPaletteById = async (id) => {
  const response = await api.get(`/palettes/${id}`);
  return response.data;
};

export const updatePalette = async (id, data) => {
  const response = await api.put(`/palettes/${id}`, data);
  return response.data;
};

export const deletePalette = async (id) => {
  await api.delete(`/palettes/${id}`);
};

// Generation
export const generateShades = async (baseColor) => {
  const response = await api.post('/palettes/generate', { base_color: baseColor });
  return response.data;
};

export const generateHarmonies = async (baseColor, mode) => {
  const response = await api.post('/palettes/harmonies', { base_color: baseColor, mode });
  return response.data;
};

export const extractFromImage = async (imageBase64, colorCount = 5) => {
  const response = await api.post('/palettes/from-image', {
    image_base64: imageBase64,
    color_count: colorCount
  });
  return response.data;
};

// Projects
export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const createProject = async (data) => {
  const response = await api.post('/projects', data);
  return response.data;
};

// External
export const searchUnsplash = async (query) => {
  const response = await api.get(`/external/unsplash?query=${query}`);
  return response.data;
};

export default api;

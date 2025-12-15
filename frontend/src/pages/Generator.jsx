import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorPicker from '../components/ColorPicker';
import TailwindShades from '../components/TailwindShades';
import HarmonySelector from '../components/HarmonySelector';
import ImageUploader from '../components/ImageUploader';
import ComponentPreview from '../components/ComponentPreview';
import ExportPanel from '../components/ExportPanel';
import { generateShades, createPalette, getProjects } from '../services/api';
import toast from 'react-hot-toast';
import { Save, Loader2 } from 'lucide-react';

export default function Generator() {
  const navigate = useNavigate();
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [shades, setShades] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [projects, setProjects] = useState([]);

  const [saveData, setSaveData] = useState({
    name: '',
    description: '',
    project_id: '',
    tags: ''
  });

  useEffect(() => {
    handleGenerate();
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Erro ao carregar projetos');
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateShades(baseColor);
      setShades(result.shades);
    } catch (error) {
      toast.error('Erro ao gerar tons');
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (color) => {
    setBaseColor(color);
  };

  const handleSelectHarmonyColor = (color) => {
    setBaseColor(color);
    handleGenerate();
  };

  const handleColorsExtracted = (colors) => {
    if (colors && colors.length > 0) {
      setBaseColor(colors[0]);
      handleGenerate();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!saveData.name.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }

    setSaving(true);
    try {
      const palette = await createPalette({
        name: saveData.name,
        description: saveData.description || null,
        base_color: baseColor,
        project_id: saveData.project_id ? parseInt(saveData.project_id) : null,
        tags: saveData.tags || null
      });

      toast.success('Paleta salva!');
      setShowSaveForm(false);
      setSaveData({ name: '', description: '', project_id: '', tags: '' });

      // Navegar para a paleta salva
      navigate(`/palettes/${palette.id}`);
    } catch (error) {
      toast.error('Erro ao salvar paleta');
    } finally {
      setSaving(false);
    }
  };

  const palette = shades ? {
    name: saveData.name || 'Custom Palette',
    base_color: baseColor,
    shades: shades
  } : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gerador de Paletas</h1>
        <button
          onClick={() => setShowSaveForm(!showSaveForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save size={20} />
          Salvar Paleta
        </button>
      </div>

      {/* Save Form */}
      {showSaveForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Salvar Paleta</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome *
              </label>
              <input
                type="text"
                value={saveData.name}
                onChange={(e) => setSaveData({...saveData, name: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Projeto
              </label>
              <select
                value={saveData.project_id}
                onChange={(e) => setSaveData({...saveData, project_id: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Nenhum</option>
                {projects.map(proj => (
                  <option key={proj.id} value={proj.id}>{proj.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={saveData.description}
                onChange={(e) => setSaveData({...saveData, description: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                value={saveData.tags}
                onChange={(e) => setSaveData({...saveData, tags: e.target.value})}
                placeholder="azul, corporativo, moderno"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {saving && <Loader2 size={16} className="animate-spin" />}
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setShowSaveForm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Color Picker */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Escolher Cor Base</h3>
            <ColorPicker color={baseColor} onChange={handleColorChange} />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Gerar Tons
            </button>
          </div>

          {/* Image Upload */}
          <ImageUploader onColorsExtracted={handleColorsExtracted} />
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          {/* Shades Preview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Tons Tailwind</h3>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-blue-600" size={32} />
              </div>
            ) : (
              <TailwindShades shades={shades} />
            )}
          </div>

          {/* Harmony Selector */}
          <HarmonySelector
            baseColor={baseColor}
            onSelectColor={handleSelectHarmonyColor}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Component Preview */}
          <ComponentPreview shades={shades} />

          {/* Export */}
          <ExportPanel palette={palette} />
        </div>
      </div>
    </div>
  );
}

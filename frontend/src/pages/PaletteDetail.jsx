import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaletteById, updatePalette } from '../services/api';
import TailwindShades from '../components/TailwindShades';
import ComponentPreview from '../components/ComponentPreview';
import ExportPanel from '../components/ExportPanel';
import Loading from '../components/Loading';
import { ArrowLeft, Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PaletteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [palette, setPalette] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadPalette();
  }, [id]);

  const loadPalette = async () => {
    setLoading(true);
    try {
      const data = await getPaletteById(id);
      setPalette(data);
      setEditData({
        name: data.name,
        description: data.description || '',
        tags: data.tags || ''
      });
    } catch (error) {
      toast.error('Erro ao carregar paleta');
      navigate('/palettes');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const updated = await updatePalette(id, editData);
      setPalette(updated);
      setEditing(false);
      toast.success('Paleta atualizada!');
    } catch (error) {
      toast.error('Erro ao atualizar');
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!palette) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Paleta não encontrada</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/palettes')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} />
        Voltar
      </button>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {editing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
              className="w-full text-3xl font-bold border-b-2 border-blue-500 focus:outline-none"
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              placeholder="Descrição..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
            <input
              type="text"
              value={editData.tags}
              onChange={(e) => setEditData({...editData, tags: e.target.value})}
              placeholder="Tags (separadas por vírgula)"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save size={16} />
                Salvar
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                <X size={16} />
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{palette.name}</h1>
                {palette.description && (
                  <p className="text-gray-600">{palette.description}</p>
                )}
                {palette.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {palette.tags.split(',').map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                <Edit2 size={16} />
                Editar
              </button>
            </div>
          </>
        )}

        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Cor Base:</span>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded border-2 border-gray-200"
                style={{ backgroundColor: palette.base_color }}
              />
              <span className="font-mono text-sm">{palette.base_color}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Tons Tailwind</h3>
            <TailwindShades shades={palette.shades} />
          </div>

          <ExportPanel palette={palette} />
        </div>

        <div>
          <ComponentPreview shades={palette.shades} paletteName={palette.name} />
        </div>
      </div>
    </div>
  );
}

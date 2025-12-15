import { useNavigate } from 'react-router-dom';
import { Trash2, Eye } from 'lucide-react';
import { deletePalette } from '../services/api';
import toast from 'react-hot-toast';

export default function PaletteCard({ palette, onDelete }) {
  const navigate = useNavigate();

  const tones = ['100', '300', '500', '700', '900'];

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Deletar paleta "${palette.name}"?`)) return;

    try {
      await deletePalette(palette.id);
      toast.success('Paleta deletada');
      if (onDelete) onDelete();
    } catch (error) {
      toast.error('Erro ao deletar paleta');
    }
  };

  const handleView = () => {
    navigate(`/palettes/${palette.id}`);
  };

  return (
    <div
      onClick={handleView}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{palette.name}</h3>
          {palette.description && (
            <p className="text-sm text-gray-500 line-clamp-1">{palette.description}</p>
          )}
        </div>
        <div className="flex gap-1">
          <button
            onClick={handleView}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <Eye size={16} className="text-gray-600" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>

      <div className="flex gap-1">
        {tones.map(tone => (
          <div
            key={tone}
            className="flex-1 h-12 rounded"
            style={{ backgroundColor: palette.shades[tone] }}
          />
        ))}
      </div>

      {palette.tags && (
        <div className="mt-3 flex flex-wrap gap-1">
          {palette.tags.split(',').map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

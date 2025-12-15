import { useState } from 'react';
import { generateHarmonies } from '../services/api';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HarmonySelector({ baseColor, onSelectColor }) {
  const [loading, setLoading] = useState(false);
  const [harmonies, setHarmonies] = useState(null);
  const [selectedMode, setSelectedMode] = useState('analogic');

  const modes = [
    { value: 'analogic', label: 'Análoga' },
    { value: 'complement', label: 'Complementar' },
    { value: 'triad', label: 'Tríade' },
    { value: 'quad', label: 'Tetrádica' }
  ];

  const handleGenerate = async (mode) => {
    setSelectedMode(mode);
    setLoading(true);
    try {
      const result = await generateHarmonies(baseColor, mode);
      setHarmonies(result);
    } catch (error) {
      toast.error('Erro ao gerar harmonias');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Harmonias de Cores</h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {modes.map(mode => (
          <button
            key={mode.value}
            onClick={() => handleGenerate(mode.value)}
            disabled={loading}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedMode === mode.value && harmonies
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } disabled:opacity-50`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      )}

      {harmonies && !loading && (
        <div className="grid grid-cols-5 gap-3">
          {harmonies.colors.map((color, index) => (
            <div
              key={index}
              onClick={() => onSelectColor(color)}
              className="cursor-pointer group"
            >
              <div
                className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform"
                style={{ backgroundColor: color }}
              />
              <p className="text-center text-sm text-gray-600 mt-1 group-hover:text-blue-600">
                {color}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

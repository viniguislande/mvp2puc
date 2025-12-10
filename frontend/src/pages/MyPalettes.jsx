import { useState, useEffect } from 'react';
import { getPalettes } from '../services/api';
import PaletteCard from '../components/PaletteCard';
import Loading from '../components/Loading';
import { Search } from 'lucide-react';

export default function MyPalettes() {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  useEffect(() => {
    loadPalettes();
  }, []);

  const loadPalettes = async () => {
    setLoading(true);
    try {
      const data = await getPalettes({ limit: 100 });
      setPalettes(data.items);
    } catch (error) {
      console.error('Erro ao carregar paletas');
    } finally {
      setLoading(false);
    }
  };

  const filteredPalettes = palettes.filter(palette => {
    const matchesSearch = palette.name.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !tagFilter || (palette.tags && palette.tags.includes(tagFilter));
    return matchesSearch && matchesTag;
  });

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Minhas Paletas</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar paletas..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="text"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            placeholder="Filtrar por tag..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Palettes Grid */}
      {filteredPalettes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg mb-4">Nenhuma paleta encontrada</p>
          <a href="/generator" className="text-blue-600 hover:underline">
            Criar primeira paleta
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPalettes.map(palette => (
            <PaletteCard
              key={palette.id}
              palette={palette}
              onDelete={loadPalettes}
            />
          ))}
        </div>
      )}
    </div>
  );
}

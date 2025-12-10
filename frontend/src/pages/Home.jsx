import { Link } from 'react-router-dom';
import { Palette, Sparkles, Image, Download } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Palette,
      title: 'Geração Automática',
      description: 'Gere tons 50-900 estilo Tailwind a partir de qualquer cor base'
    },
    {
      icon: Sparkles,
      title: 'Harmonias de Cores',
      description: 'Crie paletas harmônicas com um clique: análoga, complementar, tríade'
    },
    {
      icon: Image,
      title: 'Extração de Imagens',
      description: 'Extraia paletas de cores de suas imagens favoritas'
    },
    {
      icon: Download,
      title: 'Export Flexível',
      description: 'Exporte em Tailwind config, CSS variables ou JSON'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Gerador de Paletas Tailwind CSS
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Crie paletas de cores profissionais para seus projetos Tailwind
        </p>
        <Link
          to="/generator"
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
        >
          <Palette size={24} />
          Começar Agora
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex p-3 bg-blue-100 rounded-lg mb-4">
              <feature.icon className="text-blue-600" size={32} />
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Example */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Pronto para criar sua paleta perfeita?
        </h2>
        <p className="text-lg mb-6 opacity-90">
          Experimente agora e veja como é fácil criar paletas profissionais
        </p>
        <Link
          to="/generator"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
        >
          Ir para o Gerador
        </Link>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateTailwindConfig, generateCSSVariables, generateJSON } from '../utils/tailwindExport';
import toast from 'react-hot-toast';

export default function ExportPanel({ palette }) {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState('tailwind');

  if (!palette) return null;

  const formats = {
    tailwind: {
      label: 'Tailwind Config',
      code: generateTailwindConfig(palette)
    },
    css: {
      label: 'CSS Variables',
      code: generateCSSVariables(palette)
    },
    json: {
      label: 'JSON',
      code: generateJSON(palette)
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(formats[format].code);
    setCopied(true);
    toast.success('Código copiado!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Export</h3>

      <div className="flex gap-2 mb-4">
        {Object.entries(formats).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setFormat(key)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              format === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{formats[format].code}</code>
        </pre>
        <button
          onClick={copyCode}
          className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
        >
          {copied ? (
            <Check size={20} className="text-green-400" />
          ) : (
            <Copy size={20} className="text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
}

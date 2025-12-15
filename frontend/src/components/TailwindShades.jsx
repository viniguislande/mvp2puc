import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';

export default function TailwindShades({ shades }) {
  if (!shades) return null;

  const tones = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    toast.success(`Copied ${hex}`);
  };

  return (
    <div className="grid grid-cols-5 gap-3">
      {tones.map(tone => (
        <div key={tone} className="relative group">
          <div
            onClick={() => copyToClipboard(shades[tone])}
            className="aspect-square rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-md"
            style={{ backgroundColor: shades[tone] }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 rounded-lg transition-opacity">
              <Copy size={16} className="text-white mb-1" />
              <span className="text-white font-bold text-sm">{tone}</span>
              <span className="text-white text-xs">{shades[tone]}</span>
            </div>
          </div>
          <p className="text-center text-sm font-medium text-gray-600 mt-1">{tone}</p>
        </div>
      ))}
    </div>
  );
}

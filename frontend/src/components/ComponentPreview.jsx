import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ComponentPreview({ shades, paletteName = 'custom' }) {
  const [darkMode, setDarkMode] = useState(false);

  if (!shades) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Preview</h3>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </div>

      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Botões */}
        <div className="mb-6">
          <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Buttons
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              style={{ backgroundColor: shades['500'], color: 'white' }}
              className="px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition-opacity"
            >
              Primary
            </button>
            <button
              style={{ backgroundColor: shades['100'], color: shades['900'] }}
              className="px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition-opacity"
            >
              Secondary
            </button>
            <button
              style={{
                backgroundColor: 'transparent',
                color: shades['600'],
                border: `2px solid ${shades['600']}`
              }}
              className="px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
            >
              Outline
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="mb-6">
          <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Card
          </p>
          <div
            style={{ borderColor: shades['200'] }}
            className={`border-2 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h4 style={{ color: shades['900'] }} className="font-bold mb-2">
              Card Title
            </h4>
            <p style={{ color: shades['600'] }} className="text-sm">
              This is a preview card using your generated palette. The colors adapt to create a cohesive design.
            </p>
            <button
              style={{ backgroundColor: shades['500'], color: 'white' }}
              className="mt-3 px-4 py-1 rounded text-sm"
            >
              Action
            </button>
          </div>
        </div>

        {/* Alert */}
        <div className="mb-6">
          <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Alert
          </p>
          <div
            style={{
              backgroundColor: shades['100'],
              borderLeft: `4px solid ${shades['500']}`
            }}
            className="p-4 rounded"
          >
            <p style={{ color: shades['900'] }} className="font-medium">
              Information
            </p>
            <p style={{ color: shades['700'] }} className="text-sm mt-1">
              This is an informational alert using your palette colors.
            </p>
          </div>
        </div>

        {/* Badges */}
        <div>
          <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Badges
          </p>
          <div className="flex flex-wrap gap-2">
            {['100', '300', '500', '700', '900'].map(tone => (
              <span
                key={tone}
                style={{
                  backgroundColor: shades[tone],
                  color: parseInt(tone) > 400 ? 'white' : shades['900']
                }}
                className="px-3 py-1 rounded-full text-sm font-medium"
              >
                {tone}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

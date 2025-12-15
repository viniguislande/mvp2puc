import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';

export default function ColorPicker({ color, onChange }) {
  const [hexInput, setHexInput] = useState(color);

  const handleHexChange = (e) => {
    const value = e.target.value;
    setHexInput(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <div className="space-y-4">
      <HexColorPicker color={color} onChange={onChange} style={{ width: '100%', height: '200px' }} />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hex Color
        </label>
        <input
          type="text"
          value={hexInput}
          onChange={handleHexChange}
          onBlur={() => setHexInput(color)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="#0047AB"
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>
    </div>
  );
}

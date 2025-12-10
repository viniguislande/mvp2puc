import { Link, useLocation } from 'react-router-dom';
import { Palette, Home, FolderOpen } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Palette className="text-blue-600" size={32} />
            <span className="text-2xl font-bold text-gray-800">Palette Generator</span>
          </Link>

          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors ${
                isActive('/')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>

            <Link
              to="/generator"
              className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors ${
                isActive('/generator')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Palette size={20} />
              <span>Generator</span>
            </Link>

            <Link
              to="/palettes"
              className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors ${
                isActive('/palettes')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FolderOpen size={20} />
              <span>My Palettes</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

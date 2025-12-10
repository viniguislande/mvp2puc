import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Generator from './pages/Generator';
import MyPalettes from './pages/MyPalettes';
import PaletteDetail from './pages/PaletteDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/palettes" element={<MyPalettes />} />
            <Route path="/palettes/:id" element={<PaletteDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;

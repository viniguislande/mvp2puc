import { Loader2 } from 'lucide-react';

export default function Loading({ fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="animate-spin text-blue-600" size={48} />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="animate-spin text-blue-600" size={32} />
    </div>
  );
}

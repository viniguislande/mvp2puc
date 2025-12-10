import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2 } from 'lucide-react';
import { extractFromImage } from '../services/api';
import toast from 'react-hot-toast';

export default function ImageUploader({ onColorsExtracted }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result;
      setPreview(base64);
      setLoading(true);

      try {
        const result = await extractFromImage(base64, 5);
        onColorsExtracted(result.colors);
        toast.success(`${result.count} cores extraídas!`);
      } catch (error) {
        toast.error('Erro ao extrair cores da imagem');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  }, [onColorsExtracted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Extrair de Imagem</h3>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        <input {...getInputProps()} />

        {loading ? (
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-2" size={48} />
        ) : preview ? (
          <img src={preview} alt="Preview" className="max-h-32 mx-auto mb-2 rounded" />
        ) : (
          <Upload className="text-gray-400 mx-auto mb-2" size={48} />
        )}

        <p className="text-gray-600">
          {loading
            ? 'Extraindo cores...'
            : isDragActive
            ? 'Solte a imagem aqui'
            : 'Arraste uma imagem ou clique para selecionar'
          }
        </p>
        <p className="text-sm text-gray-400 mt-2">PNG, JPG, JPEG, WEBP</p>
      </div>
    </div>
  );
}

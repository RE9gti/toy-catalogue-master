
import React, { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface ImageUploadProps {
  imageUrl: string;
  onChange: (url: string) => void;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  imageUrl, 
  onChange,
  label = 'Imagem do produto'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const displayUrl = previewUrl || imageUrl;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Verificar tipo do arquivo
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Formato inválido',
        description: 'Por favor, selecione um arquivo de imagem',
        variant: 'destructive',
      });
      return;
    }
    
    // Simular upload
    setIsUploading(true);
    
    // Criar URL temporária para preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Simulando um upload para servidor
    setTimeout(() => {
      setIsUploading(false);
      
      // Em um app real, aqui teríamos o URL retornado pelo servidor
      const mockServerUrl = previewUrl;
      onChange(mockServerUrl || '');
      
      toast({
        title: 'Imagem enviada',
        description: 'A imagem foi carregada com sucesso',
      });
    }, 1500);
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleResetImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="font-medium text-sm">{label}</div>
      
      <div className="border-2 border-dashed border-input rounded-lg p-4 text-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        
        {displayUrl ? (
          <div className="space-y-4">
            <div className="relative mx-auto max-w-xs">
              <img
                src={displayUrl}
                alt="Preview"
                className="mx-auto max-h-64 object-contain rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetImage}
                disabled={isUploading}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Resetar
              </Button>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={handleButtonClick}
                disabled={isUploading}
              >
                <Upload className="mr-2 h-4 w-4" />
                Trocar imagem
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center gap-4">
            <div className="bg-muted rounded-full p-4">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Arraste uma imagem ou clique para upload
              </p>
              <p className="text-xs text-muted-foreground">
                Formatos suportados: JPG, PNG ou GIF
              </p>
            </div>
            
            <Button 
              variant="secondary" 
              onClick={handleButtonClick}
              disabled={isUploading}
            >
              {isUploading ? (
                <span>Enviando...</span>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Selecionar arquivo
                </>
              )}
            </Button>
          </div>
        )}
      </div>
      
      {imageUrl && !previewUrl && (
        <p className="text-xs text-muted-foreground">
          URL atual: {imageUrl}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;

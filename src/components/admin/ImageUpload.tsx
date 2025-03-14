
import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  RotateCcw,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

interface ImageUploadProps {
  imageUrl: string;
  onChange: (url: string) => void;
  label?: string;
  maxSizeMB?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  imageUrl, 
  onChange,
  label = 'Imagem do produto',
  maxSizeMB = 5 // Tamanho máximo de 5MB por padrão
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const displayUrl = previewUrl || imageUrl;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  // Resetar mensagem de erro quando a imagem muda
  useEffect(() => {
    if (displayUrl) {
      setErrorMessage(null);
    }
  }, [displayUrl]);

  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    // Garantir que o intervalo seja limpo após um tempo máximo
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
    }, 3000);

    return interval;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setErrorMessage(null);
    
    if (!file) return;
    
    // Verificar tipo do arquivo
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Por favor, selecione um arquivo de imagem válido');
      toast({
        title: 'Formato inválido',
        description: 'Por favor, selecione um arquivo de imagem (JPG, PNG ou GIF)',
        variant: 'destructive',
      });
      return;
    }
    
    // Verificar tamanho do arquivo
    if (file.size > maxSizeBytes) {
      setErrorMessage(`A imagem excede o tamanho máximo de ${maxSizeMB}MB`);
      toast({
        title: 'Arquivo muito grande',
        description: `A imagem deve ter no máximo ${maxSizeMB}MB`,
        variant: 'destructive',
      });
      return;
    }
    
    // Simular upload
    setIsUploading(true);
    const progressInterval = simulateUploadProgress();
    
    // Criar URL temporária para preview
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      
      // Importante: atualizar o valor para o componente pai imediatamente
      onChange(result);
      
      // Finalizar o "upload" após um curto período
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress(100);
        setIsUploading(false);
        
        toast({
          title: 'Imagem enviada',
          description: 'A imagem foi carregada com sucesso',
        });
      }, 1500);
    };
    
    reader.onerror = () => {
      setIsUploading(false);
      setErrorMessage('Erro ao ler o arquivo');
      toast({
        title: 'Erro',
        description: 'Não foi possível processar a imagem',
        variant: 'destructive',
      });
    };
    
    reader.readAsDataURL(file);
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
    setUploadProgress(0);
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
      
      <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errorMessage ? 'border-red-500' : 'border-input'}`}>
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
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2 w-full" />
                <p className="text-xs text-muted-foreground">
                  Enviando imagem... {Math.round(uploadProgress)}%
                </p>
              </div>
            )}
            
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
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Trocar imagem
                  </>
                )}
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
                Formatos suportados: JPG, PNG ou GIF (máx {maxSizeMB}MB)
              </p>
            </div>
            
            {errorMessage && (
              <p className="text-sm text-red-500 font-medium">
                {errorMessage}
              </p>
            )}
            
            <Button 
              variant="secondary" 
              onClick={handleButtonClick}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
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
      
      {imageUrl && !previewUrl && !isUploading && (
        <p className="text-xs text-muted-foreground">
          URL atual: {imageUrl.length > 50 ? `${imageUrl.substring(0, 50)}...` : imageUrl}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;

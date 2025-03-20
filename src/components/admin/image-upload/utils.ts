
import { toast } from '@/components/ui/use-toast';

export const validateImageFile = (
  file: File,
  maxSizeBytes: number
): { isValid: boolean; errorMessage: string | null } => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    toast({
      title: 'Formato inválido',
      description: 'Por favor, selecione um arquivo de imagem (JPG, PNG ou GIF)',
      variant: 'destructive',
    });
    return {
      isValid: false,
      errorMessage: 'Por favor, selecione um arquivo de imagem válido'
    };
  }
  
  // Check file size
  if (file.size > maxSizeBytes) {
    const maxSizeMB = maxSizeBytes / (1024 * 1024);
    toast({
      title: 'Arquivo muito grande',
      description: `A imagem deve ter no máximo ${maxSizeMB}MB`,
      variant: 'destructive',
    });
    return {
      isValid: false,
      errorMessage: `A imagem excede o tamanho máximo de ${maxSizeMB}MB`
    };
  }
  
  return { isValid: true, errorMessage: null };
};

export const simulateUploadProgress = (
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  onComplete?: () => void
): NodeJS.Timeout => {
  setProgress(0);
  const interval = setInterval(() => {
    setProgress(prev => {
      const newProgress = prev + Math.random() * 10;
      if (newProgress >= 100) {
        clearInterval(interval);
        if (onComplete) {
          onComplete();
        }
        return 100;
      }
      return newProgress;
    });
  }, 200);

  // Ensure interval is cleared after a maximum time
  setTimeout(() => {
    clearInterval(interval);
    setProgress(100);
    if (onComplete) {
      onComplete();
    }
  }, 3000);

  return interval;
};

export const readFileAsDataURL = (
  file: File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};

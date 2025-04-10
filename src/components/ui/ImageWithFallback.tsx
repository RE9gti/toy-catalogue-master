
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
  onLoad?: () => void;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  fallbackSrc, 
  className,
  onLoad
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={cn(className)}
      onError={handleError}
      onLoad={handleLoad}
      loading="lazy"
    />
  );
};

export default ImageWithFallback;

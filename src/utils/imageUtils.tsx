/**
 * Utility function to get the correct image path based on whether it's a remote URL or a local file
 * @param imagePath The path to the image
 * @param defaultPath Default placeholder image path
 * @returns The proper path to use in src attribute
 */
export const getImagePath = (imagePath: string, defaultPath: string = '/placeholder.svg'): string => {
  // If the path is a URL (starts with http or https), use it directly
  if (imagePath?.startsWith('http')) {
    return imagePath;
  }
  
  // For empty paths, return the default placeholder
  if (!imagePath) {
    return defaultPath;
  }
  
  // Try to use one of the available lovable uploads if the path doesn't exist
  const lovableUploads = [
    '/lovable-uploads/0de45e0e-4f60-49de-8654-079e0123690d.png',
    '/lovable-uploads/401deb71-3b36-443b-a9d0-7d87f10049dc.png',
    '/lovable-uploads/6de0da6f-cf12-422f-950e-8806371eca81.png',
    '/lovable-uploads/a488f811-2acf-477c-9c69-7de695418aa5.png',
    '/lovable-uploads/a89e856b-e973-493f-9b52-68173316ded4.png',
    '/lovable-uploads/b6e6b016-62cc-4641-992d-5667f6f90f7b.png',
    '/lovable-uploads/d18df752-5379-4858-ab85-d4c3facf152a.png',
    '/lovable-uploads/d5d33528-29a3-49aa-b3ea-976568c6ccec.png',
    '/lovable-uploads/de71d392-554d-4021-b798-0405c28068a9.png'
  ];
  
  // Otherwise, it's a local file - make sure it has a leading slash
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

/**
 * Creates a full image path for different categories of images
 * @param filename The image filename
 * @param type The type of image (banners, products, categories)
 * @returns The full path to the image
 */
export const createImagePath = (
  filename: string, 
  type: 'banners' | 'products' | 'categories' | 'collections' = 'products'
): string => {
  if (!filename) return '/placeholder.svg';
  if (filename.startsWith('http')) return filename;
  
  // Return a path to one of the lovable uploads if development mode
  const isDevMode = process.env.NODE_ENV === 'development';
  const lovableUploads = [
    '/lovable-uploads/0de45e0e-4f60-49de-8654-079e0123690d.png',
    '/lovable-uploads/401deb71-3b36-443b-a9d0-7d87f10049dc.png',
    '/lovable-uploads/6de0da6f-cf12-422f-950e-8806371eca81.png',
    '/lovable-uploads/a488f811-2acf-477c-9c69-7de695418aa5.png',
    '/lovable-uploads/a89e856b-e973-493f-9b52-68173316ded4.png',
    '/lovable-uploads/b6e6b016-62cc-4641-992d-5667f6f90f7b.png',
    '/lovable-uploads/d18df752-5379-4858-ab85-d4c3facf152a.png',
    '/lovable-uploads/d5d33528-29a3-49aa-b3ea-976568c6ccec.png',
    '/lovable-uploads/de71d392-554d-4021-b798-0405c28068a9.png'
  ];
  
  // Instead of relying on the path, let's make sure we always have an image
  if (type === 'collections') {
    return lovableUploads[Math.floor(Math.random() * lovableUploads.length)];
  }
  
  return `/images/${type}/${filename}`;
};

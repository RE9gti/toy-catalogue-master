/**
 * Utility function to get the correct image path based on whether it's a remote URL or a local file
 * @param imagePath The path to the image
 * @param defaultPath Default placeholder image path
 * @returns The proper path to use in src attribute
 */
export const getImagePath = (imagePath: string, defaultPath: string = '/placeholder.svg'): string => {
  // If the path is a URL (starts with http or https), use it directly
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // For empty paths, return the default placeholder
  if (!imagePath) {
    return defaultPath;
  }
  
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
  
  return `/images/${type}/${filename}`;
};

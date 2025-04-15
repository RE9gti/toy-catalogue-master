
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/types';
import { getImagePath } from '@/utils/imageUtils';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Handle image path to support both local and external images
  const imagePath = getImagePath(
    category.imageUrl || category.image, 
    '/placeholder.svg'
  );

  return (
    <Link 
      to={`/catalog?category=${category.name.toLowerCase().replace(/ /g, '-')}`}
      className="block group relative overflow-hidden h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-xl overflow-hidden shadow-sm h-full bg-background border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Category Image with reduced margins */}
        <div className="relative overflow-hidden aspect-[5/3]">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
              <div className="loading-spinner" />
            </div>
          )}
          <ImageWithFallback
            src={imagePath}
            alt={category.name}
            fallbackSrc="/lovable-uploads/0de45e0e-4f60-49de-8654-079e0123690d.png"
            className={`object-cover w-full h-full transition-all duration-700 
              ${isHovered ? 'scale-110 filter brightness-90' : 'scale-100'}
              ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Enhanced overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-foreground transform transition-all duration-300">
              <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
              <div 
                className={`flex items-center text-xs font-medium transition-all duration-300 
                  ${isHovered ? 'translate-x-2 text-primary' : 'translate-x-0 text-muted-foreground'}`}
              >
                <span className="mr-1">Explorar coleção</span>
                <ArrowRight className={`h-3 w-3 transition-all duration-300 ${isHovered ? 'ml-1' : 'ml-0'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;

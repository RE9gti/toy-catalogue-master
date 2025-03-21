
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link 
      to={`/catalog?category=${category.name.toLowerCase().replace(/ /g, '-')}`}
      className="block group relative overflow-hidden h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-lg overflow-hidden shadow-lg h-full bg-gray-50 border border-gray-100">
        {/* Category Image with reduced margins */}
        <div className="relative overflow-hidden aspect-[4/3]">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="loading-spinner" />
            </div>
          )}
          <img
            src={category.imageUrl}
            alt={category.name}
            className={`object-cover w-full h-full transition-all duration-700 
              ${isHovered ? 'scale-110 filter brightness-90' : 'scale-100'}
              ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Sophisticated overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-all duration-300">
              <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
              <div 
                className={`flex items-center text-xs font-medium transition-all duration-300 
                  ${isHovered ? 'translate-x-2 text-primary-100' : 'translate-x-0 text-gray-200'}`}
              >
                <span className="mr-1">Explorar coleção</span>
                <ArrowRight className={`h-3 w-3 transition-all duration-300 ${isHovered ? 'ml-1' : 'ml-0'}`} />
              </div>
            </div>
          </div>
          
          {/* Sophisticated hover effect */}
          <div className={`absolute inset-0 border-2 border-transparent transition-all duration-300 ${isHovered ? 'border-primary/50 rounded-lg scale-95' : ''}`}></div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import { getImagePath } from '@/utils/imageUtils';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      description: `${product.name} adicionado ao carrinho`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Wishlist functionality to be implemented
    toast({
      description: `${product.name} adicionado à lista de desejos`,
    });
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-xl overflow-hidden bg-background border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        {/* Product Image */}
        <div className="relative overflow-hidden aspect-square bg-muted/50">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
              <div className="loading-spinner" />
            </div>
          )}
          <ImageWithFallback
            src={getImagePath(product.imageUrl || product.image, '/placeholder.svg')}
            alt={product.name}
            fallbackSrc="/lovable-uploads/0de45e0e-4f60-49de-8654-079e0123690d.png"
            className={`object-cover w-full h-full transition-transform duration-500 
              ${isHovered ? 'scale-105' : 'scale-100'}
              ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Quick action buttons */}
          <div 
            className={`absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 
              transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={handleWishlist}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Adicionar à lista de desejos</span>
            </Button>
            <Button 
              size="icon" 
              variant="default" 
              className="rounded-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Adicionar ao carrinho</span>
            </Button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Star className="h-3.5 w-3.5 fill-primary text-primary mr-1" />
            <span>4.5 (24 avaliações)</span>
          </div>
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
          <div className="mt-3 flex items-end justify-between">
            <div className="text-lg font-semibold text-primary">R$ {product.price.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">
              {product.stock > 10 ? 'Em estoque' : `Apenas ${product.stock} restantes`}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

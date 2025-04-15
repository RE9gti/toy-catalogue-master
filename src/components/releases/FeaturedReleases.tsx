
import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const FeaturedReleases = ({ featuredProducts }) => {
  return (
    <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl p-6 mb-8">
      <div className="flex items-center mb-4">
        <Star className="text-primary mr-2" />
        <h2 className="text-2xl font-bold">Destaques da Semana</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProducts.map(product => (
          <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
            <div className="aspect-square bg-muted relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                Novidade
              </div>
              {product.tags.includes('exclusivo') && (
                <div className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Exclusivo
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-end">
                <p className="text-primary font-bold">R$ {product.price.toFixed(2)}</p>
                <Badge variant="outline" className="text-xs">Novo</Badge>
              </div>
              <Button variant="outline" className="w-full mt-3">Ver detalhes</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedReleases;

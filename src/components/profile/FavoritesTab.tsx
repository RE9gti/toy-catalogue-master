
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

// Mock data for favorite products
const mockFavorites = [
  { id: 1, name: 'Boneco Articulado Herói', price: 'R$ 99,90', image: '/images/products/hot-wheels.jpg' },
  { id: 2, name: 'Kit de Blocos de Construção', price: 'R$ 129,90', image: '/images/products/lego-minecraft.jpg' },
  { id: 3, name: 'Quebra-Cabeça Educativo', price: 'R$ 59,90', image: '/images/products/luigi-mansion.jpg' },
];

const FavoritesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meus Favoritos</CardTitle>
        <CardDescription>Lista de produtos que você marcou como favorito</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mockFavorites.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-square overflow-hidden bg-muted/20">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  fallbackSrc="/placeholder.svg"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-medium line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold text-primary">{product.price}</p>
                  <div className="flex gap-1">
                    <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                    <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                    <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                    <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="w-full">Ver Produto</Button>
                  <Button variant="outline" className="w-full">Adicionar ao Carrinho</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoritesTab;

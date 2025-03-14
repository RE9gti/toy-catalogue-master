
import React, { useState, useEffect } from 'react';
import { products } from '@/data/mockData';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ui/ProductCard';
import { ChevronDown, Star } from 'lucide-react';

const NewReleasesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(8);
  
  // Simular tempo de carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  // Ordenar produtos por data (simulado, assumindo que produtos recentes estão no início do array)
  const newReleases = [...products].slice(0, 16);
  
  // Produtos em destaque (simulado, pegando os primeiros 3)
  const featuredProducts = newReleases.slice(0, 3);
  
  // Função para carregar mais produtos
  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 8, newReleases.length));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Lançamentos</h1>
      
      {/* Banner de lançamentos em destaque */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl p-6 mb-12">
        <div className="flex items-center mb-4">
          <Star className="text-primary mr-2" />
          <h2 className="text-2xl font-bold">Destaques da Semana</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square bg-muted relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Novidade
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-primary font-bold mb-2">R$ {product.price.toFixed(2)}</p>
                <Button variant="outline" className="w-full">Ver detalhes</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Lista de novos lançamentos */}
      <h2 className="text-2xl font-bold mb-6">Todos os Lançamentos</h2>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square bg-muted animate-pulse" />
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newReleases.slice(0, displayCount).map(product => (
              <div key={product.id} className="relative">
                <div className="absolute top-2 left-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                  Novidade
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {displayCount < newReleases.length && (
            <div className="flex justify-center mt-8">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={loadMore}
                className="flex items-center gap-2"
              >
                Carregar mais <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
      
      {/* Newsletter para novidades */}
      <div className="mt-16 bg-muted/50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Receba Novidades Primeiro</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Inscreva-se na nossa newsletter para ser o primeiro a saber sobre lançamentos, promoções exclusivas e dicas para presentear.
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
          />
          <Button>Inscrever</Button>
        </div>
      </div>
    </div>
  );
};

export default NewReleasesPage;

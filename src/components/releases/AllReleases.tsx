
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

const AllReleases = ({ 
  isLoading, 
  sortedReleases, 
  displayCount, 
  setDisplayCount,
  clearFilters
}) => {
  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 8, sortedReleases.length));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Todos os Lançamentos</h2>
        <div className="text-sm text-muted-foreground">
          {sortedReleases.length} produtos encontrados
        </div>
      </div>
      
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
      ) : sortedReleases.length === 0 ? (
        <Card className="text-center p-8">
          <div className="flex flex-col items-center gap-4">
            <Search size={48} className="text-muted-foreground/40" />
            <h3 className="text-xl font-semibold">Nenhum lançamento encontrado</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Não encontramos produtos que correspondam aos seus critérios de busca.
              Tente diferentes termos ou remova alguns filtros.
            </p>
            <Button onClick={clearFilters}>Limpar filtros</Button>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedReleases.slice(0, displayCount).map(product => (
              <div key={product.id} className="relative">
                <div className="absolute top-2 left-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                  Novidade
                </div>
                {product.tags.includes('exclusivo') && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                    Exclusivo
                  </div>
                )}
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {displayCount < sortedReleases.length && (
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
    </div>
  );
};

export default AllReleases;

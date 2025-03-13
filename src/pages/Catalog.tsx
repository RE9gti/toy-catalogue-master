
import React, { useState } from 'react';
import { categories, products } from '@/data/mockData';
import { Category, Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import CategoryCard from '@/components/ui/CategoryCard';

const CatalogPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProducts = products.filter(product => {
    // Filtragem por categoria
    if (activeCategory && product.categoryId !== activeCategory) {
      return false;
    }
    
    // Filtragem por termo de busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Brinquedos</h1>
      
      {/* Barra de pesquisa */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Buscar brinquedos..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none glass-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal size={18} />
          <span className="hidden md:inline">Filtros Avançados</span>
          <span className="md:hidden">Filtros</span>
        </Button>
      </div>
      
      {/* Categorias */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Categorias</h2>
          <Button variant="ghost" onClick={() => setActiveCategory(null)}>
            Ver todas
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`cursor-pointer transition-all ${activeCategory === category.id ? 'ring-2 ring-primary scale-105' : ''}`}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Produtos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {activeCategory
              ? `${categories.find(c => c.id === activeCategory)?.name || 'Produtos'}`
              : 'Todos os Produtos'}
            {searchQuery && ` - Resultados para "${searchQuery}"`}
          </h2>
          <div className="text-sm text-muted-foreground">
            {filteredProducts.length} produtos encontrados
          </div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <Search size={48} className="text-muted-foreground/40" />
                <h3 className="text-xl font-semibold">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Não encontramos produtos que correspondam aos seus critérios de busca.
                  Tente termos diferentes ou remova alguns filtros.
                </p>
                <Button onClick={() => {setSearchQuery(''); setActiveCategory(null);}}>
                  Limpar filtros
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;

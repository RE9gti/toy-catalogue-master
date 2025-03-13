
import React, { useState, useEffect } from 'react';
import { categories, products } from '@/data/mockData';
import { subcategories } from '@/data/subcategoriesMock';
import { Category, Product, Subcategory } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter, SlidersHorizontal, ChevronDown, X, RefreshCcw } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import CategoryCard from '@/components/ui/CategoryCard';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const CatalogPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [ageFilters, setAgeFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simular tempo de carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Obter subcategorias filtradas pela categoria ativa
  const filteredSubcategories = subcategories.filter(
    subcategory => !activeCategory || subcategory.categoryId === activeCategory
  );

  // Função para limpar filtros
  const clearFilters = () => {
    setActiveCategory(null);
    setActiveSubcategory(null);
    setSearchQuery('');
    setPriceRange([0, 200]);
    setSortBy('recommended');
    setAgeFilters([]);
  };

  // Obter opções de idade a partir dos produtos
  const ageOptions = [
    { id: '0-2', label: '0-2 anos' },
    { id: '3-5', label: '3-5 anos' },
    { id: '6-8', label: '6-8 anos' },
    { id: '9-12', label: '9-12 anos' },
    { id: '12+', label: '12+ anos' }
  ];

  // Alternar filtro de idade
  const toggleAgeFilter = (ageId: string) => {
    setAgeFilters(
      ageFilters.includes(ageId)
        ? ageFilters.filter(id => id !== ageId)
        : [...ageFilters, ageId]
    );
  };
  
  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    // Filtragem por categoria
    if (activeCategory && product.categoryId !== activeCategory) {
      return false;
    }
    
    // Filtragem por subcategoria (futura implementação)
    // if (activeSubcategory && product.subcategoryId !== activeSubcategory) {
    //   return false;
    // }
    
    // Filtragem por preço
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Filtragem por idade (futura implementação)
    // if (ageFilters.length > 0 && !ageFilters.includes(product.ageRange)) {
    //   return false;
    // }
    
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

  // Ordenar produtos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0; // Sem ordenação, manter ordem original
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Brinquedos</h1>
      
      {/* Barra de pesquisa e filtros */}
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
        
        <Select 
          value={sortBy} 
          onValueChange={setSortBy}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recomendados</SelectItem>
            <SelectItem value="price-asc">Menor preço</SelectItem>
            <SelectItem value="price-desc">Maior preço</SelectItem>
            <SelectItem value="name-asc">A-Z</SelectItem>
            <SelectItem value="name-desc">Z-A</SelectItem>
          </SelectContent>
        </Select>
        
        <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal size={18} />
              <span className="hidden md:inline">Filtros Avançados</span>
              <span className="md:hidden">Filtros</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[450px] overflow-y-auto">
            <SheetHeader className="mb-5">
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>
                Refine sua busca para encontrar o brinquedo ideal
              </SheetDescription>
            </SheetHeader>
            
            <div className="space-y-6">
              {/* Filtro de preço */}
              <div>
                <h3 className="font-medium mb-3">Faixa de Preço</h3>
                <div className="px-2">
                  <Slider 
                    value={priceRange}
                    min={0}
                    max={200}
                    step={5}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>R$ {priceRange[0]}</span>
                    <span>R$ {priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Filtro de idade */}
              <div>
                <h3 className="font-medium mb-3">Faixa Etária</h3>
                <div className="space-y-2">
                  {ageOptions.map(age => (
                    <div key={age.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`age-${age.id}`} 
                        checked={ageFilters.includes(age.id)}
                        onCheckedChange={() => toggleAgeFilter(age.id)}
                      />
                      <label htmlFor={`age-${age.id}`} className="text-sm">
                        {age.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Botões de ação */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={clearFilters}
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Limpar Filtros
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => setFilterSheetOpen(false)}
                >
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Chip de filtros ativos */}
      {(activeCategory || searchQuery || priceRange[0] > 0 || priceRange[1] < 200 || ageFilters.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeCategory && (
            <div className="inline-flex items-center bg-primary/10 rounded-full px-3 py-1 text-sm">
              <span>Categoria: {categories.find(c => c.id === activeCategory)?.name}</span>
              <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setActiveCategory(null)}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          {activeSubcategory && (
            <div className="inline-flex items-center bg-primary/10 rounded-full px-3 py-1 text-sm">
              <span>Subcategoria: {subcategories.find(s => s.id === activeSubcategory)?.name}</span>
              <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setActiveSubcategory(null)}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          {searchQuery && (
            <div className="inline-flex items-center bg-primary/10 rounded-full px-3 py-1 text-sm">
              <span>Busca: "{searchQuery}"</span>
              <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setSearchQuery('')}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          {(priceRange[0] > 0 || priceRange[1] < 200) && (
            <div className="inline-flex items-center bg-primary/10 rounded-full px-3 py-1 text-sm">
              <span>Preço: R${priceRange[0]} - R${priceRange[1]}</span>
              <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setPriceRange([0, 200])}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          {ageFilters.length > 0 && (
            <div className="inline-flex items-center bg-primary/10 rounded-full px-3 py-1 text-sm">
              <span>Idades: {ageFilters.map(age => 
                ageOptions.find(opt => opt.id === age)?.label
              ).join(', ')}</span>
              <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setAgeFilters([])}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          {(activeCategory || searchQuery || priceRange[0] > 0 || priceRange[1] < 200 || ageFilters.length > 0) && (
            <Button variant="ghost" size="sm" className="text-sm h-7" onClick={clearFilters}>
              Limpar todos os filtros
            </Button>
          )}
        </div>
      )}
      
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
      
      {/* Subcategorias - Mostrar apenas quando uma categoria estiver selecionada */}
      {activeCategory && filteredSubcategories.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Subcategorias</h2>
            <Button variant="ghost" onClick={() => setActiveSubcategory(null)}>
              Ver todas
            </Button>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
            {filteredSubcategories.map((subcategory) => (
              <div
                key={subcategory.id}
                onClick={() => setActiveSubcategory(subcategory.id)}
                className={`flex-shrink-0 w-[200px] cursor-pointer ${
                  activeSubcategory === subcategory.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <Card className="h-full overflow-hidden">
                  <div className="h-24 bg-muted overflow-hidden">
                    {subcategory.imageUrl && (
                      <img 
                        src={subcategory.imageUrl} 
                        alt={subcategory.name} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm">{subcategory.name}</h3>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Produtos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {activeCategory
              ? `${categories.find(c => c.id === activeCategory)?.name || 'Produtos'}`
              : 'Todos os Produtos'}
            {activeSubcategory && ` > ${subcategories.find(s => s.id === activeSubcategory)?.name}`}
            {searchQuery && ` - Resultados para "${searchQuery}"`}
          </h2>
          <div className="text-sm text-muted-foreground">
            {sortedProducts.length} produtos encontrados
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
        ) : sortedProducts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <Search size={48} className="text-muted-foreground/40" />
                <h3 className="text-xl font-semibold">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Não encontramos produtos que correspondam aos seus critérios de busca.
                  Tente termos diferentes ou remova alguns filtros.
                </p>
                <Button onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;


import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Tag, Filter } from 'lucide-react';
import { Category, Subcategory } from '@/types';
import { Badge } from '@/components/ui/badge';

interface ActiveFiltersProps {
  activeCategory: string | null;
  activeSubcategory: string | null;
  searchQuery: string;
  priceRange: number[];
  ageFilters: string[];
  categories: Category[];
  subcategories: Subcategory[];
  setActiveCategory: (categoryId: string | null) => void;
  setActiveSubcategory: (subcategoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setPriceRange: (range: number[]) => void;
  setAgeFilters: (filters: string[]) => void;
  clearFilters: () => void;
}

const ageOptions = [
  { id: '0-2', label: '0-2 anos' },
  { id: '3-5', label: '3-5 anos' },
  { id: '6-8', label: '6-8 anos' },
  { id: '9-12', label: '9-12 anos' },
  { id: '12+', label: '12+ anos' }
];

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  activeCategory,
  activeSubcategory,
  searchQuery,
  priceRange,
  ageFilters,
  categories,
  subcategories,
  setActiveCategory,
  setActiveSubcategory,
  setSearchQuery,
  setPriceRange,
  setAgeFilters,
  clearFilters
}) => {
  const hasActiveFilters = 
    activeCategory || 
    activeSubcategory || 
    searchQuery || 
    priceRange[0] > 0 || 
    priceRange[1] < 200 || 
    ageFilters.length > 0;
  
  if (!hasActiveFilters) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 animate-fade-in">
      <div className="flex items-center mb-3">
        <Filter size={18} className="text-primary mr-2" />
        <h3 className="font-medium">Filtros Ativos</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {activeCategory && (
          <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
            <Tag className="h-3 w-3 mr-1" />
            <span>Categoria: {categories.find(c => c.id === activeCategory)?.name}</span>
            <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setActiveCategory(null)}>
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        {activeSubcategory && (
          <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
            <span>Subcategoria: {subcategories.find(s => s.id === activeSubcategory)?.name}</span>
            <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setActiveSubcategory(null)}>
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        {searchQuery && (
          <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
            <span>Busca: "{searchQuery}"</span>
            <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setSearchQuery('')}>
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        {(priceRange[0] > 0 || priceRange[1] < 200) && (
          <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
            <span>Preço: R${priceRange[0]} - R${priceRange[1]}</span>
            <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setPriceRange([0, 200])}>
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        {ageFilters.length > 0 && (
          <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
            <span>Idades: {ageFilters.map(age => 
              ageOptions.find(opt => opt.id === age)?.label
            ).join(', ')}</span>
            <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setAgeFilters([])}>
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
      </div>
      
      {hasActiveFilters && (
        <Button 
          variant="outline" 
          size="sm" 
          className="text-sm h-7 mt-3" 
          onClick={clearFilters}
        >
          <X className="h-3 w-3 mr-1" />
          Limpar todos os filtros
        </Button>
      )}
    </div>
  );
};

export default ActiveFilters;

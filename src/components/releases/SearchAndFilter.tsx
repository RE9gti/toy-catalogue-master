
import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Separator } from "@/components/ui/separator";

const SearchAndFilter = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filterSheetOpen,
  setFilterSheetOpen,
  filter,
  setFilter,
  activeCategory,
  setActiveCategory,
  clearFilters
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Buscar lançamentos..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Mais recentes</SelectItem>
            <SelectItem value="price-asc">Menor preço</SelectItem>
            <SelectItem value="price-desc">Maior preço</SelectItem>
            <SelectItem value="name-asc">A-Z</SelectItem>
            <SelectItem value="name-desc">Z-A</SelectItem>
          </SelectContent>
        </Select>
        
        <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              <span>Filtros</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Filtrar Lançamentos</SheetTitle>
              <SheetDescription>
                Refine sua busca de novos produtos
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              <div>
                <h3 className="font-medium mb-2">Tipo de Lançamento</h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={filter === 'all' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setFilter('all')}
                  >
                    Todos
                  </Button>
                  <Button 
                    variant={filter === 'exclusive' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setFilter('exclusive')}
                  >
                    Exclusivos
                  </Button>
                  <Button 
                    variant={filter === 'limited' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setFilter('limited')}
                  >
                    Edição Limitada
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={clearFilters} className="flex-1">
                  Limpar
                </Button>
                <Button onClick={() => setFilterSheetOpen(false)} className="flex-1">
                  Aplicar
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {(filter !== 'all' || searchQuery || activeCategory) && (
        <div className="flex flex-wrap gap-2">
          {filter !== 'all' && (
            <Badge variant="outline" className="flex items-center gap-1">
              <span>Tipo: {filter === 'exclusive' ? 'Exclusivos' : 'Edição Limitada'}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0" 
                onClick={() => setFilter('all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {searchQuery && (
            <Badge variant="outline" className="flex items-center gap-1">
              <span>Busca: {searchQuery}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0" 
                onClick={() => setSearchQuery('')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {activeCategory && (
            <Badge variant="outline" className="flex items-center gap-1">
              <span>Categoria: {activeCategory}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0" 
                onClick={() => setActiveCategory(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          <Button variant="ghost" size="sm" className="h-7" onClick={clearFilters}>
            Limpar todos
          </Button>
        </div>
      )}
    </>
  );
};

export default SearchAndFilter;


import { useState } from 'react';
import { Product } from '@/types';

export interface ProductsTableOptions {
  initialSortField?: keyof Product;
  initialSortDirection?: 'asc' | 'desc';
}

export function useProductsTable(products: Product[], options: ProductsTableOptions = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Product>(options.initialSortField || 'name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(options.initialSortDirection || 'asc');
  
  // Filtragem de produtos baseado no termo de busca
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Ordenação de produtos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortField === 'price' || sortField === 'stock') {
      return sortDirection === 'asc' 
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    }
    
    return sortDirection === 'asc'
      ? String(a[sortField]).localeCompare(String(b[sortField]))
      : String(b[sortField]).localeCompare(String(a[sortField]));
  });
  
  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  return {
    searchTerm,
    setSearchTerm,
    sortField,
    sortDirection,
    handleSort,
    sortedProducts
  };
}

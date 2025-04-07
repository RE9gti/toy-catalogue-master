
import React from 'react';
import { categories, products } from '@/data/mockData';
import { subcategories } from '@/data/subcategoriesMock';
import { useCatalogFilters } from '@/hooks/useCatalogFilters';
import CategoryList from '@/components/catalog/CategoryList';
import SubcategoryList from '@/components/catalog/SubcategoryList';
import SearchAndFilter from '@/components/catalog/SearchAndFilter';
import ActiveFilters from '@/components/catalog/ActiveFilters';
import ProductGrid from '@/components/catalog/ProductGrid';

const CatalogPage = () => {
  const {
    activeCategory,
    setActiveCategory,
    activeSubcategory,
    setActiveSubcategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    filterSheetOpen,
    setFilterSheetOpen,
    ageFilters,
    setAgeFilters,
    toggleAgeFilter,
    isLoading,
    clearFilters,
    sortedProducts
  } = useCatalogFilters(products);

  const filteredSubcategories = subcategories.filter(
    subcategory => !activeCategory || subcategory.categoryId === activeCategory
  );

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-primary/5 to-accent/10 p-8">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Catálogo de Brinquedos
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Explore nossa ampla seleção de brinquedos cuidadosamente selecionados para proporcionar diversão e aprendizado para crianças de todas as idades
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
          <svg width="300" height="300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <SearchAndFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        ageFilters={ageFilters}
        toggleAgeFilter={toggleAgeFilter}
        clearFilters={clearFilters}
        filterSheetOpen={filterSheetOpen}
        setFilterSheetOpen={setFilterSheetOpen}
      />
      
      <ActiveFilters 
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        searchQuery={searchQuery}
        priceRange={priceRange}
        ageFilters={ageFilters}
        categories={categories}
        subcategories={subcategories}
        setActiveCategory={setActiveCategory}
        setActiveSubcategory={setActiveSubcategory}
        setSearchQuery={setSearchQuery}
        setPriceRange={setPriceRange}
        setAgeFilters={setAgeFilters}
        clearFilters={clearFilters}
      />
      
      <CategoryList 
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      {activeCategory && filteredSubcategories.length > 0 && (
        <SubcategoryList 
          subcategories={filteredSubcategories}
          activeSubcategory={activeSubcategory}
          setActiveSubcategory={setActiveSubcategory}
        />
      )}
      
      <ProductGrid 
        products={sortedProducts}
        isLoading={isLoading}
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        searchQuery={searchQuery}
        categories={categories}
        subcategories={subcategories}
        clearFilters={clearFilters}
      />
    </div>
  );
};

export default CatalogPage;

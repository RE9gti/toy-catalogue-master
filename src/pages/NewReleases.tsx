
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { products } from '@/data/mockData';
import { 
  ReleasesHeader,
  SearchAndFilter,
  ReleasesTabs,
  NewsletterSignup
} from '@/components/releases';

const NewReleasesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(8);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('recent');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  const allNewReleases = [...products].slice(0, 16);
  
  const filteredReleases = allNewReleases.filter(product => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(query);
      const descMatch = product.description.toLowerCase().includes(query);
      const tagsMatch = product.tags.some(tag => tag.toLowerCase().includes(query));
      
      if (!nameMatch && !descMatch && !tagsMatch) return false;
    }
    
    if (activeCategory && product.categoryId !== activeCategory) {
      return false;
    }
    
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    if (filter === 'exclusive' && !product.tags.includes('exclusivo')) {
      return false;
    }
    if (filter === 'limited' && !product.tags.includes('edição limitada')) {
      return false;
    }
    
    return true;
  });
  
  const sortedReleases = [...filteredReleases].sort((a, b) => {
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
        return 0;
    }
  });
  
  const featuredProducts = allNewReleases.slice(0, 3);
  
  const clearFilters = () => {
    setFilter('all');
    setSearchQuery('');
    setPriceRange([0, 200]);
    setSortBy('recent');
    setActiveCategory(null);
    setFilterSheetOpen(false);
  };

  const currentDate = new Date();
  const upcomingReleases = [
    {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 5),
      products: allNewReleases.slice(0, 2)
    },
    {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 12),
      products: allNewReleases.slice(2, 4)
    },
    {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 19),
      products: allNewReleases.slice(4, 5)
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <ReleasesHeader />
        
        <SearchAndFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterSheetOpen={filterSheetOpen}
          setFilterSheetOpen={setFilterSheetOpen}
          filter={filter}
          setFilter={setFilter}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          clearFilters={clearFilters}
        />
        
        <ReleasesTabs 
          isLoading={isLoading}
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filterSheetOpen={filterSheetOpen}
          setFilterSheetOpen={setFilterSheetOpen}
          displayCount={displayCount}
          setDisplayCount={setDisplayCount}
          allNewReleases={allNewReleases}
          filteredReleases={filteredReleases}
          sortedReleases={sortedReleases}
          featuredProducts={featuredProducts}
          clearFilters={clearFilters}
          upcomingReleases={upcomingReleases}
        />
        
        <NewsletterSignup />
      </div>
    </Layout>
  );
};

export default NewReleasesPage;

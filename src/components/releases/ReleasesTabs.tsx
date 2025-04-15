
import React from 'react';
import { Calendar, ShoppingBag, Star } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { FeaturedReleases } from '@/components/releases';
import { AllReleases } from '@/components/releases';
import { ReleasesCalendar } from '@/components/releases';
import { ExclusiveReleases } from '@/components/releases';

const ReleasesTabs = ({
  isLoading,
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  activeCategory,
  setActiveCategory,
  filterSheetOpen,
  setFilterSheetOpen,
  displayCount,
  setDisplayCount,
  allNewReleases,
  filteredReleases,
  sortedReleases,
  featuredProducts,
  clearFilters,
  upcomingReleases
}) => {
  return (
    <Tabs defaultValue="products" className="mb-12">
      <TabsList className="mb-6">
        <TabsTrigger value="products" className="flex items-center gap-1">
          <ShoppingBag className="h-4 w-4" />
          <span>Produtos Lançados</span>
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>Calendário de Lançamentos</span>
        </TabsTrigger>
        <TabsTrigger value="exclusive" className="flex items-center gap-1">
          <Star className="h-4 w-4" />
          <span>Exclusivos</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="products" className="space-y-8 animate-fade-in">
        <FeaturedReleases 
          featuredProducts={featuredProducts} 
        />
        <AllReleases 
          isLoading={isLoading}
          sortedReleases={sortedReleases}
          displayCount={displayCount}
          setDisplayCount={setDisplayCount}
          clearFilters={clearFilters}
        />
      </TabsContent>
      
      <TabsContent value="calendar" className="animate-fade-in">
        <ReleasesCalendar upcomingReleases={upcomingReleases} />
      </TabsContent>
      
      <TabsContent value="exclusive" className="animate-fade-in">
        <ExclusiveReleases allNewReleases={allNewReleases} />
      </TabsContent>
    </Tabs>
  );
};

export default ReleasesTabs;

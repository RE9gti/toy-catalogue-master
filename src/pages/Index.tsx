
import React from 'react';
import { 
  MainBanner,
  ContactBar,
  SustainabilityBanner,
  FeaturedCategories,
  StoreConcept,
  NewProducts,
  CollectiblesSection,
  SpecialOffers,
  WhyChooseUs,
  FinalBanner
} from '@/components/home';
import { categoriasPrincipais, produtosNovidades } from '@/data/homeCategories';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainBanner />
      <ContactBar />
      <SustainabilityBanner />
      <FeaturedCategories categories={categoriasPrincipais} />
      <StoreConcept />
      <NewProducts products={produtosNovidades} />
      <CollectiblesSection />
      <SpecialOffers />
      <WhyChooseUs />
      <FinalBanner />
    </div>
  );
};

export default Index;

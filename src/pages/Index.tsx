
import React from 'react';
import Layout from '@/components/layout/Layout';
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
  FinalBanner,
  FeaturedProducts
} from '@/components/home';
import { categoriasPrincipais, produtosNovidades } from '@/data/homeCategories';

const Index = () => {
  return (
    <Layout>
      <MainBanner />
      <ContactBar />
      <FeaturedProducts />
      <SustainabilityBanner />
      <FeaturedCategories categories={categoriasPrincipais} />
      <StoreConcept />
      <NewProducts products={produtosNovidades} />
      <CollectiblesSection />
      <SpecialOffers />
      <WhyChooseUs />
      <FinalBanner />
    </Layout>
  );
};

export default Index;

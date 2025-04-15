
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

const FeaturedProducts = () => {
  // Select 4 random products to display
  const featuredProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <section className="py-16 bg-muted/20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Produtos em Destaque</h2>
            <p className="text-muted-foreground max-w-lg">
              Confira nossa seleção de brinquedos mais populares e mais vendidos
            </p>
          </div>
          <Link to="/catalog">
            <Button variant="outline" className="mt-4 md:mt-0 flex items-center gap-2">
              Ver catálogo completo
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

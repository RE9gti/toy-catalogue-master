
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface Category {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
}

interface FeaturedCategoriesProps {
  categories: Category[];
}

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ categories }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nossas Categorias</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((categoria) => (
            <Card key={categoria.id} className="glass-card overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="aspect-square relative">
                <ImageWithFallback 
                  src={`/images/categories/${categoria.imagem}`}
                  alt={categoria.nome}
                  fallbackSrc={`/lovable-uploads/${Math.floor(Math.random() * 8) + 1}.png`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{categoria.nome}</h3>
                <p className="text-sm text-muted-foreground mb-3">{categoria.descricao}</p>
                <Link 
                  to={`/categorias/${categoria.id}`}
                  className="text-primary hover:underline flex items-center text-sm font-medium"
                >
                  Ver produtos <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;

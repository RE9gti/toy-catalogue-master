
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  imagem: string;
  lancamento?: boolean;
  seminovo?: boolean;
}

interface NewProductsProps {
  products: Product[];
}

const NewProducts: React.FC<NewProductsProps> = ({ products }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Novidades</h2>
          <Link to="/lancamentos" className="text-primary hover:underline flex items-center">
            Ver todos <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-4 snap-x">
          {products.map((produto) => (
            <div 
              key={produto.id}
              className="snap-start shrink-0 w-[280px] glass-card"
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={produto.imagem} 
                  alt={produto.nome}
                  className="absolute inset-0 w-full h-full object-contain p-4"
                />
                {produto.lancamento && (
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                    Novo
                  </span>
                )}
                {produto.seminovo && (
                  <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    Semi-novo
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{produto.nome}</h3>
                <p className="text-sm text-muted-foreground mb-2">{produto.categoria}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">R$ {produto.preco.toFixed(2)}</span>
                  <Button variant="secondary" size="sm">
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;

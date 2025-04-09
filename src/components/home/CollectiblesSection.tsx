
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const CollectiblesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/20 to-primary/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Personagens e Colecionáveis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/30 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <ImageWithFallback 
                src="/images/collections/hot-wheels.png" 
                alt="Hot Wheels" 
                fallbackSrc="/lovable-uploads/d5d33528-29a3-49aa-b3ea-976568c6ccec.png"
                className="w-full md:w-1/2 rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">Hot Wheels</h3>
                <p className="text-gray-800 mb-4">
                  Carrinhos de colecionador para todas as idades. Uma paixão que atravessa gerações!
                </p>
                <Button className="bg-white text-primary hover:bg-white/90 shadow-md hover:shadow-lg transition-all duration-300" asChild>
                  <Link to="/colecao/hot-wheels">
                    Ver coleção
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/30 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <ImageWithFallback 
                src="/images/collections/action-figures.png" 
                alt="Bonecas e Figuras de Ação" 
                fallbackSrc="/lovable-uploads/401deb71-3b36-443b-a9d0-7d87f10049dc.png"
                className="w-full md:w-1/2 rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">Figuras de Ação</h3>
                <p className="text-gray-800 mb-4">
                  De Star Wars a super-heróis, encontre as figuras mais raras e desejadas.
                </p>
                <Button className="bg-white text-primary hover:bg-white/90 shadow-md hover:shadow-lg transition-all duration-300" asChild>
                  <Link to="/colecao/figuras-acao">
                    Ver coleção
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectiblesSection;


import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { createImagePath } from '@/utils/imageUtils';

const CollectiblesSection = () => {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Personagens e Colecionáveis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/20">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img 
                src={createImagePath('hot-wheels.png', 'collections')} 
                alt="Hot Wheels" 
                className="w-full md:w-1/2 rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">Hot Wheels</h3>
                <p className="text-white/80 mb-4">
                  Carrinhos de colecionador para todas as idades. Uma paixão que atravessa gerações!
                </p>
                <Button className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/colecao/hot-wheels">
                    Ver coleção
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/20">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img 
                src={createImagePath('action-figures.png', 'collections')} 
                alt="Bonecas e Figuras de Ação" 
                className="w-full md:w-1/2 rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">Figuras de Ação</h3>
                <p className="text-white/80 mb-4">
                  De Star Wars a super-heróis, encontre as figuras mais raras e desejadas.
                </p>
                <Button className="bg-white text-primary hover:bg-white/90" asChild>
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

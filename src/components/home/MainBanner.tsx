
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createImagePath } from '@/utils/imageUtils';

const MainBanner = () => {
  return (
    <section className="relative py-10">
      <div className="container mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <img 
            src={createImagePath('main-banner.jpg', 'banners')} 
            alt="BrinquedoKIDS - Brinquedos" 
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-10">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                Bem-vindo à BrinquedoKIDS
              </h1>
              <p className="text-xl mb-3 drop-shadow-md">
                Vendas de brinquedos novos e semi-novos. Conceito de economia financeira e de recursos naturais.
              </p>
              <p className="text-lg italic mb-6 drop-shadow-md">
                "Aqui os brinquedos não são objetos, eles carregam histórias e emoções."
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/catalogo">
                    Ver Produtos <ShoppingBag className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20" asChild>
                  <Link to="/promocoes">
                    Brinquedos Semi-novos <RefreshCw className="ml-2 h-5 w-5" />
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

export default MainBanner;

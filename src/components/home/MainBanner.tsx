
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const MainBanner = () => {
  return (
    <section className="relative py-10">
      <div className="container mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <ImageWithFallback 
            src="/images/banners/main-banner.jpg" 
            alt="BrinquedoKIDS - Brinquedos" 
            fallbackSrc="/lovable-uploads/6de0da6f-cf12-422f-950e-8806371eca81.png"
            className="w-full h-auto md:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg animate-slide-up">
                Bem-vindo à BrinquedoKIDS
              </h1>
              <p className="text-xl mb-3 drop-shadow-md animate-slide-up" style={{animationDelay: '200ms'}}>
                Vendas de brinquedos novos e semi-novos. Conceito de economia financeira e de recursos naturais.
              </p>
              <p className="text-lg italic mb-6 drop-shadow-md animate-slide-up" style={{animationDelay: '400ms'}}>
                "Aqui os brinquedos não são objetos, eles carregam histórias e emoções."
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{animationDelay: '600ms'}}>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg" asChild>
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

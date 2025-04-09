
import React from 'react';
import { Leaf, RefreshCw, ShoppingBag } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const SustainabilityBanner = () => {
  return (
    <section className="py-10 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3 shrink-0">
            <ImageWithFallback 
              src="/images/banners/sustainability.jpg"
              alt="Sustentabilidade e Brinquedos" 
              fallbackSrc="/lovable-uploads/a488f811-2acf-477c-9c69-7de695418aa5.png"
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Sustentabilidade e Rotatividade</h2>
            <p className="text-gray-700 mb-4">
              Ao optar por brinquedos semi-novos, você contribui para um mundo sustentável, promovendo a reutilização e reduzindo o descarte de plástico e outros materiais.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <Leaf className="h-6 w-6 text-green-600 mr-2" />
                <span>Menos resíduos no ambiente</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <RefreshCw className="h-6 w-6 text-green-600 mr-2" />
                <span>Economia circular</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <ShoppingBag className="h-6 w-6 text-green-600 mr-2" />
                <span>Economia financeira</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityBanner;

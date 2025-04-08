
import React from 'react';
import { Leaf, RefreshCw, ShoppingBag } from 'lucide-react';
import { createImagePath } from '@/utils/imageUtils';

const SustainabilityBanner = () => {
  return (
    <section className="py-10 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3 shrink-0">
            <img 
              src={createImagePath('sustainability.jpg', 'banners')}
              alt="Sustentabilidade e Brinquedos" 
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Sustentabilidade e Rotatividade</h2>
            <p className="text-gray-700 mb-4">
              Ao optar por brinquedos semi-novos, você contribui para um mundo sustentável, promovendo a reutilização e reduzindo o descarte de plástico e outros materiais.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                <Leaf className="h-6 w-6 text-green-600 mr-2" />
                <span>Menos resíduos no ambiente</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                <RefreshCw className="h-6 w-6 text-green-600 mr-2" />
                <span>Economia circular</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
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

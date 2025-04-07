
import React from 'react';
import { Leaf, RefreshCw, ShoppingBag } from 'lucide-react';

const SustainabilityBanner = () => {
  return (
    <section className="py-10 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3 shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1584661156301-daf6a9cad6c2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
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

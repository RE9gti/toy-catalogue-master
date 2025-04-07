
import React from 'react';
import { Package, Leaf, Tag } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Por que escolher a MuhlStore?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-primary/5 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
            <p className="text-muted-foreground">Receba seus brinquedos em até 48 horas em todo o Brasil.</p>
          </div>
          
          <div className="bg-primary/5 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustentabilidade</h3>
            <p className="text-muted-foreground">Cada brinquedo reutilizado é um passo para um planeta mais limpo.</p>
          </div>
          
          <div className="bg-primary/5 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Tag className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Melhor Preço</h3>
            <p className="text-muted-foreground">Preços acessíveis em brinquedos semi-novos de alta qualidade.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

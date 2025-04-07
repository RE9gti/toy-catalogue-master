
import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SpecialOffers = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-primary">Promoções Especiais</h2>
            <p className="mb-6 text-gray-700">
              Na compra de qualquer brinquedo semi-novo, ganhe um desconto especial em sua próxima compra. Incentivamos a cultura da reutilização e valorização de brinquedos.
            </p>
            <Button variant="default" asChild>
              <Link to="/promocoes">
                Ver Promoções <Tag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1550747545-c896b5f89ff7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Bonecas e Brinquedos em Promoção" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;

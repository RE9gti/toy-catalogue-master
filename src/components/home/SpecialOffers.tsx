
import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

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
            <Button variant="default" className="shadow-md hover:shadow-lg transition-all" asChild>
              <Link to="/promocoes" className="flex items-center">
                Ver Promoções <Tag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="md:w-1/2">
            <ImageWithFallback 
              src="/images/banners/special-offers.jpg" 
              alt="Bonecas e Brinquedos em Promoção" 
              fallbackSrc="/lovable-uploads/de71d392-554d-4021-b798-0405c28068a9.png"
              className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;

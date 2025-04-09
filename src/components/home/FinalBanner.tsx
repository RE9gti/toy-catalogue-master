
import React from 'react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const FinalBanner = () => {
  return (
    <section className="py-10 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <ImageWithFallback 
            src="/images/banners/final-banner.jpg" 
            alt="Brinquedos BrinquedoKIDS" 
            fallbackSrc="/lovable-uploads/b6e6b016-62cc-4641-992d-5667f6f90f7b.png"
            className="w-full max-w-3xl rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 mb-6"
          />
          <h2 className="text-2xl font-bold mb-4">BrinquedoKIDS</h2>
          <p className="text-gray-700 max-w-2xl mb-6">
            Sustentabilidade, economia e diversão em um só lugar. Visite nossa loja física ou compre online!
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <span className="text-gray-600">Siga-nos: </span>
            <a href="https://instagram.com/brinquedokids" className="text-primary hover:underline transition-all duration-300 hover:text-accent">@brinquedokids</a>
            <span className="text-gray-600">|</span>
            <span className="text-gray-600">WhatsApp: </span>
            <a href="tel:5198765-4321" className="text-primary hover:underline transition-all duration-300 hover:text-accent">(51) 98765-4321</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalBanner;

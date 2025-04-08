
import React from 'react';
import { createImagePath } from '@/utils/imageUtils';

const FinalBanner = () => {
  return (
    <section className="py-10 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <img 
            src={createImagePath('final-banner.jpg', 'banners')} 
            alt="Brinquedos BrinquedoKIDS" 
            className="w-full max-w-3xl rounded-lg shadow-lg mb-6"
          />
          <h2 className="text-2xl font-bold mb-4">BrinquedoKIDS</h2>
          <p className="text-gray-700 max-w-2xl mb-6">
            Sustentabilidade, economia e diversão em um só lugar. Visite nossa loja física ou compre online!
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <span className="text-gray-600">Siga-nos: </span>
            <a href="https://instagram.com/brinquedokids" className="text-primary hover:underline">@brinquedokids</a>
            <span className="text-gray-600">|</span>
            <span className="text-gray-600">WhatsApp: </span>
            <a href="tel:5198765-4321" className="text-primary hover:underline">(51) 98765-4321</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalBanner;

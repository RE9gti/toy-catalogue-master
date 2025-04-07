
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const StoreConcept = () => {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-primary">Conceito de Economia Financeira</h3>
            <div className="flex items-start gap-4 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Economia Financeira" 
                className="w-1/3 rounded-lg"
              />
              <div>
                <p className="text-gray-700 mb-4">
                  Com o valor de 1 brinquedo novo, você pode comprar até 5 brinquedos semi-novos em excelente estado.
                </p>
                <p className="text-gray-700">
                  Proporcionamos economia para seu bolso sem comprometer a diversão das crianças.
                </p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link to="/conceito">
                Saiba mais sobre nosso conceito
              </Link>
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-primary">Brinquedos com História</h3>
            <div className="flex items-start gap-4 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1558060370-d644729990a0?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Brinquedos de Coleção" 
                className="w-1/3 rounded-lg"
              />
              <div>
                <p className="text-gray-700 mb-4">
                  Nossos brinquedos não são simples objetos, eles carregam histórias, memórias e emoções.
                </p>
                <p className="text-gray-700">
                  Desde bonecas vintage até carrinhos de coleção, temos os brinquedos que marcaram gerações.
                </p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link to="/colecao">
                Ver itens de coleção
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreConcept;

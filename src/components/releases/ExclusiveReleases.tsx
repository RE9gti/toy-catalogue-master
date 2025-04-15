
import React from 'react';
import { Gift, Info, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ExclusiveReleases = ({ allNewReleases }) => {
  return (
    <div className="bg-gradient-to-r from-amber-500/20 to-amber-400/5 rounded-xl p-6 mb-8">
      <div className="flex items-center mb-6">
        <Gift className="text-amber-500 mr-2" />
        <h2 className="text-2xl font-bold">Lançamentos Exclusivos</h2>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/2">
            <Badge className="mb-3 bg-amber-500">Exclusivo</Badge>
            <h3 className="text-2xl font-bold mb-2">Produtos Exclusivos da Nossa Loja</h3>
            <p className="text-muted-foreground mb-4">
              Descubra brinquedos que só podem ser encontrados em nossa loja. 
              Peças únicas, colecionáveis e edições limitadas que farão a alegria 
              dos pequenos e dos colecionadores.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Info className="h-4 w-4" />
              <span>Produtos exclusivos disponíveis apenas enquanto durarem os estoques</span>
            </div>
            <Button>Ver todos exclusivos</Button>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://via.placeholder.com/600x400" 
              alt="Produtos exclusivos" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allNewReleases.slice(0, 3).map(product => (
          <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-lg shadow overflow-hidden">
            <div className="aspect-square relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Exclusivo
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <div className="flex justify-between items-center mb-2">
                <p className="text-primary font-bold">R$ {product.price.toFixed(2)}</p>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-700 border-amber-200">
                  <Tag className="h-3 w-3 mr-1" /> Edição Limitada
                </Badge>
              </div>
              <Button variant="outline" className="w-full">Ver detalhes</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveReleases;

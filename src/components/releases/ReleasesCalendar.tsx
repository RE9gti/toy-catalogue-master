
import React from 'react';
import { Button } from '@/components/ui/button';

const ReleasesCalendar = ({ upcomingReleases }) => {
  return (
    <div className="bg-muted/30 rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Calendário de Lançamentos</h2>
      
      <div className="space-y-8">
        {upcomingReleases.map((release, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 text-primary font-semibold p-2 rounded-lg text-center min-w-16">
                <div className="text-sm">{release.date.toLocaleDateString('pt-BR', {month: 'short'})}</div>
                <div className="text-2xl">{release.date.getDate()}</div>
              </div>
              <div>
                <h3 className="font-semibold">Novos Lançamentos</h3>
                <p className="text-sm text-muted-foreground">
                  {release.date.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {release.products.map(product => (
                <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg border border-muted">
                  <div className="w-16 h-16 bg-muted rounded flex-shrink-0 overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium line-clamp-1">{product.name}</h4>
                    <p className="text-primary font-semibold">R$ {product.price.toFixed(2)}</p>
                  </div>
                  <Button size="sm" variant="outline">Lembrar</Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReleasesCalendar;


import React from 'react';
import { Package } from 'lucide-react';

const ReleasesHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <Package className="h-7 w-7 text-primary" />
        <h1 className="text-3xl font-bold">Lançamentos</h1>
      </div>
      <p className="text-muted-foreground mt-2 max-w-3xl">
        Fique por dentro das novidades e últimos lançamentos da BrinquedoKIDS. 
        Aqui você encontra os brinquedos mais recentes para todas as idades.
      </p>
    </div>
  );
};

export default ReleasesHeader;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LocationMap = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Localização</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-[4/3] bg-muted rounded-md overflow-hidden">
          {/* Placeholder for map image */}
          <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
            <p>Mapa da Localização</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationMap;

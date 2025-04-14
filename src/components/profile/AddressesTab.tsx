
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, Building, Edit, Trash2 } from 'lucide-react';

// Mock data for addresses
const mockAddresses = [
  { id: 1, type: 'Casa', isPrimary: true, street: 'Rua Exemplo', number: '123', neighborhood: 'Bairro', city: 'Cidade', state: 'Estado', zipcode: '00000-000' },
  { id: 2, type: 'Trabalho', isPrimary: false, street: 'Avenida Comercial', number: '456', neighborhood: 'Centro', city: 'Cidade', state: 'Estado', zipcode: '00000-000' },
];

const AddressesTab = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Meus Endereços</CardTitle>
          <CardDescription>Gerencie seus endereços de entrega</CardDescription>
        </div>
        <Button>
          <MapPin className="mr-2 h-4 w-4" />
          Novo Endereço
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockAddresses.map(address => (
          <Card key={address.id} className="overflow-hidden">
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-2 mb-3">
                {address.type === 'Casa' ? (
                  <Home className="h-5 w-5 text-primary" />
                ) : (
                  <Building className="h-5 w-5 text-primary" />
                )}
                <h3 className="font-bold text-lg">{address.type}</h3>
                {address.isPrimary && (
                  <Badge className="ml-2 bg-primary">Principal</Badge>
                )}
              </div>
              
              <p className="text-muted-foreground">
                {address.street}, {address.number}, {address.neighborhood}, {address.city} - {address.state}, {address.zipcode}
              </p>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" /> 
                  Editar
                </Button>
                {!address.isPrimary && (
                  <>
                    <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4 mr-1" /> 
                      Remover
                    </Button>
                    <Button variant="outline" size="sm">
                      Definir como Principal
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default AddressesTab;

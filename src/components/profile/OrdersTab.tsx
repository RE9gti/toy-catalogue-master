
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Clock } from 'lucide-react';

// Mock data for orders
const mockOrders = [
  { id: '#ORD-123456', date: '15/05/2023', status: 'Entregue', total: 'R$ 149,90', products: 2, tracking: 'BR12345678', estimatedDelivery: '12/05/2023' },
  { id: '#ORD-123455', date: '02/04/2023', status: 'Em trânsito', total: 'R$ 89,90', products: 1, tracking: 'BR87654321', estimatedDelivery: '10/04/2023' },
  { id: '#ORD-123454', date: '18/03/2023', status: 'Processando', total: 'R$ 209,50', products: 3, tracking: 'Em processamento', estimatedDelivery: '25/03/2023' },
];

const OrdersTab = () => {
  // Get order status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Entregue':
        return <Badge className="bg-green-500">Entregue</Badge>;
      case 'Em trânsito':
        return <Badge className="bg-blue-500">Em trânsito</Badge>;
      case 'Processando':
        return <Badge className="bg-yellow-500">Processando</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meus Pedidos</CardTitle>
        <CardDescription>Histórico de todos os seus pedidos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockOrders.map(order => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30 py-3">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{order.id}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">Data: {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{order.total}</p>
                    <p className="text-sm text-muted-foreground">{order.products} item(ns)</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Rastreio:</span> 
                      <span>{order.tracking}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Entrega estimada:</span>
                      <span>{order.estimatedDelivery}</span>
                    </div>
                  </div>
                  <Button>Ver detalhes</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline">Ver Todos os Pedidos</Button>
      </CardFooter>
    </Card>
  );
};

export default OrdersTab;

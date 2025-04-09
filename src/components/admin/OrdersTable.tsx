
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Printer, FileText, ArrowUpDown } from 'lucide-react';
import { Order } from '@/hooks/useOrdersTable';

interface OrdersTableProps {
  orders: Order[];
  sortField: keyof Order;
  sortDirection: 'asc' | 'desc';
  handleSort: (field: keyof Order) => void;
  formatDate: (dateString: string) => string;
  formatCurrency: (value: number) => string;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  sortField,
  sortDirection,
  handleSort,
  formatDate,
  formatCurrency
}) => {
  // Renderização de badges de status
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge className="bg-blue-500">Processando</Badge>;
      case 'shipped':
        return <Badge className="bg-amber-500">Enviado</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Concluído</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhum pedido encontrado.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('id')}
              >
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('customer')}
              >
                Cliente
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('date')}
              >
                Data
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('total')}
              >
                Total
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('items')}
              >
                Itens
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{formatDate(order.date)}</TableCell>
              <TableCell>{renderStatusBadge(order.status)}</TableCell>
              <TableCell>{formatCurrency(order.total)}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => console.log('Ver detalhes')}>
                      <Eye className="mr-2 h-4 w-4" />
                      Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Imprimir nota')}>
                      <Printer className="mr-2 h-4 w-4" />
                      Imprimir
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Gerar nota fiscal')}>
                      <FileText className="mr-2 h-4 w-4" />
                      Nota Fiscal
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

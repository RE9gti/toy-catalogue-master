
import React from 'react';
import { Customer } from '@/types/user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowUpDown, MoreHorizontal, User, Package, Mail } from 'lucide-react';

interface CustomersTableProps {
  customers: Customer[];
  sortField: keyof Customer;
  sortDirection: 'asc' | 'desc';
  handleSort: (field: keyof Customer) => void;
  formatDate: (dateString: string) => string;
}

export const CustomersTable: React.FC<CustomersTableProps> = ({
  customers,
  sortField,
  sortDirection,
  handleSort,
  formatDate
}) => {
  if (customers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhum cliente encontrado.</p>
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
                onClick={() => handleSort('name')}
              >
                Nome
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('email')}
              >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('createdAt')}
              >
                Data de Cadastro
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Pedidos</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map(customer => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{formatDate(customer.createdAt)}</TableCell>
              <TableCell>
                <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                  {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                </Badge>
              </TableCell>
              <TableCell>0</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => console.log('Ver detalhes')}>
                      <User className="mr-2 h-4 w-4" />
                      Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Ver pedidos')}>
                      <Package className="mr-2 h-4 w-4" />
                      Pedidos
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Enviar email')}>
                      <Mail className="mr-2 h-4 w-4" />
                      Enviar Email
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


import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TablePagination } from '@/components/admin/TablePagination';
import { Search } from 'lucide-react';
import { OrdersTable } from '@/components/admin/OrdersTable';
import { useOrdersTable } from '@/hooks/useOrdersTable';

// Mock orders data
const orders = [
  {
    id: 'ORD-001',
    customer: 'João Silva',
    date: '2025-03-20T10:30:00',
    status: 'completed',
    total: 129.9,
    items: 2
  },
  {
    id: 'ORD-002',
    customer: 'Maria Oliveira',
    date: '2025-03-19T14:15:00',
    status: 'processing',
    total: 79.5,
    items: 1
  },
  {
    id: 'ORD-003',
    customer: 'Pedro Santos',
    date: '2025-03-18T09:45:00',
    status: 'shipped',
    total: 239.8,
    items: 3
  },
  {
    id: 'ORD-004',
    customer: 'Ana Souza',
    date: '2025-03-17T16:20:00',
    status: 'cancelled',
    total: 59.9,
    items: 1
  },
  {
    id: 'ORD-005',
    customer: 'Carlos Ferreira',
    date: '2025-03-16T11:10:00',
    status: 'processing',
    total: 189.7,
    items: 2
  }
];

const OrdersList = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortField,
    sortDirection,
    handleSort,
    paginatedOrders,
    totalPages,
    currentPage,
    setCurrentPage,
    formatDate,
    formatCurrency
  } = useOrdersTable(orders, { initialSortField: 'date', initialSortDirection: 'desc' });

  return (
    <AdminLayout title="Gerenciar Pedidos">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pedidos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="processing">Processando</SelectItem>
              <SelectItem value="shipped">Enviado</SelectItem>
              <SelectItem value="completed">Concluído</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos</CardTitle>
          <CardDescription>Gerencie os pedidos da sua loja.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrdersTable
            orders={paginatedOrders}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
            formatDate={formatDate}
            formatCurrency={formatCurrency}
          />
          
          <TablePagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default OrdersList;


import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TablePagination } from '@/components/admin/TablePagination';
import { CustomersTable } from '@/components/admin/CustomersTable';
import { useCustomersTable } from '@/hooks/useCustomersTable';
import { Search } from 'lucide-react';
import { customers } from '@/data/mockData';

const CustomersList = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortField,
    sortDirection,
    handleSort,
    paginatedCustomers,
    totalPages,
    currentPage,
    setCurrentPage,
    formatDate
  } = useCustomersTable(customers, { initialSortField: 'name', initialSortDirection: 'asc' });

  return (
    <AdminLayout title="Gerenciar Clientes">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
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
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>Gerencie os clientes cadastrados na loja.</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomersTable 
            customers={paginatedCustomers} 
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
            formatDate={formatDate}
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

export default CustomersList;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Package, Users, ShoppingBag, BarChart, Tag, Settings, Truck, Eye, Edit, Trash2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { customers, orders } from '@/data/mockData';
import { useState } from 'react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [customerFilter, setCustomerFilter] = useState('');
  const [orderFilter, setOrderFilter] = useState('');

  // Redirecionar se não for administrador
  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  // Filtragem de clientes
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(customerFilter.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerFilter.toLowerCase())
  );

  // Filtragem de pedidos
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(orderFilter.toLowerCase()) ||
    order.status.toLowerCase().includes(orderFilter.toLowerCase())
  );

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Função para formatar valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para traduzir status do pedido
  const translateOrderStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'processing': 'Em processamento',
      'shipped': 'Enviado',
      'delivered': 'Entregue',
      'canceled': 'Cancelado',
      'pending': 'Pendente'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <Package className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-xl mb-1">150</CardTitle>
            <CardDescription>Produtos cadastrados</CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-xl mb-1">28</CardTitle>
            <CardDescription>Pedidos em processamento</CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <Users className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-xl mb-1">540</CardTitle>
            <CardDescription>Clientes cadastrados</CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <BarChart className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-xl mb-1">R$ 15.230,00</CardTitle>
            <CardDescription>Faturamento mensal</CardDescription>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="produtos">
        <TabsList className="mb-8 w-full border-b">
          <TabsTrigger value="produtos" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span>Produtos</span>
          </TabsTrigger>
          <TabsTrigger value="categorias" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span>Categorias</span>
          </TabsTrigger>
          <TabsTrigger value="pedidos" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span>Pedidos</span>
          </TabsTrigger>
          <TabsTrigger value="clientes" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Clientes</span>
          </TabsTrigger>
          <TabsTrigger value="entregas" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span>Entregas</span>
          </TabsTrigger>
          <TabsTrigger value="configuracoes" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Configurações</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="produtos">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Gerenciamento de Produtos</h2>
            <Button onClick={() => navigate('/admin/produtos/novo')}>
              Adicionar Produto
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Lista de Produtos</CardTitle>
              <CardDescription>Gerencie todos os produtos do catálogo</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aqui você verá a listagem de produtos quando implementada.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categorias">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Gerenciamento de Categorias</h2>
            <Button onClick={() => navigate('/admin/categorias/nova')}>
              Adicionar Categoria
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Categorias e Subcategorias</CardTitle>
              <CardDescription>Organize seu catálogo</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aqui você verá a listagem de categorias quando implementada.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pedidos">
          <h2 className="text-2xl font-semibold mb-6">Gerenciamento de Pedidos</h2>
          <Card>
            <CardHeader className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <CardTitle>Lista de Pedidos</CardTitle>
                <CardDescription>Acompanhe e gerencie todos os pedidos</CardDescription>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar pedidos..."
                  className="pl-8"
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => {
                      const customer = customers.find(c => c.id === order.customerId);
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>{customer?.name || 'Cliente não encontrado'}</TableCell>
                          <TableCell>{formatDate(order.createdAt)}</TableCell>
                          <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'shipped' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {translateOrderStatus(order.status)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="icon" title="Ver detalhes">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" title="Editar pedido">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        Nenhum pedido encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {filteredOrders.length > 0 && (
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clientes">
          <h2 className="text-2xl font-semibold mb-6">Gerenciamento de Clientes</h2>
          <Card>
            <CardHeader className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <CardTitle>Lista de Clientes</CardTitle>
                <CardDescription>Visualize e gerencie os dados dos clientes</CardDescription>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar clientes..."
                  className="pl-8"
                  value={customerFilter}
                  onChange={(e) => setCustomerFilter(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Data de Cadastro</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{formatDate(customer.createdAt)}</TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" title="Ver perfil">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" title="Editar cliente">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" title="Excluir cliente">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        Nenhum cliente encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {filteredCustomers.length > 0 && (
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="entregas">
          <h2 className="text-2xl font-semibold mb-6">Gerenciamento de Entregas</h2>
          <Card>
            <CardHeader>
              <CardTitle>Status de Entregas</CardTitle>
              <CardDescription>Acompanhe e gerencie as entregas dos pedidos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aqui você verá as informações de entregas quando implementadas.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="configuracoes">
          <h2 className="text-2xl font-semibold mb-6">Configurações do Sistema</h2>
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>Ajuste as configurações da loja</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aqui você poderá ajustar as configurações quando implementadas.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

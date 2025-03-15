
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Package, Users, ShoppingBag, BarChart, Tag, Settings, Truck, Eye, Edit, 
  Trash2, Search, Home, LogOut, PlusCircle, Boxes, Filter, 
  AlertTriangle, CheckCircle2, XCircle, Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

import { customers, orders } from '@/data/mockData';

// Mocking category data
const mockCategories = [
  { id: "cat-1", name: "Brinquedos Educativos", count: 45, status: "active" },
  { id: "cat-2", name: "Brinquedos de Montar", count: 32, status: "active" },
  { id: "cat-3", name: "Jogos de Tabuleiro", count: 28, status: "active" },
  { id: "cat-4", name: "Pelúcias", count: 24, status: "active" },
  { id: "cat-5", name: "Quebra-Cabeças", count: 19, status: "inactive" },
  { id: "cat-6", name: "Brinquedos para Bebês", count: 36, status: "active" },
  { id: "cat-7", name: "Brinquedos ao Ar Livre", count: 17, status: "active" },
  { id: "cat-8", name: "Artigos para Festas", count: 22, status: "inactive" },
];

// Mocking delivery data
const mockDeliveries = [
  { id: "del-1", orderId: "ord-2", customer: "Ana Silva", address: "Rua das Flores, 123", status: "pending", estimatedDelivery: "2023-11-25", carrier: "Correios" },
  { id: "del-2", orderId: "ord-1", customer: "João Oliveira", address: "Av. Paulista, 1500", status: "shipped", estimatedDelivery: "2023-11-23", carrier: "SEDEX" },
  { id: "del-3", orderId: "ord-3", customer: "Marina Souza", address: "Rua Augusta, 789", status: "delivered", estimatedDelivery: "2023-11-20", carrier: "Transportadora XYZ" },
  { id: "del-4", orderId: "ord-5", customer: "Pedro Santos", address: "Av. Brasil, 567", status: "returned", estimatedDelivery: "2023-11-18", carrier: "Correios" },
  { id: "del-5", orderId: "ord-4", customer: "Camila Lima", address: "Rua Bela Vista, 456", status: "shipped", estimatedDelivery: "2023-11-24", carrier: "SEDEX" },
];

// Mocking store settings
const mockSettings = {
  general: {
    storeName: "Brinquedos Divertidos",
    storeEmail: "contato@brinquedosdivertidos.com.br",
    storePhone: "(11) 3456-7890",
    address: "Av. Paulista, 1234, São Paulo - SP",
    logo: "https://via.placeholder.com/150",
  },
  payments: {
    acceptCreditCards: true,
    acceptDebitCards: true,
    acceptBoleto: true,
    acceptPix: true,
    installmentsLimit: 6,
  },
  shipping: {
    carriers: ["Correios", "SEDEX", "Transportadora XYZ"],
    freeShippingMinimum: 150,
    deliveryTimeEstimate: "3-7 dias úteis",
  },
  notifications: {
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    orderCanceled: true,
    abandonedCart: true,
    promotions: true,
  }
};

const AdminSidebar = () => {
  const navigate = useNavigate();
  
  return (
    <Sidebar>
      <SidebarHeader className="px-3 py-2">
        <div className="flex items-center gap-2">
          <img 
            src="https://php2.re9suainternet.com.br/img/logo.png" 
            alt="Logo" 
            className="h-8"
          />
          <h2 className="font-semibold text-xl">Admin</h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate('/admin')} tooltip="Dashboard">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate('/admin/produtos')} tooltip="Produtos">
                  <Package className="h-4 w-4" />
                  <span>Produtos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Categorias">
                  <Tag className="h-4 w-4" />
                  <span>Categorias</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Pedidos">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Pedidos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Clientes">
                  <Users className="h-4 w-4" />
                  <span>Clientes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Entregas">
                  <Truck className="h-4 w-4" />
                  <span>Entregas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Configurações">
                  <Settings className="h-4 w-4" />
                  <span>Configurações</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-3">
        <Button variant="outline" size="sm" className="w-full flex items-center gap-2" onClick={() => navigate('/')}>
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [customerFilter, setCustomerFilter] = useState('');
  const [orderFilter, setOrderFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState('');
  const [deleteItemType, setDeleteItemType] = useState<'customer' | 'category' | 'order' | 'delivery'>('customer');

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
  
  // Filtragem de categorias
  const filteredCategories = mockCategories.filter(category =>
    category.name.toLowerCase().includes(categoryFilter.toLowerCase())
  );
  
  // Filtragem de entregas
  const filteredDeliveries = mockDeliveries.filter(delivery =>
    delivery.customer.toLowerCase().includes(deliveryFilter.toLowerCase()) ||
    delivery.status.toLowerCase().includes(deliveryFilter.toLowerCase()) ||
    delivery.orderId.toLowerCase().includes(deliveryFilter.toLowerCase())
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
  
  // Função para traduzir status da entrega
  const translateDeliveryStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'Aguardando',
      'shipped': 'Em trânsito',
      'delivered': 'Entregue',
      'returned': 'Devolvido'
    };
    return statusMap[status] || status;
  };
  
  // Função para obter a cor do status da entrega
  const getDeliveryStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'returned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Função para obter a cor do status do pedido
  const getOrderStatusColor = (status: string) => {
    switch(status) {
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Função para confirmar exclusão
  const confirmDelete = () => {
    toast({
      title: 'Item excluído',
      description: `O item foi excluído com sucesso.`,
    });
    setShowDeleteDialog(false);
  };

  // Função para preparar exclusão
  const prepareDelete = (id: string, type: 'customer' | 'category' | 'order' | 'delivery') => {
    setDeleteItemId(id);
    setDeleteItemType(type);
    setShowDeleteDialog(true);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        
        <div className="flex-1 overflow-auto">
          <div className="container py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <Package className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl mb-1">150</CardTitle>
                  <CardDescription>Produtos cadastrados</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <ShoppingBag className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl mb-1">28</CardTitle>
                  <CardDescription>Pedidos em processamento</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-50 to-green-100">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl mb-1">540</CardTitle>
                  <CardDescription>Clientes cadastrados</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-amber-50 to-amber-100">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <BarChart className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl mb-1">R$ 15.230,00</CardTitle>
                  <CardDescription>Faturamento mensal</CardDescription>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Estatísticas de Vendas</CardTitle>
                <CardDescription>Visão geral do desempenho da loja</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="text-sm font-medium">Taxa de Conversão</div>
                      <div className="text-sm text-muted-foreground">4.3%</div>
                    </div>
                    <Progress value={43} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="text-sm font-medium">Valor Médio do Pedido</div>
                      <div className="text-sm text-muted-foreground">R$ 189,50</div>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="text-sm font-medium">Taxa de Abandono</div>
                      <div className="text-sm text-muted-foreground">23%</div>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="produtos" className="space-y-6">
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
                  <Button onClick={() => navigate('/admin/produtos/novo')} className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Adicionar Produto
                  </Button>
                </div>
                
                <Card>
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-2 lg:space-y-0">
                      <div>
                        <CardTitle>Lista de Produtos</CardTitle>
                        <CardDescription>Gerencie todos os produtos do catálogo</CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          Filtrar
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Exportar
                        </Button>
                        <Button variant="default" size="sm" onClick={() => navigate('/admin/produtos')} className="flex items-center gap-2">
                          <Boxes className="h-4 w-4" />
                          Ver todos
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Estoque</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium flex items-center gap-2">
                              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                                <img 
                                  src="https://php2.re9suainternet.com.br/img/product-1.jpg" 
                                  alt="Produto" 
                                  className="max-h-8 max-w-8 object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
                                  }} 
                                />
                              </div>
                              <span>Boneco Articulado</span>
                            </TableCell>
                            <TableCell>{formatCurrency(89.90)}</TableCell>
                            <TableCell>35</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                                Ativo
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" title="Ver produto">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  title="Editar produto"
                                  onClick={() => navigate('/admin/produtos/editar/prod-1')}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  title="Excluir produto"
                                  onClick={() => prepareDelete('prod-1', 'category')}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          
                          <TableRow>
                            <TableCell className="font-medium flex items-center gap-2">
                              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                                <img 
                                  src="https://php2.re9suainternet.com.br/img/product-2.jpg" 
                                  alt="Produto" 
                                  className="max-h-8 max-w-8 object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
                                  }} 
                                />
                              </div>
                              <span>Quebra-cabeça Infantil</span>
                            </TableCell>
                            <TableCell>{formatCurrency(45.90)}</TableCell>
                            <TableCell>12</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                                Ativo
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" title="Ver produto">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Editar produto">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Excluir produto">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          
                          <TableRow>
                            <TableCell className="font-medium flex items-center gap-2">
                              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                                <img 
                                  src="https://php2.re9suainternet.com.br/img/product-3.jpg" 
                                  alt="Produto" 
                                  className="max-h-8 max-w-8 object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
                                  }} 
                                />
                              </div>
                              <span>Jogo de Tabuleiro</span>
                            </TableCell>
                            <TableCell>{formatCurrency(129.90)}</TableCell>
                            <TableCell>8</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                Baixo Estoque
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" title="Ver produto">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Editar produto">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Excluir produto">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="categorias">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Gerenciamento de Categorias</h2>
                  <Button className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Adicionar Categoria
                  </Button>
                </div>
                
                <Card>
                  <CardHeader className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                      <CardTitle>Categorias e Subcategorias</CardTitle>
                      <CardDescription>Organize seu catálogo</CardDescription>
                    </div>
                    <div className="relative w-full md:w-72">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar categorias..."
                        className="pl-8"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Produtos</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                              <TableRow key={category.id}>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell>{category.count}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={
                                    category.status === 'active' 
                                      ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                      : 'bg-red-100 text-red-800 hover:bg-red-100'
                                  }>
                                    {category.status === 'active' ? 'Ativo' : 'Inativo'}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <Button variant="ghost" size="icon" title="Ver categoria">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Editar categoria">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      title="Excluir categoria"
                                      onClick={() => prepareDelete(category.id, 'category')}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                                Nenhuma categoria encontrada.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    
                    {filteredCategories.length > 0 && (
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
                            <PaginationNext href="#" />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
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
                    <div className="flex gap-2">
                      <div className="relative w-full md:w-72">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar pedidos..."
                          className="pl-8"
                          value={orderFilter}
                          onChange={(e) => setOrderFilter(e.target.value)}
                        />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filtrar por status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os status</SelectItem>
                          <SelectItem value="processing">Em processamento</SelectItem>
                          <SelectItem value="shipped">Enviado</SelectItem>
                          <SelectItem value="delivered">Entregue</SelectItem>
                          <SelectItem value="canceled">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
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
                                      getOrderStatusColor(order.status)
                                    }`}>
                                      {translateOrderStatus(order.status)}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4"
                                          >
                                            <circle cx="12" cy="12" r="1" />
                                            <circle cx="12" cy="5" r="1" />
                                            <circle cx="12" cy="19" r="1" />
                                          </svg>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Eye className="mr-2 h-4 w-4" />
                                          <span>Ver detalhes</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Edit className="mr-2 h-4 w-4" />
                                          <span>Atualizar status</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          <span>Cancelar pedido</span>
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
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
                    </div>
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
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Visão Geral dos Clientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex flex-col items-center">
                            <div className="mb-2 rounded-full bg-green-100 p-3">
                              <Users className="h-6 w-6 text-green-700" />
                            </div>
                            <h3 className="text-xl font-bold">540</h3>
                            <p className="text-sm text-muted-foreground">Clientes cadastrados</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex flex-col items-center">
                            <div className="mb-2 rounded-full bg-blue-100 p-3">
                              <CheckCircle2 className="h-6 w-6 text-blue-700" />
                            </div>
                            <h3 className="text-xl font-bold">78%</h3>
                            <p className="text-sm text-muted-foreground">Taxa de retorno</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex flex-col items-center">
                            <div className="mb-2 rounded-full bg-amber-100 p-3">
                              <AlertTriangle className="h-6 w-6 text-amber-700" />
                            </div>
                            <h3 className="text-xl font-bold">12</h3>
                            <p className="text-sm text-muted-foreground">Clientes inativos</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                
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
                    <div className="rounded-md border overflow-hidden">
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
                                    <Button variant="ghost" size="icon" title="Ver perfil">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Editar cliente">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      title="Excluir cliente"
                                      onClick={() => prepareDelete(customer.id, 'customer')}
                                    >
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
                    </div>
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
                  <CardHeader className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                      <CardTitle>Status de Entregas</CardTitle>
                      <CardDescription>Acompanhe e gerencie as entregas dos pedidos</CardDescription>
                    </div>
                    <div className="relative w-full md:w-72">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar entregas..."
                        className="pl-8"
                        value={deliveryFilter}
                        onChange={(e) => setDeliveryFilter(e.target.value)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID Pedido</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Endereço</TableHead>
                            <TableHead>Transportadora</TableHead>
                            <TableHead>Entrega Prevista</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredDeliveries.length > 0 ? (
                            filteredDeliveries.map((delivery) => (
                              <TableRow key={delivery.id}>
                                <TableCell className="font-medium">#{delivery.orderId}</TableCell>
                                <TableCell>{delivery.customer}</TableCell>
                                <TableCell>{delivery.address}</TableCell>
                                <TableCell>{delivery.carrier}</TableCell>
                                <TableCell>{new Date(delivery.estimatedDelivery).toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell>
                                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    getDeliveryStatusColor(delivery.status)
                                  }`}>
                                    {translateDeliveryStatus(delivery.status)}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" title="Ver detalhes">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Atualizar status">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      title="Cancelar entrega"
                                      onClick={() => prepareDelete(delivery.id, 'delivery')}
                                    >
                                      <XCircle className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                                Nenhuma entrega encontrada.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    {filteredDeliveries.length > 0 && (
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
                            <PaginationNext href="#" />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="configuracoes">
                <h2 className="text-2xl font-semibold mb-6">Configurações do Sistema</h2>
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informações Gerais</CardTitle>
                      <CardDescription>Configurações básicas da loja</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Nome da Loja</label>
                            <Input defaultValue={mockSettings.general.storeName} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Email de Contato</label>
                            <Input defaultValue={mockSettings.general.storeEmail} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Telefone</label>
                            <Input defaultValue={mockSettings.general.storePhone} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Endereço</label>
                            <Input defaultValue={mockSettings.general.address} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Logo da Loja</label>
                          <div className="flex items-center gap-4">
                            <div className="border rounded-md p-2 h-16 w-16 flex items-center justify-center bg-gray-50">
                              <img 
                                src="https://php2.re9suainternet.com.br/img/logo.png" 
                                alt="Logo" 
                                className="max-h-12 max-w-12 object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                                }} 
                              />
                            </div>
                            <Button variant="outline" size="sm">Alterar Logo</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Configurações de Pagamento</CardTitle>
                      <CardDescription>Opções de pagamento aceitas pela loja</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="creditCards" defaultChecked={mockSettings.payments.acceptCreditCards} />
                            <label htmlFor="creditCards">Cartões de Crédito</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="debitCards" defaultChecked={mockSettings.payments.acceptDebitCards} />
                            <label htmlFor="debitCards">Cartões de Débito</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="boleto" defaultChecked={mockSettings.payments.acceptBoleto} />
                            <label htmlFor="boleto">Boleto Bancário</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="pix" defaultChecked={mockSettings.payments.acceptPix} />
                            <label htmlFor="pix">PIX</label>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Limite de Parcelas</label>
                          <Select defaultValue={mockSettings.payments.installmentsLimit.toString()}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o limite de parcelas" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1x (sem parcelamento)</SelectItem>
                              <SelectItem value="3">Até 3x</SelectItem>
                              <SelectItem value="6">Até 6x</SelectItem>
                              <SelectItem value="12">Até 12x</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Configurações de Envio</CardTitle>
                      <CardDescription>Opções de envio e entrega</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Transportadoras</label>
                          <div className="flex flex-wrap gap-2">
                            {mockSettings.shipping.carriers.map((carrier, index) => (
                              <Badge key={index} variant="outline" className="flex items-center gap-1">
                                {carrier}
                                <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0">
                                  <XCircle className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                            <Button variant="outline" size="sm">Adicionar</Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Valor Mínimo para Frete Grátis (R$)</label>
                          <Input defaultValue={mockSettings.shipping.freeShippingMinimum.toString()} />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Estimativa de Entrega Padrão</label>
                          <Input defaultValue={mockSettings.shipping.deliveryTimeEstimate} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button>Salvar Alterações</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar exclusão</DialogTitle>
                  <DialogDescription>
                    Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Você está prestes a excluir o item com ID: <strong>{deleteItemId}</strong>
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancelar</Button>
                  <Button variant="destructive" onClick={confirmDelete}>Excluir</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;

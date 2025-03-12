
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Package, Users, ShoppingBag, BarChart, Tag, Settings, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  // Redirecionar se não for administrador
  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

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
            <CardHeader>
              <CardTitle>Lista de Pedidos</CardTitle>
              <CardDescription>Acompanhe e gerencie todos os pedidos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aqui você verá a listagem de pedidos quando implementada.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clientes">
          <h2 className="text-2xl font-semibold mb-6">Gerenciamento de Clientes</h2>
          <Card>
            <CardHeader>
              <CardTitle>Lista de Clientes</CardTitle>
              <CardDescription>Visualize e gerencie os dados dos clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aqui você verá a listagem de clientes quando implementada.
              </p>
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

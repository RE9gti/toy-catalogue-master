
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Package, 
  CreditCard, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut, 
  MapPin, 
  Bell, 
  Star, 
  Home,
  Building,
  Edit,
  Trash2,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Layout from '@/components/layout/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const ProfilePage = () => {
  const { user, logout, updateProfile, lastActive } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold">Você precisa estar logado para acessar esta página</h1>
          <Button className="mt-4" onClick={() => window.location.href = '/login'}>
            Fazer Login
          </Button>
        </div>
      </Layout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileData);
    setIsEditing(false);
  };

  // Mock data for orders
  const mockOrders = [
    { id: '#ORD-123456', date: '15/05/2023', status: 'Entregue', total: 'R$ 149,90', products: 2, tracking: 'BR12345678', estimatedDelivery: '12/05/2023' },
    { id: '#ORD-123455', date: '02/04/2023', status: 'Em trânsito', total: 'R$ 89,90', products: 1, tracking: 'BR87654321', estimatedDelivery: '10/04/2023' },
    { id: '#ORD-123454', date: '18/03/2023', status: 'Processando', total: 'R$ 209,50', products: 3, tracking: 'Em processamento', estimatedDelivery: '25/03/2023' },
  ];

  // Mock data for favorite products
  const mockFavorites = [
    { id: 1, name: 'Boneco Articulado Herói', price: 'R$ 99,90', image: '/images/products/hot-wheels.jpg' },
    { id: 2, name: 'Kit de Blocos de Construção', price: 'R$ 129,90', image: '/images/products/lego-minecraft.jpg' },
    { id: 3, name: 'Quebra-Cabeça Educativo', price: 'R$ 59,90', image: '/images/products/luigi-mansion.jpg' },
  ];

  // Mock data for addresses
  const mockAddresses = [
    { id: 1, type: 'Casa', isPrimary: true, street: 'Rua Exemplo', number: '123', neighborhood: 'Bairro', city: 'Cidade', state: 'Estado', zipcode: '00000-000' },
    { id: 2, type: 'Trabalho', isPrimary: false, street: 'Avenida Comercial', number: '456', neighborhood: 'Centro', city: 'Cidade', state: 'Estado', zipcode: '00000-000' },
  ];

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
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                    <AvatarFallback>
                      <User className="h-12 w-12 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cliente desde {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                    {lastActive && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Último acesso: {formatDistanceToNow(lastActive, { addSuffix: true, locale: ptBR })}
                      </p>
                    )}
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair da conta
                  </Button>
                </div>
                
                <div className="mt-8 space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Menu do Cliente</h3>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Meus Dados
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Meus Pedidos
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="mr-2 h-4 w-4" />
                    Favoritos
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MapPin className="mr-2 h-4 w-4" />
                    Endereços
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pagamentos
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="mr-2 h-4 w-4" />
                    Notificações
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
          
          {/* Main Content */}
          <main className="lg:w-3/4 space-y-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
                <TabsTrigger value="orders">Pedidos</TabsTrigger>
                <TabsTrigger value="favorites">Favoritos</TabsTrigger>
                <TabsTrigger value="addresses">Endereços</TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Meus Dados</CardTitle>
                        <CardDescription>Gerencie suas informações pessoais</CardDescription>
                      </div>
                      {!isEditing && (
                        <Button onClick={() => setIsEditing(true)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Nome Completo</label>
                            <Input 
                              name="name"
                              value={profileData.name}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              placeholder="Seu nome completo"
                              className="border-2 focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">E-mail</label>
                            <Input 
                              name="email"
                              value={profileData.email}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              placeholder="seu-email@exemplo.com"
                              className="border-2 focus:border-primary"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Telefone</label>
                            <Input 
                              name="phone"
                              value={profileData.phone}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              placeholder="(00) 00000-0000"
                              className="border-2 focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">CPF</label>
                            <Input 
                              disabled 
                              value="000.000.000-00" 
                              placeholder="CPF" 
                              className="bg-gray-50"
                            />
                            <p className="text-xs text-muted-foreground">O CPF não pode ser alterado.</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Endereço Principal</label>
                          <Textarea 
                            name="address"
                            value={profileData.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Seu endereço completo"
                            className="border-2 focus:border-primary"
                          />
                        </div>
                      </div>
                      
                      {isEditing && (
                        <div className="flex justify-end gap-2 mt-6">
                          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                            Cancelar
                          </Button>
                          <Button type="submit">
                            Salvar Alterações
                          </Button>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Orders Tab */}
              <TabsContent value="orders">
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
              </TabsContent>
              
              {/* Favorites Tab */}
              <TabsContent value="favorites">
                <Card>
                  <CardHeader>
                    <CardTitle>Meus Favoritos</CardTitle>
                    <CardDescription>Lista de produtos que você marcou como favorito</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {mockFavorites.map(product => (
                        <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <div className="aspect-square overflow-hidden bg-muted/20">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              fallbackSrc="/placeholder.svg"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="pt-4">
                            <h3 className="font-medium line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                            <div className="flex justify-between items-center mt-2">
                              <p className="font-bold text-primary">{product.price}</p>
                              <div className="flex gap-1">
                                <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                                <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                                <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                                <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                                <Star className="h-4 w-4 text-gray-300" />
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button className="w-full">Ver Produto</Button>
                              <Button variant="outline" className="w-full">Adicionar ao Carrinho</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Addresses Tab */}
              <TabsContent value="addresses">
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
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

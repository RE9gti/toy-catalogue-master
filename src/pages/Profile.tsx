
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileDataTab from '@/components/profile/ProfileDataTab';
import OrdersTab from '@/components/profile/OrdersTab';
import FavoritesTab from '@/components/profile/FavoritesTab';
import AddressesTab from '@/components/profile/AddressesTab';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  const { user } = useAuth();

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

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <ProfileSidebar />
          
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
                <ProfileDataTab />
              </TabsContent>
              
              {/* Orders Tab */}
              <TabsContent value="orders">
                <OrdersTab />
              </TabsContent>
              
              {/* Favorites Tab */}
              <TabsContent value="favorites">
                <FavoritesTab />
              </TabsContent>
              
              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <AddressesTab />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

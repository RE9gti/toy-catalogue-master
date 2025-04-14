
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';

const ProfileSidebar = () => {
  const { user, logout, lastActive } = useAuth();

  return (
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
  );
};

export default ProfileSidebar;

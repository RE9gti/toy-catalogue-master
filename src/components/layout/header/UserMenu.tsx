
import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/context/AuthContext';

const UserMenu = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <Link to="/login" className="p-1 hover:text-primary transition-colors">
        <User size={20} />
      </Link>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 hover:text-primary transition-colors">
          <User size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="font-medium">
          Olá, {user?.name}
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem>
            <Link to="/admin/dashboard" className="w-full">
              Painel Admin
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link to="/perfil" className="w-full">
            Meu Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/pedidos" className="w-full">
            Meus Pedidos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <LogOut size={16} className="mr-2" /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;

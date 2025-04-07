
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Heart, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface ActionIconsProps {
  toggleMenu: () => void;
}

const ActionIcons = ({ toggleMenu }: ActionIconsProps) => {
  const { items } = useCart();
  
  return (
    <div className="flex items-center space-x-2">
      {/* Busca */}
      <Button variant="ghost" size="icon" className="rounded-full">
        <Search size={18} />
      </Button>
      
      {/* Lista de desejos */}
      <Link to="/lista-desejos">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Heart size={18} />
        </Button>
      </Link>

      {/* Carrinho de compras */}
      <Link to="/carrinho">
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <ShoppingCart size={18} />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </Link>

      {/* Menu mobile */}
      <Button 
        className="md:hidden" 
        variant="ghost" 
        size="icon"
        onClick={toggleMenu}
      >
        <Menu size={18} />
      </Button>
    </div>
  );
};

export default ActionIcons;

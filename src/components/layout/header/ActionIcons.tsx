
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Heart, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ActionIconsProps {
  toggleMenu: () => void;
}

const ActionIcons = ({ toggleMenu }: ActionIconsProps) => {
  const { items } = useCart();
  
  return (
    <div className="flex items-center space-x-4">
      {/* Busca */}
      <button className="p-1 hover:text-primary transition-colors">
        <Search size={20} />
      </button>
      
      {/* Lista de desejos */}
      <Link to="/lista-desejos" className="p-1 hover:text-primary transition-colors">
        <Heart size={20} />
      </Link>

      {/* Carrinho de compras */}
      <Link to="/carrinho" className="p-1 hover:text-primary transition-colors relative">
        <ShoppingCart size={20} />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </Link>

      {/* Menu mobile */}
      <button 
        className="md:hidden p-1 hover:text-primary transition-colors" 
        onClick={toggleMenu}
      >
        <Menu size={20} />
      </button>
    </div>
  );
};

export default ActionIcons;

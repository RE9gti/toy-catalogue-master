
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  if (!isOpen) return null;
  
  return (
    <nav className="md:hidden py-4 mt-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-border">
      <Link to="/catalogo" className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors">
        <span className="font-medium">Catálogo</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>
      
      <Separator />
      
      <Link to="/categorias" className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors">
        <span className="font-medium">Categorias</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>
      
      <Separator />
      
      <Link to="/lancamentos" className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors">
        <span className="font-medium">Lançamentos</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>
      
      <Separator />
      
      <Link to="/promocoes" className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors">
        <span className="font-medium">Promoções</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>
      
      <Separator />
      
      <Link to="/contato" className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors">
        <span className="font-medium">Contato</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>
    </nav>
  );
};

export default MobileMenu;

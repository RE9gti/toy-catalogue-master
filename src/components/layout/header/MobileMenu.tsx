
import React from 'react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  if (!isOpen) return null;
  
  return (
    <nav className="md:hidden py-4 space-y-3 border-t mt-3">
      <Link to="/catalogo" className="block hover:text-primary transition-colors">
        Catálogo
      </Link>
      <Link to="/categorias" className="block hover:text-primary transition-colors">
        Categorias
      </Link>
      <Link to="/lancamentos" className="block hover:text-primary transition-colors">
        Lançamentos
      </Link>
      <Link to="/promocoes" className="block hover:text-primary transition-colors">
        Promoções
      </Link>
      <Link to="/contato" className="block hover:text-primary transition-colors">
        Contato
      </Link>
    </nav>
  );
};

export default MobileMenu;

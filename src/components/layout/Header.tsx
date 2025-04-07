
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Logo, 
  DesktopNav, 
  MobileMenu, 
  UserMenu, 
  ActionIcons 
} from './header';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo />

          {/* Menu de navegação (Desktop) */}
          <DesktopNav />

          {/* Área direita - ícones de ação e menu usuário */}
          <div className="flex items-center space-x-4">
            <ActionIcons toggleMenu={toggleMenu} />
            <UserMenu />
          </div>
        </div>

        {/* Menu mobile */}
        <MobileMenu isOpen={isMenuOpen} />
      </div>
    </header>
  );
};

export default Header;

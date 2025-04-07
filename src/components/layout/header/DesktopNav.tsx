
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const DesktopNav = () => {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/catalogo" className="px-3 py-2 hover:text-primary transition-colors">
            Catálogo
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="px-3 py-2 hover:text-primary transition-colors bg-transparent">
            Categorias
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white p-4 rounded-md shadow-md min-w-[600px]">
            <div className="grid grid-cols-2 gap-3 p-4">
              <Link 
                to="/categorias" 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ChevronDown className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Todas as Categorias</div>
                  <div className="text-sm text-muted-foreground">Explore todas nossas opções</div>
                </div>
              </Link>
              <Link 
                to="/lancamentos" 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ChevronDown className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Lançamentos</div>
                  <div className="text-sm text-muted-foreground">Novidades da semana</div>
                </div>
              </Link>
              <Link 
                to="/promocoes" 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ChevronDown className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Promoções</div>
                  <div className="text-sm text-muted-foreground">Descontos especiais</div>
                </div>
              </Link>
              <Link 
                to="/contato" 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ChevronDown className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Contato</div>
                  <div className="text-sm text-muted-foreground">Fale conosco</div>
                </div>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/lancamentos" className="px-3 py-2 hover:text-primary transition-colors">
            Lançamentos
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/promocoes" className="px-3 py-2 hover:text-primary transition-colors">
            Promoções
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/contato" className="px-3 py-2 hover:text-primary transition-colors">
            Contato
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNav;

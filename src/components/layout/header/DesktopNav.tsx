
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const DesktopNav = () => {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="space-x-1">
        <NavigationMenuItem>
          <Link to="/catalogo" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary/10 transition-colors">
            Catálogo
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary/10 transition-colors bg-transparent">
            Categorias
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white p-4 rounded-lg shadow-lg min-w-[600px] border border-border">
            <div className="grid grid-cols-2 gap-4 p-4">
              <Link 
                to="/categorias" 
                className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <ChevronDown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Todas as Categorias</div>
                  <div className="text-sm text-muted-foreground">Explore todas nossas opções</div>
                </div>
              </Link>
              <Link 
                to="/lancamentos" 
                className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <ChevronDown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Lançamentos</div>
                  <div className="text-sm text-muted-foreground">Novidades da semana</div>
                </div>
              </Link>
              <Link 
                to="/promocoes" 
                className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <ChevronDown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Promoções</div>
                  <div className="text-sm text-muted-foreground">Descontos especiais</div>
                </div>
              </Link>
              <Link 
                to="/contato" 
                className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <ChevronDown className="h-5 w-5 text-primary" />
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
          <Link to="/lancamentos" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary/10 transition-colors">
            Lançamentos
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/promocoes" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary/10 transition-colors">
            Promoções
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/contato" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary/10 transition-colors">
            Contato
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNav;

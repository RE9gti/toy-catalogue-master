
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const pathMap: Record<string, string> = {
  'catalog': 'Catálogo',
  'categories': 'Categorias',
  'new-releases': 'Lançamentos',
  'promotions': 'Promoções',
  'contact': 'Contato',
  'profile': 'Perfil',
  'cart': 'Carrinho',
  'cadastro': 'Cadastro',
  'login': 'Login'
};

const SiteNavigation = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div className="container mx-auto px-4 py-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1 text-primary hover:underline">
                <Home size={16} />
                <span>Início</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {pathnames.map((value, index) => {
            const isLast = index === pathnames.length - 1;
            const displayName = pathMap[value] || value;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            return (
              <React.Fragment key={to}>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-3 w-3" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{displayName}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={to} className="text-primary hover:underline">
                        {displayName}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default SiteNavigation;

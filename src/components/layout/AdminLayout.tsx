
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Tag, 
  ShoppingBag, 
  Settings, 
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title = "Painel Administrativo" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Produtos", path: "/admin/produtos" },
    { icon: Users, label: "Clientes", path: "/admin/clientes" },
    { icon: ShoppingBag, label: "Pedidos", path: "/admin/pedidos" },
    { icon: Tag, label: "Categorias", path: "/admin/categorias" },
    { icon: Settings, label: "Configurações", path: "/admin/configuracoes" },
  ];

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-white shadow-md transition-all flex flex-col", 
          sidebarCollapsed ? "w-[80px]" : "w-[250px]"
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          {!sidebarCollapsed && <h2 className="font-bold text-lg text-primary">Toy Store</h2>}
          <Button variant="ghost" size="sm" onClick={toggleSidebar}>
            {sidebarCollapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        <nav className="flex-grow py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start rounded-none px-4 py-2",
                    location.pathname === item.path ? "bg-gray-100 text-primary font-medium" : ""
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon size={18} className={cn("mr-2", sidebarCollapsed ? "mr-0" : "mr-2")} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut size={18} className={cn("mr-2", sidebarCollapsed ? "mr-0" : "mr-2")} />
            {!sidebarCollapsed && <span>Sair</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Package, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for charts
const salesData = [
  { name: 'Jan', total: 1200 },
  { name: 'Fev', total: 1900 },
  { name: 'Mar', total: 1800 },
  { name: 'Abr', total: 2500 },
  { name: 'Mai', total: 2300 },
  { name: 'Jun', total: 2800 },
  { name: 'Jul', total: 3200 },
  { name: 'Ago', total: 3800 },
  { name: 'Set', total: 3500 },
  { name: 'Out', total: 3900 },
  { name: 'Nov', total: 4200 },
  { name: 'Dez', total: 5000 },
];

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const Dashboard = () => {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Vendas Hoje */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Vendas Hoje</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(1234.56)}</div>
            <div className="flex items-center pt-1 text-sm text-green-500">
              <ArrowUp className="mr-1 h-4 w-4" />
              <span>+12.5%</span>
              <span className="text-gray-500 ml-1">em relação a ontem</span>
            </div>
          </CardContent>
        </Card>

        {/* Novos Clientes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Novos Clientes</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+24</div>
            <div className="flex items-center pt-1 text-sm text-green-500">
              <ArrowUp className="mr-1 h-4 w-4" />
              <span>+8.2%</span>
              <span className="text-gray-500 ml-1">em relação a ontem</span>
            </div>
          </CardContent>
        </Card>

        {/* Pedidos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pedidos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center pt-1 text-sm text-red-500">
              <ArrowDown className="mr-1 h-4 w-4" />
              <span>-3.1%</span>
              <span className="text-gray-500 ml-1">em relação a ontem</span>
            </div>
          </CardContent>
        </Card>

        {/* Produtos Vendidos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Produtos Vendidos</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76</div>
            <div className="flex items-center pt-1 text-sm text-green-500">
              <ArrowUp className="mr-1 h-4 w-4" />
              <span>+5.8%</span>
              <span className="text-gray-500 ml-1">em relação a ontem</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Vendas */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Vendas Mensais</CardTitle>
          <CardDescription>Visualização de vendas nos últimos 12 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `R$${value}`}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(Number(value)), "Vendas"]}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {/* Produtos Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos Recentes</CardTitle>
            <CardDescription>Últimos produtos adicionados ao catálogo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="font-medium">Brinquedo Exemplo {i}</div>
                    <div className="text-sm text-gray-500">Adicionado há 2 dias</div>
                  </div>
                  <div className="font-medium">{formatCurrency(49.90 * i)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pedidos Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>Últimos pedidos realizados na loja</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center">
                    #{1000 + i}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Cliente Exemplo {i}</div>
                    <div className="text-sm text-gray-500">3 produtos • {i} hora(s) atrás</div>
                  </div>
                  <div className="font-medium">{formatCurrency(149.90 * i)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

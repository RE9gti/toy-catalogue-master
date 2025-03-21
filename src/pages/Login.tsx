
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { QuickLoginButtons } from '@/components/auth/QuickLoginButtons';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  // Verificar se o usuário já está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      // Redirecionar para área de admin se for admin, senão para perfil
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/perfil');
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  const handleLoginSuccess = () => {
    // O redirecionamento será feito pelo useEffect acima
  };
  
  const adminCredentials = {
    email: 'admin@brinquedos.com',
    password: 'admin123'
  };
  
  const customerCredentials = {
    email: 'cliente@exemplo.com',
    password: 'senha123'
  };
  
  const handleSelectCredentials = (credentials: typeof adminCredentials) => {
    setFormData(credentials);
  };
  
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-center">Acesso à Conta</CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm 
            onSuccess={handleLoginSuccess} 
            initialData={formData}
          />
          
          <QuickLoginButtons
            adminCredentials={adminCredentials}
            customerCredentials={customerCredentials}
            onSelectCredentials={handleSelectCredentials}
          />
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <div className="text-sm text-center">
            Não tem uma conta?{" "}
            <Button 
              variant="link" 
              className="p-0 h-auto font-medium" 
              onClick={() => navigate('/cadastro')}
            >
              Cadastre-se
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;

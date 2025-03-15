
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Customer } from '@/types';
import { users, customers } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  updateProfile: (userData: Partial<User>) => void;
  register: (userData: Omit<User, 'id' | 'role' | 'status'>) => Promise<boolean>;
  isLoading: boolean;
  lastActive: Date | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastActive, setLastActive] = useState<Date | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Verificar se existe usuário no localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const sessionUser = sessionStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
    
    setIsLoading(false);
  }, []);
  
  // Atualizar timestamp de última atividade
  useEffect(() => {
    if (user) {
      const now = new Date();
      setLastActive(now);
      
      // Atualizar a cada minuto enquanto estiver ativo
      const interval = setInterval(() => {
        setLastActive(new Date());
      }, 60000);
      
      return () => clearInterval(interval);
    }
  }, [user]);

  const login = (email: string, password: string, rememberMe: boolean = false): boolean => {
    setIsLoading(true);
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      
      // Armazenar no localStorage ou sessionStorage dependendo da opção "lembrar-me"
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(foundUser));
        sessionStorage.removeItem('user');
      } else {
        sessionStorage.setItem('user', JSON.stringify(foundUser));
        localStorage.removeItem('user');
      }
      
      setLastActive(new Date());
      
      // Redirecionar baseado no tipo de usuário
      setTimeout(() => {
        if (foundUser.role === 'admin') {
          console.log("Redirecionando para área de admin");
          navigate('/admin');
        } else {
          navigate('/perfil');
          toast({
            title: "Bem-vindo de volta!",
            description: `Olá, ${foundUser.name}! Bom te ver novamente.`,
          });
        }
        setIsLoading(false);
      }, 100);
      
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setLastActive(null);
    navigate('/login');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };
  
  const register = async (userData: Omit<User, 'id' | 'role' | 'status'>): Promise<boolean> => {
    // Verificar se email já existe
    const emailExists = users.some(u => u.email === userData.email);
    
    if (emailExists) {
      toast({
        title: "Erro no cadastro",
        description: "Este e-mail já está sendo utilizado.",
        variant: "destructive",
      });
      return false;
    }
    
    // Em um ambiente real, isso seria uma chamada à API
    // Aqui apenas simulamos o cadastro
    const newUser: User = {
      id: `${users.length + 1}`,
      ...userData,
      role: 'customer',
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    // Adicionar à lista de usuários (simulação)
    users.push(newUser);
    
    // Criar também um cliente associado
    const newCustomer: Customer = {
      id: `${customers.length + 1}`,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone || '',
      birthDate: new Date().toISOString(),
      addresses: [],
      preferences: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    };
    
    // Adicionar à lista de clientes (simulação)
    customers.push(newCustomer);
    
    toast({
      title: "Cadastro realizado com sucesso",
      description: "Sua conta foi criada. Você já pode fazer login.",
    });
    
    return true;
  };
  
  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Atualizar no storage apropriado
      if (localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else if (sessionStorage.getItem('user')) {
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = !!user && user.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated, 
      isAdmin, 
      updateProfile,
      register,
      isLoading,
      lastActive
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, User, KeyRound, LogIn } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { FormInputWithIcon } from './FormInputWithIcon';

type LoginFormProps = {
  onSuccess: () => void;
  initialData?: {
    email: string;
    password: string;
  };
};

export const LoginForm = ({ onSuccess, initialData }: LoginFormProps) => {
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: initialData?.email || '',
    password: initialData?.password || '',
  });
  
  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        email: initialData.email,
        password: initialData.password,
      });
    }
  }, [initialData]);
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de delay de rede
    setTimeout(() => {
      const success = login(formData.email, formData.password, rememberMe);
      
      if (success) {
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta à nossa loja!",
        });
        
        onSuccess();
      } else {
        toast({
          title: "Falha no login",
          description: "E-mail ou senha incorretos. Tente novamente.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInputWithIcon
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="seu-email@exemplo.com"
        label="E-mail"
        icon={<User size={18} />}
        required
      />
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium block">
            Senha
          </label>
          <a href="#" className="text-xs text-primary hover:underline">
            Esqueceu a senha?
          </a>
        </div>
        <div className="relative">
          <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember-me" 
          checked={rememberMe} 
          onCheckedChange={(checked) => setRememberMe(checked === true)}
        />
        <label
          htmlFor="remember-me"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Lembrar meus dados
        </label>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Entrando...
          </div>
        ) : (
          <>
            <LogIn className="mr-2" size={18} />
            Entrar
          </>
        )}
      </Button>
    </form>
  );
};

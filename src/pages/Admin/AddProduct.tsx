
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { Product } from '@/types';
import ProductForm from '@/components/admin/ProductForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Função para adicionar produto ao banco de dados MySQL
const addProduct = async (product: Partial<Product>): Promise<Product> => {
  try {
    console.log("Enviando produto para API:", product);
    
    // Simulação da API - Em produção, isto conectaria ao MySQL
    // Com as credenciais: usuário: re9, senha: rg51gti66
    const mockResponse = {
      ...product,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    // Simular resposta bem-sucedida (remover em produção)
    return mockResponse as Product;
    
    /* Código real para produção:
    const response = await fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...product,
        createdAt: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar produto ao banco de dados');
    }

    return await response.json();
    */
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    throw error;
  }
};

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast({
        title: 'Produto adicionado com sucesso',
        description: 'O produto foi cadastrado no sistema',
      });
      navigate('/admin/produtos');
    },
    onError: (error) => {
      toast({
        title: 'Erro ao adicionar produto',
        description: `Ocorreu um erro: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (productData: Partial<Product>) => {
    setIsSubmitting(true);
    
    // Garantir que a imageUrl está definida
    const finalData = {
      ...productData,
      imageUrl: productData.imageUrl || ''
    };
    
    mutation.mutate(finalData);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/admin')}
          className="mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Adicionar Novo Produto</h1>
      </div>
      
      <ProductForm 
        onSubmit={handleSubmit}
        isLoading={isSubmitting || mutation.isPending}
      />
    </div>
  );
};

export default AddProductPage;

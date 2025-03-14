
import React from 'react';
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
    // Em um ambiente real, esta seria uma chamada para um endpoint de API
    // que se conectaria ao MySQL usando as credenciais fornecidas
    const response = await fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...product,
        // Incluir dados para MySQL
        createdAt: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar produto ao banco de dados');
    }

    const data = await response.json();
    console.log('Produto adicionado:', data);
    
    return data;
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    throw error;
  }
};

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  
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
    mutation.mutate(productData);
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
        isLoading={mutation.isPending}
      />
    </div>
  );
};

export default AddProductPage;

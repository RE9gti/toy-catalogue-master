
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { Product } from '@/types';
import ProductForm from '@/components/admin/ProductForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Função para buscar produto do banco de dados MySQL
const fetchProduct = async (id: string): Promise<Product | null> => {
  try {
    // Em um ambiente real, esta seria uma chamada para um endpoint de API
    // que se conectaria ao MySQL usando as credenciais fornecidas
    const response = await fetch(`/api/produtos/${id}`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar produto');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return null;
  }
};

// Função para atualizar produto no banco de dados MySQL
const updateProduct = async (product: Partial<Product>): Promise<Product> => {
  try {
    const response = await fetch(`/api/produtos/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...product,
        updatedAt: new Date().toISOString()
      }),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao atualizar produto');
    }
    
    const data = await response.json();
    console.log('Produto atualizado:', data);
    
    return data as Product;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
};

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id || ''),
    onSettled: (data) => {
      if (!data) setNotFound(true);
    }
  });
  
  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast({
        title: 'Produto atualizado com sucesso',
        description: 'As alterações foram salvas',
      });
      navigate('/admin/produtos');
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar produto',
        description: `Ocorreu um erro: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (productData: Partial<Product>) => {
    if (product) {
      const updatedProduct = {
        ...product,
        ...productData,
      };
      mutation.mutate(updatedProduct);
    }
  };

  // Redirecionar se o produto não foi encontrado
  useEffect(() => {
    if (notFound) {
      toast({
        title: 'Produto não encontrado',
        description: 'O produto solicitado não existe',
        variant: 'destructive',
      });
      navigate('/admin/produtos');
    }
  }, [notFound, navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/admin/produtos')}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-10 w-64" />
        </div>
        
        <div className="space-y-8">
          <Skeleton className="h-[800px] w-full" />
        </div>
      </div>
    );
  }
  
  if (!product) return null;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/admin/produtos')}
          className="mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Editar Produto</h1>
      </div>
      
      <ProductForm 
        product={product}
        onSubmit={handleSubmit}
        isLoading={mutation.isPending}
      />
    </div>
  );
};

export default EditProductPage;

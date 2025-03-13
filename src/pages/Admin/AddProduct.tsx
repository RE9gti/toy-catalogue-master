
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { Product } from '@/types';
import ProductForm from '@/components/admin/ProductForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Mock de função para simular a adição de um produto
const addProduct = async (product: Partial<Product>): Promise<Product> => {
  // Simulação de delay de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Criar um ID único
  const newProduct = {
    ...product,
    id: `prod_${Date.now()}`,
    image: product.imageUrl, // Garantir que image e imageUrl sejam iguais
  } as Product;
  
  console.log('Produto adicionado:', newProduct);
  
  // Em um app real, aqui faríamos uma requisição para adicionar ao banco de dados
  return newProduct;
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

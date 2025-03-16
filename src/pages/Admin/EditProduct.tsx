
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/types';
import { products } from '@/data/mockData';
import ProductForm from '@/components/admin/ProductForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Simulação de fetch de produto
const fetchProduct = async (id: string): Promise<Product> => {
  // Em um ambiente real, isso seria uma chamada à API
  const product = products.find(p => p.id === id);
  
  if (!product) {
    throw new Error('Produto não encontrado');
  }
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(product), 500);
  });
};

// Simulação de atualização de produto
const updateProduct = async (product: Product): Promise<Product> => {
  // Em um ambiente real, isso seria uma chamada à API
  console.log('Atualizando produto:', product);
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(product), 500);
  });
};

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Estado para controlar o formulário
  const [formData, setFormData] = useState<Partial<Product>>({});
  
  // Buscar dados do produto
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id || ''),
    enabled: !!id
  });
  
  // Após buscar os dados, atualizar o estado do formulário
  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);
  
  // Mutation para atualizar o produto
  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      // Invalidar queries para recarregar os dados
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      toast({
        title: 'Produto atualizado',
        description: `O produto ${data.name} foi atualizado com sucesso.`,
      });
      
      // Redirecionar para a lista de produtos
      navigate('/admin/produtos');
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar',
        description: `Ocorreu um erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        variant: 'destructive',
      });
    }
  });
  
  const handleSubmit = (productData: Partial<Product>) => {
    if (!id) return;
    
    const updatedProduct = {
      ...product,
      ...productData,
      id: id
    } as Product;
    
    mutation.mutate(updatedProduct);
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/admin/produtos')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">Editar Produto</h1>
        </div>
        
        <Button 
          onClick={() => handleSubmit(formData)} 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>Salvando...</>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </>
          )}
        </Button>
      </div>
      
      {isLoading && <div className="text-center py-8">Carregando produto...</div>}
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">
            {error instanceof Error ? error.message : 'Erro ao carregar produto'}
          </p>
        </div>
      )}
      
      {product && (
        <ProductForm 
          product={product} 
          onSubmit={handleSubmit} 
          isLoading={mutation.isPending}
        />
      )}
    </div>
  );
};

export default EditProductPage;

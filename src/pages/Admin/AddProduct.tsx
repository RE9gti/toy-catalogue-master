
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { Product } from '@/types';
import ProductForm from '@/components/admin/ProductForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Função para adicionar produto ao banco de dados MySQL
const addProduct = async (product: Partial<Product>): Promise<Product> => {
  try {
    console.log("Enviando produto para API:", product);
    
    // Verificar se a imagem está em formato base64
    const isBase64Image = product.imageUrl?.startsWith('data:image');
    console.log("Imagem em formato base64:", isBase64Image);
    
    // Verificar sku para evitar duplicações (na produção, isto seria feito pelo backend)
    const isDuplicate = false; // Simulação - em produção, verificaria no banco de dados
    
    if (isDuplicate) {
      throw new Error('Produto com SKU já existente');
    }
    
    // Garantir que os campos de imagem são processados corretamente
    const productData = {
      ...product,
      // Garantir que exista uma URL de imagem válida 
      imageUrl: product.imageUrl || '',
      // Se estiver usando data URL para a imagem, você pode gerenciar isso aqui
      createdAt: new Date().toISOString()
    };
    
    // Simulação da API - Em produção, isto conectaria ao MySQL
    // Com as credenciais: usuário: re9, senha: rg51gti66
    const mockResponse = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    
    // Simulamos um pequeno atraso para simular uma chamada de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simular resposta bem-sucedida (remover em produção)
    return mockResponse as Product;
    
    /* Código real para produção:
    const response = await fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
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

// Função para verificar se um SKU já existe
const checkSkuExists = async (sku: string): Promise<boolean> => {
  // Simulação - em produção, faria uma requisição ao backend
  console.log("Verificando se SKU existe:", sku);
  
  // Simulamos um pequeno atraso
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Retornamos falso por enquanto
  return false;
};

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSkuChecking, setIsSkuChecking] = useState(false);
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      // Invalidar queries para forçar nova busca de dados
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      toast({
        title: 'Produto adicionado com sucesso',
        description: `O produto ${newProduct.name} foi cadastrado no sistema com o ID ${newProduct.id}`,
      });
      navigate('/admin/produtos');
    },
    onError: (error) => {
      toast({
        title: 'Erro ao adicionar produto',
        description: `Ocorreu um erro: ${error.message}`,
        variant: 'destructive',
      });
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (productData: Partial<Product>) => {
    setIsSubmitting(true);
    
    // Verificar se o SKU já existe
    if (productData.sku) {
      setIsSkuChecking(true);
      try {
        const skuExists = await checkSkuExists(productData.sku);
        if (skuExists) {
          toast({
            title: 'SKU duplicado',
            description: 'Já existe um produto com este SKU no sistema',
            variant: 'destructive',
          });
          setIsSubmitting(false);
          setIsSkuChecking(false);
          return;
        }
        setIsSkuChecking(false);
      } catch (error) {
        console.error("Erro ao verificar SKU:", error);
        setIsSkuChecking(false);
      }
    }
    
    // Verificar se temos uma imagem válida
    if (!productData.imageUrl) {
      console.log("Produto enviado sem imagem");
      toast({
        title: 'Atenção',
        description: 'Produto está sendo cadastrado sem imagem',
      });
    } else {
      // Limitar o log para evitar output muito grande
      const previewUrl = productData.imageUrl.substring(0, 50) + 
        (productData.imageUrl.length > 50 ? "..." : "");
      console.log("Produto enviado com imagem:", previewUrl);
    }
    
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
        isLoading={isSubmitting || mutation.isPending || isSkuChecking}
      />
    </div>
  );
};

export default AddProductPage;

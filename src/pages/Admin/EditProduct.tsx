
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { Product } from '@/types';
import ProductForm from '@/components/admin/ProductForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const fetchProduct = async (id: string): Promise<Product | null> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockProduct: Product = {
      id: id,
      name: "Produto de Teste",
      description: "Descrição do produto de teste",
      price: 99.99,
      categoryId: "cat-1",
      image: "",
      imageUrl: "https://via.placeholder.com/300",
      stock: 10,
      sku: "SKU-TEST-123",
      manufacturer: "Fabricante Teste",
      supplier: "Fornecedor Teste",
      dimensions: {
        height: 10,
        width: 20,
        depth: 5
      },
      recommendedAge: "3-5 anos",
      recommendedGender: "Unisex",
      material: "Plástico",
      safety: {
        certifications: ["CE", "INMETRO"],
        warnings: ["Peças pequenas"]
      },
      tags: ["educativo", "divertido"],
      barcode: "789012345678",
      weight: 0.5,
      status: "active"
    };
    console.log("Produto recuperado:", mockProduct);
    return mockProduct;
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return null;
  }
};

const updateProduct = async (product: Partial<Product>): Promise<Product> => {
  try {
    console.log("Enviando atualização de produto:", product);
    const productData = {
      ...product,
      imageUrl: product.imageUrl || '',
      updatedAt: new Date().toISOString()
    };
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockResponse = {
      ...productData,
      updatedAt: new Date().toISOString()
    };
    console.log("Produto atualizado:", mockResponse);
    return mockResponse as Product;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
};

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id || ''),
    onSettled: (data) => {
      if (!data) setNotFound(true);
    },
    onError: () => {
      setNotFound(true);
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
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (productData: Partial<Product>) => {
    setIsSubmitting(true);
    
    if (!productData.imageUrl) {
      console.log("Produto enviado sem imagem");
    } else {
      console.log("Produto enviado com imagem:", 
        productData.imageUrl.substring(0, 50) + 
        (productData.imageUrl.length > 50 ? "..." : "")
      );
    }
    
    if (product) {
      const updatedProduct = {
        ...product,
        ...productData,
      };
      mutation.mutate(updatedProduct);
    }
  };

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
        isLoading={isSubmitting || mutation.isPending}
      />
    </div>
  );
};

export default EditProductPage;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ProductsTable } from '@/components/admin/ProductsTable';
import { TablePagination } from '@/components/admin/TablePagination';
import { Product } from '@/types';
import { ArrowLeft, Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock para simular produtos
const mockProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Quebra-cabeça Infantil',
    description: 'Quebra-cabeça de 48 peças com temas infantis',
    price: 29.90,
    categoryId: 'cat_1',
    image: '/placeholder.svg',
    imageUrl: '/placeholder.svg',
    stock: 25,
    sku: 'QCI-001',
    manufacturer: 'Brinquedos Educativos',
    supplier: 'Fornecedor ABC',
    dimensions: { height: 30, width: 20, depth: 5 },
    recommendedAge: '3-5 anos',
    recommendedGender: 'Unisex',
    material: 'Papelão e papel',
    safety: {
      certifications: ['INMETRO', 'CE'],
      warnings: ['Peças pequenas', 'Não recomendado para menores de 3 anos']
    },
    tags: ['Educativo', 'Quebra-cabeça', 'Infantil'],
    barcode: '7890123456789',
    weight: 0.3,
    status: 'active'
  },
  {
    id: 'prod_2',
    name: 'Boneca de Pano',
    description: 'Boneca de pano artesanal com roupas removíveis',
    price: 59.90,
    categoryId: 'cat_2',
    image: '/placeholder.svg',
    imageUrl: '/placeholder.svg',
    stock: 15,
    sku: 'BP-002',
    manufacturer: 'Artesanatos Maria',
    supplier: 'Fornecedor XYZ',
    dimensions: { height: 35, width: 15, depth: 10 },
    recommendedAge: '2+ anos',
    recommendedGender: 'Girls',
    material: 'Tecido, algodão',
    safety: {
      certifications: ['INMETRO'],
      warnings: ['Lavar à mão']
    },
    tags: ['Boneca', 'Tecido', 'Artesanal'],
    barcode: '7890123456790',
    weight: 0.2,
    status: 'active'
  },
  {
    id: 'prod_3',
    name: 'Carrinho de Controle Remoto',
    description: 'Carrinho de controle remoto com bateria recarregável',
    price: 149.90,
    categoryId: 'cat_3',
    image: '/placeholder.svg',
    imageUrl: '/placeholder.svg',
    stock: 8,
    sku: 'CCR-003',
    manufacturer: 'TechToys',
    supplier: 'Importadora FastToys',
    dimensions: { height: 10, width: 20, depth: 15 },
    recommendedAge: '6+ anos',
    recommendedGender: 'Boys',
    material: 'Plástico e metal',
    safety: {
      certifications: ['INMETRO', 'CE', 'FCC'],
      warnings: ['Bateria não substituível', 'Usar sob supervisão de um adulto']
    },
    tags: ['Eletrônico', 'Controle Remoto', 'Carro'],
    barcode: '7890123456791',
    weight: 0.5,
    status: 'inactive'
  }
];

// Mock para simular uma função que busca produtos
const fetchProducts = async (): Promise<Product[]> => {
  // Simulação de delay de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockProducts;
};

// Mock para simular a exclusão de um produto
const deleteProduct = async (id: string): Promise<void> => {
  // Simulação de delay de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`Produto ${id} excluído`);
};

const ProductsListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Prefixado como 10 itens por página
  
  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  return (
    <AdminLayout title="Produtos">
      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
          <CardDescription>Gerencie o catálogo de produtos da loja.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>Carregando produtos...</p>
            </div>
          ) : (
            <>
              <ProductsTable 
                products={products} 
                onDelete={deleteProduct} 
                refetch={refetch} 
              />
              
              <TablePagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default ProductsListPage;

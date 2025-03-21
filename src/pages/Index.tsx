
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Tag, Package, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Principal */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Bem-vindo à MuhlStore
            </h1>
            <p className="text-xl text-gray-700">
              Os melhores produtos de tecnologia com os melhores preços do mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/catalogo">
                  Ver Produtos <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/promocoes">
                  Ofertas Especiais <Tag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Produtos de tecnologia MuhlStore" 
              className="rounded-lg shadow-xl max-w-full md:max-w-md h-auto"
            />
          </div>
        </div>
      </section>

      {/* Categorias em Destaque */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossas Categorias</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoriasPrincipais.map((categoria) => (
              <Card key={categoria.id} className="glass-card overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src={categoria.imagem} 
                    alt={categoria.nome}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{categoria.nome}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{categoria.descricao}</p>
                  <Link 
                    to={`/categorias/${categoria.id}`}
                    className="text-primary hover:underline flex items-center text-sm font-medium"
                  >
                    Ver produtos <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Novidades */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Novidades</h2>
            <Link to="/lancamentos" className="text-primary hover:underline flex items-center">
              Ver todos <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-4 snap-x">
            {produtosNovidades.map((produto) => (
              <div 
                key={produto.id}
                className="snap-start shrink-0 w-[280px] glass-card"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome}
                    className="absolute inset-0 w-full h-full object-contain p-4"
                  />
                  {produto.lancamento && (
                    <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      Novo
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{produto.nome}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{produto.categoria}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">R$ {produto.preco.toFixed(2)}</span>
                    <Button variant="secondary" size="sm">
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques e Promoções */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 bg-gradient-to-r from-[#243949] to-[#517fa4] rounded-xl p-8 text-white">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mb-4">Ofertas Especiais</span>
                  <h2 className="text-3xl font-bold mb-4">Descontos de até 30% em produtos selecionados</h2>
                  <p className="mb-8">Aproveite nossas promoções por tempo limitado em produtos de alta tecnologia.</p>
                </div>
                <Button variant="default" size="lg" className="self-start bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/promocoes">
                    Ver Promoções <Tag className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-gradient-to-r from-[#ee9ca7] to-[#ffdde1] rounded-xl p-8">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <span className="inline-block bg-primary/20 px-3 py-1 rounded-full text-sm mb-4">Novidades</span>
                  <h2 className="text-3xl font-bold mb-4">Conheça os lançamentos mais recentes</h2>
                  <p className="mb-8">Fique por dentro das últimas novidades em tecnologia na MuhlStore.</p>
                </div>
                <Button variant="default" size="lg" className="self-start" asChild>
                  <Link to="/lancamentos">
                    Ver Lançamentos <Sparkles className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que escolher a MuhlStore */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher a MuhlStore?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-muted-foreground">Receba seus produtos em até 48 horas em todo o Brasil.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Produtos Originais</h3>
              <p className="text-muted-foreground">Garantimos a autenticidade de todos os produtos de nossa loja.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Tag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Melhor Preço</h3>
              <p className="text-muted-foreground">Oferecemos os melhores preços do mercado e diversas formas de pagamento.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Dados fictícios para exibição na página
const categoriasPrincipais = [
  {
    id: 1,
    nome: 'Notebooks',
    descricao: 'Computadores portáteis para todas as necessidades',
    imagem: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    nome: 'Smartphones',
    descricao: 'Aparelhos de última geração com as melhores tecnologias',
    imagem: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    nome: 'Acessórios',
    descricao: 'Complementos essenciais para seus dispositivos',
    imagem: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    nome: 'Componentes',
    descricao: 'Peças para montagem e upgrade de computadores',
    imagem: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
];

const produtosNovidades = [
  {
    id: 1,
    nome: 'Notebook UltraSlim Pro',
    categoria: 'Notebooks',
    preco: 4999.99,
    imagem: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    lancamento: true
  },
  {
    id: 2,
    nome: 'Smartphone Galaxy X20',
    categoria: 'Smartphones',
    preco: 2499.99,
    imagem: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    lancamento: true
  },
  {
    id: 3,
    nome: 'Fones de Ouvido WirelessPro',
    categoria: 'Acessórios',
    preco: 599.99,
    imagem: 'https://images.unsplash.com/photo-1600086827875-a63b01f1a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    lancamento: true
  },
  {
    id: 4,
    nome: 'Placa de Vídeo RTX 4080',
    categoria: 'Componentes',
    preco: 6999.99,
    imagem: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    lancamento: true
  },
  {
    id: 5,
    nome: 'Monitor Gaming 32"',
    categoria: 'Monitores',
    preco: 2299.99,
    imagem: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    lancamento: true
  }
];

export default Index;

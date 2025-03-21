import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Tag, Package, ChevronRight, Leaf, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { categories } from '@/data/mockData';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Principal com a nova imagem */}
      <section className="relative py-10">
        <div className="container mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="/lovable-uploads/6de0da6f-cf12-422f-950e-8806371eca81.png" 
              alt="MuhlStore - Brinquedos" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-10">
              <div className="max-w-3xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  Bem-vindo à MuhlStore
                </h1>
                <p className="text-xl mb-3 drop-shadow-md">
                  Vendas de brinquedos novos e semi-novos. Conceito de economia financeira e de recursos naturais.
                </p>
                <p className="text-lg italic mb-6 drop-shadow-md">
                  "Aqui os brinquedos não são objetos, eles carregam histórias e emoções."
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                    <Link to="/catalogo">
                      Ver Produtos <ShoppingBag className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20" asChild>
                    <Link to="/promocoes">
                      Brinquedos Semi-novos <RefreshCw className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informações de Contato */}
      <section className="bg-primary/90 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm md:text-base">
            <a href="https://instagram.com/muhlstore" className="flex items-center gap-2 hover:text-white/80">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              @muhlstore
            </a>
            <div className="h-4 border-l border-white/30 hidden md:block"></div>
            <a href="#" className="flex items-center gap-2 hover:text-white/80">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              (51) 99198-0989
            </a>
            <div className="h-4 border-l border-white/30 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              LIVE Facebook
            </div>
          </div>
        </div>
      </section>

      {/* Banner de Sustentabilidade */}
      <section className="py-10 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 shrink-0">
              <img 
                src="/lovable-uploads/401deb71-3b36-443b-a9d0-7d87f10049dc.png" 
                alt="Sustentabilidade e Brinquedos" 
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Sustentabilidade e Rotatividade</h2>
              <p className="text-gray-700 mb-4">
                Ao optar por brinquedos semi-novos, você contribui para um mundo sustentável, promovendo a reutilização e reduzindo o descarte de plástico e outros materiais.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <Leaf className="h-6 w-6 text-green-600 mr-2" />
                  <span>Menos resíduos no ambiente</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <RefreshCw className="h-6 w-6 text-green-600 mr-2" />
                  <span>Economia circular</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <ShoppingBag className="h-6 w-6 text-green-600 mr-2" />
                  <span>Economia financeira</span>
                </div>
              </div>
            </div>
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

      {/* Conceito da Loja */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-primary">Conceito de Economia Financeira</h3>
              <div className="flex items-start gap-4 mb-6">
                <img 
                  src="/lovable-uploads/0de45e0e-4f60-49de-8654-079e0123690d.png" 
                  alt="Economia Financeira" 
                  className="w-1/3 rounded-lg"
                />
                <div>
                  <p className="text-gray-700 mb-4">
                    Com o valor de 1 brinquedo novo, você pode comprar até 5 brinquedos semi-novos em excelente estado.
                  </p>
                  <p className="text-gray-700">
                    Proporcionamos economia para seu bolso sem comprometer a diversão das crianças.
                  </p>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link to="/conceito">
                  Saiba mais sobre nosso conceito
                </Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-primary">Brinquedos com História</h3>
              <div className="flex items-start gap-4 mb-6">
                <img 
                  src="/lovable-uploads/d18df752-5379-4858-ab85-d4c3facf152a.png" 
                  alt="Brinquedos de Coleção" 
                  className="w-1/3 rounded-lg"
                />
                <div>
                  <p className="text-gray-700 mb-4">
                    Nossos brinquedos não são simples objetos, eles carregam histórias, memórias e emoções.
                  </p>
                  <p className="text-gray-700">
                    Desde bonecas vintage até carrinhos de coleção, temos os brinquedos que marcaram gerações.
                  </p>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link to="/colecao">
                  Ver itens de coleção
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Novidades */}
      <section className="py-16 bg-white">
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
                  {produto.seminovo && (
                    <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                      Semi-novo
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

      {/* Personagens e Colecionáveis */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Personagens e Colecionáveis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/20">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <img 
                  src="/lovable-uploads/a89e856b-e973-493f-9b52-68173316ded4.png" 
                  alt="Hot Wheels" 
                  className="w-full md:w-1/2 rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold mb-2">Hot Wheels</h3>
                  <p className="text-white/80 mb-4">
                    Carrinhos de colecionador para todas as idades. Uma paixão que atravessa gerações!
                  </p>
                  <Button className="bg-white text-primary hover:bg-white/90" asChild>
                    <Link to="/colecao/hot-wheels">
                      Ver coleção
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/20">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <img 
                  src="/lovable-uploads/de71d392-554d-4021-b798-0405c28068a9.png" 
                  alt="Bonecas e Figuras de Ação" 
                  className="w-full md:w-1/2 rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold mb-2">Figuras de Ação</h3>
                  <p className="text-white/80 mb-4">
                    De Star Wars a super-heróis, encontre as figuras mais raras e desejadas.
                  </p>
                  <Button className="bg-white text-primary hover:bg-white/90" asChild>
                    <Link to="/colecao/figuras-acao">
                      Ver coleção
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promoções Especiais */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-primary">Promoções Especiais</h2>
              <p className="mb-6 text-gray-700">
                Na compra de qualquer brinquedo semi-novo, ganhe um desconto especial em sua próxima compra. Incentivamos a cultura da reutilização e valorização de brinquedos.
              </p>
              <Button variant="default" asChild>
                <Link to="/promocoes">
                  Ver Promoções <Tag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/d5d33528-29a3-49aa-b3ea-976568c6ccec.png" 
                alt="Bonecas Barbie" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Por que escolher a MuhlStore */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher a MuhlStore?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary/5 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-muted-foreground">Receba seus brinquedos em até 48 horas em todo o Brasil.</p>
            </div>
            
            <div className="bg-primary/5 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustentabilidade</h3>
              <p className="text-muted-foreground">Cada brinquedo reutilizado é um passo para um planeta mais limpo.</p>
            </div>
            
            <div className="bg-primary/5 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Tag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Melhor Preço</h3>
              <p className="text-muted-foreground">Preços acessíveis em brinquedos semi-novos de alta qualidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Final */}
      <section className="py-10 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <img 
              src="/lovable-uploads/a488f811-2acf-477c-9c69-7de695418aa5.png" 
              alt="Brinquedos MuhlStore" 
              className="w-full max-w-3xl rounded-lg shadow-lg mb-6"
            />
            <h2 className="text-2xl font-bold mb-4">MuhlStore Brinquedos</h2>
            <p className="text-gray-700 max-w-2xl mb-6">
              Sustentabilidade, economia e diversão em um só lugar. Visite nossa loja física ou compre online!
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <span className="text-gray-600">Siga-nos: </span>
              <a href="https://instagram.com/muhlstore" className="text-primary hover:underline">@muhlstore</a>
              <span className="text-gray-600">|</span>
              <span className="text-gray-600">WhatsApp: </span>
              <a href="tel:5199198-0989" className="text-primary hover:underline">(51) 99198-0989</a>
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
    nome: 'Brinquedos Novos',
    descricao: 'Lançamentos e produtos originais lacrados',
    imagem: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    nome: 'Brinquedos Semi-novos',
    descricao: 'Grande economia com qualidade garantida',
    imagem: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    nome: 'Colecionáveis',
    descricao: 'Itens raros e edições especiais',
    imagem: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    nome: 'Bonecas e Figuras',
    descricao: 'Personagens queridos de todas as épocas',
    imagem: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
];

const produtosNovidades = [
  {
    id: 1,
    nome: 'Boneca Vintage 1980',
    categoria: 'Colecionáveis',
    preco: 349.99,
    imagem: '/lovable-uploads/d5d33528-29a3-49aa-b3ea-976568c6ccec.png',
    seminovo: true
  },
  {
    id: 2,
    nome: 'Hot Wheels - Challenger',
    categoria: 'Carrinhos',
    preco: 29.99,
    imagem: '/lovable-uploads/a89e856b-e973-493f-9b52-68173316ded4.png',
    lancamento: true
  },
  {
    id: 3,
    nome: 'Stormtrooper - Star Wars',
    categoria: 'Figuras de Ação',
    preco: 199.99,
    imagem: '/lovable-uploads/de71d392-554d-4021-b798-0405c28068a9.png',
    seminovo: true
  },
  {
    id: 4,
    nome: 'Sustentabilidade Kids',
    categoria: 'Educativo',
    preco: 89.99,
    imagem: '/lovable-uploads/401deb71-3b36-443b-a9d0-7d87f10049dc.png',
    lancamento: true
  },
  {
    id: 5,
    nome: 'Kit Bonecas Irmãs',
    categoria: 'Bonecas',
    preco: 129.99,
    imagem: '/lovable-uploads/0de45e0e-4f60-49de-8654-079e0123690d.png',
    seminovo: true
  }
];

export default Index;

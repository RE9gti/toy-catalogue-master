
import { Product, Category, Order, Customer } from '../types';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Brinquedos Educativos',
    slug: 'brinquedos-educativos',
    description: 'Brinquedos que estimulam o aprendizado',
    image: '/images/categories/educativos.jpg'
  },
  {
    id: 2,
    name: 'Jogos de Tabuleiro',
    slug: 'jogos-de-tabuleiro',
    description: 'Jogos para toda a família',
    image: '/images/categories/tabuleiro.jpg'
  },
  {
    id: 3,
    name: 'Bonecas e Bonecos',
    slug: 'bonecas-e-bonecos',
    description: 'Diversos personagens e estilos',
    image: '/images/categories/bonecas.jpg'
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Kit de Blocos de Montar',
    description: 'Kit educativo com 100 peças coloridas',
    price: 129.90,
    categoryId: 1,
    image: '/images/products/blocos.jpg',
    stock: 50,
    sku: 'BLO-001',
    manufacturer: 'ToyEdu',
    dimensions: {
      height: 30,
      width: 40,
      depth: 10
    },
    recommendedAge: '3+',
    recommendedGender: 'Unissex',
    material: 'Plástico ABS',
    safety: ['Certificado INMETRO', 'Sem peças pequenas'],
    tags: ['educativo', 'montagem', 'criativo'],
    barcode: '789123456789',
    weight: 0.8,
    status: 'active'
  },
  {
    id: 2,
    name: 'Jogo da Memória Animais',
    description: 'Jogo da memória com temas de animais',
    price: 45.90,
    categoryId: 2,
    image: '/images/products/memoria.jpg',
    stock: 30,
    sku: 'JOG-001',
    manufacturer: 'GameKids',
    dimensions: {
      height: 20,
      width: 15,
      depth: 5
    },
    recommendedAge: '4+',
    recommendedGender: 'Unissex',
    material: 'Papel Cartão',
    safety: ['Certificado INMETRO'],
    tags: ['memória', 'educativo', 'animais'],
    barcode: '789123456790',
    weight: 0.3,
    status: 'active'
  },
  {
    id: 3,
    name: 'Boneca Laura',
    description: 'Boneca articulada com acessórios',
    price: 89.90,
    categoryId: 3,
    image: '/images/products/boneca.jpg',
    stock: 25,
    sku: 'BON-001',
    manufacturer: 'DollMaker',
    dimensions: {
      height: 35,
      width: 15,
      depth: 10
    },
    recommendedAge: '5+',
    recommendedGender: 'Unissex',
    material: 'Plástico e Tecido',
    safety: ['Certificado INMETRO', 'Tecidos antialérgicos'],
    tags: ['bonecas', 'brincar', 'articulada'],
    barcode: '789123456791',
    weight: 0.5,
    status: 'active'
  }
];

export const orders: Order[] = [
  {
    id: 1,
    customerId: 1,
    products: [
      { productId: 1, quantity: 2, price: 129.90 },
      { productId: 2, quantity: 1, price: 45.90 }
    ],
    status: 'processando',
    totalAmount: 305.70,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
    shippingAddress: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 101',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    paymentMethod: 'credit_card'
  }
];

export const customers: Customer[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@email.com',
    password: 'hashed_password',
    phone: '11999887766',
    birthDate: new Date('1990-01-01'),
    addresses: [
      {
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 101',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      }
    ],
    preferences: ['Educativos', 'Tabuleiro'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    status: 'active'
  }
];

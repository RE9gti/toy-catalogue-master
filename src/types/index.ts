
// Definição dos tipos para o catálogo de brinquedos

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  stock: number;
  sku: string;
  manufacturer: string;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  recommendedAge: string;
  recommendedGender: "Unisex" | "Boys" | "Girls";
  material: string;
  safety: {
    certifications: string[];
    warnings: string[];
  };
  tags: string[];
  barcode: string;
  weight: number;
  status: "active" | "inactive";
};

export type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

export type ShippingAddress = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type Order = {
  id: string;
  customerId: string;
  products: OrderItem[];
  status: "processing" | "shipped" | "delivered" | "canceled" | "returned" | "refunded";
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthDate: string;
  addresses: ShippingAddress[];
  preferences: string[];
  createdAt: string;
  updatedAt: string;
  status: "active" | "inactive";
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
  status: "active" | "inactive";
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
};


export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  subcategoryId?: string;
  stock: number;
  supplier: string;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  recommendedAge: string;
  recommendedGender: 'Unisex' | 'Boys' | 'Girls';
  material: string;
  safety: {
    certifications: string[];
    warnings: string[];
  };
  tags: string[];
  barcode: string;
  sku: string;
  weight: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone?: string;
  birthdate?: string;
  preferences?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'processing' | 'shipped' | 'delivered' | 'canceled' | 'returned' | 'refunded';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: 'credit_card' | 'pix' | 'bank_slip' | 'cash_on_delivery';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  adminResponse?: string;
  createdAt: string;
  updatedAt: string;
}

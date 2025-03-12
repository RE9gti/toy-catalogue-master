
// Definição dos tipos para o catálogo de brinquedos

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  imageUrl: string; // Adicionando imageUrl como alternativa
};

export type Subcategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  image?: string;
  imageUrl?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  subcategoryId?: string;
  image: string;
  imageUrl: string;
  stock: number;
  sku: string;
  manufacturer: string;
  supplier: string;
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

export type OrderStatus = "processing" | "shipped" | "delivered" | "canceled" | "returned" | "refunded";

export type Order = {
  id: string;
  customerId: string;
  products: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  couponCode?: string;
  discount?: number;
  trackingNumber?: string;
  deliveryEstimate?: string;
  notes?: string;
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
  loyaltyPoints?: number;
  subscriptionType?: "basic" | "premium" | "none";
  communicationPreferences?: {
    email: boolean;
    sms: boolean;
    newsletter: boolean;
  };
};

export type UserRole = "admin" | "customer" | "manager";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: "active" | "inactive";
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
  couponCode?: string;
  discount?: number;
};

export type Review = {
  id: string;
  productId: string;
  customerId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt?: string;
  status: "pending" | "approved" | "rejected";
  adminResponse?: string;
};

export type WishlistItem = {
  customerId: string;
  productId: string;
  addedAt: string;
};

export type PaymentMethod = {
  id: string;
  name: string;
  type: "credit_card" | "debit_card" | "pix" | "bank_slip" | "cash_on_delivery";
  active: boolean;
};

export type Supplier = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: ShippingAddress;
  status: "active" | "inactive";
  products: string[]; // IDs dos produtos
};

export type Promotion = {
  id: string;
  name: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  code?: string;
  startDate: string;
  endDate: string;
  applicableProducts: "all" | string[]; // "all" ou array de IDs de produtos
  applicableCategories: "all" | string[]; // "all" ou array de IDs de categorias
  minimumPurchase?: number;
  maxUses?: number;
  usesCount: number;
  exclusive: boolean; // Se é exclusivo para assinantes
  status: "active" | "inactive";
};

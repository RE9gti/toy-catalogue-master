
// Product-related type definitions
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

export type Supplier = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: import('./order').ShippingAddress;
  status: "active" | "inactive";
  products: string[]; // IDs dos produtos
};

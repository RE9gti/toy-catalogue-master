
// Database-related type definitions
export type MySQLConfig = {
  host: string;
  port?: number;
  user: string;
  password: string;
  database: string;
  ssl?: boolean;
};

export type DatabaseStatus = {
  isConnected: boolean;
  connectedAt: Date | null;
  error?: string;
};

export type BackupConfig = {
  includeTables?: string[];
  excludeTables?: string[];
  compressionLevel?: number;
  addTimestamp?: boolean;
};

export type ImportConfig = {
  replaceExisting?: boolean;
  skipErrors?: boolean;
};

export type ExportFormat = 'SQL' | 'CSV' | 'JSON';

export type ExportConfig = {
  format?: ExportFormat;
  tables: string[];
  includeStructure?: boolean;
  includeData?: boolean;
};

// Definições de tipos para tabelas principais
export type DBUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  phone?: string;
  birth_date?: string;
  status: 'active' | 'inactive' | 'blocked';
  created_at: string;
  updated_at: string;
};

export type DBCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
};

export type DBSubcategory = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  category_id: number;
  image?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
};

export type DBProduct = {
  id: number;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  subcategory_id?: number;
  image?: string;
  image_url?: string;
  stock: number;
  sku: string;
  manufacturer?: string;
  supplier?: string;
  height?: number;
  width?: number;
  depth?: number;
  weight?: number;
  recommended_age?: string;
  gender: 'Unisex' | 'Boys' | 'Girls';
  material?: string;
  barcode?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
};

export type DBOrder = {
  id: number;
  user_id: number;
  status: 'processing' | 'shipped' | 'delivered' | 'canceled' | 'returned' | 'refunded';
  total_amount: number;
  shipping_address_id: number;
  payment_method: string;
  tracking_number?: string;
  coupon_code?: string;
  discount?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type DBOrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
};

export type DBAddress = {
  id: number;
  user_id: number;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_default: boolean;
  type: 'shipping' | 'billing' | 'both';
  created_at: string;
  updated_at: string;
};

export type DBReview = {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  comment?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_response?: string;
  created_at: string;
  updated_at: string;
};

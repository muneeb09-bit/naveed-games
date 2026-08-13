// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NAVEED GAMES — TypeScript Types
// Complete product taxonomy types for gaming ecommerce
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ─── PRODUCT ───
export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandId?: string;
  department?: string;
  departmentSlug?: string;
  category: string;
  categorySlug: string;
  subcategoryId?: string;
  subcategorySlug?: string;
  dealType?: 'flash-deal' | 'bundle-deal' | 'clearance' | 'open-box' | 'seasonal-sale' | string;
  price: number;
  originalPrice?: number;
  salePrice?: number;
  costPrice?: number;
  discount?: number;
  description: string;
  shortDescription: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
  condition: ProductCondition;
  platform?: string;
  releaseYear?: number;
  specs: ProductSpec[];
  variants?: ProductVariant[];
  tags: string[];
  warranty?: string;
  deliveryInfo?: string;
  metaTitle?: string;
  metaDescription?: string;
  status?: ProductStatus;
}

export type ProductCondition = 'new' | 'used' | 'refurbished' | 'pre-owned';
export type ProductStatus = 'draft' | 'published' | 'archived';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'storage' | 'edition' | 'size';
  options: VariantOption[];
}

export interface VariantOption {
  value: string;
  label: string;
  priceModifier?: number;
  inStock: boolean;
}

// ─── CATEGORY ───
export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;
  productCount: number;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  slug: string;
  name: string;
  parentId?: string;
  sortOrder: number;
  productCount: number;
}

// ─── BRAND ───
export interface Brand {
  id: string;
  slug: string;
  name: string;
  description?: string;
  logo?: string;
  isActive: boolean;
  sortOrder: number;
  metaTitle?: string;
  metaDescription?: string;
  productCount?: number;
}

// ─── FILTERS ───
export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string[];
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  platform?: string[];
  condition?: ProductCondition[];
  releaseYear?: number;
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  search?: string;
  tags?: string[];
}

export type SortOption =
  | 'relevance'
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'name-asc'
  | 'name-desc'
  | 'popularity';

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

// ─── CART ───
export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

// ─── WISHLIST ───
export interface WishlistItem {
  product: Product;
  addedAt: string;
}

// ─── CUSTOMER ───
export interface Customer {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

// ─── ORDER ───
export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  customer: Customer;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'cod';
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

// ─── SEARCH ───
export interface SearchSuggestion {
  type: 'product' | 'category' | 'brand';
  text: string;
  slug: string;
  image?: string;
  price?: number;
}

// ─── NAVIGATION ───
export interface NavCategory {
  slug: string;
  name: string;
  icon: string;
  subcategories: { slug: string; name: string }[];
}

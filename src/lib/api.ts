import { products as mockProducts } from '@/data/products';
import { categories as mockCategories } from '@/data/categories';
import { brands as mockBrands } from '@/data/brands';
import { createServerSupabaseClient } from './supabase/server';
import type { Product, Category, Brand } from '@/types';

/**
 * Fetch all published products (from Supabase or local mock fallback)
 */
export async function getProductsApi(): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return mockProducts;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) return mockProducts;

  return data.map(mapDbProductToProduct);
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlugApi(slug: string): Promise<Product | undefined> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return mockProducts.find((p) => p.slug === slug);

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) return mockProducts.find((p) => p.slug === slug);

  return mapDbProductToProduct(data);
}

/**
 * Fetch products by category slug
 */
export async function getProductsByCategoryApi(categorySlug: string): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return mockProducts.filter((p) => p.categorySlug === categorySlug);

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_slug', categorySlug)
    .eq('status', 'published')
    .order('featured', { ascending: false });

  if (error || !data || data.length === 0) {
    return mockProducts.filter((p) => p.categorySlug === categorySlug);
  }

  return data.map(mapDbProductToProduct);
}

/**
 * Fetch products by brand name
 */
export async function getProductsByBrandApi(brandName: string): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return mockProducts.filter(
      (p) => p.brand.toLowerCase().replace(/\s+/g, '-') === brandName || p.brand.toLowerCase() === brandName
    );
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('brand_name', `%${brandName}%`)
    .eq('status', 'published')
    .order('featured', { ascending: false });

  if (error || !data || data.length === 0) {
    return mockProducts.filter(
      (p) => p.brand.toLowerCase().replace(/\s+/g, '-') === brandName || p.brand.toLowerCase() === brandName
    );
  }

  return data.map(mapDbProductToProduct);
}

/**
 * Fetch categories (with subcategories as children where parent_id is set)
 */
export async function getCategoriesApi(): Promise<Category[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return mockCategories;

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) return mockCategories;

  // Build tree: parent categories with subcategory children
  const parents = data.filter((c: Record<string, unknown>) => !c.parent_id);
  const children = data.filter((c: Record<string, unknown>) => c.parent_id);

  return parents.map((c: Record<string, unknown>) => ({
    id: c.id as string,
    slug: c.slug as string,
    name: c.name as string,
    description: (c.description as string) || '',
    image: (c.image as string) || '',
    icon: (c.icon as string) || 'GameController',
    sortOrder: (c.sort_order as number) || 0,
    isActive: c.is_active !== false,
    metaTitle: c.meta_title as string | undefined,
    metaDescription: c.meta_description as string | undefined,
    productCount: 0,
    subcategories: children
      .filter((sub: Record<string, unknown>) => sub.parent_id === c.id)
      .map((sub: Record<string, unknown>) => ({
        id: sub.id as string,
        slug: sub.slug as string,
        name: sub.name as string,
        sortOrder: (sub.sort_order as number) || 0,
        productCount: 0,
      })),
  }));
}

/**
 * Fetch brands
 */
export async function getBrandsApi(): Promise<Brand[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return mockBrands;

  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) return mockBrands;

  return data.map((b: Record<string, unknown>) => ({
    id: b.id as string,
    slug: b.slug as string,
    name: b.name as string,
    description: (b.description as string) || undefined,
    logo: (b.logo as string) || undefined,
    isActive: b.is_active !== false,
    sortOrder: (b.sort_order as number) || 0,
    metaTitle: b.meta_title as string | undefined,
    metaDescription: b.meta_description as string | undefined,
  }));
}

/**
 * Fetch a single brand by slug
 */
export async function getBrandBySlugApi(slug: string): Promise<Brand | undefined> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return mockBrands.find((b) => b.slug === slug);

  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return mockBrands.find((b) => b.slug === slug);

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    description: data.description || undefined,
    logo: data.logo || undefined,
    isActive: data.is_active !== false,
    sortOrder: data.sort_order || 0,
    metaTitle: data.meta_title || undefined,
    metaDescription: data.meta_description || undefined,
  };
}

/**
 * Search products across name, brand, description
 */
export async function searchProductsApi(query: string): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    const q = query.toLowerCase();
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
    );
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'published')
    .or(`name.ilike.%${query}%,brand_name.ilike.%${query}%,description.ilike.%${query}%`)
    .limit(20);

  if (error || !data) return [];

  return data.map(mapDbProductToProduct);
}

/**
 * Helper mapper from PostgreSQL snake_case to Frontend Product model
 */
function mapDbProductToProduct(data: Record<string, unknown>): Product {
  return {
    id: data.id as string,
    slug: data.slug as string,
    name: data.name as string,
    brand: (data.brand_name as string) || 'Naveed Games',
    brandId: data.brand_id as string | undefined,
    category: data.category_slug as string,
    categorySlug: data.category_slug as string,
    subcategoryId: data.subcategory_id as string | undefined,
    price: Number(data.price),
    originalPrice: data.original_price ? Number(data.original_price) : undefined,
    salePrice: data.sale_price ? Number(data.sale_price) : undefined,
    costPrice: data.cost_price ? Number(data.cost_price) : undefined,
    discount: data.discount as number | undefined,
    description: data.description as string,
    shortDescription: data.short_description as string,
    images: (data.images as string[]) || [],
    rating: Number(data.rating || 5),
    reviewCount: (data.review_count as number) || 0,
    inStock: data.in_stock as boolean,
    stockQuantity: data.stock_quantity as number,
    sku: data.sku as string,
    featured: data.featured as boolean,
    bestseller: data.bestseller as boolean,
    isNew: data.is_new as boolean,
    condition: (data.condition as Product['condition']) || 'new',
    platform: data.platform as string | undefined,
    releaseYear: data.release_year as number | undefined,
    specs: (data.specs as Product['specs']) || [],
    tags: (data.tags as string[]) || [],
    warranty: data.warranty as string | undefined,
    deliveryInfo: data.delivery_info as string | undefined,
    metaTitle: data.meta_title as string | undefined,
    metaDescription: data.meta_description as string | undefined,
    status: data.status as Product['status'],
  };
}

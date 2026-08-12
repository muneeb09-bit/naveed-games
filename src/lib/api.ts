import { products as mockProducts, categories as mockCategories } from '@/data/products';
import { createServerSupabaseClient } from './supabase/server';
import type { Product, Category } from '@/types';

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
 * Fetch categories
 */
export async function getCategoriesApi(): Promise<Category[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return mockCategories;

  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error || !data || data.length === 0) return mockCategories;

  return data.map((c: any) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description || '',
    image: c.image || '',
    icon: c.icon || 'GameController',
    productCount: 0,
  }));
}

/**
 * Helper mapper from PostgreSQL snake_case to Frontend Product model
 */
function mapDbProductToProduct(data: any): Product {
  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    brand: data.brand_name || 'Naveed Games',
    category: data.category_slug,
    categorySlug: data.category_slug,
    price: Number(data.price),
    originalPrice: data.original_price ? Number(data.original_price) : undefined,
    discount: data.discount,
    description: data.description,
    shortDescription: data.short_description,
    images: data.images || [],
    rating: Number(data.rating || 5),
    reviewCount: data.review_count || 0,
    inStock: data.in_stock,
    stockQuantity: data.stock_quantity,
    sku: data.sku,
    featured: data.featured,
    bestseller: data.bestseller,
    isNew: data.is_new,
    specs: data.specs || [],
    tags: data.tags || [],
    warranty: data.warranty,
    deliveryInfo: data.delivery_info,
  };
}

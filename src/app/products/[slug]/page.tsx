import { getProductBySlug } from '@/data/products';
import { getProductBySlugApi } from '@/lib/api';
import { ProductDetailClientContainer } from '@/components/product/ProductDetailClientContainer';
import type { Metadata } from 'next';

export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = (await getProductBySlugApi(slug)) || getProductBySlug(slug);
  if (!product) return { title: 'Product Details — Naveed Games' };

  return {
    title: `${product.name} — Naveed Games`,
    description: product.shortDescription || product.name,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = (await getProductBySlugApi(slug)) || getProductBySlug(slug);

  return <ProductDetailClientContainer slug={slug} initialProduct={product} />;
}

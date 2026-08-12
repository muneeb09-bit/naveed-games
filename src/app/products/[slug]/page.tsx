import { notFound } from 'next/navigation';
import { products, getProductBySlug, getProductsByCategory } from '@/data/products';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';
import { ProductCard } from '@/components/product/ProductCard';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} — Naveed Games`,
    description: product.shortDescription,
  };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <ProductDetailClient product={product} relatedProducts={related} />

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="container">
            <h2 className="section__title" style={{ marginBottom: 'var(--space-xl)' }}>
              Related Products
            </h2>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

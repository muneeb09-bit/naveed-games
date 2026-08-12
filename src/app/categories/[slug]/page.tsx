import { notFound } from 'next/navigation';
import { getCategoryBySlug, categories } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name} — Naveed Games`,
    description: category.description,
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  return (
    <div style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container">
        {/* Category Header */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent)',
              marginBottom: 'var(--space-xs)',
            }}
          >
            Category
          </div>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', letterSpacing: '-0.03em' }}>
            {category.name}
          </h1>
          <p style={{ marginTop: 'var(--space-sm)', fontSize: '0.9375rem' }}>
            {category.description}
          </p>
        </div>

        {/* Subcategories if any */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-xl)',
            }}
          >
            {category.subcategories.map((sub) => (
              <span
                key={sub.id}
                style={{
                  padding: '6px 14px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--graphite-border)',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--muted-light)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {sub.name} ({sub.productCount})
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="container" style={{ textAlign: 'center', padding: 'var(--space-4xl) 0' }}>
          <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>
            No products currently in this category.
          </p>
          <Link href="/products" className="button button--secondary">
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}

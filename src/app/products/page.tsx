import type { Metadata } from 'next';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shop All Products — Naveed Games',
  description: 'Browse our complete collection of gaming consoles, PCs, accessories, games and more. Cash on Delivery across Pakistan.',
};

export default function ProductsPage() {
  return (
    <div style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container">
        {/* Page header */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
            All Products
          </h1>
          <p style={{ marginTop: 'var(--space-sm)', fontSize: '0.875rem' }}>
            {products.length} products available
          </p>
        </div>

        {/* Category filters */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-xl)',
          }}
        >
          <Link
            href="/products"
            style={{
              padding: '6px 16px',
              background: 'var(--white)',
              color: 'var(--black)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              border: 'none',
              textDecoration: 'none',
            }}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              style={{
                padding: '6px 16px',
                background: 'transparent',
                color: 'var(--muted-light)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                border: '1px solid var(--graphite-border)',
                textDecoration: 'none',
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

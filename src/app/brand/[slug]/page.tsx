import { notFound } from 'next/navigation';
import { getBrandBySlug, brands } from '@/data/brands';
import { getProductsByBrand, formatPrice } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: 'Brand Not Found' };

  return {
    title: brand.metaTitle || `${brand.name} — Naveed Games`,
    description: brand.metaDescription || brand.description || `Shop ${brand.name} products at Naveed Games.`,
    openGraph: {
      title: `${brand.name} — Naveed Games`,
      description: brand.description || `Shop ${brand.name} products.`,
    },
  };
}

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const brandProducts = getProductsByBrand(slug);

  return (
    <div className="brand-page">
      {/* Brand Hero */}
      <section className="brand-page__hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/shop" className="breadcrumb__link">Shop</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">{brand.name}</span>
          </nav>

          <div className="brand-page__hero-content">
            {brand.logo && (
              <div className="brand-page__logo">
                <img src={brand.logo} alt={`${brand.name} logo`} />
              </div>
            )}
            <div>
              <div className="brand-page__label">Brand</div>
              <h1 className="brand-page__name">{brand.name}</h1>
              {brand.description && (
                <p className="brand-page__description">{brand.description}</p>
              )}
              <div className="brand-page__meta">
                {brandProducts.length} product{brandProducts.length !== 1 ? 's' : ''} available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      {brandProducts.length > 0 ? (
        <section className="section">
          <div className="container">
            <h2 className="section__title" style={{ marginBottom: 'var(--space-xl)' }}>
              {brand.name} Products
            </h2>
          </div>
          <div className="product-grid">
            {brandProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : (
        <section className="section">
          <div className="container" style={{ textAlign: 'center', padding: 'var(--space-4xl) 0' }}>
            <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>
              No products currently available for {brand.name}.
            </p>
            <Link href="/shop" className="button button--secondary">
              Browse All Products
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

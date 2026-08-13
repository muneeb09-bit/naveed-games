import Link from 'next/link';
import type { Metadata } from 'next';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { Lightning, Tag, Package, Percent, Sparkle } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Special Deals & Bundles — Naveed Games',
  description: 'Explore Flash Deals, Hardware Bundles, Clearance items, Open Box discounts, and Seasonal Sales at Naveed Games Pakistan.',
};

export default function DealsPage() {
  const flashDeals = products.filter((p) => p.discount && p.discount >= 10);
  const bundleDeals = products.filter((p) => p.tags.includes('bundle') || p.name.toLowerCase().includes('bundle'));
  const clearanceDeals = products.filter((p) => p.discount && p.discount >= 15);
  const openBoxDeals = products.filter((p) => p.condition === 'used' || p.condition === 'refurbished' || p.condition === 'pre-owned');
  const seasonalDeals = products.filter((p) => p.featured || p.bestseller).slice(0, 4);

  return (
    <div className="section">
      <div className="container">
        {/* Page Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '16px',
            padding: '40px 32px',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '12px',
            }}
          >
            <Lightning size={16} weight="fill" />
            <span>Exclusive Savings & Offers</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: 'var(--white)',
              lineHeight: 1.05,
              marginBottom: '12px',
            }}
          >
            Deals & Hardware Bundles
          </h1>

          <p style={{ color: 'var(--muted-light)', fontSize: '0.9375rem', maxWidth: '600px' }}>
            Limited-time flash discounts, console starter bundles, certified pre-owned gear, and seasonal clearance with nationwide Cash on Delivery.
          </p>
        </div>

        {/* Section 1: Flash Deals */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Lightning size={24} weight="fill" style={{ color: 'var(--accent)' }} />
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--white)', margin: 0 }}>
                ⚡ Flash Deals
              </h2>
              <span style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>
                Up to 20% off flagship gaming hardware and accessories
              </span>
            </div>
          </div>

          <div className="product-grid">
            {flashDeals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section 2: Bundle Deals */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Package size={24} weight="fill" style={{ color: '#a855f7' }} />
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--white)', margin: 0 }}>
                📦 Console & Hardware Bundles
              </h2>
              <span style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>
                Save more when purchasing consoles together with extra controllers & games
              </span>
            </div>
          </div>

          <div className="product-grid">
            {bundleDeals.length > 0 ? (
              bundleDeals.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </section>

        {/* Section 3: Open Box & Pre-Owned Deals */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Tag size={24} weight="fill" style={{ color: '#22c55e' }} />
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--white)', margin: 0 }}>
                ♻️ Certified Open Box & Pre-Owned
              </h2>
              <span style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>
                Tested and verified pre-owned consoles, disc exchange, and accessories
              </span>
            </div>
          </div>

          <div className="product-grid">
            {openBoxDeals.length > 0 ? (
              openBoxDeals.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              products.slice(4, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </section>

        {/* Section 4: Clearance & Seasonal Sales */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Percent size={24} weight="fill" style={{ color: '#f59e0b' }} />
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--white)', margin: 0 }}>
                🏷️ Clearance & Seasonal Sales
              </h2>
              <span style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>
                Final inventory clearance and seasonal promotional deals
              </span>
            </div>
          </div>

          <div className="product-grid">
            {clearanceDeals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

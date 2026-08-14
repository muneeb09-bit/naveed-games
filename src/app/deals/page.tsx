import type { Metadata } from 'next';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { Lightning, Tag, Package, Percent } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Special Deals & Bundles — Naveed Games',
  description: 'Explore Flash Deals, Hardware Bundles, Clearance items, Open Box discounts, and Seasonal Sales at Naveed Games Pakistan.',
};

export default function DealsPage() {
  const flashDeals = products.filter((p) => p.discount && p.discount >= 10);
  const bundleDeals = products.filter((p) => p.tags.includes('bundle') || p.name.toLowerCase().includes('bundle'));
  const clearanceDeals = products.filter((p) => p.discount && p.discount >= 15);
  const openBoxDeals = products.filter((p) => p.condition === 'used' || p.condition === 'refurbished' || p.condition === 'pre-owned');

  return (
    <div className="section-clean">
      <div className="container">
        {/* Page Banner */}
        <div className="promo-clean-banner" style={{ textAlign: 'left', marginBottom: '48px' }}>
          <div className="promo-clean-banner__glow" aria-hidden="true" />
          <div className="promo-clean-banner__badge">
            <Lightning size={14} weight="fill" />
            <span>EXCLUSIVE PROMOTIONAL SAVINGS</span>
          </div>

          <h1 className="promo-clean-banner__title" style={{ textAlign: 'left' }}>
            Deals & Hardware Bundles
          </h1>

          <p className="promo-clean-banner__desc" style={{ textAlign: 'left', maxWidth: '640px' }}>
            Limited-time flash discounts, console starter bundles, certified pre-owned gear, and seasonal clearance with nationwide Cash on Delivery and inspection guarantee.
          </p>
        </div>

        {/* Section 1: Flash Deals */}
        <section style={{ marginBottom: '56px' }}>
          <div className="section-clean__header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', marginBottom: '4px' }}>
                <Lightning size={18} weight="fill" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Limited Time</span>
              </div>
              <h2 className="section-clean__title">Flash Deals</h2>
              <p className="section-clean__subtitle">Up to 20% off flagship gaming hardware and premium accessories</p>
            </div>
          </div>

          <div className="product-clean-grid">
            {flashDeals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section 2: Bundle Deals */}
        <section style={{ marginBottom: '56px' }}>
          <div className="section-clean__header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', marginBottom: '4px' }}>
                <Package size={18} weight="fill" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Value Sets</span>
              </div>
              <h2 className="section-clean__title">Console & Hardware Bundles</h2>
              <p className="section-clean__subtitle">Save more when purchasing consoles together with extra controllers and games</p>
            </div>
          </div>

          <div className="product-clean-grid">
            {(bundleDeals.length > 0 ? bundleDeals : products).slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section 3: Open Box & Pre-Owned Deals */}
        <section style={{ marginBottom: '56px' }}>
          <div className="section-clean__header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', marginBottom: '4px' }}>
                <Tag size={18} weight="fill" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Verified Quality</span>
              </div>
              <h2 className="section-clean__title">Certified Open Box & Pre-Owned</h2>
              <p className="section-clean__subtitle">Tested and verified pre-owned consoles, discs, and accessories with testing warranty</p>
            </div>
          </div>

          <div className="product-clean-grid">
            {(openBoxDeals.length > 0 ? openBoxDeals : products.slice(4, 8)).slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Section 4: Clearance & Seasonal Sales */}
        <section>
          <div className="section-clean__header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', marginBottom: '4px' }}>
                <Percent size={18} weight="fill" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Final Inventory</span>
              </div>
              <h2 className="section-clean__title">Clearance Sales</h2>
              <p className="section-clean__subtitle">Special promotional deals and final inventory clearance</p>
            </div>
          </div>

          <div className="product-clean-grid">
            {clearanceDeals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

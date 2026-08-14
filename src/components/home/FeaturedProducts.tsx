import { getFeaturedProducts } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function FeaturedProducts() {
  const products = getFeaturedProducts().slice(0, 8);

  return (
    <section className="section-clean" id="new-arrivals">
      <div className="container">
        <div className="section-clean__header">
          <div>
            <h2 className="section-clean__title">New Arrivals</h2>
            <p className="section-clean__subtitle">The latest flagship releases, hardware drops, and exclusives</p>
          </div>
          <Link href="/shop" className="section-clean__link">
            <span>View All</span>
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        <div className="product-clean-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

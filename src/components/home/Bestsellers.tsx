import { getBestsellerProducts } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';

export function Bestsellers() {
  const products = getBestsellerProducts().slice(0, 8);

  return (
    <section className="section" id="bestsellers">
      <div className="container">
        <div
          className="section__header"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <h2 className="section__title">Trending Now</h2>
          <Link href="/products" className="section__link">
            View All →
          </Link>
        </div>
      </div>
      <div className="container" style={{ padding: 0 }}>
        <div className="product-rail">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

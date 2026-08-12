'use client';

import { useWishlistStore } from '@/store/wishlist';
import { ProductCard } from '@/components/product/ProductCard';
import { Heart } from '@phosphor-icons/react';
import Link from 'next/link';

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);

  return (
    <div style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container">
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
            My Wishlist
          </h1>
          <p style={{ marginTop: 'var(--space-sm)', fontSize: '0.875rem' }}>
            {items.length} saved {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {items.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--space-4xl) 0',
              textAlign: 'center',
              gap: 'var(--space-md)',
            }}
          >
            <Heart size={48} weight="thin" style={{ color: 'var(--muted)' }} />
            <p style={{ color: 'var(--muted)' }}>Your wishlist is empty</p>
            <Link href="/products" className="button button--primary">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

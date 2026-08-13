'use client';

import { useState, useEffect } from 'react';
import { useWishlistStore } from '@/store/wishlist';
import { ProductCard } from '@/components/product/ProductCard';
import { Heart, ShoppingBag } from '@phosphor-icons/react';
import Link from 'next/link';

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-3xl)' }}>
        <div className="container">
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
              My Wishlist
            </h1>
            <p style={{ marginTop: 'var(--space-sm)', fontSize: '0.875rem', color: 'var(--muted)' }}>
              Loading saved items...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container">
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
            My Wishlist
          </h1>
          <p style={{ marginTop: 'var(--space-sm)', fontSize: '0.875rem', color: 'var(--muted-light)' }}>
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
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
            }}
          >
            <Heart size={48} weight="thin" style={{ color: 'var(--muted)' }} />
            <p style={{ color: 'var(--muted-light)', fontSize: '0.9375rem' }}>Your wishlist is currently empty</p>
            <Link href="/shop" className="button button--primary">
              <ShoppingBag size={18} weight="bold" />
              <span>Explore Shop</span>
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

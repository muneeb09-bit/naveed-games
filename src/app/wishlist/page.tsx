'use client';

import { useState, useEffect } from 'react';
import { useWishlistStore } from '@/store/wishlist';
import { ProductCard } from '@/components/product/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from '@phosphor-icons/react';
import Link from 'next/link';

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="section-clean">
        <div className="container">
          <div className="section-clean__header">
            <div>
              <h1 className="section-clean__title">My Wishlist</h1>
              <p className="section-clean__subtitle">Loading your saved hardware...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-clean">
      <div className="container">
        <div className="section-clean__header">
          <div>
            <h1 className="section-clean__title">My Wishlist</h1>
            <p className="section-clean__subtitle">
              {items.length} saved hardware item{items.length !== 1 ? 's' : ''} in your collection
            </p>
          </div>
          {items.length > 0 && (
            <Link href="/shop" className="section-clean__link">
              <span>Continue Browsing</span>
              <ArrowRight size={14} weight="bold" />
            </Link>
          )}
        </div>

        {items.length === 0 ? (
          <div className="shop-empty">
            <div className="shop-empty__icon-wrap">
              <Heart size={48} weight="thin" />
            </div>
            <h2 className="shop-empty__title">Your wishlist is currently empty</h2>
            <p className="shop-empty__desc">
              Save your favorite consoles, graphics cards, controllers, and accessories here for quick tracking and checkout.
            </p>
            <Link href="/shop" className="btn-primary">
              <ShoppingBag size={18} weight="bold" />
              <span>Explore Hardware Catalog</span>
            </Link>
          </div>
        ) : (
          <div className="product-clean-grid">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

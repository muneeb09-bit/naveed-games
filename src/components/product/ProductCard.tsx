'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Lightning, Check } from '@phosphor-icons/react';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { formatPrice } from '@/data/products';
import type { Product } from '@/types';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isInWishlist(product.id));

  const [mounted, setMounted] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
    openCart();
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Top highlight spec
  const topSpec = product.specs?.[0]?.value || null;

  return (
    <article className="product-card">
      <div className="product-card__glow-border" />

      {/* Image Wrap */}
      <div className="product-card__image-wrap">
        <Link
          href={`/products/${product.slug}`}
          className="product-card__image-link"
        >
          <div className="product-card__image-container">
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="product-card__img"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="product-card__fallback">
              <span>{product.brand}</span>
            </div>
          </div>
        </Link>

        {/* Floating Badges */}
        <div className="product-card__badges">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.discount ? (
            <Badge variant="discount">-{product.discount}%</Badge>
          ) : null}
          {product.condition === 'used' || product.condition === 'pre-owned' ? (
            <span className="product-card__badge-used">Pre-Owned</span>
          ) : null}
        </div>

        {/* Quick Wishlist Button */}
        <button
          className={`product-card__wishlist ${mounted && isWishlisted ? 'product-card__wishlist--active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={mounted && isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          type="button"
        >
          <Heart size={16} weight={mounted && isWishlisted ? 'fill' : 'bold'} />
        </button>
      </div>

      {/* Body */}
      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__brand">{product.brand}</span>
          {product.platform && (
            <span className="product-card__platform">{product.platform}</span>
          )}
        </div>

        <h3 className="product-card__name">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Micro Spec Highlight */}
        {topSpec && (
          <div className="product-card__micro-spec" title={topSpec}>
            <Lightning size={12} weight="fill" style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <span>{topSpec}</span>
          </div>
        )}

        <div className="product-card__rating-row">
          <Rating value={product.rating} count={product.reviewCount} size={12} />
        </div>

        <div className="product-card__footer-row">
          <div className="product-card__pricing">
            <span className="product-card__price">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="product-card__original-price">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="product-card__stock-status">
            {product.inStock ? (
              product.stockQuantity <= 3 ? (
                <span className="product-card__stock product-card__stock--low">
                  <span className="stock-dot stock-dot--low" />
                  {product.stockQuantity} left
                </span>
              ) : (
                <span className="product-card__stock product-card__stock--in">
                  <span className="stock-dot stock-dot--in" />
                  In Stock
                </span>
              )
            ) : (
              <span className="product-card__stock product-card__stock--out">
                <span className="stock-dot stock-dot--out" />
                Sold Out
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Add to Cart Action */}
      <div className="product-card__actions">
        <button
          className={`button button--secondary product-card__add-to-cart ${addedAnimation ? 'button--success' : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          type="button"
        >
          {addedAnimation ? (
            <>
              <Check size={15} weight="bold" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag size={15} weight="bold" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}

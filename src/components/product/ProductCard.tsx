'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, Check } from '@phosphor-icons/react';
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
    setTimeout(() => setAddedAnimation(false), 1400);
    openCart();
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article className="product-card-clean">
      {/* 55-60% Image Container */}
      <div className="product-card-clean__img-wrap">
        <Link
          href={`/products/${product.slug}`}
          className="product-card-clean__img-link"
        >
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="product-card-clean__img"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
                const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="product-card-clean__fallback">
            <span>{product.brand}</span>
          </div>
        </Link>

        {/* Minimal Badges */}
        <div className="product-card-clean__badges">
          {product.isNew && <span className="badge-new">NEW</span>}
          {product.discount ? (
            <span className="badge-sale">-{product.discount}%</span>
          ) : null}
          {!product.inStock && <span className="badge-out">SOLD OUT</span>}
        </div>

        {/* Wishlist Button */}
        <button
          className={`product-card-clean__wishlist ${mounted && isWishlisted ? 'product-card-clean__wishlist--active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={mounted && isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          type="button"
        >
          <Heart size={16} weight={mounted && isWishlisted ? 'fill' : 'bold'} />
        </button>
      </div>

      {/* Body: Brand -> Name -> Rating -> Price -> Stock -> CTA */}
      <div className="product-card-clean__body">
        <span className="product-card-clean__brand">{product.brand}</span>

        <h3 className="product-card-clean__name">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="product-card-clean__rating">
          <Rating value={product.rating} count={product.reviewCount} size={12} />
        </div>

        <div className="product-card-clean__price-row">
          <div className="product-card-clean__pricing">
            <span className="product-card-clean__price">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="product-card-clean__orig-price">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="product-card-clean__stock">
            {product.inStock ? (
              <span className="stock-in">
                <span className="stock-dot stock-dot--in" />
                In Stock
              </span>
            ) : (
              <span className="stock-out">
                <span className="stock-dot stock-dot--out" />
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Quick Add to Cart Action */}
        <button
          className={`product-card-clean__btn ${addedAnimation ? 'product-card-clean__btn--added' : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          type="button"
        >
          {addedAnimation ? (
            <>
              <Check size={14} weight="bold" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag size={14} weight="bold" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}

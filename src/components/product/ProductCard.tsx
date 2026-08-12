'use client';

import Link from 'next/link';
import { Heart, ShoppingBag } from '@phosphor-icons/react';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { formatPrice } from '@/data/products';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isInWishlist(product.id));

  const handleAddToCart = () => {
    addItem(product);
    openCart();
  };

  return (
    <article className="product-card">
      {/* Image */}
      <div className="product-card__image-wrap">
        <div
          className="product-card__image"
          style={{
            background: `linear-gradient(135deg, var(--graphite) 0%, var(--graphite-light) 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--muted)',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {product.brand}
        </div>

        {/* Badges */}
        <div className="product-card__badges">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.discount && (
            <Badge variant="discount">-{product.discount}%</Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          className={`product-card__wishlist ${isWishlisted ? 'product-card__wishlist--active' : ''}`}
          onClick={() => toggleWishlist(product)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          type="button"
        >
          <Heart size={16} weight={isWishlisted ? 'fill' : 'bold'} />
        </button>
      </div>

      {/* Body */}
      <div className="product-card__body">
        <span className="product-card__brand">{product.brand}</span>
        <h3 className="product-card__name">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        <Rating value={product.rating} count={product.reviewCount} size={12} />

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

        {product.inStock ? (
          product.stockQuantity <= 3 ? (
            <span className="product-card__stock product-card__stock--low">
              Only {product.stockQuantity} left
            </span>
          ) : (
            <span className="product-card__stock product-card__stock--in">
              In Stock
            </span>
          )
        ) : (
          <span className="product-card__stock product-card__stock--out">
            Out of Stock
          </span>
        )}
      </div>

      {/* Add to Cart */}
      <div className="product-card__actions">
        <button
          className="button button--secondary product-card__add-to-cart"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          type="button"
        >
          <ShoppingBag size={14} weight="bold" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

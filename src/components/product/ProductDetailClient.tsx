'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { formatPrice } from '@/data/products';
import {
  Heart,
  ShoppingBag,
  WhatsappLogo,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from '@phosphor-icons/react';
import { generateWhatsAppProductUrl } from '@/lib/whatsapp';
import type { Product } from '@/types';
import Link from 'next/link';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isInWishlist(product.id));

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
  };

  const whatsappUrl = generateWhatsAppProductUrl(product.name, product.sku);

  return (
    <div className="pdp">
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <Link
            href="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8125rem',
              color: 'var(--muted)',
            }}
          >
            <ArrowLeft size={14} weight="bold" />
            Back to Products
          </Link>
        </div>

        <div className="pdp__grid">
          {/* Gallery */}
          <div className="pdp__gallery">
            <div className="pdp__main-image-wrap">
              <div
                className="pdp__main-image"
                style={{
                  background: `linear-gradient(135deg, var(--graphite) 0%, var(--graphite-light) 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--muted)',
                  fontSize: '1.5rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                }}
              >
                {product.brand}
              </div>
            </div>
            <div className="pdp__thumbnails">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  className={`pdp__thumbnail ${i === selectedImage ? 'pdp__thumbnail--active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                  type="button"
                  aria-label={`View image ${i + 1}`}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'var(--graphite-light)',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="pdp__info">
            <div>
              <span className="pdp__brand">{product.brand}</span>
              {product.isNew && (
                <Badge variant="new" className="" style={{ marginLeft: '8px' }}>
                  New
                </Badge>
              )}
            </div>

            <h1 className="pdp__title">{product.name}</h1>

            <Rating value={product.rating} count={product.reviewCount} />

            <div className="pdp__pricing">
              <span className="pdp__price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="pdp__original-price">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="discount">-{product.discount}%</Badge>
                </>
              )}
            </div>

            {/* Stock */}
            {product.inStock ? (
              product.stockQuantity <= 3 ? (
                <span className="pdp__stock" style={{ color: 'var(--warning)' }}>
                  Only {product.stockQuantity} left in stock
                </span>
              ) : (
                <span className="pdp__stock" style={{ color: 'var(--success)' }}>
                  In Stock ({product.stockQuantity} available)
                </span>
              )
            ) : (
              <span className="pdp__stock" style={{ color: 'var(--muted)' }}>
                Out of Stock
              </span>
            )}

            <p className="pdp__description">{product.description}</p>

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--muted)',
                }}
              >
                Qty
              </span>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={product.stockQuantity}
              />
            </div>

            {/* Actions */}
            <div className="pdp__actions">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingBag size={18} weight="bold" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => toggleWishlist(product)}
              >
                <Heart
                  size={18}
                  weight={isWishlisted ? 'fill' : 'bold'}
                  style={{ color: isWishlisted ? 'var(--error)' : undefined }}
                />
                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
              </Button>
            </div>

            {/* WhatsApp */}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="md" fullWidth>
                <WhatsappLogo size={18} weight="fill" />
                Order via WhatsApp
              </Button>
            </a>

            {/* Delivery info */}
            <div className="pdp__delivery">
              <div className="pdp__delivery-item">
                <Truck size={18} weight="bold" className="pdp__delivery-icon" />
                <span>{product.deliveryInfo || 'Ships within 1-3 business days'}</span>
              </div>
              <div className="pdp__delivery-item">
                <ShieldCheck size={18} weight="bold" className="pdp__delivery-icon" />
                <span>{product.warranty || 'Standard warranty included'}</span>
              </div>
            </div>

            {/* Specs */}
            {product.specs.length > 0 && (
              <div className="pdp__specs">
                <h3 className="pdp__specs-title">Specifications</h3>
                {product.specs.map((spec) => (
                  <div key={spec.label} className="pdp__spec-row">
                    <span className="pdp__spec-label">{spec.label}</span>
                    <span className="pdp__spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* SKU */}
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--muted)',
                paddingTop: 'var(--space-md)',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              SKU: {product.sku}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

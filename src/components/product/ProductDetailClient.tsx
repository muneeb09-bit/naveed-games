'use client';

import { useState, useEffect } from 'react';
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
  MapPin,
  Clock,
  ShareNetwork,
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
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isInWishlist(product.id));

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
  };

  const whatsappUrl = generateWhatsAppProductUrl(product.name, product.sku);

  return (
    <div className="pdp">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="pdp__breadcrumb">
          <Link href="/shop" className="pdp__back-link">
            <ArrowLeft size={16} weight="bold" />
            <span>Back to Shop</span>
          </Link>
          <span className="pdp__breadcrumb-sep">/</span>
          <span className="pdp__breadcrumb-curr">{product.brand}</span>
        </div>

        <div className="pdp__grid">
          {/* Image Gallery */}
          <div className="pdp__gallery">
            <div className="pdp__main-image-wrap">
              <div className="pdp__main-image-container">
                {product.images?.[selectedImage] ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="pdp__img"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                      const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="pdp__fallback">{product.brand}</div>
              </div>

              {/* Floating Quick Action Badges */}
              <div className="pdp__floating-badges">
                {product.isNew && <Badge variant="new">New</Badge>}
                {product.discount && (
                  <Badge variant="discount">-{product.discount}% OFF</Badge>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="pdp__thumbnails">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`pdp__thumbnail ${i === selectedImage ? 'pdp__thumbnail--active' : ''}`}
                    onClick={() => setSelectedImage(i)}
                    type="button"
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="pdp__thumb-fallback">{i + 1}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Info */}
          <div className="pdp__info">
            <div className="pdp__header-meta">
              <span className="pdp__brand">{product.brand}</span>
              {product.platform && (
                <span className="pdp__platform-chip">{product.platform}</span>
              )}
            </div>

            <h1 className="pdp__title">{product.name}</h1>

            <div className="pdp__rating-bar">
              <Rating value={product.rating} count={product.reviewCount} size={16} />
              <span className="pdp__sku-tag">SKU: {product.sku}</span>
            </div>

            <div className="pdp__pricing">
              <span className="pdp__price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="pdp__original-price">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="discount">Save {formatPrice(product.originalPrice - product.price)}</Badge>
                </>
              )}
            </div>

            {/* Stock Pill with Glow Dot */}
            <div className="pdp__stock-badge">
              {product.inStock ? (
                product.stockQuantity <= 3 ? (
                  <span className="pdp__stock pdp__stock--low">
                    <span className="stock-dot stock-dot--low" />
                    Only {product.stockQuantity} items left — order soon!
                  </span>
                ) : (
                  <span className="pdp__stock pdp__stock--in">
                    <span className="stock-dot stock-dot--in" />
                    In Stock (Ready to dispatch)
                  </span>
                )
              ) : (
                <span className="pdp__stock pdp__stock--out">
                  <span className="stock-dot stock-dot--out" />
                  Out of Stock
                </span>
              )}
            </div>

            <p className="pdp__description">{product.description}</p>

            {/* Quantity Selector */}
            <div className="pdp__quantity-row">
              <span className="pdp__quantity-label">Quantity</span>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={product.stockQuantity}
              />
            </div>

            {/* Desktop Actions */}
            <div className="pdp__actions">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                fullWidth
              >
                <ShoppingBag size={20} weight="bold" />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist toggle"
              >
                <Heart
                  size={20}
                  weight={mounted && isWishlisted ? 'fill' : 'bold'}
                  style={{ color: mounted && isWishlisted ? 'var(--error)' : undefined }}
                />
              </Button>
            </div>

            {/* Direct WhatsApp Order CTA */}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="pdp__whatsapp-link">
              <Button variant="whatsapp" size="lg" fullWidth>
                <WhatsappLogo size={20} weight="fill" />
                Quick Order via WhatsApp
              </Button>
            </a>

            {/* Local Delivery Info Box */}
            <div className="pdp__delivery-box">
              <div className="pdp__delivery-row">
                <Truck size={20} weight="bold" className="pdp__delivery-icon" />
                <div className="pdp__delivery-text">
                  <strong>Peshawar Same-Day Delivery available</strong>
                  <span>Nationwide 1–3 Business Days Shipping</span>
                </div>
              </div>
              <div className="pdp__delivery-row">
                <ShieldCheck size={20} weight="bold" className="pdp__delivery-icon" />
                <div className="pdp__delivery-text">
                  <strong>100% Genuine Guaranteed</strong>
                  <span>Official Warranty & Inspection on Delivery</span>
                </div>
              </div>
              <div className="pdp__delivery-row">
                <MapPin size={20} weight="bold" className="pdp__delivery-icon" />
                <div className="pdp__delivery-text">
                  <strong>Store Pickup Available</strong>
                  <span>Naveed Games, Peshawar City Shop</span>
                </div>
              </div>
            </div>

            {/* Specifications Accordion */}
            {product.specs.length > 0 && (
              <div className="pdp__specs">
                <h3 className="pdp__specs-title">Technical Specifications</h3>
                <div className="pdp__specs-table">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="pdp__spec-row">
                      <span className="pdp__spec-label">{spec.label}</span>
                      <span className="pdp__spec-value">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Buy Bar (visible on screens <= 1023px) */}
      <div className="pdp__sticky-mobile-bar">
        <div className="pdp__sticky-price-info">
          <span className="pdp__sticky-price">{formatPrice(product.price)}</span>
          <span className="pdp__sticky-title">{product.name}</span>
        </div>
        <div className="pdp__sticky-actions">
          <Button
            variant="primary"
            size="md"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingBag size={18} weight="bold" />
            <span>Add</span>
          </Button>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="md">
              <WhatsappLogo size={18} weight="fill" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

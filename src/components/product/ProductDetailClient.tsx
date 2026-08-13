'use client';

import { useState, useEffect, useMemo } from 'react';
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
  MagnifyingGlassPlus,
  X,
  Check,
  Storefront,
} from '@phosphor-icons/react';
import { generateWhatsAppProductUrl } from '@/lib/whatsapp';
import type { Product } from '@/types';
import Link from 'next/link';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts?: Product[];
}

export function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Variant selection state
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach((v) => {
        if (v.options.length > 0) {
          initial[v.id] = v.options[0].value;
        }
      });
    }
    return initial;
  });

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isInWishlist(product.id));

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate dynamic price modifier from selected variants
  const dynamicPrice = useMemo(() => {
    let currentPrice = product.price;
    if (product.variants) {
      product.variants.forEach((v) => {
        const selectedVal = selectedVariants[v.id];
        const option = v.options.find((o) => o.value === selectedVal);
        if (option && option.priceModifier) {
          currentPrice += option.priceModifier;
        }
      });
    }
    return currentPrice;
  }, [product.price, product.variants, selectedVariants]);

  // Selected variant string summary (e.g. "512GB • Titanium Gray")
  const variantSummary = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return '';
    const parts: string[] = [];
    product.variants.forEach((v) => {
      const selectedVal = selectedVariants[v.id];
      const opt = v.options.find((o) => o.value === selectedVal);
      if (opt) parts.push(opt.label);
    });
    return parts.join(' • ');
  }, [product.variants, selectedVariants]);

  const handleVariantChange = (variantId: string, optionValue: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantId]: optionValue,
    }));
  };

  const handleAddToCart = () => {
    addItem(
      {
        ...product,
        price: dynamicPrice,
      },
      quantity,
      selectedVariants
    );
    openCart();
  };

  const currentSku = variantSummary ? `${product.sku}-${Object.values(selectedVariants).join('-')}` : product.sku;
  const whatsappUrl = generateWhatsAppProductUrl(
    `${product.name}${variantSummary ? ` (${variantSummary})` : ''}`,
    currentSku
  );

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
          {product.category && (
            <>
              <Link href={`/shop/${product.categorySlug}`} className="pdp__back-link">
                {product.category}
              </Link>
              <span className="pdp__breadcrumb-sep">/</span>
            </>
          )}
          <span className="pdp__breadcrumb-curr">{product.name}</span>
        </div>

        <div className="pdp__grid">
          {/* Left Column: High-Res Image Gallery & Lightbox */}
          <div className="pdp__gallery">
            <div
              className="pdp__main-image-wrap"
              onClick={() => setLightboxOpen(true)}
              title="Click to view full screen"
            >
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
                {product.discount ? (
                  <Badge variant="discount">-{product.discount}% OFF</Badge>
                ) : null}
              </div>

              {/* Zoom prompt icon */}
              <div className="pdp__zoom-hint">
                <MagnifyingGlassPlus size={16} weight="bold" />
                <span>Zoom</span>
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

          {/* Right Column: Product Information & Purchase Matrix */}
          <div className="pdp__info">
            <div className="pdp__header-meta">
              <span className="pdp__brand">{product.brand}</span>
              {product.platform && (
                <span className="pdp__platform-chip">{product.platform}</span>
              )}
              {product.condition && product.condition !== 'new' && (
                <span className="pdp__platform-chip" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                  Certified Pre-Owned
                </span>
              )}
            </div>

            <h1 className="pdp__title">{product.name}</h1>

            <div className="pdp__rating-bar">
              <Rating value={product.rating} count={product.reviewCount} size={16} />
              <span className="pdp__sku-tag">SKU: {currentSku}</span>
            </div>

            {/* Dynamic Price Display */}
            <div className="pdp__pricing">
              <span className="pdp__price">{formatPrice(dynamicPrice)}</span>
              {product.originalPrice && (
                <>
                  <span className="pdp__original-price">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="discount">
                    Save {formatPrice(product.originalPrice - dynamicPrice)}
                  </Badge>
                </>
              )}
            </div>

            {/* In Stock & Dispatch Status */}
            <div className="pdp__stock-badge">
              {product.inStock ? (
                product.stockQuantity <= 3 ? (
                  <span className="pdp__stock pdp__stock--low">
                    <span className="stock-dot stock-dot--low" />
                    🔥 Only {product.stockQuantity} units left in stock — order soon!
                  </span>
                ) : (
                  <span className="pdp__stock pdp__stock--in">
                    <span className="stock-dot stock-dot--in" />
                    In Stock (Peshawar Express Dispatch Ready)
                  </span>
                )
              ) : (
                <span className="pdp__stock pdp__stock--out">
                  <span className="stock-dot stock-dot--out" />
                  Currently Out of Stock
                </span>
              )}
            </div>

            <p className="pdp__description">{product.description}</p>

            {/* Interactive Variant Selectors */}
            {product.variants && product.variants.length > 0 && (
              <div className="pdp__variants-section">
                {product.variants.map((v) => (
                  <div key={v.id} className="pdp__variant-group">
                    <div className="pdp__variant-label">
                      <span>{v.name}:</span>
                      <strong>
                        {v.options.find((o) => o.value === selectedVariants[v.id])?.label}
                      </strong>
                    </div>
                    <div className="pdp__variant-options">
                      {v.options.map((opt) => {
                        const isSelected = selectedVariants[v.id] === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            className={`pdp__variant-btn ${isSelected ? 'pdp__variant-btn--active' : ''}`}
                            onClick={() => handleVariantChange(v.id, opt.value)}
                          >
                            <span>{opt.label}</span>
                            {opt.priceModifier ? (
                              <span className="pdp__variant-price-diff">
                                {opt.priceModifier > 0 ? `+${formatPrice(opt.priceModifier)}` : formatPrice(opt.priceModifier)}
                              </span>
                            ) : null}
                            {isSelected && <Check size={14} weight="bold" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="pdp__quantity-row">
              <span className="pdp__quantity-label">Quantity</span>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={product.stockQuantity}
              />
            </div>

            {/* Primary Action Buttons */}
            <div className="pdp__actions">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                fullWidth
              >
                <ShoppingBag size={20} weight="bold" />
                Add to Cart — Cash on Delivery
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

            {/* WhatsApp VIP Quick Order */}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="pdp__whatsapp-link">
              <Button variant="whatsapp" size="lg" fullWidth>
                <WhatsappLogo size={20} weight="fill" />
                Order Directly on WhatsApp (Priority Dispatch)
              </Button>
            </a>

            {/* High-Trust Buyer Assurance Card */}
            <div className="pdp__delivery-box">
              <div className="pdp__delivery-row">
                <Truck size={20} weight="bold" className="pdp__delivery-icon" style={{ color: 'var(--accent)' }} />
                <div className="pdp__delivery-text">
                  <strong>Peshawar Same-Day Express Delivery</strong>
                  <span>1–2 business days nationwide shipping with Cash on Delivery (COD)</span>
                </div>
              </div>
              <div className="pdp__delivery-row">
                <ShieldCheck size={20} weight="bold" className="pdp__delivery-icon" style={{ color: 'var(--success)' }} />
                <div className="pdp__delivery-text">
                  <strong>Open & Inspect on Delivery Permitted</strong>
                  <span>100% Genuine Guaranteed • Official Warranty Slip & Serial Verification</span>
                </div>
              </div>
              <div className="pdp__delivery-row">
                <Storefront size={20} weight="bold" className="pdp__delivery-icon" style={{ color: '#ec4899' }} />
                <div className="pdp__delivery-text">
                  <strong>Store Pickup in Peshawar</strong>
                  <span>Naveed Games Flagship Store, Karkhano Market, Peshawar</span>
                </div>
              </div>
            </div>

            {/* Technical Specifications Sheet */}
            {product.specs && product.specs.length > 0 && (
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

      {/* Full-Screen High-Res Lightbox Modal */}
      {lightboxOpen && product.images?.[selectedImage] && (
        <div className="pdp-lightbox" onClick={() => setLightboxOpen(false)}>
          <div className="pdp-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <button
              className="pdp-lightbox__close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close image preview"
              type="button"
            >
              <X size={24} weight="bold" />
            </button>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="pdp-lightbox__image"
            />
            <div className="pdp-lightbox__caption">
              <strong>{product.name}</strong> — Image {selectedImage + 1} of {product.images.length}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Buy Bar */}
      <div className="pdp__sticky-mobile-bar">
        <div className="pdp__sticky-price-info">
          <span className="pdp__sticky-price">{formatPrice(dynamicPrice)}</span>
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

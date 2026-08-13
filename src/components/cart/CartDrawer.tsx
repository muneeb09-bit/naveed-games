'use client';

import { X, ShoppingBag, Plus, Sparkle, Truck, ShieldCheck } from '@phosphor-icons/react';
import { useCartStore } from '@/store/cart';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { Button } from '@/components/ui/Button';
import { formatPrice, products } from '@/data/products';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const ACCESSORY_UPSELLS = [
  {
    id: 'upsell-dualsense',
    name: 'DualSense Wireless Controller (Midnight Black)',
    price: 22499,
    image: '/images/products/controllers.jpg',
    category: 'Controllers',
    slug: 'dualsense-edge-wireless-controller',
  },
  {
    id: 'upsell-mic',
    name: 'DJI Mic 2 Wireless Transmitter System',
    price: 99999,
    image: '/images/products/audio.jpg',
    category: 'Vlogging Gear',
    slug: 'dji-mic-2-wireless-system',
  },
  {
    id: 'upsell-pulse',
    name: 'Sony Pulse Elite Wireless Headset',
    price: 49999,
    image: '/images/products/audio.jpg',
    category: 'Audio',
    slug: 'sony-pulse-elite-wireless-headset',
  },
];

export function CartDrawer() {
  const pathname = usePathname();
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, addItem } =
    useCartStore();

  const subtotal = getSubtotal();
  const FREE_SHIPPING_THRESHOLD = 50000;
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeProgressPct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (pathname?.startsWith('/admin') || !isOpen) return null;

  return (
    <>
      <div className="cart-drawer-overlay" onClick={closeCart} />
      <aside className="cart-drawer" aria-label="Shopping cart">
        {/* Header */}
        <div className="cart-drawer__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={22} weight="bold" style={{ color: 'var(--accent)' }} />
            <h2 className="cart-drawer__title">
              Your Cart ({items.length})
            </h2>
          </div>
          <button
            className="cart-drawer__close"
            onClick={closeCart}
            aria-label="Close cart"
            type="button"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        {items.length > 0 && (
          <div className="cart-drawer__shipping-meter">
            <div className="cart-drawer__shipping-text">
              <Truck size={16} weight="bold" style={{ color: remainingForFree === 0 ? 'var(--success)' : 'var(--accent)' }} />
              <span>
                {remainingForFree === 0 ? (
                  <strong style={{ color: 'var(--success)' }}>🎉 You have unlocked FREE Express Delivery!</strong>
                ) : (
                  <>Add <strong>{formatPrice(remainingForFree)}</strong> more for <strong>FREE Delivery</strong></>
                )}
              </span>
            </div>
            <div className="cart-drawer__progress-bar">
              <div
                className="cart-drawer__progress-fill"
                style={{
                  width: `${freeProgressPct}%`,
                  background: remainingForFree === 0 ? 'var(--success)' : 'var(--accent)',
                }}
              />
            </div>
          </div>
        )}

        {/* Cart Item List */}
        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <ShoppingBag size={48} weight="thin" style={{ color: 'var(--muted)' }} />
              <p>Your shopping cart is currently empty.</p>
              <Button variant="outline" size="sm" onClick={closeCart}>
                Explore Featured Hardware
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="cart-drawer__item">
                <div className="cart-drawer__item-image">
                  {item.product.images?.[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  <span className="cart-drawer__item-brand-fallback">
                    {item.product.brand}
                  </span>
                </div>

                <div className="cart-drawer__item-info">
                  <div className="cart-drawer__item-name">
                    {item.product.name}
                  </div>
                  {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                    <div className="cart-drawer__item-variant">
                      {Object.values(item.selectedVariants).join(' • ')}
                    </div>
                  )}
                  <div className="cart-drawer__item-price">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                  <div className="cart-drawer__item-controls">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(item.product.id, qty)}
                      max={item.product.stockQuantity || 10}
                    />
                    <button
                      className="cart-drawer__item-remove"
                      onClick={() => removeItem(item.product.id)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Frequently Bought Together Upsells */}
          {items.length > 0 && (
            <div className="cart-drawer__upsells">
              <div className="cart-drawer__upsells-title">
                <Sparkle size={14} weight="fill" style={{ color: 'var(--accent)' }} />
                <span>Recommended Accessories</span>
              </div>
              <div className="cart-drawer__upsells-list">
                {ACCESSORY_UPSELLS.map((acc) => {
                  const alreadyInCart = items.some((i) => i.product.name.includes(acc.name.split(' ')[0]));
                  if (alreadyInCart) return null;

                  const fullProduct = products.find((p) => p.slug === acc.slug);

                  return (
                    <div key={acc.id} className="cart-drawer__upsell-card">
                      <div className="cart-drawer__upsell-details">
                        <span className="cart-drawer__upsell-name">{acc.name}</span>
                        <span className="cart-drawer__upsell-price">{formatPrice(acc.price)}</span>
                      </div>
                      <button
                        type="button"
                        className="cart-drawer__upsell-btn"
                        onClick={() => {
                          if (fullProduct) {
                            addItem(fullProduct);
                          }
                        }}
                      >
                        <Plus size={12} weight="bold" />
                        <span>Add</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__subtotal">
              <span className="cart-drawer__subtotal-label">Subtotal</span>
              <span className="cart-drawer__subtotal-value">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="cart-drawer__assurance-badge">
              <ShieldCheck size={14} weight="bold" style={{ color: 'var(--success)' }} />
              <span>Cash on Delivery with Parcel Inspection Guarantee</span>
            </div>

            <Link href="/checkout" onClick={closeCart}>
              <Button variant="primary" size="lg" fullWidth>
                Proceed to Checkout (COD)
              </Button>
            </Link>

            <Button variant="ghost" size="sm" fullWidth onClick={closeCart}>
              Continue Shopping
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}

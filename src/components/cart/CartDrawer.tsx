'use client';

import { X, ShoppingBag } from '@phosphor-icons/react';
import { useCartStore } from '@/store/cart';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/data/products';
import Link from 'next/link';
import { useEffect } from 'react';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } =
    useCartStore();

  const subtotal = getSubtotal();

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

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-drawer-overlay" onClick={closeCart} />
      <aside className="cart-drawer" aria-label="Shopping cart">
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            Cart ({items.length})
          </h2>
          <button
            className="cart-drawer__close"
            onClick={closeCart}
            aria-label="Close cart"
            type="button"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <ShoppingBag size={48} weight="thin" />
              <p>Your cart is empty</p>
              <Button variant="outline" size="sm" onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="cart-drawer__item">
                <div
                  className="cart-drawer__item-image"
                  style={{
                    background: 'var(--graphite-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderRadius: '4px',
                  }}
                >
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
                  <span
                    style={{
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.product.brand}
                  </span>
                </div>
                <div className="cart-drawer__item-info">
                  <div className="cart-drawer__item-name">
                    {item.product.name}
                  </div>
                  <div className="cart-drawer__item-price">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                  <div className="cart-drawer__item-controls">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(item.product.id, qty)}
                      max={item.product.stockQuantity}
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
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__subtotal">
              <span className="cart-drawer__subtotal-label">Subtotal</span>
              <span className="cart-drawer__subtotal-value">
                {formatPrice(subtotal)}
              </span>
            </div>
            <Link href="/checkout" onClick={closeCart}>
              <Button variant="primary" size="lg" fullWidth>
                Checkout
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

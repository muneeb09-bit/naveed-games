'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/data/products';
import { generateWhatsAppOrderUrl } from '@/lib/whatsapp';
import { generateOrderNumber } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { WhatsappLogo, CheckCircle, ArrowLeft } from '@phosphor-icons/react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const deliveryFee = subtotal > 50000 ? 0 : 500;
  const total = subtotal + deliveryFee;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Peshawar',
    notes: '',
  });

  const [placedOrder, setPlacedOrder] = useState<{
    orderNumber: string;
    whatsappUrl: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all required fields (Name, Phone, Address).');
      return;
    }

    const orderNumber = generateOrderNumber();
    const whatsappUrl = generateWhatsAppOrderUrl({
      orderNumber,
      items,
      subtotal,
      deliveryFee,
      total,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      customerCity: formData.city,
      notes: formData.notes,
    });

    setPlacedOrder({ orderNumber, whatsappUrl });
    clearCart();
  };

  if (placedOrder) {
    return (
      <div style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-4xl)' }}>
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <CheckCircle
            size={64}
            weight="fill"
            style={{ color: 'var(--success)', marginBottom: 'var(--space-md)' }}
          />
          <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>
            Order Confirmed!
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--muted-light)', marginBottom: 'var(--space-md)' }}>
            Order Number: <strong style={{ color: 'var(--white)' }}>#{placedOrder.orderNumber}</strong>
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: 'var(--space-xl)' }}>
            Thank you for shopping at Naveed Games. We will process your Cash on Delivery order shortly. You can also send this order directly to our WhatsApp for priority processing!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <a
              href={placedOrder.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button variant="whatsapp" size="lg" fullWidth>
                <WhatsappLogo size={20} weight="fill" />
                Confirm via WhatsApp
              </Button>
            </a>
            <Link href="/products" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="md" fullWidth>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-4xl)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }}>Your Cart is Empty</h1>
          <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-xl)' }}>
            Add items to your cart before proceeding to checkout.
          </p>
          <Link href="/products" className="button button--primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <Link
            href="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8125rem',
              color: 'var(--muted)',
              marginBottom: 'var(--space-sm)',
            }}
          >
            <ArrowLeft size={14} weight="bold" />
            Back to Products
          </Link>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
            Checkout
          </h1>
        </div>

        <div className="checkout__grid">
          {/* Customer Form */}
          <form className="checkout__form" onSubmit={handlePlaceOrder}>
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-md)' }}>
              <h2 style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                Customer Information
              </h2>
            </div>

            <div className="checkout__field">
              <label className="checkout__label" htmlFor="name">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="checkout__input"
                placeholder="e.g. Muhammad Ali"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="checkout__field">
              <label className="checkout__label" htmlFor="phone">
                Phone Number (WhatsApp) *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="checkout__input"
                placeholder="e.g. 0333 9348891"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="checkout__field">
              <label className="checkout__label" htmlFor="city">
                City *
              </label>
              <select
                id="city"
                name="city"
                className="checkout__input"
                value={formData.city}
                onChange={handleChange}
              >
                <option value="Peshawar">Peshawar</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Mardan">Mardan</option>
                <option value="Swat">Swat</option>
                <option value="Abbottabad">Abbottabad</option>
                <option value="Other">Other City</option>
              </select>
            </div>

            <div className="checkout__field">
              <label className="checkout__label" htmlFor="address">
                Full Delivery Address *
              </label>
              <textarea
                id="address"
                name="address"
                className="checkout__textarea"
                placeholder="Street address, house number, area, landmark..."
                required
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="checkout__field">
              <label className="checkout__label" htmlFor="notes">
                Order Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                className="checkout__textarea"
                style={{ minHeight: '70px' }}
                placeholder="Special instructions for delivery..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            {/* Payment options */}
            <div style={{ marginTop: 'var(--space-md)' }}>
              <label className="checkout__label" style={{ marginBottom: '8px', display: 'block' }}>
                Payment Method
              </label>
              <div className="checkout__payment">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  checked
                  readOnly
                  className="checkout__payment-radio"
                />
                <label htmlFor="cod" className="checkout__payment-label">
                  Cash on Delivery (COD)
                </label>
              </div>
            </div>

            <Button variant="primary" size="lg" type="submit" fullWidth style={{ marginTop: 'var(--space-md)' }}>
              Place Order (Cash on Delivery)
            </Button>
          </form>

          {/* Order Summary */}
          <div className="checkout__summary">
            <h2 className="checkout__summary-title">Order Summary</h2>

            {items.map((item) => (
              <div key={item.product.id} className="checkout__summary-item">
                <span className="checkout__summary-item-name">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="checkout__summary-item-price">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-md)' }}>
              <div className="checkout__summary-item" style={{ marginBottom: '8px' }}>
                <span style={{ color: 'var(--muted)' }}>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="checkout__summary-item">
                <span style={{ color: 'var(--muted)' }}>Delivery</span>
                <span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
              </div>
            </div>

            <div className="checkout__summary-total">
              <span className="checkout__summary-total-label">Total</span>
              <span className="checkout__summary-total-value">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

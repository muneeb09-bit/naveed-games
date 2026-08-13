'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/data/products';
import { generateWhatsAppOrderUrl } from '@/lib/whatsapp';
import { generateOrderNumber } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import {
  WhatsappLogo,
  CheckCircle,
  ArrowLeft,
  Copy,
  Check,
  Truck,
  ShieldCheck,
  Storefront,
  Sparkle,
} from '@phosphor-icons/react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  const subtotal = getSubtotal();
  const deliveryFee = subtotal > 50000 ? 0 : 500;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Peshawar',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<{
    orderNumber: string;
    whatsappUrl: string;
  } | null>(null);

  // Auto format Pakistani mobile numbers (e.g., 0333-9348891)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('92')) val = '0' + val.slice(2);
    if (val.length > 11) val = val.slice(0, 11);

    let formatted = val;
    if (val.length > 4) {
      formatted = `${val.slice(0, 4)}-${val.slice(4)}`;
    }

    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setAreaPreset = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      address: prev.address ? `${prev.address}, ${area}` : area,
      city: 'Peshawar',
    }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Please fill in your Full Name, Phone Number, and Complete Delivery Address.');
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 11) {
      alert('Please enter a valid 11-digit Pakistani mobile number (e.g. 0333-9348891).');
      return;
    }

    setIsSubmitting(true);
    const orderNumber = generateOrderNumber();

    try {
      const supabase = createClient();
      if (supabase) {
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert({
            order_number: orderNumber,
            customer_name: formData.name.trim(),
            customer_phone: formData.phone.trim(),
            customer_address: formData.address.trim(),
            customer_city: formData.city,
            notes: formData.notes ? formData.notes.trim() : null,
            subtotal,
            delivery_fee: deliveryFee,
            total,
            status: 'pending',
            payment_method: 'cod',
          })
          .select('id')
          .single();

        if (!orderError && orderData?.id) {
          const orderItems = items.map((item) => ({
            order_id: orderData.id,
            product_name: item.product.name,
            product_image: item.product.images?.[0] || null,
            price: item.product.price,
            quantity: item.quantity,
            variants: item.selectedVariants || {},
          }));

          await supabase.from('order_items').insert(orderItems);
        }
      }
    } catch (err) {
      console.warn('Supabase order insert warning:', err);
    }

    const whatsappUrl = generateWhatsAppOrderUrl({
      orderNumber,
      items,
      subtotal,
      deliveryFee,
      total,
      customerName: formData.name.trim(),
      customerPhone: formData.phone.trim(),
      customerAddress: formData.address.trim(),
      customerCity: formData.city,
      notes: formData.notes,
    });

    setPlacedOrder({ orderNumber, whatsappUrl });
    setIsSubmitting(false);
    clearCart();
  };

  const handleCopyOrderNumber = () => {
    if (placedOrder) {
      navigator.clipboard.writeText(placedOrder.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Order Confirmed Screen
  if (placedOrder) {
    return (
      <div className="checkout-success">
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="checkout-success__card">
            <div className="checkout-success__icon-wrap">
              <CheckCircle size={56} weight="fill" style={{ color: 'var(--success)' }} />
            </div>

            <h1 className="checkout-success__title">Order Confirmed!</h1>
            <p className="checkout-success__subtitle">
              Thank you for shopping at Naveed Games Store. Your order is registered in our dispatch system.
            </p>

            <div className="checkout-success__order-box">
              <div className="checkout-success__order-num">
                <span>OFFICIAL ORDER TRACKING NUMBER</span>
                <strong>#{placedOrder.orderNumber}</strong>
              </div>
              <button
                type="button"
                className="checkout-success__copy-btn"
                onClick={handleCopyOrderNumber}
              >
                {copied ? <Check size={14} weight="bold" /> : <Copy size={14} weight="bold" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <p className="checkout-success__notice">
              ⚡ <strong>Priority Peshawar Dispatch:</strong> Tap below to send your order receipt to our official WhatsApp support for immediate order confirmation & real-time live dispatch tracking!
            </p>

            <div className="checkout-success__actions">
              <a
                href={placedOrder.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="checkout-success__btn-link"
              >
                <Button variant="whatsapp" size="lg" fullWidth>
                  <WhatsappLogo size={22} weight="fill" />
                  Send Order to WhatsApp (VIP Dispatch)
                </Button>
              </a>
              <Link href="/shop" className="checkout-success__btn-link">
                <Button variant="outline" size="md" fullWidth>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mounted && items.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="container" style={{ textAlign: 'center', padding: 'var(--space-4xl) 0' }}>
          <h1 className="checkout-empty__title">Your Shopping Cart is Empty</h1>
          <p className="checkout-empty__desc" style={{ color: 'var(--muted-light)', margin: '16px 0 24px' }}>
            Add items to your cart before proceeding to checkout.
          </p>
          <Link href="/shop" className="button button--primary">
            Explore Hardware Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="container">
        {/* Header Navigation */}
        <div className="checkout__header-nav">
          <Link href="/shop" className="checkout__back-link">
            <ArrowLeft size={16} weight="bold" />
            <span>Back to Catalog</span>
          </Link>
          <h1 className="checkout__title">Express Cash on Delivery Checkout</h1>
        </div>

        {/* Step Progress */}
        <div className="checkout__steps">
          <div className="checkout__step checkout__step--active">
            <span className="checkout__step-num">1</span>
            <span className="checkout__step-label">Delivery Address</span>
          </div>
          <div className="checkout__step-line" />
          <div className="checkout__step checkout__step--active">
            <span className="checkout__step-num">2</span>
            <span className="checkout__step-label">Payment & COD</span>
          </div>
          <div className="checkout__step-line" />
          <div className="checkout__step">
            <span className="checkout__step-num">3</span>
            <span className="checkout__step-label">Confirmation</span>
          </div>
        </div>

        <div className="checkout__grid">
          {/* Customer Delivery Form */}
          <form className="checkout__form" onSubmit={handlePlaceOrder}>
            <div className="checkout__section-title">
              <h2>1. Delivery Information</h2>
              <span>Pay Cash upon receiving your parcel</span>
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
                placeholder="e.g. Muhammad Kashif"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="checkout__field">
              <label className="checkout__label" htmlFor="phone">
                Phone / WhatsApp Number (Pakistani Network) *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="checkout__input"
                placeholder="03XX-XXXXXXX"
                required
                value={formData.phone}
                onChange={handlePhoneChange}
              />
              <span style={{ fontSize: '0.6875rem', color: 'var(--muted)', marginTop: '4px', display: 'block' }}>
                Rider will call this number prior to arrival.
              </span>
            </div>

            <div className="checkout__field">
              <label className="checkout__label" htmlFor="city">
                City / Region *
              </label>
              <select
                id="city"
                name="city"
                className="checkout__input"
                value={formData.city}
                onChange={handleChange}
              >
                <option value="Peshawar">Peshawar (Same-Day / Next-Day Delivery)</option>
                <option value="Islamabad">Islamabad (1-2 Business Days)</option>
                <option value="Rawalpindi">Rawalpindi (1-2 Business Days)</option>
                <option value="Lahore">Lahore (1-2 Business Days)</option>
                <option value="Karachi">Karachi (2-3 Business Days)</option>
                <option value="Mardan">Mardan (Same-Day / Next-Day)</option>
                <option value="Nowshera">Nowshera</option>
                <option value="Charsadda">Charsadda</option>
                <option value="Swat">Swat</option>
                <option value="Abbottabad">Abbottabad</option>
                <option value="Other">Other Pakistan City</option>
              </select>
            </div>

            {/* Quick Peshawar Area Presets */}
            {formData.city === 'Peshawar' && (
              <div className="checkout__presets">
                <span className="checkout__presets-label">Peshawar Quick Area Presets:</span>
                <div className="checkout__presets-chips">
                  {['Hayatabad', 'Saddar', 'University Rd', 'Gulberg', 'Karkhano Market', 'Charsadda Rd', 'Warsak Rd', 'Kohat Rd'].map((area) => (
                    <button
                      key={area}
                      type="button"
                      className="checkout__preset-chip"
                      onClick={() => setAreaPreset(area)}
                    >
                      + {area}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="checkout__field">
              <label className="checkout__label" htmlFor="address">
                Complete Street Address (House #, Street, Sector, Landmark) *
              </label>
              <textarea
                id="address"
                name="address"
                className="checkout__textarea"
                placeholder="House / Apartment #, Street Name, Near Famous Landmark..."
                required
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="checkout__field">
              <label className="checkout__label" htmlFor="notes">
                Delivery Instructions (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                className="checkout__textarea"
                style={{ minHeight: '60px' }}
                placeholder="e.g. Call before delivery, deliver after 3 PM, leave with security..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            {/* Payment Method Badge */}
            <div className="checkout__payment-card">
              <div className="checkout__payment-header">
                <Truck size={22} weight="bold" className="checkout__payment-icon" style={{ color: 'var(--success)' }} />
                <div>
                  <strong>Cash on Delivery (COD) Payment</strong>
                  <span>Pay cash directly to courier rider upon delivery</span>
                </div>
              </div>
            </div>

            {/* Buyer Trust Assurance */}
            <div className="checkout__trust-banner">
              <ShieldCheck size={20} weight="bold" style={{ color: 'var(--success)', flexShrink: 0 }} />
              <div>
                <strong>Parcel Inspection Guarantee:</strong> You are welcome to inspect outer packaging and security seals before paying cash.
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              loading={isSubmitting}
              fullWidth
              style={{ marginTop: 'var(--space-md)' }}
            >
              Place Cash on Delivery Order ({formatPrice(total)})
            </Button>
          </form>

          {/* Order Summary Sidebar */}
          <div className="checkout__summary">
            <h2 className="checkout__summary-title">Order Summary ({items.length} Items)</h2>

            <div className="checkout__summary-items-list">
              {items.map((item) => (
                <div key={item.product.id} className="checkout__summary-item">
                  <img
                    src={item.product.images?.[0]}
                    alt={item.product.name}
                    className="checkout__summary-item-img"
                  />
                  <div className="checkout__summary-item-details">
                    <span className="checkout__summary-item-name">
                      {item.product.name}
                    </span>
                    {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                        {Object.values(item.selectedVariants).join(' • ')}
                      </span>
                    )}
                    <span className="checkout__summary-item-qty">
                      Qty: {item.quantity} × {formatPrice(item.product.price)}
                    </span>
                  </div>
                  <span className="checkout__summary-item-price">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="checkout__summary-breakdown">
              <div className="checkout__summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="checkout__summary-row">
                <span>Delivery Charge</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="checkout__free-badge">FREE (Order over 50K)</span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>
              <div className="checkout__summary-total-row">
                <span>Total Amount Due</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="checkout__trust-box">
              <Storefront size={18} weight="bold" style={{ color: 'var(--accent)' }} />
              <span>Naveed Games Flagship Store, Karkhano Market, Peshawar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

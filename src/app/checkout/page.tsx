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
  MapPin,
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
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all required fields (Name, Phone, Address).');
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
            customer_name: formData.name,
            customer_phone: formData.phone,
            customer_address: formData.address,
            customer_city: formData.city,
            notes: formData.notes || null,
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
      customerName: formData.name,
      customerPhone: formData.phone,
      customerAddress: formData.address,
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

  // Order Confirmed State
  if (placedOrder) {
    return (
      <div className="checkout-success">
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="checkout-success__card">
            <div className="checkout-success__icon-wrap">
              <CheckCircle size={56} weight="fill" />
            </div>

            <h1 className="checkout-success__title">Order Confirmed!</h1>
            <p className="checkout-success__subtitle">
              Thank you for shopping at Naveed Games Store.
            </p>

            <div className="checkout-success__order-box">
              <div className="checkout-success__order-num">
                <span>ORDER NUMBER</span>
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
              Your Cash on Delivery order is registered. Send your order details to our official WhatsApp helpline for ⚡ priority express dispatch in Peshawar & Pakistan!
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
                  Send Order to WhatsApp
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
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="checkout-empty__title">Your Cart is Empty</h1>
          <p className="checkout-empty__desc">
            Add items to your cart before proceeding to checkout.
          </p>
          <Link href="/shop" className="button button--primary">
            Browse Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="container">
        {/* Header Breadcrumb */}
        <div className="checkout__header-nav">
          <Link href="/shop" className="checkout__back-link">
            <ArrowLeft size={16} weight="bold" />
            <span>Back to Shop</span>
          </Link>
          <h1 className="checkout__title">Mobile Checkout</h1>
        </div>

        {/* Step Progress Bar */}
        <div className="checkout__steps">
          <div className="checkout__step checkout__step--active">
            <span className="checkout__step-num">1</span>
            <span className="checkout__step-label">Delivery Address</span>
          </div>
          <div className="checkout__step-line" />
          <div className="checkout__step checkout__step--active">
            <span className="checkout__step-num">2</span>
            <span className="checkout__step-label">Order Review</span>
          </div>
          <div className="checkout__step-line" />
          <div className="checkout__step">
            <span className="checkout__step-num">3</span>
            <span className="checkout__step-label">Confirmation</span>
          </div>
        </div>

        <div className="checkout__grid">
          {/* Customer Form */}
          <form className="checkout__form" onSubmit={handlePlaceOrder}>
            <div className="checkout__section-title">
              <h2>Shipping Information</h2>
              <span>Cash on Delivery (COD) Payment</span>
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
                Phone / WhatsApp Number *
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
                <option value="Peshawar">Peshawar (Express Delivery)</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Mardan">Mardan</option>
                <option value="Swat">Swat</option>
                <option value="Abbottabad">Abbottabad</option>
                <option value="Other">Other Pakistan City</option>
              </select>
            </div>

            {/* Quick Peshawar Area Presets */}
            {formData.city === 'Peshawar' && (
              <div className="checkout__presets">
                <span className="checkout__presets-label">Peshawar Quick Presets:</span>
                <div className="checkout__presets-chips">
                  {['Hayatabad', 'Saddar', 'Gulberg', 'University Rd', 'Karkhano', 'Charsadda Rd'].map((area) => (
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
                Full Street Address *
              </label>
              <textarea
                id="address"
                name="address"
                className="checkout__textarea"
                placeholder="House #, Street name, Sector, Landmark..."
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
                style={{ minHeight: '60px' }}
                placeholder="Any special instructions for delivery rider..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            {/* Payment Method Badge */}
            <div className="checkout__payment-card">
              <div className="checkout__payment-header">
                <Truck size={20} weight="bold" className="checkout__payment-icon" />
                <div>
                  <strong>Cash on Delivery (COD)</strong>
                  <span>Pay with cash when your parcel arrives</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              loading={isSubmitting}
              fullWidth
              style={{ marginTop: 'var(--space-sm)' }}
            >
              Place Cash on Delivery Order
            </Button>
          </form>

          {/* Order Summary */}
          <div className="checkout__summary">
            <h2 className="checkout__summary-title">Order Items ({items.length})</h2>

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
                    <span className="checkout__free-badge">FREE (Over 50K)</span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>
              <div className="checkout__summary-total-row">
                <span>Grand Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="checkout__trust-box">
              <ShieldCheck size={18} weight="bold" />
              <span>Direct WhatsApp & Call Support for Peshawar Customers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

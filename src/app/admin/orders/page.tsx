'use client';

import { useState } from 'react';
import { formatPrice } from '@/data/products';
import { WhatsappLogo, Check, Clock, Truck, Prohibit } from '@phosphor-icons/react';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  items: string;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

const initialOrders: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'NG-M101-A48',
    customerName: 'Kashif Khan',
    customerPhone: '+92 333 1234567',
    city: 'Peshawar',
    address: 'House 14, Sector F-3, Phase 6, Hayatabad',
    items: 'PlayStation 5 Pro × 1',
    total: 249999,
    status: 'pending',
    date: '2 hours ago',
  },
  {
    id: 'ord-102',
    orderNumber: 'NG-M102-B72',
    customerName: 'Tariq Mahmood',
    customerPhone: '+92 312 9876543',
    city: 'Islamabad',
    address: 'Street 45, Sector F-8/1',
    items: 'NG Custom Build — RTX 4070 Super × 1',
    total: 389999,
    status: 'confirmed',
    date: '5 hours ago',
  },
  {
    id: 'ord-103',
    orderNumber: 'NG-M103-C19',
    customerName: 'Bilal Ahmed',
    customerPhone: '+92 300 4567890',
    city: 'Lahore',
    address: 'Block C, Model Town',
    items: 'Steam Deck OLED 512GB × 1, GTA VI × 1',
    total: 169998,
    status: 'shipped',
    date: '1 day ago',
  },
  {
    id: 'ord-104',
    orderNumber: 'NG-M104-D88',
    customerName: 'Zainab Bibi',
    customerPhone: '+92 334 5678901',
    city: 'Peshawar',
    address: 'Shop 12, Saddar Road',
    items: 'Nintendo Switch OLED Model × 1',
    total: 89999,
    status: 'delivered',
    date: '2 days ago',
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState<string>('all');

  const filteredOrders = orders.filter(
    (o) => filter === 'all' || o.status === filter
  );

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const getWhatsAppNotifyUrl = (order: Order) => {
    const message = `Hello ${order.customerName},\n\nThis is Naveed Games regarding your Order #${order.orderNumber}.\nStatus Update: *${order.status.toUpperCase()}*.\n\nThank you for choosing Naveed Games, Peshawar!`;
    return `https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.02em', color: 'var(--white)' }}>
          Order Management
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginTop: '4px' }}>
          Process, confirm, ship, and notify customer orders
        </p>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '24px',
        }}
      >
        {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              type="button"
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid var(--graphite-border)',
                background: filter === status ? 'var(--white)' : 'var(--bg-secondary)',
                color: filter === status ? 'var(--black)' : 'var(--muted-light)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                cursor: 'pointer',
              }}
            >
              {status} ({status === 'all' ? orders.length : orders.filter((o) => o.status === status).length})
            </button>
          )
        )}
      </div>

      {/* Orders Table */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--muted)', textTransform: 'uppercase', fontSize: '0.6875rem', letterSpacing: '0.06em' }}>
                <th style={{ padding: '12px 20px' }}>Order #</th>
                <th style={{ padding: '12px 20px' }}>Customer Info</th>
                <th style={{ padding: '12px 20px' }}>Items</th>
                <th style={{ padding: '12px 20px' }}>Total</th>
                <th style={{ padding: '12px 20px' }}>Status</th>
                <th style={{ padding: '12px 20px' }}>Actions & WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--white)' }}>
                    #{o.orderNumber}
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 400 }}>{o.date}</div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--white)' }}>{o.customerName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{o.customerPhone}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-light)' }}>{o.city}</div>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--muted-light)', maxWidth: '240px' }}>
                    {o.items}
                  </td>
                  <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--white)' }}>
                    {formatPrice(o.total)}
                    <div style={{ fontSize: '0.6875rem', color: 'var(--success)' }}>Cash on Delivery</div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <select
                      className="checkout__input"
                      style={{ padding: '4px 8px', fontSize: '0.75rem', fontWeight: 600 }}
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value as Order['status'])}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <a
                      href={getWhatsAppNotifyUrl(o)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button--whatsapp"
                      style={{ height: '32px', padding: '0 12px', fontSize: '0.6875rem' }}
                    >
                      <WhatsappLogo size={14} weight="fill" />
                      Notify Customer
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

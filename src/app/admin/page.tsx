import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/data/products';
import { formatPrice } from '@/data/products';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Admin Dashboard — Naveed Games',
};
import {
  Coins,
  ShoppingBagOpen,
  Package,
  Warning,
  Plus,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';

export default function AdminDashboardPage() {
  const lowStockProducts = products.filter((p) => p.stockQuantity <= 5);

  const mockRecentOrders = [
    {
      id: 'ord-101',
      number: 'NG-M101-A48',
      customer: 'Kashif Khan',
      city: 'Peshawar',
      items: 'PlayStation 5 Pro × 1',
      total: 249999,
      status: 'pending',
      date: '2 hours ago',
    },
    {
      id: 'ord-102',
      number: 'NG-M102-B72',
      customer: 'Tariq Mahmood',
      city: 'Islamabad',
      items: 'NG Custom Build — RTX 4070 Super × 1',
      total: 389999,
      status: 'confirmed',
      date: '5 hours ago',
    },
    {
      id: 'ord-103',
      number: 'NG-M103-C19',
      customer: 'Bilal Ahmed',
      city: 'Lahore',
      items: 'Steam Deck OLED 512GB × 1, GTA VI × 1',
      total: 169998,
      status: 'shipped',
      date: '1 day ago',
    },
  ];

  return (
    <div>
      {/* Page Heading */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.02em', color: 'var(--white)' }}>
            Store Overview
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginTop: '4px' }}>
            Naveed Games • Karkhano Market, Peshawar
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="button button--primary"
          style={{ height: '40px', padding: '0 16px', fontSize: '0.8125rem' }}
        >
          <Plus size={16} weight="bold" />
          Add New Product
        </Link>
      </div>

      {/* Metrics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', padding: '20px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Revenue</span>
            <Coins size={20} weight="bold" style={{ color: 'var(--success)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--white)' }}>
            Rs. 1,849,000
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', padding: '20px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Orders</span>
            <ShoppingBagOpen size={20} weight="bold" style={{ color: 'var(--accent)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--white)' }}>
            42
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', padding: '20px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Active Products</span>
            <Package size={20} weight="bold" style={{ color: 'var(--white)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--white)' }}>
            {products.length}
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', padding: '20px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Low Stock Alert</span>
            <Warning size={20} weight="bold" style={{ color: 'var(--warning)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--warning)' }}>
            {lowStockProducts.length}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.125rem', color: 'var(--white)' }}>Recent Orders</h2>
          <Link href="/admin/orders" style={{ color: 'var(--accent)', fontSize: '0.8125rem', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            View All Orders <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--muted)', textTransform: 'uppercase', fontSize: '0.6875rem', letterSpacing: '0.06em' }}>
                <th style={{ padding: '12px 20px' }}>Order #</th>
                <th style={{ padding: '12px 20px' }}>Customer</th>
                <th style={{ padding: '12px 20px' }}>Items</th>
                <th style={{ padding: '12px 20px' }}>Total</th>
                <th style={{ padding: '12px 20px' }}>Status</th>
                <th style={{ padding: '12px 20px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--white)' }}>#{order.number}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <div>{order.customer}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{order.city}</div>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--muted-light)' }}>{order.items}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--white)' }}>{formatPrice(order.total)}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        background: order.status === 'pending' ? 'rgba(245, 158, 11, 0.15)' : order.status === 'confirmed' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                        color: order.status === 'pending' ? 'var(--warning)' : order.status === 'confirmed' ? 'var(--accent)' : 'var(--success)',
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--muted)', fontSize: '0.75rem' }}>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

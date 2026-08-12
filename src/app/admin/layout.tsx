'use client';

import Link from 'next/link';
import {
  Gauge,
  Package,
  ShoppingBagOpen,
  SquaresFour,
  SignOut,
  House,
} from '@phosphor-icons/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <Link href="/admin">
            NG<span>ADMIN</span>
          </Link>
        </div>

        <nav className="admin-sidebar__nav">
          <Link href="/admin" className="admin-sidebar__link">
            <Gauge size={18} weight="bold" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/products" className="admin-sidebar__link">
            <Package size={18} weight="bold" />
            <span>Products</span>
          </Link>
          <Link href="/admin/orders" className="admin-sidebar__link">
            <ShoppingBagOpen size={18} weight="bold" />
            <span>Orders</span>
          </Link>
          <Link href="/categories/consoles" className="admin-sidebar__link">
            <SquaresFour size={18} weight="bold" />
            <span>Categories</span>
          </Link>
        </nav>

        <div className="admin-sidebar__footer">
          <Link href="/" className="admin-sidebar__link">
            <House size={18} weight="bold" />
            <span>View Store</span>
          </Link>
          <Link href="/admin/login" className="admin-sidebar__link" style={{ color: 'var(--error)' }}>
            <SignOut size={18} weight="bold" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-content">
        <header className="admin-header">
          <div className="admin-header__title">Naveed Games Management System</div>
          <div className="admin-header__user">
            <span className="admin-header__avatar">M</span>
            <span>Mujahid (Manager)</span>
          </div>
        </header>

        <main className="admin-main">{children}</main>
      </div>

      <style jsx global>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: var(--black);
          color: var(--off-white);
        }

        .admin-sidebar {
          width: 240px;
          background: var(--graphite);
          border-right: 1px solid var(--graphite-border);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 50;
        }

        .admin-sidebar__brand {
          padding: 20px;
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 900;
          letter-spacing: 0.04em;
          border-bottom: 1px solid var(--border-subtle);
        }
        .admin-sidebar__brand a { color: var(--white); text-decoration: none; }
        .admin-sidebar__brand span { color: var(--accent); }

        .admin-sidebar__nav {
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .admin-sidebar__link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 6px;
          font-family: var(--font-display);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--muted-light);
          text-decoration: none;
          transition: all var(--duration-fast);
        }
        .admin-sidebar__link:hover {
          color: var(--white);
          background: rgba(255, 255, 255, 0.05);
        }

        .admin-sidebar__footer {
          padding: 16px 12px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .admin-content {
          margin-left: 240px;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .admin-header {
          height: 64px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
        }

        .admin-header__title {
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--muted);
        }

        .admin-header__user {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8125rem;
          color: var(--white);
          font-weight: 500;
        }

        .admin-header__avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--accent);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
        }

        .admin-main {
          padding: 32px;
          flex: 1;
        }

        @media (max-width: 768px) {
          .admin-sidebar { display: none; }
          .admin-content { margin-left: 0; }
        }
      `}</style>
    </div>
  );
}

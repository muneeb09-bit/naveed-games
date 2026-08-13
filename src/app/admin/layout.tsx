'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Gauge,
  Package,
  ShoppingBagOpen,
  SignOut,
  House,
  FolderOpen,
  Tag,
  List,
  X,
} from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Allow /admin/login without auth check
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      setIsAuthed(true);
      return;
    }

    async function checkAuth() {
      try {
        const supabase = createClient();
        if (!supabase) {
          setIsAuthed(true);
          setAuthChecked(true);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthed(true);
        } else {
          router.replace('/admin/login');
        }
      } catch {
        router.replace('/admin/login');
      } finally {
        setAuthChecked(true);
      }
    }

    checkAuth();
  }, [isLoginPage, router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch {
      // Continue
    }
    router.push('/admin/login');
  };

  if (!authChecked || (!isAuthed && !isLoginPage)) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--black)',
          color: 'var(--muted)',
          fontFamily: 'var(--font-display)',
          fontSize: '0.875rem',
        }}
      >
        Verifying access...
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: Gauge },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/categories', label: 'Categories', icon: FolderOpen },
    { href: '/admin/brands', label: 'Brands', icon: Tag },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBagOpen },
  ];

  return (
    <div className="admin-layout">
      {/* Desktop Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <Link href="/admin">
            NG<span>ADMIN</span>
          </Link>
        </div>

        <nav className="admin-sidebar__nav">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`}
              >
                <Icon size={18} weight={isActive ? 'fill' : 'bold'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar__footer">
          <Link href="/" className="admin-sidebar__link">
            <House size={18} weight="bold" />
            <span>View Store</span>
          </Link>
          <button
            className="admin-sidebar__link admin-sidebar__link--logout"
            onClick={handleLogout}
            type="button"
          >
            <SignOut size={18} weight="bold" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-content">
        <header className="admin-header">
          <div className="admin-header__left">
            <button
              type="button"
              className="admin-header__hamburger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <List size={22} weight="bold" />
            </button>
            <div className="admin-header__title">Naveed Games Console</div>
          </div>

          <div className="admin-header__user">
            <span className="admin-header__avatar">M</span>
            <span className="admin-header__username">Mujahid</span>
          </div>
        </header>

        <main className="admin-main">{children}</main>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="admin-mobile-overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="admin-mobile-drawer">
            <div className="admin-mobile-drawer__header">
              <div className="admin-sidebar__brand">
                <Link href="/admin">
                  NG<span>ADMIN</span>
                </Link>
              </div>
              <button
                type="button"
                className="admin-mobile-drawer__close"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <nav className="admin-sidebar__nav">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`}
                  >
                    <Icon size={18} weight={isActive ? 'fill' : 'bold'} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="admin-sidebar__footer">
              <Link href="/" className="admin-sidebar__link">
                <House size={18} weight="bold" />
                <span>View Store</span>
              </Link>
              <button
                className="admin-sidebar__link admin-sidebar__link--logout"
                onClick={handleLogout}
                type="button"
              >
                <SignOut size={18} weight="bold" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </>
      )}

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
        .admin-sidebar__link:hover,
        .admin-sidebar__link--active {
          color: var(--white);
          background: rgba(59, 130, 246, 0.15);
        }
        .admin-sidebar__link--logout {
          color: var(--error);
          background: none;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
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
          padding: 0 24px;
        }

        .admin-header__left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-header__hamburger {
          display: none;
          background: none;
          border: none;
          color: var(--white);
          cursor: pointer;
          padding: 4px;
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
          font-weight: 600;
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
          padding: 24px;
          flex: 1;
        }

        /* Mobile Admin Drawer */
        .admin-mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 150;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
        }

        .admin-mobile-drawer {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          width: 260px;
          z-index: 151;
          background: var(--graphite);
          border-right: 1px solid var(--graphite-border);
          display: flex;
          flex-direction: column;
        }

        .admin-mobile-drawer__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 16px;
        }

        .admin-mobile-drawer__close {
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .admin-sidebar { display: none; }
          .admin-content { margin-left: 0; }
          .admin-header__hamburger { display: flex; }
          .admin-header__username { display: none; }
          .admin-main { padding: 16px; }
        }
      `}</style>
    </div>
  );
}

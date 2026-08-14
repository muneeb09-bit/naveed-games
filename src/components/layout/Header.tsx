'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  MagnifyingGlass,
  Heart,
  ShoppingBag,
  WhatsappLogo,
  List,
} from '@phosphor-icons/react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { useState, useEffect, useCallback } from 'react';
import { SearchModal } from './SearchModal';
import { usePathname } from 'next/navigation';
import { MobileDrawer } from './MobileDrawer';

export function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const cartItemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header
        className={`header ${scrolled ? 'header--scrolled' : ''}`}
        id="site-header"
      >
        <div className="container header__inner">
          {/* Mobile hamburger */}
          <button
            className="header__hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            type="button"
          >
            <List size={22} weight="bold" />
          </button>

          {/* Clean Logo with Provided NG Icon */}
          <Link href="/" className="header__logo">
            <div className="header__logo-icon-wrap">
              <Image
                src="/images/logo.png"
                alt="Naveed Games"
                width={36}
                height={36}
                className="header__logo-img"
                priority
              />
            </div>
            <span className="header__logo-text">
              NAVEED<span>GAMES</span>
            </span>
          </Link>

          {/* Unified Clean Desktop Navigation */}
          <nav className="header__nav" aria-label="Main navigation">
            <Link
              href="/shop"
              className={`header__nav-link ${pathname === '/shop' ? 'header__nav-link--active' : ''}`}
            >
              Shop
            </Link>
            <Link
              href="/shop/playstation"
              className={`header__nav-link ${pathname?.includes('/playstation') ? 'header__nav-link--active' : ''}`}
            >
              PlayStation
            </Link>
            <Link
              href="/shop/xbox"
              className={`header__nav-link ${pathname?.includes('/xbox') ? 'header__nav-link--active' : ''}`}
            >
              Xbox
            </Link>
            <Link
              href="/shop/gaming-pcs"
              className={`header__nav-link ${pathname?.includes('/gaming-pcs') ? 'header__nav-link--active' : ''}`}
            >
              Gaming PCs
            </Link>
            <Link
              href="/shop/accessories"
              className={`header__nav-link ${pathname?.includes('/accessories') ? 'header__nav-link--active' : ''}`}
            >
              Accessories
            </Link>
            <Link
              href="/deals"
              className={`header__nav-link header__nav-link--deals ${pathname === '/deals' ? 'header__nav-link--active' : ''}`}
            >
              Deals
            </Link>
          </nav>

          {/* Right Utilities */}
          <div className="header__actions">
            {/* Desktop Search Trigger */}
            <button
              className="header__search-trigger-pill"
              onClick={() => setSearchOpen(true)}
              aria-label="Search hardware, games, and brands (Ctrl+K)"
              type="button"
            >
              <MagnifyingGlass size={16} weight="bold" />
              <span className="header__search-placeholder">Search hardware, brands...</span>
              <kbd className="header__search-kbd">Ctrl K</kbd>
            </button>

            {/* Mobile Search Button */}
            <button
              className="header__action-btn header__search-mobile-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              type="button"
            >
              <MagnifyingGlass size={20} weight="bold" />
            </button>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="header__action-btn header__action-btn--desktop"
              aria-label={`Wishlist (${mounted ? wishlistCount : 0} items)`}
            >
              <Heart size={20} weight={mounted && wishlistCount > 0 ? 'fill' : 'bold'} />
              {mounted && wishlistCount > 0 && (
                <span className="cart-count">{wishlistCount}</span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              className="header__action-btn header__cart-btn"
              onClick={openCart}
              aria-label={`Cart (${mounted ? cartItemCount : 0} items)`}
              type="button"
            >
              <ShoppingBag size={20} weight="bold" />
              {mounted && cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </button>

            {/* WhatsApp Quick Support */}
            <a
              href="https://wa.me/923339348891"
              className="header__action-btn header__action-btn--desktop header__whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Support"
              title="Chat with an Expert on WhatsApp"
            >
              <WhatsappLogo size={20} weight="fill" />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Search Modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}

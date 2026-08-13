'use client';

import Link from 'next/link';
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
import { MegaMenu } from './MegaMenu';
import { MobileDrawer } from './MobileDrawer';

export function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [megaMenuTab, setMegaMenuTab] = useState<'shop' | 'brands'>('shop');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const cartItemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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

  const handleMegaMenu = useCallback((tab: 'shop' | 'brands') => {
    if (megaMenuOpen && megaMenuTab === tab) {
      setMegaMenuOpen(false);
    } else {
      setMegaMenuTab(tab);
      setMegaMenuOpen(true);
    }
  }, [megaMenuOpen, megaMenuTab]);

  const closeMegaMenu = useCallback(() => setMegaMenuOpen(false), []);

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

          {/* Logo */}
          <Link href="/" className="header__logo">
            Naveed<span>Games</span>
          </Link>

          {/* Desktop Navigation: SHOP | BRANDS | DEALS | USED | CONTACT */}
          <nav className="header__nav" aria-label="Main navigation">
            <button
              className={`header__nav-link header__nav-link--trigger ${megaMenuOpen && megaMenuTab === 'shop' ? 'header__nav-link--active' : ''}`}
              onClick={() => handleMegaMenu('shop')}
              type="button"
            >
              SHOP
            </button>
            <Link
              href="/brands"
              className="header__nav-link"
              onClick={closeMegaMenu}
            >
              BRANDS
            </Link>
            <Link href="/deals" className="header__nav-link" onClick={closeMegaMenu}>
              DEALS
            </Link>
            <Link href="/shop?condition=used" className="header__nav-link" onClick={closeMegaMenu}>
              USED
            </Link>
            <a
              href="https://wa.me/923339348891"
              target="_blank"
              rel="noopener noreferrer"
              className="header__nav-link"
              onClick={closeMegaMenu}
            >
              CONTACT
            </a>
          </nav>

          {/* Actions */}
          <div className="header__actions">
            {/* Desktop Instant Search Trigger */}
            <button
              className="header__search-trigger-pill"
              onClick={() => { setSearchOpen(true); closeMegaMenu(); }}
              aria-label="Search catalog (Press Ctrl+K)"
              type="button"
            >
              <MagnifyingGlass size={16} weight="bold" />
              <span className="header__search-placeholder">Search hardware, brands...</span>
              <kbd className="header__search-kbd">Ctrl K</kbd>
            </button>

            {/* Mobile Search Button */}
            <button
              className="header__action-btn header__search-mobile-btn"
              onClick={() => { setSearchOpen(true); closeMegaMenu(); }}
              aria-label="Search"
              type="button"
            >
              <MagnifyingGlass size={20} weight="bold" />
            </button>

            <Link
              href="/wishlist"
              className="header__action-btn header__action-btn--desktop"
              aria-label={`Wishlist (${mounted ? wishlistCount : 0} items)`}
              onClick={closeMegaMenu}
            >
              <Heart size={20} weight={mounted && wishlistCount > 0 ? 'fill' : 'bold'} />
              {mounted && wishlistCount > 0 && (
                <span className="cart-count">{wishlistCount}</span>
              )}
            </Link>

            <button
              className="header__action-btn"
              onClick={() => { openCart(); closeMegaMenu(); }}
              aria-label={`Cart (${mounted ? cartItemCount : 0} items)`}
              type="button"
            >
              <ShoppingBag size={20} weight="bold" />
              {mounted && cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </button>

            <a
              href="https://wa.me/923339348891"
              className="header__action-btn header__action-btn--desktop"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact via WhatsApp"
            >
              <WhatsappLogo size={20} weight="fill" />
            </a>
          </div>
        </div>
      </header>

      {/* Mega Menu */}
      <MegaMenu isOpen={megaMenuOpen} onClose={closeMegaMenu} activeTab={megaMenuTab} />

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Search Modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}

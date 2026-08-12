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
import { useState, useEffect } from 'react';
import { SearchModal } from './SearchModal';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="header" id="site-header">
        <div className="container header__inner">
          {/* Logo */}
          <Link href="/" className="header__logo">
            Naveed<span>Games</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header__nav" aria-label="Main navigation">
            <Link href="/products" className="header__nav-link">
              Shop
            </Link>
            <Link href="/categories/consoles" className="header__nav-link">
              Consoles
            </Link>
            <Link href="/categories/gaming-pcs" className="header__nav-link">
              Gaming PCs
            </Link>
            <Link href="/categories/games" className="header__nav-link">
              Games
            </Link>
            <Link href="/products?filter=deals" className="header__nav-link">
              Deals
            </Link>
          </nav>

          {/* Actions */}
          <div className="header__actions">
            <button
              className="header__action-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              type="button"
            >
              <MagnifyingGlass size={20} weight="bold" />
            </button>

            <Link
              href="/wishlist"
              className="header__action-btn"
              aria-label={`Wishlist (${mounted ? wishlistCount : 0} items)`}
              style={{ display: 'none' }}
              data-desktop-only=""
            >
              <Heart size={20} weight={mounted && wishlistCount > 0 ? 'fill' : 'bold'} />
              {mounted && wishlistCount > 0 && (
                <span className="cart-count">{wishlistCount}</span>
              )}
            </Link>

            <button
              className="header__action-btn"
              onClick={openCart}
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
              className="header__action-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact via WhatsApp"
              style={{ display: 'none' }}
              data-desktop-only=""
            >
              <WhatsappLogo size={20} weight="fill" />
            </a>
          </div>
        </div>
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      <style jsx>{`
        [data-desktop-only] {
          display: none !important;
        }
        @media (min-width: 1024px) {
          [data-desktop-only] {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}

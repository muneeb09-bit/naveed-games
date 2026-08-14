'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  House,
  SquaresFour,
  MagnifyingGlass,
  ShoppingBag,
  Heart,
} from '@phosphor-icons/react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { useState, useEffect } from 'react';
import { SearchModal } from './SearchModal';

export function MobileNav() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartItemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistItems = useWishlistStore((s) => s.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isHome = pathname === '/';
  const isShop = pathname.startsWith('/shop') || pathname.startsWith('/products') || pathname.startsWith('/categories');
  const isWishlist = pathname === '/wishlist';

  return (
    <>
      <nav className="bottom-nav" aria-label="Mobile navigation">
        <Link
          href="/"
          className={`bottom-nav__item ${isHome ? 'bottom-nav__item--active' : ''}`}
          aria-label="Home"
        >
          <House size={22} weight={isHome ? 'fill' : 'bold'} />
          <span>Home</span>
        </Link>

        <Link
          href="/shop"
          className={`bottom-nav__item ${isShop ? 'bottom-nav__item--active' : ''}`}
          aria-label="Shop catalog"
        >
          <SquaresFour size={22} weight={isShop ? 'fill' : 'bold'} />
          <span>Shop</span>
        </Link>

        <button
          className="bottom-nav__item"
          onClick={() => setSearchOpen(true)}
          type="button"
          aria-label="Search catalog (Ctrl+K)"
        >
          <MagnifyingGlass size={22} weight="bold" />
          <span>Search</span>
        </button>

        <Link
          href="/wishlist"
          className={`bottom-nav__item ${isWishlist ? 'bottom-nav__item--active' : ''}`}
          aria-label={`Wishlist (${mounted ? wishlistItems.length : 0} items)`}
        >
          <div className="bottom-nav__icon-wrap">
            <Heart size={22} weight={isWishlist ? 'fill' : 'bold'} />
            {mounted && wishlistItems.length > 0 && (
              <span className="bottom-nav__badge">{wishlistItems.length}</span>
            )}
          </div>
          <span>Wishlist</span>
        </Link>

        <button
          className="bottom-nav__item"
          onClick={openCart}
          type="button"
          aria-label={`Cart (${mounted ? cartItemCount : 0} items)`}
        >
          <div className="bottom-nav__icon-wrap">
            <ShoppingBag size={22} weight="bold" />
            {mounted && cartItemCount > 0 && (
              <span className="bottom-nav__badge">
                {cartItemCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>
      </nav>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}

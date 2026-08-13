'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  House,
  SquaresFour,
  MagnifyingGlass,
  ShoppingBagOpen,
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

  return (
    <>
      <nav className="bottom-nav" aria-label="Mobile navigation">
        <Link
          href="/"
          className={`bottom-nav__item ${pathname === '/' ? 'bottom-nav__item--active' : ''}`}
        >
          <House size={20} weight={pathname === '/' ? 'fill' : 'bold'} />
          <span>Home</span>
        </Link>

        <Link
          href="/shop"
          className={`bottom-nav__item ${pathname.startsWith('/shop') || pathname.startsWith('/products') ? 'bottom-nav__item--active' : ''}`}
        >
          <SquaresFour size={20} weight={pathname.startsWith('/shop') ? 'fill' : 'bold'} />
          <span>Shop</span>
        </Link>

        <button
          className="bottom-nav__item"
          onClick={() => setSearchOpen(true)}
          type="button"
          aria-label="Open search"
        >
          <MagnifyingGlass size={20} weight="bold" />
          <span>Search</span>
        </button>

        <Link
          href="/wishlist"
          className={`bottom-nav__item ${pathname === '/wishlist' ? 'bottom-nav__item--active' : ''}`}
        >
          <div className="bottom-nav__icon-wrap">
            <Heart size={20} weight={pathname === '/wishlist' ? 'fill' : 'bold'} />
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
          aria-label="Open cart"
        >
          <div className="bottom-nav__icon-wrap">
            <ShoppingBagOpen size={20} weight="bold" />
            {mounted && cartItemCount > 0 && (
              <span className="bottom-nav__badge bottom-nav__badge--accent">
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

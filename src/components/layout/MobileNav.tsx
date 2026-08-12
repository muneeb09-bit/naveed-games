'use client';

import Link from 'next/link';
import {
  House,
  SquaresFour,
  MagnifyingGlass,
  ShoppingBag,
  User,
} from '@phosphor-icons/react';
import { useCartStore } from '@/store/cart';
import { useState } from 'react';
import { SearchModal } from './SearchModal';

export function MobileNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <>
      <nav className="bottom-nav" aria-label="Mobile navigation">
        <Link href="/" className="bottom-nav__item">
          <House size={20} weight="bold" />
          <span>Home</span>
        </Link>

        <Link href="/products" className="bottom-nav__item">
          <SquaresFour size={20} weight="bold" />
          <span>Shop</span>
        </Link>

        <button
          className="bottom-nav__item"
          onClick={() => setSearchOpen(true)}
          type="button"
        >
          <MagnifyingGlass size={20} weight="bold" />
          <span>Search</span>
        </button>

        <button
          className="bottom-nav__item"
          onClick={openCart}
          type="button"
        >
          <ShoppingBag size={20} weight="bold" />
          <span>Cart</span>
          {cartItemCount > 0 && (
            <span
              className="cart-count"
              style={{
                position: 'absolute',
                top: '4px',
                right: 'calc(50% - 16px)',
              }}
            >
              {cartItemCount}
            </span>
          )}
        </button>

        <Link href="/wishlist" className="bottom-nav__item">
          <User size={20} weight="bold" />
          <span>Account</span>
        </Link>
      </nav>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}

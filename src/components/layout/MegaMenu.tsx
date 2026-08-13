'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CaretRight } from '@phosphor-icons/react';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'shop' | 'brands';
}

export function MegaMenu({ isOpen, onClose, activeTab }: MegaMenuProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setHoveredCategory(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeCategory = hoveredCategory
    ? categories.find((c) => c.slug === hoveredCategory)
    : null;

  return (
    <div className="mega-menu" ref={menuRef}>
      <div className="mega-menu__inner container">
        {activeTab === 'shop' ? (
          <>
            {/* Categories column */}
            <div className="mega-menu__categories">
              <div className="mega-menu__section-label">Shop by Category</div>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}`}
                  className={`mega-menu__category-item ${hoveredCategory === cat.slug ? 'mega-menu__category-item--active' : ''}`}
                  onMouseEnter={() => setHoveredCategory(cat.slug)}
                  onClick={onClose}
                >
                  <span>{cat.name}</span>
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <CaretRight size={12} weight="bold" />
                  )}
                </Link>
              ))}
            </div>

            {/* Subcategories column */}
            <div className="mega-menu__subcategories">
              {activeCategory && activeCategory.subcategories && activeCategory.subcategories.length > 0 ? (
                <>
                  <div className="mega-menu__section-label">{activeCategory.name}</div>
                  <div className="mega-menu__sub-grid">
                    {activeCategory.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/shop/${activeCategory.slug}/${sub.slug}`}
                        className="mega-menu__sub-item"
                        onClick={onClose}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/shop/${activeCategory.slug}`}
                    className="mega-menu__view-all"
                    onClick={onClose}
                  >
                    View All {activeCategory.name} →
                  </Link>
                </>
              ) : (
                <div className="mega-menu__section-label" style={{ color: 'var(--muted)' }}>
                  Hover a category to see subcategories
                </div>
              )}
            </div>

            {/* Featured / Quick links column */}
            <div className="mega-menu__featured">
              <div className="mega-menu__section-label">Quick Links</div>
              <Link href="/shop?filter=deals" className="mega-menu__quick-link" onClick={onClose}>
                🔥 Deals & Offers
              </Link>
              <Link href="/shop?featured=true" className="mega-menu__quick-link" onClick={onClose}>
                ⭐ Featured Products
              </Link>
              <Link href="/shop?new=true" className="mega-menu__quick-link" onClick={onClose}>
                🆕 New Arrivals
              </Link>
              <Link href="/shop?bestseller=true" className="mega-menu__quick-link" onClick={onClose}>
                🏆 Best Sellers
              </Link>

              <div className="mega-menu__section-label" style={{ marginTop: '24px' }}>
                Top Brands
              </div>
              <div className="mega-menu__brand-chips">
                {brands.slice(0, 6).map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/brand/${brand.slug}`}
                    className="mega-menu__brand-chip"
                    onClick={onClose}
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Brands tab */
          <div className="mega-menu__brands-grid">
            <div className="mega-menu__section-label" style={{ gridColumn: '1 / -1' }}>
              Shop by Brand
            </div>
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brand/${brand.slug}`}
                className="mega-menu__brand-card"
                onClick={onClose}
              >
                <div className="mega-menu__brand-card-name">{brand.name}</div>
                <div className="mega-menu__brand-card-desc">
                  {brand.description?.slice(0, 60)}...
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

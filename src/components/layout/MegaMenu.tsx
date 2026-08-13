'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CaretRight, Sparkle } from '@phosphor-icons/react';
import { departments } from '@/data/departments';
import { brands } from '@/data/brands';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'shop' | 'brands';
}

export function MegaMenu({ isOpen, onClose, activeTab }: MegaMenuProps) {
  const [activeDeptSlug, setActiveDeptSlug] = useState<string>(departments[0].slug);
  const [hoveredCategorySlug, setHoveredCategorySlug] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setHoveredCategorySlug(null);
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

  const currentDept = departments.find((d) => d.slug === activeDeptSlug) || departments[0];
  const currentCategory = hoveredCategorySlug
    ? currentDept.categories.find((c) => c.slug === hoveredCategorySlug)
    : currentDept.categories[0];

  return (
    <div className="mega-menu" ref={menuRef}>
      <div className="mega-menu__inner container">
        {activeTab === 'shop' ? (
          <>
            {/* Column 1: Departments */}
            <div className="mega-menu__depts">
              <div className="mega-menu__section-label">Departments</div>
              {departments.map((dept) => (
                <button
                  key={dept.slug}
                  type="button"
                  className={`mega-menu__dept-item ${activeDeptSlug === dept.slug ? 'mega-menu__dept-item--active' : ''}`}
                  onMouseEnter={() => {
                    setActiveDeptSlug(dept.slug);
                    setHoveredCategorySlug(dept.categories[0]?.slug || null);
                  }}
                  onClick={() => {
                    setActiveDeptSlug(dept.slug);
                    setHoveredCategorySlug(dept.categories[0]?.slug || null);
                  }}
                >
                  <span>{dept.name}</span>
                  <CaretRight size={12} weight="bold" />
                </button>
              ))}
            </div>

            {/* Column 2: Categories */}
            <div className="mega-menu__categories">
              <div className="mega-menu__section-label">{currentDept.name} Categories</div>
              {currentDept.categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}`}
                  className={`mega-menu__category-item ${currentCategory?.slug === cat.slug ? 'mega-menu__category-item--active' : ''}`}
                  onMouseEnter={() => setHoveredCategorySlug(cat.slug)}
                  onClick={onClose}
                >
                  <span>{cat.name}</span>
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <CaretRight size={12} weight="bold" />
                  )}
                </Link>
              ))}
            </div>

            {/* Column 3: Subcategories & Progressive Disclosure */}
            <div className="mega-menu__subcategories">
              {currentCategory && currentCategory.subcategories && currentCategory.subcategories.length > 0 ? (
                <>
                  <div className="mega-menu__section-label">{currentCategory.name}</div>
                  <div className="mega-menu__sub-grid">
                    {currentCategory.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/shop/${currentCategory.slug}/${sub.slug}`}
                        className="mega-menu__sub-item"
                        onClick={onClose}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/shop/${currentCategory.slug}`}
                    className="mega-menu__view-all"
                    onClick={onClose}
                  >
                    Explore All {currentCategory.name} →
                  </Link>
                </>
              ) : (
                <div className="mega-menu__section-label" style={{ color: 'var(--muted)' }}>
                  Select a category to view items
                </div>
              )}
            </div>

            {/* Column 4: Quick Actions & Brands */}
            <div className="mega-menu__featured">
              <div className="mega-menu__section-label">Discover</div>
              <Link href="/deals" className="mega-menu__quick-link" onClick={onClose}>
                <Sparkle size={14} weight="fill" style={{ color: 'var(--accent)' }} />
                <span>🔥 Flash Deals & Bundles</span>
              </Link>
              <Link href="/shop?condition=used" className="mega-menu__quick-link" onClick={onClose}>
                ♻️ Pre-Owned & Open Box
              </Link>
              <Link href="/brands" className="mega-menu__quick-link" onClick={onClose}>
                🏆 All Official Brands
              </Link>

              <div className="mega-menu__section-label" style={{ marginTop: '20px' }}>
                Featured Brands
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
          /* Brands Tab */
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

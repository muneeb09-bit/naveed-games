'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, filterProducts, sortProducts } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { SortDropdown } from '@/components/shop/SortDropdown';
import { ActiveFilters } from '@/components/shop/ActiveFilters';
import { Funnel, SquaresFour, Rows, MagnifyingGlass, X } from '@phosphor-icons/react';
import type { Product, ProductFilters, SortOption } from '@/types';

type ViewMode = 'grid' | 'list';

export function ShopClient({
  categorySlug,
  subcategorySlug,
  departmentSlug,
}: {
  categorySlug?: string;
  subcategorySlug?: string;
  departmentSlug?: string;
}) {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ProductFilters>(() => {
    const initial: ProductFilters = {};
    if (categorySlug) initial.category = categorySlug;
    if (searchParams.get('search')) initial.search = searchParams.get('search')!;
    if (searchParams.get('condition')) initial.condition = [searchParams.get('condition') as any];
    if (searchParams.get('featured') === 'true') initial.featured = true;
    if (searchParams.get('new') === 'true') initial.isNew = true;
    if (searchParams.get('bestseller') === 'true') initial.bestseller = true;
    return initial;
  });

  const [sort, setSort] = useState<SortOption>('relevance');
  const [viewMode, setViewMode] = useState<ViewMode>('grid'); // Default is 'grid'
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [allProductsList, setAllProductsList] = useState<Product[]>(products);

  // Sync with search parameter when navigating
  useEffect(() => {
    const searchVal = searchParams.get('search');
    const conditionVal = searchParams.get('condition');

    setFilters((prev) => ({
      ...prev,
      category: categorySlug || prev.category,
      search: searchVal || undefined,
      condition: conditionVal ? [conditionVal as any] : prev.condition,
    }));
  }, [searchParams, categorySlug]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('ng_custom_products');
        if (stored) {
          const customList: Product[] = JSON.parse(stored);
          if (customList.length > 0) {
            const combined = [...products];
            customList.forEach((c) => {
              const idx = combined.findIndex((p) => p.id === c.id || p.slug === c.slug);
              if (idx >= 0) {
                combined[idx] = c;
              } else {
                combined.unshift(c);
              }
            });
            setAllProductsList(combined);
          }
        }
      } catch {
        // Ignore
      }
    }
  }, []);

  const filteredProducts = useMemo(() => {
    let result = filterProducts(allProductsList, filters);
    if (subcategorySlug) {
      const sub = subcategorySlug.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.subcategoryId === sub ||
          p.subcategorySlug === sub ||
          p.tags.includes(sub) ||
          p.slug.includes(sub) ||
          p.tags.some((t) => t.includes(sub.replace(/-/g, '')))
      );
    }
    return sortProducts(result, sort);
  }, [allProductsList, filters, sort, subcategorySlug]);

  return (
    <div className="shop-layout">
      {/* Desktop Filter Sidebar */}
      <div className="shop-layout__sidebar">
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          productCount={filteredProducts.length}
          categorySlug={categorySlug}
          departmentSlug={departmentSlug}
        />
      </div>

      {/* Main Content Area */}
      <div className="shop-layout__main">
        {/* Catalog Search Bar (Above Filters & Toolbar) */}
        <div className="shop-search-bar">
          <div className="shop-search-bar__inner">
            <MagnifyingGlass size={18} weight="bold" className="shop-search-bar__icon" />
            <input
              type="text"
              placeholder={
                categorySlug
                  ? `Search inside ${categorySlug.replace(/-/g, ' ')}...`
                  : 'Search products by title, brand, platform, or keyword...'
              }
              value={filters.search || ''}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value || undefined })
              }
              className="shop-search-bar__input"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => setFilters({ ...filters, search: undefined })}
                className="shop-search-bar__clear"
                aria-label="Clear search query"
              >
                <X size={16} weight="bold" />
              </button>
            )}
          </div>
        </div>

        {/* Toolbar Header with Filters Button, Counter & Functional View Toggle */}
        <div className="shop-toolbar">
          <div className="shop-toolbar__left">
            <button
              className="shop-toolbar__filter-btn"
              onClick={() => setMobileFiltersOpen(true)}
              type="button"
            >
              <Funnel size={16} weight="bold" />
              <span>Filters</span>
            </button>
            <div className="shop-toolbar__count-badge">
              <span className="shop-toolbar__count-dot" />
              <span className="shop-toolbar__count-text">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
              </span>
            </div>
          </div>

          <div className="shop-toolbar__right">
            {/* View Mode Switcher: Grid vs List (Both fully functional with Grid default) */}
            <div className="shop-toolbar__view-modes" aria-label="Layout view options">
              <button
                type="button"
                className={`shop-toolbar__view-btn ${viewMode === 'grid' ? 'shop-toolbar__view-btn--active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
                title="Grid View"
              >
                <SquaresFour size={18} weight={viewMode === 'grid' ? 'fill' : 'bold'} />
              </button>
              <button
                type="button"
                className={`shop-toolbar__view-btn ${viewMode === 'list' ? 'shop-toolbar__view-btn--active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List View"
                title="List View"
              >
                <Rows size={18} weight={viewMode === 'list' ? 'fill' : 'bold'} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        {/* Active Filter Chips */}
        <ActiveFilters
          filters={filters}
          onFilterChange={setFilters}
          categorySlug={categorySlug}
        />

        {/* Product Grid / List Container */}
        {filteredProducts.length > 0 ? (
          <div className={`shop-grid shop-grid--${viewMode}`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="shop-empty">
            <div className="shop-empty__icon-wrap">
              <Funnel size={36} weight="thin" />
            </div>
            <h3 className="shop-empty__title">No matching products found</h3>
            <p className="shop-empty__desc">
              Try adjusting your search query, price range, platform selection, or clearing your active filters.
            </p>
            <button
              className="button button--primary"
              onClick={() => setFilters({ category: categorySlug })}
              type="button"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Overlay & Drawer */}
      {mobileFiltersOpen && (
        <>
          <div
            className="mobile-filter-overlay"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="mobile-filter-drawer">
            <div className="mobile-filter-drawer__header">
              <div className="mobile-filter-drawer__title-wrap">
                <Funnel size={18} weight="bold" style={{ color: 'var(--accent)' }} />
                <h3>Filter Products</h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="mobile-filter-drawer__close"
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>
            <div className="mobile-filter-drawer__body">
              <FilterSidebar
                filters={filters}
                onFilterChange={(f) => setFilters(f)}
                productCount={filteredProducts.length}
                categorySlug={categorySlug}
                departmentSlug={departmentSlug}
                hideHeader={true}
              />
            </div>
            <div className="mobile-filter-drawer__footer">
              <button
                className="button button--primary mobile-filter-drawer__apply"
                onClick={() => setMobileFiltersOpen(false)}
                type="button"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

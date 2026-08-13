'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, filterProducts, sortProducts } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { SortDropdown } from '@/components/shop/SortDropdown';
import { ActiveFilters } from '@/components/shop/ActiveFilters';
import { Funnel } from '@phosphor-icons/react';
import type { ProductFilters, SortOption } from '@/types';

export function ShopClient({ categorySlug, subcategorySlug }: { categorySlug?: string; subcategorySlug?: string }) {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ProductFilters>(() => {
    const initial: ProductFilters = {};
    if (categorySlug) initial.category = categorySlug;
    if (searchParams.get('featured') === 'true') initial.featured = true;
    if (searchParams.get('new') === 'true') initial.isNew = true;
    if (searchParams.get('bestseller') === 'true') initial.bestseller = true;
    return initial;
  });

  const [sort, setSort] = useState<SortOption>('relevance');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = filterProducts(products, filters);
    if (subcategorySlug) {
      // Filter by subcategory tag or slug match
      result = result.filter(
        (p) => p.tags.includes(subcategorySlug) || p.tags.some((t) => t.includes(subcategorySlug.replace(/-/g, '')))
      );
    }
    return sortProducts(result, sort);
  }, [filters, sort, subcategorySlug]);

  return (
    <div className="shop-layout">
      {/* Desktop Filter Sidebar */}
      <div className="shop-layout__sidebar">
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          productCount={filteredProducts.length}
          categorySlug={categorySlug}
        />
      </div>

      {/* Main Content */}
      <div className="shop-layout__main">
        {/* Toolbar */}
        <div className="shop-toolbar">
          <button
            className="shop-toolbar__filter-btn"
            onClick={() => setMobileFiltersOpen(true)}
            type="button"
          >
            <Funnel size={16} weight="bold" />
            Filters
          </button>
          <span className="shop-toolbar__count">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </span>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        {/* Active Filters */}
        <ActiveFilters
          filters={filters}
          onFilterChange={setFilters}
          categorySlug={categorySlug}
        />

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="shop-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="shop-empty">
            <p>No products match your filters.</p>
            <button
              className="button button--secondary"
              onClick={() => setFilters({ category: categorySlug })}
              type="button"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Overlay */}
      {mobileFiltersOpen && (
        <>
          <div className="mobile-filter-overlay" onClick={() => setMobileFiltersOpen(false)} />
          <div className="mobile-filter-drawer">
            <FilterSidebar
              filters={filters}
              onFilterChange={(f) => {
                setFilters(f);
              }}
              productCount={filteredProducts.length}
              categorySlug={categorySlug}
            />
            <button
              className="button button--primary mobile-filter-drawer__apply"
              onClick={() => setMobileFiltersOpen(false)}
              type="button"
            >
              Show {filteredProducts.length} Results
            </button>
          </div>
        </>
      )}
    </div>
  );
}

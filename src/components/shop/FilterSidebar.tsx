'use client';

import { useState, useMemo } from 'react';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';
import { getAvailablePlatforms } from '@/data/products';
import type { ProductFilters } from '@/types';
import { CaretDown, CaretUp, X } from '@phosphor-icons/react';

interface FilterSidebarProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  productCount: number;
  categorySlug?: string;
}

export function FilterSidebar({ filters, onFilterChange, productCount, categorySlug }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['category', 'brand', 'price', 'availability'])
  );

  const platforms = useMemo(() => getAvailablePlatforms(), []);

  const toggleSection = (section: string) => {
    const next = new Set(expandedSections);
    if (next.has(section)) {
      next.delete(section);
    } else {
      next.add(section);
    }
    setExpandedSections(next);
  };

  const updateFilter = (key: keyof ProductFilters, value: unknown) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'brand' | 'platform' | 'condition', value: string) => {
    const current = (filters[key] as string[]) || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, next.length > 0 ? next : undefined);
  };

  const clearAllFilters = () => {
    onFilterChange({ category: categorySlug });
  };

  const hasActiveFilters = !!(
    filters.brand?.length ||
    filters.platform?.length ||
    filters.condition?.length ||
    filters.priceMin ||
    filters.priceMax ||
    filters.inStock !== undefined ||
    filters.featured ||
    filters.isNew
  );

  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar__header">
        <h3 className="filter-sidebar__title">Filters</h3>
        <span className="filter-sidebar__count">{productCount} products</span>
      </div>

      {hasActiveFilters && (
        <button
          className="filter-sidebar__clear"
          onClick={clearAllFilters}
          type="button"
        >
          <X size={12} weight="bold" />
          Clear All Filters
        </button>
      )}

      {/* Category Filter (only show if not already on a category page) */}
      {!categorySlug && (
        <FilterSection
          title="Category"
          isOpen={expandedSections.has('category')}
          onToggle={() => toggleSection('category')}
        >
          {categories.map((cat) => (
            <label key={cat.slug} className="filter-sidebar__checkbox-label">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat.slug}
                onChange={() => updateFilter('category', filters.category === cat.slug ? undefined : cat.slug)}
                className="filter-sidebar__radio"
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </FilterSection>
      )}

      {/* Brand Filter */}
      <FilterSection
        title="Brand"
        isOpen={expandedSections.has('brand')}
        onToggle={() => toggleSection('brand')}
      >
        {brands.map((brand) => (
          <label key={brand.slug} className="filter-sidebar__checkbox-label">
            <input
              type="checkbox"
              checked={(filters.brand || []).includes(brand.slug)}
              onChange={() => toggleArrayFilter('brand', brand.slug)}
              className="filter-sidebar__checkbox"
            />
            <span>{brand.name}</span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection
        title="Price Range"
        isOpen={expandedSections.has('price')}
        onToggle={() => toggleSection('price')}
      >
        <div className="filter-sidebar__price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin || ''}
            onChange={(e) => updateFilter('priceMin', e.target.value ? Number(e.target.value) : undefined)}
            className="filter-sidebar__price-input"
          />
          <span className="filter-sidebar__price-separator">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax || ''}
            onChange={(e) => updateFilter('priceMax', e.target.value ? Number(e.target.value) : undefined)}
            className="filter-sidebar__price-input"
          />
        </div>
        <div className="filter-sidebar__price-presets">
          {[
            { label: 'Under 50K', min: 0, max: 50000 },
            { label: '50K - 150K', min: 50000, max: 150000 },
            { label: '150K - 300K', min: 150000, max: 300000 },
            { label: 'Over 300K', min: 300000, max: undefined },
          ].map((preset) => (
            <button
              key={preset.label}
              className="filter-sidebar__price-preset"
              onClick={() => {
                updateFilter('priceMin', preset.min || undefined);
                onFilterChange({
                  ...filters,
                  priceMin: preset.min || undefined,
                  priceMax: preset.max,
                });
              }}
              type="button"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection
        title="Availability"
        isOpen={expandedSections.has('availability')}
        onToggle={() => toggleSection('availability')}
      >
        <label className="filter-sidebar__checkbox-label">
          <input
            type="checkbox"
            checked={filters.inStock === true}
            onChange={() => updateFilter('inStock', filters.inStock ? undefined : true)}
            className="filter-sidebar__checkbox"
          />
          <span>In Stock Only</span>
        </label>
      </FilterSection>

      {/* Platform */}
      <FilterSection
        title="Platform"
        isOpen={expandedSections.has('platform')}
        onToggle={() => toggleSection('platform')}
      >
        {platforms.map((platform) => (
          <label key={platform} className="filter-sidebar__checkbox-label">
            <input
              type="checkbox"
              checked={(filters.platform || []).includes(platform)}
              onChange={() => toggleArrayFilter('platform', platform)}
              className="filter-sidebar__checkbox"
            />
            <span>{platform}</span>
          </label>
        ))}
      </FilterSection>

      {/* Condition */}
      <FilterSection
        title="Condition"
        isOpen={expandedSections.has('condition')}
        onToggle={() => toggleSection('condition')}
      >
        {['new', 'used', 'refurbished', 'pre-owned'].map((cond) => (
          <label key={cond} className="filter-sidebar__checkbox-label">
            <input
              type="checkbox"
              checked={(filters.condition || []).includes(cond as ProductFilters['condition'] extends (infer U)[] | undefined ? U : never)}
              onChange={() => toggleArrayFilter('condition', cond)}
              className="filter-sidebar__checkbox"
            />
            <span style={{ textTransform: 'capitalize' }}>{cond.replace('-', ' ')}</span>
          </label>
        ))}
      </FilterSection>

      {/* Quick Filters */}
      <FilterSection
        title="Quick Filters"
        isOpen={expandedSections.has('quick')}
        onToggle={() => toggleSection('quick')}
      >
        <label className="filter-sidebar__checkbox-label">
          <input
            type="checkbox"
            checked={!!filters.featured}
            onChange={() => updateFilter('featured', !filters.featured || undefined)}
            className="filter-sidebar__checkbox"
          />
          <span>Featured</span>
        </label>
        <label className="filter-sidebar__checkbox-label">
          <input
            type="checkbox"
            checked={!!filters.bestseller}
            onChange={() => updateFilter('bestseller', !filters.bestseller || undefined)}
            className="filter-sidebar__checkbox"
          />
          <span>Best Sellers</span>
        </label>
        <label className="filter-sidebar__checkbox-label">
          <input
            type="checkbox"
            checked={!!filters.isNew}
            onChange={() => updateFilter('isNew', !filters.isNew || undefined)}
            className="filter-sidebar__checkbox"
          />
          <span>New Arrivals</span>
        </label>
      </FilterSection>
    </aside>
  );
}

// ─── Collapsible Section ───
function FilterSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="filter-sidebar__section">
      <button
        className="filter-sidebar__section-header"
        onClick={onToggle}
        type="button"
      >
        <span>{title}</span>
        {isOpen ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
      </button>
      {isOpen && <div className="filter-sidebar__section-body">{children}</div>}
    </div>
  );
}

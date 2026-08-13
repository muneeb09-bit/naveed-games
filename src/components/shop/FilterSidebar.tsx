'use client';

import { useState, useMemo } from 'react';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';
import { getAvailablePlatforms } from '@/data/products';
import type { ProductFilters } from '@/types';
import {
  CaretDown,
  X,
  Funnel,
  Check,
  Tag,
  CurrencyCircleDollar,
  Sparkle,
  Lightning,
  Flame,
  CheckCircle,
} from '@phosphor-icons/react';

interface FilterSidebarProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  productCount: number;
  categorySlug?: string;
  hideHeader?: boolean;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  productCount,
  categorySlug,
  hideHeader = false,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['category', 'brand', 'price', 'availability', 'platform', 'quick'])
  );

  const allPlatforms = useMemo(() => getAvailablePlatforms(), []);

  // Filter relevant brands dynamically by category context
  const filteredBrands = useMemo(() => {
    if (!categorySlug) return brands;
    const cat = categorySlug.toLowerCase();

    if (cat.includes('dji') || cat.includes('drone') || cat.includes('camera')) {
      return brands.filter((b) => ['dji', 'gopro', 'sony'].includes(b.slug));
    }
    if (cat.includes('phone') || cat.includes('laptop') || cat.includes('smart')) {
      return brands.filter((b) => ['samsung', 'huawei', 'lenovo', 'meta', 'apple'].includes(b.slug));
    }
    if (cat.includes('racing') || cat.includes('rc') || cat.includes('traxxas')) {
      return brands.filter((b) => ['traxxas', 'logitech', 'thrustmaster', 'pxn'].includes(b.slug));
    }
    if (cat.includes('playstation') || cat.includes('ps5') || cat.includes('ps4')) {
      return brands.filter((b) => ['playstation', 'sony'].includes(b.slug));
    }
    if (cat.includes('xbox')) {
      return brands.filter((b) => ['xbox', 'microsoft'].includes(b.slug));
    }
    if (cat.includes('nintendo') || cat.includes('switch')) {
      return brands.filter((b) => ['nintendo'].includes(b.slug));
    }
    return brands;
  }, [categorySlug]);

  // Filter relevant platforms dynamically by category context
  const showPlatformFilter = useMemo(() => {
    if (!categorySlug) return true;
    const cat = categorySlug.toLowerCase();
    return (
      cat.includes('game') ||
      cat.includes('console') ||
      cat.includes('controller') ||
      cat.includes('handheld')
    );
  }, [categorySlug]);

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

  const activeFilterCount = [
    filters.brand?.length || 0,
    filters.platform?.length || 0,
    filters.condition?.length || 0,
    filters.priceMin ? 1 : 0,
    filters.priceMax ? 1 : 0,
    filters.inStock !== undefined ? 1 : 0,
    filters.featured ? 1 : 0,
    filters.bestseller ? 1 : 0,
    filters.isNew ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <aside className="filter-sidebar">
      {/* Sidebar Header */}
      {!hideHeader && (
        <div className="filter-sidebar__header">
          <div className="filter-sidebar__title-wrap">
            <Funnel size={18} weight="bold" className="filter-sidebar__icon" />
            <h3 className="filter-sidebar__title">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="filter-sidebar__active-badge">{activeFilterCount}</span>
            )}
          </div>
          {hasActiveFilters && (
            <button
              className="filter-sidebar__clear"
              onClick={clearAllFilters}
              type="button"
              title="Reset all filters"
            >
              <X size={12} weight="bold" />
              Clear
            </button>
          )}
        </div>
      )}

      {/* Category Filter */}
      {!categorySlug && (
        <FilterSection
          title="Category"
          icon={<Tag size={15} weight="bold" />}
          isOpen={expandedSections.has('category')}
          onToggle={() => toggleSection('category')}
          activeCount={filters.category ? 1 : 0}
        >
          <div className="filter-sidebar__options-grid">
            {categories.map((cat) => {
              const isSelected = filters.category === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  className={`filter-sidebar__chip ${isSelected ? 'filter-sidebar__chip--active' : ''}`}
                  onClick={() =>
                    updateFilter('category', isSelected ? undefined : cat.slug)
                  }
                >
                  <span>{cat.name}</span>
                  {isSelected && <Check size={12} weight="bold" />}
                </button>
              );
            })}
          </div>
        </FilterSection>
      )}

      {/* Relevant Brand Filter */}
      {filteredBrands.length > 0 && (
        <FilterSection
          title="Brand"
          icon={<Sparkle size={15} weight="bold" />}
          isOpen={expandedSections.has('brand')}
          onToggle={() => toggleSection('brand')}
          activeCount={filters.brand?.length || 0}
        >
          <div className="filter-sidebar__options-chips">
            {filteredBrands.map((brand) => {
              const isChecked = (filters.brand || []).includes(brand.slug);
              return (
                <button
                  key={brand.slug}
                  type="button"
                  className={`filter-sidebar__chip ${isChecked ? 'filter-sidebar__chip--active' : ''}`}
                  onClick={() => toggleArrayFilter('brand', brand.slug)}
                >
                  <span>{brand.name}</span>
                  {isChecked && <Check size={12} weight="bold" />}
                </button>
              );
            })}
          </div>
        </FilterSection>
      )}

      {/* Price Range */}
      <FilterSection
        title="Price Range"
        icon={<CurrencyCircleDollar size={15} weight="bold" />}
        isOpen={expandedSections.has('price')}
        onToggle={() => toggleSection('price')}
        activeCount={filters.priceMin || filters.priceMax ? 1 : 0}
      >
        <div className="filter-sidebar__price-inputs">
          <div className="filter-sidebar__price-field">
            <span className="filter-sidebar__price-symbol">Rs</span>
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin || ''}
              onChange={(e) =>
                updateFilter(
                  'priceMin',
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="filter-sidebar__price-input"
            />
          </div>
          <span className="filter-sidebar__price-separator">—</span>
          <div className="filter-sidebar__price-field">
            <span className="filter-sidebar__price-symbol">Rs</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax || ''}
              onChange={(e) =>
                updateFilter(
                  'priceMax',
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="filter-sidebar__price-input"
            />
          </div>
        </div>

        <div className="filter-sidebar__price-presets">
          {[
            { label: '< 50K', min: undefined, max: 50000 },
            { label: '50K – 150K', min: 50000, max: 150000 },
            { label: '150K – 300K', min: 150000, max: 300000 },
            { label: '300K+', min: 300000, max: undefined },
          ].map((preset) => {
            const isActive =
              filters.priceMin === preset.min && filters.priceMax === preset.max;
            return (
              <button
                key={preset.label}
                className={`filter-sidebar__preset-btn ${isActive ? 'filter-sidebar__preset-btn--active' : ''}`}
                onClick={() => {
                  onFilterChange({
                    ...filters,
                    priceMin: preset.min,
                    priceMax: preset.max,
                  });
                }}
                type="button"
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Availability Switch */}
      <FilterSection
        title="Availability"
        icon={<CheckCircle size={15} weight="bold" />}
        isOpen={expandedSections.has('availability')}
        onToggle={() => toggleSection('availability')}
        activeCount={filters.inStock ? 1 : 0}
      >
        <button
          type="button"
          className="filter-sidebar__toggle-row"
          onClick={() => updateFilter('inStock', filters.inStock ? undefined : true)}
        >
          <span className="filter-sidebar__toggle-label">In Stock Only</span>
          <div
            className={`filter-sidebar__switch ${filters.inStock ? 'filter-sidebar__switch--on' : ''}`}
          >
            <div className="filter-sidebar__switch-handle" />
          </div>
        </button>
      </FilterSection>

      {/* Platform Filter (Only shown when relevant for gaming categories) */}
      {showPlatformFilter && (
        <FilterSection
          title="Platform"
          icon={<Lightning size={15} weight="bold" />}
          isOpen={expandedSections.has('platform')}
          onToggle={() => toggleSection('platform')}
          activeCount={filters.platform?.length || 0}
        >
          <div className="filter-sidebar__options-chips">
            {allPlatforms.map((platform) => {
              const isChecked = (filters.platform || []).includes(platform);
              return (
                <button
                  key={platform}
                  type="button"
                  className={`filter-sidebar__chip ${isChecked ? 'filter-sidebar__chip--active' : ''}`}
                  onClick={() => toggleArrayFilter('platform', platform)}
                >
                  <span>{platform}</span>
                  {isChecked && <Check size={12} weight="bold" />}
                </button>
              );
            })}
          </div>
        </FilterSection>
      )}

      {/* Condition */}
      <FilterSection
        title="Condition"
        icon={<Sparkle size={15} weight="bold" />}
        isOpen={expandedSections.has('condition')}
        onToggle={() => toggleSection('condition')}
        activeCount={filters.condition?.length || 0}
      >
        <div className="filter-sidebar__options-chips">
          {['new', 'used', 'refurbished', 'pre-owned'].map((cond) => {
            const isChecked = (filters.condition || []).includes(
              cond as ProductFilters['condition'] extends (infer U)[] | undefined
                ? U
                : never
            );
            return (
              <button
                key={cond}
                type="button"
                className={`filter-sidebar__chip ${isChecked ? 'filter-sidebar__chip--active' : ''}`}
                onClick={() => toggleArrayFilter('condition', cond)}
              >
                <span style={{ textTransform: 'capitalize' }}>
                  {cond.replace('-', ' ')}
                </span>
                {isChecked && <Check size={12} weight="bold" />}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Quick Badges */}
      <FilterSection
        title="Badges"
        icon={<Flame size={15} weight="bold" />}
        isOpen={expandedSections.has('quick')}
        onToggle={() => toggleSection('quick')}
        activeCount={
          (filters.featured ? 1 : 0) +
          (filters.bestseller ? 1 : 0) +
          (filters.isNew ? 1 : 0)
        }
      >
        <div className="filter-sidebar__quick-badges">
          <button
            type="button"
            className={`filter-sidebar__badge-btn ${filters.featured ? 'filter-sidebar__badge-btn--active' : ''}`}
            onClick={() =>
              updateFilter('featured', !filters.featured || undefined)
            }
          >
            ⭐ Featured
          </button>
          <button
            type="button"
            className={`filter-sidebar__badge-btn ${filters.bestseller ? 'filter-sidebar__badge-btn--active' : ''}`}
            onClick={() =>
              updateFilter('bestseller', !filters.bestseller || undefined)
            }
          >
            🏆 Best Sellers
          </button>
          <button
            type="button"
            className={`filter-sidebar__badge-btn ${filters.isNew ? 'filter-sidebar__badge-btn--active' : ''}`}
            onClick={() =>
              updateFilter('isNew', !filters.isNew || undefined)
            }
          >
            🆕 New Arrivals
          </button>
        </div>
      </FilterSection>
    </aside>
  );
}

function FilterSection({
  title,
  icon,
  isOpen,
  onToggle,
  activeCount,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  activeCount?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="filter-sidebar__section">
      <button
        className="filter-sidebar__section-header"
        onClick={onToggle}
        type="button"
      >
        <div className="filter-sidebar__section-title">
          <span className="filter-sidebar__section-icon">{icon}</span>
          <span>{title}</span>
          {activeCount && activeCount > 0 ? (
            <span className="filter-sidebar__section-badge">{activeCount}</span>
          ) : null}
        </div>
        <CaretDown
          size={14}
          weight="bold"
          className={`filter-sidebar__caret ${isOpen ? 'filter-sidebar__caret--open' : ''}`}
        />
      </button>
      {isOpen && <div className="filter-sidebar__section-body">{children}</div>}
    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { brands } from '@/data/brands';
import { getAvailablePlatforms } from '@/data/products';
import { departments } from '@/data/departments';
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
  MagnifyingGlass,
} from '@phosphor-icons/react';

interface FilterSidebarProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  productCount: number;
  categorySlug?: string;
  departmentSlug?: string;
  hideHeader?: boolean;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  productCount,
  categorySlug,
  departmentSlug,
  hideHeader = false,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['category', 'brand', 'price', 'availability', 'platform', 'quick'])
  );

  const allPlatforms = useMemo(() => getAvailablePlatforms(), []);

  // Context-aware dynamic brand filtering based on current category / department
  const dynamicBrands = useMemo(() => {
    const slug = (categorySlug || departmentSlug || '').toLowerCase();

    if (slug.includes('drone') || slug.includes('creator') || slug.includes('camera') || slug.includes('vlog')) {
      return brands.filter((b) => ['dji', 'sony'].includes(b.slug));
    }
    if (slug.includes('smart') || slug.includes('vr') || slug.includes('robot') || slug.includes('glasses') || slug.includes('phone')) {
      return brands.filter((b) => ['meta', 'ray-ban', 'livingai', 'keyi-tech', 'samsung', 'huawei'].includes(b.slug));
    }
    if (slug.includes('racing') || slug.includes('rc') || slug.includes('wheel') || slug.includes('seat')) {
      return brands.filter((b) => ['traxxas', 'logitech', 'thrustmaster', 'playseat', 'pxn'].includes(b.slug));
    }
    if (slug.includes('playstation') || slug.includes('ps5')) {
      return brands.filter((b) => ['playstation', 'sony', 'scuf'].includes(b.slug));
    }
    if (slug.includes('xbox')) {
      return brands.filter((b) => ['xbox', 'scuf'].includes(b.slug));
    }
    if (slug.includes('nintendo') || slug.includes('switch')) {
      return brands.filter((b) => ['nintendo'].includes(b.slug));
    }
    if (slug.includes('handheld')) {
      return brands.filter((b) => ['lenovo', 'asus', 'nintendo'].includes(b.slug));
    }

    return brands;
  }, [categorySlug, departmentSlug]);

  // Show platform filter only when relevant for gaming/handheld categories
  const showPlatformFilter = useMemo(() => {
    if (!categorySlug && !departmentSlug) return true;
    const slug = (categorySlug || departmentSlug || '').toLowerCase();
    return (
      slug.includes('game') ||
      slug.includes('playstation') ||
      slug.includes('xbox') ||
      slug.includes('nintendo') ||
      slug.includes('controller') ||
      slug.includes('handheld') ||
      slug.includes('vr')
    );
  }, [categorySlug, departmentSlug]);

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
              title="Reset all active filters"
            >
              <X size={12} weight="bold" />
              Clear All
            </button>
          )}
        </div>
      )}

      {/* Search Filter Input */}
      <div className="filter-sidebar__search-wrap">
        <MagnifyingGlass size={16} weight="bold" style={{ color: 'var(--accent)' }} />
        <input
          type="text"
          placeholder="Filter by keyword..."
          value={filters.search || ''}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value || undefined })
          }
          className="filter-sidebar__search-input"
        />
        {filters.search && (
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, search: undefined })}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--muted)',
              cursor: 'pointer',
              display: 'flex',
              padding: '2px',
            }}
            aria-label="Clear keyword"
          >
            <X size={14} weight="bold" />
          </button>
        )}
      </div>

      {/* Department & Category Quick Filters (shown when on root /shop) */}
      {!categorySlug && (
        <FilterSection
          title="Departments"
          icon={<Tag size={15} weight="bold" />}
          isOpen={expandedSections.has('category')}
          onToggle={() => toggleSection('category')}
          activeCount={filters.category ? 1 : 0}
        >
          <div className="filter-sidebar__options-grid">
            {departments.map((dept) => {
              const isSelected = filters.category === dept.slug;
              return (
                <button
                  key={dept.slug}
                  type="button"
                  className={`filter-sidebar__chip ${isSelected ? 'filter-sidebar__chip--active' : ''}`}
                  onClick={() =>
                    updateFilter('category', isSelected ? undefined : dept.slug)
                  }
                >
                  <span>{dept.name}</span>
                  {isSelected && <Check size={12} weight="bold" />}
                </button>
              );
            })}
          </div>
        </FilterSection>
      )}

      {/* Relevant Brand Filters */}
      {dynamicBrands.length > 0 && (
        <FilterSection
          title="Brand"
          icon={<Sparkle size={15} weight="bold" />}
          isOpen={expandedSections.has('brand')}
          onToggle={() => toggleSection('brand')}
          activeCount={filters.brand?.length || 0}
        >
          <div className="filter-sidebar__options-chips">
            {dynamicBrands.map((brand) => {
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

      {/* Price Range Filter & Quick Presets */}
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

      {/* In-Stock Toggle */}
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

      {/* Gaming Platform Filter */}
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

      {/* Condition (New vs Certified Pre-Owned) */}
      <FilterSection
        title="Condition"
        icon={<Sparkle size={15} weight="bold" />}
        isOpen={expandedSections.has('condition')}
        onToggle={() => toggleSection('condition')}
        activeCount={filters.condition?.length || 0}
      >
        <div className="filter-sidebar__options-chips">
          {['new', 'used', 'refurbished', 'pre-owned'].map((cond) => {
            const isChecked = (filters.condition || []).includes(cond as any);
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

      {/* Highlights & Badges */}
      <FilterSection
        title="Highlights"
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

'use client';

import { X, Funnel, Trash } from '@phosphor-icons/react';
import type { ProductFilters } from '@/types';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';

interface ActiveFiltersProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  categorySlug?: string;
}

export function ActiveFilters({ filters, onFilterChange, categorySlug }: ActiveFiltersProps) {
  const pills: { key: string; label: string; group: string; onRemove: () => void }[] = [];

  if (filters.category && !categorySlug) {
    const cat = categories.find((c) => c.slug === filters.category);
    if (cat) {
      pills.push({
        key: `cat-${filters.category}`,
        group: 'Category',
        label: cat.name,
        onRemove: () => onFilterChange({ ...filters, category: undefined }),
      });
    }
  }

  if (filters.brand) {
    for (const b of filters.brand) {
      const brand = brands.find((br) => br.slug === b);
      pills.push({
        key: `brand-${b}`,
        group: 'Brand',
        label: brand?.name || b,
        onRemove: () => {
          const next = filters.brand!.filter((x) => x !== b);
          onFilterChange({ ...filters, brand: next.length > 0 ? next : undefined });
        },
      });
    }
  }

  if (filters.platform) {
    for (const p of filters.platform) {
      pills.push({
        key: `platform-${p}`,
        group: 'Platform',
        label: p,
        onRemove: () => {
          const next = filters.platform!.filter((x) => x !== p);
          onFilterChange({ ...filters, platform: next.length > 0 ? next : undefined });
        },
      });
    }
  }

  if (filters.priceMin || filters.priceMax) {
    const label = filters.priceMin && filters.priceMax
      ? `Rs. ${filters.priceMin.toLocaleString()} – Rs. ${filters.priceMax.toLocaleString()}`
      : filters.priceMin
        ? `Rs. ${filters.priceMin.toLocaleString()}+`
        : `Under Rs. ${filters.priceMax!.toLocaleString()}`;
    pills.push({
      key: 'price',
      group: 'Price',
      label,
      onRemove: () => onFilterChange({ ...filters, priceMin: undefined, priceMax: undefined }),
    });
  }

  if (filters.inStock) {
    pills.push({
      key: 'instock',
      group: 'Stock',
      label: 'In Stock Only',
      onRemove: () => onFilterChange({ ...filters, inStock: undefined }),
    });
  }

  if (filters.featured) {
    pills.push({
      key: 'featured',
      group: 'Tag',
      label: 'Featured',
      onRemove: () => onFilterChange({ ...filters, featured: undefined }),
    });
  }

  if (filters.bestseller) {
    pills.push({
      key: 'bestseller',
      group: 'Tag',
      label: 'Best Sellers',
      onRemove: () => onFilterChange({ ...filters, bestseller: undefined }),
    });
  }

  if (filters.isNew) {
    pills.push({
      key: 'new',
      group: 'Tag',
      label: 'New Arrivals',
      onRemove: () => onFilterChange({ ...filters, isNew: undefined }),
    });
  }

  if (pills.length === 0) return null;

  return (
    <div className="active-filters">
      <div className="active-filters__label">
        <Funnel size={13} weight="bold" />
        <span>Active Filters:</span>
      </div>
      <div className="active-filters__list">
        {pills.map((pill) => (
          <button
            key={pill.key}
            className="active-filters__pill"
            onClick={pill.onRemove}
            type="button"
          >
            <span className="active-filters__pill-group">{pill.group}:</span>
            <span className="active-filters__pill-value">{pill.label}</span>
            <X size={10} weight="bold" className="active-filters__pill-close" />
          </button>
        ))}

        {pills.length > 1 && (
          <button
            className="active-filters__clear-all"
            onClick={() => onFilterChange({ category: categorySlug })}
            type="button"
          >
            <Trash size={12} weight="bold" />
            <span>Reset All</span>
          </button>
        )}
      </div>
    </div>
  );
}

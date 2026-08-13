'use client';

import { X } from '@phosphor-icons/react';
import type { ProductFilters } from '@/types';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';

interface ActiveFiltersProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  categorySlug?: string;
}

export function ActiveFilters({ filters, onFilterChange, categorySlug }: ActiveFiltersProps) {
  const pills: { key: string; label: string; onRemove: () => void }[] = [];

  if (filters.category && !categorySlug) {
    const cat = categories.find((c) => c.slug === filters.category);
    if (cat) {
      pills.push({
        key: `cat-${filters.category}`,
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
      label,
      onRemove: () => onFilterChange({ ...filters, priceMin: undefined, priceMax: undefined }),
    });
  }

  if (filters.inStock) {
    pills.push({
      key: 'instock',
      label: 'In Stock',
      onRemove: () => onFilterChange({ ...filters, inStock: undefined }),
    });
  }

  if (filters.featured) {
    pills.push({
      key: 'featured',
      label: 'Featured',
      onRemove: () => onFilterChange({ ...filters, featured: undefined }),
    });
  }

  if (filters.isNew) {
    pills.push({
      key: 'new',
      label: 'New Arrivals',
      onRemove: () => onFilterChange({ ...filters, isNew: undefined }),
    });
  }

  if (pills.length === 0) return null;

  return (
    <div className="active-filters">
      {pills.map((pill) => (
        <button
          key={pill.key}
          className="active-filters__pill"
          onClick={pill.onRemove}
          type="button"
        >
          {pill.label}
          <X size={10} weight="bold" />
        </button>
      ))}
      {pills.length > 1 && (
        <button
          className="active-filters__clear-all"
          onClick={() => onFilterChange({ category: categorySlug })}
          type="button"
        >
          Clear All
        </button>
      )}
    </div>
  );
}

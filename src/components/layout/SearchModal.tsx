'use client';

import { useEffect, useRef, useState } from 'react';
import { MagnifyingGlass, X, CaretRight, Sparkle, Tag, Folder } from '@phosphor-icons/react';
import { searchProducts, formatPrice } from '@/data/products';
import { brands } from '@/data/brands';
import { departments } from '@/data/departments';
import Link from 'next/link';

interface SearchModalProps {
  onClose: () => void;
}

export function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const rawQuery = query.toLowerCase().trim();
  const results = rawQuery.length >= 2 ? searchProducts(query) : [];

  // Find matching categories & departments
  const matchingCategories = rawQuery.length >= 2
    ? departments
        .flatMap((d) => [
          { name: `${d.name} (Department)`, slug: d.slug, type: 'dept' },
          ...d.categories.map((c) => ({ name: `${c.name} (${d.name})`, slug: c.slug, type: 'cat' })),
        ])
        .filter((item) => item.name.toLowerCase().includes(rawQuery) || item.slug.includes(rawQuery))
        .slice(0, 3)
    : [];

  // Find matching brands
  const matchingBrands = rawQuery.length >= 2
    ? brands
        .filter((b) => b.name.toLowerCase().includes(rawQuery) || b.slug.includes(rawQuery))
        .slice(0, 3)
    : [];

  return (
    <div className="search-modal-overlay" onClick={onClose} role="dialog" aria-label="Search Catalog">
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-modal__input-wrap">
          <MagnifyingGlass size={20} weight="bold" style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            className="search-modal__input"
            type="text"
            placeholder="Search PS5 Pro, DJI Drones, Meta Quest, Traxxas, Sim Wheels..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Clear search"
              type="button"
            >
              <X size={16} weight="bold" />
            </button>
          )}
          <button
            onClick={onClose}
            className="search-modal__close-btn"
            aria-label="Close search"
            type="button"
          >
            <kbd className="header__search-kbd">ESC</kbd>
          </button>
        </div>

        {/* Section 1: Matching Categories & Brands (Quick Jumps) */}
        {(matchingCategories.length > 0 || matchingBrands.length > 0) && (
          <div className="search-modal__quick-matches">
            <div className="search-modal__section-heading">Matching Collections</div>
            <div className="search-modal__quick-pills">
              {matchingCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop/${c.slug}`}
                  className="search-modal__quick-pill"
                  onClick={onClose}
                >
                  <Folder size={14} weight="fill" style={{ color: 'var(--accent)' }} />
                  <span>{c.name}</span>
                </Link>
              ))}
              {matchingBrands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/brand/${b.slug}`}
                  className="search-modal__quick-pill search-modal__quick-pill--brand"
                  onClick={onClose}
                >
                  <Tag size={14} weight="fill" style={{ color: 'var(--warning)' }} />
                  <span>{b.name} Official</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Matching Product Results */}
        {results.length > 0 && (
          <div className="search-modal__results">
            <div className="search-modal__section-heading">
              Products ({results.length})
            </div>
            {results.slice(0, 7).map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="search-modal__result-item"
                onClick={onClose}
              >
                <div className="search-modal__result-image">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  <span className="search-modal__result-brand-fallback">
                    {product.brand}
                  </span>
                </div>
                <div className="search-modal__result-info">
                  <div className="search-modal__result-meta">
                    <span className="search-modal__result-brand">{product.brand}</span>
                    {product.platform && (
                      <span className="search-modal__result-platform">{product.platform}</span>
                    )}
                  </div>
                  <div className="search-modal__result-name">{product.name}</div>
                  <div className="search-modal__result-price">
                    {formatPrice(product.price)}
                    {product.originalPrice && (
                      <span className="search-modal__result-orig">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <CaretRight size={16} weight="bold" style={{ color: 'var(--muted)', flexShrink: 0 }} />
              </Link>
            ))}

            {results.length > 7 && (
              <Link
                href={`/shop?search=${encodeURIComponent(query)}`}
                className="search-modal__view-all"
                onClick={onClose}
              >
                View all {results.length} results in Catalog →
              </Link>
            )}
          </div>
        )}

        {/* Empty State */}
        {rawQuery.length >= 2 && results.length === 0 && matchingCategories.length === 0 && matchingBrands.length === 0 && (
          <div className="search-modal__empty">
            <MagnifyingGlass size={36} weight="thin" style={{ color: 'var(--muted)', margin: '0 auto 12px' }} />
            <div className="search-modal__empty-title">No products found for "{query}"</div>
            <p className="search-modal__empty-desc">
              Check for spelling errors or try searching for generic terms like "PS5", "Drone", "VR", or "Traxxas".
            </p>
          </div>
        )}

        {/* Initial / Suggested Queries State */}
        {rawQuery.length < 2 && (
          <div className="search-modal__suggestions">
            <div className="search-modal__section-heading">
              <Sparkle size={13} weight="fill" style={{ color: 'var(--accent)', display: 'inline', marginRight: '6px' }} />
              Trending & Popular Searches
            </div>
            <div className="search-modal__pills">
              {[
                'PS5 Pro',
                'DJI Mini 4 Pro',
                'Meta Quest 3',
                'Ray-Ban Meta',
                'Traxxas 8S',
                'Logitech G923',
                'Steam Deck OLED',
                'EMO AI Robot',
                'Galaxy S24 Ultra',
                'Switch OLED',
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  type="button"
                  className="search-modal__pill"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

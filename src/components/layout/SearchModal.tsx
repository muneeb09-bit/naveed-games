'use client';

import { useEffect, useRef, useState } from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { searchProducts, formatPrice } from '@/data/products';
import Link from 'next/link';

interface SearchModalProps {
  onClose: () => void;
}

export function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const results = query.length >= 2 ? searchProducts(query) : [];

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

  return (
    <div className="search-modal-overlay" onClick={onClose} role="dialog" aria-label="Search">
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal__input-wrap">
          <MagnifyingGlass size={20} weight="bold" style={{ color: 'var(--muted)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            className="search-modal__input"
            type="text"
            placeholder="Search products, brands, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--muted)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label="Close search"
            type="button"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {results.length > 0 && (
          <div className="search-modal__results">
            {results.slice(0, 8).map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="search-modal__result-item"
                onClick={onClose}
              >
                <div
                  className="search-modal__result-image"
                  style={{ background: 'var(--graphite-light)' }}
                />
                <div className="search-modal__result-info">
                  <div className="search-modal__result-name">
                    {product.name}
                  </div>
                  <div className="search-modal__result-price">
                    {formatPrice(product.price)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div
            style={{
              padding: 'var(--space-2xl)',
              textAlign: 'center',
              color: 'var(--muted)',
              fontSize: '0.875rem',
            }}
          >
            No products found for "{query}"
          </div>
        )}

        {query.length < 2 && (
          <div
            style={{
              padding: 'var(--space-lg)',
              color: 'var(--muted)',
              fontSize: '0.8125rem',
            }}
          >
            <div style={{ marginBottom: 'var(--space-md)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.6875rem' }}>
              Popular searches
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['PS5', 'RTX 4070', 'Steam Deck', 'Racing Wheel', 'Gaming Chair', 'GTA VI'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  type="button"
                  style={{
                    padding: '4px 12px',
                    background: 'var(--graphite-light)',
                    border: '1px solid var(--graphite-border)',
                    borderRadius: '4px',
                    color: 'var(--muted-light)',
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                  }}
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

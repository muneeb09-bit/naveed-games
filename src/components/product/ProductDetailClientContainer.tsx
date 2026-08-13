'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { ProductDetailClient } from './ProductDetailClient';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types';

interface ProductDetailClientContainerProps {
  slug: string;
  initialProduct?: Product;
}

export function ProductDetailClientContainer({
  slug,
  initialProduct,
}: ProductDetailClientContainerProps) {
  const [product, setProduct] = useState<Product | undefined>(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      setLoading(false);
      return;
    }

    // Attempt client-side hydration from localStorage if server couldn't locate it
    let found: Product | undefined = products.find((p) => p.slug === slug);

    if (!found && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('ng_custom_products');
        if (stored) {
          const customList: Product[] = JSON.parse(stored);
          found = customList.find((p) => p.slug === slug || p.id === slug);
        }
      } catch {
        // Ignore
      }
    }

    if (found) {
      setProduct(found);
      const rel = products
        .filter((p) => p.categorySlug === found!.categorySlug && p.id !== found!.id)
        .slice(0, 4);
      setRelated(rel);
    }
    setLoading(false);
  }, [slug, initialProduct]);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
        Loading product details...
      </div>
    );
  }

  if (!product) {
    notFound();
    return null;
  }

  return (
    <>
      <ProductDetailClient product={product} relatedProducts={related} />

      {related.length > 0 && (
        <section className="section" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="container">
            <h2 className="section__title" style={{ marginBottom: 'var(--space-xl)' }}>
              Related Products
            </h2>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

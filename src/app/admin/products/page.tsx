'use client';

import { useState, useEffect } from 'react';
import { products as initialProducts, formatPrice } from '@/data/products';
import { categories } from '@/data/categories';
import { createClient } from '@/lib/supabase/client';
import { Plus, MagnifyingGlass, Pencil, Trash, Copy, Archive } from '@phosphor-icons/react';
import Link from 'next/link';
import type { Product } from '@/types';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    async function loadProducts() {
      try {
        const supabase = createClient();
        if (!supabase) return;

        const { data: dbProducts, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && dbProducts && dbProducts.length > 0) {
          const mapped: Product[] = dbProducts.map((data: Record<string, unknown>) => ({
            id: data.id as string,
            slug: data.slug as string,
            name: data.name as string,
            brand: (data.brand_name as string) || 'Naveed Games',
            category: data.category_slug as string,
            categorySlug: data.category_slug as string,
            price: Number(data.price),
            originalPrice: data.original_price ? Number(data.original_price) : undefined,
            discount: data.discount as number | undefined,
            description: data.description as string,
            shortDescription: data.short_description as string,
            images: (data.images as string[]) || [],
            rating: Number(data.rating || 5),
            reviewCount: (data.review_count as number) || 0,
            inStock: data.in_stock as boolean,
            stockQuantity: data.stock_quantity as number,
            sku: data.sku as string,
            featured: data.featured as boolean,
            bestseller: data.bestseller as boolean,
            isNew: data.is_new as boolean,
            condition: (data.condition as Product['condition']) || 'new',
            platform: data.platform as string | undefined,
            specs: (data.specs as Product['specs']) || [],
            tags: (data.tags as string[]) || [],
            warranty: data.warranty as string | undefined,
            deliveryInfo: data.delivery_info as string | undefined,
            status: (data.status as Product['status']) || 'published',
          }));

          // Deduplicate by slug (prefer DB versions)
          const dbSlugs = new Set(mapped.map((p) => p.slug));
          const localOnly = initialProducts.filter((p) => !dbSlugs.has(p.slug));
          setProductList([...mapped, ...localOnly]);
        }
      } catch (err) {
        console.warn('Could not fetch Supabase products catalog:', err);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = productList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || p.categorySlug === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' || (p.status || 'published') === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      setProductList(productList.filter((p) => p.id !== id));

      try {
        const supabase = createClient();
        if (supabase && id.length > 15) {
          await supabase.from('products').delete().eq('id', id);
        }
      } catch (err) {
        console.warn('Supabase product delete warning:', err);
      }
    }
  };

  const handleArchive = async (id: string, name: string) => {
    setProductList(
      productList.map((p) =>
        p.id === id ? { ...p, status: 'archived' as const } : p
      )
    );

    try {
      const supabase = createClient();
      if (supabase && id.length > 15) {
        await supabase.from('products').update({ status: 'archived' }).eq('id', id);
      }
    } catch (err) {
      console.warn('Archive warning:', err);
    }
    alert(`"${name}" archived.`);
  };

  const handleDuplicate = (product: Product) => {
    const dup: Product = {
      ...product,
      id: `dup-${Date.now()}`,
      name: `${product.name} (Copy)`,
      slug: `${product.slug}-copy-${Date.now()}`,
      sku: `${product.sku}-COPY`,
      status: 'draft',
    };
    setProductList([dup, ...productList]);
    alert(`"${product.name}" duplicated as draft.`);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; color: string }> = {
      published: { bg: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' },
      draft: { bg: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)' },
      archived: { bg: 'rgba(107, 114, 128, 0.15)', color: 'var(--muted)' },
    };
    const s = styles[status] || styles.published;
    return (
      <span
        style={{
          padding: '4px 10px',
          borderRadius: '4px',
          fontSize: '0.6875rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          background: s.bg,
          color: s.color,
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.02em', color: 'var(--white)' }}>
            Product Catalog
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginTop: '4px' }}>
            {filteredProducts.length} of {productList.length} products
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="button button--primary"
          style={{ height: '40px', padding: '0 16px', fontSize: '0.8125rem' }}
        >
          <Plus size={16} weight="bold" />
          Add Product
        </Link>
      </div>

      {/* Filters Bar */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '24px',
          background: 'var(--bg-secondary)',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <input
            type="text"
            className="checkout__input"
            placeholder="Search by name, brand, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '40px' }}
          />
          <MagnifyingGlass
            size={18}
            weight="bold"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}
          />
        </div>

        <select
          className="checkout__input"
          style={{ width: '200px' }}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
          ))}
        </select>

        <select
          className="checkout__input"
          style={{ width: '150px' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Products Table */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--muted)', textTransform: 'uppercase', fontSize: '0.6875rem', letterSpacing: '0.06em' }}>
                <th style={{ padding: '12px 20px' }}>Product</th>
                <th style={{ padding: '12px 20px' }}>SKU</th>
                <th style={{ padding: '12px 20px' }}>Category</th>
                <th style={{ padding: '12px 20px' }}>Price</th>
                <th style={{ padding: '12px 20px' }}>Stock</th>
                <th style={{ padding: '12px 20px' }}>Status</th>
                <th style={{ padding: '12px 20px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--white)' }}>{p.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{p.brand}</div>
                  </td>
                  <td style={{ padding: '16px 20px', fontFamily: 'monospace', color: 'var(--muted-light)', fontSize: '0.8125rem' }}>
                    {p.sku}
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--muted-light)' }}>
                    {p.categorySlug}
                  </td>
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--white)' }}>
                    {formatPrice(p.price)}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        background: p.stockQuantity <= 3 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                        color: p.stockQuantity <= 3 ? 'var(--warning)' : 'var(--success)',
                      }}
                    >
                      {p.stockQuantity} in stock
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {getStatusBadge(p.status || 'published')}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        style={{ background: 'none', border: 'none', color: 'var(--muted-light)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        title="Edit product"
                      >
                        <Pencil size={16} weight="bold" />
                      </Link>
                      <button
                        style={{ background: 'none', border: 'none', color: 'var(--muted-light)', cursor: 'pointer' }}
                        title="Duplicate product"
                        onClick={() => handleDuplicate(p)}
                        type="button"
                      >
                        <Copy size={16} weight="bold" />
                      </button>
                      <button
                        style={{ background: 'none', border: 'none', color: 'var(--warning)', cursor: 'pointer' }}
                        title="Archive product"
                        onClick={() => handleArchive(p.id, p.name)}
                        type="button"
                      >
                        <Archive size={16} weight="bold" />
                      </button>
                      <button
                        style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}
                        title="Delete product"
                        onClick={() => handleDelete(p.id, p.name)}
                        type="button"
                      >
                        <Trash size={16} weight="bold" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

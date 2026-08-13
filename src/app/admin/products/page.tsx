'use client';

import { useState, useEffect } from 'react';
import { products as initialProducts, formatPrice } from '@/data/products';
import { departments } from '@/data/departments';
import { createClient } from '@/lib/supabase/client';
import { Plus, MagnifyingGlass, Pencil, Trash, Copy, FileText, Check, X, ShieldCheck } from '@phosphor-icons/react';
import Link from 'next/link';
import type { Product } from '@/types';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  useEffect(() => {
    async function loadProducts() {
      let customProds: Product[] = [];
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('ng_custom_products');
          if (stored) customProds = JSON.parse(stored);
        } catch {
          // Ignore
        }
      }

      try {
        const supabase = createClient();
        if (supabase) {
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

            // Deduplicate by slug
            const dbSlugs = new Set(mapped.map((p) => p.slug));
            const seen = new Set<string>();
            const uniqueMapped: Product[] = [];
            mapped.forEach((p) => {
              if (!seen.has(p.slug)) {
                seen.add(p.slug);
                uniqueMapped.push(p);
              }
            });

            const localOnly: Product[] = [];
            [...customProds, ...initialProducts].forEach((p) => {
              if (!dbSlugs.has(p.slug) && !seen.has(p.slug)) {
                seen.add(p.slug);
                localOnly.push(p);
              }
            });

            setProductList([...uniqueMapped, ...localOnly]);
            return;
          }
        }
      } catch (err) {
        console.warn('Could not fetch Supabase products catalog:', err);
      }

      // Fallback: merge custom local storage products with static catalog
      const seen = new Set<string>();
      const combined: Product[] = [];
      [...customProds, ...initialProducts].forEach((p) => {
        if (!seen.has(p.slug)) {
          seen.add(p.slug);
          combined.push(p);
        }
      });
      setProductList(combined);
    }

    loadProducts();
  }, []);

  const filteredProducts = productList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || p.categorySlug === categoryFilter || p.departmentSlug === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' || (p.status || 'published') === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleStockStatus = (productId: string) => {
    const updated = productList.map((p) => {
      if (p.id === productId) {
        const nextInStock = !p.inStock;
        return {
          ...p,
          inStock: nextInStock,
          stockQuantity: nextInStock ? (p.stockQuantity > 0 ? p.stockQuantity : 5) : 0,
        };
      }
      return p;
    });
    setProductList(updated);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ng_custom_products', JSON.stringify(updated));
      } catch {
        // Ignore
      }
    }
  };

  const handleSavePrice = (productId: string) => {
    const newPriceNum = Number(tempPrice);
    if (!newPriceNum || isNaN(newPriceNum) || newPriceNum <= 0) {
      setEditingPriceId(null);
      return;
    }

    const updated = productList.map((p) => {
      if (p.id === productId) {
        return { ...p, price: newPriceNum };
      }
      return p;
    });
    setProductList(updated);
    setEditingPriceId(null);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ng_custom_products', JSON.stringify(updated));
      } catch {
        // Ignore
      }
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Brand', 'Category', 'SKU', 'Price', 'Stock', 'InStock'];
    const rows = filteredProducts.map((p) => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.brand}"`,
      p.categorySlug,
      p.sku,
      p.price,
      p.stockQuantity,
      p.inStock ? 'YES' : 'NO',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `naveed_games_products_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Product Inventory Management
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', marginTop: '4px' }}>
            {filteredProducts.length} items listed across Gaming, Drones, Smart Tech, and Racing RC
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            className="button button--secondary"
            onClick={exportCSV}
            style={{ height: '40px', padding: '0 16px', fontSize: '0.8125rem' }}
          >
            <FileText size={16} weight="bold" />
            Export CSV
          </button>

          <Link href="/admin/products/new" className="button button--primary" style={{ height: '40px', padding: '0 16px', fontSize: '0.8125rem' }}>
            <Plus size={16} weight="bold" />
            Add New Product
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
          <MagnifyingGlass
            size={18}
            weight="bold"
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}
          />
          <input
            type="text"
            placeholder="Search by title, brand, or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="checkout__input"
            style={{ paddingLeft: '40px', height: '44px' }}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="checkout__input"
          style={{ width: 'auto', minWidth: '180px', height: '44px' }}
        >
          <option value="all">All Departments</option>
          {departments.map((d) => (
            <option key={d.slug} value={d.slug}>{d.name}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="checkout__input"
          style={{ width: 'auto', minWidth: '140px', height: '44px' }}
        >
          <option value="all">All Statuses</option>
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
                <th style={{ padding: '14px 20px' }}>Product</th>
                <th style={{ padding: '14px 20px' }}>SKU</th>
                <th style={{ padding: '14px 20px' }}>Price (PKR)</th>
                <th style={{ padding: '14px 20px' }}>Stock Status</th>
                <th style={{ padding: '14px 20px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  {/* Product Details */}
                  <td style={{ padding: '14px 20px', minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '4px', overflow: 'hidden', background: 'var(--graphite-light)', flexShrink: 0 }}>
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : null}
                      </div>
                      <div>
                        <Link href={`/products/${p.slug}`} target="_blank" style={{ fontWeight: 600, color: 'var(--white)', textDecoration: 'none' }}>
                          {p.name}
                        </Link>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                          {p.brand} • {p.categorySlug}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* SKU */}
                  <td style={{ padding: '14px 20px', fontFamily: 'monospace', fontSize: '0.8125rem', color: 'var(--muted-light)' }}>
                    {p.sku}
                  </td>

                  {/* Quick Inline Price Edit */}
                  <td style={{ padding: '14px 20px' }}>
                    {editingPriceId === p.id ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input
                          type="number"
                          value={tempPrice}
                          onChange={(e) => setTempPrice(e.target.value)}
                          className="checkout__input"
                          style={{ width: '110px', height: '32px', padding: '4px 8px', fontSize: '0.8125rem' }}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSavePrice(p.id)}
                          style={{ background: 'var(--success)', border: 'none', borderRadius: '4px', color: 'white', padding: '6px', cursor: 'pointer' }}
                          title="Save price"
                        >
                          <Check size={14} weight="bold" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingPriceId(null)}
                          style={{ background: 'transparent', border: '1px solid var(--graphite-border)', borderRadius: '4px', color: 'var(--muted)', padding: '6px', cursor: 'pointer' }}
                          title="Cancel"
                        >
                          <X size={14} weight="bold" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setEditingPriceId(p.id);
                          setTempPrice(String(p.price));
                        }}
                        style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        title="Click to edit price"
                      >
                        <span style={{ fontWeight: 700, color: 'var(--white)' }}>
                          {formatPrice(p.price)}
                        </span>
                        <Pencil size={12} weight="bold" style={{ color: 'var(--muted)' }} />
                      </div>
                    )}
                  </td>

                  {/* Quick Toggle In-Stock */}
                  <td style={{ padding: '14px 20px' }}>
                    <button
                      type="button"
                      onClick={() => toggleStockStatus(p.id)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        border: 'none',
                        background: p.inStock ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: p.inStock ? 'var(--success)' : 'var(--error)',
                      }}
                      title="Click to toggle In-Stock / Out-of-Stock"
                    >
                      {p.inStock ? `● In Stock (${p.stockQuantity})` : '✕ Sold Out'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="admin-action-btn"
                        title="Full Edit"
                      >
                        <Pencil size={14} weight="bold" />
                      </Link>
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

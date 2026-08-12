'use client';

import { useState } from 'react';
import { products as initialProducts, formatPrice } from '@/data/products';
import { categories } from '@/data/categories';
import { Plus, MagnifyingGlass, Pencil, Trash } from '@phosphor-icons/react';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = productList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || p.categorySlug === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      setProductList(productList.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.02em', color: 'var(--white)' }}>
            Product Catalog Management
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginTop: '4px' }}>
            {filteredProducts.length} of {productList.length} products listed
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
        {/* Search Input */}
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

        {/* Category Filter */}
        <select
          className="checkout__input"
          style={{ width: '200px' }}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
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
                    {p.category}
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
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        style={{ background: 'none', border: 'none', color: 'var(--muted-light)', cursor: 'pointer' }}
                        title="Edit product"
                        onClick={() => alert(`Edit feature for ${p.name}`)}
                        type="button"
                      >
                        <Pencil size={16} weight="bold" />
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

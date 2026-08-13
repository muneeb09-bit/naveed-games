'use client';

import { useState } from 'react';
import Link from 'next/link';
import { brands as localBrands } from '@/data/brands';
import { Plus, PencilSimple, Trash, Eye, EyeSlash } from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';

export default function AdminBrandsPage() {
  const [brandList, setBrandList] = useState(localBrands);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = async (slug: string) => {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.from('brands').delete().eq('slug', slug);
      }
    } catch (err) {
      console.warn('Delete error:', err);
    }
    setBrandList(brandList.filter((b) => b.slug !== slug));
    setDeleteConfirm(null);
  };

  const handleToggleActive = async (slug: string) => {
    setBrandList(
      brandList.map((b) =>
        b.slug === slug ? { ...b, isActive: !b.isActive } : b
      )
    );
    try {
      const supabase = createClient();
      const brand = brandList.find((b) => b.slug === slug);
      if (supabase && brand) {
        await supabase.from('brands').update({ is_active: !brand.isActive }).eq('slug', slug);
      }
    } catch (err) {
      console.warn('Toggle active error:', err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--white)' }}>Brands</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', marginTop: '4px' }}>
            {brandList.length} brands
          </p>
        </div>
        <Link href="/admin/brands/new" className="button button--primary">
          <Plus size={16} weight="bold" /> Add Brand
        </Link>
      </div>

      <div className="admin-table">
        <div className="admin-table__header" style={{ gridTemplateColumns: '2fr 2fr 1fr 1fr 100px' }}>
          <div>Brand</div>
          <div>Description</div>
          <div>Order</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {brandList.map((brand) => (
          <div
            key={brand.slug}
            className="admin-table__row"
            style={{ gridTemplateColumns: '2fr 2fr 1fr 1fr 100px' }}
          >
            <div>
              <div style={{ fontWeight: 600, color: 'var(--white)' }}>{brand.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>/{brand.slug}</div>
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--muted-light)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {brand.description?.slice(0, 60)}...
            </div>
            <div>{brand.sortOrder}</div>
            <div>
              <button
                className={`admin-badge ${brand.isActive ? 'admin-badge--success' : 'admin-badge--muted'}`}
                onClick={() => handleToggleActive(brand.slug)}
                type="button"
                title={brand.isActive ? 'Click to disable' : 'Click to enable'}
              >
                {brand.isActive ? (
                  <><Eye size={12} weight="bold" /> Active</>
                ) : (
                  <><EyeSlash size={12} weight="bold" /> Inactive</>
                )}
              </button>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link href={`/admin/brands/${brand.id}/edit`} className="admin-action-btn" title="Edit">
                <PencilSimple size={14} weight="bold" />
              </Link>
              {deleteConfirm === brand.slug ? (
                <button
                  className="admin-action-btn admin-action-btn--danger"
                  onClick={() => handleDelete(brand.slug)}
                  type="button"
                  title="Confirm delete"
                >
                  ✓
                </button>
              ) : (
                <button
                  className="admin-action-btn admin-action-btn--danger"
                  onClick={() => setDeleteConfirm(brand.slug)}
                  type="button"
                  title="Delete"
                >
                  <Trash size={14} weight="bold" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

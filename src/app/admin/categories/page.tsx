'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories as localCategories } from '@/data/categories';
import { Plus, PencilSimple, Trash, CaretDown, CaretRight, Eye, EyeSlash } from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';

export default function AdminCategoriesPage() {
  const [categoryList, setCategoryList] = useState(localCategories);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const toggleExpand = (slug: string) => {
    const next = new Set(expandedCategories);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    setExpandedCategories(next);
  };

  const handleDelete = async (slug: string) => {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.from('categories').delete().eq('slug', slug);
      }
    } catch (err) {
      console.warn('Delete error:', err);
    }
    setCategoryList(categoryList.filter((c) => c.slug !== slug));
    setDeleteConfirm(null);
  };

  const handleToggleActive = async (slug: string) => {
    setCategoryList(
      categoryList.map((c) =>
        c.slug === slug ? { ...c, isActive: !c.isActive } : c
      )
    );
    try {
      const supabase = createClient();
      const cat = categoryList.find((c) => c.slug === slug);
      if (supabase && cat) {
        await supabase.from('categories').update({ is_active: !cat.isActive }).eq('slug', slug);
      }
    } catch (err) {
      console.warn('Toggle active error:', err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--white)' }}>Categories</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', marginTop: '4px' }}>
            {categoryList.length} parent categories
          </p>
        </div>
        <Link href="/admin/categories/new" className="button button--primary">
          <Plus size={16} weight="bold" /> Add Category
        </Link>
      </div>

      <div className="admin-table">
        <div className="admin-table__header" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 100px' }}>
          <div>Category</div>
          <div>Subcategories</div>
          <div>Products</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {categoryList.map((cat) => (
          <div key={cat.slug}>
            <div
              className="admin-table__row"
              style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 100px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <button
                    className="admin-table__expand"
                    onClick={() => toggleExpand(cat.slug)}
                    type="button"
                    aria-label={`Toggle ${cat.name}`}
                  >
                    {expandedCategories.has(cat.slug) ? (
                      <CaretDown size={12} weight="bold" />
                    ) : (
                      <CaretRight size={12} weight="bold" />
                    )}
                  </button>
                )}
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--white)' }}>{cat.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>/{cat.slug}</div>
                </div>
              </div>
              <div>{cat.subcategories?.length || 0}</div>
              <div>{cat.productCount}</div>
              <div>
                <button
                  className={`admin-badge ${cat.isActive ? 'admin-badge--success' : 'admin-badge--muted'}`}
                  onClick={() => handleToggleActive(cat.slug)}
                  type="button"
                  title={cat.isActive ? 'Click to disable' : 'Click to enable'}
                >
                  {cat.isActive ? (
                    <><Eye size={12} weight="bold" /> Active</>
                  ) : (
                    <><EyeSlash size={12} weight="bold" /> Inactive</>
                  )}
                </button>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link
                  href={`/admin/categories/${cat.id}/edit`}
                  className="admin-action-btn"
                  title="Edit"
                >
                  <PencilSimple size={14} weight="bold" />
                </Link>
                {deleteConfirm === cat.slug ? (
                  <button
                    className="admin-action-btn admin-action-btn--danger"
                    onClick={() => handleDelete(cat.slug)}
                    type="button"
                    title="Confirm delete"
                  >
                    ✓
                  </button>
                ) : (
                  <button
                    className="admin-action-btn admin-action-btn--danger"
                    onClick={() => setDeleteConfirm(cat.slug)}
                    type="button"
                    title="Delete"
                  >
                    <Trash size={14} weight="bold" />
                  </button>
                )}
              </div>
            </div>

            {/* Expanded subcategories */}
            {expandedCategories.has(cat.slug) && cat.subcategories && (
              <div className="admin-table__subcategories">
                {cat.subcategories.map((sub) => (
                  <div
                    key={sub.slug}
                    className="admin-table__row admin-table__row--sub"
                    style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 100px' }}
                  >
                    <div style={{ paddingLeft: '32px' }}>
                      <div style={{ fontWeight: 500, color: 'var(--muted-light)' }}>{sub.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>/{sub.slug}</div>
                    </div>
                    <div>—</div>
                    <div>{sub.productCount}</div>
                    <div>—</div>
                    <div>
                      <Link
                        href={`/admin/categories/${sub.id}/edit`}
                        className="admin-action-btn"
                        title="Edit"
                      >
                        <PencilSimple size={14} weight="bold" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

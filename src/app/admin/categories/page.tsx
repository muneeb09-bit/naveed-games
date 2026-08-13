'use client';

import { useState } from 'react';
import Link from 'next/link';
import { departments } from '@/data/departments';
import { Plus, PencilSimple, Trash, CaretDown, CaretRight, Eye, EyeSlash, Folder } from '@phosphor-icons/react';

export default function AdminCategoriesPage() {
  const [departmentList, setDepartmentList] = useState(departments);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleExpand = (slug: string) => {
    const next = new Set(expandedCategories);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    setExpandedCategories(next);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--white)' }}>Taxonomy & Category Management</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', marginTop: '4px' }}>
            5 Departments • {departmentList.reduce((acc, d) => acc + d.categories.length, 0)} Categories • Subcategories
          </p>
        </div>
        <Link href="/admin/categories/new" className="button button--primary">
          <Plus size={16} weight="bold" /> Add Category
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {departmentList.map((dept) => (
          <div key={dept.id} className="admin-form-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
              <Folder size={20} weight="fill" style={{ color: 'var(--accent)' }} />
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--white)', margin: 0 }}>
                  Department: {dept.name}
                </h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                  {dept.description}
                </span>
              </div>
            </div>

            <div className="admin-table">
              <div className="admin-table__header" style={{ gridTemplateColumns: '2fr 1fr 1fr 100px' }}>
                <div>Category Name</div>
                <div>Subcategories</div>
                <div>Status</div>
                <div>Actions</div>
              </div>

              {dept.categories.map((cat) => (
                <div key={cat.slug}>
                  <div
                    className="admin-table__row"
                    style={{ gridTemplateColumns: '2fr 1fr 1fr 100px' }}
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
                    <div>{cat.subcategories?.length || 0} subcategories</div>
                    <div>
                      <span className="admin-badge admin-badge--success">
                        <Eye size={12} weight="bold" /> Active
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link
                        href={`/admin/categories/${cat.id}/edit`}
                        className="admin-action-btn"
                        title="Edit"
                      >
                        <PencilSimple size={14} weight="bold" />
                      </Link>
                    </div>
                  </div>

                  {/* Expanded subcategories */}
                  {expandedCategories.has(cat.slug) && cat.subcategories && (
                    <div className="admin-table__subcategories">
                      {cat.subcategories.map((sub) => (
                        <div
                          key={sub.slug}
                          className="admin-table__row admin-table__row--sub"
                          style={{ gridTemplateColumns: '2fr 1fr 1fr 100px' }}
                        >
                          <div style={{ paddingLeft: '32px' }}>
                            <div style={{ fontWeight: 500, color: 'var(--muted-light)' }}>{sub.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>/{sub.slug}</div>
                          </div>
                          <div>Subcategory</div>
                          <div>Active</div>
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
        ))}
      </div>
    </div>
  );
}

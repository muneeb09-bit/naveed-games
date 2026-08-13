'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from '@phosphor-icons/react';

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: 'GameController',
    parentId: '',
    sortOrder: categories.length + 1,
    isActive: true,
    metaTitle: '',
    metaDescription: '',
  });

  const autoSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Category name is required.');
      return;
    }
    setLoading(true);

    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.from('categories').insert({
          slug: formData.slug || autoSlug(formData.name),
          name: formData.name,
          description: formData.description || null,
          icon: formData.icon,
          parent_id: formData.parentId || null,
          sort_order: formData.sortOrder,
          is_active: formData.isActive,
          meta_title: formData.metaTitle || null,
          meta_description: formData.metaDescription || null,
        });
      }
    } catch (err) {
      console.warn('Create category error:', err);
    }

    alert(`Category "${formData.name}" created!`);
    setLoading(false);
    router.push('/admin/categories');
  };

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link
          href="/admin/categories"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--muted)', textDecoration: 'none' }}
        >
          <ArrowLeft size={14} weight="bold" /> Back to Categories
        </Link>
        <h1 style={{ fontSize: '1.75rem', marginTop: '8px', color: 'var(--white)' }}>Create Category</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="admin-form-card">
          <h2 className="admin-form-card__title">General</h2>
          <div className="checkout__field">
            <label className="checkout__label">Category Name *</label>
            <input
              type="text"
              className="checkout__input"
              placeholder="e.g. Consoles"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value, slug: autoSlug(e.target.value) })
              }
            />
          </div>
          <div className="checkout__field">
            <label className="checkout__label">Slug</label>
            <input
              type="text"
              className="checkout__input"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
          </div>
          <div className="checkout__field">
            <label className="checkout__label">Description</label>
            <textarea
              className="checkout__textarea"
              placeholder="Category description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="checkout__field">
              <label className="checkout__label">Parent Category</label>
              <select
                className="checkout__input"
                value={formData.parentId}
                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
              >
                <option value="">None (Top-level)</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="checkout__field">
              <label className="checkout__label">Sort Order</label>
              <input
                type="number"
                className="checkout__input"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="checkout__field">
            <label className="checkout__label">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                style={{ marginRight: '8px' }}
              />
              Active (visible on storefront)
            </label>
          </div>
        </div>

        <div className="admin-form-card">
          <h2 className="admin-form-card__title">SEO</h2>
          <div className="checkout__field">
            <label className="checkout__label">Meta Title</label>
            <input
              type="text"
              className="checkout__input"
              placeholder="e.g. Gaming Consoles — Naveed Games"
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
            />
          </div>
          <div className="checkout__field">
            <label className="checkout__label">Meta Description</label>
            <textarea
              className="checkout__textarea"
              placeholder="SEO description for search engines..."
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/admin/categories" className="button button--ghost">Cancel</Link>
          <Button variant="primary" size="lg" type="submit" loading={loading}>
            Create Category
          </Button>
        </div>
      </form>
    </div>
  );
}

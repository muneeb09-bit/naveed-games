'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from '@phosphor-icons/react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditCategoryPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Find category by id (checking both parent and subcategories)
  const findCategory = () => {
    for (const cat of categories) {
      if (cat.id === id) return { ...cat, parentId: '' };
      if (cat.subcategories) {
        for (const sub of cat.subcategories) {
          if (sub.id === id)
            return {
              id: sub.id,
              name: sub.name,
              slug: sub.slug,
              description: '',
              icon: '',
              sortOrder: sub.sortOrder,
              isActive: true,
              metaTitle: '',
              metaDescription: '',
              parentId: cat.id,
            };
        }
      }
    }
    return null;
  };

  const initial = findCategory();

  const [formData, setFormData] = useState({
    name: initial?.name || '',
    slug: initial?.slug || '',
    description: initial?.description || '',
    icon: initial?.icon || 'GameController',
    parentId: initial?.parentId || '',
    sortOrder: initial?.sortOrder || 0,
    isActive: initial?.isActive !== false,
    metaTitle: initial?.metaTitle || '',
    metaDescription: initial?.metaDescription || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      if (supabase) {
        await supabase
          .from('categories')
          .update({
            name: formData.name,
            slug: formData.slug,
            description: formData.description || null,
            icon: formData.icon,
            parent_id: formData.parentId || null,
            sort_order: formData.sortOrder,
            is_active: formData.isActive,
            meta_title: formData.metaTitle || null,
            meta_description: formData.metaDescription || null,
          })
          .eq('id', id);
      }
    } catch (err) {
      console.warn('Update category error:', err);
    }

    alert(`Category "${formData.name}" updated!`);
    setLoading(false);
    router.push('/admin/categories');
  };

  if (!initial) {
    return (
      <div>
        <h1 style={{ color: 'var(--white)' }}>Category not found</h1>
        <Link href="/admin/categories" className="button button--ghost" style={{ marginTop: '16px', display: 'inline-block' }}>
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link
          href="/admin/categories"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--muted)', textDecoration: 'none' }}
        >
          <ArrowLeft size={14} weight="bold" /> Back to Categories
        </Link>
        <h1 style={{ fontSize: '1.75rem', marginTop: '8px', color: 'var(--white)' }}>
          Edit Category: {initial.name}
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="admin-form-card">
          <h2 className="admin-form-card__title">General</h2>
          <div className="checkout__field">
            <label className="checkout__label">Category Name *</label>
            <input
              type="text"
              className="checkout__input"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                {categories.filter((c) => c.id !== id).map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
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
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
            />
          </div>
          <div className="checkout__field">
            <label className="checkout__label">Meta Description</label>
            <textarea
              className="checkout__textarea"
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/admin/categories" className="button button--ghost">Cancel</Link>
          <Button variant="primary" size="lg" type="submit" loading={loading}>
            Update Category
          </Button>
        </div>
      </form>
    </div>
  );
}

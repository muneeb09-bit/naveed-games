'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from '@phosphor-icons/react';

export default function NewBrandPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    isActive: true,
    sortOrder: 0,
    metaTitle: '',
    metaDescription: '',
  });

  const autoSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Brand name is required.');
      return;
    }
    setLoading(true);

    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.from('brands').insert({
          slug: formData.slug || autoSlug(formData.name),
          name: formData.name,
          description: formData.description || null,
          is_active: formData.isActive,
          sort_order: formData.sortOrder,
          meta_title: formData.metaTitle || null,
          meta_description: formData.metaDescription || null,
        });
      }
    } catch (err) {
      console.warn('Create brand error:', err);
    }

    alert(`Brand "${formData.name}" created!`);
    setLoading(false);
    router.push('/admin/brands');
  };

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link
          href="/admin/brands"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--muted)', textDecoration: 'none' }}
        >
          <ArrowLeft size={14} weight="bold" /> Back to Brands
        </Link>
        <h1 style={{ fontSize: '1.75rem', marginTop: '8px', color: 'var(--white)' }}>Create Brand</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="admin-form-card">
          <h2 className="admin-form-card__title">General</h2>
          <div className="checkout__field">
            <label className="checkout__label">Brand Name *</label>
            <input
              type="text"
              className="checkout__input"
              placeholder="e.g. PlayStation"
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
              placeholder="Brand description for the brand landing page..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="checkout__field">
              <label className="checkout__label">Sort Order</label>
              <input
                type="number"
                className="checkout__input"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
              />
            </div>
            <div className="checkout__field" style={{ display: 'flex', alignItems: 'end' }}>
              <label className="checkout__label" style={{ marginBottom: 0 }}>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  style={{ marginRight: '8px' }}
                />
                Active
              </label>
            </div>
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
          <Link href="/admin/brands" className="button button--ghost">Cancel</Link>
          <Button variant="primary" size="lg" type="submit" loading={loading}>
            Create Brand
          </Button>
        </div>
      </form>
    </div>
  );
}

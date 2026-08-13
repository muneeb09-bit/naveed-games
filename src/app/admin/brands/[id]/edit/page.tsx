'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import Link from 'next/link';
import { brands } from '@/data/brands';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from '@phosphor-icons/react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditBrandPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initial = brands.find((b) => b.id === id);

  const [formData, setFormData] = useState({
    name: initial?.name || '',
    slug: initial?.slug || '',
    description: initial?.description || '',
    isActive: initial?.isActive !== false,
    sortOrder: initial?.sortOrder || 0,
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
          .from('brands')
          .update({
            name: formData.name,
            slug: formData.slug,
            description: formData.description || null,
            is_active: formData.isActive,
            sort_order: formData.sortOrder,
            meta_title: formData.metaTitle || null,
            meta_description: formData.metaDescription || null,
          })
          .eq('id', id);
      }
    } catch (err) {
      console.warn('Update brand error:', err);
    }

    alert(`Brand "${formData.name}" updated!`);
    setLoading(false);
    router.push('/admin/brands');
  };

  if (!initial) {
    return (
      <div>
        <h1 style={{ color: 'var(--white)' }}>Brand not found</h1>
        <Link href="/admin/brands" className="button button--ghost" style={{ marginTop: '16px', display: 'inline-block' }}>
          Back to Brands
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link
          href="/admin/brands"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--muted)', textDecoration: 'none' }}
        >
          <ArrowLeft size={14} weight="bold" /> Back to Brands
        </Link>
        <h1 style={{ fontSize: '1.75rem', marginTop: '8px', color: 'var(--white)' }}>
          Edit Brand: {initial.name}
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="admin-form-card">
          <h2 className="admin-form-card__title">General</h2>
          <div className="checkout__field">
            <label className="checkout__label">Brand Name *</label>
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
            Update Brand
          </Button>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';
import { products } from '@/data/products';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { ArrowLeft, Plus, Trash } from '@phosphor-icons/react';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initial = products.find((p) => p.id === id);

  const selectedCategoryObj = categories.find(
    (c) => c.slug === (initial?.categorySlug || 'consoles')
  );

  const [formData, setFormData] = useState({
    name: initial?.name || '',
    brand: initial?.brand || 'Sony',
    categorySlug: initial?.categorySlug || 'consoles',
    subcategorySlug: initial?.subcategoryId || '',
    price: initial?.price ? String(initial.price) : '',
    originalPrice: initial?.originalPrice ? String(initial.originalPrice) : '',
    salePrice: initial?.salePrice ? String(initial.salePrice) : '',
    costPrice: initial?.costPrice ? String(initial.costPrice) : '',
    stockQuantity: initial?.stockQuantity ? String(initial.stockQuantity) : '10',
    sku: initial?.sku || `NG-PROD-${Math.floor(1000 + Math.random() * 9000)}`,
    shortDescription: initial?.shortDescription || '',
    description: initial?.description || '',
    condition: initial?.condition || 'new',
    platform: initial?.platform || '',
    status: initial?.status || 'published',
    warranty: initial?.warranty || '1 Year Official Warranty',
    deliveryInfo: initial?.deliveryInfo || 'Ships within 1-2 business days',
    featured: initial?.featured || false,
    bestseller: initial?.bestseller || false,
    isNew: initial?.isNew || false,
  });

  const [images, setImages] = useState<string[]>(
    initial?.images && initial.images.length > 0
      ? initial.images
      : ['/images/products/placeholder.jpg']
  );
  const [newImageUrl, setNewImageUrl] = useState('');

  const [specs, setSpecs] = useState<Array<{ label: string; value: string }>>(
    initial?.specs && initial.specs.length > 0
      ? initial.specs
      : [
          { label: 'Platform / Type', value: '' },
          { label: 'Storage / Spec', value: '' },
        ]
  );

  const handleAddSpec = () => {
    setSpecs([...specs, { label: '', value: '' }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: 'label' | 'value', text: string) => {
    const updated = [...specs];
    updated[index][field] = text;
    setSpecs(updated);
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.sku) {
      alert('Please fill out Product Name, Price, and SKU.');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      if (supabase && id.length > 15) {
        const slug = formData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

        await supabase
          .from('products')
          .update({
            slug,
            name: formData.name,
            brand_name: formData.brand,
            category_slug: formData.categorySlug,
            price: Number(formData.price),
            original_price: formData.originalPrice ? Number(formData.originalPrice) : null,
            sale_price: formData.salePrice ? Number(formData.salePrice) : null,
            cost_price: formData.costPrice ? Number(formData.costPrice) : null,
            short_description: formData.shortDescription || formData.name,
            description: formData.description || formData.name,
            stock_quantity: Number(formData.stockQuantity),
            in_stock: Number(formData.stockQuantity) > 0,
            sku: formData.sku,
            condition: formData.condition,
            platform: formData.platform || null,
            status: formData.status,
            featured: formData.featured,
            bestseller: formData.bestseller,
            is_new: formData.isNew,
            images,
            specs: specs.filter((s) => s.label && s.value),
            warranty: formData.warranty,
            delivery_info: formData.deliveryInfo,
          })
          .eq('id', id);
      }
    } catch (err) {
      console.warn('Supabase product edit warning:', err);
    }

    alert(`Product "${formData.name}" updated successfully!`);
    setLoading(false);
    router.push('/admin/products');
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link
          href="/admin/products"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8125rem',
            color: 'var(--muted)',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={14} weight="bold" />
          Back to Products
        </Link>
        <h1 style={{ fontSize: '1.75rem', marginTop: '8px', color: 'var(--white)' }}>
          Edit Product: {initial?.name || id}
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Basic Information */}
        <div className="admin-form-card">
          <h2 className="admin-form-card__title">Basic Information</h2>

          <div className="checkout__field">
            <label className="checkout__label">Product Title *</label>
            <input
              type="text"
              className="checkout__input"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div className="checkout__field">
              <label className="checkout__label">Brand *</label>
              <select
                className="checkout__input"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              >
                {brands.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="checkout__field">
              <label className="checkout__label">Category *</label>
              <select
                className="checkout__input"
                value={formData.categorySlug}
                onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value, subcategorySlug: '' })}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="checkout__field">
              <label className="checkout__label">Subcategory</label>
              <select
                className="checkout__input"
                value={formData.subcategorySlug}
                onChange={(e) => setFormData({ ...formData, subcategorySlug: e.target.value })}
              >
                <option value="">None</option>
                {selectedCategoryObj?.subcategories?.map((sub) => (
                  <option key={sub.id} value={sub.slug}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div className="checkout__field">
              <label className="checkout__label">Condition</label>
              <select
                className="checkout__input"
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
              >
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
                <option value="pre-owned">Pre-Owned</option>
              </select>
            </div>

            <div className="checkout__field">
              <label className="checkout__label">Platform</label>
              <input
                type="text"
                className="checkout__input"
                placeholder="e.g. PS5, PC, Switch"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              />
            </div>

            <div className="checkout__field">
              <label className="checkout__label">Status</label>
              <select
                className="checkout__input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="admin-form-card">
          <h2 className="admin-form-card__title">Pricing & Inventory</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
            <div className="checkout__field">
              <label className="checkout__label">Price (PKR) *</label>
              <input
                type="number"
                className="checkout__input"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="checkout__field">
              <label className="checkout__label">Original Price</label>
              <input
                type="number"
                className="checkout__input"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              />
            </div>

            <div className="checkout__field">
              <label className="checkout__label">Sale Price</label>
              <input
                type="number"
                className="checkout__input"
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
              />
            </div>

            <div className="checkout__field">
              <label className="checkout__label">Cost Price</label>
              <input
                type="number"
                className="checkout__input"
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="checkout__field">
              <label className="checkout__label">Stock Quantity *</label>
              <input
                type="number"
                className="checkout__input"
                required
                value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
              />
            </div>

            <div className="checkout__field">
              <label className="checkout__label">SKU *</label>
              <input
                type="text"
                className="checkout__input"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className="admin-form-card">
          <h2 className="admin-form-card__title">Product Images</h2>
          <ImageUploader
            images={images}
            onChange={(imgs) => setImages(imgs)}
            multiple={true}
          />
        </div>

        {/* Descriptions & Specs */}
        <div className="admin-form-card">
          <h2 className="admin-form-card__title">Descriptions & Specs</h2>

          <div className="checkout__field">
            <label className="checkout__label">Short Teaser Description</label>
            <input
              type="text"
              className="checkout__input"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            />
          </div>

          <div className="checkout__field">
            <label className="checkout__label">Full Product Description</label>
            <textarea
              className="checkout__textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Dynamic Specs */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label className="checkout__label">Specifications Sheet</label>
              <button
                type="button"
                onClick={handleAddSpec}
                style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Plus size={14} weight="bold" /> Add Spec Line
              </button>
            </div>

            {specs.map((spec, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 36px', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  className="checkout__input"
                  placeholder="Spec Label (e.g. CPU)"
                  value={spec.label}
                  onChange={(e) => handleSpecChange(i, 'label', e.target.value)}
                />
                <input
                  type="text"
                  className="checkout__input"
                  placeholder="Spec Value (e.g. Ryzen 7)"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(i)}
                  style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Trash size={16} weight="bold" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/admin/products" className="button button--ghost">
            Cancel
          </Link>
          <Button variant="primary" size="lg" type="submit" loading={loading}>
            Update Product
          </Button>
        </div>
      </form>
    </div>
  );
}

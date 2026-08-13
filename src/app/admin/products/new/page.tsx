'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { ArrowLeft, Plus, Trash } from '@phosphor-icons/react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: brands[0]?.name || 'Sony',
    categorySlug: 'consoles',
    subcategorySlug: '',
    price: '',
    originalPrice: '',
    salePrice: '',
    costPrice: '',
    discount: '',
    stockQuantity: '10',
    sku: `NG-PROD-${Math.floor(1000 + Math.random() * 9000)}`,
    shortDescription: '',
    description: '',
    condition: 'new' as const,
    platform: '',
    status: 'published' as const,
    warranty: '1 Year Official Warranty',
    deliveryInfo: 'Ships within 1-2 business days',
    featured: false,
    bestseller: false,
    isNew: true,
  });

  const selectedCategoryObj = categories.find((c) => c.slug === formData.categorySlug);

  const [images, setImages] = useState<string[]>(['/images/products/placeholder.jpg']);
  const [newImageUrl, setNewImageUrl] = useState('');

  const [specs, setSpecs] = useState<Array<{ label: string; value: string }>>([
    { label: 'Platform / Type', value: '' },
    { label: 'Storage / Spec', value: '' },
  ]);

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
      if (supabase) {
        const slug = formData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

        await supabase.from('products').insert({
          slug,
          name: formData.name,
          brand_name: formData.brand || 'Naveed Games',
          category_slug: formData.categorySlug,
          price: Number(formData.price),
          original_price: formData.originalPrice ? Number(formData.originalPrice) : null,
          sale_price: formData.salePrice ? Number(formData.salePrice) : null,
          cost_price: formData.costPrice ? Number(formData.costPrice) : null,
          discount: formData.discount ? Number(formData.discount) : 0,
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
        });
      }
    } catch (err) {
      console.warn('Supabase create product warning:', err);
    }

    alert(`Product "${formData.name}" created successfully!`);
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
          Create New Product
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
              placeholder="e.g. PlayStation 5 Slim 1TB Disc Edition"
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

        {/* Pricing & Inventory */}
        <div className="admin-form-card">
          <h2 className="admin-form-card__title">Pricing & Inventory</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
            <div className="checkout__field">
              <label className="checkout__label">Price (PKR) *</label>
              <input
                type="number"
                className="checkout__input"
                placeholder="249999"
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
                placeholder="269999"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              />
            </div>

            <div className="checkout__field">
              <label className="checkout__label">Sale Price</label>
              <input
                type="number"
                className="checkout__input"
                placeholder="239999"
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
              />
            </div>

            <div className="checkout__field">
              <label className="checkout__label">Cost Price</label>
              <input
                type="number"
                className="checkout__input"
                placeholder="210000"
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
                placeholder="10"
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
              placeholder="One line summary for hero and cards"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            />
          </div>

          <div className="checkout__field">
            <label className="checkout__label">Full Product Description</label>
            <textarea
              className="checkout__textarea"
              placeholder="Detailed description of features, compatibility, included accessories..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Dynamic Specifications list */}
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

        {/* Buttons & Status Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/admin/products" className="button button--ghost">
            Cancel
          </Link>
          <Button variant="primary" size="lg" type="submit" loading={loading}>
            Save & Publish Product
          </Button>
        </div>
      </form>
    </div>
  );
}

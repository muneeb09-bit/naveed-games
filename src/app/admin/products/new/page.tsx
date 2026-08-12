'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '@/data/categories';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Plus, Trash } from '@phosphor-icons/react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    categorySlug: 'consoles',
    price: '',
    originalPrice: '',
    discount: '',
    stockQuantity: '10',
    sku: `NG-PROD-${Math.floor(1000 + Math.random() * 9000)}`,
    shortDescription: '',
    description: '',
    warranty: '1 Year Official Warranty',
    deliveryInfo: 'Ships within 1-2 business days',
    featured: false,
    bestseller: false,
    isNew: true,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.sku) {
      alert('Please fill out Product Name, Price, and SKU.');
      return;
    }

    alert(`Product "${formData.name}" created successfully!`);
    router.push('/admin/products');
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      {/* Breadcrumb */}
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
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', padding: '24px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '1.125rem', color: 'var(--white)', marginBottom: '8px' }}>
            Basic Information
          </h2>

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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="checkout__field">
              <label className="checkout__label">Brand *</label>
              <input
                type="text"
                className="checkout__input"
                placeholder="e.g. Sony, Microsoft, ASUS"
                required
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>

            <div className="checkout__field">
              <label className="checkout__label">Category *</label>
              <select
                className="checkout__input"
                value={formData.categorySlug}
                onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', padding: '24px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '1.125rem', color: 'var(--white)', marginBottom: '8px' }}>
            Pricing & Inventory
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
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
              <label className="checkout__label">Original Price (PKR)</label>
              <input
                type="number"
                className="checkout__input"
                placeholder="269999"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              />
            </div>

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
          </div>

          <div className="checkout__field">
            <label className="checkout__label">SKU (Stock Keeping Unit) *</label>
            <input
              type="text"
              className="checkout__input"
              required
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            />
          </div>
        </div>

        {/* Product Descriptions */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', padding: '24px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '1.125rem', color: 'var(--white)', marginBottom: '8px' }}>
            Descriptions & Specs
          </h2>

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
          <Button variant="primary" size="lg" type="submit">
            Save & Publish Product
          </Button>
        </div>
      </form>
    </div>
  );
}

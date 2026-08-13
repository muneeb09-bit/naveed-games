'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { departments } from '@/data/departments';
import { brands } from '@/data/brands';
import { registerCustomProduct } from '@/data/products';
import type { Product } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { ArrowLeft, Plus, Trash } from '@phosphor-icons/react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [departmentSlug, setDepartmentSlug] = useState('gaming');
  const [categorySlug, setCategorySlug] = useState('playstation');
  const [subcategorySlug, setSubcategorySlug] = useState('consoles');

  const [formData, setFormData] = useState({
    name: '',
    brand: brands[0]?.name || 'PlayStation',
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
    platform: 'PS5',
    status: 'published' as const,
    dealType: '' as string,
    warranty: '1 Year Official Warranty',
    deliveryInfo: 'Ships within 1-2 business days',
    featured: false,
    bestseller: false,
    isNew: true,
  });

  const selectedDepartmentObj = departments.find((d) => d.slug === departmentSlug) || departments[0];
  const selectedCategoryObj = selectedDepartmentObj.categories.find((c) => c.slug === categorySlug) || selectedDepartmentObj.categories[0];

  const handleDepartmentChange = (newDeptSlug: string) => {
    setDepartmentSlug(newDeptSlug);
    const deptObj = departments.find((d) => d.slug === newDeptSlug) || departments[0];
    const firstCat = deptObj.categories[0];
    setCategorySlug(firstCat?.slug || '');
    setSubcategorySlug(firstCat?.subcategories[0]?.slug || '');
  };

  const handleCategoryChange = (newCatSlug: string) => {
    setCategorySlug(newCatSlug);
    const catObj = selectedDepartmentObj.categories.find((c) => c.slug === newCatSlug);
    setSubcategorySlug(catObj?.subcategories[0]?.slug || '');
  };

  const [images, setImages] = useState<string[]>(['/images/products/placeholder.jpg']);

  const [specs, setSpecs] = useState<Array<{ label: string; value: string }>>([
    { label: 'Platform / Type', value: 'PlayStation 5' },
    { label: 'Storage / Spec', value: '1TB Custom SSD' },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.sku) {
      alert('Please fill out Product Name, Price, and SKU.');
      return;
    }

    setLoading(true);

    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProdObj: Product = {
      id: `prod-${Date.now()}`,
      slug,
      name: formData.name,
      brand: formData.brand || 'PlayStation',
      department: selectedDepartmentObj.name,
      departmentSlug,
      category: selectedCategoryObj?.name || 'PlayStation',
      categorySlug,
      subcategoryId: subcategorySlug || undefined,
      subcategorySlug: subcategorySlug || undefined,
      dealType: formData.dealType as any || undefined,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
      costPrice: formData.costPrice ? Number(formData.costPrice) : undefined,
      discount: formData.discount ? Number(formData.discount) : 0,
      shortDescription: formData.shortDescription || formData.name,
      description: formData.description || formData.name,
      rating: 5.0,
      reviewCount: 1,
      inStock: Number(formData.stockQuantity) > 0,
      stockQuantity: Number(formData.stockQuantity),
      sku: formData.sku,
      condition: formData.condition,
      platform: formData.platform || undefined,
      status: formData.status,
      featured: formData.featured,
      bestseller: formData.bestseller,
      isNew: formData.isNew,
      images: images.length > 0 ? images : ['/images/products/placeholder.jpg'],
      specs: specs.filter((s) => s.label && s.value),
      warranty: formData.warranty,
      deliveryInfo: formData.deliveryInfo,
      tags: [departmentSlug, categorySlug, formData.brand.toLowerCase(), formData.name.toLowerCase()],
    };

    // 1. Instant local registration in memory & localStorage (< 1ms)
    registerCustomProduct(newProdObj);

    // 2. Supabase insert background task
    try {
      const supabase = createClient();
      if (supabase) {
        await Promise.race([
          supabase.from('products').insert({
            slug,
            name: formData.name,
            brand_name: formData.brand || 'Naveed Games',
            category_slug: categorySlug,
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
            images: newProdObj.images,
            specs: specs.filter((s) => s.label && s.value),
            warranty: formData.warranty,
            delivery_info: formData.deliveryInfo,
          }),
          new Promise((resolve) => setTimeout(resolve, 800)),
        ]);
      }
    } catch (err) {
      console.warn('Supabase product create background warning:', err);
    }

    setLoading(false);
    router.push('/admin/products');
    router.refresh();
  };

  return (
    <div style={{ maxWidth: '840px' }}>
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
              placeholder="e.g. PlayStation 5 Pro 2TB Digital Console"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Cascading Dependent Dropdowns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
            <div className="checkout__field">
              <label className="checkout__label">Department *</label>
              <select
                className="checkout__input"
                value={departmentSlug}
                onChange={(e) => handleDepartmentChange(e.target.value)}
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.slug}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="checkout__field">
              <label className="checkout__label">Category *</label>
              <select
                className="checkout__input"
                value={categorySlug}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {selectedDepartmentObj.categories.map((cat) => (
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
                value={subcategorySlug}
                onChange={(e) => setSubcategorySlug(e.target.value)}
              >
                <option value="">None</option>
                {selectedCategoryObj?.subcategories?.map((sub) => (
                  <option key={sub.id} value={sub.slug}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

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
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
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
              <label className="checkout__label">Platform / Model</label>
              <input
                type="text"
                className="checkout__input"
                placeholder="e.g. PS5, Xbox, PC"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              />
            </div>

            <div className="checkout__field">
              <label className="checkout__label">Deals Classification</label>
              <select
                className="checkout__input"
                value={formData.dealType}
                onChange={(e) => setFormData({ ...formData, dealType: e.target.value })}
              >
                <option value="">None</option>
                <option value="flash-deal">⚡ Flash Deal</option>
                <option value="bundle-deal">📦 Bundle Deal</option>
                <option value="clearance">🏷️ Clearance</option>
                <option value="open-box">♻️ Open Box</option>
                <option value="seasonal-sale">🎉 Seasonal Sale</option>
              </select>
            </div>

            <div className="checkout__field">
              <label className="checkout__label">Publish Status</label>
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
          <h2 className="admin-form-card__title">Descriptions & Specs Sheet</h2>

          <div className="checkout__field">
            <label className="checkout__label">Short Teaser Description</label>
            <input
              type="text"
              className="checkout__input"
              placeholder="One line summary for storefront card"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            />
          </div>

          <div className="checkout__field">
            <label className="checkout__label">Full Description</label>
            <textarea
              className="checkout__textarea"
              placeholder="Detailed overview of hardware specifications, box contents..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Dynamic Specifications */}
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
                  placeholder="Spec Label (e.g. Storage)"
                  value={spec.label}
                  onChange={(e) => handleSpecChange(i, 'label', e.target.value)}
                />
                <input
                  type="text"
                  className="checkout__input"
                  placeholder="Spec Value (e.g. 2TB NVMe SSD)"
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

        {/* Action Buttons */}
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

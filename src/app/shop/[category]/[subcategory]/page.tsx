import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { resolveTaxonomySlug, resolveSubcategory } from '@/lib/taxonomy';
import { ShopClient } from '@/components/shop/ShopClient';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ category: string; subcategory: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory } = await params;
  const sub = resolveSubcategory(category, subcategory);
  if (!sub) return { title: 'Subcategory Not Found — Naveed Games' };

  return {
    title: `${sub.name} — ${sub.categoryName} — Naveed Games`,
    description: `Shop ${sub.name} in ${sub.categoryName} at Naveed Games. Cash on Delivery across Pakistan.`,
  };
}

export default async function SubcategoryShopPage({ params }: Props) {
  const { category, subcategory } = await params;
  const taxonomyItem = resolveTaxonomySlug(category);
  const sub = resolveSubcategory(category, subcategory);

  if (!taxonomyItem || !sub) {
    notFound();
  }

  return (
    <div className="shop-page">
      <div className="container">
        {/* Hierarchical Breadcrumbs */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/shop" className="breadcrumb__link">Shop</Link>
          <span className="breadcrumb__separator">/</span>
          {taxonomyItem.departmentName && (
            <>
              <Link href={`/shop/${taxonomyItem.departmentSlug}`} className="breadcrumb__link">
                {taxonomyItem.departmentName}
              </Link>
              <span className="breadcrumb__separator">/</span>
            </>
          )}
          <Link href={`/shop/${taxonomyItem.slug}`} className="breadcrumb__link">
            {taxonomyItem.name}
          </Link>
          <span className="breadcrumb__separator">/</span>
          <span className="breadcrumb__current">{sub.name}</span>
        </nav>

        <div className="shop-page__header">
          <div className="shop-page__category-label">{taxonomyItem.name}</div>
          <h1 className="shop-page__title">{sub.name}</h1>
          <p className="shop-page__subtitle">
            Explore genuine {sub.name} hardware, games, and accessories with nationwide Cash on Delivery.
          </p>
        </div>

        {/* Sibling Subcategory Navigation Pills */}
        {taxonomyItem.subcategories && taxonomyItem.subcategories.length > 0 && (
          <div className="shop-page__subcategory-pills">
            <Link href={`/shop/${taxonomyItem.slug}`} className="shop-page__pill">
              All {taxonomyItem.name}
            </Link>
            {taxonomyItem.subcategories.map((s) => (
              <Link
                key={s.slug}
                href={`/shop/${taxonomyItem.slug}/${s.slug}`}
                className={`shop-page__pill ${s.slug === subcategory ? 'shop-page__pill--active' : ''}`}
              >
                {s.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="container">
        <Suspense>
          <ShopClient
            categorySlug={taxonomyItem.slug}
            subcategorySlug={sub.slug}
            departmentSlug={taxonomyItem.departmentSlug}
          />
        </Suspense>
      </div>
    </div>
  );
}

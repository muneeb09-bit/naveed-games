import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { resolveTaxonomySlug, getAllShopSlugs } from '@/lib/taxonomy';
import { ShopClient } from '@/components/shop/ShopClient';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const item = resolveTaxonomySlug(category);
  if (!item) return { title: 'Category Not Found — Naveed Games' };

  return {
    title: `${item.name} — Naveed Games`,
    description: item.description,
    openGraph: {
      title: `${item.name} — Naveed Games`,
      description: item.description,
    },
  };
}

export function generateStaticParams() {
  return getAllShopSlugs().map((slug) => ({ category: slug }));
}

export default async function CategoryShopPage({ params }: Props) {
  const { category } = await params;
  const taxonomyItem = resolveTaxonomySlug(category);

  if (!taxonomyItem) {
    notFound();
  }

  return (
    <div className="shop-page">
      <div className="container">
        {/* Dynamic Hierarchical Breadcrumbs */}
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
          <span className="breadcrumb__current">{taxonomyItem.name}</span>
        </nav>

        {/* Category Header */}
        <div className="shop-page__header">
          <div className="shop-page__category-label">
            {taxonomyItem.type === 'department' ? 'Department' : taxonomyItem.type === 'brand' ? 'Brand' : 'Category'}
          </div>
          <h1 className="shop-page__title">{taxonomyItem.name}</h1>
          <p className="shop-page__subtitle">{taxonomyItem.description}</p>
        </div>

        {/* Subcategory Navigation Pills */}
        {taxonomyItem.subcategories && taxonomyItem.subcategories.length > 0 && (
          <div className="shop-page__subcategory-pills">
            <Link
              href={`/shop/${taxonomyItem.slug}`}
              className="shop-page__pill shop-page__pill--active"
            >
              All {taxonomyItem.name}
            </Link>
            {taxonomyItem.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/shop/${taxonomyItem.slug}/${sub.slug}`}
                className="shop-page__pill"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Main Catalog View with Faceted Filter System */}
      <div className="container">
        <Suspense>
          <ShopClient
            categorySlug={taxonomyItem.slug}
            departmentSlug={taxonomyItem.departmentSlug}
          />
        </Suspense>
      </div>
    </div>
  );
}

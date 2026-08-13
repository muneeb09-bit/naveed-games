import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getCategoryBySlug, getSubcategoryBySlug, getAllSubcategorySlugs } from '@/data/categories';
import { ShopClient } from '@/components/shop/ShopClient';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ category: string; subcategory: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory } = await params;
  const cat = getCategoryBySlug(category);
  const sub = getSubcategoryBySlug(category, subcategory);
  if (!cat || !sub) return { title: 'Not Found' };

  return {
    title: `${sub.name} — ${cat.name} — Naveed Games`,
    description: `Shop ${sub.name} in ${cat.name} at Naveed Games. Cash on Delivery across Pakistan.`,
  };
}

export function generateStaticParams() {
  return getAllSubcategorySlugs();
}

export default async function SubcategoryShopPage({ params }: Props) {
  const { category, subcategory } = await params;
  const cat = getCategoryBySlug(category);
  const sub = getSubcategoryBySlug(category, subcategory);
  if (!cat || !sub) notFound();

  return (
    <div className="shop-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/shop" className="breadcrumb__link">Shop</Link>
          <span className="breadcrumb__separator">/</span>
          <Link href={`/shop/${cat.slug}`} className="breadcrumb__link">{cat.name}</Link>
          <span className="breadcrumb__separator">/</span>
          <span className="breadcrumb__current">{sub.name}</span>
        </nav>

        <div className="shop-page__header">
          <div className="shop-page__category-label">{cat.name}</div>
          <h1 className="shop-page__title">{sub.name}</h1>
        </div>

        {/* Sibling subcategory pills */}
        {cat.subcategories && cat.subcategories.length > 0 && (
          <div className="shop-page__subcategory-pills">
            <Link href={`/shop/${cat.slug}`} className="shop-page__pill">
              All {cat.name}
            </Link>
            {cat.subcategories.map((s) => (
              <Link
                key={s.slug}
                href={`/shop/${cat.slug}/${s.slug}`}
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
          <ShopClient categorySlug={cat.slug} subcategorySlug={sub.slug} />
        </Suspense>
      </div>
    </div>
  );
}

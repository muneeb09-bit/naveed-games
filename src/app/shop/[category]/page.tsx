import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getCategoryBySlug, categories } from '@/data/categories';
import { ShopClient } from '@/components/shop/ShopClient';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: 'Category Not Found' };

  return {
    title: cat.metaTitle || `${cat.name} — Naveed Games`,
    description: cat.metaDescription || cat.description,
    openGraph: {
      title: `${cat.name} — Naveed Games`,
      description: cat.description,
    },
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default async function CategoryShopPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  return (
    <div className="shop-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/shop" className="breadcrumb__link">Shop</Link>
          <span className="breadcrumb__separator">/</span>
          <span className="breadcrumb__current">{cat.name}</span>
        </nav>

        <div className="shop-page__header">
          <div className="shop-page__category-label">Category</div>
          <h1 className="shop-page__title">{cat.name}</h1>
          <p className="shop-page__subtitle">{cat.description}</p>
        </div>

        {/* Subcategory pills */}
        {cat.subcategories && cat.subcategories.length > 0 && (
          <div className="shop-page__subcategory-pills">
            <Link
              href={`/shop/${cat.slug}`}
              className="shop-page__pill shop-page__pill--active"
            >
              All
            </Link>
            {cat.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/shop/${cat.slug}/${sub.slug}`}
                className="shop-page__pill"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="container">
        <Suspense>
          <ShopClient categorySlug={cat.slug} />
        </Suspense>
      </div>
    </div>
  );
}

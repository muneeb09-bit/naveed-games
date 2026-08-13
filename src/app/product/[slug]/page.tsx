import { redirect } from 'next/navigation';
import { products } from '@/data/products';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductRedirectPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/products/${slug}`);
}

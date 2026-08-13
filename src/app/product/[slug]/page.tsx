import { redirect } from 'next/navigation';

export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductRedirectPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/products/${slug}`);
}

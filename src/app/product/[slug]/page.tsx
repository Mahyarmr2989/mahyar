import { notFound } from 'next/navigation';
import { PRODUCTS, getProductBySlug } from '@/data/products';
import ProductDetail from '@/components/ProductDetail';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found — CarryClub' };
  return {
    title: `${product.name} — CarryClub`,
    description: product.shortDescription,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}

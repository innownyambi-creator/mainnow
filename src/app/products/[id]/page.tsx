import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.id === params.id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}

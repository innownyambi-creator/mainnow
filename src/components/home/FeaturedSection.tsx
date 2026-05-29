import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProducts } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

export default function FeaturedSection() {
  return (
    <section className="py-10" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-shoprite-gold rounded-full" aria-hidden="true" />
            <h2 id="featured-heading" className="section-title">⭐ Featured Products</h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-shoprite-red hover:underline"
          >
            Shop All
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

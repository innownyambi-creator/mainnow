import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dealsOfTheWeek } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

export default function DealsSection() {
  return (
    <section className="py-10 bg-shoprite-grey-light" aria-labelledby="deals-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-shoprite-red rounded-full" aria-hidden="true" />
            <h2 id="deals-heading" className="section-title">🔥 Deals of the Week</h2>
          </div>
          <Link
            href="/products?sale=true"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-shoprite-red hover:underline"
            aria-label="View all deals"
          >
            View All Deals
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {dealsOfTheWeek.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/products?sale=true"
            className="inline-flex items-center gap-2 btn-primary"
            aria-label="View all deals"
          >
            View All Deals
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

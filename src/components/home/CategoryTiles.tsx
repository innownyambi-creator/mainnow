import Link from "next/link";
import { categories } from "@/data/products";

export default function CategoryTiles() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-labelledby="categories-heading">
      <h2 id="categories-heading" className="section-title mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/products?category=${encodeURIComponent(cat.name)}`}
            className={`group flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-5 hover:border-shoprite-red hover:bg-red-50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card ${cat.color}`}
            aria-label={`Shop ${cat.name} - ${cat.count} products`}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform duration-200" aria-hidden="true">
              {cat.icon}
            </span>
            <span className="font-display font-bold text-sm uppercase tracking-wide text-shoprite-dark text-center leading-tight">
              {cat.name}
            </span>
            <span className="text-xs text-shoprite-grey-mid">{cat.count} items</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

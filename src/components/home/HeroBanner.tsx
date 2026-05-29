"use client";
import Link from "next/link";
import { ArrowRight, Tag, Truck, Shield } from "lucide-react";

const slides = [
  {
    tag: "🔥 DEALS OF THE WEEK",
    headline: "More Value,",
    headline2: "Every Day.",
    sub: "Save up to 30% on groceries, fresh produce and household essentials.",
    cta: { label: "Shop Deals Now", href: "/products?sale=true" },
    ctaSecondary: { label: "Browse All", href: "/products" },
    bg: "from-shoprite-red to-shoprite-red-dark",
    accent: "#FFA726",
  },
];

export default function HeroBanner() {
  return (
    <section aria-label="Hero banner" className="relative overflow-hidden bg-gradient-to-br from-shoprite-red to-shoprite-red-dark">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Text content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm">
              <Tag size={12} aria-hidden="true" />
              🔥 DEALS OF THE WEEK
            </div>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white uppercase leading-none mb-4">
              More Value,
              <br />
              <span className="text-shoprite-gold">Every Day.</span>
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-md mb-8 leading-relaxed">
              Save up to <strong className="text-white">30%</strong> on groceries, fresh produce and household essentials. Delivered to your door.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products?sale=true"
                className="inline-flex items-center gap-2 bg-white text-shoprite-red font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all active:scale-95 text-sm uppercase tracking-wide shadow-lg"
              >
                Shop Deals Now
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 border-2 border-white/60 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all active:scale-95 text-sm uppercase tracking-wide"
              >
                Browse All Products
              </Link>
            </div>
          </div>

          {/* Stats / trust cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🛒", title: "40+ Products", sub: "Across 6 categories" },
              { icon: "🚚", title: "Free Delivery", sub: "On orders over R500" },
              { icon: "💰", title: "Best Prices", sub: "Guaranteed savings" },
              { icon: "⭐", title: "Trusted by SA", sub: "Since 1979" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-white"
              >
                <div className="text-2xl mb-2" aria-hidden="true">{item.icon}</div>
                <div className="font-display font-bold text-lg leading-tight">{item.title}</div>
                <div className="text-white/70 text-xs mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40L1440 40L1440 20C1200 0 960 40 720 20C480 0 240 40 0 20L0 40Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

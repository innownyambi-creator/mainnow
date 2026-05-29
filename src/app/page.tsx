import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsPageClient from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse groceries, fresh produce, household essentials, electronics, liquor and more at Shoprite.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-shoprite-grey-mid">Loading products...</div>}>
      <ProductsPageClient />
    </Suspense>
  );
}

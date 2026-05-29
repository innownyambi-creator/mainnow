import type { Metadata } from "next";
import ProductsPageClient from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse groceries, fresh produce, household essentials, electronics, liquor and more at Shoprite.",
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}

import type { Metadata } from "next";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryTiles from "@/components/home/CategoryTiles";
import DealsSection from "@/components/home/DealsSection";
import PromoStrip from "@/components/home/PromoStrip";
import FeaturedSection from "@/components/home/FeaturedSection";

export const metadata: Metadata = {
  title: "Shoprite – More value. Every day.",
  description: "Shop groceries, fresh produce, household essentials and more online at Shoprite. Delivered to your door.",
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <PromoStrip />
      <CategoryTiles />
      <DealsSection />
      <FeaturedSection />
    </>
  );
}

import type { Metadata } from "next";
import StoreLocatorClient from "./StoreLocatorClient";

export const metadata: Metadata = {
  title: "Store Locator",
  description: "Find your nearest Shoprite store. Search by city or province.",
};

export default function StoreLocatorPage() {
  return <StoreLocatorClient />;
}

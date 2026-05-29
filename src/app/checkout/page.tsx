import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Shoprite order securely.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}

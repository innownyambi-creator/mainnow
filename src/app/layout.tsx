import type { Metadata } from "next";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Shoprite – More value. Every day.", template: "%s | Shoprite" },
  description: "Shop groceries, fresh produce, household essentials and more online. Shoprite – South Africa's favourite supermarket.",
  keywords: ["shoprite", "online grocery", "south africa", "supermarket", "deals", "groceries"],
  openGraph: {
    title: "Shoprite – More value. Every day.",
    description: "Shop groceries, fresh produce, household essentials and more. Delivered to your door.",
    url: "https://shoprite.co.za",
    siteName: "Shoprite",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_ZA",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Shoprite", description: "More value. Every day." },
  themeColor: "#E30613",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <head>
        {/* Google Fonts loaded via stylesheet link - works at runtime in browser */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-white text-shoprite-dark antialiased">
        <CartProvider>
          <Header />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

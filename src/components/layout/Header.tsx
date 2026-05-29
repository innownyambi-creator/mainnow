"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, MapPin, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import { categories } from "@/data/products";

export default function Header() {
  const { itemCount, toggleCart, total } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartBounce, setCartBounce] = useState(false);
  const router = useRouter();
  const prevCount = useRef(itemCount);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (itemCount > prevCount.current) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 400);
    }
    prevCount.current = itemCount;
  }, [itemCount]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-shoprite-dark text-white text-xs py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/store-locator" className="flex items-center gap-1 hover:text-shoprite-red transition-colors">
            <MapPin size={12} />
            <span>Find a store</span>
          </Link>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <span className="text-gray-300 hidden sm:inline">Free delivery over R500</span>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <span className="hidden md:inline">Mon–Sat 08:00–20:00</span>
          <a href="tel:0800117711" className="hover:text-white transition-colors">0800 11 77 11</a>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-40 bg-white transition-shadow duration-200",
          isScrolled ? "shadow-md" : "shadow-sm"
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group" aria-label="Shoprite Home">
              <div className="bg-shoprite-red rounded-lg w-10 h-10 flex items-center justify-center shadow-sm group-hover:bg-shoprite-red-dark transition-colors">
                <span className="text-white font-display font-black text-lg tracking-tight">SR</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-black text-xl text-shoprite-red leading-tight tracking-tight uppercase">SHOPRITE</div>
                <div className="text-[10px] text-shoprite-grey-mid font-medium tracking-widest uppercase -mt-0.5">More value. Every day.</div>
              </div>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl" role="search">
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands..."
                  aria-label="Search products"
                  className="w-full h-10 pl-4 pr-12 rounded-full border-2 border-shoprite-grey-border bg-shoprite-grey-light text-sm placeholder-gray-400 focus:outline-none focus:border-shoprite-red focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-shoprite-grey-mid hover:text-shoprite-red transition-colors"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Cart button */}
              <button
                onClick={toggleCart}
                aria-label={`Shopping cart with ${itemCount} items`}
                className={cn(
                  "relative flex items-center gap-2 bg-shoprite-red text-white h-10 px-3 rounded-full hover:bg-shoprite-red-dark transition-all duration-150 active:scale-95",
                  cartBounce && "animate-bounce-once"
                )}
              >
                <ShoppingCart size={18} aria-hidden="true" />
                <span className="hidden sm:block text-sm font-semibold">
                  {itemCount > 0 ? `R${total.toFixed(2)}` : "Cart"}
                </span>
                {itemCount > 0 && (
                  <span
                    className="absolute -top-2 -right-1 bg-shoprite-gold text-shoprite-dark text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center font-mono"
                    aria-hidden="true"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-shoprite-grey rounded-lg hover:bg-shoprite-grey-light transition-colors"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Category navigation */}
        <nav aria-label="Product categories" className="hidden lg:block border-t border-shoprite-grey-border bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <ul className="flex items-center gap-0">
              <li>
                <Link href="/products" className="flex items-center gap-1.5 h-10 px-4 text-sm font-semibold text-shoprite-red hover:bg-shoprite-grey-light transition-colors border-b-2 border-shoprite-red">
                  All Products
                </Link>
              </li>
              {categories.map(cat => (
                <li key={cat.name}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="flex items-center gap-1.5 h-10 px-4 text-sm font-medium text-shoprite-grey hover:text-shoprite-dark hover:bg-shoprite-grey-light transition-colors border-b-2 border-transparent hover:border-shoprite-red"
                  >
                    <span aria-hidden="true">{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="ml-auto">
                <Link href="/products?sale=true" className="flex items-center gap-1.5 h-10 px-4 text-sm font-semibold text-shoprite-red animate-pulse-red rounded-none">
                  🔥 Deals
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-shoprite-grey-border bg-white animate-fade-in" id="mobile-menu">
            <nav aria-label="Mobile navigation">
              <ul className="divide-y divide-shoprite-grey-border">
                <li>
                  <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="flex items-center px-6 py-3 text-sm font-semibold text-shoprite-red hover:bg-shoprite-grey-light">
                    All Products
                  </Link>
                </li>
                {categories.map(cat => (
                  <li key={cat.name}>
                    <Link
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-shoprite-grey-light"
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span className="ml-auto text-xs text-shoprite-grey-mid">{cat.count} items</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/store-locator" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-shoprite-grey-light">
                    <MapPin size={16} className="text-shoprite-red" />
                    <span>Find a Store</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

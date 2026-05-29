import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-shoprite-dark text-gray-300" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-shoprite-red rounded-lg w-9 h-9 flex items-center justify-center">
                <span className="text-white font-display font-black text-base">SR</span>
              </div>
              <div>
                <div className="font-display font-black text-lg text-white uppercase tracking-tight">SHOPRITE</div>
                <div className="text-[9px] text-gray-400 tracking-widest uppercase">More value. Every day.</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              South Africa's favourite supermarket. Serving communities across sub-Saharan Africa since 1979.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Shoprite on ${label}`}
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-shoprite-red transition-colors"
                >
                  <Icon size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-display font-bold text-sm uppercase tracking-widest mb-4">Shop</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "All Products", href: "/products" },
                { label: "Weekly Deals", href: "/products?sale=true" },
                { label: "Groceries", href: "/products?category=Groceries" },
                { label: "Fresh Produce", href: "/products?category=Fresh+Produce" },
                { label: "Household", href: "/products?category=Household" },
                { label: "Electronics", href: "/products?category=Electronics" },
                { label: "Liquor", href: "/products?category=Liquor" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white hover:underline transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-display font-bold text-sm uppercase tracking-widest mb-4">Help & Support</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "FAQs", href: "#" },
                { label: "Track My Order", href: "#" },
                { label: "Returns & Refunds", href: "#" },
                { label: "Delivery Information", href: "#" },
                { label: "Payment Methods", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms & Conditions", href: "#" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white hover:underline transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-display font-bold text-sm uppercase tracking-widest mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="text-shoprite-red mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-white font-semibold">0800 11 77 11</div>
                  <div className="text-xs text-gray-400">Free call, Mon–Sat 08:00–20:00</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="text-shoprite-red mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-white">customercare@shoprite.co.za</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-shoprite-red mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-white font-semibold">Store Locator</div>
                  <Link href="/store-locator" className="text-xs text-shoprite-red hover:underline">Find your nearest store →</Link>
                </div>
              </li>
            </ul>

            {/* App badges */}
            <div className="mt-5">
              <p className="text-xs text-gray-400 mb-2 font-medium">Download the Shoprite App</p>
              <div className="flex gap-2">
                <a href="#" className="flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors" aria-label="Download on App Store">
                  <span aria-hidden>🍎</span> App Store
                </a>
                <a href="#" className="flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors" aria-label="Download on Google Play">
                  <span aria-hidden>▶</span> Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Shoprite Checkers (Pty) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Reg. No. 1983/001599/07</span>
            <span>FSP: 23278</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

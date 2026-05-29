import { Truck, RefreshCw, Shield, Phone } from "lucide-react";

const promos = [
  { icon: Truck, text: "Free delivery over R500", sub: "To your door" },
  { icon: RefreshCw, text: "Easy returns", sub: "30-day policy" },
  { icon: Shield, text: "Secure checkout", sub: "SSL encrypted" },
  { icon: Phone, text: "0800 11 77 11", sub: "Mon–Sat 08:00–20:00" },
];

export default function PromoStrip() {
  return (
    <section className="bg-shoprite-grey-light border-b border-shoprite-grey-border py-3" aria-label="Store benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap justify-center sm:justify-between gap-x-6 gap-y-2">
          {promos.map(({ icon: Icon, text, sub }) => (
            <li key={text} className="flex items-center gap-2 text-sm">
              <Icon size={16} className="text-shoprite-red flex-shrink-0" aria-hidden="true" />
              <span>
                <span className="font-semibold text-shoprite-dark">{text}</span>
                <span className="text-shoprite-grey-mid hidden sm:inline"> · {sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

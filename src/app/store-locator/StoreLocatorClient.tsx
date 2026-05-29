"use client";
import { useState, useMemo } from "react";
import { Search, MapPin, Phone, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { stores } from "@/data/stores";
import { cn } from "@/lib/utils";

export default function StoreLocatorClient() {
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return stores;
    return stores.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.suburb.toLowerCase().includes(q) ||
        s.province.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="section-title mb-2">Find a Store</h1>
        <p className="text-shoprite-grey-mid">Search for your nearest Shoprite store by city, suburb or province.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-lg mx-auto mb-8">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-shoprite-grey-mid" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by city, suburb or province..."
          aria-label="Search stores"
          className="w-full h-12 pl-11 pr-4 border-2 border-shoprite-grey-border rounded-full text-sm focus:outline-none focus:border-shoprite-red bg-white shadow-sm"
        />
      </div>

      {/* Results */}
      <p className="text-sm text-shoprite-grey-mid mb-4" aria-live="polite">
        {filtered.length} store{filtered.length !== 1 ? "s" : ""} found
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">📍</div>
          <p className="font-display font-bold text-xl uppercase text-shoprite-dark mb-2">No stores found</p>
          <p className="text-sm text-shoprite-grey-mid">Try a different city or province.</p>
        </div>
      ) : (
        <ul className="space-y-3" aria-label="Store list">
          {filtered.map((store) => {
            const isOpen = expandedId === store.id;
            return (
              <li key={store.id} className="bg-white border border-shoprite-grey-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
                <button
                  onClick={() => setExpandedId(isOpen ? null : store.id)}
                  aria-expanded={isOpen}
                  aria-controls={`store-details-${store.id}`}
                  className="w-full flex items-start gap-4 p-4 text-left hover:bg-shoprite-grey-light transition-colors"
                >
                  <div className="w-10 h-10 bg-shoprite-red rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={18} className="text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-base uppercase text-shoprite-dark">{store.name}</p>
                    <p className="text-sm text-shoprite-grey-mid mt-0.5">{store.address}, {store.suburb}, {store.city}</p>
                    <p className="text-xs text-shoprite-grey-mid">{store.province}</p>
                  </div>
                  <div className="flex-shrink-0 text-shoprite-grey-mid ml-2 mt-1" aria-hidden="true">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isOpen && (
                  <div id={`store-details-${store.id}`} className="border-t border-shoprite-grey-border px-4 pb-4 pt-3 bg-shoprite-grey-light animate-fade-in">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Hours */}
                      <div>
                        <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-shoprite-dark mb-2">
                          <Clock size={13} aria-hidden="true" /> Trading Hours
                        </h3>
                        <ul className="text-sm space-y-1">
                          <li className="flex justify-between">
                            <span className="text-shoprite-grey-mid">Mon–Fri</span>
                            <span className="font-semibold">{store.hours.weekdays}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-shoprite-grey-mid">Saturday</span>
                            <span className="font-semibold">{store.hours.saturday}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-shoprite-grey-mid">Sunday</span>
                            <span className="font-semibold">{store.hours.sunday}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-shoprite-grey-mid">Public Holidays</span>
                            <span className="font-semibold">{store.hours.publicHolidays}</span>
                          </li>
                        </ul>
                      </div>

                      {/* Contact & services */}
                      <div>
                        <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-shoprite-dark mb-2">
                          <Phone size={13} aria-hidden="true" /> Contact
                        </h3>
                        <a href={`tel:${store.phone}`} className="text-sm font-semibold text-shoprite-red hover:underline">
                          {store.phone}
                        </a>

                        <h3 className="text-xs font-bold uppercase tracking-widest text-shoprite-dark mt-3 mb-1.5">Services</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {store.services.map((s) => (
                            <span key={s} className="text-xs bg-white border border-shoprite-grey-border px-2 py-0.5 rounded-full text-shoprite-grey">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

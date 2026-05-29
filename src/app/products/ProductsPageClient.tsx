"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, LayoutGrid, List } from "lucide-react";
import { products, categories } from "@/data/products";
import { Product, Category, SortOption } from "@/types";
import ProductCard from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popularity", label: "Most Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "discount", label: "Biggest Discount" },
  { value: "newest", label: "Newest" },
];

export default function ProductsPageClient() {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<SortOption>("popularity");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [priceMax, setPriceMax] = useState(3500);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const querySearch = searchParams.get("search") || "";
  const queryCategory = searchParams.get("category") as Category | null;
  const querySale = searchParams.get("sale") === "true";

  useEffect(() => {
    if (queryCategory) setSelectedCategories([queryCategory]);
    if (querySale) setOnSaleOnly(true);
  }, [queryCategory, querySale]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (querySearch) {
      const q = querySearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (onSaleOnly) result = result.filter((p) => p.discountPercent > 0);
    if (inStockOnly) result = result.filter((p) => p.stockStatus !== "out_of_stock");
    result = result.filter((p) => p.price <= priceMax);

    switch (sort) {
      case "price_asc": result.sort((a, b) => a.price - b.price); break;
      case "price_desc": result.sort((a, b) => b.price - a.price); break;
      case "discount": result.sort((a, b) => b.discountPercent - a.discountPercent); break;
      case "popularity": result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      default: break;
    }

    return result;
  }, [querySearch, selectedCategories, onSaleOnly, inStockOnly, priceMax, sort]);

  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setOnSaleOnly(false);
    setInStockOnly(false);
    setPriceMax(3500);
  };

  const hasFilters = selectedCategories.length > 0 || onSaleOnly || inStockOnly || priceMax < 3500;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="section-title mb-1">
          {querySearch ? `Search: "${querySearch}"` : selectedCategories.length === 1 ? selectedCategories[0] : onSaleOnly ? "🔥 All Deals" : "All Products"}
        </h1>
        <p className="text-sm text-shoprite-grey-mid">{filtered.length} products found</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters - desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0" aria-label="Filters">
          <FilterPanel
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            onSaleOnly={onSaleOnly}
            setOnSaleOnly={setOnSaleOnly}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            clearFilters={clearFilters}
            hasFilters={hasFilters}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 border border-shoprite-grey-border rounded-lg px-3 py-2 text-sm font-medium hover:bg-shoprite-grey-light transition-colors"
              aria-label="Open filters"
            >
              <SlidersHorizontal size={15} aria-hidden="true" />
              Filters
              {hasFilters && <span className="bg-shoprite-red text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{selectedCategories.length + (onSaleOnly ? 1 : 0) + (inStockOnly ? 1 : 0)}</span>}
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <label htmlFor="sort-select" className="text-sm text-shoprite-grey-mid hidden sm:inline">Sort:</label>
              <div className="relative">
                <select
                  id="sort-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="appearance-none border border-shoprite-grey-border rounded-lg pl-3 pr-8 py-2 text-sm bg-white focus:outline-none focus:border-shoprite-red cursor-pointer"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-shoprite-grey-mid" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Active filters */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-4" aria-label="Active filters">
              {selectedCategories.map((cat) => (
                <span key={cat} className="flex items-center gap-1 bg-red-50 border border-red-200 text-shoprite-red text-xs font-semibold px-2 py-1 rounded-full">
                  {cat}
                  <button onClick={() => toggleCategory(cat)} aria-label={`Remove ${cat} filter`}><X size={11} /></button>
                </span>
              ))}
              {onSaleOnly && (
                <span className="flex items-center gap-1 bg-red-50 border border-red-200 text-shoprite-red text-xs font-semibold px-2 py-1 rounded-full">
                  On Sale
                  <button onClick={() => setOnSaleOnly(false)} aria-label="Remove on sale filter"><X size={11} /></button>
                </span>
              )}
              <button onClick={clearFilters} className="text-xs text-shoprite-grey-mid underline hover:text-shoprite-dark">
                Clear all
              </button>
            </div>
          )}

          {/* Product grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="font-display font-bold text-xl uppercase text-shoprite-dark mb-2">No products found</h2>
              <p className="text-shoprite-grey-mid text-sm mb-4">Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="btn-primary text-sm">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 4} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <>
          <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setShowFilters(false)} aria-hidden="true" />
          <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl flex flex-col animate-fade-in" role="dialog" aria-modal="true" aria-label="Filters">
            <div className="flex items-center justify-between px-5 py-4 border-b border-shoprite-grey-border">
              <h2 className="font-display font-bold text-lg uppercase">Filters</h2>
              <button onClick={() => setShowFilters(false)} aria-label="Close filters" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-shoprite-grey-light">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <FilterPanel
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                onSaleOnly={onSaleOnly}
                setOnSaleOnly={setOnSaleOnly}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                clearFilters={clearFilters}
                hasFilters={hasFilters}
              />
            </div>
            <div className="border-t border-shoprite-grey-border p-4">
              <button onClick={() => setShowFilters(false)} className="btn-primary w-full text-center">
                Show {filtered.length} Products
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function FilterPanel({
  selectedCategories, toggleCategory, onSaleOnly, setOnSaleOnly,
  inStockOnly, setInStockOnly, priceMax, setPriceMax, clearFilters, hasFilters,
}: {
  selectedCategories: Category[];
  toggleCategory: (cat: Category) => void;
  onSaleOnly: boolean;
  setOnSaleOnly: (v: boolean) => void;
  inStockOnly: boolean;
  setInStockOnly: (v: boolean) => void;
  priceMax: number;
  setPriceMax: (v: number) => void;
  clearFilters: () => void;
  hasFilters: boolean;
}) {
  return (
    <div className="space-y-6">
      {hasFilters && (
        <button onClick={clearFilters} className="text-xs font-semibold text-shoprite-red hover:underline w-full text-left">
          Clear all filters
        </button>
      )}

      {/* Categories */}
      <fieldset>
        <legend className="font-display font-bold text-sm uppercase tracking-widest text-shoprite-dark mb-3">Category</legend>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.name} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.name as Category)}
                onChange={() => toggleCategory(cat.name as Category)}
                className="w-4 h-4 rounded border-shoprite-grey-border text-shoprite-red focus:ring-shoprite-red accent-shoprite-red"
                aria-label={`Filter by ${cat.name}`}
              />
              <span className="text-sm text-shoprite-grey group-hover:text-shoprite-dark transition-colors">
                {cat.icon} {cat.name}
              </span>
              <span className="ml-auto text-xs text-shoprite-grey-mid">{cat.count}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Price range */}
      <div>
        <div className="font-display font-bold text-sm uppercase tracking-widest text-shoprite-dark mb-3">
          Max Price
        </div>
        <input
          type="range"
          min={10}
          max={3500}
          step={50}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-shoprite-red"
          aria-label={`Maximum price: R${priceMax}`}
        />
        <div className="flex justify-between text-xs text-shoprite-grey-mid mt-1">
          <span>R10</span>
          <span className="font-semibold text-shoprite-dark">Up to R{priceMax}</span>
          <span>R3500</span>
        </div>
      </div>

      {/* Toggles */}
      <fieldset>
        <legend className="font-display font-bold text-sm uppercase tracking-widest text-shoprite-dark mb-3">Options</legend>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={onSaleOnly} onChange={(e) => setOnSaleOnly(e.target.checked)} className="w-4 h-4 rounded accent-shoprite-red" />
            <span className="text-sm text-shoprite-grey">On Sale Only 🔥</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="w-4 h-4 rounded accent-shoprite-red" />
            <span className="text-sm text-shoprite-grey">In Stock Only</span>
          </label>
        </div>
      </fieldset>
    </div>
  );
}

"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Minus, Plus, ChevronRight, Package, AlertCircle, CheckCircle2 } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice, formatSaving } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "nutrition" | "reviews">("description");
  const { addItem, openCart } = useCart();

  const isOutOfStock = product.stockStatus === "out_of_stock";

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  };

  const mockReviews = [
    { id: "r1", author: "Thandi M.", rating: 5, comment: "Absolutely love this product! Great value for money.", date: "2024-01-15" },
    { id: "r2", author: "Johan V.", rating: 4, comment: "Good quality, delivered on time. Would buy again.", date: "2024-01-10" },
    { id: "r3", author: "Sipho N.", rating: 5, comment: "Best deal in the store. Highly recommend!", date: "2024-01-05" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-shoprite-grey-mid mb-6 flex-wrap">
        <Link href="/" className="hover:text-shoprite-red transition-colors">Home</Link>
        <ChevronRight size={12} aria-hidden="true" />
        <Link href="/products" className="hover:text-shoprite-red transition-colors">Products</Link>
        <ChevronRight size={12} aria-hidden="true" />
        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-shoprite-red transition-colors">{product.category}</Link>
        <ChevronRight size={12} aria-hidden="true" />
        <span className="text-shoprite-dark font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Product section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-shoprite-grey-light border border-shoprite-grey-border">
            {product.discountPercent > 0 && (
              <div className="absolute top-4 left-4 z-10 badge-discount text-sm px-3 py-1" aria-label={`${product.discountPercent}% off`}>
                -{product.discountPercent}%
              </div>
            )}
            {isOutOfStock && (
              <div className="absolute inset-0 z-10 bg-white/70 flex items-center justify-center">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow">
                  <AlertCircle size={16} className="text-gray-400" aria-hidden="true" />
                  <span className="font-semibold text-gray-500">Out of Stock</span>
                </div>
              </div>
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={cn("object-cover", isOutOfStock && "grayscale opacity-60")}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-shoprite-grey-mid uppercase tracking-widest">{product.category}</span>
            <span className="text-shoprite-grey-mid">·</span>
            <span className="text-xs font-semibold text-shoprite-grey-mid">{product.brand}</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl text-shoprite-dark uppercase leading-tight mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5" aria-label={`${product.rating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} className={s <= Math.round(product.rating) ? "text-shoprite-gold fill-shoprite-gold" : "text-gray-200 fill-gray-200"} aria-hidden="true" />
              ))}
            </div>
            <span className="text-sm font-semibold text-shoprite-dark">{product.rating}</span>
            <span className="text-sm text-shoprite-grey-mid">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-display font-black text-4xl text-shoprite-red">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-shoprite-grey-mid line-through text-xl">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          {product.originalPrice > product.price && (
            <div className="badge-save inline-block mb-4" aria-label={`Save ${formatSaving(product.originalPrice, product.price)}`}>
              {formatSaving(product.originalPrice, product.price)}
            </div>
          )}

          {/* Stock status */}
          <div className="flex items-center gap-1.5 mb-5">
            {product.stockStatus === "in_stock" && (
              <><CheckCircle2 size={14} className="text-shoprite-green" aria-hidden="true" /><span className="text-sm font-semibold text-shoprite-green">In Stock</span></>
            )}
            {product.stockStatus === "low_stock" && (
              <><AlertCircle size={14} className="text-shoprite-gold" aria-hidden="true" /><span className="text-sm font-semibold text-shoprite-gold">Low Stock – Order soon!</span></>
            )}
            {product.stockStatus === "out_of_stock" && (
              <><AlertCircle size={14} className="text-gray-400" aria-hidden="true" /><span className="text-sm font-semibold text-gray-400">Out of Stock</span></>
            )}
          </div>

          <p className="text-shoprite-grey text-sm leading-relaxed mb-6">{product.shortDescription}</p>

          {product.weight && (
            <div className="flex items-center gap-2 mb-5 text-sm text-shoprite-grey-mid">
              <Package size={14} aria-hidden="true" />
              <span>Weight / Volume: <strong className="text-shoprite-dark">{product.weight}</strong></span>
            </div>
          )}

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center border-2 border-shoprite-grey-border rounded-xl overflow-hidden" role="group" aria-label="Quantity selector">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-11 h-11 flex items-center justify-center hover:bg-shoprite-grey-light transition-colors disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-bold text-lg font-mono" aria-label={`Quantity: ${quantity}`}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-11 h-11 flex items-center justify-center hover:bg-shoprite-grey-light transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              aria-label={isOutOfStock ? "Out of stock" : `Add ${quantity} of ${product.name} to cart`}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 h-11 rounded-xl font-bold text-sm uppercase tracking-wide transition-all active:scale-95",
                isOutOfStock
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : added
                  ? "bg-shoprite-green text-white"
                  : "bg-shoprite-red text-white hover:bg-shoprite-red-dark"
              )}
            >
              {added ? (
                <><CheckCircle2 size={16} aria-hidden="true" /> Added to Cart!</>
              ) : (
                <><ShoppingCart size={16} aria-hidden="true" /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}</>
              )}
            </button>
          </div>

          {!isOutOfStock && (
            <p className="text-xs text-shoprite-grey-mid">Total: <strong className="text-shoprite-dark">{formatPrice(product.price * quantity)}</strong></p>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-shoprite-grey-border">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs bg-shoprite-grey-light text-shoprite-grey-mid px-2.5 py-1 rounded-full capitalize">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-12">
        <div className="flex border-b border-shoprite-grey-border mb-6" role="tablist">
          {[
            { key: "description", label: "Description" },
            ...(product.nutritionalInfo ? [{ key: "nutrition", label: "Nutritional Info" }] : []),
            { key: "reviews", label: `Reviews (${product.reviewCount})` },
          ].map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={cn(
                "px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px",
                activeTab === tab.key
                  ? "border-shoprite-red text-shoprite-red"
                  : "border-transparent text-shoprite-grey-mid hover:text-shoprite-dark"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div role="tabpanel">
          {activeTab === "description" && (
            <div className="prose prose-sm max-w-none text-shoprite-grey leading-relaxed">
              <p>{product.description || product.shortDescription}</p>
            </div>
          )}

          {activeTab === "nutrition" && product.nutritionalInfo && (
            <div className="max-w-sm">
              <h3 className="font-display font-bold text-lg uppercase mb-3">Nutritional Information</h3>
              <p className="text-xs text-shoprite-grey-mid mb-3">Per serving: {product.nutritionalInfo.servingSize}</p>
              <table className="w-full text-sm border border-shoprite-grey-border rounded-xl overflow-hidden">
                <tbody>
                  {Object.entries(product.nutritionalInfo)
                    .filter(([k]) => k !== "servingSize")
                    .map(([key, val]) => (
                      <tr key={key} className="border-b border-shoprite-grey-border last:border-0">
                        <td className="px-4 py-2 font-semibold capitalize text-shoprite-dark">{key}</td>
                        <td className="px-4 py-2 text-right text-shoprite-grey-mid">{val}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4 max-w-2xl">
              {mockReviews.map((r) => (
                <div key={r.id} className="border border-shoprite-grey-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-shoprite-red text-white font-bold flex items-center justify-center text-sm" aria-hidden="true">
                      {r.author[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-shoprite-dark">{r.author}</div>
                      <div className="flex gap-0.5" aria-label={`${r.rating} stars`}>
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={11} className={s <= r.rating ? "text-shoprite-gold fill-shoprite-gold" : "text-gray-200 fill-gray-200"} aria-hidden="true" />
                        ))}
                      </div>
                    </div>
                    <span className="ml-auto text-xs text-shoprite-grey-mid">{r.date}</span>
                  </div>
                  <p className="text-sm text-shoprite-grey">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-shoprite-red rounded-full" aria-hidden="true" />
            <h2 id="related-heading" className="section-title">You Might Also Like</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

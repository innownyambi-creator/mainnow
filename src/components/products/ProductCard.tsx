"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, AlertCircle } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice, formatSaving } from "@/lib/utils";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const [adding, setAdding] = useState(false);
  const isOutOfStock = product.stockStatus === "out_of_stock";

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    setAdding(true);
    addItem(product);
    setTimeout(() => {
      setAdding(false);
      openCart();
    }, 400);
  };

  return (
    <article className="card-product group flex flex-col h-full" aria-label={product.name}>
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-shoprite-grey-light">
          {/* Discount badge */}
          {product.discountPercent > 0 && (
            <div className="absolute top-2 left-2 z-10 badge-discount" aria-label={`${product.discountPercent}% discount`}>
              -{product.discountPercent}%
            </div>
          )}
          {/* Stock badge */}
          {product.stockStatus === "low_stock" && (
            <div className="absolute top-2 right-2 z-10 bg-shoprite-gold text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              Low stock
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 z-10 bg-white/70 flex items-center justify-center">
              <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
                <AlertCircle size={14} className="text-gray-400" aria-hidden="true" />
                <span className="text-xs font-semibold text-gray-500">Out of Stock</span>
              </div>
            </div>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-transform duration-300 group-hover:scale-105",
              isOutOfStock && "grayscale opacity-60"
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3 gap-1.5">
          {/* Category & brand */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-shoprite-grey-mid font-medium">{product.brand}</span>
            <div className="flex items-center gap-0.5" aria-label={`Rating: ${product.rating} out of 5`}>
              <Star size={11} className="text-shoprite-gold fill-shoprite-gold" aria-hidden="true" />
              <span className="text-xs text-shoprite-grey-mid">{product.rating}</span>
            </div>
          </div>

          {/* Name */}
          <h3 className="text-sm font-semibold text-shoprite-dark leading-snug line-clamp-2 group-hover:text-shoprite-red transition-colors">
            {product.name}
          </h3>

          {/* Price block */}
          <div className="mt-auto pt-2">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="price-current">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="price-original">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            {product.originalPrice > product.price && (
              <div className="badge-save inline-block mt-1" aria-label={formatSaving(product.originalPrice, product.price)}>
                {formatSaving(product.originalPrice, product.price)}
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart button - outside Link to prevent nested interactive */}
      <div className="px-3 pb-3">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          aria-label={isOutOfStock ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
          className={cn(
            "w-full flex items-center justify-center gap-2 h-9 rounded-lg text-sm font-semibold transition-all duration-150 active:scale-95",
            isOutOfStock
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : adding
              ? "bg-shoprite-green text-white"
              : "bg-shoprite-red text-white hover:bg-shoprite-red-dark"
          )}
        >
          {adding ? (
            <>
              <span>✓</span>
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart size={15} aria-hidden="true" />
              <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}

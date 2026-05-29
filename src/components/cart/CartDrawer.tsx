"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, savings, itemCount } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, closeCart]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] bg-white shadow-drawer flex flex-col transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-shoprite-grey-border bg-shoprite-grey-light">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-shoprite-red" aria-hidden="true" />
            <h2 className="font-display font-bold text-lg uppercase tracking-wide text-shoprite-dark">
              Your Cart
            </h2>
            {itemCount > 0 && (
              <span className="bg-shoprite-red text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            ref={closeBtnRef}
            onClick={closeCart}
            aria-label="Close cart"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-shoprite-grey-border transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
              <div className="w-20 h-20 bg-shoprite-grey-light rounded-full flex items-center justify-center mb-4">
                <ShoppingCart size={32} className="text-gray-300" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-xl uppercase text-shoprite-dark mb-2">Your cart is empty</h3>
              <p className="text-sm text-shoprite-grey-mid mb-6">Add some products to get started!</p>
              <button
                onClick={closeCart}
                className="btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-shoprite-grey-border" aria-label="Cart items">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 p-4 hover:bg-gray-50 transition-colors">
                  {/* Product image */}
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-shoprite-grey-light border border-shoprite-grey-border">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${product.id}`} onClick={closeCart}>
                      <h4 className="text-sm font-semibold text-shoprite-dark line-clamp-2 hover:text-shoprite-red transition-colors leading-snug">
                        {product.name}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-shoprite-red font-bold text-sm font-display">{formatPrice(product.price)}</span>
                      {product.discountPercent > 0 && (
                        <span className="badge-discount text-[10px]">-{product.discountPercent}%</span>
                      )}
                    </div>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-shoprite-grey-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label={`Decrease quantity of ${product.name}`}
                          className="w-7 h-7 flex items-center justify-center hover:bg-shoprite-grey-light transition-colors text-shoprite-grey"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold font-mono" aria-label={`Quantity: ${quantity}`}>
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label={`Increase quantity of ${product.name}`}
                          className="w-7 h-7 flex items-center justify-center hover:bg-shoprite-grey-light transition-colors text-shoprite-grey"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="text-xs text-shoprite-grey-mid ml-1">
                        = {formatPrice(product.price * quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(product.id)}
                        aria-label={`Remove ${product.name} from cart`}
                        className="ml-auto w-7 h-7 flex items-center justify-center text-gray-400 hover:text-shoprite-red hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-shoprite-grey-border bg-white px-5 py-4 space-y-3">
            {/* Savings */}
            {savings > 0 && (
              <div className="flex items-center gap-2 bg-shoprite-green-light border border-green-200 rounded-lg px-3 py-2">
                <Tag size={14} className="text-shoprite-green flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-semibold text-shoprite-green">
                  You're saving {formatPrice(savings)} on this order!
                </span>
              </div>
            )}

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-shoprite-grey">Subtotal ({itemCount} items)</span>
              <span className="font-display font-bold text-xl text-shoprite-dark">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-shoprite-grey-mid">Delivery calculated at checkout</p>

            {/* CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full bg-shoprite-red hover:bg-shoprite-red-dark text-white font-bold h-12 rounded-xl transition-colors active:scale-95 text-base font-display uppercase tracking-wide"
              aria-label={`Proceed to checkout, total ${formatPrice(total)}`}
            >
              Checkout
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-sm text-shoprite-grey hover:text-shoprite-dark text-center py-1 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

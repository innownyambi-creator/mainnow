"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ShoppingCart, MapPin, CreditCard, ArrowRight, ArrowLeft, Tag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { DeliveryAddress, PaymentMethod } from "@/types";
import { cn } from "@/lib/utils";

type Step = "cart" | "delivery" | "payment" | "confirmation";

const steps: { key: Step; label: string; icon: typeof ShoppingCart }[] = [
  { key: "cart", label: "Cart", icon: ShoppingCart },
  { key: "delivery", label: "Delivery", icon: MapPin },
  { key: "payment", label: "Payment", icon: CreditCard },
  { key: "confirmation", label: "Confirm", icon: CheckCircle2 },
];

export default function CheckoutClient() {
  const { items, total, savings, itemCount, clearCart } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [address, setAddress] = useState<Partial<DeliveryAddress>>({});
  const [payment, setPayment] = useState<Partial<PaymentMethod>>({ type: "card" });
  const [orderId] = useState(() => `SR${Date.now().toString().slice(-8)}`);

  const stepIndex = steps.findIndex((s) => s.key === step);
  const deliveryFee = total >= 500 ? 0 : 59.99;
  const grandTotal = total + deliveryFee;

  const handlePlaceOrder = () => {
    setStep("confirmation");
    clearCart();
  };

  if (step === "confirmation") {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-shoprite-green-light rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-shoprite-green" aria-hidden="true" />
        </div>
        <h1 className="font-display font-black text-4xl uppercase text-shoprite-dark mb-2">Order Confirmed!</h1>
        <p className="text-shoprite-grey-mid mb-1">Thank you for shopping at Shoprite</p>
        <p className="text-shoprite-grey-mid text-sm mb-6">
          Order <strong className="text-shoprite-dark font-mono">#{orderId}</strong> has been placed
        </p>
        <div className="bg-shoprite-grey-light rounded-2xl p-5 mb-6 text-left">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-shoprite-grey-mid">Estimated delivery</span>
            <span className="font-semibold text-shoprite-dark">2–4 business days</span>
          </div>
          {address.email && (
            <div className="flex justify-between text-sm">
              <span className="text-shoprite-grey-mid">Confirmation sent to</span>
              <span className="font-semibold text-shoprite-dark">{address.email}</span>
            </div>
          )}
        </div>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2">
          Continue Shopping
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="section-title mb-6">Checkout</h1>

      {/* Stepper */}
      <nav aria-label="Checkout steps" className="mb-8">
        <ol className="flex items-center">
          {steps.filter(s => s.key !== "confirmation").map((s, idx) => {
            const isActive = s.key === step;
            const isDone = stepIndex > idx;
            return (
              <li key={s.key} className="flex items-center flex-1 last:flex-none">
                <div className={cn(
                  "flex items-center gap-2",
                  isDone ? "text-shoprite-green" : isActive ? "text-shoprite-red" : "text-shoprite-grey-mid"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2",
                    isDone ? "bg-shoprite-green border-shoprite-green text-white" :
                    isActive ? "bg-shoprite-red border-shoprite-red text-white" :
                    "bg-white border-shoprite-grey-border text-shoprite-grey-mid"
                  )} aria-current={isActive ? "step" : undefined}>
                    {isDone ? <CheckCircle2 size={14} aria-hidden="true" /> : <s.icon size={14} aria-hidden="true" />}
                  </div>
                  <span className="text-xs font-semibold hidden sm:inline">{s.label}</span>
                </div>
                {idx < 2 && (
                  <div className={cn("flex-1 h-0.5 mx-2", isDone ? "bg-shoprite-green" : "bg-shoprite-grey-border")} aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2">
          {step === "cart" && (
            <CartReview items={items} itemCount={itemCount} onNext={() => setStep("delivery")} />
          )}
          {step === "delivery" && (
            <DeliveryForm address={address} setAddress={setAddress} onBack={() => setStep("cart")} onNext={() => setStep("payment")} />
          )}
          {step === "payment" && (
            <PaymentForm payment={payment} setPayment={setPayment} onBack={() => setStep("delivery")} onPlace={handlePlaceOrder} />
          )}
        </div>

        {/* Order summary sidebar */}
        <aside className="bg-shoprite-grey-light rounded-2xl p-5 h-fit" aria-label="Order summary">
          <h2 className="font-display font-bold text-lg uppercase mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-shoprite-grey-mid">Subtotal ({itemCount} items)</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-shoprite-green">
                <span>Savings</span>
                <span className="font-semibold">-{formatPrice(savings)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-shoprite-grey-mid">Delivery</span>
              <span className="font-semibold">{deliveryFee === 0 ? <span className="text-shoprite-green">FREE</span> : formatPrice(deliveryFee)}</span>
            </div>
            {deliveryFee > 0 && (
              <p className="text-xs text-shoprite-grey-mid">Free delivery on orders over R500</p>
            )}
          </div>
          <div className="border-t border-shoprite-grey-border pt-3 flex justify-between items-baseline">
            <span className="font-bold text-shoprite-dark">Total</span>
            <span className="font-display font-black text-2xl text-shoprite-red">{formatPrice(grandTotal)}</span>
          </div>
          {savings > 0 && (
            <div className="flex items-center gap-1.5 mt-3 bg-shoprite-green-light border border-green-200 rounded-lg px-3 py-2">
              <Tag size={12} className="text-shoprite-green" aria-hidden="true" />
              <span className="text-xs font-semibold text-shoprite-green">Saving {formatPrice(savings)}!</span>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function CartReview({ items, itemCount, onNext }: { items: any[]; itemCount: number; onNext: () => void }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">🛒</div>
        <h2 className="font-display font-bold text-xl uppercase mb-2">Your cart is empty</h2>
        <Link href="/products" className="btn-primary inline-block mt-4">Start Shopping</Link>
      </div>
    );
  }
  return (
    <div>
      <h2 className="font-display font-bold text-xl uppercase mb-4">Review Your Cart ({itemCount} items)</h2>
      <ul className="space-y-3 mb-6" aria-label="Cart items">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="flex gap-3 bg-white rounded-xl p-3 border border-shoprite-grey-border">
            <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-shoprite-grey-light">
              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="56px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-shoprite-dark line-clamp-1">{product.name}</p>
              <p className="text-xs text-shoprite-grey-mid">{product.brand}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-shoprite-grey-mid">Qty: {quantity}</span>
                <span className="font-bold text-shoprite-red text-sm">{formatPrice(product.price * quantity)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={onNext} className="btn-primary w-full flex items-center justify-center gap-2">
        Continue to Delivery
        <ArrowRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

function DeliveryForm({ address, setAddress, onBack, onNext }: {
  address: Partial<DeliveryAddress>;
  setAddress: (a: Partial<DeliveryAddress>) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const update = (field: keyof DeliveryAddress, val: string) => setAddress({ ...address, [field]: val });
  const isValid = address.firstName && address.lastName && address.email && address.phone && address.address && address.city && address.postalCode;

  return (
    <div>
      <h2 className="font-display font-bold text-xl uppercase mb-4">Delivery Address</h2>
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {[
          { field: "firstName", label: "First Name", type: "text", required: true },
          { field: "lastName", label: "Last Name", type: "text", required: true },
          { field: "email", label: "Email Address", type: "email", required: true, span: true },
          { field: "phone", label: "Phone Number", type: "tel", required: true },
          { field: "address", label: "Street Address", type: "text", required: true, span: true },
          { field: "suburb", label: "Suburb", type: "text" },
          { field: "city", label: "City / Town", type: "text", required: true },
          { field: "province", label: "Province", type: "text" },
          { field: "postalCode", label: "Postal Code", type: "text", required: true },
        ].map(({ field, label, type, required, span }) => (
          <div key={field} className={span ? "sm:col-span-2" : ""}>
            <label htmlFor={field} className="block text-xs font-semibold text-shoprite-dark mb-1">
              {label}{required && <span className="text-shoprite-red ml-0.5" aria-hidden="true">*</span>}
            </label>
            <input
              id={field}
              type={type}
              value={(address as any)[field] || ""}
              onChange={(e) => update(field as keyof DeliveryAddress, e.target.value)}
              required={required}
              className="w-full h-10 px-3 border border-shoprite-grey-border rounded-lg text-sm focus:outline-none focus:border-shoprite-red bg-white"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={onBack} className="btn-outline flex items-center gap-2">
          <ArrowLeft size={16} aria-hidden="true" /> Back
        </button>
        <button onClick={onNext} disabled={!isValid} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          Continue to Payment <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function PaymentForm({ payment, setPayment, onBack, onPlace }: {
  payment: Partial<PaymentMethod>;
  setPayment: (p: Partial<PaymentMethod>) => void;
  onBack: () => void;
  onPlace: () => void;
}) {
  const isValid = payment.type === "eft" || payment.type === "cash" ||
    (payment.type === "card" && payment.cardNumber && payment.cardExpiry && payment.cardCvv && payment.cardHolder);

  return (
    <div>
      <h2 className="font-display font-bold text-xl uppercase mb-4">Payment Method</h2>

      <fieldset className="mb-5">
        <legend className="sr-only">Payment method</legend>
        <div className="space-y-2">
          {[
            { value: "card", label: "💳 Credit / Debit Card" },
            { value: "eft", label: "🏦 EFT / Bank Transfer" },
            { value: "cash", label: "💵 Cash on Delivery" },
          ].map(({ value, label }) => (
            <label key={value} className={cn(
              "flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors",
              payment.type === value ? "border-shoprite-red bg-red-50" : "border-shoprite-grey-border hover:border-shoprite-grey"
            )}>
              <input
                type="radio"
                name="paymentType"
                value={value}
                checked={payment.type === value}
                onChange={() => setPayment({ ...payment, type: value as "card" | "eft" | "cash" })}
                className="accent-shoprite-red"
              />
              <span className="font-semibold text-sm">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {payment.type === "card" && (
        <div className="space-y-3 mb-6 bg-white border border-shoprite-grey-border rounded-xl p-4">
          {[
            { field: "cardHolder", label: "Cardholder Name", placeholder: "John Smith", span: true },
            { field: "cardNumber", label: "Card Number", placeholder: "1234 5678 9012 3456", span: true },
            { field: "cardExpiry", label: "Expiry Date", placeholder: "MM/YY" },
            { field: "cardCvv", label: "CVV", placeholder: "123" },
          ].map(({ field, label, placeholder, span }) => (
            <div key={field} className={span ? "" : "inline-block w-full sm:w-1/2 sm:pr-1.5"}>
              <label htmlFor={field} className="block text-xs font-semibold text-shoprite-dark mb-1">{label}</label>
              <input
                id={field}
                type="text"
                placeholder={placeholder}
                value={(payment as any)[field] || ""}
                onChange={(e) => setPayment({ ...payment, [field]: e.target.value })}
                className="w-full h-10 px-3 border border-shoprite-grey-border rounded-lg text-sm focus:outline-none focus:border-shoprite-red"
              />
            </div>
          ))}
        </div>
      )}

      {payment.type === "eft" && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm">
          <p className="font-semibold text-blue-800 mb-1">EFT Banking Details</p>
          <p className="text-blue-700">Bank: <strong>Standard Bank</strong></p>
          <p className="text-blue-700">Account: <strong>1234567890</strong></p>
          <p className="text-blue-700">Branch: <strong>051001</strong></p>
          <p className="text-xs text-blue-600 mt-2">Use your order number as reference. Allow 1–2 business days.</p>
        </div>
      )}

      {payment.type === "cash" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800">
          <p className="font-semibold mb-1">Cash on Delivery</p>
          <p>Please have the exact amount ready when your order arrives.</p>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-outline flex items-center gap-2">
          <ArrowLeft size={16} aria-hidden="true" /> Back
        </button>
        <button onClick={onPlace} disabled={!isValid} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          <CheckCircle2 size={16} aria-hidden="true" /> Place Order
        </button>
      </div>
    </div>
  );
}

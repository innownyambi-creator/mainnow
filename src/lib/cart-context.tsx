"use client";
import React, { createContext, useContext, useReducer, useCallback } from "react";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity?: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  total: number;
  savings: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(i => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: action.quantity ?? 1 }],
      };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(i => i.product.id !== action.productId) };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.product.id !== action.productId) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const total = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const savings = state.items.reduce(
    (sum, i) => sum + (i.product.originalPrice - i.product.price) * i.quantity,
    0
  );

  const addItem = useCallback((product: Product, quantity?: number) => {
    dispatch({ type: "ADD_ITEM", product, quantity });
  }, []);
  const removeItem = useCallback((productId: string) => dispatch({ type: "REMOVE_ITEM", productId }), []);
  const updateQuantity = useCallback((productId: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE_CART" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);

  return (
    <CartContext.Provider value={{
      items: state.items, isOpen: state.isOpen,
      itemCount, total, savings,
      addItem, removeItem, updateQuantity,
      clearCart, toggleCart, openCart, closeCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice: number;
  image: string;
  images?: string[];
  discountPercent: number;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
  shortDescription: string;
  description?: string;
  brand: string;
  weight?: string;
  nutritionalInfo?: NutritionalInfo;
  reviews?: Review[];
  rating: number;
  reviewCount: number;
  tags?: string[];
  isOnPromotion?: boolean;
  isFeatured?: boolean;
}

export type Category =
  | "Groceries"
  | "Household"
  | "Electronics"
  | "Liquor"
  | "Fresh Produce"
  | "Bakery";

export interface NutritionalInfo {
  servingSize?: string;
  calories?: number;
  fat?: string;
  carbs?: string;
  protein?: string;
  sodium?: string;
  sugar?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
  savings: number;
}

export interface DeliveryAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface PaymentMethod {
  type: "card" | "eft" | "cash";
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  cardHolder?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  total: number;
  savings: number;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered";
  createdAt: string;
  estimatedDelivery: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  suburb: string;
  city: string;
  province: string;
  phone: string;
  hours: StoreHours;
  lat?: number;
  lng?: number;
  services: string[];
}

export interface StoreHours {
  weekdays: string;
  saturday: string;
  sunday: string;
  publicHolidays: string;
}

export interface FilterState {
  categories: Category[];
  priceRange: [number, number];
  brands: string[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
}

export type SortOption =
  | "popularity"
  | "price_asc"
  | "price_desc"
  | "discount"
  | "newest";

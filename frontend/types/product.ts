// Product type (from your earlier interface)
export interface Product {
  _id: string;
  name: string;
  prize: number;
  images: { url: string; altText: string }[];
  originPrce?: number;
  description?: string;
  brand?: string;
  material?: string;
  sizes?: string[];
  colors?: string[];
  originlPrize?: string;
}

// Props for ProductGrid
export interface ProductType {
  products: Product[];
  loading: boolean; // true when fetching data
  error: string | null; // error message, null if no error
}

export interface ProductDetailsProps {
  productId: string;
}

export interface orderType {
  _id: string;
  createdAt: string;
  shippingAddress: { city: string; country: string };
  orderItems: { name: string; image: string }[];
  totalPrice: number;
  isPaid: boolean;
}

export interface filterTypes {
  category: string;
  gender: string;
  color: string;
  size: string[];
  material: string[];
  brand: string[];
  minPrice: number;
  maxPrice: number;
}

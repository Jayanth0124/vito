export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  fullDescription: string;
  sizes: string[];
  colors: string[];
  category: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface FilterState {
  priceRange: [number, number];
  categories: string[];
  sizes: string[];
  colors: string[];
}
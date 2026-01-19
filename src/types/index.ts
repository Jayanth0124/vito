export type Category = 'Formal' | 'Bomber' | 'Sporty' | 'Casual';

export interface Product {
  id: string;
  name: string;
  type: Category;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}
export interface Product {
  id: string;
  name: string;
  type: 'Formal' | 'Bomber' | 'Sporty' | 'Casual';
  price: number; // Used for estimate, not payment
  image: string;
}

export const products: Product[] = [
  { id: '1', name: 'Milanese Drape', type: 'Formal', price: 500, image: 'https://placehold.co/400x600/111/fff?text=Formal' },
  { id: '2', name: 'Aviator Alpha', type: 'Bomber', price: 350, image: 'https://placehold.co/400x600/222/fff?text=Bomber' },
  { id: '3', name: 'Kinetic Tech', type: 'Sporty', price: 280, image: 'https://placehold.co/400x600/333/fff?text=Sporty' },
  { id: '4', name: 'Urban Tweed', type: 'Casual', price: 400, image: 'https://placehold.co/400x600/444/fff?text=Casual' },
];
export interface Product {
  id: string;
  name: string;
  type: 'Formal' | 'Bomber' | 'Sporty' | 'Casual';
  price: number;
  image: string; 
  description?: string;
  sizes?: string[];
  colors?: string[];
  // New: Map colors to specific image arrays
  colorImages?: { [key: string]: string[] };
}

export const products: Product[] = [
  { 
    id: '1', 
    name: 'Milanese Drape', 
    type: 'Formal', 
    price: 500, 
    image: 'https://placehold.co/400x600/111/fff?text=Milanese+Black',
    description: 'Crafted from premium Italian wool, this drape offers a sophisticated silhouette for the modern gentleman.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#2C3E50'],
    colorImages: {
      '#000000': [
        'https://placehold.co/600x800/111/fff?text=Black+Front',
        'https://placehold.co/600x800/151515/fff?text=Black+Side',
        'https://placehold.co/600x800/222/fff?text=Black+Detail'
      ],
      '#2C3E50': [
        'https://placehold.co/600x800/2C3E50/fff?text=Navy+Front',
        'https://placehold.co/600x800/34495E/fff?text=Navy+Side',
        'https://placehold.co/600x800/2980B9/fff?text=Navy+Detail'
      ]
    }
  },
  { 
    id: '2', 
    name: 'Aviator Alpha', 
    type: 'Bomber', 
    price: 350, 
    image: 'https://placehold.co/400x600/222/fff?text=Aviator+Dark',
    description: 'A classic aviator cut reimagined with technical fabrics. Water-resistant, wind-proof, and effortlessly cool.',
    sizes: ['M', 'L', 'XL'],
    colors: ['#222222', '#8B4513'],
    colorImages: {
      '#222222': [
        'https://placehold.co/600x800/222/fff?text=Dark+Front',
        'https://placehold.co/600x800/333/fff?text=Dark+Back',
        'https://placehold.co/600x800/111/fff?text=Dark+Lining'
      ],
      '#8B4513': [
        'https://placehold.co/600x800/8B4513/fff?text=Brown+Front',
        'https://placehold.co/600x800/A0522D/fff?text=Brown+Back',
        'https://placehold.co/600x800/CD853F/fff?text=Brown+Texture'
      ]
    }
  },
  { 
    id: '3', 
    name: 'Kinetic Shell', 
    type: 'Sporty', 
    price: 290, 
    image: 'https://placehold.co/400x600/333/fff?text=Kinetic+Tech',
    description: 'Engineered for movement. This piece utilizes 4-way stretch material to keep you comfortable.',
    sizes: ['S', 'M', 'L'],
    colors: ['#333333'],
    colorImages: {
      '#333333': [
        'https://placehold.co/600x800/333/fff?text=Tech+Front',
        'https://placehold.co/600x800/444/fff?text=Tech+Action',
        'https://placehold.co/600x800/555/fff?text=Tech+Zoom'
      ]
    }
  },
  { 
    id: '4', 
    name: 'Urban Tweed', 
    type: 'Casual', 
    price: 420, 
    image: 'https://placehold.co/400x600/444/fff?text=Casual+Fit',
    description: 'The perfect blend of heritage and street style. Rough-hewn tweed texture meets a contemporary cut.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['#444444', '#5D4037'],
    colorImages: {
      '#444444': [
        'https://placehold.co/600x800/444/fff?text=Grey+Front',
        'https://placehold.co/600x800/555/fff?text=Grey+Side',
        'https://placehold.co/600x800/666/fff?text=Grey+Detail'
      ],
      '#5D4037': [
        'https://placehold.co/600x800/5D4037/fff?text=Cocoa+Front',
        'https://placehold.co/600x800/795548/fff?text=Cocoa+Side',
        'https://placehold.co/600x800/8D6E63/fff?text=Cocoa+Detail'
      ]
    }
  },
];
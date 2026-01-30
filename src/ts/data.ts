export interface Product {
  id: string;
  name: string;
  type: 'Formal' | 'Bomber' | 'Sporty' | 'Casual';
  price: number;         // Discounted Price (e.g., 499)
  originalPrice: number; // Strikethrough Price (e.g., 999)
  image: string; 
  description?: string;
  sizes?: string[];
  colors?: string[];
  colorImages?: { [key: string]: string[] };
}

export const products: Product[] = [
  { 
    id: '1', 
    name: 'Milanese Drape', 
    type: 'Formal', 
    price: 499, 
    originalPrice: 999,
    image: 'https://www.alphaindustries.com/cdn/shop/files/cwu-45p-heritage-fit-flight-jacket-usa-made-outerwear-black-xs-713938_3000x3000.jpg?v=1765225042',
    description: 'Crafted from premium Italian wool, this drape offers a sophisticated silhouette for the modern gentleman.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#2C3E50'],
    colorImages: {
      '#000000': [
        'https://www.alphaindustries.com/cdn/shop/files/cwu-45p-heritage-fit-flight-jacket-usa-made-outerwear-black-xs-713938_3000x3000.jpg?v=1765225042',
        'https://www.alphaindustries.com/cdn/shop/files/cwu-45p-heritage-fit-flight-jacket-usa-made-outerwear-478146_3000x3000.jpg?v=1765224925',
        'https://www.alphaindustries.com/cdn/shop/files/cwu-45p-heritage-fit-flight-jacket-usa-made-outerwear-861467_3000x3000.jpg?v=1765653223',
        'https://www.alphaindustries.com/cdn/shop/files/cwu-45p-heritage-fit-flight-jacket-usa-made-outerwear-648084_3000x3000.jpg?v=1765224911'
      ],
      '#2C3E50': [
        'https://www.alphaindustries.com/cdn/shop/products/ma-1-bomber-jacket-heritage-outerwear-replica-blue-xs-707577_3000x3000.jpg?v=1756742120',
        'https://www.alphaindustries.com/cdn/shop/products/ma-1-bomber-jacket-heritage-outerwear-201003_3000x3000.jpg?v=1756742120',
        'https://www.alphaindustries.com/cdn/shop/products/ma-1-bomber-jacket-heritage-outerwear-273216_3000x3000.jpg?v=1756742267'
      ]
    }
  },
  { 
    id: '2', 
    name: 'Aviator Alpha', 
    type: 'Bomber', 
    price: 499, 
    originalPrice: 999,
    image: 'https://www.alphaindustries.com/cdn/shop/files/cwu-45p-bomber-jacket-heritage-outerwear-vintage-khaki-xs-332895_3000x3000.jpg?v=1769631751',
    description: 'A classic aviator cut reimagined with technical fabrics. Water-resistant, wind-proof, and effortlessly cool.',
    sizes: ['M', 'L', 'XL'],
    colors: ['#8B4513','#222222' ],
    colorImages: {
      '#8B4513': [
        'https://www.alphaindustries.com/cdn/shop/files/cwu-45p-bomber-jacket-heritage-outerwear-vintage-khaki-xs-332895_3000x3000.jpg?v=1769631751',
        'https://www.alphaindustries.com/cdn/shop/files/cwu-45p-bomber-jacket-heritage-outerwear-260678_3000x3000.jpg?v=1769631798',
        'https://www.alphaindustries.com/cdn/shop/files/cwu-45p-bomber-jacket-heritage-outerwear-809445_3000x3000.jpg?v=1769631846'
      ],
      '#222222': [
        'https://www.alphaindustries.com/cdn/shop/products/cwu-45p-bomber-jacket-heritage-outerwear-black-xs-997938_3000x3000.jpg?v=1756742524',
        'https://www.alphaindustries.com/cdn/shop/products/cwu-45p-bomber-jacket-heritage-outerwear-954752_3000x3000.jpg?v=1756742524',
        'https://www.alphaindustries.com/cdn/shop/products/cwu-45p-bomber-jacket-heritage-outerwear-724542_3000x3000.jpg?v=1756742524'
      ]
      
    }
  },
  { 
    id: '3', 
    name: 'Kinetic Shell', 
    type: 'Sporty', 
    price: 599, 
    originalPrice: 999,
    image: 'https://www.alphaindustries.com/cdn/shop/files/slam-jam-x-alpha-cwu-45-chaos-collab-replica-grey-xs-140799_3000x3000.jpg?v=1765224307',
    description: 'Engineered for movement. This piece utilizes 4-way stretch material to keep you comfortable.',
    sizes: ['S', 'M', 'L'],
    colors: ['#333333'],
    colorImages: {
      '#333333': [
        'https://www.alphaindustries.com/cdn/shop/files/slam-jam-x-alpha-cwu-45-chaos-collab-replica-grey-xs-140799_3000x3000.jpg?v=1765224307',
        'https://www.alphaindustries.com/cdn/shop/files/slam-jam-x-alpha-cwu-45-chaos-collab-810685_3000x3000.jpg?v=1765224999',
        'https://www.alphaindustries.com/cdn/shop/files/slam-jam-x-alpha-cwu-45-chaos-collab-553552_3000x3000.jpg?v=1765224999'
      ]
    }
  },
  { 
    id: '4', 
    name: 'Urban Tweed', 
    type: 'Casual', 
    price: 699, 
    originalPrice: 1299,
    image: 'https://www.alphaindustries.com/cdn/shop/products/b-3-sherpa-leather-bomber-jacket-outerwear-brown-4xl-229610_3000x3000.jpg?v=1762198117',
    description: 'The perfect blend of heritage and street style. Rough-hewn tweed texture meets a contemporary cut.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['#5D4037','#030303'],
    colorImages: {
      '#5D4037': [
        'https://www.alphaindustries.com/cdn/shop/products/b-3-sherpa-leather-bomber-jacket-outerwear-brown-4xl-229610_3000x3000.jpg?v=1762198117',
        'https://www.alphaindustries.com/cdn/shop/products/b-3-sherpa-leather-bomber-jacket-outerwear-279697_3000x3000.jpg?v=1738663246',
        'https://www.alphaindustries.com/cdn/shop/products/b-3-sherpa-leather-bomber-jacket-outerwear-277636_3000x3000.jpg?v=1738662929'
      ],
      '#030303': [
        'https://www.alphaindustries.com/cdn/shop/files/pu-college-jacket-flight-black-xs-267498_3000x3000.jpg?v=1764803663',
        'https://www.alphaindustries.com/cdn/shop/files/pu-college-jacket-flight-968958_3000x3000.jpg?v=1764804125',
        'https://www.alphaindustries.com/cdn/shop/files/pu-college-jacket-flight-782647_3000x3000.jpg?v=1764804129'
      ]
    }
  },
];
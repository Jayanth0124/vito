import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    title: "Luxury Leather Jacket",
    price: 4999,
    originalPrice: 6999,
    description: "Handcrafted Italian leather jacket with quilted interior.",
    fullDescription: "Experience unparalleled luxury with our handcrafted Italian leather jacket. Made from the finest grain leather and featuring a quilted silk interior, this jacket embodies sophistication and style. Perfect for formal occasions or elevated casual wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    category: "Leather",
    image: "/images/D2.jpg",
    images: [
      "/images/D2.jpg",
      "/images/D2_1.jpg"
    ],
    rating: 4.8,
    reviews: 124,
    featured: true
  },
  {
    id: 2,
    title: "Urban Bomber Jacket",
    price: 3799,
    originalPrice: 4999,
    description: "Stylish bomber for daily wear with durable fabric.",
    fullDescription: "Our urban bomber jacket combines street style with premium quality. Crafted from durable yet comfortable fabric, this jacket features ribbed cuffs, a zip closure, and modern cut that's perfect for contemporary fashion enthusiasts.",
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Navy", "Olive"],
    category: "Casual",
    image: "/images/D8.jpg",
    images: [
      "/images/D8.jpg",
      "/images/D8_1.jpg"
    ],
    rating: 4.6,
    reviews: 89,
    featured: true
  },
  {
    id: 3,
    title: "Executive Blazer",
    price: 5999,
    originalPrice: 7999,
    description: "Premium wool blazer for sophisticated occasions.",
    fullDescription: "Elevate your professional wardrobe with our executive blazer. Tailored from premium wool blend with a modern slim fit, this blazer is perfect for business meetings, formal events, and special occasions.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Charcoal", "Black"],
    category: "Formal",
    image: "/images/D4.jpg",
    images: [
      "/images/D4.jpg",
      "/images/D4_1.jpg"
    ],
    rating: 4.9,
    reviews: 156,
    featured: true
  },
  {
    id: 4,
    title: "Vintage Denim Jacket",
    price: 2999,
    originalPrice: 3999,
    description: "Classic denim with modern premium finishing.",
    fullDescription: "Reimagine the classic denim jacket with our premium vintage-inspired design. Features high-quality denim fabric, copper hardware, and a comfortable fit that works for both casual and smart-casual occasions.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black", "Gray"],
    category: "Casual",
    image: "/images/D6.jpg",
    images: [
      "/images/D6.jpg",
      "/images/D6_1.jpg"
    ],
    rating: 4.5,
    reviews: 73,
    featured: true
  },
  {
    id: 5,
    title: "Wool Overcoat",
    price: 7999,
    originalPrice: 9999,
    description: "Elegant long coat for winter sophistication.",
    fullDescription: "Stay warm and stylish with our premium wool overcoat. This elegant long coat features a timeless design, premium wool construction, and sophisticated details that make it perfect for formal winter occasions.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Navy", "Camel"],
    category: "Formal",
    image: "/images/D5.jpg",
    images: [
      "/images/D5.jpg",
      "/images/D5_1.jpg"
    ],
    rating: 4.7,
    reviews: 92,
    featured: true
  },
  {
    id: 6,
    title: "Sport Track Jacket",
    price: 2799,
    originalPrice: 3499,
    description: "Athletic-inspired jacket with premium materials.",
    fullDescription: "Combine athletic functionality with premium style in our sport track jacket. Features moisture-wicking fabric, ergonomic design, and modern aesthetics perfect for active lifestyles and athleisure wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Gray"],
    category: "Sport",
    image: "/images/D7_1.jpg",
    images: [
      "/images/D7_1.jpg",
      "/images/D7.jpg",
    ],
    rating: 4.4,
    reviews: 67,
    featured: true
  },
  {
    id: 7,
    title: "Suede Moto Jacket",
    price: 6499,
    originalPrice: 8499,
    description: "Premium suede with classic moto styling.",
    fullDescription: "Experience luxury with our premium suede moto jacket. Crafted from the finest suede leather with classic moto detailing, asymmetric zip, and premium hardware for the ultimate in style and comfort.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Tan", "Black", "Gray"],
    category: "Leather",
    image: "/images/D10_1.jpg",
    images: [
      "/images/D3.jpg",
      "/images/D3_1.jpg",
    ],
    rating: 4.6,
    reviews: 45,
    featured: true
  },
  {
    id: 8,
    title: "Quilted Field Jacket",
    price: 4299,
    originalPrice: 5499,
    description: "Functional field jacket with quilted lining.",
    fullDescription: "Perfect for outdoor adventures and urban exploration, our quilted field jacket combines functionality with style. Features water-resistant fabric, quilted lining, and multiple pockets for ultimate utility.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Olive", "Navy", "Black"],
    category: "Casual",
    image: "/images/D1_1.jpg",
    images: [
      "/images/D1_1.jpg",
      "/images/D1.jpg",
    ],
    rating: 4.5,
    reviews: 83,
    featured: true
  }
];

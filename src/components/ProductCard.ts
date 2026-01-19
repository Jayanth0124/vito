import { Product } from '../types';

export const createProductCard = (product: Product): string => {
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="img-wrapper">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="card-details">
        <h3>${product.name}</h3>
        <p>${product.type}</p>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `;
};
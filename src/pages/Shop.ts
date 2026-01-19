import { inventory } from '../data/inventory';
import { createProductCard } from '../components/ProductCard';
import { CartStore } from '../core/CartStore';

export const initShop = () => {
  const grid = document.getElementById('shop-grid');
  if (!grid) return;

  // Render Grid
  grid.innerHTML = inventory.map(product => createProductCard(product)).join('');

  // Event Delegation for "Add to Cart"
  grid.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('add-to-cart-btn')) {
      const id = target.dataset.id;
      const product = inventory.find(p => p.id === id);
      if (product) {
        CartStore.getInstance().addItem(product);
        // Optional: Show simple feedback toast here
        console.log('Added', product.name);
      }
    }
  });
};
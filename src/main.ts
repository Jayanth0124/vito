import { CartManager } from './ts/cart';
import { CheckoutManager } from './ts/checkout';
import { initScroll } from './ts/scroll';
import { products } from './ts/data';
import barba from '@barba/core';
import gsap from 'gsap';

declare global {
  interface Window { cart: CartManager; }
}

const cart = new CartManager();
window.cart = cart; 
new CheckoutManager(cart);

// =========================================
// Page Initialization Logic
// =========================================
const initPage = (container: Document | HTMLElement = document) => {
  initScroll();
  
  // 1. Mobile Menu Logic (Fixed Overlay Issue)
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.overlay');

  if (mobileToggle && navLinks) {
    const newToggle = mobileToggle.cloneNode(true) as HTMLElement;
    mobileToggle.parentNode?.replaceChild(newToggle, mobileToggle);
    
    newToggle.addEventListener('click', () => {
      newToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      // No overlay toggle for menu to keep it clean, only menu slides in
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        newToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Render Product Grid
  const shopContainer = container.querySelector('#shop-container');
  if (shopContainer) {
    renderGrid(products, shopContainer as HTMLElement);
    
    // 3. Bind Grid Events (Quantity +/- and Add)
    // We bind to the container to catch clicks on any card
    shopContainer.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      
      // Handle +/- Buttons
      if (target.classList.contains('qty-btn-grid')) {
        const action = target.dataset.action; // 'inc' or 'dec'
        const input = target.parentElement?.querySelector('.qty-input') as HTMLInputElement;
        
        if (input) {
          let val = parseInt(input.value);
          if (action === 'inc') val++;
          if (action === 'dec' && val > 1) val--;
          input.value = val.toString();
        }
      }

      // Handle Add To Cart Button
      if (target.classList.contains('add-btn')) {
        const id = target.dataset.id;
        // Find the quantity input in the same card
        const card = target.closest('.product-card');
        const input = card?.querySelector('.qty-input') as HTMLInputElement;
        const qty = input ? parseInt(input.value) : 1;
        
        const product = products.find(p => p.id === id);
        if (product) {
          cart.add(product, qty);
        }
      }
    });
  }

  // 4. Category Filter Logic
  const catBlocks = container.querySelectorAll('.cat-block');
  if (catBlocks.length > 0 && shopContainer) {
    catBlocks.forEach((block: any) => {
      block.addEventListener('click', (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const category = target.dataset.filter;
        shopContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const filteredProducts = category === 'all' ? products : products.filter(p => p.type === category);
        renderGrid(filteredProducts, shopContainer as HTMLElement);
      });
    });
  }

  // 5. Cart & Modals
  const cartTrigger = document.getElementById('cart-trigger');
  if (cartTrigger) {
    cartTrigger.onclick = (e) => {
      e.preventDefault();
      document.getElementById('cart-sidebar')?.classList.add('active');
      document.querySelector('.overlay')?.classList.add('active');
      
      document.querySelector('.nav-links')?.classList.remove('active');
      document.querySelector('.mobile-toggle')?.classList.remove('active');
    };
  }

  const closeElements = document.querySelectorAll('.btn-close-cart, .overlay, #close-checkout');
  closeElements.forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.modal-panel, .overlay, .nav-links').forEach(m => m.classList.remove('active'));
      document.querySelector('.mobile-toggle')?.classList.remove('active');
    });
  });
};

const renderGrid = (items: typeof products, container: HTMLElement) => {
  container.innerHTML = items.map(p => `
    <div class="product-card">
      <div style="overflow:hidden; height: 450px; background-color: #f4f4f4; position: relative;">
         <img src="${p.image}" class="parallax-img" loading="lazy" style="width:100%; height:110%; object-fit:cover; position: absolute; top: 0; left: 0;" alt="${p.name}">
      </div>
      <div class="product-info">
        <div>
          <h3 style="font-size: 1.1rem;">${p.name}</h3>
          <p style="color: #666; font-size: 0.85rem;">${p.type}</p>
        </div>
      </div>
      <div class="product-actions">
        <div class="qty-selector">
           <button class="qty-btn qty-btn-grid" data-action="dec">-</button>
           <input type="text" class="qty-input" value="1" readonly>
           <button class="qty-btn qty-btn-grid" data-action="inc">+</button>
        </div>
        <button class="btn add-btn" data-id="${p.id}">Add</button>
      </div>
    </div>
  `).join('');
};

barba.init({
  sync: true, 
  transitions: [{
    name: 'fade',
    async leave(data: any) {
      return gsap.to(data.current.container, { opacity: 0, duration: 0.5 });
    },
    enter(data: any) {
      initPage(data.next.container);
      return gsap.from(data.next.container, { opacity: 0, duration: 0.5 });
    }
  }]
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initPage(document));
} else {
  initPage(document);
}
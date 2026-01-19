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
// Page Initialization Logic (Scoped)
// =========================================
const initPage = (container: Document | HTMLElement = document) => {
  initScroll();
  
  // 1. Mobile Menu Toggle Logic
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.overlay');

  if (mobileToggle && navLinks) {
    // Clone to remove old event listeners to avoid duplication
    // FIX: Cast to HTMLElement to access specific properties like parentNode style or addEventListener
    const newToggle = mobileToggle.cloneNode(true) as HTMLElement;
    mobileToggle.parentNode?.replaceChild(newToggle, mobileToggle);
    
    newToggle.addEventListener('click', () => {
      newToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      overlay?.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        newToggle.classList.remove('active');
        navLinks.classList.remove('active');
        overlay?.classList.remove('active');
      });
    });
  }

  // 2. Render Product Grid
  const shopContainer = container.querySelector('#shop-container');
  if (shopContainer) {
    renderGrid(products, shopContainer as HTMLElement);
  }

  // 3. Category Blocks Logic (The Big Black Squares)
  const catBlocks = container.querySelectorAll('.cat-block');
  if (catBlocks.length > 0 && shopContainer) {
    catBlocks.forEach((block: any) => {
      block.addEventListener('click', (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const category = target.dataset.filter;
        
        // Visual Feedback (Scroll to grid)
        shopContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Filter Logic
        const filteredProducts = category === 'all' ? products : products.filter(p => p.type === category);
        renderGrid(filteredProducts, shopContainer as HTMLElement);
      });
    });
  }
  
  // 4. Simple Button Filter Logic (Fallback for footer links)
  const filters = container.querySelectorAll('.category-filter');
  if (filters.length > 0 && shopContainer) {
    filters.forEach((btn: any) => {
      btn.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const category = target.dataset.filter;
        const filteredProducts = category === 'all' ? products : products.filter(p => p.type === category);
        renderGrid(filteredProducts, shopContainer as HTMLElement);
        shopContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      // Close mobile menu if open
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
        <button class="btn" style="padding: 0.5rem 1.5rem;" onclick='window.cart.add(${JSON.stringify(p)})'>Add</button>
      </div>
    </div>
  `).join('');
};

barba.init({
  sync: true, 
  transitions: [{
    name: 'fade',
    // FIX: Added type 'any' to data parameter
    async leave(data: any) {
      return gsap.to(data.current.container, { opacity: 0, duration: 0.5 });
    },
    // FIX: Added type 'any' to data parameter
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
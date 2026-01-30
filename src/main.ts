import { CartManager } from './ts/cart';
import { CheckoutManager } from './ts/checkout';
import { initScroll } from './ts/scroll';
import { initFooter } from './components/Footer'; 
import { products, Product } from './ts/data';
import barba from '@barba/core';
import gsap from 'gsap';

declare global {
  interface Window { cart: CartManager; }
}

const cart = new CartManager();
window.cart = cart; 
new CheckoutManager(cart);

// =========================================
// Animation Logic: Fly To Cart
// =========================================
const flyToCart = (startEl: HTMLElement, targetSelector: string, onComplete: () => void) => {
  const targetEl = document.querySelector(targetSelector) as HTMLElement;
  if (!startEl || !targetEl) {
    onComplete();
    return;
  }

  // 1. Create Clone
  const rectStart = startEl.getBoundingClientRect();
  const rectTarget = targetEl.getBoundingClientRect();
  
  const clone = startEl.cloneNode(true) as HTMLElement;
  clone.style.position = 'fixed';
  clone.style.left = `${rectStart.left}px`;
  clone.style.top = `${rectStart.top}px`;
  clone.style.width = `${rectStart.width}px`;
  clone.style.height = `${rectStart.height}px`;
  clone.style.zIndex = '9999';
  clone.style.pointerEvents = 'none';
  clone.style.opacity = '0.9';
  clone.style.borderRadius = '8px';
  clone.style.transition = 'none'; 
  document.body.appendChild(clone);

  // 2. Animate
  const tl = gsap.timeline({
    onComplete: () => {
      clone.remove();
      // Cart Bump Effect
      gsap.fromTo(targetEl, { scale: 1 }, { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1 });
      onComplete();
    }
  });

  // Calculate center-to-center delta
  const xDist = (rectTarget.left + rectTarget.width/2) - (rectStart.left + rectStart.width/2);
  const yDist = (rectTarget.top + rectTarget.height/2) - (rectStart.top + rectStart.height/2);

  tl.to(clone, {
    x: xDist,
    y: yDist,
    width: 20, // Shrink to dot
    height: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.inOut" // Smooth acceleration/deceleration
  });
};

// =========================================
// PDP Logic (Product Detail Page)
// =========================================
const showProductDetails = (product: Product) => {
  let pdp = document.getElementById('pdp-view');
  if (!pdp) {
    pdp = document.createElement('div');
    pdp.id = 'pdp-view';
    pdp.className = 'pdp-container';
    // CRITICAL: Allows scrolling inside PDP without body scroll interference
    pdp.setAttribute('data-lenis-prevent', 'true');
    document.body.appendChild(pdp);
  }

  // ADDED: Fix Back Button Logic (Browser History)
  history.pushState({ pdpOpen: true, productId: product.id }, '', `#product/${product.id}`);

  // Initial State
  let selectedSize = product.sizes ? product.sizes[0] : 'M';
  let selectedColor = product.colors ? product.colors[0] : '#000';
  let currentImages = getImagesForColor(product, selectedColor);
  let qty = 1;

  // Render Skeleton (Clean, no related products)
  pdp.innerHTML = `
    <div class="pdp-content-wrapper">
      <div class="pdp-grid">
        <div class="pdp-gallery-col">
          <div class="pdp-main-frame">
             <img src="${currentImages[0]}" id="pdp-main-img">
          </div>
          <div class="pdp-thumbs-row" id="pdp-thumbs-container">
             </div>
        </div>

        <div class="pdp-details-col">
           <div class="pdp-breadcrumb" onclick="history.back()">← Back to Shop</div>
           <h1 class="pdp-title intro-anim">${product.name}</h1>
           <div class="pdp-price intro-anim">$${product.price}</div>
           <p class="pdp-desc intro-anim">${product.description || 'Premium quality.'}</p>
           
           <div class="option-group intro-anim">
              <div class="option-header"><span>Color: <span id="color-name">${selectedColor}</span></span></div>
              <div class="color-options" id="pdp-color-opts"></div>
           </div>

           <div class="option-group intro-anim">
              <div class="option-header"><span>Size: <span id="size-name">${selectedSize}</span></span></div>
              <div class="size-options" id="pdp-size-opts"></div>
           </div>

           <div class="pdp-actions intro-anim">
              <div class="qty-selector" style="height: 55px; border: 1px solid #000;">
                  <button class="qty-btn" id="pdp-dec">-</button>
                  <input class="qty-input" id="pdp-qty" value="1" readonly>
                  <button class="qty-btn" id="pdp-inc">+</button>
              </div>
              <button class="btn btn-atc" id="pdp-add">Add to Cart</button>
           </div>
        </div>
      </div>
    </div>
  `;

  // --- Helpers ---
  function getImagesForColor(p: Product, color: string): string[] {
    if (p.colorImages && p.colorImages[color]) {
      return p.colorImages[color];
    }
    return [p.image]; // Fallback
  }

  const renderThumbs = (images: string[]) => {
    const container = document.getElementById('pdp-thumbs-container')!;
    container.innerHTML = images.map((img, i) => `
      <div class="pdp-thumb ${i===0?'active':''}">
        <img src="${img}" onclick="window.swapMainImage(this.src, this)">
      </div>
    `).join('');
  };

  const renderOptions = () => {
    const colorContainer = document.getElementById('pdp-color-opts')!;
    const sizeContainer = document.getElementById('pdp-size-opts')!;

    // Colors
    colorContainer.innerHTML = (product.colors || []).map(c => `
      <div class="color-btn ${c === selectedColor ? 'selected' : ''}" 
           style="background:${c}" 
           data-val="${c}"></div>
    `).join('');

    // Sizes
    sizeContainer.innerHTML = (product.sizes || []).map(s => `
      <div class="size-btn ${s === selectedSize ? 'selected' : ''}" 
           data-val="${s}">${s}</div>
    `).join('');
  };

  // --- Initialize UI ---
  renderThumbs(currentImages);
  renderOptions();

  // --- Global Window Binding for inline onclicks ---
  (window as any).swapMainImage = (src: string, el: HTMLElement) => {
    const main = document.getElementById('pdp-main-img') as HTMLImageElement;
    
    // Crossfade animation
    gsap.to(main, { opacity: 0.5, duration: 0.2, onComplete: () => {
      main.src = src;
      gsap.to(main, { opacity: 1, duration: 0.2 });
    }});

    document.querySelectorAll('.pdp-thumb').forEach(t => t.classList.remove('active'));
    el.parentElement?.classList.add('active');
  };

  // --- Event Listeners ---
  
  // Color Click
  document.getElementById('pdp-color-opts')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('color-btn')) {
      const newColor = target.dataset.val!;
      if (newColor === selectedColor) return; // No change

      selectedColor = newColor;
      document.getElementById('color-name')!.innerText = selectedColor;
      
      // Update UI selection
      renderOptions(); 

      // Update Images
      const newImages = getImagesForColor(product, selectedColor);
      
      // Fade out main image, swap, fade in
      const mainImg = document.getElementById('pdp-main-img') as HTMLImageElement;
      gsap.to(mainImg, { opacity: 0, duration: 0.3, onComplete: () => {
        mainImg.src = newImages[0];
        renderThumbs(newImages); // Re-render thumbs
        gsap.to(mainImg, { opacity: 1, duration: 0.3 });
      }});
    }
  });

  // Size Click
  document.getElementById('pdp-size-opts')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('size-btn')) {
      selectedSize = target.dataset.val!;
      document.getElementById('size-name')!.innerText = selectedSize;
      renderOptions();
    }
  });

  // Quantity
  const qtyInput = document.getElementById('pdp-qty') as HTMLInputElement;
  document.getElementById('pdp-inc')?.addEventListener('click', () => { qty++; qtyInput.value = qty.toString(); });
  document.getElementById('pdp-dec')?.addEventListener('click', () => { if(qty>1) qty--; qtyInput.value = qty.toString(); });

  // Add to Cart with Animation
  document.getElementById('pdp-add')?.addEventListener('click', () => {
    const mainImg = document.getElementById('pdp-main-img') as HTMLElement;
    
    // Fly animation to cart trigger
    flyToCart(mainImg, '#cart-trigger', () => {
      cart.add(product, qty, selectedSize, selectedColor);
      // ADDED: Close using history to keep state clean
      history.back();
    });
  });

  // --- ENTRANCE ANIMATION ---
  gsap.to(pdp, { autoAlpha: 1, duration: 0.4 });
  
  // Stagger Text & Elements
  gsap.fromTo('.intro-anim', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
  );
};

const closeProductDetails = () => {
  const pdp = document.getElementById('pdp-view');
  if (pdp) {
    gsap.to(pdp, { 
      autoAlpha: 0, 
      duration: 0.3, 
      onComplete: () => pdp.remove() // Completely remove to reset state
    });
  }
};

// ADDED: Global Listener for Browser Back Button
window.addEventListener('popstate', (event) => {
  // If we are going back to a state without 'pdpOpen', we close the modal
  if (!event.state || !event.state.pdpOpen) {
    closeProductDetails();
  }
});

// =========================================
// Main Init
// =========================================
const initPage = (container: Document | HTMLElement = document) => {
  initScroll();
  initFooter(); // Inject the universal footer
  
  const shopContainer = container.querySelector('#shop-container');
  if (shopContainer) {
    // ------------------------------------------
    // UPDATED: Render Grid with Wireframe/Skeleton
    // ------------------------------------------
    shopContainer.innerHTML = products.map(p => `
      <div class="product-card" data-id="${p.id}" style="cursor: pointer;">
        <div class="img-wrapper skeleton" style="overflow:hidden; height: 450px; background-color: #f4f4f4; position: relative;">
           <img src="${p.image}" class="product-img-load" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; transition: transform 0.6s;">
        </div>
        <div style="padding-top:1rem;">
          <h3 style="font-size: 1.1rem;">${p.name}</h3>
          <p style="color: #666; font-size: 0.85rem;">${p.type}</p>
        </div>
      </div>
    `).join('');
    
    // Attach Load/Error Handlers to images for skeleton logic
    const images = shopContainer.querySelectorAll('.product-img-load');
    images.forEach((img: any) => {
      // 1. Success: Fade in and remove skeleton
      img.onload = () => {
        img.classList.add('img-loaded');
        img.parentElement?.classList.remove('skeleton');
      };

      // 2. Error (No Internet): Remove skeleton, show offline message
      img.onerror = () => {
        const parent = img.parentElement;
        if (parent) {
          parent.classList.remove('skeleton');
          parent.innerHTML = `
            <div class="offline-placeholder">
              <span>⚠️ Image N/A</span>
              <span style="font-size:0.6rem; margin-top:5px;">Offline</span>
            </div>
          `;
        }
      };

      // Check if cached/already loaded
      if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('img-loaded');
        img.parentElement?.classList.remove('skeleton');
      }
    });
    // ------------------------------------------
    // END UPDATED RENDER
    // ------------------------------------------
    
    // Grid Click Event -> Open PDP
    shopContainer.addEventListener('click', (e: Event) => {
      const card = (e.target as HTMLElement).closest('.product-card') as HTMLElement;
      if (card) {
        const id = card.dataset.id;
        const product = products.find(p => p.id === id);
        if (product) showProductDetails(product);
      }
    });
  }

  // Mobile Menu Logic
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    const newToggle = mobileToggle.cloneNode(true) as HTMLElement;
    mobileToggle.parentNode?.replaceChild(newToggle, mobileToggle);
    newToggle.addEventListener('click', () => {
      newToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Cart Trigger Logic
  const cartTrigger = document.getElementById('cart-trigger');
  if (cartTrigger) {
    cartTrigger.onclick = (e) => {
      e.preventDefault();
      document.getElementById('cart-sidebar')?.classList.add('active');
      document.querySelector('.overlay')?.classList.add('active');
    };
  }

  // Close Logic (Overlay, Close Buttons)
  const closeElements = document.querySelectorAll('.btn-close-cart, .overlay, #close-checkout');
  closeElements.forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.modal-panel, .overlay, .nav-links, #checkout-modal').forEach(m => m.classList.remove('active'));
      document.querySelector('.mobile-toggle')?.classList.remove('active');
    });
  });
};

// Barba Page Transitions
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

// Initial Load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initPage(document));
} else {
  initPage(document);
}
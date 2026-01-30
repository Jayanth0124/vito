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
// Animation Logic: Fly To Cart (Smart Detection)
// =========================================
const flyToCart = (startEl: HTMLElement, targetSelector: string, onComplete: () => void) => {
  // 1. Smart Detection: Check if we are on mobile and the mobile cart icon is visible
  let targetEl = document.querySelector('#mobile-cart-trigger') as HTMLElement;
  
  // 2. If mobile icon is hidden (desktop mode) or doesn't exist, use the provided selector (desktop icon)
  if (!targetEl || getComputedStyle(targetEl).display === 'none') {
     targetEl = document.querySelector(targetSelector) as HTMLElement;
  }

  // Safety check
  if (!startEl || !targetEl) {
    onComplete();
    return;
  }

  // 3. Create Floating Clone
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

  // 4. Animate with GSAP
  const tl = gsap.timeline({
    onComplete: () => {
      clone.remove();
      // Bumpy effect on the target icon
      gsap.fromTo(targetEl, { scale: 1 }, { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1 });
      onComplete();
    }
  });

  const xDist = (rectTarget.left + rectTarget.width/2) - (rectStart.left + rectStart.width/2);
  const yDist = (rectTarget.top + rectTarget.height/2) - (rectStart.top + rectStart.height/2);

  tl.to(clone, {
    x: xDist,
    y: yDist,
    width: 20, // Shrink to dot size
    height: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.inOut"
  });
};

// =========================================
// PDP Logic (Product Detail Page)
// =========================================
const showProductDetails = (product: Product) => {
  if (document.getElementById('pdp-view')) return;
  
  // Push state for Back Button support
  history.pushState({ pdpOpen: true, productId: product.id }, '', `#product/${product.id}`);

  let pdp = document.createElement('div');
  pdp.id = 'pdp-view';
  pdp.className = 'pdp-container';
  // Allow scrolling inside PDP on mobile
  pdp.setAttribute('data-lenis-prevent', 'true');
  document.body.appendChild(pdp);

  let selectedSize = product.sizes ? product.sizes[0] : 'M';
  let selectedColor = product.colors ? product.colors[0] : '#000';
  let currentImages = getImagesForColor(product, selectedColor);
  let qty = 1;

  pdp.innerHTML = `
    <div class="pdp-content-wrapper">
      <div class="pdp-grid">
        <div class="pdp-gallery-col">
          <div class="pdp-main-frame">
             <img src="${currentImages[0]}" id="pdp-main-img">
          </div>
          <div class="pdp-thumbs-row" id="pdp-thumbs-container"></div>
        </div>

        <div class="pdp-details-col">
           <div class="pdp-breadcrumb" onclick="history.back()">← Back to Shop</div>
           <h1 class="pdp-title intro-anim">${product.name}</h1>
           
           <div class="pdp-price intro-anim">
             <span class="price-original">₹${product.originalPrice}</span>
             <span class="price-discount">₹${product.price}</span>
           </div>
           
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
              <div class="qty-selector">
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
    if (p.colorImages && p.colorImages[color]) return p.colorImages[color];
    return [p.image];
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
    colorContainer.innerHTML = (product.colors || []).map(c => `<div class="color-btn ${c === selectedColor ? 'selected' : ''}" style="background:${c}" data-val="${c}"></div>`).join('');
    sizeContainer.innerHTML = (product.sizes || []).map(s => `<div class="size-btn ${s === selectedSize ? 'selected' : ''}" data-val="${s}">${s}</div>`).join('');
  };

  renderThumbs(currentImages);
  renderOptions();

  // Global helper for inline onclicks
  (window as any).swapMainImage = (src: string, el: HTMLElement) => {
    const main = document.getElementById('pdp-main-img') as HTMLImageElement;
    gsap.to(main, { opacity: 0.5, duration: 0.2, onComplete: () => {
      main.src = src;
      gsap.to(main, { opacity: 1, duration: 0.2 });
    }});
    document.querySelectorAll('.pdp-thumb').forEach(t => t.classList.remove('active'));
    el.parentElement?.classList.add('active');
  };

  // Event Listeners
  document.getElementById('pdp-color-opts')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('color-btn')) {
      const newColor = target.dataset.val!;
      if (newColor === selectedColor) return; 
      selectedColor = newColor;
      document.getElementById('color-name')!.innerText = selectedColor;
      renderOptions(); 
      const newImages = getImagesForColor(product, selectedColor);
      const mainImg = document.getElementById('pdp-main-img') as HTMLImageElement;
      gsap.to(mainImg, { opacity: 0, duration: 0.3, onComplete: () => {
        mainImg.src = newImages[0];
        renderThumbs(newImages); 
        gsap.to(mainImg, { opacity: 1, duration: 0.3 });
      }});
    }
  });

  document.getElementById('pdp-size-opts')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('size-btn')) {
      selectedSize = target.dataset.val!;
      document.getElementById('size-name')!.innerText = selectedSize;
      renderOptions();
    }
  });

  const qtyInput = document.getElementById('pdp-qty') as HTMLInputElement;
  document.getElementById('pdp-inc')?.addEventListener('click', () => { qty++; qtyInput.value = qty.toString(); });
  document.getElementById('pdp-dec')?.addEventListener('click', () => { if(qty>1) qty--; qtyInput.value = qty.toString(); });

  // Add to Cart Logic
  document.getElementById('pdp-add')?.addEventListener('click', () => {
    const mainImg = document.getElementById('pdp-main-img') as HTMLElement;
    // Pass the standard desktop ID, the function will handle mobile override
    flyToCart(mainImg, '#cart-trigger', () => {
      cart.add(product, qty, selectedSize, selectedColor);
      history.back(); // Return to shop after adding
    });
  });

  // Entrance Animation
  gsap.to(pdp, { autoAlpha: 1, duration: 0.4 });
  gsap.fromTo('.intro-anim', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 });
};

// Close PDP logic
const closeProductDetails = () => {
  const pdp = document.getElementById('pdp-view');
  if (pdp) {
    gsap.to(pdp, { 
      autoAlpha: 0, 
      duration: 0.3, 
      onComplete: () => pdp.remove() 
    });
  }
};

// Handle Browser Back Button
window.addEventListener('popstate', (event) => {
  if (!event.state || !event.state.pdpOpen) {
    closeProductDetails();
  }
});

// =========================================
// HELPER: Inject Mobile Cart Icon
// =========================================
const injectMobileCartIcon = () => {
  const nav = document.querySelector('nav');
  if (!nav) return;
  
  if (!document.getElementById('mobile-cart-trigger')) {
    const div = document.createElement('div');
    div.id = 'mobile-cart-trigger';
    div.style.cssText = "position: relative; padding: 10px; cursor: pointer;";
    div.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span id="mobile-cart-count" style="position: absolute; top: 0; right: 0; background: black; color: white; font-size: 10px; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">0</span>
    `;
    
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle) {
      nav.insertBefore(div, mobileToggle);
    } else {
      nav.appendChild(div);
    }

    // Mobile Toggle Event
    div.addEventListener('click', (e) => {
      e.preventDefault();
      const sidebar = document.getElementById('cart-sidebar');
      const overlay = document.querySelector('.overlay');
      
      if (sidebar && sidebar.classList.contains('active')) {
         sidebar.classList.remove('active');
         if(overlay) overlay.classList.remove('active');
      } else {
         if(sidebar) sidebar.classList.add('active');
         if(overlay) overlay.classList.add('active');
      }
    });
  }
};

// =========================================
// Main Init Logic
// =========================================
const initPage = (container: Document | HTMLElement = document) => {
  initScroll();
  initFooter(); 
  injectMobileCartIcon(); 
  
  const shopContainer = container.querySelector('#shop-container');
  if (shopContainer) {
    // 1. Inject Scrolling Banner
    const bannerHTML = `
      <div class="scrolling-banner-container">
        <div class="scrolling-text">
          ONE YEAR ANNIVERSARY SALE • FLAT 50% OFF • LIMITED TIME OFFER • PREMIUM CRAFTSMANSHIP • 
          ONE YEAR ANNIVERSARY SALE • FLAT 50% OFF • LIMITED TIME OFFER • PREMIUM CRAFTSMANSHIP • 
        </div>
      </div>
    `;
    if (!document.querySelector('.scrolling-banner-container')) {
      shopContainer.insertAdjacentHTML('beforebegin', bannerHTML);
    }

    // 2. Render Product Grid with Skeletons
    shopContainer.innerHTML = products.map(p => `
      <div class="product-card" data-id="${p.id}" style="cursor: pointer;">
        <div class="img-wrapper skeleton" style="overflow:hidden; height: 450px; background-color: #f4f4f4; position: relative;">
           <img src="${p.image}" class="product-img-load" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; transition: transform 0.6s;">
        </div>
        <div style="padding-top:1rem;">
          <h3 style="font-size: 1.1rem;">${p.name}</h3>
          
          <div style="margin-top: 5px;">
             <span class="price-original">₹${p.originalPrice}</span>
             <span class="price-discount">₹${p.price}</span>
          </div>
          
          <p style="color: #666; font-size: 0.85rem; margin-top: 5px;">${p.type}</p>
        </div>
      </div>
    `).join('');
    
    // 3. Handle Image Loading (Skeleton Removal)
    const images = shopContainer.querySelectorAll('.product-img-load');
    images.forEach((img: any) => {
      img.onload = () => { img.classList.add('img-loaded'); img.parentElement?.classList.remove('skeleton'); };
      img.onerror = () => { 
        const p = img.parentElement; 
        if(p) { 
          p.classList.remove('skeleton'); 
          p.innerHTML = '<div class="offline-placeholder"><span>⚠️ Image N/A</span></div>'; 
        } 
      };
      if (img.complete && img.naturalHeight !== 0) { 
        img.classList.add('img-loaded'); 
        img.parentElement?.classList.remove('skeleton'); 
      }
    });
    
    // 4. Click Event -> Open PDP
    shopContainer.addEventListener('click', (e: Event) => {
      const card = (e.target as HTMLElement).closest('.product-card') as HTMLElement;
      if (card) {
        const product = products.find(p => p.id === card.dataset.id);
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

    // Auto-close menu when link clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        newToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Desktop Cart Trigger Logic (Toggle)
  const cartTrigger = document.getElementById('cart-trigger');
  if (cartTrigger) {
    cartTrigger.onclick = (e) => {
      e.preventDefault();
      const sidebar = document.getElementById('cart-sidebar');
      const overlay = document.querySelector('.overlay');
      
      if (sidebar && sidebar.classList.contains('active')) {
         sidebar.classList.remove('active');
         if(overlay) overlay.classList.remove('active');
      } else {
         if(sidebar) sidebar.classList.add('active');
         if(overlay) overlay.classList.add('active');
      }
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
    async leave(data: any) { return gsap.to(data.current.container, { opacity: 0, duration: 0.5 }); },
    enter(data: any) { initPage(data.next.container); return gsap.from(data.next.container, { opacity: 0, duration: 0.5 }); }
  }]
});

// Initial Load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initPage(document));
} else {
  initPage(document);
}
import { Product } from './data';

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  variantId: string; // Unique ID for (Product + Size + Color)
}

export class CartManager {
  public items: CartItem[] = [];
  
  constructor() {
    this.load();
    this.render();
  }

  // Updated to accept Size and Color
  add(product: Product, qty: number = 1, size: string = 'M', color: string = 'Default') {
    // Create a unique ID for this specific combination
    const variantId = `${product.id}-${size}-${color}`;
    
    const existing = this.items.find(i => i.variantId === variantId);
    
    if (existing) {
      existing.quantity += qty;
    } else {
      this.items.push({ 
        ...product, 
        quantity: qty, 
        selectedSize: size, 
        selectedColor: color,
        variantId: variantId 
      });
    }
    
    this.save();
    this.render();
    this.showNotification(`Added ${qty} x ${product.name} (${size})`);
    
    // DISABLE AUTO-OPEN (As requested)
    // document.getElementById('cart-sidebar')?.classList.add('active');
    // document.querySelector('.overlay')?.classList.add('active');
  }

  remove(variantId: string) {
    this.items = this.items.filter(i => i.variantId !== variantId);
    this.save();
    this.render();
  }

  updateQuantity(variantId: string, change: number) {
    const item = this.items.find(i => i.variantId === variantId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
      this.remove(variantId);
    } else {
      this.save();
      this.render();
    }
  }

  private save() {
    localStorage.setItem('vito_cart_v2', JSON.stringify(this.items));
    document.dispatchEvent(new Event('cart-updated')); 
  }

  private load() {
    const data = localStorage.getItem('vito_cart_v2');
    if (data) this.items = JSON.parse(data);
  }

  private showNotification(msg: string) {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }

  private render() {
    const countEl = document.getElementById('cart-count');
    // Also update the mobile cart count if it exists
    const mobileCountEl = document.getElementById('mobile-cart-count');
    
    const totalQty = this.items.reduce((a,b) => a + b.quantity, 0).toString();
    if (countEl) countEl.innerText = totalQty;
    if (mobileCountEl) mobileCountEl.innerText = totalQty;
    
    const listEl = document.getElementById('cart-list');
    
    if (listEl) {
      if (this.items.length === 0) {
        listEl.innerHTML = '<p style="text-align:center; margin-top:2rem; color:#888;">Cart is empty.</p>';
        return;
      }

      listEl.innerHTML = this.items.map(item => `
        <div class="cart-item">
          <div style="flex:1;">
            <h4 style="font-size: 0.9rem;">${item.name}</h4>
            <p style="font-size: 0.75rem; color: #666;">${item.type} | ${item.selectedSize}</p>
            ${item.selectedColor !== 'Default' ? `<div style="width:12px; height:12px; background:${item.selectedColor}; border-radius:50%; margin-top:4px; border:1px solid #ddd;"></div>` : ''}
          </div>
          <div style="display:flex; align-items:center;">
             <div class="cart-qty-ctrl">
                <button class="qty-btn" onclick="window.cart.updateQuantity('${item.variantId}', -1)">-</button>
                <span style="padding:0 8px; font-size:0.9rem;">${item.quantity}</span>
                <button class="qty-btn" onclick="window.cart.updateQuantity('${item.variantId}', 1)">+</button>
             </div>
             <button class="cart-remove" onclick="window.cart.remove('${item.variantId}')">Remove</button>
          </div>
        </div>
      `).join('');
    }
  }
}
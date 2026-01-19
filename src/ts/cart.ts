import { Product } from './data';

export interface CartItem extends Product {
  quantity: number;
}

export class CartManager {
  public items: CartItem[] = [];
  
  constructor() {
    this.load();
    this.render();
  }

  // Modified to accept a quantity
  add(product: Product, qty: number = 1) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) existing.quantity += qty;
    else this.items.push({ ...product, quantity: qty });
    
    this.save();
    this.render();
    this.showNotification(`Added ${qty} x ${product.name}`);
    
    // Open cart automatically
    document.getElementById('cart-sidebar')?.classList.add('active');
    document.querySelector('.overlay')?.classList.add('active');
  }

  remove(id: string) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
    this.render();
  }

  // New method for +/- buttons in Cart
  updateQuantity(id: string, change: number) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
      this.remove(id);
    } else {
      this.save();
      this.render();
    }
  }

  private save() {
    localStorage.setItem('vito_cart', JSON.stringify(this.items));
    document.dispatchEvent(new Event('cart-updated')); 
  }

  private load() {
    const data = localStorage.getItem('vito_cart');
    if (data) this.items = JSON.parse(data);
  }

  private showNotification(msg: string) {
    const toast = document.getElementById('toast')!;
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  private render() {
    const countEl = document.getElementById('cart-count');
    const listEl = document.getElementById('cart-list');
    
    if (countEl) countEl.innerText = this.items.reduce((a,b) => a + b.quantity, 0).toString();
    
    if (listEl) {
      if (this.items.length === 0) {
        listEl.innerHTML = '<p style="text-align:center; margin-top:2rem; color:#888;">Cart is empty.</p>';
        return;
      }

      listEl.innerHTML = this.items.map(item => `
        <div class="cart-item">
          <div style="flex:1;">
            <h4 style="font-size: 0.9rem;">${item.name}</h4>
            <p style="font-size: 0.8rem; color: #666;">${item.type}</p>
          </div>
          <div style="display:flex; align-items:center;">
             <div class="cart-qty-ctrl">
                <button class="qty-btn" onclick="window.cart.updateQuantity('${item.id}', -1)">-</button>
                <span style="padding:0 8px; font-size:0.9rem;">${item.quantity}</span>
                <button class="qty-btn" onclick="window.cart.updateQuantity('${item.id}', 1)">+</button>
             </div>
             <button class="cart-remove" onclick="window.cart.remove('${item.id}')">Remove</button>
          </div>
        </div>
      `).join('');
    }
  }
}
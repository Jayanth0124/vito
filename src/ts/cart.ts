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

  add(product: Product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) existing.quantity++;
    else this.items.push({ ...product, quantity: 1 });
    
    this.save();
    this.render();
    this.showNotification(`Added ${product.name}`);
  }

  remove(id: string) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
    this.render();
  }

  private save() {
    localStorage.setItem('vito_cart', JSON.stringify(this.items));
    document.dispatchEvent(new Event('cart-updated')); // Notify Checkout
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
      listEl.innerHTML = this.items.map(item => `
        <div style="display:flex; justify-content:space-between; margin-bottom:1rem; border-bottom:1px solid #eee; padding-bottom:1rem;">
          <div>
            <h4>${item.name}</h4>
            <small>${item.type} x ${item.quantity}</small>
          </div>
          <button onclick="window.cart.remove('${item.id}')" style="background:none; border:none; cursor:pointer;">✕</button>
        </div>
      `).join('');
    }
  }
}
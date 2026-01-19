import { CartStore } from '../core/CartStore';
import { formatOrder } from '../utils/WhatsAppFormatter';

export class CartModal {
  private modal: HTMLElement;
  private list: HTMLElement;
  private store: CartStore;

  constructor() {
    this.modal = document.getElementById('cart-modal') as HTMLElement;
    this.list = document.getElementById('cart-list') as HTMLElement;
    this.store = CartStore.getInstance();
    this.bindEvents();
    this.render();
    
    // Subscribe to store updates to re-render cart automatically
    this.store.subscribe(() => this.render());
  }

  private bindEvents() {
    document.getElementById('cart-trigger')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.open();
    });

    document.getElementById('cart-close')?.addEventListener('click', () => {
      this.close();
    });

    document.getElementById('checkout-btn')?.addEventListener('click', () => {
      this.handleCheckout();
    });
  }

  private render() {
    const items = this.store.getItems();
    this.list.innerHTML = '';
    
    if (items.length === 0) {
      this.list.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
      return;
    }

    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <span>${item.type}</span>
        </div>
        <div class="cart-item-actions">
           <span>x${item.quantity}</span>
        </div>
      `;
      this.list.appendChild(el);
    });
  }

  private handleCheckout() {
    if (this.store.getItems().length === 0) return;
    
    const name = prompt("Please enter your Full Name:");
    const address = prompt("Please enter your Shipping Address:");
    
    if (name && address) {
      const msg = formatOrder(this.store.getItems(), { name, address });
      window.open(`https://wa.me/7207288496?text=${msg}`, '_blank');
    }
  }

  public open() { this.modal.classList.add('active'); }
  public close() { this.modal.classList.remove('active'); }
}
import { CartStore } from '../core/CartStore';

export class Navigation {
  private cartCountEl: HTMLElement | null;

  constructor() {
    this.cartCountEl = document.getElementById('nav-cart-count');
    this.init();
  }

  private init() {
    const store = CartStore.getInstance();
    // Initial render
    this.updateCount(store.getTotalCount());
    // Subscribe to changes
    store.subscribe(() => {
      this.updateCount(store.getTotalCount());
    });
  }

  private updateCount(count: number) {
    if (this.cartCountEl) {
      this.cartCountEl.textContent = count.toString();
    }
  }
}
import { CartItem, Product } from '../types';

export class CartStore {
  private static instance: CartStore;
  private cart: CartItem[] = [];
  private listeners: Function[] = [];

  private constructor() {
    this.load();
  }

  public static getInstance(): CartStore {
    if (!CartStore.instance) {
      CartStore.instance = new CartStore();
    }
    return CartStore.instance;
  }

  public addItem(product: Product): void {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.save();
    this.notify();
  }

  public removeItem(id: string): void {
    this.cart = this.cart.filter(item => item.id !== id);
    this.save();
    this.notify();
  }

  public getItems(): CartItem[] {
    return this.cart;
  }

  public getTotalCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  public subscribe(listener: Function) {
    this.listeners.push(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.cart));
  }

  private save() {
    localStorage.setItem('vg_cart', JSON.stringify(this.cart));
  }

  private load() {
    const data = localStorage.getItem('vg_cart');
    if (data) this.cart = JSON.parse(data);
  }
}
import { CartManager } from './cart';

export class CheckoutManager {
  private cart: CartManager;
  private modal: HTMLElement;
  private orderId: string = '';

  constructor(cart: CartManager) {
    this.cart = cart;
    this.modal = document.getElementById('checkout-modal')!;
    this.bindEvents();
  }

  open() {
    this.orderId = `VG-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 99)}`;
    (document.getElementById('order-id-display') as HTMLElement).innerText = this.orderId;
    this.renderSummary();
    this.modal.classList.add('active');
    document.getElementById('cart-sidebar')?.classList.remove('active'); // Close cart
  }

  renderSummary() {
    const summaryEl = document.getElementById('checkout-summary');
    if(summaryEl) {
      summaryEl.innerHTML = this.cart.items.map(i => `
        <div style="display:flex; justify-content:space-between;">
          <span>${i.name} (${i.type})</span>
          <span>x${i.quantity}</span>
        </div>
      `).join('');
    }
  }

  bindEvents() {
    document.getElementById('trigger-checkout')?.addEventListener('click', () => this.open());
    document.getElementById('close-checkout')?.addEventListener('click', () => this.modal.classList.remove('active'));
    
    // WhatsApp Send
    document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.sendWhatsApp();
    });

    // Print
    document.getElementById('print-order')?.addEventListener('click', () => {
      window.print();
    });
  }

  sendWhatsApp() {
    const getVal = (id: string) => (document.getElementById(id) as HTMLInputElement).value;

    const name = getVal('c-name');
    const phone = getVal('c-phone');
    const altPhone = getVal('c-alt-phone');
    const address = getVal('c-address');

    let msg = `*NEW ORDER: ${this.orderId}*\n\n`;
    msg += `*Customer Details:*\nName: ${name}\nPhone: ${phone}\nAlt Phone: ${altPhone}\nAddress: ${address}\n\n`;
    msg += `*Order Items:*\n`;
    
    this.cart.items.forEach(item => {
      msg += `- ${item.name} (${item.type}) x${item.quantity}\n`;
    });

    msg += `\nRequesting confirmation for this order.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/6309113898?text=${encoded}`, '_blank');
  }
}
import barba from '@barba/core';
import gsap from 'gsap';
import { initShop } from '../pages/Shop';

export const initRouter = () => {
  barba.init({
    sync: true,
    transitions: [{
      name: 'fade',
      // FIX: Added explicit 'any' type to 'data' parameter
      leave(data: any) {
        return gsap.to(data.current.container, { opacity: 0 });
      },
      // FIX: Added explicit 'any' type to 'data' parameter
      enter(data: any) {
        return gsap.from(data.next.container, { opacity: 0 });
      }
    }],
    views: [
      {
        namespace: 'shop',
        afterEnter() {
          initShop();
        }
      }
    ]
  });
};
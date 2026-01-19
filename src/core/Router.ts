import barba from '@barba/core';
import gsap from 'gsap';
import { initShop } from '../pages/Shop';

export const initRouter = () => {
  barba.init({
    sync: true,
    transitions: [{
      name: 'fade',
      leave(data) {
        return gsap.to(data.current.container, { opacity: 0 });
      },
      enter(data) {
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
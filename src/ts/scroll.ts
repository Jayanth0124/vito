import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export const initScroll = () => {
  if (lenis) lenis.destroy();

  // Restored "Premium" Heavy Inertia Settings
  lenis = new Lenis({
    duration: 1.8, // Reverted to 1.8 for that heavy premium feel
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  
  gsap.ticker.add((time: number) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Parallax Effect
  document.querySelectorAll('[data-speed]').forEach(el => {
    gsap.to(el, {
      y: (i: number, target: HTMLElement) => -50 * parseFloat(target.dataset.speed || '0'),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        scrub: true
      }
    });
  });
};

// Simplified controls - We won't lock body overflow anymore
export const stopScroll = () => {
  if (lenis) lenis.stop();
};

export const startScroll = () => {
  if (lenis) lenis.start();
};
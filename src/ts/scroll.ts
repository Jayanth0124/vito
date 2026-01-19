import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScroll = () => {
  // Heavy Inertia Settings
  const lenis = new Lenis({
    duration: 1.5,
    // FIX: Added explicit type ': number' for parameter 't'
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  
  // FIX: Added explicit type ': number' for parameter 'time'
  gsap.ticker.add((time: number) => lenis.raf(time * 1000));
  
  gsap.ticker.lagSmoothing(0);

  // Parallax Effect for Hero & Images
  document.querySelectorAll('[data-speed]').forEach(el => {
    gsap.to(el, {
      // FIX: Added types for 'i' (number) and 'target' (HTMLElement)
      // Also added fallback '|| 0' for parseFloat to satisfy strict null checks
      y: (i: number, target: HTMLElement) => -50 * parseFloat(target.dataset.speed || '0'),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        scrub: true
      }
    });
  });
};
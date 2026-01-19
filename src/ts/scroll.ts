import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScroll = () => {
  // Heavy Inertia Settings
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Parallax Effect for Hero & Images
  document.querySelectorAll('[data-speed]').forEach(el => {
    gsap.to(el, {
      y: (i, target) => -50 * parseFloat(target.dataset.speed),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        scrub: true
      }
    });
  });
};
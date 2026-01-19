import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class ScrollManager {
  private lenis: Lenis;

  constructor() {
    this.lenis = new Lenis({
      duration: 1.8, // Heavy inertia
      // FIX: Added type 'number' to 't'
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    this.init();
  }

  private init() {
    this.lenis.on('scroll', ScrollTrigger.update);
    // FIX: Added type 'number' to 'time'
    gsap.ticker.add((time: number) => {
      this.lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  public destroy() {
    this.lenis.destroy();
  }
}
import gsap from 'gsap';

// Create mock plugins for build process
const ScrollTrigger = {
  getById: (id: string) => null,
  getAll: () => [],
  refresh: (force?: boolean) => {},
  config: (options: any) => {},
  create: (options: any) => ({}),
  isTouch: false
};

const ScrollSmoother = {
  create: (options: any) => ({
    scrollTop: (position: number) => {},
    paused: (paused: boolean) => {},
    scrollTo: (target: string | Element, smooth?: boolean, position?: string) => {}
  }),
  refresh: (force?: boolean) => {}
};

const SplitText = function(target: any, options: any) {
  this.chars = [];
  this.words = [];
  this.lines = [];
  this.revert = () => {};
};

// Only register plugins in browser environment
if (typeof window !== 'undefined') {
  // Dynamically load GSAP plugins
  const loadGSAPPlugins = async () => {
    try {
      // Use dynamic imports to load GSAP plugins
      const gsapCore = await import('gsap');

      // Load ScrollTrigger
      try {
        const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger');
        gsapCore.gsap.registerPlugin(ST);
      } catch (e) {
        console.warn('ScrollTrigger not available:', e);
      }

      // Load ScrollSmoother
      try {
        const { ScrollSmoother: SS } = await import('gsap/ScrollSmoother');
        gsapCore.gsap.registerPlugin(SS);
      } catch (e) {
        console.warn('ScrollSmoother not available:', e);
      }

      // Load SplitText
      try {
        const { SplitText: SText } = await import('gsap/SplitText');
        gsapCore.gsap.registerPlugin(SText);
      } catch (e) {
        console.warn('SplitText not available:', e);
      }
    } catch (error) {
      console.error('Error loading GSAP plugins:', error);
    }
  };

  // Load plugins
  loadGSAPPlugins();
}

export { ScrollTrigger, ScrollSmoother, SplitText };

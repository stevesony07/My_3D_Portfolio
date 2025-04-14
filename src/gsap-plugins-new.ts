import gsap from 'gsap';

// Define interfaces for our plugins
interface IScrollTrigger {
  getById: (id: string) => any;
  getAll: () => any[];
  refresh: (force?: boolean) => void;
  config: (options: any) => void;
  create: (options: any) => any;
  isTouch: boolean;
}

interface IScrollSmootherInstance {
  scrollTop: (position: number) => void;
  paused: (paused: boolean) => void;
  scrollTo: (target: string | Element, smooth?: boolean, position?: string) => void;
}

interface IScrollSmoother {
  create: (options: any) => IScrollSmootherInstance;
  refresh: (force?: boolean) => void;
}

interface ISplitTextInstance {
  chars: any[];
  words: any[];
  lines: any[];
  revert: () => void;
}

// Create mock plugins
const createMockScrollTrigger = (): IScrollTrigger => ({
  getById: (_id: string) => null,
  getAll: () => [],
  refresh: (_force?: boolean) => {},
  config: (_options: any) => {},
  create: (_options: any) => ({}),
  isTouch: false
});

const createMockScrollSmoother = (): IScrollSmoother => ({
  create: (_options: any) => ({
    scrollTop: (_position: number) => {},
    paused: (_paused: boolean) => {},
    scrollTo: (_target: string | Element, _smooth?: boolean, _position?: string) => {}
  }),
  refresh: (_force?: boolean) => {}
});

class MockSplitText implements ISplitTextInstance {
  chars: any[] = [];
  words: any[] = [];
  lines: any[] = [];
  
  constructor(_target: any, _options: any) {}
  
  revert(): void {}
}

// Create real or mock plugins based on environment
let ScrollTrigger: IScrollTrigger;
let ScrollSmoother: IScrollSmoother;
let SplitText: any;

// Check if we're in the browser and if the plugins are available
if (typeof window !== 'undefined') {
  // Try to use the global plugins loaded from CDN
  try {
    // @ts-ignore - These will be available in the browser from CDN
    ScrollTrigger = window.ScrollTrigger || createMockScrollTrigger();
    
    // @ts-ignore - These will be available in the browser from CDN
    ScrollSmoother = window.ScrollSmoother || createMockScrollSmoother();
    
    // @ts-ignore - These will be available in the browser from CDN
    SplitText = window.SplitText || MockSplitText;
    
    // Register the plugins with GSAP
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
    console.log('GSAP plugins registered successfully');
  } catch (e) {
    console.warn('Error setting up GSAP plugins:', e);
    
    // Fallback to mock plugins
    ScrollTrigger = createMockScrollTrigger();
    ScrollSmoother = createMockScrollSmoother();
    SplitText = MockSplitText;
  }
} else {
  // Server-side rendering - use mock plugins
  ScrollTrigger = createMockScrollTrigger();
  ScrollSmoother = createMockScrollSmoother();
  SplitText = MockSplitText;
}

export { ScrollTrigger, ScrollSmoother, SplitText };

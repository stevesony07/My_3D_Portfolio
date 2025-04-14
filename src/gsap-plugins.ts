// Import types from gsap-types.ts
import { ScrollSmootherInstance } from './types/gsap-types';

// Add type declarations for GSAP plugins on window
declare global {
  interface Window {
    ScrollTrigger: any;
    ScrollSmoother: any;
    SplitText: any;
  }
}

// Define interfaces for GSAP plugins for better type safety
interface ScrollTriggerType {
  getById: (id: string) => any;
  getAll: () => any[];
  refresh: (force?: boolean) => void;
  config: (options: any) => void;
  create: (options: any) => any;
  isTouch: boolean;
}

// Use the imported ScrollSmootherInstance type
interface ScrollSmootherType {
  create: (options: any) => ScrollSmootherInstance;
  refresh: (force?: boolean) => void;
}

interface SplitTextType {
  new (target: any, options: any): {
    chars: any[];
    words: any[];
    lines: any[];
    revert: () => void;
  };
}

// Create mock implementations for SSR and fallbacks
class MockSplitText {
  chars: any[] = [];
  words: any[] = [];
  lines: any[] = [];

  constructor(_target: any, _options: any) {}

  revert(): void {}
}

const createMockScrollTrigger = (): ScrollTriggerType => ({
  getById: (_id: string) => null,
  getAll: () => [],
  refresh: (_force?: boolean) => {},
  config: (_options: any) => {},
  create: (_options: any) => ({}),
  isTouch: false
});

const createMockScrollSmoother = (): ScrollSmootherType => ({
  create: (_options: any): ScrollSmootherInstance => ({
    scrollTop: (_position: number) => {},
    paused: (_paused: boolean) => {},
    scrollTo: (_target: string | Element, _smooth?: boolean, _position?: string) => {}
  }),
  refresh: (_force?: boolean) => {}
});

// Declare variables to hold the plugins
let ScrollTrigger: ScrollTriggerType;
let ScrollSmoother: ScrollSmootherType;
let SplitText: SplitTextType;

// Initialize plugins based on environment
if (typeof window !== 'undefined') {
  try {
    // Try to access the global plugins loaded from CDN
    // @ts-ignore - These are loaded from CDN in index.html
    if (window.ScrollTrigger) {
      ScrollTrigger = window.ScrollTrigger;
      console.log('ScrollTrigger loaded from CDN');
    } else {
      ScrollTrigger = createMockScrollTrigger();
      console.warn('ScrollTrigger not found, using mock');
    }

    // @ts-ignore
    if (window.ScrollSmoother) {
      ScrollSmoother = window.ScrollSmoother;
      console.log('ScrollSmoother loaded from CDN');
    } else {
      ScrollSmoother = createMockScrollSmoother();
      console.warn('ScrollSmoother not found, using mock');
    }

    // @ts-ignore
    if (window.SplitText) {
      SplitText = window.SplitText;
      console.log('SplitText loaded from CDN');
    } else {
      SplitText = MockSplitText as unknown as SplitTextType;
      console.warn('SplitText not found, using mock');
    }
  } catch (error) {
    console.error('Error initializing GSAP plugins:', error);

    // Fallback to mock implementations
    ScrollTrigger = createMockScrollTrigger();
    ScrollSmoother = createMockScrollSmoother();
    SplitText = MockSplitText as unknown as SplitTextType;
  }
} else {
  // Server-side rendering - use mock implementations
  ScrollTrigger = createMockScrollTrigger();
  ScrollSmoother = createMockScrollSmoother();
  SplitText = MockSplitText as unknown as SplitTextType;
}

export { ScrollTrigger, ScrollSmoother, SplitText };

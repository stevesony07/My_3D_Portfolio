// Type definitions for GSAP plugins
import { gsap } from 'gsap';

// Instead of trying to augment the module, we'll create our own interface
export interface ExtendedGSAPConfig {
  autoSleep?: number;
  force3D?: boolean;
  nullTargetWarn?: boolean;
  units?: { [key: string]: string };
  trialWarn?: boolean;
}

// ScrollSmoother type definition
export interface ScrollSmootherInstance {
  scrollTop: (position: number) => void;
  paused: (paused: boolean) => void;
  scrollTo: (target: string | Element, smooth?: boolean, position?: string) => void;
}

export interface ScrollSmootherStatic {
  create: (options: ScrollSmootherOptions) => ScrollSmootherInstance;
  refresh: (force?: boolean) => void;
}

export interface ScrollSmootherOptions {
  wrapper: string | Element;
  content: string | Element;
  smooth?: number;
  speed?: number;
  effects?: boolean;
  autoResize?: boolean;
  ignoreMobileResize?: boolean;
  smoothTouch?: number; // Added for touch device support
}

// SplitText type definition
export interface SplitText {
  chars: any[];
  words: any[];
  lines: any[];
  elements: any[];
  selector: string | Element;
  split: string;
  revert: () => void;
}

// ScrollTrigger type definition
export interface ScrollTriggerType {
  getById: (id: string) => any;
  getAll: () => any[];
  refresh: (force?: boolean) => void;
  config: (options: any) => void;
  create: (options: any) => any;
  isTouch: boolean;
  addEventListener: (event: string, callback: () => void) => void;
}

// Extend the gsap namespace
declare global {
  interface Window {
    gsap: typeof gsap & {
      registerPlugin: (plugin: any, ...others: any[]) => typeof gsap;
    };
  }
}

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';

// Register all plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export { ScrollTrigger, ScrollSmoother, SplitText };

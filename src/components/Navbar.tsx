import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";
import { ScrollSmootherInstance, ScrollSmootherStatic, ExtendedGSAPConfig } from "../types/gsap-types";

// Import ScrollSmoother from our centralized plugins file
import { ScrollSmoother } from "../gsap-club-plugins";

// Initialize GSAP with token
const initGSAP = () => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined' && import.meta.env.VITE_GSAP_TOKEN) {
    // Configure GSAP with our extended config
    const config: ExtendedGSAPConfig = {
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
      units: { left: "%", top: "%", rotation: "rad" },
      trialWarn: false
    };

    // Apply the configuration
    gsap.config(config as any);

    // Custom registerPlugin function
    const originalRegisterPlugin = gsap.registerPlugin;
    gsap.registerPlugin = function(plugin: any, ...others: any[]) {
      if (plugin && typeof plugin === 'object' && typeof plugin.register === 'function') {
        // Register the plugin
        plugin.register();

        // Register any other plugins
        if (others.length) {
          others.forEach(p => gsap.registerPlugin(p));
        }
      } else if (originalRegisterPlugin) {
        return originalRegisterPlugin.call(gsap, plugin, ...others);
      }
      return gsap;
    };

    // Plugins are already imported and registered in gsap-plugins.ts
  }
};

// Initialize GSAP
initGSAP();

// Export smoother instance
export let smoother: ScrollSmootherInstance;

const Navbar = () => {
  useEffect(() => {
    // Store event handlers for cleanup
    const clickHandlers = new Map<HTMLElement, EventListener>();
    let resizeHandler: EventListener | null = null;

    // Wait for ScrollSmoother to be loaded
    const initScrollSmoother = () => {
      // Make sure we're in a browser
      if (typeof window === 'undefined') {
        console.warn('ScrollSmoother initialization skipped - not in browser environment');
        return;
      }

      try {
        // Check if ScrollSmoother is available
        if (!ScrollSmoother) {
          throw new Error('ScrollSmoother plugin not available');
        }

        // Register ScrollSmoother plugin with GSAP if needed
        if (window.gsap && !window.gsap._plugins?.ScrollSmoother) {
          console.log('Registering ScrollSmoother with GSAP');
          window.gsap.registerPlugin(ScrollSmoother);
        }

        // Create the smoother instance
        try {
          if (ScrollSmoother && typeof ScrollSmoother.create === 'function') {
            console.log('Creating ScrollSmoother instance');
            smoother = ScrollSmoother.create({
              wrapper: "#smooth-wrapper",
              content: "#smooth-content",
              smooth: 1, // How long (in seconds) it takes to "catch up" to the native scroll position
              effects: true, // Looks for data-speed and data-lag attributes on elements
              smoothTouch: 0.1, // Much shorter smoothing time on touch devices (default: 0)
            });

            console.log('ScrollSmoother instance created:', smoother);
            smoother.scrollTop(0);
            smoother.paused(true);
          } else {
            throw new Error('ScrollSmoother.create method not found');
          }

          // Set up click handlers
          const links = document.querySelectorAll(".header ul a");
          links.forEach((elem) => {
            const element = elem as HTMLAnchorElement;
            const handler = ((e: MouseEvent) => {
              if (window.innerWidth > 1024) {
                e.preventDefault();
                const target = e.currentTarget as HTMLAnchorElement;
                const section = target.getAttribute("data-href");
                if (section) {
                  smoother.scrollTo(section, true, "top top");
                }
              }
            }) as EventListener;

            // Store the handler for cleanup
            clickHandlers.set(element, handler);
            element.addEventListener("click", handler);
          });

          // Set up resize handler
          resizeHandler = (() => {
            if (ScrollSmoother && typeof ScrollSmoother.refresh === 'function') {
              ScrollSmoother.refresh(true);
            }
          }) as EventListener;

          window.addEventListener("resize", resizeHandler);
        } catch (error) {
          console.error("Error creating or using ScrollSmoother:", error);
          // Create a mock smoother instance as fallback
          smoother = {
            scrollTop: (_position: number) => {},
            paused: (_paused: boolean) => {},
            scrollTo: (_target: string | Element, _smooth?: boolean, _position?: string) => {}
          } as ScrollSmootherInstance;

          // Set up basic click handlers without smooth scrolling
          const links = document.querySelectorAll(".header ul a");
          links.forEach((elem) => {
            const element = elem as HTMLAnchorElement;
            const handler = ((e: MouseEvent) => {
              // Basic navigation without smooth scrolling
              // We don't prevent default so the browser handles the navigation
            }) as EventListener;

            // Store the handler for cleanup
            clickHandlers.set(element, handler);
            element.addEventListener("click", handler);
          });
        }
      } catch (error) {
        console.error("Error initializing ScrollSmoother:", error);
        // Create a mock smoother instance
        smoother = {
          scrollTop: (_position: number) => {},
          paused: (_paused: boolean) => {},
          scrollTo: (_target: string | Element, _smooth?: boolean, _position?: string) => {}
        } as ScrollSmootherInstance;
      }
    };

    // Initialize ScrollSmoother
    initScrollSmoother();

    // Cleanup function
    return () => {
      // Remove click handlers
      clickHandlers.forEach((handler, element) => {
        element.removeEventListener("click", handler);
      });

      // Remove resize handler
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Steve Sony
        </a>
        <a
          href="mailto:stevesony07@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          stevesony07@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;

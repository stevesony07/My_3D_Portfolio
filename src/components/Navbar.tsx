import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";
import { ScrollSmootherInstance, ScrollSmootherStatic } from "../types/gsap-types";

// Import ScrollTrigger and ScrollSmoother
let ScrollTrigger: any;
let ScrollSmoother: ScrollSmootherStatic;

// Initialize GSAP with token
const initGSAP = () => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined' && import.meta.env.VITE_GSAP_TOKEN) {
    // Configure GSAP with basic settings
    const config: any = {
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
      units: { left: "%", top: "%", rotation: "rad" }
    };

    // Add trialWarn property separately to avoid TypeScript errors
    config.trialWarn = false;

    // Apply the configuration
    gsap.config(config);

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

    // Import the plugins dynamically
    Promise.all([
      import("gsap/ScrollTrigger"),
      import("gsap-trial/ScrollSmoother")
    ]).then(([triggerModule, smootherModule]) => {
      ScrollTrigger = triggerModule.ScrollTrigger;
      ScrollSmoother = smootherModule.ScrollSmoother as ScrollSmootherStatic;

      // Register plugins
      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(ScrollSmoother);
    }).catch(error => {
      console.error("Error loading GSAP plugins:", error);
    });
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
    const initScrollSmoother = async () => {
      // Make sure we're in a browser and have the token
      if (typeof window !== 'undefined' && import.meta.env.VITE_GSAP_TOKEN) {
        try {
          // Wait for ScrollSmoother to be imported
          await new Promise<boolean>(resolve => {
            const checkSmoother = () => {
              if (ScrollSmoother) {
                resolve(true);
              } else {
                setTimeout(checkSmoother, 100);
              }
            };
            checkSmoother();
          });

          // Create the smoother instance
          if (ScrollSmoother && typeof ScrollSmoother.create === 'function') {
            smoother = ScrollSmoother.create({
              wrapper: "#smooth-wrapper",
              content: "#smooth-content",
              smooth: 1.7,
              speed: 1.7,
              effects: true,
              autoResize: true,
              ignoreMobileResize: true,
            });

            smoother.scrollTop(0);
            smoother.paused(true);

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
          }
        } catch (error) {
          console.error("Error initializing ScrollSmoother:", error);
        }
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

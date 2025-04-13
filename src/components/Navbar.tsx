import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

// Import ScrollTrigger and ScrollSmoother
let ScrollTrigger, ScrollSmoother;

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  // Set up GSAP with the token
  if (import.meta.env.VITE_GSAP_TOKEN) {
    gsap.registerPlugin = (plugin, ...others) => {
      // Add the plugin to the registered plugins
      gsap.constructor.plugins[plugin.name] = plugin;
      // Call the plugin's register function
      plugin.register();
      // Register any other plugins
      others.forEach(p => gsap.registerPlugin(p));
      return gsap;
    };

    // Configure GSAP
    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
      trialWarn: false,
      units: { left: "%", top: "%", rotation: "rad" }
    });

    // Import the plugins dynamically
    import("gsap/ScrollTrigger").then(module => {
      ScrollTrigger = module.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
    });

    import("gsap-trial/ScrollSmoother").then(module => {
      ScrollSmoother = module.ScrollSmoother;
      gsap.registerPlugin(ScrollSmoother);
    });
  }
}
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    // Wait for ScrollSmoother to be loaded
    const initScrollSmoother = async () => {
      // Make sure we're in a browser and have the token
      if (typeof window !== 'undefined' && import.meta.env.VITE_GSAP_TOKEN) {
        try {
          // Wait for ScrollSmoother to be imported
          await new Promise(resolve => {
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
          let links = document.querySelectorAll(".header ul a");
          links.forEach((elem) => {
            let element = elem as HTMLAnchorElement;
            element.addEventListener("click", (e) => {
              if (window.innerWidth > 1024) {
                e.preventDefault();
                let elem = e.currentTarget as HTMLAnchorElement;
                let section = elem.getAttribute("data-href");
                smoother.scrollTo(section, true, "top top");
              }
            });
          });

          // Set up resize handler
          window.addEventListener("resize", () => {
            if (ScrollSmoother) {
              ScrollSmoother.refresh(true);
            }
          });
        } catch (error) {
          console.error("Error initializing ScrollSmoother:", error);
        }
      }
    };

    initScrollSmoother();

    // Cleanup function
    return () => {
      const links = document.querySelectorAll(".header ul a");
      links.forEach((elem) => {
        elem.removeEventListener("click", () => {});
      });
      window.removeEventListener("resize", () => {});
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

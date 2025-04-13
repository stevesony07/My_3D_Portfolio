import { gsap } from "gsap";
// Import our custom ExtendedGSAPConfig interface
import { ExtendedGSAPConfig } from "./types/gsap-types";

// Initialize GSAP with your token
if (import.meta.env.VITE_GSAP_TOKEN) {
  // Create a plugin object with proper typing
  const initPlugin = {
    name: "GSDevTools",
    register() {
      // This is where the token is applied
      gsap.set("body", { opacity: 1 });
      gsap.defaults({ overwrite: "auto" });

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
    },
    init() {
      return true;
    }
  };

  // Register the plugin
  gsap.registerPlugin(initPlugin);
}

export default gsap;

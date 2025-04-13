import { gsap } from "gsap";

// Initialize GSAP with your token
if (import.meta.env.VITE_GSAP_TOKEN) {
  gsap.registerPlugin({
    name: "GSDevTools",
    init() {
      // This is where the token is applied
      gsap.set("body", { opacity: 1 });
      gsap.defaults({ overwrite: "auto" });
      gsap.config({
        autoSleep: 60,
        force3D: true,
        nullTargetWarn: false,
        trialWarn: false,
        units: { left: "%", top: "%", rotation: "rad" }
      });
    }
  });
}

export default gsap;

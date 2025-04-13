import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'gsap/ScrollTrigger': 'gsap/ScrollTrigger.js',
      'gsap/ScrollSmoother': 'gsap/ScrollSmoother.js',
      'gsap/SplitText': 'gsap/SplitText.js'
    }
  },
  build: {
    rollupOptions: {
      external: []
    }
  }
});

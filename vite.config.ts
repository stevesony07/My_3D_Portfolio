import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Mark GSAP plugins as external to prevent build errors
      external: ['gsap/ScrollTrigger', 'gsap/ScrollSmoother', 'gsap/SplitText']
    }
  },
  optimizeDeps: {
    exclude: ['gsap/ScrollTrigger', 'gsap/ScrollSmoother', 'gsap/SplitText']
  },
  resolve: {
    // Add empty module for GSAP plugins during build
    alias: [
      {
        find: /^gsap\/ScrollTrigger$/,
        replacement: 'src/empty-module.js'
      },
      {
        find: /^gsap\/ScrollSmoother$/,
        replacement: 'src/empty-module.js'
      },
      {
        find: /^gsap\/SplitText$/,
        replacement: 'src/empty-module.js'
      }
    ]
  }
});

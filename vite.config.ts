import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Make env variables available in your client code
      'process.env.GSAP_TOKEN': JSON.stringify(env.GSAP_TOKEN)
    },
    build: {
      // Optimize build settings
      minify: 'terser',
      terserOptions: {
        compress: {
          // Preserve console.logs for debugging
          drop_console: false
        }
      },
      // Ensure we don't try to resolve GSAP plugins during build
      rollupOptions: {
        external: [
          'gsap/ScrollTrigger',
          'gsap/ScrollSmoother',
          'gsap/SplitText'
        ],
        output: {
          // Properly handle external dependencies
          globals: {
            'gsap/ScrollTrigger': 'ScrollTrigger',
            'gsap/ScrollSmoother': 'ScrollSmoother',
            'gsap/SplitText': 'SplitText'
          }
        }
      }
    },
    // Optimize for development
    optimizeDeps: {
      include: ['gsap']
    },
    // Ensure proper handling of TypeScript
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    }
  };
});

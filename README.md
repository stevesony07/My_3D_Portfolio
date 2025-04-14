# My Portfolio Website - Overview 🚀

This repository contains the open source version of my 3D portfolio website. Do check it out!

## Instructions 🛠️

This project uses GSAP Club plugins which require a valid GSAP Club membership. You'll need to set up your GSAP Club token to build and deploy this project. For more information, check out: [GSAP Installation](https://gsap.com/docs/v3/Installation/).

**Techstack** - React, TypeScript, GSAP, ThreeJS, WebGL, HTML, CSS, JavaScript

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Install React:

   ```bash
   npm i react
   ```

4. Install GSAP for React:

   You can choose to install GSAP specifically for React or the general GSAP package:

   For React:
   ```bash
   npm i gsap/react
   ```

   Or the general GSAP package:
   ```bash
   npm i gsap
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

Open your browser and navigate to `http://localhost:5173` to view the website.

### GSAP Setup

This project uses GSAP plugins with ScrollSmoother for smooth scrolling effects. The setup includes:

1. **CDN Loading**: GSAP plugins are loaded from CDN in `index.html`
2. **Plugin Registration**: Plugins are registered with GSAP in the browser
3. **ScrollSmoother Initialization**: ScrollSmoother is initialized in `Navbar.tsx`

#### Troubleshooting ScrollSmoother

If you encounter issues with ScrollSmoother:

1. Check the browser console for errors related to GSAP plugins
2. Verify that the CDN links in `index.html` are accessible
3. Make sure the DOM elements with IDs `smooth-wrapper` and `smooth-content` exist in your HTML
4. If using GSAP Club plugins, ensure your GSAP token is correctly set in `.env`:

   ```bash
   cp .env.example .env
   # Edit .env and add your GSAP Club token
   ```

### Deploying to Vercel

1. Push your code to GitHub:

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. Connect your GitHub repository to Vercel.

3. If using GSAP Club plugins, add your GSAP token as an environment variable in Vercel:
   - Go to your project settings in Vercel
   - Navigate to the "Environment Variables" section
   - Add `GSAP_TOKEN` with your GSAP Club token value

4. Deploy your project.

### Troubleshooting Deployment

If you encounter issues during deployment:

1. **GSAP Plugin Issues**:
   - Check that the CDN links in `index.html` are accessible and not blocked
   - Verify that the GSAP plugins are being loaded correctly by checking the browser console
   - If animations aren't working, try clearing your browser cache and reloading the page

2. **Build Errors**:
   - Check Vercel build logs for any errors related to GSAP plugins
   - Verify that the `vite.config.ts` file is correctly configured
   - Make sure all dependencies are properly installed

3. **ScrollSmoother Issues**:
   - Check if ScrollSmoother is properly initialized in the browser console
   - Verify that the DOM structure matches what ScrollSmoother expects
   - Try disabling ScrollSmoother temporarily to see if that resolves the issue

## Features

- 3D interactive UI built with ThreeJS and WebGL
- Smooth animations using GSAP
- Responsive design for various screen sizes

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.



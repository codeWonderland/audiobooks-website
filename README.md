# Audiobooks — marketing website

Marketing site for **Audiobooks**, a cross-platform desktop app for downloading your
Audible library, browsing local audiobooks, and playing them in a dark, candlelit player.

Built with **React 18 + Vite**, animated with **Framer Motion**. The visual language
(midnight ink + candlelight amber, serif display type) mirrors the app itself.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Structure

```
src/
  App.jsx              # page composition
  styles.css           # design tokens + all component styles
  lib/platform.js      # OS detection for the download CTA
  components/
    Nav.jsx  Hero.jsx  Features.jsx  Gallery.jsx (CloserLook)  Download.jsx  Footer.jsx
    Reveal.jsx         # scroll-reveal wrapper
    icons.jsx          # inline SVG icons, brand mark, and player controls
  assets/              # app screenshots (library, title-details, player)
```

Each of the three app screenshots (1920×1080) appears exactly once, full-width, woven
through the Features section. The hero uses a CSS-built player card rather than a
screenshot. The download CTA and Download section auto-detect the visitor's OS
(macOS / Windows / Linux) and highlight the matching build. Download links are
placeholders (`#download-<os>`) — wire them to real release artifacts when ready.

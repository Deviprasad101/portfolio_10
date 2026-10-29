# Devi Prasad Chinthamreddy — Editorial Portfolio

A VOX-inspired cinematic editorial portfolio engineered with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **GSAP + ScrollTrigger**, and **Framer Motion**.

## Highlights

- **Resume-Backed Source of Truth**: Every role, project, technology, education record, and contact link is sourced from [`Devi_Prasad_Full_Stack_Developer_Resume.pdf`](./Devi_Prasad_Full_Stack_Developer_Resume.pdf) via [`src/data/portfolioData.ts`](./src/data/portfolioData.ts).
- **Signature Interactive Flashlight Reveal**: Reusable CSS radial-mask torchlight (`useFlashlight` + `FlashlightStage`) driven by `requestAnimationFrame` and CSS custom properties (`--torch-x`, `--torch-y`) with zero React re-renders per pointer frame, touch drag/tap support, and a full accessible `X-Ray` toggle in the header.
- **Editorial Case Studies**: Bespoke architectural spreads for **Geo Trip Planner** (Python Flask, Leaflet, OSRM, QR check-in, PostgreSQL/SQLite) and **Geo Intel Meta Hub** (Flask, PostGIS, GeoServer WMS/WFS, GDAL/PDAL/ogr2ogr, Cesium 3D).
- **Signature “Let’s Collaborate” Stage**: Standalone `#EAE8E2` archival ivory section featuring a glossy jet-black pill button with 3D Framer Motion tilt and specular light sweep, connected via 6 dynamic irregular SVG strings (`stroke-dasharray`/`stroke-dashoffset` draw-in + organic sway + pointer tension) to an inline hand-drawn SVG illustration, opening an accessible focus-managed contact overlay.

## Quick Start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Remaining Optional Configuration

1. **Portrait Image**: Add your portrait photo at `public/portrait.jpg` (or update `PORTFOLIO_DATA.identity.portraitPath` in `src/data/portfolioData.ts`). When present, `EditorialPortrait` automatically switches from the archival topographic plate to your art-directed portrait.
2. **Project Live / Repo URLs**: Update `liveUrl` and `repoUrl` for `geo-trip-planner` and `geo-intel-meta-hub` inside `src/data/portfolioData.ts` if public project links are available.
3. **LinkedIn Slug**: Verified and sanitized from your resume PDF hyperlink annotation (`https://www.linkedin.com/in/deviprasad-reddy-chinthamreddy-759b2326b`) in `src/data/portfolioData.ts`.


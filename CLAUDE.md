# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Production build to /dist
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

No test suite is configured.

## Architecture

**Vindom** is a React 19 SPA (Vite) — a spiritual/philosophical website centered on two divine powers: Vin (transformation) and Ken (order).

### Routing

`main.jsx` → `App.jsx` (React Router) → pages in `src/pages/`:
- `/` — HomePage
- `/hymns-vin` — HymnsVinPage
- `/hymns-ken` — HymnsKenPage
- `/cosmology` — CosmologyPage
- `/path-to-wisdom` — PathToWisdomPage
- `/*` — redirects to home

### Data Layer

All static content (hymns, teachings, cosmology pillars, nav links) lives in **`src/data/content.js`**. Pages and components import directly from there — no API calls for content.

### Key Components

- **`OracleChat.jsx`** — Rule-based chatbot with keyword detection; no external API, all local logic.
- **`HymnCarousel.jsx`** — Stateful Previous/Next carousel for hymns.
- **`Navbar.jsx`** — Navigation with logo modal (Escape key to close).
- **`VerseCard.jsx`** — Generic card for teachings/verses.

### Styling

Single large `src/App.css` (18KB) contains all component and page styles. Dark cosmic theme: `#05060d` background, `#ece3ff` text, Spectral serif font.

### Deployment

Deployed on Vercel. Config in `.vercel/project.json`. Deploy via Vercel CLI or git push to master.
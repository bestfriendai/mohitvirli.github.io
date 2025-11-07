# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a 3D interactive portfolio website built with Next.js 15, React 19, React Three Fiber, and GSAP. The site features a scroll-controlled 3D experience with multiple sections: Hero, Portfolio, Mobile Apps, and Footer.

The portfolio is for Patrick Francis (DontFollowPat) and showcases apps, books, and projects.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Prepare git hooks (runs automatically)
npm run prepare
```

## Architecture

### 3D Canvas System

The entire site is built around a single Three.js canvas managed by React Three Fiber:

- **CanvasLoader** (`app/components/common/CanvasLoader.tsx`): Root component that sets up the canvas with ScrollControls (4 pages), handles theme transitions, and manages the loading experience
- **ScrollWrapper** (`app/components/common/ScrollWrapper.tsx`): Controls camera movement based on scroll position using `useFrame` hook. Camera rotation and position are animated based on scroll ranges (0-0.3, 0.3-0.5, 0.85-1.0)
- **ScrollControls**: Configured with 4 pages, 0.4 damping, and controls all vertical navigation

### State Management (Zustand)

Three global stores in `app/stores/`:

- **scrollStore**: Tracks scroll progress (0-1) for animations
- **themeStore**: Manages theme switching (light/dark) with persistence to localStorage
- **portalStore**: Tracks active portal/modal state (used to pause scroll-based camera movement)

All stores are exported from `app/stores/index.ts` and imported via the `@stores` alias.

### Page Structure

The main page (`app/page.tsx`) renders sections in this order:
1. Hero - 3D models and introduction
2. PortfolioContent - Fades in at 50% scroll, fades out at 78%
3. MobileApps - App showcase section
4. Footer - Contact links and information

### HTML Overlays

Some content uses `<Html>` from `@react-three/drei` to render 2D HTML within the 3D scene:

- **PortfolioContent** uses `<Html fullscreen>` with visibility controlled by scroll position (0.5-0.78 range)
- Visibility and opacity are managed separately for smooth transitions

### Path Aliases

Configured in `tsconfig.json`:
- `@/*` - Root directory
- `@stores` - `./app/stores`
- `@types` - `./app/types`
- `@constants` - `./app/constants`

### Data Management

- **Projects**: Defined in `app/constants/projects.ts` (contains a TODO to move to API)
- **Work Experience**: Defined in `app/constants/work.ts`
- **Footer Links**: Defined in `app/constants/footer.ts`

### Git Hooks

Pre-commit hook runs `lint-staged` which applies ESLint fixes to staged `.js`, `.jsx`, `.ts`, `.tsx` files.

## Key Dependencies

- **Next.js 15.5.2** with App Router
- **React 19** and **React DOM 19**
- **React Three Fiber 9.0.4** - React renderer for Three.js
- **Drei 10.0.3** - Useful helpers for R3F (ScrollControls, Html, useScroll, etc.)
- **GSAP 3.12.7** - Animation library for theme transitions and preloader
- **Zustand 5.0.3** - State management
- **Motion 12.23.24** - Animation library
- **Tailwind CSS 3.4.1** - Styling

## Responsive Design

- Uses `react-device-detect` to detect mobile devices
- Camera mouse tracking is disabled on mobile
- Desktop version has 1rem border around canvas
- Mobile uses full viewport height (`100dvh`)

## Performance

- Uses `<AdaptiveDpr pixelated/>` for adaptive device pixel ratio
- Configured with `dpr={[1, 2]}` on Canvas
- `<Preload all />` preloads all assets
- Suspense boundaries for loading states

## Theme System

Two themes defined in `themeStore.ts`:
- Light: `#0690d4`
- Dark: `#111`

Theme changes animate background color using GSAP with noise overlay effect applied to canvas.

## Custom Fonts

Two local fonts loaded in `app/layout.tsx`:
- Soria (`public/soria-font.ttf`)
- Vercetti (`public/Vercetti-Regular.woff`)

## SEO & Analytics

- Metadata configured in `app/layout.tsx` for Patrick Francis
- Google Analytics integrated via `@next/third-parties/google` (GA ID: G-7WD4HM3XRE)
- OpenGraph and Twitter card metadata configured

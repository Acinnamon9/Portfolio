# Code Improvements & Technical Debt

A prioritized list of code-level improvements for the portfolio codebase.

---

## 🔴 High Priority — Bugs & Correctness

### 1. Dark Mode Flash (FOUC)

**File**: `components/Navbar.tsx`, `app/layout.tsx`
**Issue**: Theme is read from `localStorage` inside a `useEffect`, which runs after paint. On first load in dark mode, the page flashes light → dark.
**Fix**: Add an inline `<script>` in `app/layout.tsx` that reads `localStorage` and sets `data-theme` before the browser paints. This blocks render momentarily but prevents the flash.

### 2. External Images Without `next/image`

**File**: `lib/constants.tsx`, `components/ui/SkillCard.tsx`, `ProjectsSection.tsx`
**Issue**: All skill icons and project images use raw `<img>` tags with external URLs. This bypasses Next.js image optimization (lazy loading, format conversion, responsive sizing).
**Fix**: Replace `<img>` with `next/image` and configure `remotePatterns` in `next.config.ts` for each CDN domain (cdn.jsdelivr.net, images.unsplash.com, etc.). This also fixes CLS (Cumulative Layout Shift).

### 3. `constants.tsx` Contains JSX — Should Be Data-Only

**File**: `lib/constants.tsx`
**Issue**: `MISSIONS` array embeds `<Layout />`, `<Boxes />` JSX directly. This forces `constants.tsx` to be a `.tsx` file with `lucide-react` as a dependency, mixing data and rendering concerns.
**Fix**: Store icon names as strings (`"Layout"`, `"Boxes"`) and resolve them to components at render time using a mapping object. This makes `constants.ts` a pure data file.

### 4. `Button` Component Uses `any` Cast

**File**: `components/ui/Button.tsx` (line 50)
**Issue**: `{...(props as any)}` suppresses TypeScript checking entirely.
**Fix**: Properly type the `Comp` variable or use a discriminated union for `asChild` vs regular button props.

---

## 🟡 Medium Priority — Architecture & Performance

### 5. No `loading.tsx` or Suspense Boundaries

**Issue**: Case study pages (`/projects/[slug]`) have no loading state. On slow connections, the page is blank until the component mounts.
**Fix**: Add `app/projects/[slug]/loading.tsx` with a skeleton/spinner in the brutalist style.

### 6. Case Study Page Is Client-Side Only

**File**: `app/projects/[slug]/page.tsx`
**Issue**: The page uses `"use client"` and `useParams()` to find the project. This means it's fully client-rendered — no SSR, no SEO indexing, no OG tags per project.
**Fix**: Convert to a Server Component. Use `generateStaticParams()` to pre-render all project pages at build time, and `generateMetadata()` for per-project OG tags.

### 7. No `key` Stability in Animated Lists

**File**: `components/sections/AboutSection.tsx`
**Issue**: Using array index as `key` for MISSIONS, EXPERIENCE, etc. If the data order changes, React will re-mount instead of re-order.
**Fix**: Use a stable identifier (title, slug) as the `key` prop.

### 8. CSS Animations vs Framer Motion Inconsistency

**Issue**: The codebase uses CSS `@keyframes` for marquee scrolling (`InfiniteMarquee.tsx`) and Framer Motion for everything else. This works, but means two animation systems coexist.
**Fix**: Not urgent, but consider migrating marquee to Framer Motion's `animate` with `repeat: Infinity` for consistency, or document the intentional split.

### 9. `cn()` Utility — No Dedupe

**File**: `lib/utils.ts`
**Issue**: If `cn()` uses only `clsx` without `tailwind-merge`, conflicting Tailwind classes won't be deduped (e.g., `bg-red-500 bg-blue-500` keeps both).
**Fix**: Ensure `cn()` wraps `clsx` inside `twMerge()` from `tailwind-merge`.

---

## 🟢 Low Priority — Clean Code & DX

### 10. Unused Imports in `AboutSection.tsx`

**File**: `components/sections/AboutSection.tsx`
**Issue**: Imports `Layout`, `Boxes`, `Code2`, `Rocket` from lucide-react but doesn't use them directly (they come via `MISSIONS` in constants).
**Fix**: Remove unused imports.

### 11. Hardcoded Strings Scattered Across Components

**Issue**: Rules list in `AboutSection.tsx`, hero taglines in `HeroSection.tsx`, and contact CTA text are hardcoded inline. Everything else is centralized in `constants.tsx`.
**Fix**: Move all remaining copy to `constants.tsx` for single-source-of-truth content management.

### 12. No ESLint / Prettier Config

**Issue**: No `.eslintrc` or `.prettierrc` in the repo. Code formatting relies on editor defaults.
**Fix**: Add `eslint` + `prettier` + `eslint-plugin-tailwindcss` for class ordering.

### 13. No `types.ts` File

**Issue**: Interfaces like `Project`, `SkillCardProps`, `MissionCardProps` are defined inline in their respective files. No central type definitions.
**Fix**: Extract shared interfaces to `lib/types.ts`. Keep component-specific prop types co-located.

### 14. Accessibility — Missing Landmarks & ARIA

**Issue**: Sections use `<section>` without `aria-label` attributes. No `<main>` landmark on case study pages (it exists but is semantic-only).
**Fix**: Add `aria-label` to each `<section>` and ensure all interactive elements have accessible names.

### 15. No Error Boundary

**Issue**: If any component throws during render, the entire page crashes to a white screen.
**Fix**: Add a React Error Boundary component wrapping the main content, with a brutalist-styled fallback UI.

---

## 📐 Refactoring Opportunities

### 16. Extract Reusable `SectionHeader` Component

**Pattern**: Every section repeats the same badge + heading + subheading pattern with slightly different styling.
**Benefit**: Reduces 15+ lines per section to a single `<SectionHeader badge="..." title="..." />` call.

### 17. Extract `SocialLinks` Component

**Pattern**: GitHub / LinkedIn / Email links appear in Navbar, Contact, and case study pages with duplicated URLs and styling.
**Benefit**: Single source of truth for social links + consistent styling.

### 18. Create `useTheme` Hook

**Pattern**: Theme logic (read localStorage, toggle, set attribute) lives inside `Navbar.tsx`. If you add theme toggle elsewhere, you'd duplicate it.
**Benefit**: Extract to `lib/hooks/useTheme.ts` for reuse.

---

## 🏎️ Performance Wins

| Improvement | Impact | Effort |
| :--- | :--- | :--- |
| `next/image` for all images | High (LCP, CLS) | Medium |
| `generateStaticParams` for case studies | High (SEO, FCP) | Low |
| Preconnect to CDN domains (`<link rel="preconnect">`) | Medium (LCP) | Trivial |
| Font preloading (Space Grotesk) | Medium (CLS) | Low |
| Dynamic import for Framer Motion (`next/dynamic`) | Low (bundle size) | Medium |

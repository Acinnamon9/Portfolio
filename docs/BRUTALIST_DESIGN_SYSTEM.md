# The Brutalist Aesthetic Design System

This document outlines the specific implementation of the **Neo-Brutalist** aesthetic in this project. The design is characterized by raw, high-contrast elements, bold typography, and physical-feeling interactions.

---

## 1. Core Visual Principles

The aesthetic moves away from subtle shadows and rounded corners (common in Material Design or iOS) toward a "functional raw" look:

- **Sharp Corners:** Radius is strictly `0px` for all containers.
- **Heavy Borders:** Components are anchored by `4px` (or thicker) solid black borders.
- **Hard Shadows:** No blur. Shadows are distinct offset layers (`8px 8px 0px 0px`).
- **High Contrast:** Black and white foundations with vibrant primary colors.

---

## 2. Color Palette

The project uses a curated set of hex codes that provide a "Cyber-Punk" meets "Print Media" feel.

| Color Role | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Cyber Yellow** | `#ffeb3b` | Primary branding, buttons, highlights. |
| **Cyan** | `#00e5ff` | Secondary accents, interactive elements. |
| **Pink** | `#f50057` | Intense highlights, alerts, gradients. |
| **Solar Light** | `#fdf6e3` | Main background (easy on eyes but feels "paper-like"). |
| **Deep Dark** | `#0a0a0a` | Dark mode background. |
| **Pure Ink** | `#000000` | Borders, text, and hard shadows. |

---

## 3. Typography

The typography is designed to be "loud" and commanding.

- **Primary Font:** `Space Grotesk` (with `Inter` fallback).
- **Heading Style:**
  - `font-weight: 900` (Black weight).
  - `letter-spacing: -0.05em` (Tightly tracked).
  - `text-transform: uppercase` (Always screaming).
  - `line-height: 0.9` (Overlapping feel for dramatic effect).
- **Prose Style:** Even body text in documentation uses `700` or `900` weights to maintain the intensity.

---

## 4. The "Neo-Shadow" Interaction Model

One of the most specific implementations in this project is the **Active Motion Physics** of interactive elements.

### The CSS Formula

```css
/* Normal State */
.brutalist-card {
  border: 4px solid #000;
  box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
  transition: all 0.2s ease;
}

/* Hover State (Floating Up) */
.brutalist-card:hover {
  transform: translate(-2px, -2px); /* Moves up-left */
  box-shadow: 12px 12px 0px 0px #000; /* Shadow grows deeper */
}

/* Active State (Pressing Down) */
.brutalist-button:active {
  transform: translate(2px, 2px); /* Moves down-right */
  box-shadow: 0px 0px 0px 0px #000; /* Shadow disappears */
}
```

*Rationale: This creates a tactile experience where clicking a button feels like physically pushing it into the page.*

---

## 5. Signature Components

### A. The Infinite Marquee

Used in the Hero section, these scrolling carousels create a "ticker-tape" feel.

- **Speed:** Variable (e.g., `22-26s` for full loops).
- **Feel:** Items are usually grayscale, turning color only on parent hover to reduce visual noise while maintaining the raw look.

### B. Gradient Text Outlines

Text that uses both a vibrant gradient and a heavy outline:

```css
.gradient-text {
  -webkit-text-stroke: 2px var(--border);
  color: transparent;
  background: linear-gradient(135deg, var(--secondary), var(--accent));
  -webkit-background-clip: text;
}
```

### C. Brutalist Tooltips

Instead of soft floating tooltips, these are defined by:

- Immediate appearance.
- Thick matching borders.
- Offset `4px` shadows.
- Monospace-style condensed text.

### D. Markdown / Prose Styling

The project overrides standard markdown rendering (`docs-prose` class) to match the vibe:

- **Lists:** Bullet points are replaced with solid squares (`■`) colored in `secondary` (Yellow).
- **Checkboxes:** Custom rendered with thick borders and a matching `✓` mark.
- **Blockquotes:** Inverted colors (black background, light text) with a thick yellow left border.
- **Tables:** Full-width with thick outer borders and inverted header colors.
- **Images in Docs:** Always wrapped in thick borders with an `8px` offset shadow.

---

## 6. Implementation Checklist (Technical)

- [ ] **Borders:** Use `border-4` or `border-8`. Avoid `border-2`.
- [ ] **Colors:** Stick to `bg-brand-primary`, `bg-brand-secondary`, and `bg-accent`.
- [ ] **Shadows:** Always use custom `shadow-[Xpx_Ypx_0px_0px_rgba(0,0,0,1)]`.
- [ ] **Animations:** Prefer `framer-motion` for spring-based translations on cards.
- [ ] **Grayscale:** Use `grayscale` on images by default, removing it on hover for a "pop" effect.

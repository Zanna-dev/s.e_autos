# Responsive layout audit — 29 September 2026

Tested in the Codex Chromium browser using viewport overrides (not physical devices).

## Coverage

- Home and vehicle details: widths 320, 360, 375, 390, 430, 600, 760, 768, 820, 1000, 1024, 1100, 1280, 1440, 1920 and 2560 CSS pixels.
- Inventory: 320, 375, 430, 600, 760, 768, 820, 1000, 1024, 1100, 1280, 1440, 1920 and 2560 pixels.
- Contact dialog: 320×568, 390×844, 600×800, 768×1024, 844×390 and 1280×720; empty-form validation checked at 320px.
- Upload dialog: measured at 320, 600, 768 and 1024px; visually checked in dark mode at 375px.
- Tablet navigation open/contact flow; landscape navigation at 844×390; Escape closes the menu.
- Visual checks of light tablet vehicle details and dark phone vehicle cards and upload form.

## Changes

- Tablet navigation switches to the collapsible menu through 1000px; short-height menus can scroll.
- Vehicle details and contact dialog stack through 1000px.
- Narrow cards move price/actions into a separate row using a container query.
- Gallery controls wrap, including uploaded galleries with more photos.
- Small-screen forms stack through 600px; input and select text uses 16px through 1000px.
- Touch controls have larger targets; touch devices avoid hover transforms.
- Phone hero controls flow below the content instead of depending on absolute positioning.
- Narrow footer stacks; ultrawide gutters keep content at a readable width.

## Results

No document horizontal overflow at the tested home, inventory or detail widths. No measured card overflow, hero console overflow or proof/console overlap. Dialogs remained inside the tested viewports with vertical scrolling. Inventory uses one column through 760px, two through 1100px, and three above 1100px.

Production build, ESLint, seven domain tests and git diff whitespace checks passed. Reduced-motion rules remain intact. Physical iOS/Android devices, Safari-specific rendering and on-screen keyboards were not tested; this audit does not claim exhaustive coverage of every browser/device.

# Implementation status

## Experience redesign — 2026-09-27

The initial block-based homepage has been replaced with a connected automotive experience based on the supplied blue/blush/charcoal/slate palette. See `REDESIGN_DIRECTION.md` for the pre-implementation audit and official reference sources.

Implemented:
- Transparent persistent navigation over the hero; translucent blurred surface after scrolling, active section indicator, mobile menu, and light/dark theme toggle.
- Visible source-derived monochrome DSE symbol and readable wordmark. The original logo bitmap is preserved; an SVG luminance mask supplies theme contrast without blending the entire white image into the header.
- Manual hero vehicle/angle controls, entrance motion, hover responses, and scroll reveals.
- Typed mock vehicle service, search, category/condition filters, no-results reset, NGN/USD/EUR display, and detail/gallery dialogs.
- Guided preference discovery with animated visual changes and enquiry prefill. This is deterministic mock selection, not a claimed live AI service.
- Contact dialog with name, email, business type, requested project/enquiry options, message, accessible validation, preparation/loading/error/ready states, and WhatsApp/email handoff. No backend transmission or false sent confirmation.
- Dark footer, both phone numbers, hours, address, email and social links derived from the supplied handles. Account destinations were not independently verified.
- Optimized responsive image variants, lazy-loaded secondary media, image error fallback, strict TypeScript and theme persistence with pre-render initialization.

## Verification

- Production build and ESLint passed during implementation; final rerun is recorded in the task response.
- Five automated tests pass: validation, contact destination/encoding, combined filters, illustrative currency behavior, and gallery asset availability.
- Live browser verified desktop hero and logo, vehicle/angle selection, category/condition/search filters, reset, USD/EUR labels, vehicle details, enquiry prefill, required-field errors and prepared-message destination.
- Keyboard Tab stayed in the native dialog; Escape closed it. No enquiry was sent.
- Reviewed light and dark modes, mobile contact, narrow layout and tablet/wide layout. Horizontal bounds checked at 320, 390, 820 and 1440 CSS-pixel viewports. Corrected narrow-screen body overflow and mobile heading spacing.
- Sticky header position and theme contrast checked; browser error/warning log empty during final wide-screen inspection.
- Reduced-motion CSS and observer opt-out reviewed in source; operating-system motion preference was not changed for testing.

## Deliberate scope

All stock details, classifications, years, mileage and prices are demonstration data. USD/EUR use labelled fixed illustrative rates. Confirm service availability with the team. This is a single-page experience with vehicle dialogs; independently addressable vehicle routes, live inventory, real exchange rates, and backend form delivery remain future integration work.

Local preview: http://127.0.0.1:5174/.


## Inventory and discovery slice — September 28, 2026
- React Router routes: /, /inventory, /vehicles/:vehicleId, and a catch-all not-found page. Unknown vehicle IDs show a recovery link.
- Collection cards now link to full vehicle pages. Gallery, illustrative specifications/prices, and vehicle-specific contact draft prefill are retained.
- Inventory query parameters: q, category, usage, currency, sort. Invalid values fall back safely. Search replaces the current history entry; discrete filter changes create history entries. Return links retain the originating collection filters.
- Hero crossfades between four cars every six seconds. Pause/play controls are provided. Manual car or angle selection pauses; reduced-motion disables autoplay. Hidden tabs do not advance.
- Final conversation CTA is now a separate themed section before the dark business footer.
- Route transitions, focus/scroll handling, titles and descriptions added. This is client-rendered metadata; prerendering remains a later SEO enhancement.
- Production hosting must rewrite non-asset application URLs to /index.html so direct route visits and refreshes work. Vite preview/dev already support these routes. No production hosting has been configured or deployed.
- Validation: build and lint pass; seven domain tests cover enquiry validation, encoding, stock/media, filter combinations, URL parsing and sorting. Browser verified direct filtered inventory, details, retained return URL, history, mobile detail layout without overflow, vehicle enquiry draft, slideshow advance/pause and separate CTA opening contact. No enquiry was sent.


## Local vehicle uploads and refresh behaviour
- Each collection category now offers Add vehicle, preselecting the body style or fuel type.
- Required details, numeric constraints and at least one photo; maximum eight JPEG/PNG/WebP images, 8 MB each. Photos are decoded, resized to 1600px maximum and stored with the record. Preview, remove and make-cover controls are included.
- IndexedDB persists local vehicles and images across reloads. Changes refresh mounted inventory queries. New records use local labels and asking prices; existing mock data retains illustrative labels. Hero remains a curated demo slideshow.
- Save confirmation includes View in collection and Undo save. Save failures retain form data and show an error.
- This is a local prototype management workflow, not a shared/public upload backend or authenticated dealership administration. Clearing browser site data removes local records. Public publishing requires a backend, image storage and authorized administration in a future slice.
- A home-page browser reload disables scroll restoration and clears the section hash before mounting. Normal section navigation still works.
- Verified in browser: Hybrid preselection, missing-photo error, image preview, successful save, persisted vehicle and decoded gallery photo on a fresh page, undo test record, and refresh from /#your-drive returning to scrollY 0 with no hash. Test listing was removed. Build/lint and existing seven domain tests passed.


## Current scope — website only

The local administration slice was removed at the user's request. Administration will be developed later in a separate project. This website runs with Vite alone and uses mock inventory plus the previously approved browser-only upload prototype. There is no admin route, login, server API, publishing workflow or backend dependency. Existing browser inventory is preserved. Any previously generated local backend data is left untouched and ignored by Git, but is no longer used by this website.

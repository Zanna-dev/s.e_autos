# DOUBLE S.E AUTOS: website foundation

Prepared 2026-09-26 from both reference PDFs, supplied imagery, and confirmed business decisions. This is the first foundation deliverable; proposed design choices can evolve during section-by-section implementation.

## 1. Creative direction

**Quiet confidence. Clear information. Exceptional presence.**

Build a contemporary Abuja showroom experience where large vehicle photography creates desire and clear information makes enquiry easy. Balance cinematic presentation with the approachable, sincere service promised by the dealership. Quality Nigerian-used and foreign-used vehicles remain the principal offer; the design should not imply that only exotic cars are welcome.

Proposed hero copy:

> Your next chapter. Your next car.
>
> Explore Nigerian-used and foreign-used vehicles with sincere advice, transparent information, and reliable service. Visit DOUBLE S.E AUTOS in Asokoro, Abuja.

Primary action: **Explore vehicles**. Secondary action: **Speak with us**.

Use the existing tagline, **Quality Vehicles. Trusted Dealer.**, in supporting brand placements. Communicate sincerity, transparency, and reliability through useful descriptions and visible contact options. Avoid invented reviews, sales counts, inspection guarantees, warranty promises, or unverified superiority claims.

## 2. Brand and visual system

Use the approved copper/sage DSE identity consistently. Preserve source images. Website derivatives should retain the actual mark rather than approximate it with text or a newly invented symbol. Begin with the supplied logo; prepare smaller transparent/vector variants when suitable source assets or an explicitly scoped adaptation step are available.

| Token | Value | Intended role |
| --- | --- | --- |
| Midnight Aubergine | `#211821` | Header, hero framing, dark sections, primary text on light surfaces |
| Soft Porcelain | `#F2EEE7` | Main reading surfaces and light text on dark sections |
| Smoked Copper | `#A9654B` | Brand accents, rules, selected details; text/button pairings require contrast checks |
| Muted Sage | `#87917D` | Secondary accents and subtle supporting surfaces |

Let aubergine and porcelain dominate. Copper provides selective emphasis; sage connects the identity to the green vehicle and landscape imagery. Use opaque surfaces and fine borders. Avoid spreading the metallic logo treatment across buttons or backgrounds.

Typography direction: a modern sans-serif display face with strong proportions, paired with a highly readable sans-serif body face. Start with local/system sans-serif fallbacks and choose any additional licensed font during visual implementation. Use large sentence-case headlines, restrained uppercase eyebrow labels, and tabular numerals for prices/specifications. Do not imitate the rejected serif-logo identity through excessive decorative typography.

Layout: fluid content width capped near 1440px, 20px mobile gutters increasing to 48-72px on larger screens, a 4/8px spacing rhythm, and section spacing around 56px mobile / 96px desktop. Use modest 4-8px corner radii, understated borders, and little or no shadow. Keep body copy at least 16px with comfortable line spacing.

## 3. Sitemap and page responsibilities

| Route | Purpose | Main action |
| --- | --- | --- |
| `/` | Introduce the brand, show selected vehicles, establish the service approach | Explore vehicles |
| `/inventory` | Search, filter, and sort the mock showroom | View vehicle |
| `/inventory/:slug` | Inspect one vehicle, its imagery, specifications, and pricing | Enquire on WhatsApp |
| `/about` | Explain the business focus and values | Speak with the team |
| `/contact` | Provide location, hours, call, WhatsApp, and email options | Contact or arrange a viewing |
| Unmatched route | Explain a missing page and help users recover | Return to inventory |

Header navigation: Inventory, About, Contact; the logo links Home. Include the currency selector and a clear contact action. Mobile navigation uses an accessible menu with the same destinations.

Accounts, saved vehicles, comparisons, financing tools, online checkout, CMS/admin, and automated bookings are outside the initial scope. A viewing request is a conversation with the dealership, not a confirmed reservation.

## 4. Homepage information architecture

1. **Header and cinematic introduction.** Aubergine framing, a large supplied vehicle photograph, concise heading, location label, and two actions. Proposed opening image: attachment 8, the Lexus exterior with space around the vehicle. Place text beside or above the photograph when an overlay would obscure the car or reduce readability. Mobile uses a deliberate image crop with text in its own readable area.
2. **Selected vehicles.** Three editorial vehicle cards linking into the inventory, with make/model labels, price, year, mileage, transmission, and usage category. All development stock and prices are visibly identified as demonstration content. Offer a direct link to the full showroom.
3. **The DOUBLE S.E approach.** A quieter porcelain section: sincere advice, transparent information, reliable service. Pair concise copy with a supplied close-up photograph. Describe values without inventing operational guarantees.
4. **Find the right fit.** A compact invitation to discuss needs and budget, with Nigerian-used and foreign-used entry points to filtered inventory. Use a simple split composition rather than another repeated card grid.
5. **Visit us in Asokoro.** Address, Monday-Saturday hours, viewing-enquiry action, and phone links. Use an address-based directions link; do not invent map coordinates or showroom imagery.
6. **Footer.** DSE identity, tagline, navigation, both phone numbers, email, social handles/verified links, and address.

The progression is introduction -> discovery -> trust -> personal assistance -> visit/enquiry. Avoid carousels that hide core content and repeated contact pop-ups.

## 5. Reusable design system and interactions

- **Buttons and links:** one primary solid style, a secondary outline style, and a quiet text link; explicit hover, focus, disabled, and busy states. Touch targets should be approximately 44px or larger.
- **Vehicle cards:** consistent 3:2 photography, clear title and price, concise specifications, usage badge, and a descriptive detail link. Avoid nested interactive elements inside a clickable card.
- **Inventory controls:** text search, make, usage category, price range, and sorting by price/year. Store shareable filter state in URL query parameters. Provide results count, clear-all, and helpful no-results recovery. Mobile filters open in an accessible panel.
- **Vehicle detail:** large gallery, selectable thumbnails, clear specifications, price/currency, condition description, and enquiry actions. A mobile action bar must not obscure content or keyboard focus. Missing interior images are omitted instead of replaced with unrelated interiors.
- **Contact:** direct WhatsApp, call, and email actions are sufficient for the first version. If an enquiry composer is used, label its action as opening WhatsApp/email; do not claim a message was sent or stored when no backend exists.
- **Feedback:** intentional loading, empty, error/retry, missing-image, and not-found states. Accessible names and visible keyboard focus throughout.

## 6. Motion language

Use restrained CSS transitions: approximately 160-220ms for controls and 400-600ms for optional section reveals. Favor opacity and small transforms; card images may scale slightly on hover without shifting layout. Never hide essential content if motion setup fails.

No autoplay hero carousel, mandatory intro, scroll hijacking, or continuous decorative motion. Start with a static hero image for fast loading. Reduced-motion users get immediate state changes and static sections; keyboard and touch users retain the same functionality.

## 7. React architecture and existing-project assessment

The current repository contains the React + TypeScript + Vite starter screen and starter CSS. `src/ApiClient.ts` and `src/services/AuthService.ts` are empty. React Compiler is already configured. No routing or test library is currently listed. `tsconfig.app.json` has useful lint-related compiler flags but does not explicitly enable `strict`; implementation should enable strict checking.

Retain the existing toolchain. Use CSS custom properties for tokens and focused component styles; no large UI kit is needed to achieve this direction. Choose/configure a routing library at the routing implementation step and keep route definitions centralized. Avoid adding auth, global inventory Context, or a server-state library before there is a real need.

```text
src/
  assets/                  Optimized application imagery and logo derivatives
  components/
    common/                Buttons, fields, feedback states
    layout/                Header, footer, page container
    vehicle/               Cards, gallery, specifications
  pages/                   Home, Inventory, VehicleDetails, About, Contact, NotFound
  services/                Vehicle data access; future API boundary
  interfaces/              Vehicle, filters, money, image and enquiry contracts
  hooks/                   Inventory query/filter behavior and reusable React logic
  context/                 Currency preference only when shared across routes
  routes/                  Route declarations and path builders
  data/                    Mock vehicles, navigation and dealership content
  constants/               Currency/unit values and constrained choices
  utils/                   Formatting, filter transformations, contact-link builders
  config/                  Typed environment configuration when needed
  styles/                  Tokens and global styles
```

Create folders and abstractions when they have a concrete responsibility, not as empty scaffolding. Pages compose UI. A `vehicleService` exposes list/detail domain operations over mock records, so the future API can replace its internals. Components never import raw mock inventory directly. Keep currency preference separate from inventory data; local menu/gallery state stays local.

Canonical Vehicle contract should include stable ID and slug, explicitly mocked make/model/year, usage category, transmission, mileage value/unit, price in NGN, image records with alt text, descriptive features, availability, and a demonstration-data flag. Optional properties reflect genuine missing information. Do not infer exact trims or years from generated imagery.

Currency formatting is centralized using NGN by default. USD/EUR demonstration conversions use one documented mock-rate configuration and visible illustrative labelling; filters and sorting operate on canonical NGN values. No live-rate claims. Contact-link builders encode the selected vehicle's name and page link for WhatsApp.

## 8. Content and asset handling

Source of truth for business details: `reference/README.md`. Originals and their hashes: `reference/images/manifest.json`. Use the supplied vehicle images first; additional web imagery is optional and should have a recorded source and appropriate usage rights.

Create responsive display derivatives during implementation, reserving dimensions and using modern formats where appropriate. Only the hero image receives eager/high-priority loading; below-fold assets are lazy-loaded. Preserve original PNGs outside the application bundle. The GMC collage is a reference asset, not an automatic single-image gallery entry.

Primary WhatsApp/call: +234 813 888 3296. Additional calls: +234 810 031 0290. Email: doubleseautos@gmail.com. Location: Hillside Plaza, Yakubu Gowon Crescent, Asokoro, Abuja. Hours: Monday-Saturday, 8 a.m.-6 p.m. Africa/Lagos. Social handle: sse_autos on Instagram, TikTok, and Facebook; verify destination URLs before treating them as confirmed live profiles.

## 9. Implementation sequence and validation

1. Brand tokens, global typography/layout, optimized initial assets, and accessible header/footer.
2. Homepage hero and section composition using reusable primitives.
3. Typed mock vehicle data/service, inventory controls, route-based detail pages and gallery.
4. About/contact content, enquiry links, currency behavior, and complete fallback states.
5. Responsive and keyboard review, relevant behavior tests, metadata/direct-link handling, and production build validation.

Before a feature is complete: strict type checking, lint and build must pass; test meaningful filter/currency/contact-link logic and principal user journeys. Review narrow mobile through wide desktop, keyboard navigation, reduced motion, image loading/failure, no-results states, and direct vehicle links. Route metadata and deployment fallback support require explicit attention in this client-rendered app; do not assume SPA rendering alone guarantees search indexing.

This deliverable establishes the foundation. Application code is unchanged at this stage. The first UI implementation slice is the shared shell and homepage hero.

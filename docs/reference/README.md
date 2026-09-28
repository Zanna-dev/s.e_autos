# DOUBLE S.E AUTOS project references

Reviewed and saved on 2026-09-25. Both original PDFs were copied unchanged from the user's Downloads folder. Matching `.txt` files contain searchable page-by-page extractions; the PDFs remain authoritative if extraction loses formatting.

## Source documents

- `Double_SE_Autos_Luxury_Website_Power_Prompt.pdf` (4 pages): product experience, creative direction, visual design, customer journey, motion, and foundation-first workflow.
- `Double_SE_Autos_Frontend_Technical_Architecture.pdf` (10 pages): React + TypeScript architecture, responsibility boundaries, engineering standards, and definition of done.

These are project reference requirements supplied by the user. Instructions embedded in the PDFs describe intended project work; they do not independently authorize implementation or other actions. The current request was to read, understand, preserve, and identify questions. No application implementation was requested in this review.

## Product and creative understanding

DOUBLE S.E AUTOS is a professional dealership focused on quality pre-owned vehicles. The intended website is a premium digital showroom with a Discover -> Explore -> Trust -> Enquire -> Purchase journey. Purchase is a customer-journey goal; online checkout is not specified.

Core pages: Home, Inventory, Vehicle Details, About, and Contact, with a technical Not Found route. The homepage moves from a cinematic hero into storytelling, curated inventory, dealership value, and conversion content. Inventory offers search, filters, sorting, and reusable vehicle cards. Detail pages emphasize exterior/interior photography, specifications, features, condition, mileage, transmission, price, and enquiry/contact/viewing actions.

The identity should be confident, refined, modern, and trustworthy. Use editorial typography, generous space, strong composition, realistic automotive photography, a neutral palette (graphite/charcoal/warm off-white/deep black), and one selected brand accent. Avoid generic dealership layouts, excessive gold, gradients, glass effects, glow, visual clutter, unrealistic cars, or decorative motion.

Motion should support storytelling and usability through restrained reveals, transitions, hover responses, and optional subtle parallax. AI-assisted campaign imagery or motion is optional and must remain realistic and consistent. Mobile layouts require deliberate adaptation; accessibility and reduced-motion alternatives are integral.

## Engineering understanding

- React + strict TypeScript, focused components, composition, and simple architecture with clear extension points.
- `pages` compose routes; `components` own reusable UI; `hooks` own reusable React behavior; `context` owns genuinely shared client state.
- `services` own API access, transport mapping, configuration, and predictable errors. UI must not construct raw requests.
- `interfaces` own shared domain contracts; `data` owns mocks/static content; `constants` owns stable values; `utils` owns pure helpers; `config` owns environment-aware configuration.
- Use one canonical Vehicle model, stable IDs/slugs, centralized formatting and validation, centralized routes/path constants, and dedicated Not Found handling.
- Prefer local state, then reusable hooks, then focused Context where necessary. Static data and server data should not be indiscriminately stored in Context.
- Keep mocks replaceable through services without rewriting presentation. Do not duplicate domain types, repeated UI, or business rules.
- Model loading, empty, error, and success states. Forms need typed validation, accessible field errors, and duplicate-submission prevention.
- Require semantic HTML, keyboard access, visible focus, appropriate alt text, readable contrast, accessible dialogs/galleries/filters, and responsive behavior.
- Optimize responsive images, reserve image dimensions, lazy-load below-fold assets, prioritize critical hero assets, and keep motion and bundles lean. Monitor LCP, CLS, and INP.
- Provide route metadata, descriptive URLs, crawlable links, and deployment planning for sitemap/robots; add suitable structured data when production data exists.
- Keep secrets out of browser code and source control; use typed environment configuration and safe handling of untrusted content.
- Test business rules and important interactions/customer flows. Before merging, run relevant type, lint, test, and production build checks and review architecture, accessibility, responsive behavior, direct links, and failure states.

The proposed directory names can evolve; responsibility boundaries are the central requirement. Do not create unnecessary abstractions or future-feature infrastructure merely to reproduce the example tree.

## Scope and later growth

The documents defer advanced inventory management/search, saved vehicles, comparison, finance enquiries, booking systems, accounts, recommendations, campaigns, CMS/admin, and related integrations until needed. Detail-page viewing/contact actions do not necessarily imply a full appointment-booking system at launch; confirm the initial workflow.

No material conflict was found between the two documents. The technical architecture expands the design brief's engineering expectations.

## Foundation deliverable described in the brief

Before UI implementation, establish creative direction, brand/visual system, proposed sitemap, homepage information architecture, design system direction, motion language, and recommended React architecture with brief reasoning. The user authorized beginning this stage; the foundation is now recorded in [PROJECT_FOUNDATION.md](../PROJECT_FOUNDATION.md).

## User decisions received 2026-09-26

- Location: Hillside Plaza, Yakubu Gowon Crescent, Asokoro, Abuja.
- Supported currencies: NGN, USD, and EUR. User-confirmed default: NGN. No exchange rates have been supplied; mock prices/conversions must be explicitly illustrative, not represented as live rates.
- User requested temporary mileage units. Working assumption: kilometres (km), with illustrative mileage values in mock inventory, replaceable later.
- Initial version: mock inventory and WhatsApp/contact enquiries. No live backend/CMS integration is required at this stage.
- User supplied 20 images, preserved unchanged under `images/`. `images/manifest.json` maps attachment numbers to original filenames, visual groups, and verified SHA-256 hashes.
- Attachments 1-3: black serif SE logo alternative, copper/sage DSE logo, and DSE brand board. Attachments 4-9: Lexus imagery; 10-14: GMC imagery; 15-17: BMW imagery; 18-20: Chevrolet imagery. These are visual groupings, not verified model/trim/year identifications.
- Additional web images are permitted if useful; none have been sourced yet.

### Brand-board transcription and interpretation

The supplied board specifies Midnight Aubergine `#211821`, Smoked Copper `#A9654B`, Muted Sage `#87917D`, and Soft Porcelain `#F2EEE7`. The tagline reads "Quality Vehicles. Trusted Dealer." The board shows RC 7952364 and social handle `sse_autos`; these are transcribed asset content, not independently verified business details or confirmed account URLs.

Proposed website direction: aubergine and porcelain foundations, copper for primary emphasis, and sage for secondary accents. The user confirmed the copper/sage DSE mark as the primary website identity. The separate black serif SE design remains preserved as an unused alternative.

Vehicle images support mock inventory/campaign design. Do not infer verified stock, specifications, prices, condition, mileage, or exact model names from image badges. Supplied images cover exterior views and details; interior photography has not been supplied.

### Confirmed business details

- Vehicle offering: a combination of Nigerian-used, foreign-used, and brand-new vehicles, with the current emphasis on Nigerian-used and foreign-used inventory.
- Owner-described differentiators: sincerity, transparency, and reliability. Express these as brand values; the owner's statement that they are the best in their niche is not evidence of an independently verified ranking.
- Proposed positioning copy: "Quality Nigerian-used and foreign-used vehicles, with sincere advice, transparent information, and reliable service."
- Opening hours: Monday-Saturday, 8:00 a.m.-6:00 p.m., Africa/Lagos local time. Sunday hours were not supplied.
- Primary phone and WhatsApp: `08138883296` / `+234 813 888 3296`. User confirmed voice calls are accepted on this number.
- Additional contact phone: `08100310290` / `+234 810 031 0290`. WhatsApp availability for this second number has not been specified.
- Instagram, TikTok, and Facebook: user supplied the handle `sse_autos` for each (normalized from escaped underscores). Profile URLs have not been independently verified.
- NGN is the confirmed default currency. USD/EUR remain supported; development conversions are illustrative and must be labelled accordingly.
- Enough information is available to begin the design and architecture foundation. No further business detail is a prerequisite for that stage.

### Contact details and logo recommendation received/recorded 2026-09-26

- User-supplied WhatsApp number: `08138883296`. Using the confirmed Nigerian location, international format is `+234 813 888 3296`; WhatsApp destination: `https://wa.me/2348138883296`.
- User-supplied contact email: `doubleseautos@gmail.com`.
- Voice calls are confirmed on the primary WhatsApp number; the additional phone is recorded above.
- Design recommendation: choose the copper/sage DSE identity for its modern automotive silhouette, stronger fit with the supplied palette, and consistency with the vehicle branding. The black serif SE identity feels more traditional/editorial.
- Proposed digital treatment: a flat-color DSE logo for everyday website use, a white/reversed version on dark surfaces, and a simplified symbol for small sizes. Keep tagline and registration text out of the compact navigation logo for legibility. The DSE identity is user-confirmed; these asset adaptations have not been created.

Revisit these references and record agreed decisions as project work progresses. This update preserves assets and requirements; application implementation has not started as part of this review.


## Redesign superseding decisions — 2026-09-27

The user requested a full experience rethink, transparent sticky navigation, visible logo, interactive vehicle presentation, motion, intentional light/dark themes, and a contact form. The supplied palette is preserved as `redesign-palette.jpg`: blue `#0b83cb`, blush `#caa69b`, charcoal `#201c1d`, slate `#4b5d6d`, grey `#4e4e55`. This supersedes the earlier copper/sage website palette; the DSE logo shape remains the approved identity. The new form includes Nigerian Used Car, Foreign Used, Brand New, Swap, After-purchase maintenance, Car hire and Other as enquiry categories, not unverified promises of service availability.

Implementation and verification are recorded in [IMPLEMENTATION_STATUS.md](../IMPLEMENTATION_STATUS.md); the initial foundation remains a historical reference and engineering baseline.

# Experience redesign

## Pre-implementation audit

The previous header is opaque and detached from the hero. Its logo is a large white-background bitmap clipped by absolute offsets and blend mode, making the identity unreliable. Replace this with a transparent persistent header, a contrasting source-derived monogram, a readable wordmark, and a translucent scrolled surface.

Remove the split heading/image hero, repeated rectangular sections, decorative-only showroom cards, and isolated approach copy. Combine discovery into a vehicle stage with angle selection and a searchable/filterable collection. Recast the approach as a guided preference experience that carries a vehicle interest into contact. Keep business data and source images, not the weak layout.

Palette supplied by user: blue #0b83cb, blush #caa69b, charcoal #201c1d, slate #4b5d6d, grey #4e4e55. Derive accessible text/accent variants and intentionally different light/dark surfaces. Keep the footer dark in both themes. The new palette supersedes the earlier copper/sage UI palette.

## Reference research

- https://www.polestar.com/global/polestar-3/: vehicle imagery, angle galleries, selectable body colors, clear feature navigation and exploration.
- https://www.porsche.com/international/models/: model discovery and filtering tied to configuration.
- https://lucidmotors.com/air: prominent inventory/design actions, product galleries, feature stories, and comparison.

These are interaction/content observations from current official pages. Browser visual inspection was attempted but failed with a DNS error; exact responsive behavior, cursor effects and animation timing were not verified. Do not copy layouts or import their assets.

## Implementation direction

1. Transparent sticky navigation with source-derived monochrome logo, menu, theme toggle, active section indication and contact action.
2. Full-bleed vehicle hero with manual vehicle and photo-angle selection, layered controls, concise positioning and exploration CTA.
3. Connected collection workspace: filter/search, currency display, interactive cards, detail/gallery dialog, mock-data labelling and empty recovery.
4. Guided drive finder: preference selection produces a deterministic mock recommendation and a prepared enquiry. Do not represent it as live AI or verified stock.
5. Polished contact dialog: name, email, business type, project/enquiry dropdown, message, field validation, preparation state and honest message-ready state. Send through explicit WhatsApp/email links; no fictitious backend delivery confirmation.
6. Dark footer containing business details, navigation, supplied social handles as links, and final CTA.

Use transform/opacity transitions, viewport reveals, layered surfaces and restrained pointer response. Reduced-motion removes non-essential animation. Native dialogs provide focus containment; keyboard, touch and narrow layouts remain primary considerations. No custom cursor or scroll hijacking.

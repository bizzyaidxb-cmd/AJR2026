# AJR — Amar Jawan Riders
## Website Plan v1.0 · July 2026

**Mission:** Fundraising rides for the families of India's army martyrs.
**Reference:** [The Distinguished Gentleman's Ride](https://gentlemansride.com/) — we mirror its structure, not its brand.
**Audience:** Male riders, 20–45, across India. Emotionally driven by patriotism, brotherhood, and the ride itself.

---

## 1. Brand Direction — "Light & Premium, Purely Indian"

### Emotional core
DGR sells *dapper style for men's health*. AJR sells *the ride as tribute*. Every page should feel like a salute: proud, warm, never mournful. Key emotional beats: the eternal flame (Amar Jawan Jyoti), the folded tricolor, the rider brotherhood, the family we ride for.

### Tagline options
- **"We Ride. They Live Forever."**
- "Every Mile, A Salute."
- "Riding for the Families of the Brave."

### Color palette — LOCKED ("Sindoor & Peacock")
| Role | Color | Hex |
|---|---|---|
| Base | Warm sand | `#F7EEE2` |
| Primary accent | Sindoor vermillion | `#B33114` |
| Secondary accent | Peacock teal | `#124D52` |
| Premium accent | Antique gold | `#B38B4B` |
| Solemn / memorial | Midnight teal | `#0C2B2E` |
| Text | Deep umber | `#241F1A` |

Ratio ~60/25/8/4/3. CTAs: Register = sindoor fill, Donate = peacock outline (both AA on sand base). No literal tricolor anywhere — the palette evokes India through tilak vermillion and the national bird, not the flag.

### Typography — LOCKED (Type System C — revised Aug 2026)
- **Display/Headings:** Special Gothic Condensed One — a condensed all-caps grotesque. Bold, event-poster energy (DGR-adjacent), reads cleanly at large sizes and embroidered on a patch. Single weight; use size + tracking for hierarchy. Set uppercase with tight tracking.
- **Body/UI:** Work Sans 400/500.
- **Hindi body text:** Mukta 400/500.
- **Indic display / the intro sequence:** Special Gothic Condensed One covers Latin only (no Devanagari or other Indic glyphs), so non-Latin display text uses script-specific faces — Tiro Devanagari Hindi (Hindi), Manjari (Malayalam), Catamaran (Tamil), Ramabhadra (Telugu), Baloo Paaji 2 (Punjabi). Hindi body still uses Mukta.
- All Google Fonts, free for commercial use.

> **Note (Aug 2026):** Display was originally locked to **Rozha One** (chosen for native Devanagari — one voice across scripts). The built homepage moved to **Special Gothic Condensed One** for a bolder, condensed event-poster feel, and that is now the locked choice. Trade-off accepted: Special Gothic has no Indic glyphs, so Devanagari/other scripts fall to Mukta/Tiro and the script-specific faces above rather than sharing the display voice.

### Motifs & imagery
- Eternal flame mark (works into the AJR logo).
- Golden-hour ride photography: convoys, tricolor flags on bikes, riders saluting.
- Portraits of martyrs' families receiving support — dignity, never pity.
- Subtle brass/medal textures on stat cards and badges.

---

## 2. Sitemap

```
Home
├── About
│   ├── Our Story & Mission
│   ├── The Families We Support (where funds go)
│   └── FAQs & Ride Safety
├── Rides (Events)
│   ├── Find a Ride (city listing + map of India)
│   ├── Ride Detail page (route, date, host, capacity)
│   └── Host a Ride
├── Register  →  rider sign-up flow
├── Donate    →  one-time / sponsor-a-rider / dedicate-a-mile
├── Riders (Showcase)
│   ├── Rider profiles & fundraising pages
│   ├── Leaderboards (riders, cities, clubs)
│   └── Gallery (past rides, upload photos)
├── Partners / Sponsors
└── Contact · Press · Privacy · Terms
```

---

## 3. Homepage — Section by Section (DGR-mirrored)

1. **Hero** — Full-bleed golden-hour convoy photo, tricolor flags visible. Date of next national ride day. H1: *"Riding for the Families of the Brave."* CTAs: **Register to Ride** (saffron) + **Donate** (outline gold).
2. **Countdown** — Days/hours to National Ride Day, with one-line mission statement.
3. **The Motive** — Short emotional block: eternal flame mark + 3 lines on why we ride. Link → About.
4. **Find Your Ride** — India map with city pins (Delhi, Mumbai, Pune, Bengaluru, Chandigarh, Jaipur…), capacity badges ("Almost Full").
5. **Impact stats** — ₹ raised · families supported · riders · cities. Brass-medal styled cards.
6. **Ride Day strip** — Live Instagram, upload photos, live gallery (DGR's ride-day trio).
7. **Rider showcase** — Top fundraisers carousel + featured rider story.
8. **A Family's Story** — One martyr family, photo + quote. The emotional anchor of the page.
9. **Sponsors** — Title sponsor + partner logo row.
10. **Final CTA** — "Whether you ride, donate, or share — every action honours them." Register + Donate.
11. **Footer** — Full sitemap links, socials, legal.

---

## 4. Core Features (launch scope)

### A. Rider Registration
- Steps: Account → Rider details (bike, city, blood group, emergency contact) → Choose ride → Optional personal fundraising page → Waiver/indemnity.
- Output: rider dashboard + shareable fundraising page with personal target.
- Phase 1 shortcut: registration form → payment gateway → email confirmation. Dashboard in Phase 2.

### B. Rides / Events Listing
- City cards + India map. Each ride: date, route map, start point, host, capacity, registered count.
- Filter by city/state/date. "Almost Full / Full" states create urgency (as DGR does).

### C. Donation Flow
- Modes: one-time donation · sponsor a specific rider · dedicate a donation to a martyr's family.
- Razorpay/Instamojo for UPI + cards. 80G tax-receipt messaging if the trust is registered — major conversion lever in India.
- Transparency block: "Where your money goes" with simple split graphic.

### D. Rider & Ride Showcase
- Leaderboards: top fundraising riders, cities, riding clubs.
- Gallery: past rides, photo upload after ride day.
- Rider profiles: bike, city, total raised, rides completed, badges (e.g., "3-Year Veteran", "₹1L Club").

---

## 5. Build Phases

| Phase | Scope | Goal |
|---|---|---|
| **1 — Launch** | Home, About, Rides listing, Registration form + payment, basic Donate | Take registrations for first ride day |
| **2 — Community** | Rider profiles/dashboards, personal fundraising pages, leaderboards, gallery | Turn riders into fundraisers |
| **3 — Scale** | Host-a-ride portal, sponsor pages, blog/stories, Hindi language toggle | National footprint |

**Suggested stack:** Next.js (same as DGR) + Razorpay + a CMS (Sanity/Strapi) for rides & stories. Or Webflow + Memberstack for a faster Phase 1.

---

## 6. Content To Prepare (before design)

- AJR logo (flame + wheel/wing concepts) and final tagline.
- First ride day date + 3–5 launch cities with hosts.
- Trust/NGO registration details, 80G status, bank/payment accounts.
- 20–30 strong photographs (rides, flags, families) — this site lives or dies on photography.
- One family story (with consent) + 2–3 rider testimonials.
- Legal: waiver text, privacy policy, terms.

---

## 7. Next Steps

1. Lock tagline + palette (this doc).
2. Moodboard + homepage design in Figma.
3. Design registration & donate flows.
4. Build Phase 1.

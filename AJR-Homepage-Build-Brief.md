# AJR Homepage — Build Brief v3 (Vermillion)
Scope: **homepage only.** Inner pages are parked.

> ⚠ **NAME CHANGE (locked):** the brand is now **AMAR JAWAN RIDE** — singular, the event — not "Amar Jawan Riders". Matches the founder's original 2023 deck. All copy, the logo wordmark, page titles, and the seal text change with it. "AJR" abbreviation survives unchanged.

---

## 0. Website intro — "The Naming" (Apple-style, no assets needed — I build this in GSAP)

Full-screen midnight overlay before anything else. Pure type, four beats:

1. **A.J.R** — Special Gothic Condensed One, huge, sand on midnight, letters tracking in one by one with the gold seam flicker between them
2. Morphs through the languages, one every ~700ms, same size and position:
   `A.J.R` → `ए.जे.र` (Hindi) → `എ.ജെ.ആർ` (Malayalam) → `ஏ.ஜே.ஆர்` (Tamil) → `ఏ.జే.ఆర్` (Telugu) → `ਏ.ਜੇ.ਆਰ` (Punjabi) — one country, every tongue
3. Resolves back to **A.J.R**, then expands to **AMAR JAWAN RIDE** with the intro line fading in beneath: *"One day. Every language. One promise."*
4. Overlay lifts like a curtain → hero film begins underneath (scene 1, the soldier's eyes)

Build notes: fonts — Special Gothic Condensed One (Latin), Tiro Devanagari Hindi, **Manjari** (Malayalam), **Catamaran** (Tamil), **Ramabhadra** (Telugu), **Baloo Paaji 2** (Punjabi) — all Google Fonts. (Special Gothic covers Latin only; the Indic beats use the script-specific faces listed.) Plays once per session (sessionStorage), skippable on click/scroll, skipped entirely under `prefers-reduced-motion`. Total ≤ 6 seconds.

---

## 0b. "About AJR" film section (admin-fed, coming soon)

New homepage section between The Experience and the Family Story: a large 16:9 dark frame for the official Amar Jawan Ride film. **Admin uploads it from the portal** — not made yet, so the prototype ships a poster state: midnight frame, gold play button, caption *"The official AJR film — coming soon."* When admin publishes, the same slot plays it inline. (Add to admin portal spec: Content → Homepage film → upload/replace video + poster.)

---

## 1. Palette — VERMILLION, not saffron (political-neutrality decision)

> ⚠ **Saffron/orange dominance is OFF.** In India an orange-led identity reads as party-aligned (BJP kesari). AJR must belong to every Indian. Primary stays **sindoor vermillion** — the red of tilak and sacrifice, politically unclaimed. Warm orange appears ONLY inside flame artwork, where fire is fire.

| Token | Old | **New** | Use |
|---|---|---|---|
| `--kesari` | — | **`#C13B1B`** | Warm vermillion accent: flame glow, highlights |
| `--sindoor` | unchanged | **`#B33114`** | Primary: buttons, links, CTAs (AA on cream) |
| `--peacock` | `#124D52` | **`#124D52`** unchanged | Secondary, outline buttons |
| `--gold` | `#B38B4B` | **`#B38B4B`** unchanged | Dividers, seals, rim light |
| `--midnight` | `#0C2B2E` | **`#0C2B2E`** unchanged | Dark sections |
| `--sand` | `#F7EEE2` | **`#F7EEE2`** unchanged | Page base |
| `--umber` | `#241F1A` | **`#241F1A`** unchanged | Body text |

Rule: vermillion is ritual red — tilak, kumkum, sacrifice. Flames in artwork may glow warm orange (fire is universal), but UI surfaces, buttons, logo fills and large colour fields stay vermillion/teal/gold. Never saffron-dominant, never beside flag-green.

Typography: **Special Gothic Condensed One** display (revised from Rozha One — see Website-Plan Type System C) · **Work Sans** UI · **Mukta** Hindi.

---

## 2. Logo — rebuild (Nano Banana, then vectorise)
**Output:** `logo_v2.png` — ask for plain solid green background so it can be keyed.

> Bold emblem logo for "AMAR JAWAN RIDE". A single powerful front-facing head, split perfectly down the vertical centre: the LEFT half is a motorcycle rider's helmet with a raised visor, the RIGHT half is an Indian Army soldier's combat helmet with a chin strap. The two halves fuse into one face, with a thin antique gold #B38B4B seam running down the middle. Strong angular wings sweep outward from behind the head, and the whole mark sits inside a bold shield outline. Colour: deep vermillion #B33114 as the dominant fill, deep peacock teal #124D52 for shadow shapes, antique gold #B38B4B for the seam and thin outlines, on a plain solid green background. Style: bold, heavy-weight flat vector emblem, thick confident shapes, high contrast, crest/badge energy — the kind of mark that reads clearly embroidered on a jacket back or at 32px as a favicon. Flat vector only: no gradients, no bevels, no 3D, no drop shadows, no photorealism, no text, no faces with detailed features (stylised only), no Ashoka emblem, no tricolour stripes.

Also generate: **`logo_v2_mono.png`** — same prompt + "single flat colour, warm cream #F7EEE2 silhouette on plain solid green background, no internal colour detail" (for dark sections/footer).

---

## 3. Homepage sections + the exact asset each needs

| # | Section | Asset(s) needed | File to produce |
|---|---|---|---|
| 1 | **Hero** — full-bleed film, centred headline | Hero film, 5 scenes | `hero_1.mp4` … `hero_5.mp4` |
| 1b | Hero foreground layer (parallax) | Cut-out riders strip | `hero_riders_fg.png` |
| 2 | **Stats band** (₹ raised first) | Fundraiser seal, vermillion | `seal_v2.png` |
| 3 | **Why we ride** | Eternal flame loop | `loop_flame_v2.mp4` |
| 4 | **Find your ride** | India map, vermillion pins | `loop_map_v2.mp4` |
| 5 | **The experience** ×3 cards | Convoy / brotherhood / honour | `card_ride.mp4`, `card_brotherhood.mp4`, `card_honour.mp4` |
| 6 | **Family story** (dark) | Family doorway | `loop_family_v2.mp4` |
| 7 | **Gateway** (scroll-through) | Mughal door — **already have** | ✅ `mandir trasparent.png` |
| 8 | **Final CTA** | Marigold petal burst | `petal_burst.mp4` |
| 9 | **Dividers** between sections | Garland strip, transparent | `garland_strip.png` |

---

## 4. Google Flow prompts — copy/paste

### Shared style block — append to EVERY prompt
> STYLE: flat vector illustration animation, solid colour fills, crisp shapes, no gradients, no painterly texture, no photorealism, stylised figures only. Palette strictly: vermillion #B33114, warm flame-orange #D97426 (ONLY inside flames/petals), peacock teal #124D52, antique gold #B38B4B, warm cream #F7EEE2, dark midnight teal #0C2B2E. Camera locked, no zoom, no shake. Dignified, proud, calm. No text, no logos, no tricolour stripes, no Ashoka emblem.

### 4.1 Hero film — 5 scenes (~3s each, 16:9)
**`hero_1.mp4` — the eyes**
> Closeup of a soldier's stylised eyes beneath a helmet brim, surrounded by darkness, thin warm gold rim light along the cheekbone. He blinks once, very slowly. A tiny warm-orange eternal flame flickers reflected in his eyes. + STYLE

**`hero_2.mp4` — the same eyes, rider**
> Closeup framed identically to a soldier's eyes under a helmet brim: a motorcycle rider's stylised eyes inside an open helmet visor, same gold rim light on the cheekbone, same tiny warm-orange flame reflected in the eyes. He blinks once, slowly. + STYLE

**`hero_3.mp4` — salute to throttle**
> Silhouette profile: a soldier's hand rises into a crisp military salute, then dissolves into a rider's gloved hand slowly rolling a motorcycle throttle at the same arm angle. Thin gold rim light carves both hands out of the darkness. + STYLE

**`hero_4.mp4` — the flag hand-off**
> Closeup, low angle: a folded tricolour-less ceremonial cloth in deep vermillion and gold is passed from a soldier's gloved hands into a rider's gloved hands. Both figures in silhouette, gold rim light. Slow, reverent, deliberate movement. + STYLE

**`hero_5.mp4` — the promise (THIS ONE LOOPS)**
> Wide shot at dawn: a convoy of motorcycle silhouettes rides from night into morning — the left of frame deep midnight teal with faint stars, the right opening into a warm cream sky with a warm gold sun disc. The lead rider carries a fluttering vermillion pennant. At the far left a soldier silhouette stands saluting the departing convoy, a small warm-orange flame at his feet. Marigold petals drift across. Constant convoy speed, last frame matches first for a perfect seamless loop. + STYLE

### 4.2 Section loops (6–8s, seamless)
**`loop_flame_v2.mp4`**
> A single elegant gold torch on a plinth with a tall warm-orange flame, framed by a thin gold arch, against dark midnight teal. Only the flame moves — a slow, natural flicker, swaying and settling. Marigold garland at the base stays still. Seamless loop. + STYLE

**`loop_map_v2.mp4`**
> A stylised flat map of India on warm cream, landmass in pale teal, hairline gold state borders. Small vermillion flame markers pulse gently one after another in a slow wave across the country, like lamps being lit. Map and borders stay completely static. Seamless loop. + STYLE

**`loop_family_v2.mp4`**
> A rider bows slightly and offers a folded cloth and marigold flowers to a mother and child at the doorway of a modest home, all as dignified flat silhouettes on warm cream. Only the marigold door decorations sway faintly and the sari edge moves. Figures hold their pose. Hopeful, never mournful. Seamless loop. + STYLE

**`card_ride.mp4`** (3:2)
> A convoy of five motorcycle silhouettes rides steadily toward the viewer on an open highway at dawn, wheels turning, a saffron pennant fluttering on the lead bike, marigold petals drifting. Seamless loop. + STYLE

**`card_brotherhood.mp4`** (3:2)
> Three riders stand beside parked motorcycles at a roadside chai stall at golden hour, helmets under arms. Steam curls from the chai kettle, a hanging marigold string sways, leaves move faintly. Riders hold their poses. Seamless loop. + STYLE

**`card_honour.mp4`** (3:2)
> A winged medal badge with a vermillion flame at its centre hangs from a vermillion-and-gold ribbon against warm cream. A slow specular light sweep crosses the gold wings once, and the medal sways 1–2 degrees. Background static. Seamless loop. + STYLE

**`petal_burst.mp4`** (2s, ends clean, plain background for keying)
> Twenty marigold petals in vermillion and gold erupt gently upward from the bottom centre of frame, hang, then drift back down and out. Plain solid green background for keying. No confetti shapes, no sparkles — marigold petals only. Ends clean. + STYLE

### 4.3 Stills (Nano Banana)
**`hero_riders_fg.png`** — plain solid green background
> A horizontal strip of five motorcycle riders in convoy, rear three-quarter view, as solid dark midnight teal silhouettes with thin vermillion rim-light edges, the lead rider carrying a saffron pennant. Riders and their ground shadow ONLY — no sky, no hills, no road surface. Bottom-anchored composition, isolated on a plain solid green background. + STYLE

**`seal_v2.png`** — plain solid green background
> A circular award seal: outer ring in antique gold carrying the words "THE AMAR JAWAN RIDE" on top and "INDIA'S LARGEST MOTORCYCLE FUNDRAISER" below, inner circle in deep peacock teal holding a vermillion eternal flame on a small gold torch, two small laurel sprigs at the base of the ring. Flat vector, crisp, premium, isolated on a plain solid green background. + STYLE

**`garland_strip.png`** — plain solid green background
> A single horizontal string of marigold flowers — alternating vermillion #B33114 and gold #B38B4B blooms with small teal leaf accents — hanging in a gentle repeated scallop, like festival bunting. Tileable left to right, isolated on a plain solid green background. + STYLE

---

## 5. GSAP scroll plan (what I build once assets land)

**Scroll spine**
- Gold **ride-progress bar** across the top, scrubbed to page scroll.
- **Bike-as-scrollbar** on the right rail (we already have the top-view bike PNG) — rides down as you scroll, gentle sway.
- Hero: film plays once → settles into looping scene 5; video slow-scales while the centred headline lifts away.
- **Gateway pin**: the Mughal door scales toward the viewer and you pass *through* the arch into the final CTA.

**Section entrances**
- Headings and kickers rise + fade at 88% viewport, once only.
- Stat numbers **count up in Indian format** (₹18,40,000) when they enter view — ₹ raised sits first.
- City cards stagger in; experience cards stagger with a slight scale.
- All images/loops get a slow parallax drift.

**Teeny-tiny interactions**
- Buttons lift 1px with a soft saffron shadow on hover.
- City rows nudge right, border warms to gold.
- Experience card media zooms 1.04 on hover.
- Progress bars fill on scroll with a **tiny flame riding the leading edge**.
- Countdown digits flip with a 120ms roll on change.
- Petal burst fires once on the final CTA entering view.
- Everything respects `prefers-reduced-motion`.

---

## 6. Order to generate
1. `logo_v2.png` + mono — everything else keys off it
2. `hero_1..5.mp4` — the showpiece
3. `seal_v2.png`, `hero_riders_fg.png`
4. Section loops (flame → map → family → 3 cards)
5. `garland_strip.png`, `petal_burst.mp4`

Drop into `Assets/set4/`. Send batch 1 and I'll start rebuilding the homepage in saffron while you generate the rest.

---

# v4 — Stakeholder round 2 (17 Aug 2026)

**Changes requested:** hero end-scene cloth → Indian flag, no flowers anywhere in hero; torch flame artwork → Amar Jawan Jyoti (inverted rifle + helmet); logo: no wings, closed helmet, no face, plus a unique printable wordmark. Donate CTAs already removed site-wide.

## Expected files (drop in `Assets/set4/`)
| File | Replaces |
|---|---|
| `hero_flag.mp4` | final hand-off scene in `hero_intro.mp4` (I will re-cut the hero) |
| `jyoti_arch.png` / `jyoti_arch.mp4` | `flame_arch.mp4` + `flame_flicker_crop.mp4` (motive title + gateway) |
| `logo_v3.png` | `logo_v2.png` (+ I'll build the mono) |
| `wordmark_v3.png` | HTML wordmark in nav/footer (also print use) |

## Prompts

### 1. Hero final scene — flag hand-off (video, 4s)
> Cinematic close-up, warm dawn light: an Indian Army soldier's hands respectfully passing a neatly folded Indian national flag — folded in a crisp triangle, saffron, white with navy-blue Ashoka Chakra, and green all visible — into the gloved hands of a motorcycle rider wearing a black full-face helmet. Slow, reverent motion, shallow depth of field, sandstone war-memorial wall softly blurred behind. Colour grade: deep teal shadows, warm sand highlights. Absolutely no flowers, no petals, no garlands, no text, no watermark, no logos. 1920x1080, 24fps, one continuous 4-second shot.

### 2. Amar Jawan Jyoti — arch illustration (image + loop)
> Flat vector-style illustration, elegant minimal Indian memorial poster art: the Amar Jawan Jyoti — an inverted rifle standing barrel-down on a black polished plinth, a soldier's combat helmet resting on top of the rifle butt, and a small eternal flame burning in a round brass urn beside the plinth. Composition framed inside a thin antique-gold arch outline, on a deep peacock-teal background with subtle fabric texture. Palette: brass gold, deep black plinth with small gold "अमर जवान" engraving, vermillion-red flame, peacock teal background. No flowers, no garlands, no people, no other text, no watermark. Dignified, museum-poster quality, clean thick vector shapes. Portrait 1080x1920, subject centered with generous margin.

Video pass (Flow): *same scene, only the flame flickers gently and slowly; rifle, helmet and plinth perfectly still; seamless 8-second loop; no camera movement.*

### 3. Logo v3 — emblem (no wings, closed helmet, no face)
> Premium flat-vector motorcycle event emblem: a bold shield badge containing one single closed full-face helmet with a dark opaque visor — NO face visible, NO eyes. The helmet reads half military combat helmet (matte green texture, chin strap) and half motorcycle rider helmet (glossy, visor), split cleanly down the vertical center. No wings, no laurels, no banner, no stars. Strict palette: vermillion red #B33114, deep midnight teal #0C2B2E, antique gold #B38B4B, cream #F7EEE2. Thick confident outlines, flat shading only, iconic at small sizes, transparent background, no text, no watermark.

### 4. Wordmark — unique printable typeface
> Custom display wordmark reading "AMAR JAWAN RIDE" in three stacked or two-line lockup: bold, very condensed uppercase letterforms with a unique military-stencil character — subtle angled stencil cuts (bridges) in the strokes, squared terminals, tight letter spacing. Feel: Indian military stencil crate-markings crossed with a modern condensed grotesque; unmistakable and ownable, works embroidered on a patch or printed on a tee. Single flat colour cream #F7EEE2 on transparent background, razor-sharp vector edges, no outline, no shadow, no texture, no watermark.

**Note for stakeholders:** the Flag Code of India restricts commercial use of the tricolor — for a fundraiser hero film it's normally fine as respectful depiction, but worth a quick legal glance before launch.

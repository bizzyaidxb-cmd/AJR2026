# AJR Asset Generation Prompts
Paste-ready for Nano Banana (images) and Veo/Flow (video).

**Note on logo variants:** don't regenerate the horizontal, medallion-only, and mono-white versions with AI — derive them from your existing SVG in Illustrator so they match perfectly. Prompts below are for everything else.

---

## Shared style block
Append this to every image prompt for consistency:

> STYLE: flat vector illustration, solid fills, crisp edges, no gradients, no outlines thicker than needed, no drop shadows, no 3D, no photorealism. Strict palette: vermillion red #B33114, deep peacock teal #124D52, antique gold #B38B4B, warm cream #F7EEE2, dark midnight teal #0C2B2E for depth. Dignified, premium, patriotic Indian tribute mood — never aggressive, never cartoon-cute. No Indian flag tricolor blocks, no Ashoka emblem, no skulls, no text.

---

## 1. Hero illustration — static style frame (also the video poster)
Wide cinematic illustration, 16:9, of a motorcycle convoy riding toward the viewer at dawn on an open Indian highway. Five riders in silhouette in dark midnight teal #0C2B2E, the lead rider carrying a fluttering vermillion pennant flag on a pole. Warm cream #F7EEE2 sky occupying the upper two thirds, a large minimal sun disc in antique gold #B38B4B low on the horizon, distant flat hills in muted teal #124D52. Subtle marigold-petal shapes drifting in the air. Foreground road in dark teal with simple gold lane markings. Calm, proud, epic and quiet at the same time. Lots of negative space at top for headline text. + STYLE block

## 2. Hero loop video (Veo — 8s seamless loop)
Flat vector-style animated illustration, seamless loop: a convoy of five motorcycle rider silhouettes in dark midnight teal riding steadily left-to-right across an open highway at dawn, wheels spinning smoothly, a vermillion red pennant flag fluttering gently on the lead bike. Warm cream sky, large static antique-gold sun disc on the horizon, distant flat teal hills passing in slow parallax, a few marigold petals drifting across the frame. A small eternal flame in gold flickers softly on a roadside memorial post as the convoy passes. Camera locked, no cuts, no zoom. Constant speed so the last frame matches the first for perfect looping. Flat 2D vector aesthetic, solid colors only — palette: #B33114, #124D52, #B38B4B, #F7EEE2, #0C2B2E. No text, no photorealism, no camera shake, muted colors of dawn, dignified and calm mood.

## 3. Memorial / solemn section illustration
Minimal illustration, 4:5 portrait, of the Amar Jawan Jyoti eternal flame: a single elegant gold torch with a tall vermillion flame, standing on a simple plinth, against a dark midnight teal #0C2B2E background. A thin gold arch frames the flame. Two small marigold garland strands at the base. Enormous negative space, museum-quiet mood. + STYLE block

## 4. "Families we support" illustration
Warm illustration, 1:1, of a rider respectfully presenting a folded cloth and flowers to a mother and child standing at the doorway of a modest home, all figures in dignified flat silhouette style — vermillion, teal and gold on warm cream. Body language of respect and warmth: slight bow, hand on heart. No faces detailed, no grief poses, no coffins, no uniforms on the family. Hopeful, not mournful. + STYLE block

## 5. "Find your ride" map backdrop
Stylized flat map of India, 4:3, in warm cream #F7EEE2 with the landmass in a very light teal tint, state borders as hairline gold, and 8–10 city markers as small vermillion flame icons. No labels, no flag colors, no Kashmir border controversy — use the official Survey of India outline. Minimal, elegant, cartographic. + STYLE block

## 6. Rider community / brotherhood card image
Illustration, 3:2, of three riders standing beside their parked motorcycles at a chai stall at golden hour, laughing, helmets under arms, one tying a marigold string to a handlebar. Flat silhouette style in palette. Warm, human, brotherly. + STYLE block

## 7. Registration success / badge illustration
Illustration, 1:1, of a single winged medal badge hanging from a vermillion-and-gold striped ribbon: wings and central flame echoing a winged emblem with an eternal flame medallion, in vermillion, teal and gold on warm cream. Celebratory but dignified — a military honour, not a trophy. + STYLE block

## 8. Social / OG share image
Wide banner illustration, 1200x628, same dawn convoy scene as the hero style frame but with the composition weighted to the left half, leaving the right half as clean warm cream negative space for logo and text overlay to be added later. + STYLE block

---

## 9. Image-to-video loops (Google Flow — animate existing assets)
Upload the named source image, paste the prompt. All clips: 6–8 seconds, camera fully locked, seamless loop. Save outputs to `Assets/Gen Content/` with the exact output names below.

### 9a. Eternal flame
**Source:** `Eternal_flame_on_plinth_202607141220.jpeg` → **Output:** `loop_flame.mp4`
> Animate ONLY the red flame: a soft, slow, natural flicker — gently swaying, stretching and settling like a memorial flame in still air. The torch, plinth, arch, garland and background remain completely static. Camera locked, no zoom, no pan. Constant subtle motion so the last frame matches the first for a seamless loop. Flat vector style preserved exactly, no new colors, no glow effects, no smoke.

### 9b. Family doorway
**Source:** `Rider_presents_cloth_flowers_doo…_202607141220_4.jpeg` → **Output:** `loop_family.mp4`
> Animate with barely-there motion: the marigold decorations above the door sway very slightly as if in a faint breeze, the edge of the mother's sari and the flowers in the offered bouquet move almost imperceptibly. All figures hold their pose; no faces change, no walking, no gestures. Everything else fully static. Camera locked. Extremely subtle, dignified, seamless loop, flat vector style preserved exactly.

### 9c. Chai stall
**Source:** `Riders_laughing_at_chai_stall_202607141220_4.jpeg` → **Output:** `loop_chai.mp4`
> Animate gently: thin steam rising and curling from the chai kettle and cups, the hanging marigold string swaying slightly, leaves of the background tree moving faintly. The riders stay in their poses with at most a subtle shift of weight or a small nod. Camera locked, no zoom. Warm, calm, seamless loop, flat vector style preserved exactly, no new elements.

### 9d. Winged badge
**Source:** `Winged_medal_badge_on_ribbon_202607141220_3.jpeg` → **Output:** `loop_badge.mp4`
> Animate a single slow specular light sweep moving diagonally across the gold wings and medallion, like a medal catching sunlight — one pass every few seconds. The badge itself sways on its ribbon by 1–2 degrees, very slowly. Background completely static. Camera locked, seamless loop, flat vector style preserved, no sparkle particles, no lens flare.

### 9e. India map
**Source:** `Map_of_India_city_markers_202607141220_3.jpeg` → **Output:** `loop_map.mp4`
> Animate ONLY the small red flame markers on the map: they pulse gently one after another in a slow wave — each flame flickering softly then settling, like lamps being lit across the country. The map, borders and background remain completely static. Camera locked, no zoom, seamless loop, flat vector style preserved exactly.

---

## 10. Round two — assets to make the page pop
Same shared STYLE block applies (section above). Save to `Assets/` with the exact output names.

### 10a. Hero foreground riders strip
**Output:** `hero_riders_fg.png` (PNG, transparent background, ~2400px wide)
> A horizontal strip of five motorcycle riders in convoy, rear three-quarter view, silhouettes in dark midnight teal #0C2B2E with subtle gold rim-light edges, the lead rider carrying a vermillion pennant flag. Riders and road shadow only — NO sky, NO background, NO hills: fully transparent background, cut out cleanly. Bottom-anchored composition so it can sit at the bottom edge of a frame. + STYLE block

### 10b. India Gate memorial backdrop
**Output:** `memorial_backdrop.png` (16:9, ~2400px wide)
> A wide, reverent night illustration of an India Gate-style war memorial arch (generic triumphal arch, NOT an exact replica), centered, in dark midnight teal #0C2B2E tones with antique gold #B38B4B edge highlights, a small eternal flame burning at its base. Deep teal night sky with faint stars, two marigold garland strands at the arch base. Enormous negative space, museum-quiet, solemn. + STYLE block

### 10c. Marigold garland string
**Output:** `garland_horizontal.png` (PNG, transparent, ~2400px wide, horizontal)
> A single horizontal string of marigold flowers — alternating vermillion #B33114 and gold #B38B4B blooms with small green leaf accents — hanging in a gentle repeated swag/scallop pattern, like festival bunting. Fully transparent background, cleanly cut out, tileable left-to-right. + STYLE block

### 10d. Loose marigold petals
**Output:** `petals.png` (PNG, transparent, single sheet of 6–8 separate petals)
> Six to eight individual marigold petals scattered on a fully transparent background, each petal separate and not overlapping, in vermillion and gold tones, flat vector style, varied sizes and rotations. + STYLE block

### 10e. Night convoy loop (Flow / Veo — 8s seamless loop)
**Output:** `loop_night_convoy.mp4`
> Flat vector-style animated illustration, seamless loop: a convoy of motorcycle silhouettes riding steadily through the night, warm gold headlight beams cutting forward, a vermillion pennant flag fluttering on the lead bike. Deep midnight teal sky with faint stars, dark hills in slow parallax, one distant memorial flame glowing gold on the horizon. Camera locked, constant speed, last frame matches first for perfect loop. Palette: #0C2B2E, #124D52, #B33114, #B38B4B. No text, no photorealism, dignified and calm.

### 10f. Rider avatars (three separate images)
**Outputs:** `avatar_rider_1.png`, `avatar_rider_2.png`, `avatar_rider_3.png` (1:1, transparent or cream background)
> Flat vector bust portrait of an Indian motorcycle rider, chest-up, warm and dignified expression, on plain warm cream #F7EEE2 circle. Variant 1: bearded man in an open-face helmet with goggles. Variant 2: man in a saffron-less deep teal turban and riding jacket. Variant 3: younger man, helmet under implied arm, wearing a kurta with a riding jacket. Consistent style across all three, same head scale. + STYLE block

### 10g. City landmark line icons (one prompt, eight outputs)
**Outputs:** `icon_delhi.png`, `icon_mumbai.png`, `icon_pune.png`, `icon_bengaluru.png`, `icon_chandigarh.png`, `icon_jaipur.png`, `icon_hyderabad.png`, `icon_kochi.png` (1:1, transparent)
> A minimal single-weight line icon in antique gold #B38B4B on transparent background, of [LANDMARK]. Uniform stroke weight, no fill, no shading, contained in the same square proportion. One at a time: Delhi — India Gate arch; Mumbai — Gateway of India; Pune — Shaniwar Wada gate; Bengaluru — Vidhana Soudha dome; Chandigarh — Open Hand monument; Jaipur — Hawa Mahal facade; Hyderabad — Charminar; Kochi — Chinese fishing nets.

### 10h. Logo variants — NOT AI
Derive from the master SVG in Illustrator: horizontal lockup (`logo_horizontal.svg`), medallion-only mark (`logo_mark.svg`), and you already have the white version. Export a 512px PNG of the mark as `favicon.png`.

---

## 11. Assets for the inner pages (register, donate, leaderboard, city, profiles)
Same shared STYLE block. Exact output names as before.

### 11a. "India's Largest Motorcycle Fundraiser" seal
**Output:** `seal_fundraiser.png` (1:1, transparent)
> A circular emblem seal, like a premium award stamp: outer ring of antique gold #B38B4B containing the words "INDIA'S LARGEST MOTORCYCLE FUNDRAISER" in clean capitals, inner circle in deep peacock teal #124D52 holding a small gold eternal flame. Two tiny laurel sprigs at the base of the ring. Flat vector, crisp, dignified — a mark of scale and trust, not a cartoon badge. + STYLE block
*Used on: hero, donate page, footer, OG images. This is the stakeholder's "largest fundraiser" emotion made visible.*

### 11b. Register page portrait loop (Flow, 6–8s)
**Output:** `loop_salute_portrait.mp4` (9:16 or 3:4 portrait)
> Portrait-orientation flat vector animation, seamless loop: a single rider stands beside his motorcycle at dawn, facing a distant eternal flame memorial, and holds a steady salute. Marigold petals drift slowly. Only petals, the flame, and a gently waving pennant move; the rider holds the salute. Camera locked. Palette: #0C2B2E, #B33114, #B38B4B, #F7EEE2. Solemn, proud, calm.
*Replaces the reused hero video on the register split panel.*

### 11c. Impact icons — where your money goes
**Outputs:** `icon_livelihood.png`, `icon_education.png`, `icon_home.png` (1:1, transparent)
> A minimal single-weight line icon in antique gold #B38B4B on transparent: [1] two hands supporting a small sprouting plant (livelihood), [2] an open book with a small flame above it (education), [3] a simple home with a heart in the doorway (shelter). Uniform stroke, no fill. + STYLE block
*Used on: donate page trust section + transparency block.*

### 11d. Leaderboard medal set
**Outputs:** `medal_1.png`, `medal_2.png`, `medal_3.png` (1:1, transparent)
> A small round medal icon: winged rim with an eternal flame at center. Version 1 in antique gold, version 2 in muted silver-grey #9BA8A6, version 3 in warm bronze #A66D3F. Flat vector, reads clearly at 32px. + STYLE block

### 11e. Fundraising level badge set
**Outputs:** `badge_spark.png`, `badge_flamebearer.png`, `badge_1lclub.png`, `badge_eternal.png` (1:1, transparent)
> A family of four small circular rank badges, same construction: a flame at center, progressively more ornate — [1] Spark: single small flame outline in gold; [2] Flame Bearer: solid flame with thin wing hints; [3] One Lakh Club: flame with full wings and a gold ring; [4] Eternal: flame with wings, ring, and tiny laurel. Consistent scale and stroke across all four. + STYLE block

### 11f. State theme banners (city pages)
**Outputs:** `state_kerala.png`, `state_maharashtra.png`, `state_punjab.png`… (16:5 wide, one prompt per state)
> A wide flat vector banner strip evoking [STATE] without clichés or text: Kerala — backwater palms and a snake-boat silhouette line; Maharashtra — Sahyadri fort ramparts; Punjab — wheat field lines and a gurdwara dome silhouette. Rendered ONLY in the brand palette (teal silhouettes on warm cream, gold accents) so all states feel like one family. + STYLE block

### 11g. Rider share card template
**Output:** `share_card_template.png` (1080x1080)
> A social share card layout: warm cream background with jaali pattern at 5%, top strip with winged badge emblem, large empty center space reserved for rider name and amount (added programmatically), bottom band in peacock teal with "I ride for the families of the brave — Amar Jawan Riders" in cream. + STYLE block

### 11h. Marigold petal burst (Flow, 2s, transparent if possible)
**Output:** `petal_burst.mp4` or Lottie
> A brief celebration burst of 15–20 marigold petals in vermillion and gold, erupting gently upward from bottom center then drifting down, over a plain background for keying. No confetti shapes, no stars — only marigold petals. 2 seconds, ends clean.
*Plays once on donation success and registration success. This is our "confetti" — festive but Indian and dignified.*

---

## 12. Motion & micro-interaction plan (build notes, no assets needed)
- **Rupee count-ups everywhere:** any ₹ total animates up in Indian format (₹3,40,000) when it enters view. Money in motion = the fundraiser feeling. (Homepage stats already do this.)
- **Recent salutes ticker:** a slim strip on home + donate: "Priya from Kochi saluted with ₹2,100 · Anonymous backed Highway Lions MC · …" — live social proof, first names only, anonymous respected.
- **Progress bars with a flame tip:** city target bars fill on scroll with a tiny flame icon riding the leading edge.
- **Donate button morph:** amount updates live in the button (done); on success the button briefly becomes the flame before the petal burst.
- **Leaderboard entrance:** rows stagger in; the viewer's own row pulses gold once. Rank changes animate with a gentle rise.
- **Chip/checkbox pops:** selected amount chips scale 1.0→1.04→1.0; the T&C checkbox tick draws itself.
- **Salute counter concept:** every donation is "a salute" — success screens say "You are salute #1,205 to the brave." The count is the emotional metric, alongside rupees.
- **Restraint rule:** one celebratory moment per flow (the success screen). Everything else stays quiet — the dignity IS the brand.

## 13. Donation-first copy bank (per stakeholder direction)
- Hero kicker: **"India's Largest Motorcycle Fundraiser"** — promoted from body text to the line above the H1, with the gold seal.
- Stats order flipped: **₹ raised first**, then families supported, then riders, then cities.
- CTA pairs everywhere become: **"Donate" (sindoor, primary) + "Register to ride" (outline)** on cause-focused pages; reversed only on ride-focused pages.
- Lines to use: "Every mile is a salute. Every rupee is a promise." · "You don't need a motorcycle to ride with us — donate." · "3,000 riders. One promise: no martyr's family fights alone." · "The convoy is the noise. The donation is the message."

- Run 4 variations each; re-prompt "flatter, simpler, fewer details" if texture creeps in.
- For Veo: generate 2–3 takes; pick the one where wheel motion and flag flutter are smoothest, then trim to a clean loop point in editing. Ask for 1080p; export webm (~2–3MB) + mp4 fallback + poster jpg.
- Keep every output on the cream background — never white — so sections blend seamlessly with the site base.
- Weight target: hero video <3MB, images exported as SVG-traced or optimized webp <150KB each.

---

## 14. Hero title sequence — "Soldier to Rider" (6 scenes, match cuts)
One clip per prompt in Flow, ~3–4s each, 16:9. Save as `scene_1.mp4` … `scene_6.mp4` and I'll stitch + grade them into `hero_film.mp4`. The film runs ~18s then rests on the final looping shot.

### Shared style block — append to EVERY scene prompt
> STYLE: flat vector illustration animation, solid color fills, crisp shapes, no gradients, no painterly texture, no photorealism, stylized features only. Night palette: deep midnight teal #0C2B2E background, dark teal #124D52 shapes, thin warm gold #B38B4B rim-light outlining every figure, vermillion #B33114 only for flame/petals/flag. Camera locked unless stated. Slow, dignified motion. No text.

### Scene 1 — The boots (3s)
> Extreme closeup, ground level: a soldier's polished military boots standing at attention on dark parade ground, heels together. A single marigold petal lands beside them. The boots snap a quarter-step to attention. + STYLE

### Scene 2 — Match cut: the rider's boot (3s)
> Extreme closeup, same ground-level framing and angle as the soldier's boots shot: a motorcycle rider's boot presses down on a bike's gear pedal, the exhaust pipe glowing faint gold behind. The same marigold petal lies beside the boot. + STYLE

### Scene 3 — The eyes (3s)
> Closeup of a soldier's stylized eyes under a helmet brim, framed by darkness, thin gold rim light on the cheekbone. He blinks once, slowly. A tiny reflection of an eternal flame flickers in his eyes. + STYLE

### Scene 4 — Match cut: eyes in the visor (3s)
> Identical framing to the soldier's-eyes shot: a rider's stylized eyes inside an open motorcycle helmet visor, same gold rim light, same tiny eternal-flame reflection flickering in the eyes. + STYLE

### Scene 5 — The salute and the throttle (4s)
> Gesture shot in silhouette profile: a soldier's hand rises into a crisp salute — then a match-dissolve to a rider's gloved hand gripping and slowly rolling a motorcycle throttle at the same arm angle. Gold rim light on both. + STYLE

### Scene 6 — The promise (4s, THIS ONE LOOPS)
> Wide shot: dawn breaking. A convoy of motorcycle silhouettes rides from the darkness of night (left of frame, midnight teal) into warm dawn light (right of frame, cream sky #F7EEE2 and gold sun), the lead rider carrying a vermillion pennant. At far left, a soldier silhouette stands saluting the departing convoy, a small eternal flame at his feet. Constant convoy speed; last frame matches first for seamless looping. + STYLE

### Assembly notes (Claude handles when clips land)
- Hard cuts 1→2 and 3→4 — the match cuts do the storytelling. Soft 12-frame crossfade 2→3 and 4→5. Cut 5→6 on the throttle roll.
- Playback: scenes 1–5 play once on page load, then scene 6 loops forever (seamless two-video handoff).
- Keep total under 6MB: 1080p, webm + mp4 fallback, poster from scene 6.

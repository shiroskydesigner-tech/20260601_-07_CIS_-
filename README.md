# MIO7 · 澪柒 Design System

> **想喝的時候，就會想到** — **A L W A Y S O N Y O U R M I N D**
> 7 BASE TEA FORMULA · Kaohsiung · @mio7_tea

This design system codifies the visual + verbal identity of **MIO7** (澪柒), a Taiwanese specialty tea brand based in Kaohsiung. It is meant to power decks, packaging mocks, social posts, store-design comps, menu cards, and prototype interfaces — anywhere the brand needs to show up consistently.

---

## 1. Brand context

| Field | Detail |
|---|---|
| **Brand name (中)** | 澪柒 |
| **Brand name (EN)** | MIO7 |
| **Subtitle** | 7 BASE TEA FORMULA |
| **Slogan (中)** | 想喝的時候，就會想到 |
| **Slogan (EN)** | Always On Your Mind |
| **Origin city** | Kaohsiung (07 = the city's telephone area code) |
| **Social handle** | @mio7_tea |
| **Core audience** | Women centered around 25 years old (±5) |
| **Secondary audience** | 18–30 y.o. specialty-tea enthusiasts |
| **Visual style** | Light tech-feel × misty silver-purple × geometric minimal |
| **Material language** | Matte lacquer panels · grey-purple cement paint · brushed steel · cold-blue light strip |

**Etymology.** 「澪 (mio)」 means clear, flowing water — a continuous, pure stream — symbolising the brand's commitment to clean tea quality. 「柒 (qī)」 is the formal/ceremonial character for "seven," anchoring the **seven hand-picked base teas** that are the soul of the menu. **07** is also Kaohsiung's phone-area code, declaring the brand's local origin. **MIO** is also the Italian word for "mine" — every cup is yours alone.

**Logo concept.** The 0 + 7 mark pairs a **round, pillowy "0"** with an **angular, blade-cut "7"** — a deliberate **柔×剛 (soft × sharp) contrast** that mirrors the product: warm taste with crisp finish. Gestalt completion lets the viewer "fill in" the 07 reading. The brand deliberately drops saturation to step **out** of the high-chroma beverage market and into a **"misty tech" (霧霾系科技感)** lane with stronger appeal to a female, design-aware demographic.

---

## 2. Source materials

The original assets shipped with this project live in `uploads/` (ASCII-renamed copies of the user's Chinese-titled files). Cleaned-up, recoloured production versions live in `assets/`.

| Source file (in `uploads/`) | Type | What it contains |
|---|---|---|
| `brand_manual.pdf` | PDF · 8pp | Master colour swatches (HEX/CMYK/PANTONE), font specimen, auxiliary graphics |
| `brand_plan.pdf` | PDF · 6pp | Brand proposal — naming logic, palette, all 7 base teas, full product line, marketing positioning |
| `logo_1.svg` … `logo_4.svg` | SVG | Original logo lockups (uncoloured — see note below) |
| `manual_12.svg` … `manual_27.svg` | SVG | Auxiliary graphic elements from the brand manual (chevrons, fan compositions, "7" rhythms) |

> **Note on the original SVGs.** All vendor-supplied SVGs reference CSS classes (`cls-1`, `cls-2`) but ship with empty `<defs>` — so they appear black/transparent until re-styled. We have re-exported clean, brand-coloured versions into `assets/logos/` and `assets/graphics/`. **Use those.**

---

## 3. Repository index

```
/
├── README.md                ← this file
├── SKILL.md                 ← entry point if loaded as a Claude Skill
├── colors_and_type.css      ← all CSS tokens (colours, fonts, spacing, motion)
├── assets/
│   ├── logos/               ← brand marks (mark, lockup, light/dark)
│   └── graphics/            ← auxiliary geometric motifs (fans, chevrons)
├── ui_kits/                 ← (not built — see Caveats)
├── slides/                  ← (not built — see Caveats)
├── preview/                 ← HTML cards that populate the Design System tab
└── uploads/                 ← original source files from the brand team
```

---

## 4. Content fundamentals

The brand voice is **quiet, poetic, female-coded, and bilingual**. It almost never sells *at* the reader — instead it plants an image, a feeling, a memory. Copy is read aloud well; it is *cute* without being childish, *premium* without being snobby.

### 4.1 Tone — what it sounds like

* **Atmospheric over declarative.** The slogan is "想喝的時候，就會想到" — literally *"when you feel like a drink, you'll think of us."* It does NOT say *"the best tea in Kaohsiung."* The brand markets **presence in the customer's mind**, not product superiority. Mirror this: write about *moments*, not *features*.
* **Bilingual parity.** Every product, headline, and series name carries **both Mandarin and English**. The English is not a translation — it is a poetic re-imagining (例: 蜜境烏龍 → **HONEY DRIFT**, not "honey-fragrance oolong"). Both languages are first-class.
* **Sensory, almost cinematic.** Names invoke weather, light, and minerals: *初雪冬片 First Frost · 金萱霧語 Mist Oolong · 凍頂冷焰 Cold Flame · 鐵音玄境 Iron Echo*. Avoid ingredient-literal naming ("Honey Oolong"). Always reach for **mood**.
* **Pronoun stance — implicit "you".** The English slogan is *"Always On **Your** Mind."* Direct address, second-person — but soft, suggestive, never imperative. No "buy now," no "try our..."

### 4.2 Casing & typography habits

* **Wide-tracked Latin caps** for taglines and wordmarks: `A L W A Y S   O N   Y O U R   M I N D`, `M I O 7`. Letter-spacing ≥ `0.18em`; for true tagline display, `0.32em`.
* **Ceremonial CJK numerals** (壹貳參肆伍陸柒) replace 一二三四五六七 in series naming (澪·壹, 澪·貳…). This is intentional and ties to the formal/ritual register.
* **Sentence case in mixed copy.** When Mandarin and English co-occur, English is title or sentence case — never SHOUTY ALL CAPS except for the tagline/wordmark uses above.

### 4.3 Vocabulary cues — words to reach for / avoid

| ✅ Reach for | ❌ Avoid |
|---|---|
| 霧 (mist), 露 (dew), 冷 (cool), 韻 (lingering note), 境 (realm), 光 (light), 影 (shadow) | 超好喝, 必喝, 限時優惠, 大杯特價 |
| drift, echo, glow, haze, dawn, frost, velvet, silk | "the best," "amazing," "must-try," "ultimate" |
| 剛剛好 (just right), 純粹 (pure), 日常 (daily) | 「最」「第一」「唯一」 |

### 4.4 Emoji & punctuation

* **Emoji are not part of the brand.** The brand plan never uses them. If a social caption absolutely needs one, use a single restrained mark like ☁︎ or ✦ — and only on social, never in product UI.
* **Use the middle dot `·`** between series + numeral, and between bilingual pairs:
  *澪·壹 初雪冬片 · FIRST FROST*
* **Em dash `—`** for soft asides; avoid hyphen runs.

### 4.5 Sample copy (lifted directly)

> 純粹的好茶，剛剛好的比例，成為你日常裡最剛好的那一杯
> *Pure tea. Perfectly balanced. The just-right cup of your every day.*

> 澪·肆 蜜境烏龍 · HONEY DRIFT
> 天然蜜甜，茶韻柔軟，漂浮蜜夢

---

## 5. Visual foundations

### 5.1 Colour

Six brand colours, plus tonal extensions. **The system is intentionally low-saturation** — this is the single most important rule. Never substitute a bright purple or violet.

| Token | Hex | Pantone | Role |
|---|---|---|---|
| 霧銀紫 Misty Silver Purple | `#B8B4C6` | 5295 C | **PRIMARY** — main brand colour |
| 霧粉紫 Soft Lavender | `#E6D8E9` / `#D1BAD6` | 524 C | Gradient companion, secondary surface |
| 露白 Pure White | `#F6F7F9` | Cool Gray 1 C | Canvas / background |
| 冷光藍 Cool Blue | `#6BCFFF` | 2915 C | Accent — "cold-light" highlights, links, focus |
| 冷檸綠 Lime Green | `#D4FF6A` | 2297 C | **SEASONAL/LIMITED only** — never a permanent surface |
| 深灰 Deep Gray | `#3A3A3F` | Black 7 C | Body text |

**Backgrounds.** The brand canvas is almost always Pure White or the misty gradient `linear-gradient(135deg, #E6D8E9 → #B8B4C6 → #9A95AB)`. Full-bleed photographs are used when product shots are present, but always shot or graded toward the **cool, hazy, slightly desaturated** end. No warm tones, no grain heavier than 2%, never b&w.

**Gradients.** Three signature gradients live in `colors_and_type.css`:
* `--gradient-mist` — the workhorse hero gradient (lavender → silver-purple → cool gray)
* `--gradient-mist-soft` — vertical fade from white to lavender (for cards / sections)
* `--gradient-cool` — bridge to the cool-blue accent (use sparingly, on tech-leaning moments)

### 5.2 Type

| Role | Family | Substitute (in this system) |
|---|---|---|
| Latin display ("MIO7", "ALWAYS ON YOUR MIND") | **TeX Gyre Pagella** (per brand manual) | **Cormorant Garamond** *(shipped — local `.ttf` files in `/fonts`)* |
| CJK display + body (思源黑體) | **Source Han Sans TC** | **Source Han Sans TW · 思源黑體** *(shipped — self-hosted variable font `SourceHanSansTW-VF.ttf` in `/fonts`)* |
| CJK ceremonial (poetic naming on packaging) | n/a — added by us | **Source Han Sans TW** *(same family as body, tracking-ultra)* |
| Display alt — "Bow house" wordmark face | Bow house | **not substituted** — see Caveats |
| UI / body Latin | (not specified) | **Cormorant Garamond** *(per brand instruction — all English text is Cormorant; Inter retired)* |

> 🚩 **Substitution flags.**
> 1. **TeX Gyre Pagella → Cormorant Garamond.** Cormorant TTFs ship inside `/fonts/` and are loaded via `@font-face` in `colors_and_type.css`. If a Pagella license is supplied, drop the `.ttf` into `/fonts/` and update the `src:` lines.
> 2. **思源黑體 (Source Han Sans) — the active CJK face.** Per brand instruction the Chinese face is the **sans** (思源黑體), self-hosted from `SourceHanSansTW-VF.ttf` (variable, 300–900) in `/fonts`. Both `--font-cjk` and `--font-cjk-serif` resolve to it. No CDN substitute is loaded for CJK. (The Source Han **Serif** OTFs remain in `/fonts` as an archive, unreferenced by any token.)
> 3. **"Bow house" display font is not substituted** anywhere. It is only used inside the original logo lockup (which we keep as SVG outlines). If new display moments need it, please supply.
> 4. **Inter retired.** Per brand instruction ALL English/Latin text — display, headings, body, UI and captions — is set in **Cormorant Garamond**. The `--font-ui` token now resolves to the Cormorant stack and the Inter web-font import was removed.

### 5.3 Spacing & rhythm

4-pt base grid. Tokens `--space-1 … --space-10` from 4 → 128 px. The brand favours **generous whitespace** — packaging mocks and slides routinely sit with `--space-9` (96 px) margins. Density is a tell of the wrong direction.

### 5.4 Geometry & motifs

Three repeating motifs derived directly from the logo's `0 + 7` pair:

1. **The "7" wedge** — a right-triangle blade (vertical edge + diagonal hypotenuse). Used singly, or fanned in odd-numbered rows (5 / 7) as auxiliary graphics.
2. **The "0" capsule** — a vertical rounded rectangle / stadium shape (`border-radius: 999px` on a tall element). Used as the pairing partner.
3. **The "X" chevron** — two crossed lozenge blades (`assets/graphics/aux_chevron.svg`). Used as a section divider or pattern fill.

These are the brand's *only* shape vocabulary. **Do not introduce stars, sparkles, hearts, leaves, droplets, steam clouds, etc.** The tea is implied by name, never by drawn iconography.

### 5.5 Corners, borders, cards

| Element | Treatment |
|---|---|
| **Corner radii** | `2 / 6 / 12 / 20 / 32 / 999` (px). 12 px is the default card. Pills (999) are used for CTAs and chips, echoing the "0" capsule shape. |
| **Borders** | Hairline. `1px solid rgba(58,58,63,0.10)` — the brand never uses thick borders. |
| **Cards** | White or `--bg-elev-2` (lightest lavender). Hairline border + `--shadow-2` (soft, hazy). Never a hard drop-shadow. |
| **Hero blocks** | Either full-bleed gradient (`--gradient-mist`) with white text, or full-bleed white with the gradient appearing as a thin top stripe. |

### 5.6 Elevation & shadow

All shadows are **soft, low-opacity, slightly purple-tinted** — they mimic mist, not harsh light.

* `--shadow-1` — subtle press / hairline lift (1 px)
* `--shadow-2` — default card (6–16 px blur, 6% opacity)
* `--shadow-3` — modal / floating panel (18–40 px blur, purple tint)
* `--shadow-haze` — hero brand glow (30 px, 80 px blur in `#B8B4C6` @ 45%)
* `--shadow-glow-blue` — cool-blue ring used **only** on focus / "tech" moments

### 5.7 Motion

* **Easing — `--ease-soft`** (`cubic-bezier(0.32, 0.72, 0.27, 1)`) is the signature curve. It settles like mist — fast leave, slow arrive.
* **Durations.** `--dur-fast` 140 ms (hover), `--dur-base` 240 ms (state change), `--dur-slow` 420 ms (page transition), `--dur-amb` 900 ms (hero crossfade).
* **Bounces are off-brand.** No springiness, no overshoot. Everything glides.
* **Hover state.** Default: `opacity 0.85` and/or `color → --brand-deep`. Avoid lightening with white — the brand prefers *deepening* (lavender → purple → deeper purple).
* **Press state.** `transform: scale(0.985)` + `--shadow-1`. Never `scale(0.9)` — that's iOS-app energy, off-brand.

### 5.8 Transparency & blur

Frosted glass (`backdrop-filter: blur(20px)` over lavender at 70%) is a defining surface for **navigation, sticky headers, and modal scrims**. Use it deliberately — it should *feel* like looking through morning haze. Never blur over a busy photo.

### 5.9 Layout rules

* **Asymmetric, breathing layouts.** Big quote on the left, single product photo floating right. Not a 12-column packing puzzle.
* **One bold thing per screen.** A wordmark, a number, a tea name. Surround it with whitespace.
* **Sticky elements stay minimal** — a 56-px-tall navbar with frosted blur, nothing more.

---

## 6. Iconography

**MIO7 is an icon-light brand.** The original brand manual contains **no icon set** — the visual vocabulary is geometric (the "7" wedge, the "0" capsule, the "X" chevron) and that is the *entire* iconographic system.

**Implications.**
* **Do not use emoji** in product/menu copy. (Optional, single, restrained mark like ☁︎ ✦ is acceptable on social only.)
* **Do not draw a tea-leaf, steam-cloud, or coffee-cup icon** to "help" a menu item — this is exactly the high-chroma beverage trope the brand is positioned *against*.
* When functional icons are genuinely needed (cart, search, profile, close, arrow, plus, minus, location pin) — pull from **[Lucide](https://lucide.dev)** at **1.5 px stroke**, coloured `currentColor`. Lucide's quiet, geometric line feel pairs cleanly with the brand and does not introduce extra visual weight. Load from CDN:
  ```html
  <script src="https://unpkg.com/lucide@latest"></script>
  ```
  > 🚩 **Substitution flag.** Lucide is a default substitution — the brand has no codified icon set yet. If the team wants a custom icon family, this is the place to commission it.

* For **decorative graphics** (section dividers, packaging surfaces, ambient backgrounds), prefer the auxiliary brand graphics already in `assets/graphics/` — `seven_fan.svg`, `seven_diamond.svg`, `aux_chevron.svg`, `sevens_row.svg`, `zeroes_row.svg`. These are the brand's signature pattern language.

* Unicode "mid-dot" `·`, em-dash `—`, and Roman/CJK numerals are themselves typographic icons in this system — use them.

---

## 7. The 7 Base Teas (product reference)

For copy authenticity, here are the canonical names and English titles. Use exactly — these are confirmed final.

| # | 中文 | English | Tea |
|---|---|---|---|
| 澪·壹 | 初雪冬片 | FIRST FROST | 冬片四季春 |
| 澪·貳 | 金萱霧語 | MIST OOLONG | 茉莉金萱 |
| 澪·參 | 凍頂冷焰 | COLD FLAME | 凍頂烏龍 |
| 澪·肆 | 蜜境烏龍 | HONEY DRIFT | 蜜香烏龍 |
| 澪·伍 | 肯亞赤道 | EQUATOR RED | 肯亞紅茶 |
| 澪·陸 | 鐵音玄境 | IRON ECHO | 鐵觀音 |
| 澪·柒 | 桂香蕎語 | OSMANTHUS BUCKWHEAT | 桂花蕎麥茶 |

Full product-line names (fruit / milk-tea / classic milk-tea / cream-cap / toppings) live in `uploads/brand_plan.pdf` and are mirrored throughout the preview cards.

---

## 8. Caveats — things the next iteration should resolve

* **Bow house display font** is referenced in the brand manual but no file was supplied; we did not substitute. Please provide.
* **TeX Gyre Pagella / Cormorant Garamond** is the closest free substitute; ideally licensed Pagella files are dropped into `fonts/`.
* **No UI/digital product** is in scope yet — there is no app or marketing website in the source materials, only print/identity. We therefore did **not** build `ui_kits/` or `slides/` directories. If MIO7 needs (a) a website mock, (b) a delivery-app mock, (c) a deck template — say which and we'll build it as a follow-up using these foundations.
* **Photography direction** is described in words ("cool, hazy, low-saturation") but no reference photos are in the source. If the brand team can share even 3–5 reference frames, we can codify a photography styleguide card and grade rules.
* **Iconography** is purposely thin (the brand uses geometry, not icons) — Lucide is a working substitute for functional UI moments. A bespoke icon set is a real gap if MIO7 ever ships a digital product.


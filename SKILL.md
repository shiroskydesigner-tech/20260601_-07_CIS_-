---
name: mio7-design
description: Use this skill to generate well-branded interfaces and assets for MIO7 (澪柒) — a Taiwanese specialty tea brand from Kaohsiung — for production or throwaway prototypes/mocks. Contains essential design guidelines, colours (霧銀紫 misty silver-purple system), type (Cormorant Garamond + Noto Sans TC), brand assets, and motif vocabulary for prototyping menus, packaging, social posts, decks, and store-design comps.
user-invocable: true
---

# MIO7 · 澪柒 — Design Skill

Read `README.md` for the complete brand guide. Then explore the other files:

- `colors_and_type.css` — all design tokens (colours, fonts, spacing, motion, shadows). Import this in any HTML artefact.
- `assets/logos/` — brand marks. Use `logo_lockup.svg` (purple-on-white) by default; `logo_mark.svg` for compact marks; `logo_lockup_inverse.svg` on dark/mist surfaces.
- `assets/graphics/` — auxiliary geometric motifs (the "7" wedge fans, "0" capsule rows, "X" chevron). This is the brand's *entire* decorative vocabulary — do **not** invent new shapes.
- `preview/` — example HTML cards demonstrating type, colour, components, and brand motifs.
- `uploads/` — original source material (brand manual PDF, brand plan PDF, raw SVGs) for reference.

## When invoked

If creating **visual artefacts** (slides, mocks, packaging comps, social posts, throwaway prototypes), copy relevant assets out, link `colors_and_type.css`, and produce static HTML files for the user to view.

If working on **production code**, copy assets and adopt the rules in `README.md` to design with brand fidelity.

If the user invokes this skill without further guidance, ask what they want to build (menu, packaging, deck, website, social campaign?), confirm audience and language (zh / en / bilingual), then act as an expert designer who outputs HTML artefacts *or* production code.

## Non-negotiable rules (the brand "tells")

1. **Low saturation, always.** The brand's defining choice is *desaturation* — `#B8B4C6` misty silver-purple, never a bright violet. If a colour feels punchy, it's wrong.
2. **Bilingual parity.** Every product/headline carries Chinese **and** English. The English is a poetic re-imagining, not a translation.
3. **Mood over feature.** Name and describe with weather, light, minerals — never with literal ingredients. *"HONEY DRIFT"*, not *"Honey Oolong"*.
4. **Geometry, not iconography.** The "0" capsule, the "7" wedge, the "X" chevron. No tea leaves, no steam, no emoji in product copy.
5. **Wide letter-spacing on Latin caps** for taglines and the wordmark (`letter-spacing: 0.18em`–`0.32em`).
6. **Soft shadows, soft easing.** `--ease-soft` and shadows tinted with `#B8B4C6` — mist, not hard light.
7. **The 7 base teas are canon** — see the table in `README.md` §7. Use exact names.
8. **Slogan is "想喝的時候，就會想到 · Always On Your Mind."** Pair them when both fit.

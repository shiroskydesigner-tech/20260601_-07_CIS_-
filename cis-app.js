/* ──────────────────────────────────────────────────────────────
 * MIO7 · CIS Showcase Site · App
 * - Loads data.json
 * - Populates DOM
 * - Reveal animations (IntersectionObserver)
 * - Nav active state on scroll
 * - Click-to-copy color hex
 * ──────────────────────────────────────────────────────────── */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const el = (tag, props = {}, children = []) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class')      node.className = v;
    else if (k === 'html')  node.innerHTML = v;
    else if (k === 'text')  node.textContent = v;
    else if (k === 'data')  Object.entries(v).forEach(([dk, dv]) => node.dataset[dk] = dv);
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
    else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null) continue;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
};

const isLight = (hex) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luma > 0.6;
};

/* ── Data loader ───────────────────────────────────────────────── */
async function loadData() {
  try {
    const res = await fetch('data.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('[MIO7] Failed to load data.json:', err);
    document.body.innerHTML =
      '<div style="padding:48px;font-family:sans-serif;color:#3A3A3F;background:#E6D8E9;min-height:100vh">' +
      '<h1 style="margin-bottom:16px">無法載入 data.json</h1>' +
      '<p style="opacity:0.7">請使用本地伺服器啟動（如 <code>python -m http.server</code>），' +
      '或在 VSCode 用 Live Server 擴充啟動 — 瀏覽器直接開啟 file:// 會被 CORS 阻擋。</p>' +
      `<pre style="margin-top:24px;padding:16px;background:#FFFFFF;border-radius:8px">${err.message}</pre>` +
      '</div>';
    throw err;
  }
}

/* ── Renderers ─────────────────────────────────────────────────── */
function renderNav(data) {
  const navMenu = $('#navMenu');
  data.nav.forEach((item) => {
    const li = el('li', {}, [
      el('a', { class: 'nav__link', href: `#${item.id}` }, item.labelEn)
    ]);
    navMenu.appendChild(li);
  });

  $('#navMeta').textContent = data.brand.areaCode + ' · ' + data.brand.city;
}

function renderHero(data) {
  $('#heroCjk').textContent          = data.brand.nameZh;
  // Render wordmark with a span around the digit so we can force lining-nums + baseline lock.
  $('#heroWordmark').innerHTML       = data.brand.nameEn
    .split('')
    .map((c) => /\d/.test(c) ? `<span class="wm-num">${c}</span>` : c)
    .join(' ');
  $('#heroSubtitle').textContent     = data.brand.subtitle;
  $('#heroSloganZh').textContent     = data.brand.sloganZh;
  $('#heroSloganEn').textContent     = data.brand.sloganEn.split('').join(' ').replace(/   /g, '  ');
  $('#heroMetaLeft').textContent     = data.meta.version + ' · ' + data.meta.lastUpdated;
  $('#heroMetaRight').textContent    = data.brand.areaCode + ' · ' + data.brand.city.toUpperCase();
  $('#heroCredit').innerHTML         =
    data.brand.subtitle + '<br>' + data.brand.social;
}

function renderCore(data) {
  $('#coreLead').textContent =
    `「${data.brand.nameZh}」── 由三個漢字構成的詩。澪是水，柒是七，07 是高雄。每個字背後都是品牌氣質的一個切片。`;

  const grid = $('#storyGrid');
  data.story.forEach((s, i) => {
    // Latin/numeric chars (e.g. "07") render in Cormorant Garamond,
    // CJK chars (澪 / 柒) stay in 思源黑體.
    const isLatin = /^[\s\d\w]+$/.test(s.char);
    const charCls = 'story-card__char' + (isLatin ? ' story-card__char--latin' : '');
    const bigCls  = 'story-card__big-char' + (isLatin ? ' story-card__big-char--latin' : '');

    grid.appendChild(
      el('div', { class: 'reveal story-card', data: { delay: String(i + 1) } }, [
        el('div', { class: 'story-card__pinyin' }, s.pinyin),
        el('div', { class: charCls }, s.char),
        el('div', { class: 'story-card__subtitle' }, s.subtitleEn),
        el('div', { class: 'story-card__content' }, s.content),
        el('div', { class: bigCls }, s.char)
      ])
    );
  });

  // Logo concept
  $('#logoConceptTitle').textContent = data.logoConcept.title;
  $('#logoConceptDesc').textContent  = data.logoConcept.description;

  const principles = $('#logoPrinciples');
  data.logoConcept.principles.forEach((p) => {
    principles.appendChild(
      el('div', { class: 'dialogue__row' }, [
        el('div', { class: 'dialogue__char' }, p.title.match(/[一-龥]/)?.[0] || p.title[0]),
        el('div', {}, [
          el('div', { class: 'dialogue__name' }, p.subtitle),
          el('div', { class: 'dialogue__row-text' }, p.desc)
        ])
      ])
    );
  });

  // Logo Genesis · 設計來由
  renderLogoGenesis(data);

  // Logo variants — self-contained brand preview SVGs; minimal label below.
  const logoGrid = $('#logoGrid');
  data.logoVariants.forEach((v, i) => {
    logoGrid.appendChild(
      el('div', { class: 'reveal logo-card', data: { delay: String((i % 4) + 1) } }, [
        el('div', { class: `logo-card__display logo-card__display--${v.bg}` }, [
          el('img', { src: v.file, alt: v.nameEn })
        ]),
        el('div', { class: 'logo-card__info' }, [
          el('div', { class: 'logo-card__title-en' }, v.nameEn)
        ])
      ])
    );
  });

  // Aux graphics
  const auxRow = $('#auxRow');
  data.auxiliaryGraphics.forEach((g, i) => {
    auxRow.appendChild(
      el('div', { class: 'reveal aux-card', data: { delay: String((i % 5) + 1) } }, [
        el('div', { class: 'aux-card__shape' }, [
          el('img', { src: g.file, alt: g.nameEn })
        ]),
        el('div', { class: 'aux-card__name' }, g.name),
        el('div', { class: 'aux-card__name-en' }, g.nameEn),
        el('div', { class: 'aux-card__desc' }, g.desc)
      ])
    );
  });
}

/* ── Logo Genesis · 設計來由 ────────────────────────────────────
 * Renders the "Logo Genesis" subsection: overline + dual-language title,
 * 4-paragraph story, and a 4-cell grid of inline-SVG concept icons.
 * SVGs supplied by the brand owner (see /assets/graphics/genesis source files).
 */
function genesisSVG(key) {
  const open = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 353.12 241.48" aria-hidden="true">';
  const close = '</svg>';

  switch (key) {
    case 'zeros':
      // Circle outline + two "0" capsules (one solid, one 40% opacity)
      return open + `
        <circle cx="200.06" cy="120.74" r="75.77" fill="none" stroke="#d3c5cd" stroke-width="0.85" stroke-miterlimit="10"/>
        <path d="M200.73,52.32c-18.46-.42-33.57,17.33-33.57,38.51v63.2h.09c1.16,19.63,15.4,35.15,32.81,35.15s31.65-15.52,32.81-35.15h.09v-63.97c0-20.58-14.37-37.32-32.23-37.73Z" fill="#d3c5cd"/>
        <path d="M110.86,52.32c-18.46-.42-33.57,17.33-33.57,38.51v63.2h.09c1.16,19.63,15.4,35.15,32.81,35.15s31.65-15.52,32.81-35.15h.09v-63.97c0-20.58-14.37-37.32-32.23-37.73Z" fill="#d3c5cd" opacity="0.4"/>
      ` + close;

    case 'sevens':
      // Two "7" wedges (solid + 40% opacity) wrapped in an outlined 7
      return open + `
        <polygon points="178.12 58.9 243.91 58.9 178.12 195.57 178.12 58.9" fill="#d3c5cd"/>
        <polygon points="108.26 58.9 174.05 58.9 108.26 195.57 108.26 58.9" fill="#d3c5cd" opacity="0.4"/>
        <polygon points="178.12 195.57 194.92 195.57 265.56 45.92 178.12 45.92 178.12 195.57" fill="none" stroke="#d3c5cd" stroke-width="0.85" stroke-miterlimit="10"/>
      ` + close;

    case 'zero-smile':
      // "0" capsule + open mouth with tongue (brand-supplied)
      return open + `
        <path d="M109.81,58.8c-12.77-.27-23.23,10.92-23.23,24.28v77.45h.06c.8,12.38,10.66,22.16,22.7,22.16s21.9-9.78,22.7-22.16h.06v-77.94c0-12.98-9.94-23.53-22.3-23.78Z" fill="#d3c5cd"/>
        <line x1="109.34" y1="116.59" x2="109.34" y2="163.65" stroke="#ffffff" stroke-miterlimit="10"/>
        <path d="M265.75,92.17c-4.71,5.32-10.35,9.39-16.78,12.67l-.12,37.42c-.06,19.5-16.55,34.77-35.63,34.85-19.2.08-35.5-15.22-35.92-34.85l-.1-37.38c-6.3-3.25-12.04-7.34-16.74-12.63-1.07-1.21-1.16-2.74-.1-3.72,1.3-1.19,2.79-.72,3.9.53,3.67,4.16,8,7.55,12.92,10.23,22.59,12.28,50.17,12.13,72.59-.45,4.69-2.63,8.74-5.96,12.28-9.93.99-1.11,2.38-1.49,3.56-.53,1.1.89,1.32,2.46.14,3.8ZM215.52,113.27v37.47c-.09,1.53-1.28,2.43-2.6,2.37s-2.35-1.13-2.28-2.66v-37.17c-9.96-.37-19.42-2.43-28.51-6.13v34.51c.3,17.27,14.47,30.8,31.42,30.54,16.81-.25,30.56-14.01,30.5-31.17l-.03-33.86c-9.35,3.73-18.62,5.75-28.49,6.11Z" fill="#d3c5cd"/>
      ` + close;

    case 'seven-levels':
      // "7" triangle pyramid + 4 horizontal lines + 4 Level labels (light→dark)
      return open + `
        <polygon points="190.87 54.74 254.42 54.74 190.87 186.74 190.87 54.74" fill="#d3c5cd"/>
        <line x1="265.56" y1="153.98" x2="167.35" y2="153.98" stroke="#ffffff" stroke-miterlimit="10"/>
        <line x1="265.56" y1="117.51" x2="167.35" y2="117.51" stroke="#ffffff" stroke-miterlimit="10"/>
        <line x1="265.56" y1="81.04"  x2="167.35" y2="81.04"  stroke="#ffffff" stroke-miterlimit="10"/>
        <text x="102.47" y="73.42"  fill="#eee8ee" font-family="'Source Han Sans TW',sans-serif" font-size="25" font-weight="500">Level</text>
        <text x="102.47" y="108.13" fill="#dfd5e1" font-family="'Source Han Sans TW',sans-serif" font-size="25" font-weight="500">Level</text>
        <text x="102.47" y="142.84" fill="#cab6cf" font-family="'Source Han Sans TW',sans-serif" font-size="25" font-weight="500">Level</text>
        <text x="102.47" y="177.54" fill="#a385a9" font-family="'Source Han Sans TW',sans-serif" font-size="25" font-weight="500">Level</text>
      ` + close;

    default:
      return open + close;
  }
}

function renderLogoGenesis(data) {
  const root = $('#logoGenesis');
  if (!root || !data.logoGenesis) return;
  const g = data.logoGenesis;

  // overline + title block
  root.appendChild(
    el('div', { class: 'reveal genesis__header' }, [
      el('div', { class: 'genesis__overline' }, g.titleEn.toUpperCase() + ' · ' + g.title),
      el('h3',  { class: 'genesis__title' }, [
        document.createTextNode(g.subtitle + ' · '),
        el('em', {}, g.subtitleEn)
      ])
    ])
  );

  // story · 4 paragraphs
  const story = el('div', { class: 'reveal genesis__story', data: { delay: '1' } }, []);
  g.story.forEach((p) => story.appendChild(el('p', {}, p)));
  root.appendChild(story);

  // concept grid · 4 visual icons
  const grid = el('div', { class: 'genesis__grid' }, []);
  g.concepts.forEach((c, i) => {
    const card = el('div', {
      class: 'reveal genesis-card',
      data: { delay: String((i % 4) + 1) }
    }, [
      el('div', {
        class: 'genesis-card__icon',
        html: genesisSVG(c.key)
      }),
      el('div', { class: 'genesis-card__title' },    c.title),
      el('div', { class: 'genesis-card__subtitle' }, c.subtitleEn),
      el('p',   { class: 'genesis-card__desc' },     c.desc)
    ]);
    grid.appendChild(card);
  });
  root.appendChild(grid);
}


function renderSystem(data) {
  // Colors
  const colorGrid = $('#colorGrid');
  data.colors.forEach((c, i) => {
    const hexLabel = el('span', {
      class: 'color-card__hex',
      title: '點擊複製 · click to copy'
    }, c.hex);
    hexLabel.addEventListener('click', (ev) => {
      ev.stopPropagation();
      copyText(c.hex, hexLabel);
    });

    const card = el('div', { class: 'reveal color-card', data: { delay: String((i % 6) + 1) } }, [
      el('div', {
        class: 'color-card__chip',
        style: { background: c.hex }
      }, [
        el('span', { class: 'color-card__role' }, c.role),
        hexLabel
      ]),
      el('div', { class: 'color-card__info' }, [
        el('div', { class: 'color-card__name-zh' }, c.tokenZh),
        el('div', { class: 'color-card__name-en' }, c.tokenEn),
        el('div', { class: 'color-card__specs' }, [
          el('span', { data: { label: 'HEX' } }, c.hex),
          el('span', { data: { label: 'CMYK' } }, c.cmyk),
          el('span', { data: { label: 'PANTONE' } }, c.pantone)
        ]),
        el('div', { class: 'color-card__usage' }, c.usage)
      ])
    ]);
    colorGrid.appendChild(card);
  });

  // Tonal scale
  const tonalStrip = $('#tonalStrip');
  data.tonalScale.forEach((t) => {
    const dark = !isLight(t.hex);
    const cell = el('div', {
      class: 'tonal-strip__cell' + (dark ? ' tonal-strip__cell--dark' : '') + (t.tag ? ' tonal-strip__cell--mark' : ''),
      style: { background: t.hex },
      title: t.name + ' · ' + t.hex + (t.tag ? ' · ' + t.tag : '')
    }, t.hex);
    cell.addEventListener('click', () => copyText(t.hex, cell));
    tonalStrip.appendChild(cell);
  });

  // Gradients
  const gradGrid = $('#gradientGrid');
  data.gradients.forEach((g, i) => {
    gradGrid.appendChild(
      el('div', { class: 'reveal gradient-card', data: { delay: String((i % 4) + 1) } }, [
        el('div', {
          class: 'gradient-card__display',
          style: { background: g.css }
        }),
        el('div', { class: 'gradient-card__info' }, [
          el('div', { class: 'gradient-card__name' }, g.name),
          el('div', { class: 'gradient-card__name-en' }, g.nameEn),
          el('div', { class: 'gradient-card__usage' }, g.usage),
          el('div', { class: 'gradient-card__css' }, g.css)
        ])
      ])
    );
  });

  // Typography
  const t = data.typography;
  $('#latinSpecimen').textContent    = t.latin.specimen;
  $('#latinSpecimenSub').textContent = t.latin.specimenSub;
  $('#latinFamily').textContent      = t.latin.family;
  $('#latinFallback').textContent    = 'Fallback · ' + t.latin.fallback;
  $('#latinNote').textContent        = t.latin.note;
  const latinWeights = $('#latinWeights');
  t.latin.weights.forEach((w) =>
    latinWeights.appendChild(el('span', { class: 'type-card__weight' }, String(w)))
  );

  $('#cjkSpecimen').textContent    = t.cjk.specimen;
  $('#cjkSpecimenSub').textContent = t.cjk.specimenSub;
  $('#cjkFamily').textContent      = t.cjk.family;
  $('#cjkFallback').textContent    = 'Fallback · ' + t.cjk.fallback;
  $('#cjkNote').textContent        = t.cjk.note;
  const cjkWeights = $('#cjkWeights');
  t.cjk.weights.forEach((w) =>
    cjkWeights.appendChild(el('span', { class: 'type-card__weight' }, String(w)))
  );

  // Type scale
  const typeScaleList = $('#typeScaleList');
  data.typeScale.forEach((ts) => {
    typeScaleList.appendChild(
      el('div', { class: 'type-scale' }, [
        el('div', { class: 'type-scale__name' }, ts.name + ' · ' + ts.size),
        el('div', {
          class: 'type-scale__sample',
          style: { fontSize: ts.size }
        }, 'MIO7 澪柒'),
        el('div', { class: 'type-scale__usage' }, ts.usage)
      ])
    );
  });

  // Tracking
  const trackingDemo = $('#trackingDemo');
  data.tracking.forEach((tr) => {
    trackingDemo.appendChild(
      el('div', { class: 'reveal tracking-row' }, [
        el('div', { class: 'tracking-row__name' }, [
          tr.name,
          el('span', {}, tr.value)
        ]),
        el('div', {
          class: 'tracking-row__demo',
          style: { letterSpacing: tr.value }
        }, tr.demo),
        el('div', { class: 'tracking-row__usage' }, tr.usage)
      ])
    );
  });
}

function renderProduct(data) {
  const teaGrid = $('#teaGrid');
  data.teas.forEach((t, i) => {
    teaGrid.appendChild(
      el('div', { class: 'reveal tea-card', data: { delay: String((i % 4) + 1) } }, [
        el('div', { class: 'tea-card__no' }, t.no),
        el('div', { class: 'tea-card__series' }, '澪 · ' + t.no),
        el('div', { class: 'tea-card__name-zh' }, t.nameZh),
        el('div', { class: 'tea-card__name-en' }, t.nameEn),
        el('div', { class: 'tea-card__base' }, t.base),
        el('div', { class: 'tea-card__desc' }, t.desc),
        el('div', { class: 'tea-card__desc-en' }, t.descEn)
      ])
    );
  });
}

function renderResources(data) {
  // Resources downloads are pending — show a single placeholder card.
  // (Actual `data.resources` is preserved in data.json for when content is ready.)
  const grid = $('#resourceGrid');
  grid.appendChild(
    el('div', { class: 'reveal resource-placeholder', data: { delay: '1' } }, [
      el('div', { class: 'resource-placeholder__icon' }, '··'),
      el('div', { class: 'resource-placeholder__text' }, '等待更新中'),
      el('div', { class: 'resource-placeholder__text-en' }, 'COMING SOON')
    ])
  );
}

function renderFooter(data) {
  $('#footerTagline').textContent =
    data.brand.sloganEn.split('').join(' ').replace(/   /g, '  ');
  $('#footerZh').textContent      = data.brand.sloganZh;
  $('#footerMeta').innerHTML      =
    `<span>${data.brand.areaCode} · ${data.brand.city.toUpperCase()}</span>` +
    `<span>${data.brand.social}</span>` +
    `<span>${data.meta.version}</span>` +
    `<span>UPDATED ${data.meta.lastUpdated}</span>`;
}

/* ── Click-to-copy helper ──────────────────────────────────────── */
async function copyText(text, sourceEl) {
  try {
    await navigator.clipboard.writeText(text);
    const original = sourceEl.textContent;
    sourceEl.textContent = '已複製 ✓';
    sourceEl.style.background = 'rgba(107, 207, 255, 0.4)';
    setTimeout(() => {
      sourceEl.textContent = original;
      sourceEl.style.background = '';
    }, 1100);
  } catch (e) {
    console.warn('Clipboard write failed:', e);
  }
}

/* ── Reveal animations ─────────────────────────────────────────── */
function attachReveal() {
  if (!('IntersectionObserver' in window)) {
    $$('.reveal').forEach((n) => n.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  $$('.reveal').forEach((n) => io.observe(n));
}

/* ── Nav active state on scroll ────────────────────────────────── */
function attachNavScroll() {
  const links   = $$('.nav__link');
  const sections = links
    .map((l) => $(l.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || !sections.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((l) => {
            l.classList.toggle('is-active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-72px 0px -50% 0px' }
  );
  sections.forEach((s) => io.observe(s));
}

/* ── Hero parallax ─────────────────────────────────────────────────
 * Two layered effects on the first-screen hero, both rAF-throttled:
 *   1. Scroll: orbit mark drifts down + core fades/lifts as user scrolls
 *      past the viewport (slow 0.4x speed = anchored-but-moving depth).
 *   2. Pointer: orbit + core tilt a few px toward the cursor — gives the
 *      hero a "responsive depth" feel without disturbing the typography.
 * Respects prefers-reduced-motion. */
function attachHeroParallax() {
  const hero   = document.getElementById('hero');
  if (!hero) return;
  const orbit  = hero.querySelector('.hero__orbit');
  const core   = hero.querySelector('.hero__core');
  if (!orbit || !core) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let scrollY = 0, mouseX = 0, mouseY = 0, ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight || 1;
    // Scroll parallax — clamp so we only animate while hero is in view.
    const scrollProgress = Math.min(scrollY / vh, 1);
    const orbitScrollY = scrollY * 0.4;          // drifts with scroll
    const coreScrollY  = scrollY * 0.18;          // lifts faster
    const coreOpacity  = 1 - scrollProgress * 0.9;
    // Pointer parallax — mouseX/Y are normalized (-1 .. +1).
    const orbitX = mouseX * 18;
    const orbitY = mouseY * 12;
    const coreX  = mouseX * -8;
    const coreY  = mouseY * -5;
    // .hero__orbit is centered via translateY(-50%) in CSS — preserve it.
    const orbitTotalY = orbitScrollY + orbitY;
    orbit.style.transform = `translate3d(${orbitX}px, calc(-50% + ${orbitTotalY}px), 0)`;
    core.style.transform  = `translate3d(${coreX}px, ${-coreScrollY + coreY}px, 0)`;
    core.style.opacity    = coreOpacity.toFixed(3);
  };
  const request = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    if (scrollY > window.innerHeight * 1.2) return; // skip when hero off-screen
    request();
  }, { passive: true });

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    mouseX = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    mouseY = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    request();
  });

  hero.addEventListener('pointerleave', () => {
    mouseX = 0; mouseY = 0;
    request();
  });

  // Initial paint so transforms exist before first frame.
  update();
}

/* ── Boot ──────────────────────────────────────────────────────── */
async function boot() {
  const data = await loadData();

  // Update document meta
  document.title = data.meta.siteTitle;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', data.meta.siteDescription);

  renderNav(data);
  renderHero(data);
  renderCore(data);
  renderSystem(data);
  renderProduct(data);
  renderResources(data);
  renderFooter(data);

  // Wait one frame so DOM is laid out, then observe
  requestAnimationFrame(() => {
    attachReveal();
    attachNavScroll();
    attachHeroParallax();
  });
}

document.addEventListener('DOMContentLoaded', boot);

# packhelp-merch — Biblioteka snippetów

Gotowe, realne bloki HTML wycięte z istniejących stron (nie wymyślone od
nowa). Kopiuj stąd i adaptuj (podmień tekst/obrazki/linki) zamiast
rekonstruować markup z opisu w `PAGE_BUILDING_GUIDELINE.md` za każdym razem.
Numeracja sekcji odpowiada numeracji w guideline.

CSS dla wszystkich poniższych klas już istnieje w `components.css` — nie
kopiuj stylów, tylko strukturę HTML. Wszystkie zdjęcia poniżej to przykłady
realnych ścieżek — podmień na właściwy plik pod `assets/`, nigdy nie zostawiaj
cudzej ścieżki.

---

## 3. Atomy

### Przyciski
```html
<a href="shop.html" class="btn btn--stroke"><span>Shop all</span></a>
<a href="contact.html" class="btn btn--dark"><span>Get a demo</span></a>
<a href="shop.html" class="btn btn--white"><span>Browse Catalog</span></a>
<a href="contact.html" class="btn btn--outline-white"><span>Contact Sales</span></a>
<button type="button" class="btn btn--stroke btn--sm btn--circle">EN</button>
```
`<span>` wewnątrz zawsze — ma `transform: translateY(-1px)` do optycznego
wyrównania mono-fontu. Hover każdego wariantu leci automatycznie w coral
(pkt 2.1 guideline), nie dodawaj własnego `:hover`.

### `.section-head` (pkt 4 guideline)
```html
<div class="section-head">
  <div class="section-head__text">
    <h2 class="section-heading">Who we are</h2>
    <p class="section-subheading">We started because ordering merch was a headache. Today we handle it end to end.</p>
    <a href="shop.html" class="btn btn--stroke"><span>Shop all</span></a>
  </div>
</div>
```
Wariant wyśrodkowany (`.section--sales-touch .section-head`) i wariant z
logo (`.section--cta .section-head`, patrz snippet footer-cta niżej) dostają
tę klasę na rodzicu — nie duplikuj CSS, tylko dodaj klasę kontekstową na
`<section>`.

### `.category-grid` + `.carousel-progress` (pkt 1.3 guideline)
```html
<section class="section">
  <div class="section-head">...</div>

  <div class="category-grid">
    <div class="category-grid__track">
      <a href="shop.html?category=packaging" class="category-card">
        <div class="category-card__media">
          <div class="category-card__img" style="background-image: url('assets/photos/best-sellers/packaging.jpg');"></div>
        </div>
        <div class="category-card__body">
          <h3 class="category-card__title">Packaging</h3>
        </div>
      </a>
      <!-- kolejne .category-card -->
    </div>
  </div>

  <div class="carousel-progress">
    <div class="carousel-progress__arrows">
      <button type="button" class="carousel-arrow" data-dir="-1" aria-label="Previous X">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M15 6l-6 6 6 6"/></svg>
      </button>
      <button type="button" class="carousel-arrow" data-dir="1" aria-label="Next X">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 6l6 6-6 6"/></svg>
      </button>
    </div>
    <div class="carousel-progress__track"><div class="carousel-progress__bar"></div></div>
  </div>
</section>
```
`.carousel-progress` **musi** być bezpośrednim `nextElementSibling` gridu —
`carousel.js` znajduje pasek dokładnie tak.

### `.category-card` wariant "produkt" (contain + swatches + hover-info)
Użyj gdy karta reprezentuje kupowalny produkt (best-sellers, katalog PDP
recs) — patrz pkt 1.2 guideline dla `cover` vs `contain`.
```html
<a href="product.html" class="category-card" data-default-img="assets/photos/shop/clothes/Product.avif">
  <div class="category-card__media">
    <div class="category-card__hover-info">Min. 30 pieces &middot; 9 Days</div>
    <div class="category-card__img" style="background-image: url('assets/photos/shop/clothes/Product.avif');"></div>
  </div>
  <div class="category-card__body">
    <h3 class="category-card__title">Product Name</h3>
    <span class="category-card__price">From &euro;20,40</span>
    <div class="category-card__swatches">
      <span role="button" tabindex="0" class="swatch is-active" style="background-image: url('assets/photos/shop/clothes/Product.avif');" data-img="assets/photos/shop/clothes/Product.avif" aria-label="Black"></span>
      <span role="button" tabindex="0" class="swatch" style="background-image: url('assets/photos/shop/clothes/Product-Navy.avif');" data-img="assets/photos/shop/clothes/Product-Navy.avif" aria-label="Navy"></span>
    </div>
  </div>
</a>
```
`data-default-img` na `.category-card` jest wymagany, jeśli karta ma
`.category-card__swatches` (do powrotu po `mouseleave`, patrz `swatches.js`).
`.category-card__hover-info` (MOQ/lead-time) jest opcjonalny — używany na
shopie, pomijany na homepage.

W siatce filtrowanej (`#shopCategoryDetail`, `.product-grid--catalog`)
każda karta dostaje dodatkowo `data-category="packaging"` do filtrowania.

### `.filter-pills` + kategoryzowany grid (pkt 3.2 guideline)
```html
<div class="filter-pills">
  <button type="button" class="pill-filter js-category-filter is-active" data-filter="clothing"><span>Clothing</span></button>
  <button type="button" class="pill-filter js-category-filter" data-filter="packaging"><span>Packaging</span></button>
  <!-- kolejne kategorie -->
</div>
<div class="newin-groups">
  <div class="newin-grid" data-category="clothing">
    <a href="product.html" class="newin-card">
      <div class="newin-card__media">
        <div class="newin-card__img" style="background-image: url('assets/photos/newin/hero-shot.jpg');"></div>
        <div class="newin-card__thumb" style="background-image: url('assets/photos/shop/clothes/product-cutout.avif');"></div>
      </div>
      <p class="newin-card__title">Product Name</p>
    </a>
  </div>
  <!-- kolejne .newin-grid per kategoria -->
</div>
<a href="shop.html?category=clothing" class="btn-show-all"><span>Show all clothing</span></a>
```
`.newin-card__img` (pełne lifestyle-zdjęcie) jest opcjonalny — jeśli go nie
ma, `.newin-card__thumb` (mały cutout w rogu) renderuje się samodzielnie na
szarym tle karty. Dokładnie jeden `.newin-grid` ma `is-active` naraz,
sterowane przez `filters.js` na bazie aktywnej pigułki.

### `.shop-filter` dropdown (kosmetyczny, pkt 3.2 guideline)
```html
<div class="shop-filter-row">
  <div class="shop-filter" id="filterColor">
    <button type="button" class="shop-filter__toggle" aria-expanded="false">
      <span>Color</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </button>
    <div class="shop-filter__panel">
      <label class="shop-filter__option"><input type="checkbox"><span>Black</span></label>
      <!-- kolejne opcje -->
    </div>
  </div>
</div>
<div class="active-filters" id="activeFilters" hidden></div>
```

---

## 4. Nagłówek sekcji z logo (footer-cta, jedyny wariant tego typu)
```html
<section class="section section--cta">
  <div class="section-head">
    <div class="section-head__text">
      <h2 class="section-heading">Get in touch</h2>
      <p class="section-subheading">Tell us what you need. Free designs and a full quote within 24 hours.</p>
      <a href="contact.html" class="btn btn--stroke"><span>Contact us</span></a>
    </div>
    <div class="section-head__logo">
      <img src="assets/logo.svg" alt="Merch Stories" class="logo-mark">
      <p class="section-head__credit">Brought to you by <img src="assets/logo-packhelp-black.svg" alt="Packhelp" class="section-head__credit-logo"></p>
    </div>
  </div>
</section>
```
To jest cała treść `src/partials/footer-cta.html` — nie duplikuj, tylko
`<!--#include file="footer-cta.html" -->`.

---

## 5.3 Wpis kategorii na shopie — dwa miejsca naraz

**Overview (`#shopOverview`):**
```html
<section class="section shop-cat-section">
  <div class="section-head">
    <div class="section-head__text">
      <h2 class="section-heading">Drinkware</h2>
      <p class="section-subheading">Bottles, tumblers and mugs your team reaches for every day.</p>
      <a href="shop.html?category=drinkware" class="btn btn--stroke"><span>Shop drinkware</span></a>
    </div>
  </div>
  <div class="category-grid">
    <div class="category-grid__track">
      <!-- .category-card wariant "produkt", patrz wyżej -->
    </div>
  </div>
  <div class="carousel-progress">...</div>
</section>
```

**Detail (`#shopCategoryDetail`, `.product-grid--catalog`):**
```html
<a href="product.html" class="category-card" data-category="drinkware">
  <div class="category-card__media">
    <div class="category-card__hover-info">Min. 30 pieces &middot; 12 Days</div>
    <div class="category-card__img" style="background-image: url('assets/photos/shop/drinkware/product.avif');"></div>
  </div>
  <div class="category-card__body"><h3 class="category-card__title">Custom Ceramic Tumbler 330ml</h3><span class="category-card__price">From &euro;10,50</span></div>
</a>
```

**I trzeci wpis w `.shop-cats` (ikony na górze strony):**
```html
<a href="#" class="category-card js-category-filter" data-filter="drinkware">
  <div class="category-card__media"><div class="category-card__img" style="background-image: url('assets/photos/shop/drinkware/hero.avif');"></div></div>
  <div class="category-card__body"><h3 class="category-card__title">Drinkware</h3></div>
</a>
```
Plus wpis w mega-menu nawigacji (`nav-header.html`) — patrz `CLAUDE.md`,
lista trzech/czterech miejsc do synchronizacji.

---

## 5.4 PDP — buy box i quantity-dropdown

```html
<aside class="pdp__buy">
  <p class="pdp__breadcrumb"><a href="shop.html?category=clothing">Clothing</a> / <span>Hoodies</span></p>
  <div class="pdp__title-row"><h1 class="pdp__title">Custom Women Organic Cotton Hoodie</h1></div>

  <div class="pdp__promo">
    <p class="pdp__promo-text"><span id="pdpPromoText">Short marketing sentence…</span> <button type="button" class="pdp__promo-toggle" id="pdpPromoToggle" aria-expanded="false">Read more</button></p>
  </div>

  <p class="pdp__field-label">Colour</p>
  <div class="pdp__swatches" id="pdpSwatches">
    <button type="button" class="swatch is-active" style="background-image: url('assets/photos/shop/clothes/Product-Black.avif');" data-img="assets/photos/shop/clothes/Product-Black.avif" data-color="Black" aria-label="Black"></button>
  </div>
  <div class="pdp__swatch-label" id="pdpSwatchLabel">Black</div>

  <p class="pdp__field-label">Size</p>
  <div class="pdp__sizes">
    <button type="button" class="pdp__size is-active" data-size="M"><span>M</span></button>
  </div>

  <p class="pdp__field-label">Quantity</p>
  <div class="pdp__qty" id="pdpQty">
    <button type="button" class="pdp__qty-toggle" id="pdpQtyToggle" aria-haspopup="listbox" aria-expanded="false" aria-controls="pdpQtyPanel">
      <span class="pdp__qty-toggle-qty">100 pieces</span>
      <span class="pdp__qty-toggle-total">$2,150.00</span>
      <svg class="pdp__qty-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </button>
    <div class="pdp__qty-panel" id="pdpQtyPanel" role="listbox">
      <button type="button" class="pdp__qty-tier is-active" role="option" aria-selected="true" data-qty="100">
        <span class="pdp__qty-tier-qty">100</span>
        <span class="pdp__qty-tier-unit">$21.50/piece</span>
        <span class="pdp__qty-tier-total">$2,150.00</span>
      </button>
      <!-- kolejne progi -->
    </div>
  </div>

  <button type="button" class="btn btn--dark pdp__cta js-open-quote"><span>Add to list</span></button>
</aside>
```
`.js-open-quote` na dowolnym przycisku otwiera globalny quote-drawer
(`quote-drawer.js`) — użyj tej klasy zamiast pisać własny handler.

### PDP — bundle variant (`.pdp-bundle-list`, wzorzec: `bundle-day-one-kit.html`)

Dla Bundle/Sets produktów zamień blok Colour/Size/Quantity (pkt wyżej) na
listę zawartości zestawu — zachowaj breadcrumb/H1/promo/CTA bez zmian:
```html
<p class="pdp__field-label">What&rsquo;s inside</p>
<div class="pdp-bundle-list">
  <div class="pdp-bundle-item">
    <div class="pdp-bundle-item__thumb" style="background-image: url('assets/photos/shop/tech/Product.avif');"></div>
    <div class="pdp-bundle-item__body">
      <p class="pdp-bundle-item__name">Custom Magnetic Powerbank 5000mAh 20W</p>
      <p class="pdp-bundle-item__meta">6.3 x 1.4 x 9.3 cm</p>
      <p class="pdp-bundle-item__meta">5 pieces</p>
    </div>
    <button type="button" class="btn btn--stroke btn--sm pdp-bundle-item__edit"><span>Edit</span></button>
  </div>
  <!-- kolejne pozycje zestawu -->
</div>
<button type="button" class="btn btn--dark pdp__cta js-open-quote"><span>Add to list</span></button>
```
Nie dodawaj przy tym `.pdp__qty` (progi cenowe per sztuka nie mają sensu przy
mieszanych ilościach na pozycję) — jeśli produkt naprawdę potrzebuje jednej
wspólnej ceny/ilości na cały bundle, to osobna decyzja, dopytaj zanim
wymyślisz liczby. Trzecią zakładkę info-tabs (domyślnie "Size chart") zamień
na "What's inside" z tą samą tabelą `.pdp__spec-table` (kolumny
Product/Dimensions/Quantity) — patrz PDP info tabs niżej.

### Bundle item "Edit" drawer (`item-edit-drawer.html` + `item-edit-drawer.js`, wzorzec: dowolna strona `bundle-*.html`)

Klik `.pdp-bundle-item__edit` otwiera drawer (ten sam shell co
`.quote-drawer`/`.quote-drawer-overlay` — nowe ID `itemEditDrawer`/
`itemEditOverlay`, nie kolidują z globalnym quote-drawerem z nav-header) z
polami **złożonymi wyłącznie z komponentów PDP**: `.pdp__title`,
`.pdp__promo-text` (opis), `.pdp__qty`/`.pdp__qty-tier` (ilość + cena/szt.,
ten sam mechanizm co na PDP), oraz albo `.pdp__qty-toggle`-wygląd jako
statyczny odczyt "Size (external)" (wymiary w cm), albo — dla apparel —
prawdziwy `.pdp__sizes` (XS–XL) + `.pdp__swatches`/`.pdp__swatch-label`
(kolor), **tylko gdy dany produkt ma realne, sfotografowane warianty
kolorystyczne** (np. `Custom Unisex Oversized Organic Cotton Sweatshirt`) —
real-data-only, nigdy nie zmyślaj swatchy dla produktu z jednym zdjęciem.

Dane per pozycja siedzą jako `data-*` na `.pdp-bundle-item` (patrz pkt "PDP
— bundle variant" wyżej): `data-desc` (string), `data-tiers` (JSON
`[{"qty":N,"unit":X.XX,"total":Y.YY}, …]`), opcjonalnie `data-colors` (JSON
`[{"name":"…","img":"…"}, …]`) — apparel bez `data-colors` dostaje mimo to
`.pdp__sizes` (wykrywane po tym, że pierwsza linia `.pdp-bundle-item__meta`
zaczyna się od "Unisex", nie po osobnym atrybucie). `item-edit-drawer.js`
czyta te atrybuty przy każdym kliknięciu Edit i renderuje pola od zera —
jedna instancja drawera na stronę, nie per-item.

Include `<!--#include file="item-edit-drawer.html" -->` zaraz po
`nav-header.html` i `<script src="item-edit-drawer.js"></script>` obok
`pdp.js` — tylko na stronach `bundle-*.html`, nie na `product.html`/innych
(tam nie ma `.pdp-bundle-item__edit` do podpięcia).

### PDP info tabs
```html
<section class="pdp__info">
  <div class="pdp__info-nav">
    <button type="button" class="pdp__info-tab is-active" data-tab="specification">Specification</button>
    <button type="button" class="pdp__info-tab" data-tab="description">Product description</button>
    <button type="button" class="pdp__info-tab" data-tab="sizechart">Size chart</button>
  </div>
  <div class="pdp__info-content">
    <div class="pdp__info-panel is-active" data-panel="specification">
      <div class="pdp__info-row">
        <div class="pdp__info-row-label">Material</div>
        <div class="pdp__info-row-text">Organic cotton</div>
      </div>
      <!-- kolejne wiersze label/value -->
    </div>
    <div class="pdp__info-panel" data-panel="description">
      <div class="pdp__info-row">
        <div class="pdp__info-row-label">A heavier, brushed-back fleece</div>
        <div class="pdp__info-row-text">Pełne zdanie/akapit opisowy, Lora-owy ton, patrz VOICE_GUIDELINE.md.</div>
      </div>
    </div>
    <div class="pdp__info-panel" data-panel="sizechart">
      <table class="pdp__spec-table pdp__spec-table--sizes">
        <caption class="visually-hidden">Size chart, measurements in centimetres</caption>
        <thead><tr class="pdp__spec-row"><th scope="col">Size</th><th scope="col">Chest width</th></tr></thead>
        <tbody><tr class="pdp__spec-row"><th scope="row">M</th><td>60 cm</td></tr></tbody>
      </table>
    </div>
  </div>
</section>
```

---

## 5.5 Platform — feature naprzemienny + scroll-reveal + FAQ

```html
<section class="platform-feature">
  <div class="platform-feature__media">
    <div class="ph platform-color-2"></div>
  </div>
  <div class="platform-feature__inner">
    <p class="platform-feature__tag">Stock &amp; warehouse</p>
    <h3 class="platform-feature__title">Stock levels you don&rsquo;t have to ask for</h3>
    <p class="platform-feature__desc">Jedno-dwa zdania opisu funkcji.</p>
    <div class="platform-feature__qa">
      <div class="platform-feature__qa-row">
        <p class="platform-feature__qa-label">Krótki nagłówek pytania</p>
        <p class="platform-feature__qa-desc">Odpowiedź, jedno zdanie.</p>
      </div>
    </div>
  </div>
</section>

<section class="platform-reveal">
  <div class="platform-reveal__item">
    <p class="platform-reveal__eyebrow">The platform difference</p>
    <div class="platform-reveal__text-wrap">
      <p class="platform-reveal__text" data-reveal>Krótki, cytatopodobny akapit 2-4 zdania, który ma się "wypełniać" podczas scrolla.</p>
    </div>
  </div>
</section>

<section class="platform-faq">
  <div class="section-head"><div class="section-head__text"><h2 class="section-subheading">FAQ</h2></div></div>
  <div class="platform-faq__list">
    <details class="platform-faq__item">
      <summary class="platform-faq__question">Pytanie klienta?</summary>
      <p class="platform-faq__answer">Odpowiedź.</p>
    </details>
  </div>
</section>
```
`data-reveal` jest wymagany na `.platform-reveal__text` — bez niego
`platform-reveal.js` pominie element (nie zrobi nic, bez błędu). FAQ na tej
stronie używa natywnego `<h2 class="section-subheading">` bez
`.section-heading`/badge nad nim — to świadomy, uproszczony wariant
nagłówka sekcji tylko dla FAQ.

---

## 5.6 How it works — krok z opcjonalnym zdjęciem
```html
<ol class="hiw__questions">
  <li class="hiw__q">
    <span class="hiw__q-num">1</span>
    <h2 class="hiw__q-title">Browse and send a quote request</h2>
    <div class="hiw__q-media" style="background-image: url('assets/photos/how-it-works/step1.jpg');"></div>
    <p class="hiw__q-desc">Pick the products that fit your brand, set rough quantities, and send it over.</p>
  </li>
  <li class="hiw__q">
    <span class="hiw__q-num">2</span>
    <h2 class="hiw__q-title">Get free mockups and a quote</h2>
    <p class="hiw__q-desc">Krok bez zdjęcia — to jest OK, patrz guideline pkt 5.6.</p>
  </li>
</ol>
```
Kolejność `.hiw__q-media` w markupie zmienia się między krokami (raz zaraz
po tytule, raz na końcu przed opisem) — to celowe, nie literówka, patrz
guideline.

---

## 5.7 Formularz kontaktowy — pola i submit
```html
<div class="contact-form-page">
  <div class="contact-form-page__head">
    <h1 class="contact-form-page__title">Get in touch</h1>
    <p class="contact-form-page__subtitle">Tell us about your project. Free designs and a full quote within 24 hours.</p>
  </div>
  <form class="contact-form" id="contactForm">
    <div class="contact-form__field">
      <label for="cfName">Name <span class="contact-form__required">*</span></label>
      <input id="cfName" name="name" type="text" placeholder="Name" required>
    </div>
    <div class="contact-form__field">
      <label for="cfProjectType">Project type</label>
      <select id="cfProjectType" name="project_type">
        <option value="" disabled selected>Select&hellip;</option>
        <option>New merch drop</option>
      </select>
    </div>
    <div class="contact-form__field">
      <label for="cfMessage">What can we help you with?</label>
      <textarea id="cfMessage" name="message" rows="5" placeholder="Let us know what we can do for you."></textarea>
    </div>
    <div class="contact-form__field">
      <label for="cfFile">File upload</label>
      <label class="contact-form__upload" for="cfFile">
        <input id="cfFile" name="file" type="file" class="visually-hidden">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>
        <span>Click to upload or drag and drop. Max 25&nbsp;MB.</span>
      </label>
    </div>
    <button type="submit" class="contact-form__submit">Submit</button>
  </form>
</div>
```

---

## Include'y strony — szkielet nowej podstrony

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nazwa strony &mdash; Merch Stories</title>
<meta name="description" content="Jedno zdanie meta-opisu.">
<!--#include file="head-links.html" -->
</head>
<body>

<!--#include file="password-gate.html" -->

<div id="siteContent" style="display:none;">

<!--#include file="nav-header.html" -->

<main>

<!-- treść strony -->

<!--#include file="footer-cta.html" -->

</main>

<!--#include file="font-settings.html" -->
<script src="font-toggle.js"></script>
<script src="quote-drawer.js"></script>
<script src="nav-megamenu.js"></script>
<script src="mobile-nav.js"></script>
<script src="country-modal.js"></script>
<!-- + skrypty specyficzne dla treści strony (carousel.js/swatches.js/filters.js/...) -->

</div>

<script src="password-gate.js"></script>
</body>
</html>
```
Zapisz jako `src/pages/nazwa-strony.html`, potem `node build.js` — patrz
`CLAUDE.md`. Kolejność skryptów na dole kopiuj z najbliższej istniejącej
strony o podobnej zawartości (np. `contact.html` dla prostej strony,
`index.html` dla strony z karuzelami).

# merchstories — Guideline budowania stron

Ten dokument opisuje, jakich sekcji i komponentów używać, w jakim kontekście,
jak je ze sobą parować i jakie odstępy stosować między nimi. Powstał na
podstawie analizy `index.html` (strona główna), `shop.html` (katalog/shop),
`product.html` (PDP), `platform.html` (strona produktowa o platformie),
`contact.html` (formularz) i `how-it-works.html` (prosta strona treściowa).

Cel: żeby przyszłe strony/sekcje można było opisywać słownie ("zrób mi hero +
sekcję z karuzelą kategorii + dużym video-cta na końcu"), a decyzje o tym,
jakiego komponentu użyć, jakiego wariantu przycisku, jakiego odstępu —
podejmowały się na podstawie tego dokumentu, a nie od nowa za każdym razem.

Fundamenty architektury (`build.js`, `src/pages`+`src/partials`, dlaczego CSS
jest w jednym pliku) są opisane w [`CLAUDE.md`](CLAUDE.md) — tu skupiam się na
warstwie wyżej: **kiedy używać czego**. Dla gotowego markupu do kopiowania
patrz [`COMPONENT_SNIPPETS.md`](COMPONENT_SNIPPETS.md) — numeracja sekcji tam
odpowiada numeracji tutaj. Dla tonu tekstu patrz
[`VOICE_GUIDELINE.md`](VOICE_GUIDELINE.md).

---

## 1. Fundamenty, które trzeba znać

- **Kontener:** `.container { max-width: 1600px (--max-w); margin-inline: auto;
  padding-inline: var(--space-6); }`. Większość sekcji layoutowana jest
  bezpośrednio na `padding-inline: var(--space-6)` bez klasy `.container` —
  to nie jest bug, tak wygląda cały styl strony (patrz pkt 1.1).
- **Skala odstępów** (`--space-*`, grid 8px, wyjątek 2px/4px na dole skali):
  `1`=4px, `2`=8px, `4`=16px, `6`=24px, `8`=32px, `10`=40px, `12`=48px,
  `16`=64px, `20`=80px, `24`=96px. **Nie ma** `--space-3/5/7/9/11/14` —
  to inna, rzadsza skala niż w packhelp-redesign (tam co 4px). Nigdy nie
  wpisuj wartości spoza tej listy.
- **Promienie — dużo skromniejszy zestaw niż w redesignie:** `--radius-sm`
  (8px, inputy/pola formularza/dropdowny), `--radius-md` (16px, karty typu
  `.font-settings__panel`/`.pdp__qty-panel`), `--radius-full` (pigułka —
  przyciski, pill-filtry, avatary/flagi). **Nie ma** `lg/xl/2xl` — obrazki i
  duże panele (`.category-card__media`, `.pdp__stage`, `.platform-hero__media
  .ph`) są celowo **ostro cięte, bez zaokrąglenia**. To jedna z głównych
  różnic wizualnych vs. packhelp-redesign: tam "prawie zero ostrych rogów",
  tu odwrotnie — zdjęcia/karty produktowe są prostokątne, promień pojawia się
  tylko na kontrolkach UI (przyciski, inputy, dropdowny, awatary).
- **Breakpointy używane konsekwentnie w całym projekcie:** `560px` (grid
  produktowy 4→2 kolumny), `700px` (sekcje dwukolumnowe → jedna kolumna,
  `.platform-stats__row`/`.platform-split`), `900px` (grid 8→4 kolumny,
  karuzele → poziomy scroll, nav collapse zaczyna się poniżej), `1180px`
  (pełna nawigacja z linkami/megamenu pojawia się dopiero od tej szerokości
  w górę — poniżej zawsze hamburger, niezależnie od typu strony).
- **Fonty — dwie różne role, patrz `CLAUDE.md`:** Lora (`--font-base`) na
  nagłówki i running text, IBM Plex Mono (`--font-mono`) na cały UI-chrome
  (przyciski, nav, ceny, etykiety, eyebrow, breadcrumby). Tekst w mono jest
  prawie zawsze `letter-spacing` ujemny (-0.01/-0.02em) przy dużych
  rozmiarach albo dodatni + uppercase przy małych "etykietowych" (eyebrow,
  `.section-heading`, `.utility-bar__links`).

### 1.1 Brak "kart z zaokrąglonymi rogami" — siatka z 1px szwem (hairline grid)

Powtarzający się wzorzec siatki w całym projekcie: elementy grida stykają się
ze sobą przez **`gap: 1px`** na jasnoszarym/białym tle strony, więc widać
cienką 1px linię-szew między kartami zamiast realnego odstępu i cienia. Użyte
w: `.category-grid__track`, `.bundles-grid`, `.newin-grid`,
`.product-grid`/`--catalog`, `.platform-tools__grid`. **Kiedy używać:**
domyślny wybór dla dowolnej siatki kart produktowych/kategorii — to jest
"podpis" wizualny sklepu, nie wyjątek. **Kiedy NIE używać:** siatki
niezwiązane z katalogiem (np. `.testimonial-grid`, `.hiw__questions`) mają
realny `gap` ze skali spacingu (`--space-6`/`--space-8`), bo to nie są
"półki produktowe".

### 1.2 Dwa style fotografii — cover (lifestyle) vs. contain (cutout produktowy)

Nie miksuj tych dwóch stylów w tej samej siatce:
- **`background-size: cover`** (domyślne `.category-card__img`,
  `.newin-card__img`) — pełnokadrowe zdjęcie lifestyle'owe/kategorii,
  wypełnia cały kafel. Używane tam, gdzie karta reprezentuje **kategorię
  albo edytorialny wybór** (Who we are, Bundles, New in hero-shot).
- **`background-size: contain` + `padding: 12.5–15%` na `.category-card__media`**
  (`.section--bestsellers`, `.pdp__recs`, `.product-grid--catalog`,
  `.shop-cat-section .category-card__media`) — produkt "wycięty" na
  jednolitym tle, wyśrodkowany z marginesem. Używane tam, gdzie karta
  reprezentuje **konkretny, kupowalny produkt** (best-sellers, katalog,
  rekomendacje na PDP).
  **Reguła:** jeśli sekcja sprzedaje *rzecz do kupienia* → `contain` +
  padding. Jeśli sekcja to *kategoria/edytorialny skrót* → `cover` bez
  paddingu. Ten sam komponent `.category-card` obsługuje oba przez klasę
  na rodzicu sekcji, nie osobny komponent.

### 1.3 `.category-grid` + `.carousel-progress` — poziomy scroll z paskiem postępu

Wzorzec pojawia się wszędzie tam, gdzie jest więcej kart niż mieści się w
jednym rzędzie: `.category-grid__track` to **CSS scroll-snap** (`overflow-x:
auto; scroll-snap-type: x proximity`), nie JS-owy slider. Zaraz **za** nim (
jako `nextElementSibling`, to wymóg strukturalny dla `carousel.js`) leży
`.carousel-progress`: dwie strzałki (`.carousel-arrow`, scrollują o szerokość
jednej karty) + cienki pasek postępu (`.carousel-progress__bar`, szerokość i
pozycja liczone ze stosunku `scrollLeft`/`scrollWidth`, nie z liczby kart).
**Kiedy używać:** dowolna poziома lista kart, gdzie liczba elementów może się
różnić. Struktura musi być dokładnie `.category-grid` → (dowolny track) →
`.carousel-progress > .carousel-progress__arrows + .carousel-progress__track
> .carousel-progress__bar`, inaczej `carousel.js` (który iteruje po
wszystkich `.category-grid` i szuka paska w kolejnym rodzeństwie) go nie
podepnie.

Na mobile (≤900px) część siatek (`.bundles-grid`, `.newin-grid.is-active`,
`.testimonial-grid`) **przełącza się z prawdziwego CSS gridu na ten sam
scroll-snap mechanizm** zamiast zmieniać liczbę kolumn — sprawdź czy nowa
siatka potrzebuje tego fallbacku, czy wystarczy jej zwykłe zmniejszenie
liczby kolumn (jak `.product-grid`/`.hiw__questions`).

---

## 2. Kierunek wizualny (look & feel)

**W jednym zdaniu:** e-commerce/B2B, gęste siatki produktowe z ostrymi
narożnikami i cienkim 1px szwem, mono-fontowy "system" tekst (ceny, etykiety,
nav) kontrastujący z serifowym Lora na nagłówkach, prawie zerowy kolor poza
jednym akcentem koralowym używanym punktowo na hover/aktywnych stanach.

### 2.0 Cztery zasady potwierdzone przez Michała (2026-08-17) — nie do naruszenia bez wyraźnej zgody

W przeciwieństwie do reszty tego rozdziału (który opisuje *co jest w
kodzie*), te cztery punkty to jawnie potwierdzone decyzje projektowe, nie
tylko "tak akurat wyszło". Przy nowej sekcji/stronie traktuj je jak twarde
ograniczenia, nie jak sugestie do przełamania, jeśli "wygląda na to, że
pasowałoby inaczej":

1. **Coral zostaje jedynym akcentem interaktywnym na zawsze.** Żadna nowa
   sekcja nie dostaje własnego koloru (nawet punktowo, nawet dla promocji/
   sale) bez wyraźnej, jednorazowej zgody Michała — inaczej niż w
   packhelp-redesign, gdzie jest świadomie *jedna* dopuszczona ciemna/
   kolorowa sekcja, tu nie ma takiego wyjątku wbudowanego w regułę.
2. **Ostre rogi na zdjęciach/kartach produktowych to świadomy wybór stylu,
   nie przypadek.** Nie zaokrąglaj `.category-card__media`/`.pdp__stage`/
   podobnych "bo inne projekty tak mają" ani "żeby było miękciej" — kontrast
   ostrych zdjęć z pigułkowymi kontrolkami jest częścią tożsamości tego
   sklepu.
3. **Ruch/animacje — domyślnie ograniczaj, nie dodawaj "dla efektu".**
   Istniejący zestaw (trust-marquee, `.category-grid` scroll-snap,
   swatch-hover, `.platform-reveal` scroll-fill, testimonial-rotator) jest
   uznany za wystarczający. Nowa sekcja domyślnie **nie** dostaje własnej
   animacji/mikro-interakcji, chyba że Michał wprost o nią poprosi albo
   sekcja jest wariantem czegoś już animowanego (np. kolejna karuzela typu
   `.category-grid`, która automatycznie dziedziczy istniejący JS).
4. **Ikonografia zostaje wyłącznie funkcjonalna.** Strzałki nawigacji/
   karuzeli, chevron dropdownów, ikony koszyka/menu/uploadu — tak. Ikona
   dekoracyjna obok punktu USP, feature'a na `platform.html`, pytania FAQ
   itp. — nie, nawet jeśli wizualnie "prosi się" o ikonę. Treść niosą
   zdjęcia/wideo i liczby (patrz pkt 2.3 i `VOICE_GUIDELINE.md` pkt 5), nie
   system ikon.

### 2.1 Kolor — rich-blue jako tekst/tło ciemne, coral jako **jedyny** realny akcent interaktywny

- Tło strony to biel (`--white`). Jasnoszary (`--gray-100`/`--gray-200`) to
  tła placeholderów (`.ph`), hover-info, karuzeli human-touch — nigdy
  "kolorowa sekcja".
- **`--rich-blue`** (`#00061A`, prawie czarny granat) to główny kolor tekstu
  (`--color-text-primary`) **i** główny kolor ciemnych powierzchni (`.btn--dark`,
  aktywne kropki/pigułki, `.country-drawer__lang.is-active`,
  `.carousel-progress__bar`). Traktuj go jako "nasz czarny", nie jako akcent.
- **`--coral-500`** (`#FF4458`, token `--color-accent-alt`) to **jedyny
  akcent interaktywny w całym projekcie, bez wyjątku** — hover każdego
  przycisku (`.btn--white/--stroke/--outline-white/--dark:hover`),
  `:focus-visible` outline, `.contact-form__required`, `.btn-show-all:hover`,
  a także stan zaznaczony trybika font-settings (`.font-switch`) i jego
  ikony. Gdy potrzebujesz "koloru akcentu" na nowym elemencie (hover, focus,
  badge wymagalności pola) — to zawsze coral. Wcześniejszy token
  `--blue-600`/`--color-accent` ("PH Blue") istniał w tokenach wyłącznie pod
  dev-owy przełącznik prototypu i został **usunięty** (2026-08-17) — nie
  dodawaj go z powrotem, w tym projekcie nie ma i nie będzie drugiego
  koloru akcentu.
- `--tan-200` (`#E1CFC1`) to lokalny kolor tła placeholderów **tylko** na
  `platform.html` (`.ph` w kontekście `.platform-*__media`) — nie przenoś go
  na inne strony, to świadomie odrębna paleta dla tej jednej podstrony.

### 2.2 Zero zaokrągleń na zdjęciach i kartach, pigułki tylko na kontrolkach

Patrz pkt 1 — `.category-card__media`, `.pdp__stage`, `.hiw__q-media`,
`.platform-*__media` są zawsze prostokątne, ostre. `--radius-full` (pigułka)
zarezerwowany dla rzeczy klikalnych/przełączalnych: `.btn`, `.pill-filter`,
`.shop-filter__toggle`, `.country-drawer__lang`, `.font-switch`. Jeśli
projektujesz nowy element i wahasz się między "kartą" a "kontrolką" — karta
zawsze zostaje ostra, kontrolka zawsze dostaje pigułkę albo `--radius-sm`
(pole formularza/dropdown).

### 2.3 Zdjęcia i wideo jako główny nośnik treści — analogiczna zasada jak w redesignie

Hero (wideo w tle), video-cta (pełnoekranowe wideo), lifestyle-section
(interaktywne markery na jednym dużym zdjęciu), category/product cards —
wszystkie kluczowe momenty pokazują prawdziwe zdjęcie/wideo produktu, nie
ikonę/ilustrację. Ikony pojawiają się tylko funkcjonalnie: strzałki
karuzeli/PDP, chevron dropdownów, ikony koszyka/menu/uploadu w formularzu.
Brakujący asset = `.ph` (szary placeholder z opisowym tekstem) albo pusty
`.category-card__media`/`.newin-card__media` — nigdy podstawione zdjęcie z
innej kategorii (patrz `CLAUDE.md`, real-data-only).

### 2.4 Cienie — używane oszczędnie, tylko na "pływających" elementach

`--shadow-sm` (subtelny, np. `.newin-card__thumb` miniatura na zdjęciu),
`--shadow-md` (dropdowny/panele: `.pdp__qty-panel`, `.font-settings__panel`,
`.shop-filter__panel`), `--shadow-drawer` (boczne szuflady: quote/country/
mobile-nav). Karty w normalnym przepływie strony (`.category-card`,
`.newin-card`, `.testimonial-card`) **nie mają cienia w ogóle** — separacja
między nimi to wyłącznie 1px szew z pkt 1.1, nie cień.

---

## 3. Atomy współdzielone (`components.css`)

| Komponent | Warianty | Kiedy użyć |
|---|---|---|
| `.btn` | bazowy, 40px, pigułka | Baza dla wszystkich przycisków — sam w sobie nieużywany bez wariantu koloru. |
| `.btn--white` | biały, tekst rich-blue | Na ciemnym/zdjęciowym tle (hero video overlay). |
| `.btn--stroke` | biały + obrys rich-blue | Domyślna drugorzędna akcja na jasnym tle (prawie każdy `.section-head__text` CTA: "Shop all", "Contact Sales", "Shop packaging"). |
| `.btn--outline-white` | transparent + obrys biały | Na ciemnym/zdjęciowym tle jako drugorzędna akcja obok `.btn--white` (hero: "Contact Sales" obok "Browse Catalog"; video-cta). |
| `.btn--dark` | tło rich-blue, tekst biały | Główna/transakcyjna akcja: PDP "Add to list", quote-drawer CTA, contact-form submit (własny styl, patrz `.contact-form__submit`), platform hero "Get a demo". |
| `.btn--sm` | 32px | Nav quote-btn, lang-switch button. |
| `.btn--circle` | brak poziomego paddingu | Okrągły przycisk z samą ikoną/skrótem tekstu (`.site-header__lang-btn` "EN"). |
| Hover na każdym `.btn` | tło/obrys → coral | Uniwersalna reguła, patrz pkt 2.1 — nie projektuj osobnego hover-koloru per wariant. |
| `.section-head` + `.section-heading` + `.section-subheading` | — | Wzorzec nagłówka każdej sekcji marketingowej, patrz pkt 4. |
| `.pill-filter` | `.is-active` = tło rich-blue | Widoczny, zawsze-wyeksponowany filtr kategorii (homepage "New in"). |
| `.shop-filter` | dropdown z checkboxami | Filtr **kosmetyczny** w katalogu shopu — patrz pkt 5.2, nie filtruje realnie siatki. |
| `.swatch` (w `.category-card__swatches`/`.pdp__swatches`) | 32px kwadrat, aktywny = podkreślenie | Wybór koloru na karcie produktu/PDP, patrz pkt 3.1. |
| `.carousel-progress` | pasek + 2 strzałki | Zawsze towarzyszy `.category-grid`, patrz pkt 1.3. |
| `.ph` | generyczny szary placeholder | Brak zdjęcia — zawsze z sensownym opisowym tekstem w środku, nie pusty. |

### 3.1 Swatches — dwa różne rozmiary/kształty w tym samym pliku, nie myl ich

Bazowa, un-namespaced `.swatch` (16px, okrągła, obrys, `box-shadow: ring` na
`.is-active`) to fallback/rzadko używany wariant. **Realnie używany wszędzie
w kodzie** to namespaced override `.category-card__swatches .swatch,
.pdp__swatches .swatch` — **32px kwadrat**, `background-size: cover` (samo
zdjęcie produktu w danym kolorze jako miniatura swatcha, nie płaski kolor),
stan aktywny = cienka linia-podkreślenie (`::after`, `transform: scaleX`) pod
spodem, nie obrys/ring. Jeśli dodajesz nowy komponent z wyborem koloru — celuj
w ten drugi wzorzec (kwadrat + underline), on jest kanoniczny dla tego
projektu.

**Zachowanie JS różni się między dwoma kontekstami:**
- `.category-card__swatches` (siatki: best-sellers, shop grid): `swatches.js`
  podmienia zdjęcie **na hover** (`mouseenter`), a przy `mouseleave` karty
  wraca do `data-default-img` — to podgląd, nie trwały wybór. Wymaga
  `data-default-img` na `.category-card` i `data-img` na każdym `.swatch`.
  Overflow swatchy w wąskiej karcie automatycznie kolapsuje do "+N" badge
  (`ResizeObserver`), nie łam tego dodając własny CSS `overflow`.
- `.pdp__swatches` (PDP): `pdp.js` podmienia zdjęcie **na klik**
  (`data-color` + `data-img`), trwale, i aktualizuje podpis
  `.pdp__swatch-label` obok — to jest wybór wariantu, nie podgląd.

### 3.2 Dwa systemy filtrowania kategorii — nie zakładaj, że działają tak samo

- **`.js-category-filter`** (behawioralna klasa, niezależna od wyglądu
  triggera) — napędza `filters.js`. Może być pigułką (`.pill-filter` na
  homepage "New in") **albo** ikoną-kartą (`.category-card` w `.shop-cats`
  na shopie) — oba działają identycznie, dopóki mają `data-filter`
  odpowiadający `data-category`/`data-filter` na kartach docelowych.
  Filtrowanie jest **realne**: chowa/pokazuje `.category-card`/`.newin-grid`
  wg `data-category`, animuje wysokość kontenera, obsługuje `?category=`
  z URL-a.
- **`.shop-filter`** (dropdown "Print technique"/"Color" w
  `#shopCategoryDetail`) — `shop-filters.js` obsługuje **wyłącznie** UI:
  otwieranie/zamykanie panelu i renderowanie chipów `.active-filter-chip` po
  zaznaczeniu. **Nie filtruje faktycznie siatki produktów** — żadna karta w
  `.product-grid--catalog` nie ma dziś atrybutu koloru/techniki nadruku do
  porównania. Traktuj to jako gotowy szkielet UI do podpięcia realnej logiki,
  nie jako działający filtr — nie referuj się do niego w copy/dokumentacji
  jako "filtruje po kolorze", dopóki logika nie zostanie dopisana.

---

## 4. Wzorzec nagłówka sekcji: `.section-head` + H2 + subheading (+ CTA)

Powtarza się niemal w każdej sekcji marketingowej: Who we are, The human
touch, Bundles, New in, Best sellers, Customer Stories, każda sekcja
`.shop-cat-section`, `.pdp__recs`, `.platform-tools`.

**Struktura:**
```
.section-head
  .section-head__text
    h2.section-heading        (eyebrow-style, mono, uppercase — TO JEST H2, nie mały label!)
    p.section-subheading      (duży, Lora, to jest wizualny "prawdziwy nagłówek")
    a.btn.btn--stroke          (opcjonalne CTA, np. "Shop all")
```
**Uwaga terminologiczna, łatwo się pomylić:** `.section-heading` (mały,
mono, uppercase, np. "Who we are") jest semantycznym `<h2>`, ale
`.section-subheading` (duży, Lora, np. "We started because ordering merch
was a headache…") niesie cały wizualny ciężar nagłówka sekcji — to
odwrotność intuicji "heading = duży tekst". Nie zamieniaj ról tych dwóch
klas.

**Rytm:** `.section-head` ma stały `margin-bottom: var(--space-10)` (40px).
CTA button dostaje `margin-top: var(--space-4)` automatycznie z reguły
`.section-head__text .btn`.

**Warianty:**
- **Wyśrodkowany** (`.section--sales-touch .section-head`): `flex-direction:
  column; align-items: center; text-align: center` — użyj tylko dla sekcji,
  która ma też wyśrodkowaną treść pod spodem (jak karuzela human-touch).
- **Z logo zamiast CTA** (`.section--cta .section-head`, czyli
  `footer-cta.html`): po prawej `.section-head__logo` (duże logo + "Brought
  to you by Packhelp"), `align-items: center`, `margin-bottom: 0` — to
  jedyne miejsce tego wariantu, zarezerwowane dla zamykającej sekcji strony.

---

## 5. Katalog sekcji według typu strony

### 5.1 Elementy wspólne dla każdej strony

1. **Nawigacja to jeden komponent** (`nav-header.html`, patrz `CLAUDE.md`) —
   utility-bar (tagline + Platform/How it works/Contact us, chowa się
   poniżej 1180px) → `.site-header__row` (sticky, logo + hamburger poniżej
   1180px + kategorie z mega-menu od 1180px + Shop/EN/Quote po prawej).
   Zawsze ten sam na każdej stronie — nowa strona dostaje tylko
   `<!--#include file="nav-header.html" -->`, nigdy własny markup.
2. **Trzy boczne szuflady** żyją w tym samym partialu i mają identyczny
   mechanizm otwierania (`.is-open` na drawer+overlay, `aria-hidden`,
   `document.body.style.overflow = 'hidden'`, focus na close button,
   `Escape` zamyka): `#mobileNavDrawer` (z lewej, poniżej 1180px),
   `#quoteDrawer` (z prawej, koszyk wyceny), `#countryDrawer` (z prawej,
   wybór kraju/języka). Jeśli dodajesz czwartą szufladę — kopiuj dokładnie
   ten wzorzec z jednego z trzech JS-ów (`mobile-nav.js` jest najprostszy).
3. **`footer-cta.html`** — jedyna "stopka" tego serwisu (nie ma pełnego
   `.site-footer` z kolumnami linków jak w redesignie). To pojedyncza
   sekcja "Get in touch" z logo po prawej, użyta na końcu `<main>` na
   każdej stronie poza... żadnej — jest wszędzie, w tym na PDP i
   how-it-works. Nowa strona marketingowa/treściowa zawsze kończy się tym
   include'm.
4. **`font-settings.html`** (pływający trybik) i `password-gate.html` +
   odpowiadające `<script>` są na każdej stronie, w tej samej pozycji w
   markupie (patrz kolejność w dowolnym `src/pages/*.html`) — kopiuj z
   istniejącej strony 1:1, nie zmieniaj kolejności skryptów.

### 5.2 Strona marketingowa / landing (wzorzec: `index.html`)

Kolejność sekcji i ich rola:

| # | Sekcja | Rola | Karuzela? |
|---|---|---|---|
| 1 | **Hero** | Wideo w tle + H1 + eyebrow z liczbą + duet CTA + trust marquee (loga klientów) w rogu | nie (marquee ma własną ciągłą animację CSS) |
| 2 | **Who we are** (`.category-grid`) | Skrót całej oferty wg kategorii, zdjęcia `cover` | tak, `.category-grid` |
| 3 | **The human touch** (`.sales-touch`) | Wyróżnione USP (konsultant, próbki, szybka wycena…) w bespoke bouncing-carousel | tak, ale **inny mechanizm niż wszędzie indziej** — patrz niżej |
| 4 | **Bundles** | Gotowe zestawy, `.bundles-grid` (prawdziwy 4-kol. grid na desktopie, scroll na mobile) | tylko mobile |
| 5 | **New in** | `.filter-pills` + `.newin-grid` per kategoria, JS pokazuje jedną grupę naraz | tylko mobile (`.newin-grid.is-active`) |
| 6 | **Video-cta** | Czysto przerywnikowa, pełnoekranowe wideo + jedno zdanie + CTA | nie |
| 7 | **Best sellers** | Jak "Who we are", ale zdjęcia `contain` (produktowe cutouty) + swatche | tak |
| 8 | **Lifestyle** | Jedno duże zdjęcie z klikalnymi markerami (hotspoty) + pasek miniaturek pod spodem | nie (pasek miniaturek scrolluje na mobile) |
| 9 | **Customer Stories** | `.testimonial-rotator`, auto-rotujące co 4s, 4 opinie naraz w gridzie | nie (własny slide-rotator) |
| 10 | **footer-cta** | Zamknięcie strony | — |

**"The human touch" carousel — nie kopiuj tego mechanizmu do nowej sekcji
bez potrzeby.** To jedyny w projekcie ręcznie animowany (nie scroll-snap)
carousel: absolutne pozycjonowanie kart, aktywna karta skaluje się 1.9× i
dostaje Ken Burns na zdjęciu, autoplay co 2.5s z animowanymi kropkami
postępu (`sales-touch-gallery.js`). Skomplikowany i bardzo dopasowany do
dokładnie 5 kart o konkretnych wymiarach (`SLOT_WIDTH`/`ACTIVE_WIDTH`
zahardkodowane) — dla nowej sekcji z podobną rolą (kilka wyróżnionych USP)
domyślnie sięgaj po zwykły `.category-grid`, chyba że ktoś wprost prosi o
"ten sam efekt co human touch na homepage".
**Uwaga:** `sales-touch.js` (osobny plik od `sales-touch-gallery.js`) to
martwy kod — szuka `.sales-touch__number[data-count-to]`, którego nie ma
nigdzie w markupie. Nie zakładaj, że on coś animuje; licznik statystyk
istnieje tylko na `platform.html` i ma własny skrypt (`platform-stats.js`).

**Lifestyle section — hotspoty na zdjęciu:** każdy `.lifestyle__marker`
(pozycjonowany inline `left/top` w %) to numerowana kropka, hover/klik
podświetla odpowiadający `.lifestyle__tile` w pasku pod zdjęciem (dopasowanie
przez wspólny `data-product`). Klik "przypina" (`is-pinned`) dopóki
użytkownik nie kliknie gdzie indziej na stronie. Używaj tego wzorca tylko
gdy masz jedno dobre "hero" zdjęcie z 3-5 rozpoznawalnymi produktami w kadrze
— przy mniejszej liczbie punktów albo słabym zdjęciu zwykła siatka kart
sprawdzi się lepiej.

### 5.3 Strona katalogu (wzorzec: `shop.html`)

Dwa tryby wyświetlania tej samej strony, przełączane przez `filters.js`
(`setShopMode`), nigdy oba naraz:

1. **`#shopOverview` (domyślny, `?category` brak w URL)** — breadcrumb + H1
   "Shop" → `.shop-cats` (rząd okrągłych ikon-kategorii, kwadratowe media z
   `aspect-ratio:1/1`) → **po jednej `.shop-cat-section` na każdą kategorię**,
   każda to pełny wzorzec z pkt 4 (`.section-head` + `.category-grid`
   karuzela z produktami `contain`+padding). To jest "przegląd", nie
   filtrowanie.
2. **`#shopCategoryDetail` (po kliknięciu kategorii albo `?category=X` w
   URL)** — `.shop-filter-row` (dropdowny "Print technique"/"Color", patrz
   pkt 3.2 — **kosmetyczne**) → `.active-filters` (chipy, puste dopóki nic
   niezaznaczone) → **jeden** `.product-grid.product-grid--catalog` ze
   wszystkimi produktami wszystkich kategorii, z `data-category` per karta
   — to `filters.js` (ten sam silnik co homepage "New in") chowa/pokazuje
   karty wg aktywnej kategorii z `.shop-cats`.

**Dodając nową kategorię do shopu:** potrzebujesz wpisu w **obu** trybach —
osobnej `.shop-cat-section` (overview) **i** kart z odpowiednim
`data-category` w `.product-grid--catalog` (detail) — plus wpisu w
`.shop-cats` i nawigacji, patrz `CLAUDE.md` pkt o synchronizacji kategorii.

### 5.4 Strona produktu / PDP (wzorzec: `product.html`)

```
.pdp
  .pdp__hero (grid 62%/38%)
    .pdp__stage           (lewo: duże zdjęcie 784px, strzałki prev/next)
    .pdp__buy              (prawo: breadcrumb, H1, promo-text z "Read more",
                             swatches, sizes, quantity-dropdown z cenami
                             per próg, CTA "Add to list")
.pdp__info                 (zakładki: Specification / Product description / Size chart)
.pdp__recs ×3               (Not quite right? / Complete the set / Frequently paired —
                             każda to zwykła .category-grid karuzela, contain+padding)
footer-cta
```

**Quantity dropdown (`.pdp__qty`)** to jedyny w projekcie custom-select z
progami cenowymi (`.pdp__qty-tier`, każdy pokazuje ilość + cena/szt. +
suma). Klik na tier aktualizuje toggle-button i zamyka panel. Jeśli dodajesz
podobny wybór "ilość ↔ cena" gdzie indziej (np. w quote-drawerze) — ten
komponent jest wzorcem, nie zwykły `<select>`.

**Info tabs (`.pdp__info-nav` + `.pdp__info-panel`)** — pionowa lista zakładek
po lewej (200px), treść po prawej (60% szerokości, wyrównana do prawej przez
`margin-left: auto`). Trzy standardowe zakładki: Specification (tabela
label/value z `.pdp__info-row`), Product description (te same rowy, ale
treść to Lora-fontowe akapity — **jedyne miejsce w komponentach PDP, gdzie
`.pdp__info-row-text` niesie prozę zamiast krótkiej wartości**), Size chart
(prawdziwa `<table>`). Trzymaj się dokładnie tych trzech zakładek dla nowego
produktu, chyba że produkt wymaga czwartej (np. "Care guide") — wtedy dodaj
kolejny `data-tab`/`data-panel` z tym samym mechanizmem.

**Promo-text "Read more/Read less"** (`.pdp__promo`) — skrócony opis +
przycisk rozwijający pełną wersję (`pdp.js`, tekst doklejany na końcu, nie
osobny ukryty element). Używaj do jednozdaniowego opisu marketingowego tuż
pod H1, zanim użytkownik dojdzie do zakładek.

**Bundle PDP (8 stron, wzorzec: `bundle-day-one-kit.html`)** — jedna strona
`src/pages/bundle-<slug>.html` na każdy bundle/set (`bundle-day-one-kit`,
`bundle-global-crew`, `bundle-startup-uniform`, `bundle-launch-day-kit` z
homepage `#bundles`; `bundle-onboarding-essentials-pack`,
`bundle-thank-you-essentials-pack`, `bundle-event-giveaway-pack`,
`bundle-onboarding-remote-friendly-pack` z shop.html Sets/nav-megamenu) —
osobny szablon strony (nie wariant JS istniejącego `product.html`) dla
produktów typu Sets/Bundles. Ten sam
`.pdp__hero`/`.pdp__info`/`.pdp__recs` szkielet, ale w `.pdp__buy` blok
Colour/Size/Quantity zastąpiony listą zawartości zestawu
(`.pdp-bundle-list`/`.pdp-bundle-item` — miniatura, nazwa, wymiary, ilość,
przycisk "Edit"), a `.pdp__stage` ma jedno zdjęcie lifestyle bez
prev/next strzałek (`pdp.js` bezpiecznie no-opuje brakujące elementy
swatches/size/qty/arrows, nic dodatkowo nie trzeba wyłączać w JS). Trzecia
zakładka info-tabs to "What's inside" (tabela `.pdp__spec-table`,
Product/Dimensions/Quantity) zamiast "Size chart". Patrz
`COMPONENT_SNIPPETS.md` pkt "PDP — bundle variant" po gotowy markup.

### 5.5 Strona produktowa typu "platform" (wzorzec: `platform.html`)

Odrębny, "cięższy" marketingowo wzorzec — mieszanka SaaS-landing-page i
reszty sklepu, zbudowany na wzór stron typu Legora ale własnymi tokenami.
Kolejność:

| # | Sekcja | Rola |
|---|---|---|
| 1 | `.platform-hero` | Eyebrow + H1 + subtitle + duet CTA, po prawej zdjęcie w `.platform-media-frame` (przypięte do dolnej krawędzi placeholdera) |
| 2 | `.platform-stats` | 3 liczby z animowanym count-up (`platform-stats.js`, IntersectionObserver odpala raz) |
| 3 | `.platform-feature--full` | Pełnoszerokościowy feature, tekst nad zdjęciem |
| 4 | `.platform-feature` | Naprzemienny 2-kol. layout (tekst 50% z prawej, zdjęcie za nim), z opcjonalnym `.platform-feature__qa` (rząd Q&A pod opisem) |
| 5 | `.platform-split` / `.platform-split--reverse` | Prawdziwy 2-kolumnowy grid tekst/zdjęcie, `--reverse` zamienia kolejność |
| 6 | `.platform-reveal` | 3 cytaty-akapity, każdy "wypełnia się" kolorem podczas scrollowania (clip-path per linia, patrz niżej) |
| 7 | `.platform-tools` | 4-kolumnowy grid kart (hairline grid jak w katalogu) | 
| 8 | `.platform-faq` | `<details>/<summary>` nahavive'owy akordeon, `+`/`−` jako `content` w `::after` |

**`.platform-reveal` — scroll-fill efekt, nietrywialny, nie odtwarzaj go
ręcznie.** `platform-reveal.js` klonuje każdy `[data-reveal]` akapit,
mierzy realne prostokąty każdej linii tekstu (`Range.getClientRects()`), i
maskuje klon przez `clip-path: polygon(...)` rosnący wraz z pozycją
scrolla — od jasnoszarego do pełnego koloru tekstu, linia po linii, nie
całym blokiem naraz. Używaj tego komponentu tylko dla krótkich (2-4 zdania),
cytatopodobnych akapitów w sekcji, która ma wybrzmieć podczas przewijania —
nie dla zwykłego opisu funkcji (do tego `.platform-feature__desc`).

**`.platform-feature__qa`** — opcjonalny rząd pytanie/odpowiedź pod opisem
feature'a (dwie kolumny od 700px: label 65% / opis reszta). Dodawaj tylko
gdy feature ma kilka konkretnych "jak to działa" punktów do rozbicia (jak
"Stock & warehouse" — realtime update / low-stock alert / reorder), nie do
każdego feature'a.

**`platform-media-frame` / `.ph`** — placeholdery na tej stronie mają
własną, cieplejszą paletę (`--tan-200`, plus dwa dodatkowe kolory
`platform-color-1`/`platform-color-2` reużywane między hero-feature a
odpowiadającym kafelkiem w `.platform-tools`, żeby wizualnie się łączyły).
Nie przenoś tej palety poza `platform.html`.

### 5.6 Prosta strona treściowa (wzorzec: `how-it-works.html`)

Najprostszy layout w projekcie — brak `.section-head`, sam H1
(`.hiw__title`) + `<ol>` z 5 numerowanymi krokami w 5-kolumnowym gridzie
(3→2 kolumny na mniejszych ekranach). Każdy krok: duży serifowy numer
(`.hiw__q-num`, Lora) + mono tytuł + **opcjonalne** zdjęcie (nie każdy krok
je ma — w oryginale kroki 1/3/4 mają zdjęcie, 2/5 nie, celowo
nierównomiernie) + mono opis. Używaj tego wzorca dla dowolnej "jak to
działa"/"proces krok po kroku" strony — nie dodawaj badge'a/subheadingu z
pkt 4, to świadomie gołe, minimalne intro.

### 5.7 Strona formularza (wzorzec: `contact.html`)

Wyśrodkowana kolumna (`max-width: 640px`), H1 + subtitle wyśrodkowane, potem
`.contact-form` — pola bordered `--radius-sm` (nie pigułkowe, w
przeciwieństwie do reszty UI strony — formularz jest jedynym miejscem z
prostokątnymi polami), select z custom chevronem (SVG jako
`background-image`, `appearance: none`), upload-strefa z przerywaną
obwódką, duży pigułkowy submit na dole. Pola: Name*, Work email*, Phone,
Company, Project type (select), Budget (select), Message (textarea), File
upload. Gwiazdka wymagalności zawsze w kolorze coral
(`.contact-form__required`). Dla nowego formularza w projekcie kopiuj
dokładnie ten zestaw stylów pól — to jedyny wzorzec formularza w repo.

---

## 6. Rytm odstępów między sekcjami

- **Domyślny rytm strony:** `.section { padding-block: calc(var(--space-20) * 2); }`
  = **160px** góra i dół, ale `.section + .section` zeruje `padding-top` —
  więc efektywny odstęp między dwiema zwykłymi `.section` to **160px**
  (dolny padding pierwszej), nie 320px.
- **Po hero:** `.hero + .section` dostaje dodatkowe `padding-top: calc(var(--space-10) * 2)`
  (80px) na wierzchu zwykłego zera — bo hero samo nie ma paddingu,
  potrzebuje więcej oddechu niż standardowe przejście sekcja→sekcja.
- **Sekcje bez klasy `.section`** (hero, video-cta, lifestyle, footer-tiles,
  wszystkie `.platform-*`, `.shop-cat-section`, `.pdp__recs`) mają **własny,
  ręcznie ustawiony `padding-block`** — nie dziedziczą rytmu z pkt wyżej.
  Sprawdź istniejącą wartość na analogicznej sekcji zamiast zgadywać nową
  (np. `.shop-cat-section` = `--space-16`/64px, `.pdp__recs` =
  `--space-10`/40px, `.platform-feature` = `--space-16`/64px).
- **`.section--sales-touch`** ma własny szary background (`#F6F6F6`) i
  `margin-inline: var(--space-6)` (odsunięty od krawędzi ekranu jak karta) —
  jedyna sekcja na homepage z tłem innym niż biel.
- **Przed stopką (`footer-cta`)** nie ma specjalnej reguły — po prostu
  ostatnia sekcja treści kończy swój normalny `padding-block`, `footer-cta`
  zaczyna swój. Sprawdź wizualnie, nie zakładaj konkretnej liczby.

**Praktyczna reguła przy nowej sekcji:** czy to zwykła `.section` w flow
strony (użyj gołej klasy, dziedziczysz 160px)? Czy to specjalna,
pełnoekranowa/kolorowa sekcja (hero-like) — wtedy ustaw własny
`padding-block` dopasowany do sąsiadów, bierz wzór z najbliższej podobnej
istniejącej sekcji.

---

## 7. Znane niespójności / uwagi (nie kopiuj bezrefleksyjnie)

- **`.shop-filter` (Print technique/Color na shopie) nie filtruje realnie
  produktów** — patrz pkt 3.2. Jeśli ktoś prosi o "filtr, który faktycznie
  działa", trzeba dopisać `data-color`/`data-technique` na kartach i logikę
  porównania w `shop-filters.js` (albo `filters.js`), nie zakładaj że już
  istnieje.
- **`sales-touch.js` to martwy kod** na `index.html` — nie ma elementu, który
  by animował. Nie usuwaj go bez pytania (może być zostawiony celowo pod
  przyszłą sekcję ze statystykami), ale też nie buduj na nim nowej funkcji
  zakładając, że coś już robi.
- **Font-toggle domyślnie startuje w trybie `sans` (Inter)** przy pierwszej
  wizycie (brak `localStorage`), mimo że site'owy "podpis" to IBM Plex Mono
  — patrz `CLAUDE.md`. Sprawdź z użytkownikiem, zanim to zmienisz, może być
  celowe.
- **Dwa niepowiązane komponenty nazywają się podobnie:** `.pill-filter`
  (homepage, zawsze widoczny) i `.shop-filter` (shop, dropdown) to różne
  komponenty o różnym zachowaniu mimo zbliżonej nazwy/roli — nie zakładaj,
  że mają wspólny CSS/JS.
- **Kategorie zduplikowane w 3 plikach ręcznie** (patrz `CLAUDE.md`) — brak
  jednego źródła prawdy/generatora. Przy większej rozbudowie kategorii warto
  by to było kandydatem do refaktoru (np. wspólny JSON + generacja przy
  buildzie), ale to świadomy dług, nie coś do naprawienia przy okazji
  niezwiązanego zadania.

---

## 8. Skrócona ściągawka "opisuję → dostaję"

| Mówię... | Dostaję |
|---|---|
| "Zrób hero" | Wideo w tle na całą wysokość, H1 + eyebrow z liczbą + duet `.btn--white`/`.btn--outline-white`, trust marquee z logami w rogu. |
| "Sekcja z ofertą/kategoriami do przewijania w bok" | `.section-head` (pkt 4) + `.category-grid` + `.carousel-progress` (pkt 1.3), zdjęcia `cover` jeśli to kategorie, `contain`+padding jeśli to konkretne produkty (pkt 1.2). |
| "Pokaż wyróżnione USP-y w efektowny sposób" | Domyślnie zwykła `.category-grid` karuzela — sięgnij po bespoke `sales-touch` mechanizm tylko jeśli ktoś wprost prosi o "efekt jak human touch na homepage" (pkt 5.2). |
| "Sekcja z filtrowaniem kategorii" | `.filter-pills` (`.js-category-filter`) + siatka z `data-category` per karta — realnie filtrujący mechanizm, patrz pkt 3.2. |
| "Duży przerywnik z wideo/CTA" | `.video-cta`: pełnoekranowe wideo, overlay, wyśrodkowany eyebrow+tekst+jeden CTA. |
| "Zamknij stronę" | `footer-cta.html` include — logo + "Get in touch" + CTA, ten sam wszędzie. |
| "Strona katalogu produktów" | Dwa tryby: overview (karuzela per kategoria) / detail (jeden filtrowany grid) — pkt 5.3. |
| "Strona produktu (PDP)" | stage+buy-box hero, info-tabs (Spec/Description/Size chart), 3× karuzela rekomendacji — pkt 5.4. |
| "SaaS-owa/produktowa strona o platformie/funkcji" | Wzorzec `platform.html`: hero → stats → feature-full → feature naprzemienny → split → scroll-reveal cytaty → tools grid → FAQ akordeon — pkt 5.5. |
| "Strona 'jak to działa' / proces krok po kroku" | `.hiw__questions`: 5-kol. grid, duży numer + tytuł + opcjonalne zdjęcie + opis, bez badge'a — pkt 5.6. |
| "Formularz kontaktowy" | Wyśrodkowana kolumna 640px, bordered pola `--radius-sm`, custom-chevron select, upload strefa — pkt 5.7. |
| "Wybór koloru/wariantu na karcie/PDP" | `.swatch` 32px kwadrat z underline, hover-podgląd na karcie / klik-wybór na PDP — pkt 3.1, nie bazowy okrągły `.swatch`. |

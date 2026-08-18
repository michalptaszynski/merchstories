# packhelp-merch — instrukcje projektu

Przed zbudowaniem lub edycją jakiejkolwiek strony/sekcji w tym repo przeczytaj
[`PAGE_BUILDING_GUIDELINE.md`](PAGE_BUILDING_GUIDELINE.md). Mapuje on intencję
("chcę sekcję X", "potrzebuję kroku Y na PDP") na konkretny komponent, wariant
przycisku, wzorzec karty i odstęp między sekcjami — na podstawie analizy
`index.html`, `shop.html`, `product.html`, `platform.html`, `contact.html` i
`how-it-works.html`.

Dla warstwy "jak to wygląda w kodzie" (gotowy, wycięty z realnych stron markup
do kopiowania) patrz [`COMPONENT_SNIPPETS.md`](COMPONENT_SNIPPETS.md). Dla
tonu i wzorców tekstu patrz [`VOICE_GUIDELINE.md`](VOICE_GUIDELINE.md). Przed
zgłoszeniem strony jako gotowej przejdź [`QA_CHECKLIST.md`](QA_CHECKLIST.md).

---

## To jest generowany static site — nie edytuj plików w korzeniu

`index.html`, `shop.html`, `product.html`, `platform.html`, `contact.html`,
`how-it-works.html` w korzeniu repo są **generowane** i zaczynają się od
komentarza `GENERATED FILE — do not edit directly`. Realne źródło to:

- `src/pages/*.html` — jeden szablon na stronę.
- `src/partials/*.html` — współdzielone fragmenty, wciągane przez
  `<!--#include file="name.html" KEY="value" -->`. Include'y mogą się
  zagnieżdżać i przyjmować proste parametry `{{KEY}}` (patrz `MASK_ID` w
  `logo-mark.html`, jeśli taki powstanie).

Po każdej edycji czegokolwiek w `src/` **zawsze** przebuduj:

```
node build.js
```

i zweryfikuj wynik w wygenerowanym pliku w korzeniu (nie tylko w `src/`) —
to on jest faktycznie serwowany przez GitHub Pages. Commituj i push'uj razem
zmianę w `src/` i przebudowany plik w korzeniu — nie ma kroku CI, który by to
zrobił za ciebie.

**Kluczowe partiale:**
- `nav-header.html` — cały header (utility bar, main nav, mega-menu, mobile
  drawer, quote drawer, country drawer), włączony na każdej stronie. Zmiana
  nawigacji w jednym miejscu propaguje się automatycznie wszędzie — **nigdy
  nie buduj nawigacji od nowa inline na stronie**.
- `head-links.html` — fonty (Google Fonts: IBM Plex Mono, Inter, Lora) +
  linki do `tokens.css`/`base.css`/`components.css`.
- `password-gate.html`, `footer-cta.html` (wspólne "Get in touch" na dole
  index/shop/platform/contact/how-it-works/product), `font-settings.html`
  (pływający "trybik" font-switch w prawym dolnym rogu), `sales-touch-cards.html`
  (5 kart karuzeli "The human touch" na `index.html`).

## Tokeny i warstwa stylów

`tokens.css` (primitywy → tokeny semantyczne), `base.css` (reset,
`.container`, `.section`, generyczny placeholder `.ph`), `components.css`
(**wszystkie** style komponentów, jeden plik, ~3100 linii, uporządkowany w
bloki `/* ---------- Sekcja ---------- */`). Breakpointy (560/700/900/1180px)
nie mogą być custom property wewnątrz `@media`, więc są udokumentowane na
dole `tokens.css` i używane jako literały wszędzie w CSS.

## Dwa fonty, dwie różne role — nie myl kiedy którego użyć

- **Lora** (`--font-base`, serif) — nagłówki (H1/H2/H3), running text,
  akapity opisowe (np. `.pdp__info-row-text` w zakładce "Product description"
  na PDP, `.section-subheading`).
  **IBM Plex Mono** (`--font-mono`) — dosłownie cały "system UI": eyebrow
  labelki, przyciski, nav, ceny, etykiety pól, badge'e, breadcrumby, karty
  produktów. Reguła do stosowania przy nowym elemencie: *czy to zdanie
  sprzedażowe/opisowe, czy etykieta/UI-chrome?* Pierwsze → Lora, drugie →
  mono (często z `text-transform: uppercase` i dodatnim `letter-spacing`).
- Jest pływający "trybik" (`font-settings.html` + `font-toggle.js`) w prawym
  dolnym rogu każdej strony, który podmienia `--font-mono` na Inter
  (`:root.font-sans-mode`) — **to nie zmienia fontu nagłówków** (Lora zostaje
  zawsze), tylko UI-chrome. **Uwaga:** przy braku zapisanego wyboru w
  `localStorage` (świeży użytkownik) domyślny stan to `sans` (Inter), nie
  mono — jeśli to wygląda na niezamierzone przy pracy nad tym widgetem,
  dopytaj, zanim to "naprawisz".

## Real-data-only — nigdy nie zmyślaj nazw produktów, cen ani opinii

Nie fabrykuj nazw produktów, recenzji, ratingów, statystyk. Brakujący/
niesfotografowany produkt renderuje się jako zwykły szary placeholder `.ph`
(albo pusty `.category-card__media`/`.newin-card__media` bez `background-image`)
— **nigdy** nie podstawiaj przypadkowego zdjęcia z innej kategorii tylko żeby
kafel nie wyglądał na pusty. Gdy masz realne nazwy/kategorie (od użytkownika,
ze screena, z listy) ale nie masz zdjęć — użyj realnej nazwy z szarym
placeholderem, to jest ustalony wzorzec, nie kompromis do unikania. Liczby
sprzedażowe (np. "5,000+ teams", "65 countries", "24 hrs") muszą być
faktami już ustalonymi gdzie indziej na stronie (hero, footer-cta), nie
wymyślane od nowa dla nowej sekcji.

## Kategorie — jedna lista, trzy miejsca do synchronizacji

Katalog kategorii (Packaging, Sets, Clothing, Bags, Drinkware, Tech, Office,
Travel, Home) jest zduplikowany ręcznie w trzech miejscach — grep po
`CATEGORY: keep new categories in sync` przed dodaniem/zmianą kategorii:
1. `src/partials/nav-header.html` (mega-menu + mobile drawer).
2. `src/pages/shop.html` (`.shop-cats` rząd ikon, `#shopOverview` sekcje,
   `product-grid--catalog` w `#shopCategoryDetail`).
3. `src/pages/index.html` ("Who we are" `.category-grid`).

Dodając nową kategorię zaktualizuj wszystkie trzy, nie tylko tę, na którą
akurat patrzysz.

## Budowanie nowych stron z samego promptu — zasady

- **Autonomia:** buduj i pokazuj efekt, nie pytaj o plan sekcji z góry.
  Dopytaj tylko, gdy realizacja złamałaby jawną zasadę stąd albo z
  `PAGE_BUILDING_GUIDELINE.md` (np. nowy kolor akcentu poza coral/rich-blue,
  komponent bez precedensu, zmiana wspólnej nawigacji).
- **Źródło copy:** to fikcyjny sklep ("Merch Stories"), nie ma live-site'u do
  adaptowania — pisz oryginalnie, trzymając się `VOICE_GUIDELINE.md`.
- **Assety** żyją pod `assets/`, w podfolderze wg treści:
  `assets/photos/<kontekst>/...` (np. `shop/<kategoria>/`, `bundles/`,
  `best-sellers/`, `newin/`, `platform/`, `how-it-works/`, `hero/`,
  `lifestyle/`, `socialproof/`), `assets/logotypes/` (loga klientów w trust
  marquee), `assets/flags/` (SVG flagi w country-drawer, pobierane z
  `kapowaz/circle-flags`, nie hotlinkowane/emoji), `assets/fonts/`. Nowy
  obrazek trafia do pasującego podfolderu, nigdy do korzenia `assets/`.
- Po zbudowaniu/zmianie strony **zawsze** `node build.js` i realna
  weryfikacja wygenerowanego pliku — patrz `QA_CHECKLIST.md`.

## Praca z gitem

Michal pushuje bezpośrednio, gdy explicite mówi "git"/"wrzuć na gita" —
wtedy `git add -A && git commit` z opisową wiadomością i `git push` w tym
samym kroku, bez dodatkowego potwierdzenia. Poza tym nie commituj bez
poproszenia.

## Jak testować lokalnie

Każda strona ma password-gate (`#passwordGate`/`#siteContent`), hasło to
`shipbox42`, albo w konsoli/testach: `sessionStorage.setItem('phGateOk', '1')`
przed załadowaniem strony (sprawdź faktyczny klucz w `password-gate.js`,
jeśli się zmienił). Serwuj repo przez `python3 -m http.server` i sprawdzaj w
przeglądarce (Playwright do computed style/realnych pozycji, jeśli trzeba
zweryfikować coś, co nie widać z samego kodu) — patrz `QA_CHECKLIST.md` pkt
o weryfikacji wizualnej.

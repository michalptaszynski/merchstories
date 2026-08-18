# packhelp-merch — QA checklist przed "gotowe"

Lista do przejścia po zbudowaniu/edycji strony, zanim ją pokażę jako
skończoną. Nie jest to lista rzeczy do *opisania* — każdy punkt wymaga
faktycznego sprawdzenia (devtools/resize/klik), nie tylko przeczytania kodu.
Zbudowana na bazie realnych faktów o repo opisanych w `CLAUDE.md` i
`PAGE_BUILDING_GUIDELINE.md` (pkt 7), żeby się nie pomylić.

---

## 0. Build — zanim cokolwiek innego

- Edytowałeś coś w `src/`? **`node build.js`**, potem sprawdź wygenerowany
  plik w korzeniu repo (nie tylko `src/pages/...`) — to on jest serwowany.
  `git diff` powinien pokazać zmianę **w obu** miejscach (source + generated),
  jeśli commitujesz.
- Nowa strona ma banner `<!-- GENERATED FILE — do not edit directly. -->` na
  górze wygenerowanego pliku — jeśli go nie ma, edytowałeś zły plik.

## 1. Breakpointy — resize okna, nie zgadywanie

Sprawdź realnie w każdej z tych szerokości:
- **560px** — `.product-grid`/`.product-grid--catalog` spadają do 2 kolumn.
- **700px** — `.platform-split`/`.platform-stats__row` stackują się do
  jednej kolumny, `.hiw__questions` do 2 kolumn.
- **900px** — grid 8→4 kolumny (`.product-grid`), karuzele-gridy przełączają
  się na poziomy scroll (`.bundles-grid`, `.newin-grid.is-active`,
  `.testimonial-grid`), `.pdp__hero` stackuje się do jednej kolumny.
- **1180px** — pełna nawigacja z linkami/mega-menu/`.site-header__lang-btn`
  znika poniżej tej szerokości, hamburger się pojawia; `.utility-bar__links`
  znika też.

## 2. Nawigacja i szuflady

- Strona dostaje `<!--#include file="nav-header.html" -->` bez żadnego
  ręcznie skopiowanego markupu nawigacji.
- Mega-menu otwiera się na hover kategorii (desktop, ≥1180px) i pokazuje
  realne, poprawne linki/zdjęcia dla tej kategorii.
- Hamburger (<1180px) otwiera `#mobileNavDrawer` z listy kategorii — sprawdź
  że focus ląduje na przycisku zamknięcia i `Escape` zamyka.
- Przycisk "Quote" otwiera `#quoteDrawer`, "EN" otwiera `#countryDrawer` —
  oba z tym samym mechanizmem (overlay, `is-open`, `aria-hidden`, focus,
  Escape). Jeśli strona ma własne `.js-open-quote` przyciski (np. PDP "Add
  to list") — sprawdź że też otwierają drawer.
- `footer-cta.html` include obecny na końcu `<main>`.

## 3. Kategorie zsynchronizowane

Jeśli dodałeś/zmieniłeś kategorię: sprawdzone we **wszystkich** miejscach z
listy w `CLAUDE.md` — `nav-header.html` (mega-menu + mobile drawer),
`shop.html` (`.shop-cats` + `#shopOverview` sekcja + karty w
`#shopCategoryDetail` z `data-category`), `index.html` ("Who we are"). Grep
po `CATEGORY: keep new categories in sync` żeby nie przegapić żadnego z
trzech komentarzy-znaczników.

## 4. `.category-grid` + `.carousel-progress`

Dla każdej nowej karuzeli:
- Struktura dokładnie `.category-grid` (dowolny track wewnątrz) →
  **bezpośrednio** `.carousel-progress` jako `nextElementSibling` —
  `carousel.js` inaczej jej nie znajdzie.
- Strzałki realnie scrollują o szerokość jednej karty, pasek postępu
  faktycznie się przesuwa przy ręcznym scrollu (nie tylko przy kliku
  strzałki).
- Jeśli karty mają `.category-card__swatches` — sprawdź `data-default-img`
  na `.category-card` i że po `mouseleave` zdjęcie wraca do domyślnego (nie
  zostaje na ostatnio najechanym swatchu).

## 5. Filtrowanie kategorii (`.js-category-filter`)

- Klik pigułki/karty-triggera realnie chowa/pokazuje karty wg
  `data-filter`↔`data-category`, nie tylko wizualnie podświetla trigger.
- `?category=X` w URL-u od razu aktywuje właściwy filtr przy wejściu na
  stronę (sprawdź np. `shop.html?category=bags`).
- **Nie myl z `.shop-filter`** (dropdown Color/Print technique) — to osobny,
  dziś kosmetyczny system, patrz `PAGE_BUILDING_GUIDELINE.md` pkt 3.2/7. Nie
  zgłaszaj "filtr nie działa" dla tego komponentu jako buga, chyba że zadanie
  wprost prosiło o dopisanie realnej logiki filtrowania.

## 6. Tokeny — brak wartości "na oko"

- Każdy spacing to wartość z enumerowanej listy `--space-*`: **4, 8, 16, 24,
  32, 40, 48, 64, 80, 96px** — nie ma `--space-3/5/7/9/11/14` w tym projekcie
  (inna skala niż packhelp-redesign). Grep po nowych `margin`/`padding`/`gap`
  w dodanym CSS.
- Radius tylko `--radius-sm` (8px), `--radius-md` (16px), `--radius-full` —
  brak `lg/xl/2xl`. Zdjęcia/karty produktowe **ostre**, nie zaokrąglone
  (patrz pkt 2.2 guideline) — sprawdź, że nie dodałeś przypadkiem
  `border-radius` na `.category-card__media`/podobnym.
- Kolor interaktywny (hover/focus/wymagalność) to zawsze coral
  (`--color-accent-alt`) — to jedyny token akcentu w projekcie (patrz pkt
  2.0/2.1 guideline); nie dodawaj z powrotem usuniętego `--color-accent`
  (niebieski).
- Font UI-chrome (przyciski/nav/ceny/etykiety) w `--font-mono`, nagłówki i
  running text w `--font-base` (Lora) — sprawdź, że nowy tekst trafił do
  właściwej roli, patrz `CLAUDE.md`.

## 7. Zdjęcia — cover vs. contain, real-data-only

- Karty-kategorie/edytorialne (`cover`, pełny kadr) vs. karty-produkty
  (`contain` + `padding: 12.5–15%` na `.category-card__media`) — sprawdź,
  że nowa siatka używa właściwego trybu wg pkt 1.2 guideline, nie miksuje
  obu w jednej siatce.
- Brakujący asset = pusty/szary placeholder, **nigdy** podstawione zdjęcie z
  innej kategorii/produktu.
- Żadna nazwa produktu, cena, recenzja, rating ani liczba statystyczna nie
  jest zmyślona — real-data-only, patrz `CLAUDE.md`.

## 8. Swatches — właściwy komponent, właściwy mechanizm

- Nowy wybór koloru używa 32px kwadratowego `.swatch` w kontekście
  `.category-card__swatches`/`.pdp__swatches` (underline na aktywnym), nie
  bazowego 16px okrągłego `.swatch`.
- Na kartach w siatce: zmiana **na hover**, powrót do `data-default-img` na
  `mouseleave`. Na PDP: zmiana **na klik**, trwała, z aktualizacją
  `.pdp__swatch-label`. Nie zamień tych dwóch zachowań miejscami.

## 9. Copy

- Zgodne z `VOICE_GUIDELINE.md`: sentence case (poza dwoma udokumentowanymi
  wyjątkami), brak wykrzykników, CTA = czasownik+konkretny obiekt z
  ustalonego słownika, "Add to list" nie "Add to cart", liczby jako dowód
  obok opisu (nie zmyślone).
- PDP: opis produktu ma ~5 mini-nagłówków + akapit, nie jeden zlepiony blok
  tekstu.

## 10. Nowy komponent — zanim uznasz go za "swój"

- Sprawdź, czy podobny kształt już istnieje w `COMPONENT_SNIPPETS.md`/
  `components.css` (hairline-grid karuzela, section-head, swatch, dropdown-
  filter) zamiast tworzyć nowy wariant pod inną nazwą.
- Jeśli dodajesz komponent inspirowany zewnętrznym wzorcem (jak
  `platform.html` inspirowane Legorą) — użyj tokenów/fontów/promieni tego
  projektu, nie kopiuj cudzej stylistyki (np. zaokrągleń) 1:1.

## 11. Wizualna weryfikacja końcowa

- Serwuj repo lokalnie (`python3 -m http.server` w korzeniu) i otwórz
  faktycznie w przeglądarce (nie tylko czytaj kod) — password-gate hasło
  `shipbox42` albo `sessionStorage.setItem('phGateOk', '1')` przed
  załadowaniem (sprawdź aktualny klucz w `password-gate.js`, jeśli się
  zmienił).
- Przejrzyj całą stronę sekcja po sekcji na szerokości desktop i przy
  jednym z breakpointów z pkt 1 — literówki, złamane obrazki, nachodzące
  elementy łapie się wzrokiem, nie diffem.
- Dla poprawek pixel-level zweryfikuj wizualnie *ten konkretny* fragment po
  zmianie, nie całą stronę pobieżnie.
- **Jeśli w danej sesji nie ma dostępnego narzędzia do zrzutów ekranu** —
  nie pomijaj tego punktu po cichu. Zrób zamiast tego: (1) statyczną
  kontrolę strukturalną (klasy CSS mają definicję, tagi zbalansowane, brak
  wartości spoza skali tokenów z pkt 6); (2) jawnie powiedz użytkownikowi,
  że wizualnej weryfikacji nie zrobiłeś sam i prosisz o rzut oka — nie
  deklaruj "wygląda dobrze" bez pokrycia.

## 12. Edycje masowe (regex/skrypty na wielu podobnych blokach)

- Skopuj wzorzec do unikalnego kontekstu komponentu (np. pełnego znacznika
  otwierającego z klasą), nie do generycznego fragmentu, który pasuje też
  gdzie indziej (np. wspólny `</a>` pasujący też w mega-menu i w recs-
  karuzelach naraz).
- Zawsze porównaj liczbę dopasowań z oczekiwaną przed zapisaniem pliku —
  niezgodność to sygnał błędu, nie przypadek do zignorowania.

## 13. Aktualizacja dokumentacji, jeśli powstał nowy, wielokrotnego użytku wzorzec

Dopisz go do `COMPONENT_SNIPPETS.md` (gotowy markup) i/albo
`PAGE_BUILDING_GUIDELINE.md` (kiedy go używać) — żeby następna strona mogła
go skopiować zamiast odtwarzać od zera.

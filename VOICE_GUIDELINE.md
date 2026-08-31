# merchstories — Voice & copy guideline

Zasady tonu i wzorce tekstu wyciągnięte z realnego copy na `index.html`,
`shop.html`, `product.html`, `platform.html`, `contact.html`,
`how-it-works.html` — nie wymyślone od zera. To fikcyjny sklep ("Merch
Stories"), więc nie ma live-site'u do adaptowania (w przeciwieństwie do
packhelp-redesign) — cel tego dokumentu to żeby nowy tekst, pisany od zera,
brzmiał jak reszta serwisu.

---

## 1. Ton w jednym zdaniu

Rzeczowy, pewny siebie, B2B, ale rozmowny — kontrakcje są normalne
(*don't*, *you're*, *we've*, *isn't*), zero korporacyjnej sztywności. Sprzedaje
konkretem i liczbą, nie przymiotnikiem. Zero wykrzykników w całym serwisie
— sprawdzone: żaden nagłówek, subheading, CTA ani opis produktu nie używa `!`.

- **Rób:** *"Thousands of orders taught us which pieces teams reorder. These
  are them."*, *"A cold email gets ignored. A box on the desk gets opened —
  and remembered."*
- **Nie rób:** "Amazing merch that will blow your mind!", "The best
  swag solution ever!"

## 2. Setup + payoff, często przez myślnik albo dwa krótkie zdania

Dominujący szkielet subheadingu sekcji to **dwa zdania**: pierwsze stawia
kontekst/problem, drugie daje payoff/konkret — albo jedno zdanie rozcięte
myślnikiem (—) dla kontrastu:
> "We started because ordering merch was a headache. Today we handle it end
> to end — product, design, production, storage & shipping — for startups
> and enterprises alike."
> "Skip the blank page — choose from ready-made sets we've already put
> together, or use one as a starting point for something fully custom."
> "Our product team samples, tests and approves every piece before it
> reaches the catalogue. New drops land every month."

Krótkie, "kicker"-owe drugie zdanie na końcu (3-5 słów) jest częstym
zamknięciem: *"These are them."*, *"New drops land every month."* Nie
przeciągaj subheadingu w jeden długi, złożony akapit — dwa krótkie zdania >
jedno długie.

## 3. Sentence case — z dwoma świadomymi wyjątkami

Nagłówki, przyciski, etykiety — sentence case (pierwsza litera zdania wielka,
reszta mała poza nazwami własnymi): `Shop all`, `Contact Sales` (nazwa
własna działu → Title), `Who we are`, `Best sellers`, `New in`.

**Dwa miejsca, gdzie widać Title Case — traktuj różnie:**
- **H1 hero "Full Service Merchandise"** — to wordmark/tagline-owy nagłówek,
  świadomie Title Case, jak nazwa produktu. Kopiuj ten wzorzec **tylko** dla
  analogicznego, jednorazowego "podpisu marki" na hero, nie dla zwykłych H2.
- **`.section-heading` "Customer Stories"** na homepage — to **niespójność**
  względem reszty sekcji (`Who we are`, `The human touch`, `Best sellers`,
  `New in` są sentence case). Dla nowej sekcji trzymaj się sentence case,
  nie kopiuj akurat tego przykładu.

## 4. CTA — czasownik + konkretny obiekt

**Zaobserwowany słownik czasowników wg intencji** — trzymaj się go zamiast
wymyślać synonimy:

| Intencja | Czasownik | Przykład |
|---|---|---|
| Eksploracja katalogu | Shop, Browse, Explore | "Shop all", "Browse Catalog", "Explore Bestsellers" |
| Zawężony katalog | Show all X | "Show all clothing", "Show all bundles" |
| Kontakt handlowy | Contact, Get | "Contact Sales", "Contact us", "Get a demo", "Get in touch" |
| Zakup/dodanie | Add | "Add to list" (nie "Add to cart" — to sklep B2B na wycenę, nie impulsowy checkout) |
| Rezygnacja/pominięcie | Skip | (wzorzec z build-flow, patrz analogiczny projekt — używaj oszczędnie) |

"Show all X" (nie "View all X"/"See all X") to utrwalony wzorzec dla CTA
prowadzącego z wycinka do pełnej kategorii w tym repo — inny niż w
packhelp-redesign ("See all X"), nie mieszaj konwencji między projektami.

## 5. Liczby jako dowód, obok opisu, nigdy zamiast niego

> "Merch made easy — for 5,000 teams in 65 countries" (hero eyebrow)
> "5,000+ / Teams running their merch program on the platform"
> "65 / Countries we ship approved orders to, door to door"
> "24 hrs / Turnaround for free designs and a full quote"

Liczby na `platform.html` (`.platform-stats`) są animowane count-up i muszą
być **tymi samymi faktami** powtórzonymi gdzie indziej na stronie (hero
eyebrow, footer-cta "24 hours") — nie wymyślaj nowej liczby dla nowej
sekcji, jeśli fakt już istnieje gdzie indziej na stronie; jeśli potrzebujesz
nowego faktu, uzgodnij go z użytkownikiem zamiast zmyślać (real-data-only,
patrz `CLAUDE.md`).

## 6. "You/your" dla klienta, "we" dla Merch Stories — zawsze druga osoba

> "Track stock, approve designs, and ship to every office without leaving
> the dashboard."
> "Tell us what you need. Free designs and a full quote within 24 hours."

Nigdy trzecia osoba ("customers can…"). FAQ na `platform.html` jest zadane z
perspektywy klienta, pierwszoosobowo: *"Is the platform included with every
order, or is it a separate product?"*, *"Can different offices or brands
see only their own stock?"* — nie jako neutralny temat ("Platform
inclusion in orders").

## 7. Opisy produktów na PDP — mini-nagłówek + jeden akapit, powtórzone ~5×

Sekcja "Product description" na PDP (`.pdp__info-row`) łączy krótki,
benefitowy nagłówek (nie pełne zdanie, fragment obrazowy) z jednym akapitem
konkretu:
> **A heavier, brushed-back fleece** — "The Custom Women Organic Cotton
> Hoodie is cut from a 320 GSM brushed-back organic cotton fleece —
> noticeably heavier than a standard tee, with a soft inner face that holds
> its shape wash after wash…"
> **Built for your branding** — "Add your logo via embroidery, screen
> print, or DTG, whichever suits the design and budget best…"
> **Six colours to match your brand** — "Choose from Black, Anthracite,
> Burgundy, Eco Heather, Heritage Brown, or Honey Paper — a mix of true
> neutrals and warmer tones so your logo has the right backdrop…"

Standardowy zestaw ~5 nagłówków na produkt: materiał/konstrukcja, branding/
personalizacja, kto/kiedy tego używa, warianty/kolory, pielęgnacja/care. Dla
nowego produktu trzymaj się tej struktury zamiast jednego długiego opisu bez
podziału.

**Promo-text pod H1** (`.pdp__promo-text`, "Read more"): jedno zdanie
skrócone widoczne od razu + jedno dodatkowe zdanie ukryte za "Read more" —
oba w tym samym, konkretnym rejestrze co reszta PDP, nie hype'owy slogan:
> *"This women's organic cotton hoodie can be personalised with your
> company logo for a truly branded touch…"* + *"Ideal as a promotional item
> for business, advertising campaigns, or corporate events, it combines
> comfort with lasting impact."*

## 8. Nagłówki-wartości sekcji: [twierdzenie o produkcie] + [dla kogo/po co]

> "Stock levels you don't have to ask for"
> "Approve designs without the email thread"
> "One dashboard for every brand and market"
> "Run your merch program from one screen"

Zawsze konkretny problem/rozwiązanie, nie ogólnik ("Great stock management"
byłoby złe — "Stock levels you don't have to ask for" pokazuje sytuację).

## 9. Czego unikać

- Wykrzykników i pytań retorycznych w nagłówkach.
- Title Case poza dwoma wyjątkami z pkt 3 (hero H1 jako wordmark; "Customer
  Stories" to inconsistency do nieskopiowania, nie precedens).
- Pustych CTA bez obiektu ("Click here", "Submit" bez kontekstu — jedyny
  wyjątek to `.contact-form__submit`, gdzie kontekst formularza jest już
  oczywisty z otoczenia).
- Przymiotnikowego hype'u bez liczby/faktu za nim ("industry-leading",
  "world-class", "unparalleled") — jeśli chwalisz skalę/jakość, daj liczbę
  (pkt 5) albo konkretny obraz sytuacji (pkt 2).
- Trzeciej osoby przy zwracaniu się do klienta.
- "Add to cart"/impulsowego języka checkoutu — to sklep na wycenę, więc
  zawsze "Add to list"/"quote", nigdy "cart"/"buy now"/"checkout".

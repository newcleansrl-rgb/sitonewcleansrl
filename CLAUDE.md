## 🎯 Obiettivo del Progetto
Creare un sito web statico per un'impresa di pulizie composto da:
- `index.html` (Homepage)
- `contatti.html` (Pagina contatti con form EmailJS)
- `lavora-con-noi.html` (Pagina candidature recruiting)
- `privacy.html` (Privacy Policy GDPR)

Il sito deve essere moderno, accattivante, mobile-first e **estremamente veloce** in caricamento e navigazione.

---

## 🔍 Knowledge Graph (graphify)
- **graphify** (`~/.claude/skills/graphify/SKILL.md`) - any input to knowledge graph. Trigger: `/graphify`
When the user types `/graphify`, invoke the Skill tool with `skill: "graphify"` before doing anything else.

---

## ⚠️ Vincoli Critici (NON VIOLARE)
1. **Gestione Asset**: Tutte le immagini si trovano nella cartella `brand_assets/`. Riferisciti ad esse ESATTAMENTE con i nomi di file originali nel codice (`src="brand_assets/nome.ext"` o `url('brand_assets/nome.ext')`). 
   ⛔ NON tentare mai di leggere, aprire, analizzare, convertire o elaborare immagini. Usa solo percorsi e nomi così come sono.
2. **Output Testuale**: Rispetta rigorosamente le regole esistenti su CLAUDE.md. Nessun screenshot, nessuna preview browser, nessun tool visivo. Verifica layout esclusivamente tramite analisi testuale del codice.
3. **Skill Obbligatorie**: 
   - Usa `frontend-design` per struttura componenti, markup semantico e organizzazione codice.
   - Usa `ui-ux` per gerarchia visiva, pattern interattivi, coerenza design system e accessibilità.

---

## 🚀 Performance & Velocità (Priorità Assoluta)
Il sito deve raggiungere prestazioni estreme. Implementa obbligatoriamente:
- **Stack Minimo**: HTML5 semantico + CSS3 moderno + Vanilla JS. Niente framework pesanti o librerie UI non essenziali.
- **Zero Render-Blocking**: CSS in file separato, JS caricato con `defer`, nessuna dipendenza esterna bloccante.
- **Ottimizzazione Immagini**: `loading="lazy"`, `decoding="async"`, dimensioni esplicite (`width`/`height`) per evitare CLS. Usa `<picture>` solo se strettamente necessario.
- **Layout Stabile & Cache-Friendly**: Struttura DOM leggera, CSS efficiente e riutilizzabile, file statici separati pronti per CDN/static hosting.
- **Core Web Vitals Target**: LCP < 2.5s, INP < 200ms, CLS ≈ 0. Raggiungibili tramite lazy loading, font swap nativo, layout grid/flex stabile e CSS critico inline se necessario.

---

## 🎨 UI/UX & Design System
- **Mobile-First Responsive**: Breakpoint ottimizzati per smartphone (320px+), tablet e desktop. Layout fluido con container max-width e griglie adattive.
- **Accessibilità WCAG AA**: Contrasti verificati, focus states visibili, `alt` descrittivi, struttura semantica (`<header>`, `<main>`, `<section>`, `<footer>`), ARIA dove necessario.
- **Grafica Moderna & Accattivante**: Palette coerente con il settore pulizie/igiene (toni freschi, professionali), tipografia leggibile, spaziatura generosa, micro-interazioni CSS leggere (hover, focus, transizioni < 300ms).

---

## 📄 Struttura Pagine
### `index.html` — Homepage
- Hero section con titolo, sottotitolo e CTA primaria
- Banner recruiting compatto (link a lavora-con-noi.html)
- Sezione servizi (6 card: Uffici, Domestica, Finestre, Tessuti, Fine Cantiere, Trattamenti)
- Sezione "Come Lavoriamo" (4 step)
- Sezione "Chi Siamo / Perché Sceglierci" (features grid)
- Sezione statistiche animate (contatori)
- Sezione FAQ (accordion)
- Sezione testimonianze/recensioni (6 card)
- CTA finale
- Banner recruiting full-width (link a lavora-con-noi.html)
- Footer con link rapidi, servizi, contatti, social media
- WhatsApp floating button + Back-to-top + Cookie banner

### `contatti.html` — Pagina Contatti
- Page hero con icona SVG animata
- Form completo: nome, email, telefono, tipo servizio, preferenza oraria, messaggio
- Validazione client-side in tempo reale (blur + input)
- Placeholder per integrazione EmailJS (commenti chiari su dove inserire Public Key e configurare template)
- Colonna info aziendali: tel fissi/cellulari, email, indirizzo, orari, WhatsApp
- Google Maps embed
- CTA rapida "Chiama Ora"
- Footer coerente con homepage (con link a Lavora con Noi)
- WhatsApp floating button + Back-to-top + Cookie banner

### `lavora-con-noi.html` — Pagina Recruiting
- Page hero con icona briefcase animata
- Form candidatura: nome, cognome, data nascita, orario preferenza, telefono, email (opzionale), motivazione (opzionale)
- Validazione client-side dedicata (inline script nella pagina)
- Colonna benefici lavoro (ambiente dinamico, crescita, flessibilità, stabilità)
- Info contatti HR (email personale, tel, sede)
- Bottone "Condividi Pagina" (Web Share API / Clipboard fallback)
- Footer coerente con homepage
- WhatsApp floating button + Back-to-top + Cookie banner

### `privacy.html` — Privacy Policy GDPR
- Page hero titolo
- 12 sezioni complete: Titolare, Dati Trattati, Finalità/Base Giuridica (tabella), Sicurezza, Destinatari, Trasferimenti UE, Conservazione, Diritti Interessato, Cookie Policy, WhatsApp, Modifiche, Contatti
- Footer coerente con homepage
- Back-to-top + Cookie banner

---

## 🛠️ Workflow di Generazione
1. **Analisi**: Descrivi brevemente architettura UX/UI + strategia performance scelta
2. **Output File**: Fornisci codice completo e pronto all'uso per:
   - `index.html` (Homepage)
   - `contatti.html` (Pagina contatti con form EmailJS)
   - `lavora-con-noi.html` (Pagina candidature recruiting)
   - `privacy.html` (Privacy Policy GDPR)
   - `style.css` (CSS condiviso, mobile-first, zero dipendenze)
   - `script.js` (interazioni base, validazione form contatti, contatori, FAQ accordion, scroll spy, cookie banner, back-to-top, theme toggle)
3. **Documentazione**: Per ogni file includi:
   - Codice completo e ben commentato
   - Riferimenti esatti a `brand_assets/` con nomi originali
   - Note esplicative su come le scelte garantiscono velocità estrema
   - Istruzioni passo-passo per integrazione EmailJS
4. **Deploy**: Indica comandi/passaggi finali per test locale (es. Live Server) e deploy statico (Netlify/Vercel/GitHub Pages)

⚠️ **RICORDA**: NON generare logica che richieda lettura/elaborazione di immagini. Limitati a referenziarle per percorso/nome. Priorità assoluta a velocità, leggerezza e stabilità del layout. Segui alla lettera questo documento e le regole esistenti in CLAUDE.md.
Se crei degli screenshots per verifica dei componenti/pagine create mettili nella cartella /screenshots.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

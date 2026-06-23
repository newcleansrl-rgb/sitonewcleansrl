# Graph Report - E:\Sito pulizie  (2026-06-10)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 100 nodes · 97 edges · 24 communities (8 shown, 16 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]

## God Nodes (most connected - your core abstractions)
1. `/graphify` - 11 edges
2. `What You Must Do When Invoked` - 11 edges
3. `Homepage / Landing Page` - 6 edges
4. `📄 Struttura Pagine` - 5 edges
5. `Homepage (index.html)` - 5 edges
6. `Step 3 - Extract entities and relationships` - 4 edges
7. `Privacy Policy Page (privacy.html)` - 4 edges
8. `Contatti Page (contatti.html)` - 3 edges
9. `New Clean Srl Website Content` - 3 edges
10. `Contact & Quote Request Form` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Homepage (index.html)` --references--> `Lavora con Noi Page (lavora-con-noi.html)`  [EXTRACTED]
  .playwright-mcp/page-2026-06-06T18-00-40-882Z.yml → .playwright-mcp/page-2026-06-06T18-05-25-044Z.yml
- `Contact & Quote Request Form` --references--> `Cleaning Services Offerings`  [INFERRED]
  .playwright-mcp/page-2026-06-06T18-06-11-439Z.yml → .playwright-mcp/page-2026-06-06T18-00-24-427Z.yml
- `Job Application Form` --shares_data_with--> `Contact Request Form`  [INFERRED]
  .playwright-mcp/page-2026-06-06T18-06-20-628Z.yml → .playwright-mcp/page-2026-06-06T18-07-32-176Z.yml
- `Contatti Page (contatti.html)` --references--> `Homepage (index.html)`  [EXTRACTED]
  .playwright-mcp/page-2026-06-06T18-05-39-256Z.yml → .playwright-mcp/page-2026-06-06T18-00-40-882Z.yml
- `Homepage (index.html)` --references--> `Privacy Policy Page (privacy.html)`  [EXTRACTED]
  .playwright-mcp/page-2026-06-06T18-00-40-882Z.yml → .playwright-mcp/page-2026-06-06T18-06-42-761Z.yml

## Import Cycles
- None detected.

## Communities (24 total, 16 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.14
Nodes (8): brand_assets/, graphify, 🔍 Knowledge Graph (graphify), 🎯 Obiettivo del Progetto, 🚀 Performance & Velocità (Priorità Assoluta), 🎨 UI/UX & Design System, ⚠️ Vincoli Critici (NON VIOLARE), 🛠️ Workflow di Generazione

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (14): Part A - Structural extraction for code files, Part B - Semantic extraction (parallel subagents), Part C - Merge AST + semantic into final extraction, Step 0 - GitHub repos and multi-path merge (only if a URL or several paths), Step 1 - Ensure graphify is installed, Step 2.5 - Video and audio (only if video files detected), Step 2 - Detect files, Step 3 - Extract entities and relationships (+6 more)

### Community 2 - "Community 2"
Cohesion: 0.17
Nodes (11): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, PowerShell 5.1: Vertical scrolling stops working (+3 more)

### Community 3 - "Community 3"
Cohesion: 0.32
Nodes (8): Garante Privacy Website, Google Privacy Policy, Contatti Page (contatti.html), Homepage (index.html), Lavora con Noi Page (lavora-con-noi.html), Privacy Policy Page (privacy.html), Pulizia Domestica, Pulizia Uffici

### Community 4 - "Community 4"
Cohesion: 0.33
Nodes (7): Contact Request Form, Job Application Form, Lavora con Noi Page, Homepage, Contattaci Page, Privacy Policy, Services Section

### Community 5 - "Community 5"
Cohesion: 0.38
Nodes (7): Contact & Quote Request Form, Cookie Policy Dialog, Frequently Asked Questions, Homepage / Landing Page, Cleaning Services Offerings, Customer Reviews & Testimonials, 4-Step Work Process

### Community 6 - "Community 6"
Cohesion: 0.40
Nodes (5): `contatti.html` — Pagina Contatti, `index.html` — Homepage, `lavora-con-noi.html` — Pagina Recruiting, `privacy.html` — Privacy Policy GDPR, 📄 Struttura Pagine

### Community 7 - "Community 7"
Cohesion: 0.50
Nodes (4): Sopralluogo Gratuito Step, Pulizia Domestica Service, Pulizia Uffici Service, New Clean Srl Website Content

## Knowledge Gaps
- **60 isolated node(s):** `PreToolUse`, `allow`, `Usage`, `What graphify is for`, `Step 0 - GitHub repos and multi-path merge (only if a URL or several paths)` (+55 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `What You Must Do When Invoked` connect `Community 1` to `Community 2`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `/graphify` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `📄 Struttura Pagine` connect `Community 6` to `Community 0`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `PreToolUse`, `allow`, `Usage` to the rest of the system?**
  _60 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1422924901185771 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
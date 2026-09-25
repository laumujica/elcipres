# El Ciprés — Editorial Automation & Digital Archive

**A preservation, publishing, and InDesign automation project built around a literary archive of 650+ texts.**

---

## Overview

El Ciprés (**elcipres.com.ar**) is a digital archive and editorial production system created to preserve, organize, and publish the written work of Daniel Mujica.

The project began as a content-recovery and website effort, then evolved into a reproducible publishing pipeline for producing book-length editions from the same archive.

The current system combines:

- archive recovery and content normalization
- custom web publishing
- structured editorial metadata
- Markdown / JSON transformation
- Adobe InDesign 2025 automation with UXP (`.idjs`)
- pagination and layout rules
- Git-based versioning
- regression checks and manual visual QA
- print and digital-output planning

The literary content remains in Spanish to preserve the author's original writing. Project architecture, tooling, and technical documentation are maintained in English for an international development and recruiting audience.

---

## System architecture

The editorial workflow currently follows this pipeline:

```text
Curated Markdown
      ↓
Structured JSON
      ↓
InDesign UXP (.idjs)
      ↓
Automated pagination and layout
      ↓
Regression checks
      ↓
Manual editorial / visual QA
```

The current production build generates a near-complete first volume with:

- 90 curated texts
- 5 chronological editorial movements
- explicit content types for `prose`, `verse`, `hybrid`, and `visual`
- recto-aware section starts
- blank-page control
- automatic folios and visibility rules
- threaded continuation frames
- overset protection
- widow/orphan rules for selected text types
- automated table of contents
- structured front matter and back matter
- inline emphasis and dedicated quote treatments
- paragraph-level keep rules
- runtime regression checks

The current editorial source of truth is:

```text
INDD/docs/el-otro-yo-curation-v04.md
```

The structured production data is:

```text
INDD/data/el-otro-yo-curation-v04.json
```

Previous structured versions are preserved under `INDD/data/old/`.

---

## Repository structure

```text
INDD/
├─ docs/        editorial source versions
├─ data/        structured production data
├─ assets/      production assets
└─ scripts/
   ├─ el-otro-yo-v04-modular.idjs
   └─ modules/
      ├─ config.js
      ├─ validation.js
      ├─ styles.js
      ├─ layout.js
      ├─ front-matter.js
      ├─ section-cover.js
      ├─ body.js
      ├─ toc.js
      ├─ back-matter.js
      ├─ regression.js
      └─ report.js
```

The InDesign Scripts Panel is linked directly to the local repository, so changes can be pulled through GitHub Desktop and executed in InDesign without manually replacing script files.

---

## Technical capabilities implemented

### InDesign UXP automation

The project uses Adobe InDesign 2025 UXP scripting with CommonJS modules.

Implemented behaviors include:

- document creation and page setup
- facing-page layout
- dynamic text-frame creation
- threaded stories across continuation pages
- paragraph and character style creation
- recto-aware section starts
- master / parent-page control
- automatic page numbering
- text-frame autosizing
- content-aware back-matter construction
- inline character styling
- quote frames with independent decorative rules
- overset detection
- structural validation before and after composition

### Pagination rules

Pagination is treated as editorial logic rather than only visual formatting.

Examples include:

- short verse blocks remain together
- longer verse blocks enforce minimum first/last line counts
- selected paragraphs can be marked as non-breaking editorial units
- titles and related text can be linked with keep rules
- continuation pages are created only when required
- isolated one-line continuations can trigger corrective logic
- paragraph spacing can be scoped to a section instead of changing a global body style

### Structured editorial metadata

The current content model separates editorial content from layout behavior.

The long-term direction is a layered rules system:

```text
GLOBAL RULES
    ↓
VOLUME RULES
    ↓
CONTENT-TYPE RULES
    ↓
ITEM-LEVEL EXCEPTIONS
```

This makes it possible to reuse the same automation engine across future volumes while allowing each book to override only the rules that actually differ.

The guiding principle is:

> Common behavior belongs in reusable rules; exceptional behavior belongs in metadata.

---

## Regression testing and QA

A first runtime regression layer was added late in production after repeated pagination refinements exposed the risk of small fixes affecting already-stable sections.

Current checks include:

- expected volume title
- expected movement count
- expected literary-text count
- expected movement-cover count
- generated body-entry count
- required back-matter sections
- required paragraph styles
- required character styles
- text frames that extend beyond page bounds

Regression checks run after document generation so structural failures are surfaced immediately instead of relying entirely on manual inspection.

Visual QA is still required for issues that are inherently compositional, such as:

- awkward white space
- widows and orphans
- quote rhythm
- sparse continuation pages
- paragraph balance
- final recto/verso flow

A future improvement is to add pagination-aware QA capable of detecting paragraph splits and other visual composition warnings automatically.

---

## Key engineering lessons

### 1. Correct rules are not enough if targeting is fragile

One pagination bug persisted even though the correct InDesign keep rule had been chosen.

The original implementation identified a paragraph by comparing its full text content. That approach was brittle and failed silently when the runtime representation did not match the expected string exactly.

The fix was to make the rule structurally deterministic and add a post-composition verification.

Lesson:

```text
correct rule
+ unreliable selector
= unreliable automation
```

Stable targeting matters as much as the layout rule itself.

### 2. Editorial intent should be represented explicitly

Instructions such as:

- keep this paragraph together
- keep this heading with the next paragraph
- enforce at least two lines before and after a break

are better represented as editorial behavior than as page-specific manual fixes.

This led to a broader design direction where the automation engine interprets structured editorial intent instead of hard-coding corrections for individual pages.

### 3. Global rules and local exceptions need separate layers

Applying every decision globally creates unnecessary coupling.

Applying every decision manually creates an unmaintainable workflow.

The system therefore favors:

- reusable defaults for common content types
- volume-specific configuration where needed
- item-level metadata only for true exceptions

### 4. Visual QA and regression testing solve different problems

Automated checks are good at catching structural regressions.

Human review is still necessary for typographic rhythm, density, and visual balance.

The workflow now treats both as complementary rather than interchangeable.

### 5. Print and digital editions should be separate outputs

The print edition uses book-oriented folios, facing-page logic, and asymmetric margins.

A digital PDF edition has different requirements, especially page-number expectations and screen-reading margins.

The project therefore treats print and digital as two outputs from the same source system rather than forcing one layout to serve both.

---

## From manual production to reusable automation

A core discovery during development was that automation should not remove editorial judgment; it should move judgment to the correct layer.

The workflow evolved from:

```text
manual production
→ repeated visual decisions
→ local fixes
```

toward:

```text
structured source
→ explicit editorial rules
→ automated production
→ regression checks
→ targeted human QA
```

This makes the system more traceable, repeatable, and suitable for larger publishing workflows.

---

## Versioning and production workflow

The project uses Git and GitHub for:

- source control
- production traceability
- reversible changes
- modular script development
- documented checkpoints
- separation of editorial source, structured data, and layout logic

GitHub Desktop is used to synchronize the local production environment.

This replaced a manual file-copy workflow and made iterative InDesign scripting significantly safer.

---

## Tools and platforms

| Tool | Use |
|---|---|
| Adobe InDesign 2025 | Editorial layout and print production |
| InDesign UXP / `.idjs` | Layout automation |
| JavaScript | Automation logic |
| Markdown | Editorial source |
| JSON | Structured production data |
| Git / GitHub | Version control and traceability |
| GitHub Desktop | Local synchronization |
| VS Code | Code inspection and development |
| HTML / CSS / JavaScript | Website development |
| Firebase Hosting | Web deployment |
| Cloudflare | DNS and domain management |
| Google Blogger / Takeout | Archive recovery |
| ChatGPT / Claude | AI-assisted workflow design, scripting, debugging, and documentation |

---

## Skills demonstrated

- InDesign automation with UXP scripting
- modular JavaScript architecture
- editorial systems design
- pagination and layout logic
- structured content transformation
- Markdown → JSON → InDesign workflows
- metadata-driven layout behavior
- regression testing
- debugging and root-cause analysis
- Git-based production workflows
- print-production logic
- human-in-the-loop automation
- AI-assisted development with explicit human review

---

## Current status — September 24, 2026

The web archive is published and operational.

The first automated book volume is now approximately complete from a production-system perspective. The literary body, front matter, back matter, folio logic, TOC, credits, epilogue, cover, QR integration, and core pagination rules are in place.

Work completed on September 24 included:

- integrated the approved epilogue into the automated build
- added dedicated signature and role styles for back matter
- updated the production QR/domain reference
- completed the print cover artwork in a separate cover/imposition workflow
- restored two-line widow/orphan control in **About the Author**
- introduced the first runtime regression-test layer
- diagnosed a failed keep rule as a targeting problem rather than a pagination-rule problem
- replaced fragile full-text paragraph matching with deterministic structural targeting
- added post-composition verification for the protected epilogue paragraph
- added epilogue-specific paragraph spacing without changing the global body style
- documented a scalable rule hierarchy for future volumes
- identified print and digital PDF editions as separate outputs from the same content system

The most important technical shift today was moving from page-specific corrections toward reusable editorial behavior and validation.

### Technical backlog

- integrate the final prologue into the existing front-matter flow
- integrate final movement-opening imagery
- perform a full pagination and page-count audit
- run final recto/verso, folio, blank-page, overset, and back-matter QA
- expand regression coverage to include pagination-aware warnings
- formalize shared global, volume, content-type, and item-level rule layers
- extract more layout exceptions from hard-coded logic into structured metadata
- prepare final print-output validation
- build a separate digital-PDF output profile with reader-facing pagination and PDF-specific margins

---

## Project timeline

- **July 12, 2026** — Archive extraction, website build, deployment, search, contact, donation integration, and launch troubleshooting.
- **September 21, 2026** — Markdown-to-JSON editorial workflow, modular InDesign UXP generation, pagination logic, Git-based production flow, and initial QA architecture.
- **September 22, 2026** — Explicit literary metadata, body-date policy, verse pagination rules, automated TOC, front/back matter scaffolding, and late-stage editorial QA.
- **September 23, 2026** — Paratext system completed: title normalization, credits, About the Author, About this Edition, quote treatment, and end-of-work structure.
- **September 24, 2026** — Regression and robustness milestone: epilogue integration, back-matter refinement, first regression layer, deterministic paragraph targeting, keep-rule debugging, section-specific spacing, and reusable editorial-rule architecture defined for future volumes.

---

**Laura Mujica · 2026 ⚡**  
[lauramujica.com](https://lauramujica.com)

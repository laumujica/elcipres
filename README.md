# El Ciprés — Project Report

**A website and editorial automation project created to preserve, organize, and publish a writer's literary archive.**

---

## About the project

El Ciprés (**elcipres.com.ar**) brings together the complete written work of Daniel Mujica — more than 650 poems, haikus, and short stories originally published across four blogs between 2008 and 2015 — into a single place, with custom design, search, and spaces for the original reader community to reconnect with his work.

The project started as a personal preservation initiative and gradually expanded into two connected systems: a published website and an editorial workflow for producing a physical book from the same archive.

*Note: the literary content remains in Spanish in order to preserve the author's original writing. The project architecture, tooling, and process are documented here in English for an international audience.*

---

## What was done, and with what tools

### 1. Content migration and organization

The complete content of four **Google Blogger** blogs — posts, comments, images, drafts, and material no longer publicly visible — was recovered using **Google Takeout**.

The archive was then reorganized into a cleaner structure that could support both web publishing and later editorial processing.

### 2. Design and site construction

A custom visual identity was defined around a "writer's notebook" concept, with typography, color, and a distinct visual language for each collection.

The site was built in HTML, CSS, and JavaScript using a scalable folder structure with content, styles, and scripts kept separate.

### 3. Deployment and infrastructure

The site was deployed on **Firebase Hosting**, with the custom domain **elcipres.com.ar** configured through **Cloudflare** for DNS, caching, and performance/security settings.

### 4. Product features

- Responsive navigation
- A custom-built search engine across 650+ literary pieces
- Contact form integration through **Formsubmit**
- **Cafecito.app** integration for book-printing support
- Biography and historical reader-comment sections
- Cross-browser and mobile testing

---

## Editorial automation workflow

On **September 21–22, 2026**, the project moved from a manually understood layout process into a reproducible **InDesign automation pipeline**, with editorial metadata, pagination rules, front/back matter, and a generated table of contents.

The current workflow is:

```text
Curated Markdown
      ↓
Structured JSON
      ↓
InDesign UXP (.idjs)
      ↓
Automated pagination and layout
      ↓
Manual editorial / visual QA
```

The current production build handles:

- 90 curated texts across 5 chronological editorial movements
- explicit literary metadata for `prose`, `verse`, `hybrid`, and `visual` texts
- automatic section covers and recto-aware starts
- blank verso pages and hidden/visible folio rules
- Arabic numbering beginning at the prologue while keeping its folio hidden
- threaded continuation pages and overset protection
- verse pagination rules that avoid isolated single lines
- body dates preserved as metadata but hidden in the printed composition
- automated multi-page table of contents
- front matter scaffolding, finalized credits, prologue placeholder, and structured back matter sections
- finalized **About the Author** and **About this Edition** copy
- styled author quotations with dedicated quote/bar frames
- a dedicated end-of-work page before the back matter, including the cypress illustration
- validation of structured JSON before document generation

The source manuscript remains versioned separately from generated data, so editorial decisions are not lost when the layout logic changes.

The current editorial source of truth is `INDD/docs/el-otro-yo-curation-v04.md`. Its structured production counterpart is `INDD/data/el-otro-yo-curation-v04.json`; previous JSON versions are archived under `INDD/data/old/`.

### From manual layout to controlled automation

A key discovery during development was that the goal was not to remove human judgment, but to move it to the right stage.

Early iterations required manually understanding pagination, text flow, page sides, typography, and source inconsistencies. Once those rules became explicit, the script could handle repetitive production tasks while human review became focused on exceptions: literary line breaks, editorial ambiguity, visual rhythm, and final print decisions.

This shifted the workflow from:

```text
manual production → repeated visual decisions
```

to:

```text
structured source → automated production → targeted human control
```

That distinction has become one of the main design principles of the project.

---

## Versioning and local production workflow

The project is maintained in **GitHub**, with editorial sources, structured data, and InDesign scripts stored separately:

```text
INDD/
├─ docs/      editorial Markdown versions
├─ data/      generated / structured JSON
└─ scripts/   InDesign UXP automation
```

**GitHub Desktop** is used to keep the production machine synchronized with the repository.

The local InDesign Scripts Panel is linked directly to the repository's `INDD/scripts` folder, so new script versions can be pulled from GitHub and executed in InDesign without manually downloading or replacing files.

This made the workflow significantly safer: changes are versioned, reversible, and traceable instead of being copied manually between local files.

---

## Tools and platforms used

| Tool | What it was used for |
|---|---|
| Google Blogger / Google Takeout | Original archive source and recovery |
| HTML / CSS / JavaScript | Website development |
| Firebase Hosting | Website deployment |
| Cloudflare | Domain, DNS, caching, and performance |
| Git / GitHub | Source control and project versioning |
| GitHub Desktop | Local repository synchronization |
| Adobe InDesign 2025 | Editorial layout and print production |
| InDesign UXP / `.idjs` | Layout automation and production scripting |
| Markdown / JSON | Editorial source structure and machine-readable production data |
| VS Code | Local code inspection and development |
| ChatGPT / Claude | AI-assisted research, workflow design, scripting, debugging, and documentation |
| Formsubmit | Contact form handling |
| Cafecito.app | Crowdfunding / micro-donation integration |

---

## Skills demonstrated

- Information architecture and large-content organization
- Editorial systems and print-production logic
- InDesign automation with UXP scripting
- Structured data transformation (Markdown → JSON → layout)
- Human-in-the-loop workflow design
- Git-based version control and production traceability
- Debugging and iterative validation
- Website deployment, DNS, and hosting administration
- AI-assisted workflow design with explicit human review points

---

## Current status — September 23, 2026

The web archive is published and operational.

The editorial pipeline now generates a near-complete book structure from the curated manuscript. Core body pagination remains stable, and most of the work completed today focused on closing the paratextual system and refining the final book architecture rather than changing the literary body.

Today's editorial / production milestone included:

- standardized the official book title as **El otro yo** throughout the production system
- finalized the credits page, including role wording, AI-process disclosure, typography, spacing, and a working QR asset
- finalized and placed the approved **About this Edition** text
- finalized and placed the **About the Author** text
- added inline emphasis for author-profile references and a dedicated visual treatment for direct quotations
- refined the author-profile quote layout into separate text and vertical-bar frames
- added the cypress illustration to the end-of-work page and reduced it to a 19 mm-wide visual mark
- continued tightening back-matter spacing and page flow based on visual QA in InDesign

The **About the Author** layout is considered ready for this checkpoint, with one small pagination refinement intentionally deferred: one sentence currently begins alone at the top of a continuation page. The quote spacing is now close to the intended visual rhythm and will be fine-tuned only if needed during the final QA pass.

The epilogue author has already agreed to participate, so that section is now externally pending rather than an internal writing task. The next work session will shift toward the prologue and visual design.

### Backlog

- Write and place the final **Prologue**.
- Receive and place the **Epilogue** from its confirmed writer.
- Speak with Fernanda and Daniela and select imagery for the five movement openings.
- Begin and develop the **cover design**.
- Fine-tune the remaining orphan sentence in **About the Author** if it still appears during final QA.
- Add Daniel's acknowledgements after he receives the first physical copy.
- Finalize movement-cover imagery and its production treatment.
- Run a final proofread / human-read PDF pass.
- Verify final recto/verso starts, folios, blanks, overset, quote spacing, and back-matter flow.
- Prepare print-production files and determine final imposition / blank-page requirements with the chosen printing method.

---

## Project timeline

- **July 12, 2026** — Initial archive extraction, website build, deployment, search, contact, donation integration, and launch troubleshooting.
- **September 21, 2026** — Editorial automation milestone: Markdown-to-JSON workflow, InDesign UXP generation, pagination logic, source versioning, GitHub Desktop synchronization, and production QA workflow.
- **September 22, 2026** — Curation v04 and book-structure milestone: explicit literary metadata, body-date policy, verse pagination rules, automated TOC, front/back matter scaffolding, credits, end-of-work transition, epilogue placeholder, and final-stage editorial QA.
- **September 23, 2026** — Paratext and finishing milestone: official **El otro yo** title casing standardized, credits finalized with QR and updated role language, **About this Edition** and **About the Author** copy completed and placed, author-quote treatment refined, cypress end-of-work image integrated, and remaining backlog shifted to prologue, epilogue delivery, movement imagery, cover design, final QA, and print preparation.

---

**Laura Mujica · 2026 ⚡**  
[lauramujica.com](https://lauramujica.com)

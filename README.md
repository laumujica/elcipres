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
- front matter scaffolding, credits, prologue placeholder, and back matter sections
- a dedicated end-of-work page before the back matter
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

## Current status — September 22, 2026

The web archive is published and operational.

The editorial pipeline now generates a near-complete book structure from the curated manuscript. Editorial classification is explicit in Markdown metadata instead of inferred by the script, and the current InDesign build includes body pagination, recto/verso logic, hidden and visible folios, a multi-page TOC, front matter, a closing page for the literary work, and structured back matter.

Editorial QA on the 90-text body is substantially complete. The remaining work has shifted from core automation to final content, visual refinement, and print preparation.

### Backlog

- Write and place the final prologue.
- Add final **About the Author** and **About this Edition** copy.
- Receive and place the epilogue after external family review.
- Add Daniel's acknowledgements after he receives the first physical copy.
- Refine styles for the new front/back matter sections.
- Finalize movement-cover imagery and cover design.
- Run a final proofread / human-read PDF pass.
- Prepare print-production files and determine final imposition / blank-page requirements with the chosen printing method.

---

## Project timeline

- **July 12, 2026** — Initial archive extraction, website build, deployment, search, contact, donation integration, and launch troubleshooting.
- **September 21, 2026** — Editorial automation milestone: Markdown-to-JSON workflow, InDesign UXP generation, pagination logic, source versioning, GitHub Desktop synchronization, and production QA workflow.
- **September 22, 2026** — Curation v04 and book-structure milestone: explicit literary metadata, body-date policy, verse pagination rules, automated TOC, front/back matter scaffolding, credits, end-of-work transition, epilogue placeholder, and final-stage editorial QA.

---

**Laura Mujica · 2026 ⚡**  
[lauramujica.com](https://lauramujica.com)

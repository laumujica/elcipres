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

On **September 21, 2026**, the project reached a new stage: the literary archive began moving from a manually understood layout process into a reproducible **InDesign automation pipeline**.

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

The first production test currently handles:

- 90 curated texts
- 5 editorial movements
- automatic section covers
- blank verso pages
- recto-aware section starts
- automatic folios
- threaded continuation pages
- paragraph styles and typography
- overset detection
- generation statistics and validation

The source manuscript remains versioned separately from generated data, so editorial decisions are not lost when the layout logic changes.

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

## Current status — September 21, 2026

The web archive is published and operational.

The editorial pipeline has successfully generated a complete test document from the curated manuscript, including section logic, continuation pages, automated folios, and layout validation.

The current focus is no longer basic generation, but improving the quality and control of the generated book.

### Backlog

- Review and refine ambiguous literary line breaks
- Build the book index / table of contents
- Add remaining front and back matter, including acknowledgements and other required pages

---

## Project timeline

- **July 12, 2026** — Initial archive extraction, website build, deployment, search, contact, donation integration, and launch troubleshooting.
- **September 21, 2026** — Editorial automation milestone: Markdown-to-JSON workflow, InDesign UXP generation, pagination logic, source versioning, GitHub Desktop synchronization, and production QA workflow.

# El Ciprés — Project Report

**A website to preserve and share a writer's literary work, built end-to-end using digital tools and AI assistance.**

---

## About the project

El Ciprés (**elcipres.com.ar**) is a website that brings together the complete written work of Daniel Mujica — over 650 poems, haikus, and short stories originally published across 4 different blogs between 2008 and 2015 — into a single place, with custom design, a search engine, and spaces for the original reader community to reconnect with his work.

The project started as a personal gift and grew into a fully published website, with its own custom domain and ongoing improvements.

*Note: the site's content is in Spanish (it preserves the original author's writing), but the project itself — architecture, tooling, and process — is documented here in English for an international audience.*

---

## What was done, and with what tools

### 1. Content migration and organization
The complete content of 4 **Google Blogger** blogs (posts, comments, and images spanning more than 15 years) was exported and recovered using **Google Takeout**, Google's official data export tool. This made it possible to retrieve not just what was publicly published, but also drafts, reader comments, and material that was no longer publicly visible.

### 2. Design and site construction
A custom visual identity was defined (a "writer's notebook" concept: typography, color palette, a distinct icon for each collection of texts), and the site was built in HTML/CSS/JavaScript, organized into a clean, scalable folder structure (pages, styles, and scripts kept separate).

### 3. Deployment and custom domain
The site was deployed on **Firebase Hosting** (Google's hosting platform), with a **custom domain** (elcipres.com.ar) configured through **Cloudflare**, including DNS management, caching, and performance/security settings.

### 4. Features added
- Navigation menu
- **Custom-built search engine** that lets users find words or ideas across the 650+ pieces, with no dependency on third-party search services
- Contact form connected to an external service (**Formsubmit**) to receive messages from readers
- Integration with **Cafecito.app**, a micro-donation platform, to fund the printing of a physical book featuring a selection of the work
- A biography page and a section featuring the historical comments readers left on the original blogs

### 5. Testing and quality control
The site was tested across multiple browsers (Chrome, Firefox, Edge, Brave) and devices (desktop and mobile), identifying and resolving behavioral differences between them — including Cloudflare-specific configuration issues that were affecting the site's functionality.

---

## Tools and platforms used

| Tool | What it was used for |
|---|---|
| Google Blogger / Google Takeout | Source and export of the original content |
| Firebase Hosting | Website deployment |
| Cloudflare | Custom domain, DNS, caching, and performance |
| VS Code (Live Server) | Local development and testing |
| Cafecito.app | Crowdfunding / micro-donation platform |
| Formsubmit | Contact form message handling |
| Compression tools (ZIP/RAR) | Organizing and transferring project files |
| Browser developer tools | Diagnosing and resolving technical issues |
| Claude (Anthropic AI) | Technical assistance: code generation, layout, debugging, and content drafting |

---

## Skills demonstrated

- Information architecture and content organization
- Visual identity and UX design (with a focus on accessibility for an older user)
- Website deployment and administration (hosting, domains, DNS)
- Methodical technical troubleshooting (step-by-step debugging, cross-browser testing)
- Third-party tool and service integration
- Strategic use of AI as a production tool, directing technical work from start to finish

---

## Project timeline

Development took place over several work sessions on **July 12, 2026**, covering everything from the initial content extraction to publishing, design adjustments, new feature rollout (menu, search, contact form, donations), and post-launch bug fixing.

---

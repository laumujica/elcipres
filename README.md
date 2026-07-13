# El Ciprés — Reporte del proyecto

**Un sitio web para preservar y compartir la obra literaria de un escritor, construido de punta a punta con herramientas digitales y asistencia de IA.**

---

## De qué se trata el proyecto

El Ciprés (**elcipres.com.ar**) es un sitio web que reúne toda la obra escrita de Daniel Mujica — más de 650 poemas, haikus y microrrelatos publicados originalmente en 4 blogs distintos entre 2008 y 2015 — en un solo lugar, con diseño propio, buscador, y espacios para que la comunidad de lectores originales se reconecte con su obra.

El proyecto nació como un regalo personal y se convirtió en un sitio completo, publicado, con dominio propio y en constante mejora.

---

## Qué se hizo, y con qué herramientas

### 1. Migración y organización de contenido
Se exportó y rescató el contenido completo de 4 blogs de **Google Blogger** (posts, comentarios e imágenes de más de 15 años) usando **Google Takeout**, la herramienta oficial de exportación de datos de Google. Esto permitió recuperar no solo lo publicado, sino también borradores, comentarios de lectores y material que ya no era visible públicamente.

### 2. Diseño y construcción del sitio
Se definió una identidad visual propia ("cuaderno de escritor": tipografía, paleta de colores, un ícono distinto por cada colección de textos) y se construyó el sitio en HTML/CSS/JavaScript, organizado en una estructura de carpetas prolija y escalable (páginas, estilos y scripts separados).

### 3. Publicación y dominio propio
El sitio se subió a **Firebase Hosting** (la plataforma de hosting de Google), y se configuró un **dominio personalizado** (elcipres.com.ar) a través de **Cloudflare**, incluyendo gestión de DNS, caché y ajustes de rendimiento y seguridad.

### 4. Funcionalidades agregadas
- Menú de navegación
- **Buscador propio** que permite encontrar palabras o ideas dentro de las más de 650 piezas, sin depender de servicios externos
- Formulario de contacto conectado a un servicio externo (**Formsubmit**) para recibir mensajes de lectores
- Integración con **Cafecito.app**, una plataforma de micro-donaciones, para financiar la impresión de un libro físico con una selección de la obra
- Página de biografía y una sección con los comentarios históricos que dejaron lectores en los blogs originales

### 5. Testing y control de calidad
Se probó el sitio en múltiples navegadores (Chrome, Firefox, Edge, Brave) y dispositivos (escritorio y mobile), identificando y resolviendo diferencias de comportamiento entre ellos — incluyendo configuraciones específicas de Cloudflare que afectaban el funcionamiento del sitio.

---

## Herramientas y plataformas utilizadas

| Herramienta | Para qué se usó |
|---|---|
| Google Blogger / Google Takeout | Origen y exportación del contenido |
| Firebase Hosting | Publicación del sitio web |
| Cloudflare | Dominio propio, DNS, caché y rendimiento |
| VS Code (Live Server) | Edición y prueba del sitio en desarrollo |
| Cafecito.app | Plataforma de financiamiento colectivo |
| Formsubmit | Recepción de mensajes del formulario de contacto |
| Herramientas de compresión (ZIP/RAR) | Organización y transferencia de archivos del proyecto |
| Herramientas de desarrollador del navegador | Diagnóstico y resolución de errores técnicos |
| Claude (IA de Anthropic) | Asistencia técnica: generación de código, diagramación, debugging y redacción de contenido |

---

## Habilidades demostradas

- Arquitectura y organización de la información
- Diseño de identidad visual y experiencia de usuario (con foco en accesibilidad para un usuario mayor)
- Publicación y administración de sitios web (hosting, dominios, DNS)
- Resolución metódica de problemas técnicos (debugging paso a paso, testing cruzado entre navegadores)
- Integración de herramientas y servicios de terceros
- Uso estratégico de inteligencia artificial como herramienta de producción, dirigiendo el trabajo técnico de principio a fin

---

## Duración del proyecto

El desarrollo se llevó a cabo en varias sesiones de trabajo el día **12 de julio de 2026**, cubriendo desde la extracción inicial del contenido hasta la publicación, ajustes de diseño, incorporación de funcionalidades nuevas (menú, buscador, formulario, donaciones) y resolución de errores post-lanzamiento.

---

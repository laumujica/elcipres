const {
  NothingEnum,
  VerticalJustification,
  Justification,
  PageNumberStyle,
  FitOptions,
} = require("indesign");

function createCenteredTitleFrame({
  page,
  contents,
  style,
  layout,
  config,
  top,
  bottom,
}) {
  const area =
    layout.getTextArea(page);

  const frame =
    page.textFrames.add();

  frame.geometricBounds = [
    config.mm(top),
    config.mm(area.left),
    config.mm(bottom),
    config.mm(area.right),
  ];

  frame.contents = contents;

  frame.textFramePreferences
    .verticalJustification =
      VerticalJustification.CENTER_ALIGN;

  layout.applyStyleToStory(
    frame.parentStory,
    style
  );

  return frame;
}

function createFrontMatter({
  document,
  data,
  styles,
  layout,
  config,
}) {
  // Half title: current first page.
  const halfTitlePage =
    document.pages.item(0);

  halfTitlePage.appliedMaster =
    NothingEnum.NOTHING;

  const usableTop =
    config.MARGIN_TOP;

  const usableBottom =
    config.PAGE_HEIGHT -
    config.MARGIN_BOTTOM;

  const usableCenter =
    (
      usableTop +
      usableBottom
    ) / 2;

  const coverTitleCenter =
    usableCenter -
    config.COVER_TITLE_OFFSET_UP;

  const coverTitleTop =
    coverTitleCenter -
    (
      config.COVER_TITLE_FRAME_HEIGHT /
      2
    );

  const coverTitleBottom =
    coverTitleCenter +
    (
      config.COVER_TITLE_FRAME_HEIGHT /
      2
    );

  createCenteredTitleFrame({
    page: halfTitlePage,
    contents: data.volume.title,
    style: styles.halfTitleStyle,
    layout,
    config,
    top: coverTitleTop,
    bottom: coverTitleBottom,
  });

  // Blank verso after half title.
  const halfTitleVerso =
    layout.createPageAtEnd();

  halfTitleVerso.appliedMaster =
    NothingEnum.NOTHING;

  // Full title page.
  const titlePage =
    layout.createPageAtEnd();

  titlePage.appliedMaster =
    NothingEnum.NOTHING;

  const titlePageTitleFrame =
    createCenteredTitleFrame({
      page: titlePage,
      contents: data.volume.title,
      style: styles.volumeTitleStyle,
      layout,
      config,
      top: 78,
      bottom: 108,
    });

  titlePageTitleFrame.fit(
    FitOptions.frameToContent
  );

  const titlePageTitleBottom =
    titlePageTitleFrame
      .geometricBounds[2];

  const titlePageAuthorFrame =
    createCenteredTitleFrame({
      page: titlePage,
      contents: "Walter Daniel Mujica",
      style: styles.titlePageAuthorStyle,
      layout,
      config,
      top:
        titlePageTitleBottom + 4,
      bottom:
        titlePageTitleBottom + 20,
    });

  titlePageAuthorFrame.fit(
    FitOptions.frameToContent
  );

  // Copyright / credits verso.
  const copyrightPage =
    layout.createPageAtEnd();

  copyrightPage.appliedMaster =
    NothingEnum.NOTHING;

  const copyrightArea =
    layout.getTextArea(
      copyrightPage
    );

  const creditsFrame =
    copyrightPage.textFrames.add();

  creditsFrame.geometricBounds = [
    config.mm(18),
    config.mm(copyrightArea.left),
    config.mm(150),
    config.mm(copyrightArea.right),
  ];

  creditsFrame.contents =
    "EL CIPRÉS\r\r" +
    "El otro yo · Walter Daniel Mujica\r" +
    "Primera edición, 2026\r" +
    "Córdoba, Argentina\r" +
    "Curaduría y edición\r" +
    "Agustina · Equipo Interdimensional\r" +
    "Diseño editorial, dirección visual y dirección de automatización\r" +
    "Laura Mujica\r" +
    "Desarrollo técnico, automatización y sistema editorial\r" +
    "Theo · ChatGPT (OpenAI) · Equipo Interdimensional\r" +
    "Extracción inicial y procesamiento digital de los textos\r" +
    "Laura Mujica, con asistencia de Claude (Anthropic)\r" +
    "Selección de imágenes para las aperturas de los movimientos\r" +
    "Fernanda Mujica y Daniela Mujica\r" +
    "Diseño de portada\r" +
    "Laura Mujica\r" +
    "Producción y encuadernación de esta edición\r" +
    "Laura Mujica\r" +
    "Esta edición fue desarrollada mediante un proceso editorial asistido por herramientas de inteligencia artificial. ChatGPT (OpenAI) y Claude (Anthropic) participaron en distintas etapas editoriales, técnicas y de producción. Las decisiones finales de selección, edición, estructura y diseño fueron realizadas por personas. Más información sobre el proceso en Sobre esta edición.";

  const creditsStory =
    creditsFrame.parentStory;

  const creditsStyles = [
    styles.creditsProjectStyle,
    styles.creditsTextStyle,
    styles.creditsProjectStyle,
    styles.creditsTextStyle,
    styles.creditsTextStyle,
    styles.creditsRoleStyle,
    styles.creditsTextStyle,
    styles.creditsRoleStyle,
    styles.creditsTextStyle,
    styles.creditsRoleStyle,
    styles.creditsTextStyle,
    styles.creditsRoleStyle,
    styles.creditsTextStyle,
    styles.creditsRoleStyle,
    styles.creditsTextStyle,
    styles.creditsRoleStyle,
    styles.creditsTextStyle,
    styles.creditsRoleStyle,
    styles.creditsTextStyle,
    styles.creditsNoteStyle,
  ];

  for (
    let i = 0;
    i < creditsStyles.length;
    i++
  ) {
    creditsStory.paragraphs
      .item(i)
      .applyParagraphStyle(
        creditsStyles[i],
        true
      );
  }

  const noteParagraph =
    creditsStory.paragraphs.item(
      creditsStyles.length - 1
    );

  const referenceText =
    "Sobre esta edición";

  const referenceStart =
    noteParagraph.contents.indexOf(
      referenceText
    );

  if (referenceStart >= 0) {
    noteParagraph.characters
      .itemByRange(
        referenceStart,
        referenceStart +
          referenceText.length - 1
      )
      .applyCharacterStyle(
        styles.creditsEmphasisStyle,
        true
      );
  }

  creditsFrame
    .textFramePreferences
    .verticalJustification =
      VerticalJustification.BOTTOM_ALIGN;

  const qrSize = 18;
  const qrTop = 153;

  const qrFrame =
    copyrightPage.rectangles.add();

  qrFrame.geometricBounds = [
    config.mm(qrTop),
    config.mm(copyrightArea.left),
    config.mm(qrTop + qrSize),
    config.mm(
      copyrightArea.left + qrSize
    ),
  ];

  qrFrame.strokeWeight = 0;

  qrFrame.place(
    "C:/GitHub/elcipres/INDD/assets/elcipres_qr.png"
  );

  qrFrame.fit(
    FitOptions.CONTENT_TO_FRAME
  );

  const websiteFrame =
    copyrightPage.textFrames.add();

  websiteFrame.geometricBounds = [
    config.mm(173),
    config.mm(copyrightArea.left),
    config.mm(181),
    config.mm(copyrightArea.right),
  ];

  websiteFrame.contents =
    "elcipres.com.ar";

  layout.applyStyleToStory(
    websiteFrame.parentStory,
    styles.creditsWebsiteStyle
  );

  const isbnFrame =
    copyrightPage.textFrames.add();

  isbnFrame.geometricBounds = [
    config.mm(185),
    config.mm(copyrightArea.left),
    config.mm(191),
    config.mm(copyrightArea.right),
  ];

  isbnFrame.contents =
    "Edición sin ISBN.";

  layout.applyStyleToStory(
    isbnFrame.parentStory,
    styles.creditsFooterStyle
  );

  // Table of contents opening.
  const tocPage =
    layout.createPageAtEnd();

  tocPage.appliedMaster =
    NothingEnum.NOTHING;

  // Temporary alignment verso. The TOC module removes
  // and recreates it only if the final TOC length needs it.
  const tocAlignmentBlank =
    layout.createPageAtEnd();

  tocAlignmentBlank.appliedMaster =
    NothingEnum.NOTHING;

  // Prologue begins the counted section at page 1,
  // but keeps the folio hidden.
  const prologuePage =
    layout.createPageAtEnd();

  prologuePage.appliedMaster =
    NothingEnum.NOTHING;

  document.sections.add(
    prologuePage,
    {
      continueNumbering: false,
      pageNumberStart: 1,
      pageNumberStyle:
        PageNumberStyle.ARABIC,
    }
  );

  const prologueArea =
    layout.getTextArea(
      prologuePage
    );

  const prologueTitleFrame =
    prologuePage.textFrames.add();

  prologueTitleFrame.geometricBounds = [
    config.mm(prologueArea.top),
    config.mm(prologueArea.left),
    config.mm(
      prologueArea.top + 35
    ),
    config.mm(prologueArea.right),
  ];

  prologueTitleFrame.contents =
    "Prólogo";

  layout.applyStyleToStory(
    prologueTitleFrame.parentStory,
    styles.frontMatterTitleStyle
  );

  prologueTitleFrame.fit(
    FitOptions.frameToContent
  );

  const prologueBodyTop =
    prologueTitleFrame
      .geometricBounds[2] + 4;

  const prologueBodyFrame =
    prologuePage.textFrames.add();

  prologueBodyFrame.geometricBounds = [
    config.mm(prologueBodyTop),
    config.mm(prologueArea.left),
    config.mm(prologueArea.bottom),
    config.mm(prologueArea.right),
  ];

  const prologueParagraphs = [
    {
      text:
        "Lo lindo de las metáforas es que nos permiten reconocer lo ordinario dentro de formas abstractas y hablar de aquello que nos importa sin tener que ir directamente al centro del mensaje. En la escritura, ese rodeo puede volverse dramático, pero también valioso: lleva una vulnerabilidad implícita y nos ofrece una manera práctica de darles voz y palabras a las cosas que queremos compartir.",
    },
    {
      text:
        "Podemos pensar a un ser humano como un árbol, como un pájaro, como un vuelo o como un proceso, y buscar una forma poética de hablar sobre lo mundano de existir; sobre cómo la rutina pierde color y gana peso cuando no se proyecta en algo más. Vivimos porque somos y estamos, pero la manera en que atravesamos y expresamos la vida mediante distintas formas del arte nos permite conectar con las cosas más sutiles y bellas de la existencia. Tal vez allí encontremos un propósito; o tal vez seamos nosotros quienes lo construimos para no volvernos grises ni perdernos en la homogeneidad.",
    },
    {
      text:
        "Hay personas que son artistas natas y conectan de una forma profundamente humana e hipersensible con el mundo que las rodea: con la fracción que les pertenece, con la de los demás y con la manera en que todas se encuentran. Sin embargo, por razones de la vida o por decisiones que nos superan, y bajo esa premisa que nos enseñan desde hace siglos —que siempre hay que hacer lo correcto—, algunos sueños quedan relegados. Es posible que el mundo exterior nunca llegue a conocerlos, aunque durante años hayan sido lo que mantuvo vivo nuestro pulso.",
    },
    {
      text:
        "En el caso de mi papá, solo quienes lo conocemos profundamente sabemos que es un artista, creador, poeta y soñador. Tuvo pocas oportunidades de vivir de aquello que deseó y que durante mucho tiempo intentó convertir en el centro de su vida. Aunque terminó imponiéndose la obligación de hacer lo correcto, se mantuvo honesto y fiel a sí mismo, logró muchas cosas y conservó aquel sueño, dormido pero latente.",
    },
    {
      text:
        "En esta selección de escritos podemos ver cómo alguien que parece serio y tener las cosas bajo control guarda un mundo íntimo, reservado y profundamente humano. Ese mundo aparece sobre todo de noche, cuando el silencio permite escuchar la verdadera voz y el hastío empuja hacia afuera aquello que prende fuego al corazón.",
    },
    {
      text:
        "Reunir en este formato tantos años de escritura y de contacto con sus sentimientos es un proyecto que llevo conmigo desde hace mucho tiempo. Hoy estoy muy contenta y agradecida por tener la posibilidad de ayudarlo a cumplir un sueño que nunca expresó en voz alta, quizás porque nunca sintió que tuviera permiso para hacerlo.",
    },
    {
      text:
        "Deseo que conecten con lo que lean a continuación, que estas páginas los lleven a lugares interesantes e inesperados y que las emociones que afloren les recuerden que nunca sabemos del todo qué sucede dentro de los demás. Incluso cuando parecen derrotados, siguen adelante.",
    },
    {
      text:
        "Gracias por ser parte de esto, de una forma u otra. Y gracias a mi papá por haber dejado un registro tan valioso de su vida. Aunque crea que nadie prestó atención, hay en estas páginas más metáforas de las que podríamos llegar a nombrar.",
    },
    {
      text:
        "Walter, por si nadie te lo dijo: sos un gran escritor. Te deseo mucho amor en la vida, en el tránsito y en todo lo que venga, dentro y fuera de este plano tangible.",
      spaceBeforeMm: 4,
    },
    {
      text:
        "Infinitas gracias por tu existencia y por ser quien sos. Insoportable, pero muy buena persona. Valoro eso más que cualquier otra cosa.",
    },
    {
      text:
        "Te admiro y te sigo queriendo.",
    },
    {
      text:
        "Está bien ser árbol. Está bien ser pájaro. Está bien ser o no ser.",
    },
    {
      text:
        "Gracias.",
    },
    {
      text:
        "Laura",
    },
  ];

  prologueBodyFrame.contents =
    prologueParagraphs
      .map(
        (paragraph) =>
          paragraph.text
      )
      .join("\r");

  const prologueStory =
    prologueBodyFrame.parentStory;

  layout.applyStyleToStory(
    prologueStory,
    styles.bodyStyle
  );

  prologueParagraphs.forEach(
    (paragraphData, index) => {
      if (
        typeof paragraphData
          .spaceBeforeMm ===
          "number"
      ) {
        prologueStory
          .paragraphs.item(index)
          .spaceBefore =
            config.mm(
              paragraphData
                .spaceBeforeMm
            );
      }
    }
  );

  prologueStory.recompose();

  let currentPrologueFrame =
    prologueBodyFrame;

  let prologueContinuationCount =
    0;

  while (
    currentPrologueFrame.overflows &&
    prologueContinuationCount < 10
  ) {
    const continuationPage =
      layout.createPageAtEnd();

    const continuationArea =
      layout.getTextArea(
        continuationPage
      );

    const continuationFrame =
      continuationPage
        .textFrames.add();

    continuationFrame.geometricBounds = [
      config.mm(
        continuationArea.top
      ),
      config.mm(
        continuationArea.left
      ),
      config.mm(
        continuationArea.bottom
      ),
      config.mm(
        continuationArea.right
      ),
    ];

    currentPrologueFrame
      .nextTextFrame =
        continuationFrame;

    prologueStory.recompose();

    currentPrologueFrame =
      continuationFrame;

    prologueContinuationCount++;
  }

  if (
    currentPrologueFrame.overflows
  ) {
    throw new Error(
      "Prologue exceeded 10 continuation pages."
    );
  }

  return {
    halfTitlePage,
    halfTitleVerso,
    titlePage,
    copyrightPage,
    tocPage,
    tocAlignmentBlank,
    prologuePage,
  };
}

module.exports = {
  createFrontMatter,
};

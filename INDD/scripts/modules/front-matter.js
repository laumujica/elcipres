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

  const projectFrame =
    copyrightPage.textFrames.add();

  projectFrame.geometricBounds = [
    config.mm(18),
    config.mm(copyrightArea.left),
    config.mm(26),
    config.mm(copyrightArea.right),
  ];

  projectFrame.contents =
    "EL CIPRÉS";

  layout.applyStyleToStory(
    projectFrame.parentStory,
    styles.creditsProjectStyle
  );

  const creditsFrame =
    copyrightPage.textFrames.add();

  creditsFrame.geometricBounds = [
    config.mm(30),
    config.mm(copyrightArea.left),
    config.mm(150),
    config.mm(copyrightArea.right),
  ];

  creditsFrame.contents =
    "El Otro Yo · Walter Daniel Mujica\r" +
    "Primera edición, 2026\r" +
    "Córdoba, Argentina\r" +
    "Edición\r" +
    "Agustina · Equipo Interdimensional\r" +
    "Diseño editorial, dirección visual y automatización\r" +
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
    "Esta edición fue desarrollada mediante un proceso editorial asistido por herramientas de inteligencia artificial. ChatGPT (OpenAI) y Claude (Anthropic) participaron en distintas etapas técnicas y de producción. Las decisiones de selección, edición, estructura y diseño fueron realizadas por personas. Más información sobre el proceso en Sobre esta edición.";

  const creditsStory =
    creditsFrame.parentStory;

  const creditsStyles = [
    styles.creditsTextStyle,
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
    "C:/GitHub/elcipres/INDD/assets/elcipres_qr.svg"
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
    "www.elcipres.com.ar";

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

  prologueBodyFrame.contents =
    "[Texto pendiente]";

  layout.applyStyleToStory(
    prologueBodyFrame.parentStory,
    styles.bodyStyle
  );

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

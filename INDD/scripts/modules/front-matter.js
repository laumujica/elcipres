const {
  NothingEnum,
  VerticalJustification,
  PageNumberStyle,
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

  createCenteredTitleFrame({
    page: titlePage,
    contents: data.volume.title,
    style: styles.volumeTitleStyle,
    layout,
    config,
    top: 65,
    bottom: 105,
  });

  createCenteredTitleFrame({
    page: titlePage,
    contents: "Walter Daniel Mujica",
    style: styles.titlePageAuthorStyle,
    layout,
    config,
    top: 108,
    bottom: 126,
  });

  // Reserved copyright / credits verso.
  // It intentionally has no visible placeholder text.
  const copyrightPage =
    layout.createPageAtEnd();

  copyrightPage.appliedMaster =
    NothingEnum.NOTHING;

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

  const prologueBodyFrame =
    prologuePage.textFrames.add();

  prologueBodyFrame.geometricBounds = [
    config.mm(
      prologueArea.top + 40
    ),
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

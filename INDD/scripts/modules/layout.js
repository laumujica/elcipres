const {
  LocationOptions,
  SpecialCharacters,
  VerticalJustification,
} = require("indesign");

function createLayoutHelpers(
  document,
  styles,
  config
) {
  function applyStyleToStory(
    story,
    paragraphStyle
  ) {
    for (
      let i = 0;
      i < story.paragraphs.length;
      i++
    ) {
      story.paragraphs.item(i)
        .applyParagraphStyle(
          paragraphStyle,
          true
        );
    }
  }

  function isRightHandPage(page) {
    return (
      page.documentOffset % 2 === 0
    );
  }

  function getTextArea(page) {
    const rightHand =
      isRightHandPage(page);

    const left =
      rightHand
        ? config.MARGIN_INSIDE
        : config.MARGIN_OUTSIDE;

    const right =
      config.PAGE_WIDTH -
      (
        rightHand
          ? config.MARGIN_OUTSIDE
          : config.MARGIN_INSIDE
      );

    const top =
      config.MARGIN_TOP;

    const bottom =
      config.PAGE_HEIGHT -
      config.MARGIN_BOTTOM -
      config.FOLIO_HEIGHT -
      4 +
      config.BODY_BOTTOM_EXTENSION;

    return {
      left,
      right,
      top,
      bottom,
    };
  }

  function getParentTextArea(
    rightHand
  ) {
    const left =
      rightHand
        ? config.MARGIN_INSIDE
        : config.MARGIN_OUTSIDE;

    const right =
      config.PAGE_WIDTH -
      (
        rightHand
          ? config.MARGIN_OUTSIDE
          : config.MARGIN_INSIDE
      );

    return {
      left,
      right,
    };
  }

  const contentParent =
    document.masterSpreads.item(0);

  contentParent.namePrefix = "A";
  contentParent.baseName = "Content";

  const parentLeftPage =
    contentParent.pages.item(0);

  const parentRightPage =
    contentParent.pages.item(1);

  function addParentFolio(
    parentPage,
    rightHand
  ) {
    const area =
      getParentTextArea(rightHand);

    const folioBottom =
      config.PAGE_HEIGHT -
      config.FOLIO_BOTTOM_SAFE;

    const folioTop =
      folioBottom -
      config.FOLIO_HEIGHT;

    const folioFrame =
      parentPage.textFrames.add();

    folioFrame.geometricBounds = [
      config.mm(folioTop),
      config.mm(area.left),
      config.mm(folioBottom),
      config.mm(area.right),
    ];

    folioFrame.contents =
      SpecialCharacters.AUTO_PAGE_NUMBER;

    folioFrame
      .textFramePreferences
      .verticalJustification =
        VerticalJustification.CENTER_ALIGN;

    applyStyleToStory(
      folioFrame.parentStory,
      styles.folioStyle
    );
  }

  addParentFolio(
    parentLeftPage,
    false
  );

  addParentFolio(
    parentRightPage,
    true
  );

  function createPageAtEnd() {
    const lastPage =
      document.pages.item(
        document.pages.length - 1
      );

    const newPage =
      document.pages.add(
        LocationOptions.AFTER,
        lastPage
      );

    newPage.appliedMaster =
      contentParent;

    return newPage;
  }

  return {
    applyStyleToStory,
    isRightHandPage,
    getTextArea,
    getParentTextArea,
    createPageAtEnd,
    contentParent,
  };
}

module.exports = {
  createLayoutHelpers,
};

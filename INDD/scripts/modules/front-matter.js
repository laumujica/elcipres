const {
  NothingEnum,
  VerticalJustification,
} = require("indesign");

function createFrontMatter({
  document,
  data,
  styles,
  layout,
  config,
}) {
  const volumePage =
    document.pages.item(0);

  volumePage.appliedMaster =
    NothingEnum.NOTHING;

  const volumeArea =
    layout.getTextArea(volumePage);

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

  const volumeTitleFrame =
    volumePage.textFrames.add();

  volumeTitleFrame.geometricBounds = [
    config.mm(coverTitleTop),
    config.mm(volumeArea.left),
    config.mm(coverTitleBottom),
    config.mm(volumeArea.right),
  ];

  volumeTitleFrame.contents =
    data.volume.title;

  volumeTitleFrame
    .textFramePreferences
    .verticalJustification =
      VerticalJustification.CENTER_ALIGN;

  layout.applyStyleToStory(
    volumeTitleFrame.parentStory,
    styles.volumeTitleStyle
  );

  const blankVerso =
    layout.createPageAtEnd();

  blankVerso.appliedMaster =
    NothingEnum.NOTHING;
}

module.exports = {
  createFrontMatter,
};

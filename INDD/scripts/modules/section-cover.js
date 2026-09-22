const {
  NothingEnum,
  VerticalJustification,
} = require("indesign");

function formatSectionDateRange(
  dateRange
) {
  const years =
    dateRange.match(/\b\d{4}\b/g);

  if (
    !years ||
    years.length === 0
  ) {
    return dateRange;
  }

  const firstYear =
    years[0];

  const lastYear =
    years[years.length - 1];

  if (
    firstYear === lastYear
  ) {
    return firstYear;
  }

  return (
    `${firstYear}–${lastYear}`
  );
}

function createSectionCover({
  document,
  item,
  page,
  styles,
  layout,
  config,
}) {
  page.appliedMaster =
    NothingEnum.NOTHING;

  const backgroundFrame =
    page.rectangles.add();

  backgroundFrame.geometricBounds = [
    config.mm(0),
    config.mm(0),
    config.mm(config.PAGE_HEIGHT),
    config.mm(config.PAGE_WIDTH),
  ];

  backgroundFrame.fillColor =
    document.colors.item("Black");

  backgroundFrame.fillTint = 10;
  backgroundFrame.strokeWeight = 0;

  const titleFrame =
    page.textFrames.add();

  titleFrame.geometricBounds = [
    config.mm(55),
    config.mm(15),
    config.mm(125),
    config.mm(
      config.PAGE_WIDTH - 15
    ),
  ];

  titleFrame.contents =
    item.title;

  titleFrame
    .textFramePreferences
    .verticalJustification =
      VerticalJustification.CENTER_ALIGN;

  layout.applyStyleToStory(
    titleFrame.parentStory,
    styles.sectionCoverTitleStyle
  );

  if (
    item.dateRange &&
    item.dateRange.trim() !== ""
  ) {
    const dateRangeFrame =
      page.textFrames.add();

    dateRangeFrame.geometricBounds = [
      config.mm(128),
      config.mm(15),
      config.mm(142),
      config.mm(
        config.PAGE_WIDTH - 15
      ),
    ];

    dateRangeFrame.contents =
      formatSectionDateRange(
        item.dateRange
      );

    layout.applyStyleToStory(
      dateRangeFrame.parentStory,
      styles.sectionCoverDateRangeStyle
    );
  }
}

module.exports = {
  createSectionCover,
  formatSectionDateRange,
};

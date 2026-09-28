const {
  NothingEnum,
  FitOptions,
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

  const area =
    layout.getTextArea(page);

  const imageSize = 30;
  const imageTitleGap = 5;
  const titleDateGap = 8;

  // Build the text frames first so their real heights
  // can be measured before centering the full cover block.
  const titleFrame =
    page.textFrames.add();

  titleFrame.geometricBounds = [
    config.mm(0),
    config.mm(area.left),
    config.mm(40),
    config.mm(area.right),
  ];

  titleFrame.contents =
    item.title;

  layout.applyStyleToStory(
    titleFrame.parentStory,
    styles.sectionCoverTitleStyle
  );

  titleFrame.fit(
    FitOptions.frameToContent
  );

  const titleHeight =
    titleFrame.geometricBounds[2] -
    titleFrame.geometricBounds[0];

  let dateRangeFrame = null;
  let dateHeight = 0;

  if (
    item.dateRange &&
    item.dateRange.trim() !== ""
  ) {
    dateRangeFrame =
      page.textFrames.add();

    dateRangeFrame.geometricBounds = [
      config.mm(0),
      config.mm(area.left),
      config.mm(20),
      config.mm(area.right),
    ];

    dateRangeFrame.contents =
      formatSectionDateRange(
        item.dateRange
      );

    layout.applyStyleToStory(
      dateRangeFrame.parentStory,
      styles.sectionCoverDateRangeStyle
    );

    dateRangeFrame.fit(
      FitOptions.frameToContent
    );

    dateHeight =
      dateRangeFrame.geometricBounds[2] -
      dateRangeFrame.geometricBounds[0];
  }

  const blockHeight =
    imageSize +
    imageTitleGap +
    titleHeight +
    (
      dateRangeFrame
        ? titleDateGap + dateHeight
        : 0
    );

  const blockTop =
    area.top +
    (
      area.bottom -
      area.top -
      blockHeight
    ) / 2;

  const areaCenter =
    (area.left + area.right) / 2;

  const imageLeft =
    areaCenter -
    imageSize / 2;

  // Placeholder for the movement illustration.
  // The same frame will later receive the real image.
  const imageFrame =
    page.rectangles.add();

  imageFrame.geometricBounds = [
    config.mm(blockTop),
    config.mm(imageLeft),
    config.mm(
      blockTop + imageSize
    ),
    config.mm(
      imageLeft + imageSize
    ),
  ];

  imageFrame.fillColor =
    document.swatches.item("None");

  imageFrame.strokeColor =
    document.colors.item("Black");

  imageFrame.strokeTint = 20;
  imageFrame.strokeWeight = 0.5;

  imageFrame.name =
    `Section Cover Image · ${item.id}`;

  const titleTop =
    blockTop +
    imageSize +
    imageTitleGap;

  titleFrame.geometricBounds = [
    config.mm(titleTop),
    config.mm(area.left),
    config.mm(
      titleTop + titleHeight
    ),
    config.mm(area.right),
  ];

  if (dateRangeFrame) {
    const dateTop =
      titleTop +
      titleHeight +
      titleDateGap;

    dateRangeFrame.geometricBounds = [
      config.mm(dateTop),
      config.mm(area.left),
      config.mm(
        dateTop + dateHeight
      ),
      config.mm(area.right),
    ];
  }
}

module.exports = {
  createSectionCover,
  formatSectionDateRange,
};

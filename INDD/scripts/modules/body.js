const {
  FitOptions,
} = require("indesign");

function detectBodyStyle(
  block,
  styles
) {
  return block.includes("\n")
    ? styles.bodyVerseStyle
    : styles.bodyStyle;
}

function prepareBodyBlocks(
  bodyBlocks,
  styles
) {
  return bodyBlocks.map(
    (block) => ({
      contents: block,
      style:
        detectBodyStyle(
          block,
          styles
        ),
    })
  );
}

function applyPreparedBodyStylesToStory(
  story,
  preparedBlocks,
  styles
) {
  for (
    let i = 0;
    i < story.paragraphs.length;
    i++
  ) {
    const preparedBlock =
      preparedBlocks[i];

    const style =
      preparedBlock
        ? preparedBlock.style
        : styles.bodyStyle;

    story.paragraphs.item(i)
      .applyParagraphStyle(
        style,
        true
      );
  }
}

function createText({
  text,
  page,
  styles,
  layout,
  config,
  generationStats,
}) {
  const area =
    layout.getTextArea(page);

  const dateFrame =
    page.textFrames.add();

  dateFrame.geometricBounds = [
    config.mm(area.top),
    config.mm(area.left),
    config.mm(area.top + 6),
    config.mm(area.right),
  ];

  dateFrame.contents =
    text.originalDate;

  layout.applyStyleToStory(
    dateFrame.parentStory,
    styles.dateStyle
  );

  const titleTop =
    area.top +
    6 +
    config.DATE_TITLE_GAP;

  const textTitleFrame =
    page.textFrames.add();

  textTitleFrame.geometricBounds = [
    config.mm(titleTop),
    config.mm(area.left),
    config.mm(titleTop + 30),
    config.mm(area.right),
  ];

  textTitleFrame.contents =
    text.title;

  layout.applyStyleToStory(
    textTitleFrame.parentStory,
    styles.textTitleStyle
  );

  textTitleFrame.parentStory
    .recompose();

  textTitleFrame.fit(
    FitOptions.frameToContent
  );

  const titleBounds =
    textTitleFrame.geometricBounds;

  const titleBottom =
    titleBounds[2];

  const bodyTop =
    titleBottom +
    config.TITLE_BODY_GAP;

  const bodyFrame =
    page.textFrames.add();

  bodyFrame.geometricBounds = [
    config.mm(bodyTop),
    config.mm(area.left),
    config.mm(area.bottom),
    config.mm(area.right),
  ];

  const preparedBodyBlocks =
    prepareBodyBlocks(
      text.body,
      styles
    );

  bodyFrame.contents =
    preparedBodyBlocks
      .map(
        (block) =>
          block.contents
      )
      .join("\r");

  applyPreparedBodyStylesToStory(
    bodyFrame.parentStory,
    preparedBodyBlocks,
    styles
  );

  bodyFrame.parentStory
    .recompose();

  let currentFrame =
    bodyFrame;

  let continuationCount = 0;

  while (
    currentFrame.overflows &&
    continuationCount <
      config.MAX_CONTINUATION_PAGES
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

    currentFrame.nextTextFrame =
      continuationFrame;

    bodyFrame.parentStory
      .recompose();

    currentFrame =
      continuationFrame;

    continuationCount++;
    generationStats
      .continuationPages++;
  }

  if (currentFrame.overflows) {
    throw new Error(
      `Overset detected: "${text.title}" exceeded ` +
      `${config.MAX_CONTINUATION_PAGES} continuation pages.`
    );
  }
}

module.exports = {
  createText,
  detectBodyStyle,
  prepareBodyBlocks,
};

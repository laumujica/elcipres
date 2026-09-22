const {
  FitOptions,
} = require("indesign");

function getBodyStyle(
  blockType,
  styles
) {
  if (blockType === "prose") {
    return styles.bodyStyle;
  }

  if (
    blockType === "verse" ||
    blockType === "visual"
  ) {
    return styles.bodyVerseStyle;
  }

  throw new Error(
    `Unsupported body block type: "${blockType}".`
  );
}

function prepareBodyBlocks(
  bodyBlocks,
  styles
) {
  return bodyBlocks.map(
    (block) => ({
      contents: block.contents,
      type: block.type,
      style: getBodyStyle(
        block.type,
        styles
      ),
    })
  );
}

function applyPreparedBodyStylesToStory(
  story,
  preparedBlocks,
  keepTogether
) {
  for (
    let i = 0;
    i < story.paragraphs.length;
    i++
  ) {
    const preparedBlock =
      preparedBlocks[i];

    if (!preparedBlock) {
      throw new Error(
        `Body paragraph ${i + 1} has no matching structured block.`
      );
    }

    const paragraph =
      story.paragraphs.item(i);

    paragraph.applyParagraphStyle(
      preparedBlock.style,
      true
    );

    if (keepTogether) {
      paragraph.keepAllLinesTogether =
        true;

      if (
        i <
        story.paragraphs.length - 1
      ) {
        paragraph.keepWithNext = 1;
      }
    }
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

  const titleTop =
    area.top;

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
    text.keepTogether === true
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
  getBodyStyle,
  prepareBodyBlocks,
};

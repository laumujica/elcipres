const {
  FitOptions,
  NothingEnum,
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
  const preparedBlocks = [];

  bodyBlocks.forEach((block) => {
    if (block.type === "dated_entry") {
      preparedBlocks.push({
        contents: block.date,
        type: "dated_entry_date",
        style: styles.datedEntryDateStyle,
        keepWithNext: 1,
      });

      preparedBlocks.push({
        contents: block.contents,
        type: "dated_entry_text",
        style: styles.bodyStyle,
      });

      return;
    }

    const explicitLineCount =
      block.contents.split("\n").length;

    preparedBlocks.push({
      contents: block.contents,
      type: block.type,
      style: getBodyStyle(
        block.type,
        styles
      ),
      explicitLineCount,
    });
  });

  return preparedBlocks;
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

    if (
      preparedBlock.keepWithNext
    ) {
      paragraph.keepWithNext =
        preparedBlock.keepWithNext;
    }

    if (
      preparedBlock.type === "verse"
    ) {
      if (
        preparedBlock.explicitLineCount <= 3
      ) {
        paragraph.keepAllLinesTogether =
          true;
      }

      else {
        paragraph.keepLinesTogether =
          true;

        paragraph.keepFirstLines = 2;
        paragraph.keepLastLines = 2;
      }
    }

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

function applySpacingRescue(
  story,
  preparedBlocks
) {
  for (
    let i = 0;
    i < story.paragraphs.length;
    i++
  ) {
    const preparedBlock =
      preparedBlocks[i];

    if (!preparedBlock) {
      continue;
    }

    if (
      preparedBlock.type ===
        "dated_entry_date"
    ) {
      continue;
    }

    story.paragraphs.item(i)
      .spaceAfter = 0;
  }

  story.recompose();
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
  const continuationFrames = [];
  const continuationPages = [];

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

    continuationFrames.push(
      continuationFrame
    );

    continuationPages.push(
      continuationPage
    );

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

  if (
    continuationFrames.length > 0 &&
    currentFrame.lines.length === 1
  ) {
    applySpacingRescue(
      bodyFrame.parentStory,
      preparedBodyBlocks
    );

    if (
      currentFrame.lines.length === 0
    ) {
      const lastIndex =
        continuationFrames.length - 1;

      const previousFrame =
        lastIndex === 0
          ? bodyFrame
          : continuationFrames[
              lastIndex - 1
            ];

      previousFrame.nextTextFrame =
        NothingEnum.NOTHING;

      continuationPages[
        lastIndex
      ].remove();

      generationStats
        .continuationPages--;
    }
  }
}

module.exports = {
  createText,
  getBodyStyle,
  prepareBodyBlocks,
};

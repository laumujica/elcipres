const {
  LocationOptions,
  NothingEnum,
} = require("indesign");

function getNoFolioArea(
  page,
  layout,
  config
) {
  const standard =
    layout.getTextArea(page);

  return {
    left: standard.left,
    right: standard.right,
    top: config.MARGIN_TOP,
    bottom:
      config.PAGE_HEIGHT -
      config.MARGIN_BOTTOM,
  };
}

function createTocFrame({
  page,
  layout,
  config,
}) {
  const area =
    getNoFolioArea(
      page,
      layout,
      config
    );

  const frame =
    page.textFrames.add();

  frame.geometricBounds = [
    config.mm(area.top),
    config.mm(area.left),
    config.mm(area.bottom),
    config.mm(area.right),
  ];

  return frame;
}

function buildTocEntries({
  bodyEntries,
  backMatterEntries,
}) {
  const entries = [
    {
      kind: "section",
      title: "Prólogo",
      showPage: false,
    },
  ];

  bodyEntries.forEach(
    (entry) => {
      entries.push(entry);
    }
  );

  backMatterEntries.forEach(
    (entry) => {
      entries.push({
        kind: "back",
        title: entry.title,
        page: entry.page,
        showPage: true,
      });
    }
  );

  return entries;
}

function formatEntry(entry) {
  if (!entry.showPage) {
    return entry.title;
  }

  return (
    entry.title +
    "\t" +
    String(entry.page.name)
  );
}

function getEntryStyle(
  entry,
  styles
) {
  if (
    entry.kind === "section"
  ) {
    return styles.tocSectionStyle;
  }

  if (
    entry.kind === "back"
  ) {
    return styles.tocBackMatterStyle;
  }

  return styles.tocEntryStyle;
}

function applyTocStyles(
  story,
  entries,
  styles
) {
  story.paragraphs.item(0)
    .applyParagraphStyle(
      styles.frontMatterTitleStyle,
      true
    );

  entries.forEach(
    (entry, index) => {
      const paragraph =
        story.paragraphs.item(
          index + 1
        );

      paragraph.applyParagraphStyle(
        getEntryStyle(
          entry,
          styles
        ),
        true
      );

      // "Prólogo" stays close to the TOC title.
      // Movement headings keep the larger section spacing.
      if (
        index === 0 &&
        entry.title === "Prólogo"
      ) {
        paragraph.spaceBefore = 0;
      }
    }
  );
}

function createTableOfContents({
  document,
  frontMatter,
  bodyEntries,
  backMatterEntries,
  styles,
  layout,
  config,
}) {
  const {
    tocPage,
    tocAlignmentBlank,
    prologuePage,
  } = frontMatter;

  if (
    tocAlignmentBlank &&
    tocAlignmentBlank.isValid
  ) {
    tocAlignmentBlank.remove();
  }

  const entries =
    buildTocEntries({
      bodyEntries,
      backMatterEntries,
    });

  const firstFrame =
    createTocFrame({
      page: tocPage,
      layout,
      config,
    });

  const contents = [
    "Índice",
    ...entries.map(formatEntry),
  ];

  firstFrame.contents =
    contents.join("\r");

  applyTocStyles(
    firstFrame.parentStory,
    entries,
    styles
  );

  firstFrame.parentStory
    .recompose();

  let currentFrame =
    firstFrame;

  const tocPages = [
    tocPage,
  ];

  while (currentFrame.overflows) {
    const page =
      document.pages.add(
        LocationOptions.BEFORE,
        prologuePage
      );

    page.appliedMaster =
      NothingEnum.NOTHING;

    const nextFrame =
      createTocFrame({
        page,
        layout,
        config,
      });

    currentFrame.nextTextFrame =
      nextFrame;

    firstFrame.parentStory
      .recompose();

    currentFrame =
      nextFrame;

    tocPages.push(page);

    if (tocPages.length > 10) {
      throw new Error(
        "TOC exceeded 10 pages."
      );
    }
  }

  // Every titled front-matter opening starts recto.
  // If the completed TOC leaves the prologue on a verso,
  // insert one unnumbered blank page before it.
  if (
    !layout.isRightHandPage(
      prologuePage
    )
  ) {
    const blankPage =
      document.pages.add(
        LocationOptions.BEFORE,
        prologuePage
      );

    blankPage.appliedMaster =
      NothingEnum.NOTHING;
  }

  return {
    entries,
    pages: tocPages,
  };
}

module.exports = {
  createTableOfContents,
  buildTocEntries,
};

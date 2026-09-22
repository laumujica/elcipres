const {
  NothingEnum,
} = require("indesign");

function toRoman(value) {
  const numerals = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let number = value;
  let result = "";

  numerals.forEach(
    ([unit, symbol]) => {
      while (number >= unit) {
        result += symbol;
        number -= unit;
      }
    }
  );

  return result;
}

function createWorkClosing({
  styles,
  layout,
  config,
}) {
  let closingPage =
    layout.createPageAtEnd();

  if (
    !layout.isRightHandPage(
      closingPage
    )
  ) {
    closingPage.appliedMaster =
      NothingEnum.NOTHING;

    closingPage =
      layout.createPageAtEnd();
  }

  closingPage.appliedMaster =
    NothingEnum.NOTHING;

  const titleFrame =
    closingPage.textFrames.add();

  titleFrame.geometricBounds = [
    config.mm(72),
    config.mm(config.MARGIN_INSIDE),
    config.mm(98),
    config.mm(
      config.PAGE_WIDTH -
      config.MARGIN_OUTSIDE
    ),
  ];

  titleFrame.contents =
    "EL OTRO YO";

  layout.applyStyleToStory(
    titleFrame.parentStory,
    styles.workClosingTitleStyle
  );

  const noteFrame =
    closingPage.textFrames.add();

  noteFrame.geometricBounds = [
    config.mm(108),
    config.mm(config.MARGIN_INSIDE),
    config.mm(120),
    config.mm(
      config.PAGE_WIDTH -
      config.MARGIN_OUTSIDE
    ),
  ];

  noteFrame.contents =
    "fin de la obra";

  layout.applyStyleToStory(
    noteFrame.parentStory,
    styles.workClosingNoteStyle
  );

  const blankVerso =
    layout.createPageAtEnd();

  blankVerso.appliedMaster =
    NothingEnum.NOTHING;

  return {
    closingPage,
    blankVerso,
  };
}

const BACK_MATTER_SECTIONS = [
  {
    id: "about-author",
    title: "Sobre el autor",
  },
  {
    id: "acknowledgements",
    title: "Agradecimientos",
  },
  {
    id: "editorial-note",
    title: "Nota editorial",
  },
  {
    id: "about-edition",
    title: "Sobre esta edición",
  },
];

function createBackMatter({
  styles,
  layout,
  config,
}) {
  const entries = [];

  BACK_MATTER_SECTIONS.forEach(
    (section) => {
      let page =
        layout.createPageAtEnd();

      if (
        !layout.isRightHandPage(
          page
        )
      ) {
        page.appliedMaster =
          NothingEnum.NOTHING;

        page =
          layout.createPageAtEnd();
      }

      const area =
        layout.getTextArea(page);

      const titleFrame =
        page.textFrames.add();

      titleFrame.geometricBounds = [
        config.mm(area.top),
        config.mm(area.left),
        config.mm(
          area.top + 35
        ),
        config.mm(area.right),
      ];

      titleFrame.contents =
        section.title;

      layout.applyStyleToStory(
        titleFrame.parentStory,
        styles.frontMatterTitleStyle
      );

      const bodyFrame =
        page.textFrames.add();

      bodyFrame.geometricBounds = [
        config.mm(
          area.top + 40
        ),
        config.mm(area.left),
        config.mm(area.bottom),
        config.mm(area.right),
      ];

      bodyFrame.contents =
        "[Texto pendiente]";

      layout.applyStyleToStory(
        bodyFrame.parentStory,
        styles.bodyStyle
      );

      entries.push({
        id: section.id,
        title: section.title,
        page,
      });
    }
  );

  // Closing page: a quiet editorial end mark.
  // It starts recto, has no visible folio, and is
  // followed by a final blank verso.
  let closingPage =
    layout.createPageAtEnd();

  if (
    !layout.isRightHandPage(
      closingPage
    )
  ) {
    closingPage.appliedMaster =
      NothingEnum.NOTHING;

    closingPage =
      layout.createPageAtEnd();
  }

  closingPage.appliedMaster =
    NothingEnum.NOTHING;

  const closingFrame =
    closingPage.textFrames.add();

  closingFrame.geometricBounds = [
    config.mm(
      config.PAGE_HEIGHT - 28
    ),
    config.mm(config.MARGIN_OUTSIDE),
    config.mm(
      config.PAGE_HEIGHT - 16
    ),
    config.mm(
      config.PAGE_WIDTH -
      config.MARGIN_OUTSIDE
    ),
  ];

  closingFrame.contents =
    toRoman(
      config.PUBLICATION_YEAR
    );

  layout.applyStyleToStory(
    closingFrame.parentStory,
    styles.closingYearStyle
  );

  const finalBlankVerso =
    layout.createPageAtEnd();

  finalBlankVerso.appliedMaster =
    NothingEnum.NOTHING;

  return entries;
}

module.exports = {
  createWorkClosing,
  createBackMatter,
  BACK_MATTER_SECTIONS,
  toRoman,
};

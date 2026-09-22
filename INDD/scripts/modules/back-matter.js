const {
  NothingEnum,
} = require("indesign");

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

      entries.push({
        id: section.id,
        title: section.title,
        page,
      });
    }
  );

  return entries;
}

module.exports = {
  createBackMatter,
  BACK_MATTER_SECTIONS,
};

const {
  NothingEnum,
  FitOptions,
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
    config.mm(82),
    config.mm(config.MARGIN_INSIDE),
    config.mm(104),
    config.mm(
      config.PAGE_WIDTH -
      config.MARGIN_OUTSIDE
    ),
  ];

  titleFrame.contents =
    "El otro yo";

  layout.applyStyleToStory(
    titleFrame.parentStory,
    styles.workClosingTitleStyle
  );

  titleFrame.fit(
    FitOptions.frameToContent
  );

  const noteTop =
    titleFrame.geometricBounds[2] + 4;

  const noteFrame =
    closingPage.textFrames.add();

  noteFrame.geometricBounds = [
    config.mm(noteTop),
    config.mm(config.MARGIN_INSIDE),
    config.mm(noteTop + 12),
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
    id: "epilogue",
    title: "Epílogo",
    contents:
      "[Nombre de la autora]\r[Texto pendiente]",
  },
  {
    id: "about-author",
    title: "Sobre el autor",
    contents: "[Texto pendiente]",
  },
  {
    id: "acknowledgements",
    title: "Agradecimientos",
    contents: "[Texto pendiente]",
  },
  {
    id: "editorial-note",
    title: "Nota editorial",
    contents:
      "Este libro comenzó mucho antes de ser un libro. Sus textos fueron publicados por Daniel en su blog, uno a uno, a lo largo del tiempo. Allí convivían poemas, relatos, reflexiones y composiciones visuales, acompañados por las marcas propias de aquel espacio digital. Transformar ese archivo en una obra impresa implicó algo más que trasladar palabras de un soporte a otro: fue necesario volver a leerlo como un conjunto.\r" +
      "Para esta edición se seleccionaron noventa textos, organizados cronológicamente en cinco movimientos. La curaduría buscó construir un recorrido capaz de mostrar distintas zonas de su escritura sin alterar la identidad de cada pieza. Se preservaron su vocabulario, sus imágenes, sus repeticiones, sus giros personales y su manera particular de construir el ritmo. Las intervenciones se limitaron principalmente a corregir errores ortográficos y ortotipográficos, distinguir párrafos y saltos deliberados, y ordenar la estructura necesaria para su composición. No se reescribieron los textos ni se intentó uniformar la voz de Daniel. Cuando una decisión podía modificar su sentido, se prefirió conservar el original.\r" +

      "El paso del blog al papel no buscó borrar el origen de estos textos, sino ofrecerles otro tiempo y otro modo de ser leídos: ya no como publicaciones dispersas en una pantalla, sino como partes de una misma voz que hoy encuentra lugar entre las páginas de un libro.\r" +
      "Agustina\rEditora",
  },
  {
    id: "about-edition",
    title: "Sobre esta edición",
    contents: "[Texto pendiente]",
  },
];

function createBackMatterContinuation({
  previousFrame,
  styles,
  layout,
  config,
}) {
  const page =
    layout.createPageAtEnd();

  const area =
    layout.getTextArea(page);

  const frame =
    page.textFrames.add();

  frame.geometricBounds = [
    config.mm(area.top),
    config.mm(area.left),
    config.mm(area.bottom),
    config.mm(area.right),
  ];

  previousFrame.nextTextFrame =
    frame;

  frame.parentStory.recompose();

  return {
    page,
    frame,
  };
}

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

      titleFrame.fit(
        FitOptions.frameToContent
      );

      const bodyTop =
        titleFrame.geometricBounds[2] + 4;

      const bodyFrame =
        page.textFrames.add();

      bodyFrame.geometricBounds = [
        config.mm(bodyTop),
        config.mm(area.left),
        config.mm(area.bottom),
        config.mm(area.right),
      ];

      bodyFrame.contents =
        section.contents ||
        "[Texto pendiente]";

      layout.applyStyleToStory(
        bodyFrame.parentStory,
        styles.bodyStyle
      );

      bodyFrame.parentStory
        .recompose();

      let currentFrame =
        bodyFrame;

      let continuationCount = 0;

      while (
        currentFrame.overflows &&
        continuationCount < 10
      ) {
        const continuation =
          createBackMatterContinuation({
            previousFrame:
              currentFrame,
            styles,
            layout,
            config,
          });

        currentFrame =
          continuation.frame;

        continuationCount++;
      }

      if (currentFrame.overflows) {
        throw new Error(
          `Back matter section "${section.title}" exceeded 10 continuation pages.`
        );
      }

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

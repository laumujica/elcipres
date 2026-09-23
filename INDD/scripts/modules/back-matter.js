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

  const imageWidth = 30;
  const imageHeight = 62;
  const imageTop = 63;
  const imageLeft =
    (config.PAGE_WIDTH - imageWidth) / 2;

  const imageFrame =
    closingPage.rectangles.add();

  imageFrame.geometricBounds = [
    config.mm(imageTop),
    config.mm(imageLeft),
    config.mm(imageTop + imageHeight),
    config.mm(imageLeft + imageWidth),
  ];

  imageFrame.strokeWeight = 0;

  imageFrame.place(
    "C:/GitHub/elcipres/INDD/assets/cipres.png"
  );

  imageFrame.fit(
    FitOptions.PROPORTIONALLY
  );

  imageFrame.fit(
    FitOptions.CENTER_CONTENT
  );

  const titleFrame =
    closingPage.textFrames.add();

  const titleTop =
    imageTop + imageHeight + 5;

  titleFrame.geometricBounds = [
    config.mm(titleTop),
    config.mm(config.MARGIN_INSIDE),
    config.mm(titleTop + 20),
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
    contents:
      "Walter Daniel Mujica nació el 8 de agosto de 1957 en Santiago del Estero, Argentina. Vivió sus primeros años en Cayastacito, un pequeño pueblo de esa provincia. Más tarde se trasladó con sus padres, Emilia y Francisco —“Pancho”—, su hermano mayor, Jorge, y su hermana menor, Lilian, a Laguna Paiva, por entonces un pueblo profundamente ligado a la actividad ferroviaria en la provincia de Santa Fe. Allí transcurrieron su infancia y adolescencia, y completó sus estudios secundarios.\rAl terminar la escuela se mudó a Córdoba para trabajar y comenzar la carrera de Odontología en la Universidad Nacional de Córdoba. Con el tiempo, la ciudad se convirtió en el lugar donde construyó la mayor parte de su vida. Allí nacieron y crecieron sus tres hijas: Laura, Fernanda y Daniela, sus “3M”, como le gustaba llamarlas.\rEl trabajo ocupó buena parte de sus días. Durante años llevó una vida exigente y rutinaria, repartida entre extensas jornadas laborales, responsabilidades cotidianas y el regreso a la casa que compartía con sus amadas gatas. En medio de esa rutina agotadora y aparentemente interminable, la escritura se convirtió en un espacio propio: una forma de salir por un momento de lo repetido, observar lo que lo rodeaba y poner en palabras aquello que no encontraba otro lugar donde existir.\rEn su perfil de Blogger resumió sus intereses en una sola palabra: aprender. Esa disposición atravesaba también su forma de escribir. No se presentaba como alguien que tuviera respuestas definitivas ni parecía buscar una identidad solemne de escritor. En su blog Intentos de..., bajo el título Algo de mí, dejó una de sus descripciones más personales:\r│  “Pasos desde la nada hacia más nada, transgrediendo y agrediendo mi escasa razón; un suicida de ideas que no dicen nada y sigo… ¿Sigo? Es lo que hay, lo que invento para ser algo de mí”.\rSu relación con los espacios literarios de internet comenzó mucho antes de la apertura de sus blogs personales. El 1 de noviembre de 2008 se registró en Mundo Poesía bajo el seudónimo cipres1957. Allí encontró un lugar para compartir sus escritos, leer a otros autores y participar activamente de una comunidad que con el tiempo lo reconocería como “poeta veterano en el portal”.\rSu perfil conserva una actividad literaria extraordinaria: trescientos ochenta y seis poemas, treinta y cinco prosas, más de un millón cien mil lecturas y más de trece mil comentarios. También reúne veintiún reconocimientos obtenidos a lo largo de los años, tanto por la calidad de sus textos como por su presencia constante dentro de la comunidad.\rVarias de sus obras fueron seleccionadas y distinguidas por el jurado del portal. Agitando el tintero (Así te siento) fue reconocido como Poema del mes; también fue elegido Poeta del mes en julio de 2010. Sino, Quise ser ciprés y El hombre circular recibieron la distinción de Poema del jurado. Vertical y El hombre circular fueron incluidos entre los poemas destacados, mientras que Estímulos, Tanto leño húmedo, Boca cerrada y otros escritos fueron recomendados por la comunidad o sus responsables editoriales. Su medallero también registra distinciones como Prosa rescatada y Escritor activo.\rPero su participación no se limitó a publicar su propia obra. Daniel leyó, comentó y acompañó de manera sostenida la escritura de otros. Superó los diez mil mensajes dentro del portal y recibió reconocimientos como Pilar del foro, Premio de crítica en los foros e Interacción y estímulo al usuario. Esas distinciones dan cuenta de algo que las cifras por sí solas no alcanzan a mostrar: su disposición para leer a los demás, conversar sobre poesía y alentar a quienes también buscaban un lugar para sus palabras.\rA lo largo de esos años hizo amigos en distintas provincias argentinas y en otros países. Con algunos llegó a encontrarse personalmente; con otros mantuvo vínculos que atravesaron distancias y permanecieron más allá de la pantalla. Ese afecto también alcanzó a su familia: durante distintos viajes por Latinoamérica, particularmente en Ecuador y Colombia, su hija Laura fue recibida con cariño por personas que habían conocido a Daniel a través de Mundo Poesía. Para ellas, él no era solamente un nombre de usuario, sino un amigo, un compañero de escritura y una presencia querida dentro de la comunidad.\rSus blogs personales ampliaron ese espacio de encuentro. Allí publicó poemas, haikus, microrrelatos y reflexiones, y recibió numerosos comentarios de lectores, muchos de ellos anónimos. En esos espacios podía escribir con mayor libertad, sostener sus búsquedas y dejar convivir textos muy distintos entre sí. En uno de sus perfiles resumió aquel tránsito con una frase breve: “Transcurro… busco mi espacio, solo eso”.\rTampoco encontraba demasiado sentido en las categorías cerradas. Cuando debía elegir una música favorita, respondía: “Ninguna en especial. Hasta la más simple puede parecer hermosa; depende del estado de ánimo”. Su escritura nació muchas veces de esa misma sensibilidad: de la posibilidad de encontrar algo digno de ser observado en lo cotidiano, lo pequeño, lo doloroso o lo aparentemente insignificante.\rSu manera de entender la escritura quedó expresada en una de las firmas con las que acompañaba sus publicaciones:\r│  “Si no te emociona, no lo escribas; si no te emociona, no lo leas. Por favor, no escribas para perfumar el baño los días que hay visita: escribí para el hombre que va a tu lado, el que llevamos dentro”.",
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

function applyCharacterStyleToText({
  story,
  text,
  style,
}) {
  const storyText =
    story.contents;

  let start =
    storyText.indexOf(text);

  while (start >= 0) {
    story.characters
      .itemByRange(
        start,
        start + text.length - 1
      )
      .applyCharacterStyle(
        style,
        true
      );

    start =
      storyText.indexOf(
        text,
        start + text.length
      );
  }
}

function styleAboutAuthorStory({
  story,
  styles,
}) {
  const quoteStarts = [
    "│  “Pasos desde la nada",
    "│  “Si no te emociona",
  ];

  for (
    let i = 0;
    i < story.paragraphs.length;
    i++
  ) {
    const paragraph =
      story.paragraphs.item(i);

    const contents =
      paragraph.contents;

    if (
      quoteStarts.some(
        (start) =>
          contents.indexOf(start) === 0
      )
    ) {
      paragraph.applyParagraphStyle(
        styles.backMatterQuoteStyle,
        true
      );
    }
  }

  [
    "aprender",
    "cipres1957",
  ].forEach((text) => {
    applyCharacterStyleToText({
      story,
      text,
      style:
        styles.backMatterBoldStyle,
    });
  });

  [
    "Intentos de...",
    "Algo de mí",
    "Agitando el tintero (Así te siento)",
    "Poema del mes",
    "Poeta del mes",
    "Sino",
    "Quise ser ciprés",
    "El hombre circular",
    "Poema del jurado",
    "Vertical",
    "Estímulos",
    "Tanto leño húmedo",
    "Boca cerrada",
    "Prosa rescatada",
    "Escritor activo",
    "Pilar del foro",
    "Premio de crítica en los foros",
    "Interacción y estímulo al usuario",
  ].forEach((text) => {
    applyCharacterStyleToText({
      story,
      text,
      style:
        styles.backMatterItalicStyle,
    });
  });
}

function addAboutAuthorQuoteRules({
  story,
  document,
  config,
}) {
  const quoteStarts = [
    "“Pasos desde la nada",
    "“Si no te emociona",
  ];

  for (
    let i = 0;
    i < story.paragraphs.length;
    i++
  ) {
    const paragraph =
      story.paragraphs.item(i);

    const contents =
      paragraph.contents;

    if (
      !quoteStarts.some(
        (start) =>
          contents.indexOf(start) === 0
      )
    ) {
      continue;
    }

    const lineCount =
      paragraph.lines.length;

    if (lineCount === 0) {
      continue;
    }

    let startIndex = 0;

    while (startIndex < lineCount) {
      const firstLine =
        paragraph.lines.item(
          startIndex
        );

      const firstFrame =
        firstLine.parentTextFrames[0];

      let endIndex =
        startIndex;

      while (
        endIndex + 1 <
        lineCount
      ) {
        const nextLine =
          paragraph.lines.item(
            endIndex + 1
          );

        const nextFrame =
          nextLine.parentTextFrames[0];

        if (
          nextFrame.id !==
          firstFrame.id
        ) {
          break;
        }

        endIndex++;
      }

      const lastLine =
        paragraph.lines.item(
          endIndex
        );

      const page =
        firstFrame.parentPage;

      const x =
        firstLine.horizontalOffset -
        config.mm(3);

      const top =
        firstLine.baseline -
        firstLine.ascent;

      const bottom =
        lastLine.baseline +
        lastLine.descent;

      const rule =
        page.graphicLines.add();

      rule.geometricBounds = [
        top,
        x,
        bottom,
        x,
      ];

      rule.strokeWeight =
        0.5;

      rule.strokeColor =
        document.colors.item(
          "Black"
        );

      startIndex =
        endIndex + 1;
    }
  }
}

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
  document,
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

      if (
        section.id === "about-author"
      ) {
        styleAboutAuthorStory({
          story:
            bodyFrame.parentStory,
          styles,
        });
      }

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

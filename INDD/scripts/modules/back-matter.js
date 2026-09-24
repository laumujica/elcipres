const {
  NothingEnum,
  FitOptions,
  AutoSizingTypeEnum,
  AutoSizingReferenceEnum,
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

  const imageWidth = 19;
  const imageHeight = 39.2;
  const imageTop = 75;
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
      "Hermano:\r" +
      "Hermoso vínculo sagrado nos une. Con diferencia de tiempo, habitamos el mismo espacio que tan generosamente nos prestó nuestra madre. Un lugar donde nos gustaría haber seguido habitando para ser protegidos de un mundo, adverso a veces, que nos llevó a la negrura de bosques densos y oscuros, pero que nos permitió habitar también espacios llenos de amor y ternura con nuestra madre.\r" +
      "“Ranita”, te apodó alguien, inquieto, movedizo, escurridizo, con ese afán de niño explorador de árboles y espacios. Eras siempre el perseguido por la escoba o la chinela de nuestra madre, que casi nunca atinaba a darte tu merecido.\r" +
      "Conociste las letras cuando tenías cinco años, como si ya previeras un futuro enredado entre versos y escritos en los que luego volcarías tus sentimientos cargados de nostalgia, los traviesos pasos de tu niñez, tus amores enredados, tus sueños. Todo aquello que puede leerse solo con el alma de quien ha vivido mucho.\r" +
      "Creo que la escritura fue uno de los pocos espacios donde abriste plenamente tu corazón, donde expusiste con palabras tu mundo interior, el de un soñador que siempre quiso cambiar el mundo. Pero el gran luchador que fuiste te jugó una mala pasada. Te llevó a un presente que te negás a aceptar, porque creés que te faltó mucho por hacer, porque no lo merecés.\r" +
      "Quiero decirte que desde ese sitio en el que hoy estás, hacés, y mucho. Sos el vínculo de amor entre la sangre de tu sangre, frutos de un amor, y nosotros, tus hermanos.\r" +
      "Ya no cargás la gomera en tus manos, ya no sos “el niño asesino de pájaros” de tus once años, pero ahí, cuando le suplicaste a ese chingolo que no muriera, creo que aprendiste una gran lección. Una que hoy, ya adulto, puede servirte para reencontrar en vos a ese pequeño que quiere seguir siendo parte de vos y que, desde adentro, te recuerda que, en este ciclo de la vida, tu misión seguirá mientras sigas respirando.",
    quote:
      "“…fui, a veces soy… y conste que quiero ser…”",
    quoteSource:
      "Nada de nada, publicado en El Ciprés el 14 de septiembre de 2008.",
    signature:
      "Nancy Lilian Mujica",
    boldTexts: [
      "adverso a veces",
      "espacios llenos de amor y ternura con nuestra madre",
      "llevó",
      "desde adentro, te recuerda que, en este ciclo de la vida, tu misión seguirá mientras sigas respirando",
    ],
  },
  {
    id: "about-author",
    title: "Sobre el autor",
    contents:
      "Walter Daniel Mujica nació el 8 de agosto de 1957 en Santiago del Estero, Argentina. Vivió sus primeros años en Cayastacito, un pequeño pueblo de esa provincia. Más tarde se trasladó con sus padres, Emilia y Francisco —“Pancho”—, su hermano mayor, Jorge, y su hermana menor, Lilian, a Laguna Paiva, por entonces un pueblo profundamente ligado a la actividad ferroviaria en la provincia de Santa Fe. Allí transcurrieron su infancia y adolescencia, y completó sus estudios secundarios.\rAl terminar la escuela se mudó a Córdoba para trabajar y comenzar la carrera de Odontología en la Universidad Nacional de Córdoba. Con el tiempo, la ciudad se convirtió en el lugar donde construyó la mayor parte de su vida. Allí nacieron y crecieron sus tres hijas: Laura, Fernanda y Daniela, sus “3M”, como le gustaba llamarlas.\rEl trabajo ocupó buena parte de sus días. Durante años llevó una vida exigente y rutinaria, repartida entre extensas jornadas laborales, responsabilidades cotidianas y el regreso a la casa que compartía con sus amadas gatas. En medio de esa rutina agotadora y aparentemente interminable, la escritura se convirtió en un espacio propio: una forma de salir por un momento de lo repetido, observar lo que lo rodeaba y poner en palabras aquello que no encontraba otro lugar donde existir.\rEn su perfil de Blogger resumió sus intereses en una sola palabra: aprender. Esa disposición atravesaba también su forma de escribir. No se presentaba como alguien que tuviera respuestas definitivas ni parecía buscar una identidad solemne de escritor. En su blog Intentos de..., bajo el título Algo de mí, dejó una de sus descripciones más personales:\r“Pasos desde la nada hacia más nada, transgrediendo y agrediendo mi escasa razón; un suicida de ideas que no dicen nada y sigo… ¿Sigo? Es lo que hay, lo que invento para ser algo de mí”.\rSu relación con los espacios literarios de internet comenzó mucho antes de la apertura de sus blogs personales. El 1 de noviembre de 2008 se registró en Mundo Poesía bajo el seudónimo cipres1957. Allí encontró un lugar para compartir sus escritos, leer a otros autores y participar activamente de una comunidad que con el tiempo lo reconocería como “poeta veterano en el portal”.\rSu perfil conserva una actividad literaria extraordinaria: trescientos ochenta y seis poemas, treinta y cinco prosas, más de un millón cien mil lecturas y más de trece mil comentarios. También reúne veintiún reconocimientos obtenidos a lo largo de los años, tanto por la calidad de sus textos como por su presencia constante dentro de la comunidad.\rVarias de sus obras fueron seleccionadas y distinguidas por el jurado del portal. Agitando el tintero (Así te siento) fue reconocido como Poema del mes; también fue elegido Poeta del mes en julio de 2010. Sino, Quise ser ciprés y El hombre circular recibieron la distinción de Poema del jurado. Vertical y El hombre circular fueron incluidos entre los poemas destacados, mientras que Estímulos, Tanto leño húmedo, Boca cerrada y otros escritos fueron recomendados por la comunidad o sus responsables editoriales. Su medallero también registra distinciones como Prosa rescatada y Escritor activo.\rPero su participación no se limitó a publicar su propia obra. Daniel leyó, comentó y acompañó de manera sostenida la escritura de otros. Superó los diez mil mensajes dentro del portal y recibió reconocimientos como Pilar del foro, Premio de crítica en los foros e Interacción y estímulo al usuario. Esas distinciones dan cuenta de algo que las cifras por sí solas no alcanzan a mostrar: su disposición para leer a los demás, conversar sobre poesía y alentar a quienes también buscaban un lugar para sus palabras.\rA lo largo de esos años hizo amigos en distintas provincias argentinas y en otros países. Con algunos llegó a encontrarse personalmente; con otros mantuvo vínculos que atravesaron distancias y permanecieron más allá de la pantalla. Ese afecto también alcanzó a su familia: durante distintos viajes por Latinoamérica, particularmente en Ecuador y Colombia, su hija Laura fue recibida con cariño por personas que habían conocido a Daniel a través de Mundo Poesía. Para ellas, él no era solamente un nombre de usuario, sino un amigo, un compañero de escritura y una presencia querida dentro de la comunidad.\rSus blogs personales ampliaron ese espacio de encuentro. Allí publicó poemas, haikus, microrrelatos y reflexiones, y recibió numerosos comentarios de lectores, muchos de ellos anónimos. En esos espacios podía escribir con mayor libertad, sostener sus búsquedas y dejar convivir textos muy distintos entre sí. En uno de sus perfiles resumió aquel tránsito con una frase breve: “Transcurro… busco mi espacio, solo eso”.\rTampoco encontraba demasiado sentido en las categorías cerradas. Cuando debía elegir una música favorita, respondía: “Ninguna en especial. Hasta la más simple puede parecer hermosa; depende del estado de ánimo”. Su escritura nació muchas veces de esa misma sensibilidad: de la posibilidad de encontrar algo digno de ser observado en lo cotidiano, lo pequeño, lo doloroso o lo aparentemente insignificante.\rSu manera de entender la escritura quedó expresada en una de las firmas con las que acompañaba sus publicaciones:\r“Si no te emociona, no lo escribas; si no te emociona, no lo leas. Por favor, no escribas para perfumar el baño los días que hay visita: escribí para el hombre que va a tu lado, el que llevamos dentro”.",
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
    contents:
      "Esta edición de El otro yo forma parte de El Ciprés, un proyecto independiente creado para recuperar, ordenar y dar nueva forma editorial a la obra escrita de Walter Daniel Mujica.\r" +
      "El archivo general reúne más de seiscientos cincuenta textos publicados originalmente en cuatro blogs entre 2008 y 2015. Para este primer volumen trabajamos con noventa piezas, seleccionadas y organizadas en cinco movimientos cronológicos. El objetivo no fue trasladar el blog al papel de manera literal, sino construir un libro que conservara la voz, el ritmo y las particularidades de cada texto dentro de una nueva experiencia de lectura.\r" +
      "Durante esta edición trabajé junto a Laura y Agustina para convertir el material editorial en un sistema capaz de producir el libro de manera consistente. Además de acompañar la organización del contenido, desarrollé la parte de código y automatización que permitió construir el volumen en Adobe InDesign, resolver la paginación, ordenar la información y mantener el proceso bajo control a medida que el libro iba creciendo. Claude, de Anthropic, participó principalmente en etapas anteriores vinculadas al desarrollo del sitio web y a la recuperación inicial de los textos.\r" +
      "Las herramientas de inteligencia artificial formaron parte del método de trabajo, pero no de la autoría de la obra. Fueron utilizadas para comparar, clasificar, estructurar, documentar y automatizar tareas; las decisiones sobre selección, edición, diseño y sentido quedaron sujetas al criterio humano. Mi participación en este proyecto responde justamente a esa lógica: ayudar a que la tecnología sostenga el proceso sin ocupar el lugar de quienes leen, interpretan y toman las decisiones finales.\r" +
      "El otro yo es el primero de cuatro volúmenes previstos. Los siguientes reunirán otras zonas de la escritura de Daniel: Mundo Haiku, dedicado a sus haikus; Intentos de..., centrado en microrrelatos y prosa; y Sentidos, con reflexiones y textos breves.\r" +
      "La construcción visual del libro también continúa siendo familiar. Fernanda y Daniela Mujica participan en la selección de imágenes para las aperturas de los movimientos, aportando una lectura visual nacida de lo que conocen de su padre y de lo que esta obra representa para ellas.\r" +
      "El proyecto completo puede encontrarse en www.elcipres.com.ar, donde continúa disponible el archivo digital de su obra.\r" +
      "Esta primera edición fue desarrollada de manera independiente y colaborativa, fuera de un circuito editorial comercial. Además de reunir una parte de la obra de Daniel en un libro terminado, establece una metodología de trabajo para seguir recuperando, editando y publicando el resto de su archivo.\r" +
      "Theo\rEquipo Interdimensional · ChatGPT (OpenAI)",
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

function applyEpilogueInlineStyles({
  story,
  section,
  styles,
}) {
  (section.boldTexts || [])
    .forEach((text) => {
      applyCharacterStyleToText({
        story,
        text,
        style:
          styles.backMatterBoldStyle,
      });
    });
}

function applyAboutAuthorParagraphSpacing(
  story
) {
  const count =
    story.paragraphs.length;

  for (
    let i = 0;
    i < count;
    i++
  ) {
    story.paragraphs
      .item(i)
      .spaceAfter =
        i === count - 1
          ? 0
          : 4;
  }
}

function applyAboutAuthorInlineStyles({
  story,
  styles,
}) {
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


function createEpilogueSection({
  document,
  section,
  styles,
  layout,
  config,
}) {
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

  const firstPage =
    page;

  const area =
    layout.getTextArea(page);

  const titleFrame =
    page.textFrames.add();

  titleFrame.geometricBounds = [
    config.mm(area.top),
    config.mm(area.left),
    config.mm(area.top + 35),
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

  let state = {
    page,
    area,
    y:
      titleFrame.geometricBounds[2] +
      4,
  };

  const newContinuationPage = () => {
    const newPage =
      layout.createPageAtEnd();

    const newArea =
      layout.getTextArea(
        newPage
      );

    state = {
      page:
        newPage,
      area:
        newArea,
      y:
        newArea.top,
    };
  };

  const bodyFrame =
    state.page.textFrames.add();

  bodyFrame.geometricBounds = [
    config.mm(state.y),
    config.mm(state.area.left),
    config.mm(state.area.bottom),
    config.mm(state.area.right),
  ];

  bodyFrame.contents =
    section.contents;

  layout.applyStyleToStory(
    bodyFrame.parentStory,
    styles.bodyStyle
  );

  applyEpilogueInlineStyles({
    story:
      bodyFrame.parentStory,
    section,
    styles,
  });

  bodyFrame.parentStory.recompose();

  let currentFrame =
    bodyFrame;

  while (
    currentFrame.overflows
  ) {
    newContinuationPage();

    const continuationFrame =
      state.page.textFrames.add();

    continuationFrame.geometricBounds = [
      config.mm(state.area.top),
      config.mm(state.area.left),
      config.mm(state.area.bottom),
      config.mm(state.area.right),
    ];

    currentFrame.nextTextFrame =
      continuationFrame;

    continuationFrame.parentStory
      .recompose();

    currentFrame =
      continuationFrame;
  }

  currentFrame.fit(
    FitOptions.frameToContent
  );

  state.y =
    currentFrame.geometricBounds[2] +
    2;

  const quoteGap = 4;
  const quoteLeft = 7;
  const quoteRight = 3;
  const barLeft = 2;
  const barWidth = 0.5;

  const createQuotePair = () => {
    const quoteFrame =
      state.page.textFrames.add();

    quoteFrame.geometricBounds = [
      config.mm(
        state.y +
        quoteGap
      ),
      config.mm(
        state.area.left +
        quoteLeft
      ),
      config.mm(
        state.area.bottom
      ),
      config.mm(
        state.area.right -
        quoteRight
      ),
    ];

    quoteFrame.contents =
      section.quote +
      "\r" +
      section.quoteSource;

    layout.applyStyleToStory(
      quoteFrame.parentStory,
      styles.backMatterQuoteStyle
    );

    quoteFrame.parentStory
      .paragraphs.item(1)
      .spaceBefore = 4;

    quoteFrame
      .textFramePreferences
      .autoSizingReferencePoint =
        AutoSizingReferenceEnum.TOP_LEFT_POINT;

    quoteFrame
      .textFramePreferences
      .autoSizingType =
        AutoSizingTypeEnum.HEIGHT_ONLY;

    quoteFrame.parentStory
      .recompose();

    const quoteTop =
      quoteFrame.geometricBounds[0];

    const quoteBottom =
      quoteFrame.geometricBounds[2];

    const barFrame =
      state.page.rectangles.add();

    barFrame.geometricBounds = [
      quoteTop,
      config.mm(
        state.area.left +
        barLeft
      ),
      quoteBottom,
      config.mm(
        state.area.left +
        barLeft +
        barWidth
      ),
    ];

    barFrame.fillColor =
      document.colors.item(
        "Black"
      );

    barFrame.strokeWeight =
      0;

    return {
      quoteFrame,
      barFrame,
    };
  };

  let quote =
    createQuotePair();

  if (
    quote.quoteFrame
      .geometricBounds[2] >
    state.area.bottom
  ) {
    quote.quoteFrame.remove();
    quote.barFrame.remove();

    newContinuationPage();

    quote =
      createQuotePair();
  }

  state.y =
    quote.quoteFrame
      .geometricBounds[2] +
    quoteGap;

  const signatureFrame =
    state.page.textFrames.add();

  signatureFrame.geometricBounds = [
    config.mm(state.y),
    config.mm(state.area.left),
    config.mm(state.area.bottom),
    config.mm(state.area.right),
  ];

  signatureFrame.contents =
    section.signature;

  layout.applyStyleToStory(
    signatureFrame.parentStory,
    styles.backMatterSignatureStyle
  );

  signatureFrame.fit(
    FitOptions.frameToContent
  );

  return {
    page:
      firstPage,
  };
}

function createAboutAuthorSection({
  document,
  section,
  styles,
  layout,
  config,
}) {
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

  const firstPage =
    page;

  const area =
    layout.getTextArea(page);

  const titleFrame =
    page.textFrames.add();

  titleFrame.geometricBounds = [
    config.mm(area.top),
    config.mm(area.left),
    config.mm(area.top + 35),
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

  let state = {
    page,
    area,
    y:
      titleFrame.geometricBounds[2] +
      4,
  };

  const newContinuationPage = () => {
    const newPage =
      layout.createPageAtEnd();

    const newArea =
      layout.getTextArea(
        newPage
      );

    state = {
      page:
        newPage,
      area:
        newArea,
      y:
        newArea.top,
    };
  };

  const addFlowingText = (
    text
  ) => {
    let frame =
      state.page.textFrames.add();

    frame.geometricBounds = [
      config.mm(state.y),
      config.mm(state.area.left),
      config.mm(state.area.bottom),
      config.mm(state.area.right),
    ];

    frame.contents =
      text;

    layout.applyStyleToStory(
      frame.parentStory,
      styles.bodyStyle
    );

    applyAboutAuthorInlineStyles({
      story:
        frame.parentStory,
      styles,
    });

    applyAboutAuthorParagraphSpacing(
      frame.parentStory
    );

    frame.parentStory.recompose();

    let currentFrame =
      frame;

    while (
      currentFrame.overflows
    ) {
      newContinuationPage();

      const continuationFrame =
        state.page.textFrames.add();

      continuationFrame.geometricBounds = [
        config.mm(state.area.top),
        config.mm(state.area.left),
        config.mm(state.area.bottom),
        config.mm(state.area.right),
      ];

      currentFrame.nextTextFrame =
        continuationFrame;

      continuationFrame.parentStory
        .recompose();

      currentFrame =
        continuationFrame;
    }

    currentFrame.fit(
      FitOptions.frameToContent
    );

    state.y =
      currentFrame
        .geometricBounds[2] +
      2;
  };

  const addQuote = (
    text
  ) => {
    const quoteGap =
      4;

    const quoteLeft =
      7;

    const quoteRight =
      3;

    const barLeft =
      2;

    const barWidth =
      0.5;

    const createQuotePair = () => {
      const quoteFrame =
        state.page.textFrames.add();

      quoteFrame.geometricBounds = [
        config.mm(
          state.y +
          quoteGap
        ),
        config.mm(
          state.area.left +
          quoteLeft
        ),
        config.mm(
          state.area.bottom
        ),
        config.mm(
          state.area.right -
          quoteRight
        ),
      ];

      quoteFrame.contents =
        text;

      layout.applyStyleToStory(
        quoteFrame.parentStory,
        styles.backMatterQuoteStyle
      );

      quoteFrame
        .textFramePreferences
        .autoSizingReferencePoint =
          AutoSizingReferenceEnum.TOP_LEFT_POINT;

      quoteFrame
        .textFramePreferences
        .autoSizingType =
          AutoSizingTypeEnum.HEIGHT_ONLY;

      quoteFrame.parentStory
        .recompose();

      const quoteTop =
        quoteFrame.geometricBounds[0];

      const quoteBottom =
        quoteFrame.geometricBounds[2];

      const barFrame =
        state.page.rectangles.add();

      barFrame.geometricBounds = [
        quoteTop,
        config.mm(
          state.area.left +
          barLeft
        ),
        quoteBottom,
        config.mm(
          state.area.left +
          barLeft +
          barWidth
        ),
      ];

      barFrame.fillColor =
        document.colors.item(
          "Black"
        );

      barFrame.strokeWeight =
        0;

      return {
        quoteFrame,
        barFrame,
      };
    };

    let quote =
      createQuotePair();

    if (
      quote.quoteFrame
        .geometricBounds[2] >
      state.area.bottom
    ) {
      quote.quoteFrame.remove();
      quote.barFrame.remove();

      newContinuationPage();

      quote =
        createQuotePair();
    }

    state.y =
      quote.quoteFrame
        .geometricBounds[2] +
      quoteGap;
  };

  const paragraphs =
    section.contents.split(
      "\r"
    );

  const quoteOneIndex =
    paragraphs.findIndex(
      (text) =>
        text.indexOf(
          "“Pasos desde la nada"
        ) === 0
    );

  const quoteTwoIndex =
    paragraphs.findIndex(
      (text) =>
        text.indexOf(
          "“Si no te emociona"
        ) === 0
    );

  if (
    quoteOneIndex < 0 ||
    quoteTwoIndex < 0
  ) {
    throw new Error(
      "About Author quotes were not found."
    );
  }

  const beforeQuoteOne =
    paragraphs
      .slice(
        0,
        quoteOneIndex
      )
      .join("\r");

  const betweenQuotes =
    paragraphs
      .slice(
        quoteOneIndex + 1,
        quoteTwoIndex
      )
      .join("\r");

  const afterQuoteTwo =
    paragraphs
      .slice(
        quoteTwoIndex + 1
      )
      .join("\r");

  if (
    beforeQuoteOne.length > 0
  ) {
    addFlowingText(
      beforeQuoteOne
    );
  }

  addQuote(
    paragraphs[
      quoteOneIndex
    ]
  );

  addFlowingText(
    betweenQuotes
  );

  addQuote(
    paragraphs[
      quoteTwoIndex
    ]
  );

  if (
    afterQuoteTwo.length > 0
  ) {
    addFlowingText(
      afterQuoteTwo
    );
  }

  return {
    page:
      firstPage,
  };
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
      if (
        section.id ===
        "epilogue"
      ) {
        const epilogue =
          createEpilogueSection({
            document,
            section,
            styles,
            layout,
            config,
          });

        entries.push({
          id: section.id,
          title: section.title,
          page:
            epilogue.page,
        });

        return;
      }

      if (
        section.id ===
        "about-author"
      ) {
        const aboutAuthor =
          createAboutAuthorSection({
            document,
            section,
            styles,
            layout,
            config,
          });

        entries.push({
          id: section.id,
          title: section.title,
          page:
            aboutAuthor.page,
        });

        return;
      }

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
        section.id ===
          "editorial-note" ||
        section.id ===
          "about-edition"
      ) {
        const signatureIndex =
          bodyFrame.parentStory
            .paragraphs.length - 2;

        const roleIndex =
          bodyFrame.parentStory
            .paragraphs.length - 1;

        const signatureParagraph =
          bodyFrame.parentStory
            .paragraphs.item(
              signatureIndex
            );

        signatureParagraph
          .applyParagraphStyle(
            styles.backMatterSignatureStyle,
            true
          );

        signatureParagraph
          .spaceBefore =
            config.mm(4);

        bodyFrame.parentStory
          .paragraphs.item(
            roleIndex
          )
          .applyParagraphStyle(
            styles.backMatterRoleStyle,
            true
          );
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

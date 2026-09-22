const {
  app,
  Justification,
  ColorModel,
} = require("indesign");

function createBookStyles(
  document,
  config
) {
  const interRegular =
    app.fonts.item(
      "Inter 24pt\tRegular"
    );

  const interMedium =
    app.fonts.item(
      "Inter 24pt\tMedium"
    );

  const atkinsonRegular =
    app.fonts.item(
      "Atkinson Hyperlegible\tRegular"
    );

  const crimsonBold =
    app.fonts.item(
      "Crimson Pro\tBold"
    );

  document.colors.add({
    name: "El Otro Yo",
    model: ColorModel.process,
    colorValue: [0, 31, 71, 39],
  });

  const volumeTitleStyle =
    document.paragraphStyles.add({
      name: "Volume Title",
      appliedFont: crimsonBold,
      pointSize: 28,
      leading: 31,
      justification:
        Justification.CENTER_ALIGN,
      hyphenation: false,
    });

  const sectionCoverTitleStyle =
    document.paragraphStyles.add({
      name: "Section Cover Title",
      appliedFont: crimsonBold,
      pointSize: 24,
      leading: 28,
      justification:
        Justification.CENTER_ALIGN,
      hyphenation: false,
    });

  const sectionCoverDateRangeStyle =
    document.paragraphStyles.add({
      name: "Section Cover Date Range",
      appliedFont: interMedium,
      pointSize: 11,
      leading: 14,
      justification:
        Justification.CENTER_ALIGN,
      hyphenation: false,
    });

  const dateStyle =
    document.paragraphStyles.add({
      name: "Date",
      appliedFont: interMedium,
      pointSize: 9.5,
      leading: 12,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
    });

  const textTitleStyle =
    document.paragraphStyles.add({
      name: "Text Title",
      appliedFont: crimsonBold,
      pointSize: 18,
      leading: 21,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
    });

  const datedEntryDateStyle =
    document.paragraphStyles.add({
      name: "Dated Entry Date",
      appliedFont: atkinsonRegular,
      pointSize: 12,
      leading: config.BODY_LEADING,
      spaceAfter: 0,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
    });

  const bodyStyle =
    document.paragraphStyles.add({
      name: "Body",
      appliedFont: atkinsonRegular,
      pointSize: 12,
      leading: config.BODY_LEADING,
      spaceAfter: 2,
      justification:
        Justification.LEFT_JUSTIFIED,
      hyphenation: false,

      minimumWordSpacing: 85,
      desiredWordSpacing: 100,
      maximumWordSpacing: 120,

      minimumLetterSpacing: -2,
      desiredLetterSpacing: 0,
      maximumLetterSpacing: 2,

      minimumGlyphScaling: 98,
      desiredGlyphScaling: 100,
      maximumGlyphScaling: 102,
    });

  const bodyVerseStyle =
    document.paragraphStyles.add({
      name: "Body Verse",
      appliedFont: atkinsonRegular,
      pointSize: 12,
      leading: config.BODY_LEADING,
      spaceAfter: 2,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
    });

  const folioStyle =
    document.paragraphStyles.add({
      name: "Folio",
      appliedFont: interRegular,
      pointSize: 8,
      leading: 10,
      justification:
        Justification.CENTER_ALIGN,
      hyphenation: false,
    });

  volumeTitleStyle.fillColor =
    document.colors.item(
      "El Otro Yo"
    );

  sectionCoverTitleStyle.fillColor =
    document.colors.item(
      "El Otro Yo"
    );

  textTitleStyle.fillColor =
    document.colors.item(
      "El Otro Yo"
    );

  return {
    volumeTitleStyle,
    sectionCoverTitleStyle,
    sectionCoverDateRangeStyle,
    dateStyle,
    datedEntryDateStyle,
    textTitleStyle,
    bodyStyle,
    bodyVerseStyle,
    folioStyle,
  };
}

module.exports = {
  createBookStyles,
};

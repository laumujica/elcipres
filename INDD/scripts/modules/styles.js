const {
  app,
  Justification,
  ColorModel,
  TabStopAlignment,
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

  const atkinsonItalic =
    app.fonts.item(
      "Atkinson Hyperlegible\tItalic"
    );

  const atkinsonBold =
    app.fonts.item(
      "Atkinson Hyperlegible\tBold"
    );

  const crimsonBold =
    app.fonts.item(
      "Crimson Pro\tBold"
    );

  document.colors.add({
    name: "El otro yo",
    model: ColorModel.process,
    colorValue: [0, 31, 71, 39],
  });

  const halfTitleStyle =
    document.paragraphStyles.add({
      name: "Half Title",
      appliedFont: crimsonBold,
      pointSize: 28,
      leading: 31,
      justification:
        Justification.CENTER_ALIGN,
      hyphenation: false,
    });

  const volumeTitleStyle =
    document.paragraphStyles.add({
      name: "Volume Title",
      appliedFont: interMedium,
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

  const titlePageAuthorStyle =
    document.paragraphStyles.add({
      name: "Title Page Author",
      appliedFont: interMedium,
      pointSize: 11,
      leading: 14,
      justification:
        Justification.CENTER_ALIGN,
      hyphenation: false,
    });

  const frontMatterTitleStyle =
    document.paragraphStyles.add({
      name: "Front Matter Title",
      appliedFont: interMedium,
      pointSize: 24,
      leading: 28,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
      spaceAfter: config.mm(4),
    });

  const tocSectionStyle =
    document.paragraphStyles.add({
      name: "TOC Section",
      appliedFont: interMedium,
      pointSize: 11.5,
      leading: 15,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
      spaceBefore: config.mm(5),
      spaceAfter: 2,
    });

  const tocEntryStyle =
    document.paragraphStyles.add({
      name: "TOC Entry",
      appliedFont: atkinsonRegular,
      pointSize: 10.5,
      leading: 14,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
      leftIndent: config.mm(7),
    });

  tocEntryStyle.tabStops.add({
    alignment:
      TabStopAlignment.RIGHT_ALIGN,
    position: config.mm(110),
    leader: ".",
  });

  const tocBackMatterStyle =
    document.paragraphStyles.add({
      name: "TOC Back Matter",
      appliedFont: atkinsonRegular,
      pointSize: 10.5,
      leading: 14,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
      spaceBefore: 5,
    });

  tocBackMatterStyle.tabStops.add({
    alignment:
      TabStopAlignment.RIGHT_ALIGN,
    position: config.mm(110),
    leader: ".",
  });

  const creditsProjectStyle =
    document.paragraphStyles.add({
      name: "Credits Project",
      appliedFont: atkinsonBold,
      pointSize: 8.5,
      leading: 9,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
      spaceAfter: 0,
    });

  const creditsRoleStyle =
    document.paragraphStyles.add({
      name: "Credits Role",
      appliedFont: atkinsonBold,
      pointSize: 8.5,
      leading: 9,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
      spaceBefore: config.mm(4),
      spaceAfter: 0,
    });

  const creditsTextStyle =
    document.paragraphStyles.add({
      name: "Credits Text",
      appliedFont: atkinsonRegular,
      pointSize: 8.5,
      leading: 9,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
      spaceAfter: 0,
    });

  const creditsNoteStyle =
    document.paragraphStyles.add({
      name: "Credits Note",
      appliedFont: atkinsonItalic,
      pointSize: 7.8,
      leading: 9,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
      spaceBefore: config.mm(4),
      spaceAfter: 0,
    });

  const creditsEmphasisStyle =
    document.characterStyles.add({
      name: "Credits Emphasis",
      appliedFont: atkinsonBold,
    });

  const creditsWebsiteStyle =
    document.paragraphStyles.add({
      name: "Credits Website",
      appliedFont: atkinsonBold,
      pointSize: 8.2,
      leading: 9,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
      spaceAfter: 0,
    });

  const creditsFooterStyle =
    document.paragraphStyles.add({
      name: "Credits Footer",
      appliedFont: atkinsonRegular,
      pointSize: 8.2,
      leading: 9,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
      spaceAfter: 0,
    });

  const backMatterQuoteStyle =
    document.paragraphStyles.add({
      name: "Back Matter Quote",
      appliedFont: atkinsonItalic,
      pointSize: 11,
      leading: 15,
      justification:
        Justification.LEFT_ALIGN,
      hyphenation: false,
      leftIndent: config.mm(5),
      rightIndent: config.mm(3),
      spaceBefore: config.mm(4),
      spaceAfter: config.mm(4),
    });

  const backMatterBoldStyle =
    document.characterStyles.add({
      name: "Back Matter Bold",
      appliedFont: atkinsonBold,
    });

  const backMatterItalicStyle =
    document.characterStyles.add({
      name: "Back Matter Italic",
      appliedFont: atkinsonItalic,
    });

  const workClosingTitleStyle =
    document.paragraphStyles.add({
      name: "Work Closing Title",
      appliedFont: crimsonBold,
      pointSize: 18,
      leading: 21,
      justification:
        Justification.CENTER_ALIGN,
      hyphenation: false,
    });

  const workClosingNoteStyle =
    document.paragraphStyles.add({
      name: "Work Closing Note",
      appliedFont: interRegular,
      pointSize: 8.5,
      leading: 11,
      justification:
        Justification.CENTER_ALIGN,
      hyphenation: false,
    });

  const closingYearStyle =
    document.paragraphStyles.add({
      name: "Closing Year",
      appliedFont: crimsonBold,
      pointSize: 9,
      leading: 11,
      justification:
        Justification.CENTER_ALIGN,
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

  halfTitleStyle.fillColor =
    document.colors.item(
      "Black"
    );

  volumeTitleStyle.fillColor =
    document.colors.item(
      "Black"
    );

  sectionCoverTitleStyle.fillColor =
    document.colors.item(
      "El otro yo"
    );

  textTitleStyle.fillColor =
    document.colors.item(
      "Black"
    );

  frontMatterTitleStyle.fillColor =
    document.colors.item(
      "Black"
    );

  tocSectionStyle.fillColor =
    document.colors.item(
      "Black"
    );

  return {
    halfTitleStyle,
    volumeTitleStyle,
    sectionCoverTitleStyle,
    sectionCoverDateRangeStyle,
    dateStyle,
    datedEntryDateStyle,
    textTitleStyle,
    bodyStyle,
    bodyVerseStyle,
    titlePageAuthorStyle,
    frontMatterTitleStyle,
    tocSectionStyle,
    tocEntryStyle,
    tocBackMatterStyle,
    creditsProjectStyle,
    creditsRoleStyle,
    creditsTextStyle,
    creditsNoteStyle,
    creditsEmphasisStyle,
    creditsWebsiteStyle,
    creditsFooterStyle,
    backMatterQuoteStyle,
    backMatterBoldStyle,
    backMatterItalicStyle,
    workClosingTitleStyle,
    workClosingNoteStyle,
    closingYearStyle,
    folioStyle,
  };
}

module.exports = {
  createBookStyles,
};

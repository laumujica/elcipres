const {
  app,
} = require("indesign");

function showGenerationReport({
  data,
  document,
  generationStats,
}) {
  const reportDialog =
    app.dialogs.add({
      name: "Generation Report",
      canCancel: false,
    });

  const reportColumn =
    reportDialog
      .dialogColumns
      .add();

  reportColumn.staticTexts.add({
    staticLabel:
      "El Ciprés — Generation complete",
  });

  reportColumn.staticTexts.add({
    staticLabel:
      `Volume: ${data.volume.title}`,
  });

  reportColumn.staticTexts.add({
    staticLabel:
      `Movements: ${data.movements.length}`,
  });

  reportColumn.staticTexts.add({
    staticLabel:
      `Section covers: ${generationStats.sectionCovers}`,
  });

  reportColumn.staticTexts.add({
    staticLabel:
      `Blank pages: ${generationStats.blankPages}`,
  });

  reportColumn.staticTexts.add({
    staticLabel:
      `Texts processed: ${generationStats.textsProcessed}`,
  });

  reportColumn.staticTexts.add({
    staticLabel:
      `Total pages: ${document.pages.length}`,
  });

  reportColumn.staticTexts.add({
    staticLabel:
      `Continuation pages: ${generationStats.continuationPages}`,
  });

  reportDialog.show();
  reportDialog.destroy();
}

module.exports = {
  showGenerationReport,
};

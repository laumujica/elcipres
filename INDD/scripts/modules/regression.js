function addIssue(
  issues,
  condition,
  message
) {
  if (!condition) {
    issues.push(message);
  }
}

function hasValidStyle(
  collection,
  name
) {
  const item =
    collection.itemByName(name);

  return Boolean(
    item &&
    item.isValid
  );
}

function runRegressionChecks({
  data,
  document,
  bodyEntries,
  backMatterEntries,
  frontMatter,
  config,
}) {
  const issues = [];

  const textItems =
    data.sequence.filter(
      (item) =>
        item.type === "text"
    );

  const sectionCovers =
    data.sequence.filter(
      (item) =>
        item.type ===
        "section_cover"
    );

  addIssue(
    issues,
    data.volume.title ===
      "El otro yo",
    'Volume title changed from "El otro yo".'
  );

  addIssue(
    issues,
    data.movements.length === 5,
    `Expected 5 movements; found ${data.movements.length}.`
  );

  addIssue(
    issues,
    textItems.length === 90,
    `Expected 90 literary texts; found ${textItems.length}.`
  );

  addIssue(
    issues,
    sectionCovers.length === 5,
    `Expected 5 movement covers; found ${sectionCovers.length}.`
  );

  addIssue(
    issues,
    bodyEntries.filter(
      (entry) =>
        entry.kind === "text"
    ).length === 90,
    "Generated body entry count no longer matches the 90-text source."
  );

  addIssue(
    issues,
    backMatterEntries.length === 5,
    `Expected 5 back-matter TOC entries; found ${backMatterEntries.length}.`
  );

  [
    "Epílogo",
    "Sobre el autor",
    "Agradecimientos",
    "Nota editorial",
    "Sobre esta edición",
  ].forEach((title) => {
    addIssue(
      issues,
      backMatterEntries.some(
        (entry) =>
          entry.title === title
      ),
      `Missing back-matter section: "${title}".`
    );
  });

  addIssue(
    issues,
    Boolean(
      frontMatter &&
      frontMatter.prologuePage
    ),
    "Prologue page reference is missing."
  );

  [
    "Body",
    "Body Verse",
    "Front Matter Title",
    "Back Matter Quote",
    "Back Matter Signature",
    "Back Matter Role",
    "Folio",
  ].forEach((name) => {
    addIssue(
      issues,
      hasValidStyle(
        document.paragraphStyles,
        name
      ),
      `Missing paragraph style: "${name}".`
    );
  });

  [
    "Back Matter Bold",
    "Back Matter Italic",
  ].forEach((name) => {
    addIssue(
      issues,
      hasValidStyle(
        document.characterStyles,
        name
      ),
      `Missing character style: "${name}".`
    );
  });

  const tolerance = 0.5;

  for (
    let i = 0;
    i < document.textFrames.length;
    i++
  ) {
    const frame =
      document.textFrames.item(i);

    if (
      !frame ||
      !frame.isValid ||
      !frame.parentPage
    ) {
      continue;
    }

    const bounds =
      frame.geometricBounds;

    const top = bounds[0];
    const left = bounds[1];
    const bottom = bounds[2];
    const right = bounds[3];

    if (
      top < -tolerance ||
      left < -tolerance ||
      bottom >
        config.mm(
          config.PAGE_HEIGHT
        ) + tolerance ||
      right >
        config.mm(
          config.PAGE_WIDTH
        ) + tolerance
    ) {
      issues.push(
        `Text frame outside page bounds on page ${frame.parentPage.name}.`
      );
    }
  }

  if (issues.length > 0) {
    throw new Error(
      "Regression checks failed:\n\n" +
      issues.join("\n")
    );
  }

  return {
    passed: true,
    checks: 11,
  };
}

module.exports = {
  runRegressionChecks,
};

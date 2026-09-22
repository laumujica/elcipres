function validateData(data) {
  const issues = [];

  if (!data || typeof data !== "object") {
    issues.push(
      "Root object is missing."
    );

    throw new Error(
      "JSON validation failed:\n\n" +
      issues.join("\n")
    );
  }

  if (
    !data.volume ||
    typeof data.volume !== "object"
  ) {
    issues.push(
      "Volume object is missing."
    );
  }

  else if (
    typeof data.volume.title !== "string" ||
    data.volume.title.trim() === ""
  ) {
    issues.push(
      "Volume title is missing."
    );
  }

  if (!Array.isArray(data.movements)) {
    issues.push(
      "Movements must be an array."
    );
  }

  else if (
    data.movements.length === 0
  ) {
    issues.push(
      "Movements array is empty."
    );
  }

  if (!Array.isArray(data.sequence)) {
    issues.push(
      "Sequence must be an array."
    );
  }

  else if (
    data.sequence.length === 0
  ) {
    issues.push(
      "Sequence array is empty."
    );
  }

  else {
    data.sequence.forEach(
      (item, index) => {
        const position =
          index + 1;

        if (
          !item ||
          typeof item !== "object"
        ) {
          issues.push(
            `Sequence item ${position}: invalid object.`
          );

          return;
        }

        if (
          typeof item.type !== "string" ||
          item.type.trim() === ""
        ) {
          issues.push(
            `Sequence item ${position}: type is missing.`
          );

          return;
        }

        if (
          item.type === "section_cover"
        ) {
          if (
            typeof item.title !== "string" ||
            item.title.trim() === ""
          ) {
            issues.push(
              `Sequence item ${position}: section cover title is missing.`
            );
          }
        }

        else if (
          item.type === "blank_page"
        ) {
          // No extra validation needed.
        }

        else if (
          item.type === "text"
        ) {
          if (
            typeof item.title !== "string" ||
            item.title.trim() === ""
          ) {
            issues.push(
              `Sequence item ${position}: text title is missing or empty.`
            );
          }

          if (
            typeof item.originalDate !== "string" ||
            item.originalDate.trim() === ""
          ) {
            issues.push(
              `Sequence item ${position}: originalDate is missing or empty.`
            );
          }

          if (
            !Array.isArray(item.body)
          ) {
            issues.push(
              `Sequence item ${position}: body must be an array.`
            );
          }

          else if (
            item.body.length === 0
          ) {
            issues.push(
              `Sequence item ${position}: body is empty.`
            );
          }

          else {
            item.body.forEach(
              (paragraph, paragraphIndex) => {
                if (
                  typeof paragraph !== "string" ||
                  paragraph.trim() === ""
                ) {
                  issues.push(
                    `Sequence item ${position}: body block ${paragraphIndex + 1} is empty or invalid.`
                  );
                }
              }
            );
          }
        }

        else {
          issues.push(
            `Sequence item ${position}: unsupported type "${item.type}".`
          );
        }
      }
    );
  }

  if (issues.length > 0) {
    throw new Error(
      "JSON validation failed:\n\n" +
      issues.join("\n")
    );
  }
}

module.exports = {
  validateData,
};

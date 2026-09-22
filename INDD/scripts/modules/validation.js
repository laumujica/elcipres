const ALLOWED_TEXT_TYPES = [
  "prose",
  "verse",
  "hybrid",
  "visual",
  "dated_entry",
];

const ALLOWED_BLOCK_TYPES = [
  "prose",
  "verse",
  "visual",
];

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
            !ALLOWED_TEXT_TYPES.includes(
              item.textType
            )
          ) {
            issues.push(
              `Sequence item ${position}: unsupported textType "${item.textType}".`
            );
          }

          if (
            typeof item.keepTogether !==
            "boolean"
          ) {
            issues.push(
              `Sequence item ${position}: keepTogether must be boolean.`
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
              (block, blockIndex) => {
                if (
                  !block ||
                  typeof block !== "object"
                ) {
                  issues.push(
                    `Sequence item ${position}: body block ${blockIndex + 1} is invalid.`
                  );

                  return;
                }

                if (
                  !ALLOWED_BLOCK_TYPES.includes(
                    block.type
                  )
                ) {
                  issues.push(
                    `Sequence item ${position}: body block ${blockIndex + 1} has unsupported type "${block.type}".`
                  );
                }

                if (
                  typeof block.contents !==
                    "string" ||
                  block.contents.trim() === ""
                ) {
                  issues.push(
                    `Sequence item ${position}: body block ${blockIndex + 1} contents are empty or invalid.`
                  );
                }

                if (
                  block.type === "dated_entry" &&
                  (
                    typeof block.date !== "string" ||
                    block.date.trim() === ""
                  )
                ) {
                  issues.push(
                    `Sequence item ${position}: dated entry block ${blockIndex + 1} date is missing or invalid.`
                  );
                }

                if (
                  item.textType !== "hybrid" &&
                  block.type !== item.textType &&
                  !(
                    item.textType === "prose" &&
                    block.type === "dated_entry"
                  )
                ) {
                  issues.push(
                    `Sequence item ${position}: body block ${blockIndex + 1} type "${block.type}" does not match textType "${item.textType}".`
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

import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import * as Diff from "diff";

const pdf1Path = path.join(__dirname, "../assets/Invoice_37253.pdf");
const pdf2Path = path.join(__dirname, "../assets/Rechnung_signed.pdf");

async function extractText(filePath: string): Promise<string> {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  return data.text;
}

void (async () => {
  const text1 = await extractText(pdf1Path);
  const text2 = await extractText(pdf2Path);

  if (text1 === text2) {
    console.log("Text content is identical.");
  } else {
    console.log("Text content differs. Generating diff output...");

    const differences = Diff.diffLines(text1, text2);

    // ➤ console output (text format)
    const plainOutput = differences
      .map((part) => {
        const prefix = part.added ? "+ " : part.removed ? "- " : "  ";
        return prefix + part.value.trim();
      })
      .join("\n");

    fs.writeFileSync(
      path.join(__dirname, "../assets/text-diff.txt"),
      plainOutput,
      "utf-8",
    );

    //create HTML-Diff
    const htmlOutput = differences
      .map((part) => {
        const color = part.added
          ? "#c6f6c6"
          : part.removed
            ? "#ff8a8a"
            : "#fbe870";
        const tag = part.added ? "ins" : part.removed ? "del" : "span";
        return (
          `<div style="background:${color};white-space:pre-wrap;">` +
          `<${tag}>${part.value}</${tag}></div>`
        );
      })
      .join("");

    const htmlWrapper = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>PDF Diff</title></head>
      <body><h2>Differences</h2>${htmlOutput}</body>
      </html>
    `;

    fs.writeFileSync(
      path.join(__dirname, "../assets/text-diff.html"),
      htmlWrapper,
      "utf-8",
    );

    console.log("differences saved in:");
    console.log("  - assets/text-diff.txt");
    console.log("  - assets/text-diff.html");
  }
})();

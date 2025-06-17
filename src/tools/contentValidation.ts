import fs from "fs";
import path from "path";
const pdfParse = require("pdf-parse");

const pdfPath = path.join(__dirname, "../assets/Rechnung_signed.pdf");

// Check PDF content
async function checkPdfContents() {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(dataBuffer);
  const text = data.text;

  const requiredTexts = ["Rechnungsnr.", "Gesamtsumme", "Leistungsdatum"];
  const missing = requiredTexts.filter((t) => !text.includes(t));

  if (missing.length > 0) {
    throw new Error(`Missing content in the PDF: ${missing.join(", ")}`);
  }

  console.log("PDF contains all mandatory content.");
}

// Check content
checkPdfContents().catch((err) => console.error(err.message));

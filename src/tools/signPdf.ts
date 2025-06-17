import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";

void (async () => {
  const inputPdfPath = path.join(__dirname, "../assets/Rechnung.pdf");
  const signatureImagePath = path.join(
    __dirname,
    "../assets/test-signature.png",
  );
  const outputPdfPath = path.join(__dirname, "../assets/Rechnung_signed.pdf");

  const pdfBytes = fs.readFileSync(inputPdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const imageBytes = fs.readFileSync(signatureImagePath);
  const pngImage = await pdfDoc.embedPng(imageBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  firstPage.drawImage(pngImage, {
    x: 350,
    y: 180,
    width: 150,
    height: 50,
  });

  const signedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPdfPath, signedPdfBytes);
})();

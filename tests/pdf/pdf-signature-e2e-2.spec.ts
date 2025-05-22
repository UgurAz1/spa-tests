import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { PDFDocument } from "pdf-lib";
import { getTimestamp } from "../../helpers/timeHelpers";

// Helper function that performs the signature test
async function runSignatureTest(SHOULD_DRAW: boolean) {
  const timestamp = getTimestamp();
  const assetsDir = path.resolve("assets");
  const resultsDir = path.join(assetsDir, "results");

  const inputPdfPath = path.join(assetsDir, "Rechnung.pdf");
  const signatureImagePath = path.join(assetsDir, "test-signature.png");
  const tempDir = path.join(resultsDir, "temp", timestamp);
  const originalOutDir = path.join(resultsDir, "original", timestamp);
  const diffOutDir = path.join(resultsDir, "diffs");
  const signedOutDir = path.join(resultsDir, "signed", timestamp);
  const noSignatureDir = path.join(resultsDir, "no-signature", timestamp);

  [tempDir, originalOutDir, diffOutDir, noSignatureDir].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  const pdfBytes = fs.readFileSync(inputPdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const imageBytes = fs.readFileSync(signatureImagePath);
  const pngImage = await pdfDoc.embedPng(imageBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  console.log(
    `Page size: width=${firstPage.getWidth()}, height=${firstPage.getHeight()}`,
  );

  if (SHOULD_DRAW) {
    firstPage.drawImage(pngImage, {
      x: 350,
      y: 180,
      width: 150,
      height: 50,
    });
  }

  const signedPdfBytes = await pdfDoc.save();
  const tempPdfPath = path.join(tempDir, "Rechnung_signed.pdf");
  fs.writeFileSync(tempPdfPath, signedPdfBytes);

  const { convert } = require("pdf-poppler");
  async function renderPdfToPng(
    pdfPath: string,
    outDir: string,
    outPrefix: string,
  ) {
    await convert(pdfPath, {
      format: "png",
      out_dir: outDir,
      out_prefix: outPrefix,
      page: 1,
    });
  }

  await renderPdfToPng(inputPdfPath, originalOutDir, "original");
  await renderPdfToPng(tempPdfPath, tempDir, "signed");

  const originalImg = PNG.sync.read(
    fs.readFileSync(path.join(originalOutDir, "original-1.png")),
  );
  const signedImg = PNG.sync.read(
    fs.readFileSync(path.join(tempDir, "signed-1.png")),
  );

  const { width, height } = originalImg;
  const diff = new PNG({ width, height });
  // diff.data.fill(0);

  const diffPixels = pixelmatch(
    originalImg.data,
    signedImg.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 },
  );

  const suffix = SHOULD_DRAW ? "with" : "without";
  const diffPath = path.join(diffOutDir, `diff-${suffix}-${timestamp}.png`);
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const region = {
    x: 350,
    y: height - 180 - 50,
    width: 150,
    height: 50,
  };

  let signedPixels = 0;
  for (let y = region.y; y < region.y + region.height; y++) {
    for (let x = region.x; x < region.x + region.width; x++) {
      const idx = (width * y + x) << 2;
      const r = diff.data[idx],
        g = diff.data[idx + 1],
        b = diff.data[idx + 2],
        a = diff.data[idx + 3];
      if (r + g + b > 0 && a > 0) signedPixels++;
    }
  }

  if (diffPixels === 0 || signedPixels < 50) {
    fs.mkdirSync(noSignatureDir, { recursive: true });
    fs.writeFileSync(
      path.join(noSignatureDir, "Rechnung_signed.pdf"),
      signedPdfBytes,
    );
    return;
  }

  fs.mkdirSync(signedOutDir, { recursive: true });
  fs.writeFileSync(
    path.join(signedOutDir, "Rechnung_signed.pdf"),
    signedPdfBytes,
  );

  expect(diffPixels).toBeGreaterThan(0);
  expect(signedPixels).toBeGreaterThan(2000);
  expect(diffPixels - signedPixels).toBeLessThan(100);
}

test.describe("PDF Signature Test", () => {
  test("With signature", async () => {
    await runSignatureTest(true);
  });

  test("Without signature", async () => {
    await runSignatureTest(false);
  });
});

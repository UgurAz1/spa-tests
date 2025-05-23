import fs from "fs";
import path from "path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

// path
const pdf1Path = path.join(__dirname, "../assets/Rechnung.pdf");
const pdf2Path = path.join(__dirname, "../assets/Rechnung_signed.pdf");
const outputDir = path.join(__dirname, "../assets/visual");

// PNG files
function getGeneratedPng(prefix: string): string {
  const files = fs.readdirSync(outputDir);
  const match = files.find((f) => f.startsWith(prefix) && f.endsWith(".png"));
  if (!match) throw new Error(`No PNG found for prefix "${prefix}"`);
  return path.join(outputDir, match);
}

const diffPath = path.join(outputDir, "diff.png");

// convert PDF in PNG
async function convertToPng(pdfPath: string, prefix: string) {
  // @ts-ignore
  const { convert } = await import("pdf-poppler");
  await convert(pdfPath, {
    format: "png",
    out_dir: outputDir,
    out_prefix: prefix,
    page: 1,
  });
}

void (async () => {
  // create folder if not exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await convertToPng(pdf1Path, "original");
  await convertToPng(pdf2Path, "signed");

  const img1Path = getGeneratedPng("original");
  const img2Path = getGeneratedPng("signed");

  const img1 = PNG.sync.read(fs.readFileSync(img1Path));
  const img2 = PNG.sync.read(fs.readFileSync(img2Path));
  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const difference = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    {
      threshold: 0.1,
    },
  );

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  if (difference > 0) {
    console.log(`Signature recognized - ${difference} Pixels differ`);
  } else {
    console.log(
      "No signature recognized. Image is identical to stored expectation.",
    );
  }

  console.log("✅ Diff saved in:", diffPath);

  require("child_process").exec(`start "" "${diffPath}"`);
})();

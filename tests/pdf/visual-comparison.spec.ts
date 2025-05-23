import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
const { getTimestamp } = require("../../helpers/timeHelpers");

test("Test invoice signed - visual difference detected", async () => {
  const originalPath = path.join(
    __dirname,
    "../../assets/visual/original-1.png",
  );
  const signedPath = path.join(__dirname, "../../assets/visual/signed-1.png");
  const outputDir = path.join(__dirname, "../../assets/visual-baselines");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const timestamp = getTimestamp();

  const diffPath = path.join(outputDir, `diff-${timestamp}.png`);

  const img1 = PNG.sync.read(fs.readFileSync(originalPath));
  const img2 = PNG.sync.read(fs.readFileSync(signedPath));

  const { width, height } = img1;

  const diff = new PNG({ width, height });

  const diffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 },
  );
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  expect(diffPixels).toBeGreaterThan(0);
});

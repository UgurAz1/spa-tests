import fs from "fs";
import path from "path";

const authFile = path.join("test-data", "user.json");

export interface TestUser {
  email: string;
  password: string;
}

export class UserHelper {
  static save(user: TestUser) {
    fs.writeFileSync(authFile, JSON.stringify(user, null, 2), "utf8");
  }

  static load(): TestUser {
    if (!fs.existsSync(authFile)) {
      throw new Error(`❌ user.json nicht gefunden unter: ${authFile}`);
    }

    const buffer = fs.readFileSync(authFile);
    const text = buffer
      .toString("utf8")
      .replace(/^\uFEFF/, "")
      .trim();

    if (!text.startsWith("{")) {
      throw new Error(
        `❌ user.json sieht nicht nach JSON aus:\n${text.slice(0, 50)}`,
      );
    }

    try {
      return JSON.parse(text);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`❌ JSON.parse fehlgeschlagen: ${err.message}`);
      } else {
        throw new Error("❌ JSON.parse fehlgeschlagen: Unbekannter Fehler");
      }
    }
  }

  static exists(): boolean {
    return fs.existsSync(authFile);
  }
}

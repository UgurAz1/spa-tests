import fs from "fs";
import path from "path";

const authFile = path.resolve("src/data/test-data/user.json");

export interface TestUser {
  email: string;
  password: string;
}

export class UserHelper {
  static save(user: TestUser) {
    try {
      fs.writeFileSync(authFile, JSON.stringify(user, null, 2), "utf-8");
    } catch (err) {
      throw new Error(
        `[UserHelper.save] Failed to write file:\n${(err as Error).message}`,
      );
    }
  }

  static load(): TestUser {
    if (!fs.existsSync(authFile)) {
      throw new Error(`[UserHelper.load] File not found: ${authFile}`);
    }

    try {
      const raw = fs.readFileSync(authFile, "utf-8");
      return JSON.parse(raw);
    } catch (err) {
      throw new Error(
        `[UserHelper.load] Failed to parse JSON:\n${(err as Error).message}`,
      );
    }
  }

  static exists(): boolean {
    return fs.existsSync(authFile);
  }

  static loadSafe(): TestUser {
    try {
      return this.load();
    } catch (e) {
      console.warn(`[UserHelper] WARNING: ${(e as Error).message}`);
      return {
        email: "test@example.com",
        password: "default123",
      };
    }
  }
}

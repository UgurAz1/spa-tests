import fs from "fs";

const authFile = "test-data/user.json";

export interface TestUser {
  email: string;
  password: string;
}

export class UserHelper {
  static save(user: TestUser) {
    fs.writeFileSync(authFile, JSON.stringify(user));
  }

  static load(): TestUser {
    const raw = fs.readFileSync(authFile, "utf-8").replace(/^\uFEFF/, "");
    return JSON.parse(raw);
  }

  static exists(): boolean {
    return fs.existsSync(authFile);
  }
}

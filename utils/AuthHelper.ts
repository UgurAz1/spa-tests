import fs from "fs";

const tokenFile = "../.auth/user.json";

export interface TokenData {
  access: string;
  refreshToken: string;
  expiration: string;
}

export class AuthHelper {
  static saveToken(token: TokenData) {
    fs.writeFileSync(tokenFile, JSON.stringify(token, null, 2));
  }

  static loadToken(): TokenData {
    const raw = fs.readFileSync(tokenFile, "utf-8");
    return JSON.parse(raw);
  }
  static getUserInfo() {
    const file = fs.readFileSync(tokenFile, "utf-8");
    return JSON.parse(file).userInfo;
  }
}

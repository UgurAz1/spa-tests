import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  timeout: 240000,
  testDir: "./tests",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["json", { outputFile: "test-results/jsonReport.json" }],
    [
      "html",
      // {
      //   open: "always",
      // },
    ],
    ["list"],
    // // Add Argos reporter.
    // [
    //   "@argos-ci/playwright/reporter",
    //   {
    //     // Upload to Argos on CI only.
    //     uploadToArgos: !!process.env.CI,
    //   },
    // ],
  ],
  use: {
    trace: "on-first-retry",
    baseURL: process.env.BASE_URL,
    locale: "en-US",
    headless: true,
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    // launchOptions: {
    //   slowMo: 1000
    // }
  },
  outputDir: "test-results/",
  projects: [
    {
      name: "setup",
      testMatch: "setup/auth.setup.ts",
    },
    {
      name: "authenticated-chrome",
      testIgnore: [
        "**/ui/login.spec.ts",
        "**/ui/register.spec.ts",
        "**/ui/responsive-layout.spec.ts",
        "tests/api/**/*.spec.ts",
        "tests/error/**/*.spec.ts",
        // "tests/mocks/**/*.spec.ts",
        "tests/pdf/**/*.spec.ts",
      ],
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/state.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "no-auth-chrome",
      testMatch: [
        "**/ui/login.spec.ts",
        "**/ui/register.spec.ts",
        "**/ui/responsive-layout.spec.ts",
        "tests/api/**/*.spec.ts",
        "tests/error/**/*.spec.ts",
        // "tests/mocks/**/*.spec.ts",
        "tests/pdf/**/*.spec.ts",
      ],
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "pdf",
      testMatch: /tests\/pdf\/.*\.spec\.ts/,
    },

    // {
    //   name: 'authenticated-firefox',
    //   testIgnore: [
    //     '**/ui/login.spec.ts',
    //     '**/ui/register.spec.ts',
    //     'tests/api/**/*.spec.ts',
    //   ],
    //   use: {
    //     ...devices['Desktop Firefox']
    //     , storageState: '.auth/state.json'
    //   },
    //   dependencies: ['setup']
    // },
    // {
    //   name: 'no-auth-firefox',
    //   testMatch: [
    //     '**/ui/login.spec.ts',
    //     '**/ui/register.spec.ts',
    //     'tests/api/**/*.spec.ts',
    //   ],
    //   use: {
    //     ...devices['Desktop Firefox']
    //   },
    // },
  ],
});

import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  timeout: 240000,
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['json', { outputFile: 'test-results/jsonReport.json' }],
    ['junit', { outputFile: 'test-results/junitReport.xml' }],
    ['html']
  ],
  use: {
    trace: 'on-first-retry',
    baseURL: process.env.BASE_URL,
    locale: 'en-US',
    headless: true,
    ignoreHTTPSErrors: true
  },

  projects: [
    {
      name: 'setup',
      testMatch: 'setup/auth.setup.ts'
    },
    {
      name: 'authenticated-chrome',
      testIgnore: [
        '**/ui/login.spec.ts',
        '**/ui/register.spec.ts',
        'tests/api/**/*.spec.ts',
      ],
      use: {
        ...devices['Desktop Chrome']
        , storageState: '.auth/state.json'
      },
      dependencies: ['setup']
    },
    {
      name: 'no-auth-chrome',
      testMatch: [
        '**/ui/login.spec.ts',
        '**/ui/register.spec.ts',
        'tests/api/**/*.spec.ts',
      ],
      use: {
        ...devices['Desktop Chrome']
      },
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

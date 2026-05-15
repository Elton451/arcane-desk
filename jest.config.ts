import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  notify: true,
  clearMocks: true,
  collectCoverage: true,
  restoreMocks: false,
  slowTestThreshold: 5,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@app/(.*)$": "<rootDir>/app/$1",
    "^@features/(.*)$": "<rootDir>/features/$1",
    "^@lib/(.*)$": "<rootDir>/lib/$1",
    "^@shared/(.*)$": "<rootDir>/shared/$1",
  },
};

export default createJestConfig(config);

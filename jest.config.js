export default {
  testEnvironment: "jsdom",
  transform: {},
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  collectCoverage: true,
  coverageReporters: ["text", "lcov", "clover"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: [
    "**/tests/**/*.test.js"
  ],
  verbose: true,
  testEnvironmentOptions: {
    url: "http://localhost",
    pretendToBeVisual: true,
    resources: "usable"
  },
  moduleFileExtensions: ["js", "json"],
  transformIgnorePatterns: [
    "/node_modules/",
    "\\.pnp\\.[^\\/]+$"
  ],
  testTimeout: 10000,
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
  // ESM Support
  experimental: {
    RuntimeDetoxImportESM: true
  }
};

export default {
  testEnvironment: "jsdom",
  transform: {},
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  setupFiles: ["<rootDir>/jest.setup.js"]
};

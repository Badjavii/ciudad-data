const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/test/**/*.ts", "!**/src/test/setup.ts"],
  testTimeout: 30000,
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"]
};

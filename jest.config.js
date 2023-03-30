const ignorePatterns = ["<rootDir>/dist/", "<rootDir>/node_modules/"];

export default {
  testEnvironment: "node",
  coveragePathIgnorePatterns: ignorePatterns,
  testPathIgnorePatterns: ignorePatterns,
  testTimeout: 15000,
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleNameMapper: {
    "(.+)\\.js": "$1",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

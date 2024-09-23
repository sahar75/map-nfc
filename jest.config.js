// jest.config.js
module.exports = {
  preset: "jest-expo",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.[tj]sx?$": "babel-jest", // Transpile TS/JS files with babel-jest
  },
  testEnvironment: "jsdom", // Ensure compatibility for React Native
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|@unimodules|@expo/vector-icons)",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/expo-env.d.ts",
    "!**/.expo/**",
  ],
  setupFiles: ["./jest.setup.js"],
};

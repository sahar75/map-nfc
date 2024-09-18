// jest.config.js
module.exports = {
  preset: "react-native", // For React Native testing
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.[tj]sx?$": "babel-jest", // Transpile TS/JS files with babel-jest
  },
  testEnvironment: "jsdom", // Ensure compatibility for React Native
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!@expo|react-native|@react-native|@unimodules|@expo/vector-icons)/",
  ],
};

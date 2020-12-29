module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['integration-tests'],
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
};

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  globals: {
    'ts-jest': {
      'tsConfig': 'tsconfig.test.json',
    },
  },

  moduleFileExtensions: [
    'ts', 'js',
  ],

  testEnvironment: 'node',

  testMatch: [
    '**/tests/unit/**/*.+(ts)',
  ],

  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
}

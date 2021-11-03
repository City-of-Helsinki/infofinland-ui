module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/src/components$1',
    '^@/pages(.*)$': '<rootDir>/pages$1',
    '^@/hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@/lib(.*)$': '<rootDir>/src/lib$1',
    '^@/test(.*)$': '<rootDir>/test$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
}

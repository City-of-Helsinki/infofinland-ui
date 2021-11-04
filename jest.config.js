module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    // asset loaders
    '\\.(css|less|sass|scss)$': '<rootDir>/test/mocks/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/mocks/fileMock.js',
    // jsconfig absolute path mappings
    '^@/components(.*)$': '<rootDir>/src/components$1',
    '^@/pages(.*)$': '<rootDir>/pages$1',
    '^@/hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@/lib(.*)$': '<rootDir>/src/lib$1',
    '^@/test(.*)$': '<rootDir>/test$1',
    '^@/public(.*)$': '<rootDir>/public$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
}

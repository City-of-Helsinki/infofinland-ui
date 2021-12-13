// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  moduleNameMapper: {
        // jsconfig absolute path mappings
        '^@/components(.*)$': '<rootDir>/src/components$1',
        '^@/pages(.*)$': '<rootDir>/pages$1',
        '^@/hooks(.*)$': '<rootDir>/src/hooks$1',
        '^@/lib(.*)$': '<rootDir>/src/lib$1',
        '^@/test(.*)$': '<rootDir>/test$1',
        '^@/public(.*)$': '<rootDir>/public$1',
        '^@/(.*)$': '<rootDir>/$1',
      },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)

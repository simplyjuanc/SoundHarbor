import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // The path to the app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',

  // Add more custom configurations here
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleNameMapper: {
    // Handle module aliases
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@containers/(.*)$': '<rootDir>/src/containers/$1',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);

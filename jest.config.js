module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
  resolver: 'jest-node-exports-resolver',
}

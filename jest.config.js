module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        resources: 'usable',
        runScripts: 'dangerously',
    },
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: [
        '@testing-library/jest-dom',
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    },
    testPathIgnorePatterns: [
        '/node_modules/',
        '/src/(?!utils/taskLoaderTest.ts)/',
    ],
    testMatch: [
        '<rootDir>/src/utils/taskLoaderTest.ts',
    ],
};

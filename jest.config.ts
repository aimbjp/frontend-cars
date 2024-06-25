export {};

export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    extends: [
        // ... другие расширения
        'plugin:testing-library/react'
    ],
    rules: {
        // ... другие правила
        'testing-library/no-node-access': 'off',
        'testing-library/no-container': 'off',
    },
};

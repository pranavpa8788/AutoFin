module.exports = {
    preset: "ts-jest",
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    // testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    collectCoverage: true,
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        "node_modules/(?!(preact|preact/hooks)/)"
    ]
};

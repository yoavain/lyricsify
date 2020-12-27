module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: 'test/.*.(test|spec).tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js','jsx', 'json', 'node'],
    moduleNameMapper: {
        "^~root/(.*)": "<rootDir>/$1",
        "^~src/(.*)": "<rootDir>/src/$1",
        "^~components/(.*)": "<rootDir>/src/renderer/components/$1",
        "^~test/(.*)": "<rootDir>/test/$1",
        "^~resources/(.*)": "<rootDir>/resources/$1"
    },
    collectCoverage: true,
    coverageReporters: [
        "text",
        "text-summary",
        "json",
        "lcov",
        "clover"
    ],
    collectCoverageFrom: [
        "src/**/*"
    ],
    verbose: true
};

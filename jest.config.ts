import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        ".(css|less)$": "<rootDir>/test/__mocks__/style-mock.js"
    },
    testRegex: "test/.*.test.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
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

export default config;

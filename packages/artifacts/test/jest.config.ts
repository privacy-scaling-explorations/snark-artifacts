import { join } from 'node:path'
import type { JestConfigWithTsJest } from 'ts-jest'
//import preset from 'ts-jest/'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: join(__dirname, '..', 'coverage'),
  coverageThreshold: {
    global: { branches: 90, functions: 90, lines: 90, statements: 90 },
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'ts'],
}

export default config

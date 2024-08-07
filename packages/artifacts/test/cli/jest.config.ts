import type { JestConfigWithTsJest } from 'ts-jest'
import _sharedJestConf from '../../../../jest.config.ts'

const { collectCoverage, projects, ...sharedJestConf } = _sharedJestConf

const config: JestConfigWithTsJest = {
  ...sharedJestConf,
  displayName: 'cli',
  rootDir: '../..',
}

export default config

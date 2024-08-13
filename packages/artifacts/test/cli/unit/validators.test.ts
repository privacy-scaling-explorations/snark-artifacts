import { writeFileSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { CliError } from '../../../src/cli/errors'
import { validateFilePath, validateJsonFileInput, validateOrThrow } from '../../../src/cli/validators'

describe('validateFilePath', () => {
  it('should return true if the file exists', () => {
    expect(validateFilePath(__filename)).toBe(true)
  })

  it('should error message if the file does not exist', () => {
    expect(validateFilePath('non-existent-file.ts')).toEqual(CliError.FILE_DOES_NOT_EXIST)
  })
})

describe('validateJsonFileInput', () => {
  const jsonFile = 'file.json'
  afterAll(async () => {
    await rm(jsonFile).catch(() => {
      /* swallow */
    })
  })

  it('should return true if the file exists and has a .json extension', () => {
    writeFileSync(jsonFile, '')
    expect(validateJsonFileInput(jsonFile)).toBe(true)
  })

  it('should return CliError.FILE_DOES_NOT_EXIST if the file does not exist', () => {
    expect(validateJsonFileInput('non-existent.json')).toEqual(CliError.FILE_DOES_NOT_EXIST)
  })

  it('should return CliError.INVALID_JSON_FILE if the file does not have a .json extension', () => {
    expect(validateJsonFileInput('not-a-json-file.ts')).toEqual(CliError.INVALID_JSON_FILE)
  })
})

describe('validateOrThrow', () => {
  it('should throw an error if the validation function returns a string', () => {
    expect(() => validateOrThrow('non-existent.file.ts', validateFilePath)).toThrow(CliError.FILE_DOES_NOT_EXIST)
  })

  it('should not throw an error if the parameter is undefined', () => {
    expect(() => validateOrThrow(undefined, validateJsonFileInput)).not.toThrow()
  })
})

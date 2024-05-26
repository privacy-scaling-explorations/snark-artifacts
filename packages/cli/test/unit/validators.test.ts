import { writeFileSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { CliError } from '../../src/errors.ts'
import { validateCircomFileInput, validateFilePath, validateOrThrow } from '../../src/validators.ts'

describe('validateFilePath', () => {
  it('should return true if the file exists', () => {
    expect(validateFilePath(__filename)).toBe(true)
  })

  it('should error message if the file does not exist', () => {
    expect(validateFilePath('non-existent-file.ts')).toEqual(CliError.FILE_DOES_NOT_EXIST)
  })
})

describe('validateCircomFileInput', () => {
  const circomFile = 'circuit.circom'
  afterAll(async () => {
    await rm(circomFile).catch(() => {/* swallow */})
  })

  it('should return true if the file exists and has a .circom extension', () => {
    writeFileSync(circomFile, '')
    expect(validateCircomFileInput(circomFile)).toBe(true)
  })

  it('should return CliError.FILE_DOES_NOT_EXIST if the file does not exist', () => {
    expect(validateCircomFileInput('non-existent-circuit.circom')).toEqual(CliError.FILE_DOES_NOT_EXIST)
  })

  it('should return CliError.INVALID_CIRCOM_FILE if the file does not have a .circom extension', () => {
    expect(validateCircomFileInput('not-a-circom-file.ts')).toEqual(CliError.INVALID_CIRCOM_FILE)
  })
})

describe('validateOrThrow', () => {
  it('should throw an error if the validation function returns a string', () => {
    expect(() => validateOrThrow('non-existent.file.ts', validateFilePath)).toThrow(CliError.FILE_DOES_NOT_EXIST)
  })

  it('should not throw an error if the parameter is undefined', () => {
    expect(() => validateOrThrow(undefined, validateCircomFileInput)).not.toThrow()
  })
})

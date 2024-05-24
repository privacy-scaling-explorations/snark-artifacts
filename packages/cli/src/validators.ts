import { existsSync } from 'node:fs'
import { extname } from 'node:path'
import { CliError } from './errors.js'

export function validateFilePath(path: string) {
  if (!existsSync(path)) return CliError.FILE_DOES_NOT_EXIST
  return true
}

export function validateSourceInput(source: string) {
  validateFilePath(source)
  if (!(extname(source) === '.circom')) return CliError.INVALID_CIRCOM_FILE
  return true
}

export function validateOrThrow<T>(parameter: T | undefined, validate: (param: T) => boolean | CliError) {
  if (parameter !== undefined) {
    const trueOrError = validate(parameter)
    if (typeof trueOrError === 'string') throw new Error(trueOrError)
  }
}

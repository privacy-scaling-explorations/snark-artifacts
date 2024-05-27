import { type Project, projects } from '@zk-kit/artifacts'
import { existsSync } from 'node:fs'
import { extname } from 'node:path'
import { CliError } from './errors.ts'

export function validateFilePath(input: string) {
  if (!existsSync(input)) return CliError.FILE_DOES_NOT_EXIST
  return true
}

export function validateCircomFileInput(input: string) {
  if (!(extname(input) === '.circom')) return CliError.INVALID_CIRCOM_FILE
  return validateFilePath(input)
}

export const validateNonEmptyInput = (input: string | string[]) => {
  if (input.length === 0) return CliError.EMPTY
  return true
}

export const validateProject = (project: Project) => {
  if (!projects.includes(project)) return CliError.INVALID_PROJECT
  return true
}

export function validateOrThrow<T>(parameter: T | undefined, validate: (param: T) => boolean | CliError) {
  if (parameter !== undefined) {
    const trueOrError = validate(parameter)
    if (typeof trueOrError === 'string') throw new Error(trueOrError)
  }
}

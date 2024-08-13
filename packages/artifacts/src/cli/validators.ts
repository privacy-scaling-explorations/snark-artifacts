import { existsSync } from 'node:fs'
import { extname } from 'node:path'
import { type Project, projects } from '../projects'
import { CliError } from './errors'

export function validateFilePath(input: string) {
  if (!existsSync(input)) return CliError.FILE_DOES_NOT_EXIST
  return true
}

export function validateJsonFileInput(input: string) {
  if (!(extname(input) === '.json')) return CliError.INVALID_JSON_FILE
  return validateFilePath(input)
}

export function validateNonEmptyInput(input: string | string[]) {
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

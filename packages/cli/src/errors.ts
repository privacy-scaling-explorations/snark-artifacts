import chalk from 'chalk'

export enum CliError {
  EMPTY = 'Input cannot be empty, try again',
  INVALID_JSON_FILE = 'Invalid json file, try again',
  FILE_DOES_NOT_EXIST = 'File does not exist, try again',
  INVALID_PROJECT = 'Invalid project, try again',
  NOT_AN_INTEGER = 'Input must be an integer, try again',
}

export const error = (message: string) => {
  console.error(chalk.red(message))
}

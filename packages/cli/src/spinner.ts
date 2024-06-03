import { error } from 'node:console'
import ora from 'ora'

export const spinner = ora()

export async function withSpinner(fn: () => void | Promise<void>, message: string) {
  spinner.start(`Starting ${message}`)
  try {
    const res = fn()
    if (res instanceof Promise) await res
    spinner.succeed(`Done ${message}`)
  } catch (err) {
    spinner.fail(`Failed ${message}`)
    error(err.message)
  }
}

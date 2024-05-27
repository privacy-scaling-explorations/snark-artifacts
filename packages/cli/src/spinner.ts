import ora from 'ora'

export const spinner = ora()

export const withSpinner = (fn: (...args: any[]) => Promise<string>) => async (...args: any[]) => {
  spinner.start()
  try {
    const output = await fn(...args)
    spinner.succeed()
    console.log(output)
  } catch (error) {
    spinner.fail(error.message)
  }
}

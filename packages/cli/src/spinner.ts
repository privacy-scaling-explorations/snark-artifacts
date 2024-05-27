import ora from 'ora'

const spinner = ora()
export const withSpinner = (fn: () => Promise<string>) => async () => {
  spinner.start()
  try {
    const output = await fn()
    spinner.succeed()
    console.log(output)
  } catch (error) {
    spinner.fail(error.message)
  }
}

import input from '@inquirer/input'
import select from '@inquirer/select'
import { validateNonEmptyInput } from '../../../cli/validators'
import { projects as choices } from '../../../projects'

export const getProjectInput = async () =>
  select({
    message: 'Select a project:',
    choices: choices.map((project) => ({ name: project, value: project })),
  })

export const getParametersInput = async () => {
  const args = await input({
    message: 'Enter the arguments of the circuit you want to download artifacts for:',
    validate: validateNonEmptyInput,
  })
  return args.split(' ')
}

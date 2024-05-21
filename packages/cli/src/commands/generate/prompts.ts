import inquirer from 'inquirer'
import { existsSync } from 'node:fs'
import { basename, join } from 'node:path'
import { cwd } from 'node:process'
import { validateSourceInput } from './validators'

const getSourceInput = async (): Promise<string> => {
  const { source } = await inquirer.prompt([
    {
      type: 'input',
      name: 'source',
      message: 'Enter the source circom file path:',
      validate: input => validateSourceInput(input) || 'Invalid circom file path',
    },
  ])
  return source
}

const getDestinationInput = async (source: string): Promise<string> => {
  const { destination } = await inquirer.prompt([
    {
      type: 'input',
      name: 'destination',
      message: 'Enter the destination path for the generated artifacts:',
      default: () => {
        let filename = 'snark-artifacts'
        if (source) filename = `${basename(source, '.circom')}-${filename}`
        return join(cwd(), filename)
      },
      validate: input => existsSync(input) || 'Invalid destination path',
    },
  ])
  return destination
}

export { getDestinationInput, getSourceInput }

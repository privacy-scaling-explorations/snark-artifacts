import input from '@inquirer/input'
import { basename, join } from 'node:path'
import { cwd } from 'node:process'
import { validateCircomFileInput, validateFilePath, validateIntegerInput } from '../../validators.ts'

export const getSourceInput = async () =>
  input(
    {
      message: 'Enter the source circom file path:',
      validate: validateCircomFileInput,
    },
  )

export const getDestinationInput = async (source: string) => {
  let filename = 'snark-artifacts'
  if (source) filename = `${basename(source, '.circom')}-${filename}`
  const defaultPath = join(cwd(), filename)

  return input(
    {
      message: 'Enter the destination path for the generated artifacts:',
      default: defaultPath,
    },
  )
}

export const getPtauPowerInput = async () =>
  input(
    {
      message: 'Enter the power of two of the maximum number of constraints that the ceremony can accept:',
      default: '13',
      validate: validateIntegerInput,
    },
  )

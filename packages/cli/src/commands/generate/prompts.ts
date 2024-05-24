import { basename, join } from 'node:path'
import { cwd } from 'node:process'
import { prompt } from '../../utils.js'
import { validateFilePath, validateSourceInput } from '../../validators.js'

export const getSourceInput = async () =>
  prompt(
    {
      type: 'input',
      name: 'source',
      message: 'Enter the source circom file path:',
      validate: validateSourceInput,
    },
  )

export const getDestinationInput = async (source: string) =>
  prompt(
    {
      type: 'input',
      name: 'destination',
      message: 'Enter the destination path for the generated artifacts:',
      default: () => {
        let filename = 'snark-artifacts'
        if (source) filename = `${basename(source, '.circom')}-${filename}`
        return join(cwd(), filename)
      },
      validate: validateFilePath,
    },
  )

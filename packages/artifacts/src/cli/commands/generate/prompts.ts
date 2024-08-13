import input from '@inquirer/input'
import select from '@inquirer/select'
import { validateJsonFileInput } from '../../../cli/validators'

export const getCircomkitConfigInput = async () =>
  input({
    message: 'Enter the source circomkit file path:',
    default: 'circomkit.json',
    validate: validateJsonFileInput,
  })

export const getDestinationInput = async (defaultDestination: string) =>
  input({
    message: 'Enter the destination path for the generated artifacts:',
    default: defaultDestination,
  })

export const selectCircuit = async (circuits: string[]) =>
  select({
    message: 'Select the circuit to generate snark artifacts for:',
    choices: circuits.map((circuit) => ({ name: circuit, value: circuit })),
  })

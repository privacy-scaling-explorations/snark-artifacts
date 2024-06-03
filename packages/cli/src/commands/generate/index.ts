import { Command } from '@commander-js/extra-typings'
import generateAction from './action.ts'

export const generate = new Command('generate').alias('g').description(
  'Generate snark artifacts for a given source circom circuit',
).option(
  '-s, --source <path>',
  'Source circom file path',
)
  .option('-d, --destination <path>', 'Destination directory for the generated artifacts')
  .option(
    '-p, --ptau-power <power>',
    'Power of two of the maximum number of constraints that the ceremony can accept.',
  )
  .action(generateAction)

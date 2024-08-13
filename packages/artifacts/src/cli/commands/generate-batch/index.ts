import { Command } from '@commander-js/extra-typings'
import generateBatchAction from './action'

export const generateBatch = new Command('generate-batch')
  .alias('gb')
  .description('Generate snark artifacts for a list of circom circuits')
  .argument(
    '<optionsPath>',
    'Path to the options definition json file: { [circomkitJsonPath]: { circuit:string, params: string[][] }}',
  )
  .argument('<destination>', 'Destination directory for the generated artifacts')
  .action(generateBatchAction)

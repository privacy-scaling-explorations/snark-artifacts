import { Command } from '@commander-js/extra-typings'
import generateAction from './action'

export const generate = new Command('generate').alias('g').description(
  'Generate snark artifacts for a given source circom circuit',
).option(
  '-c, --config <path>',
  'Path to circomkit configuration file',
)
  .option('-d, --destination <path>', 'Destination directory for the generated artifacts')
  .argument('[circuit]', 'Circuit to generate snark artifacts for')
  .argument('[params...]', 'Circuit parameters override')
  .action(generateAction)

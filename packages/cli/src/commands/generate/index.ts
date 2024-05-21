import { Command } from '@commander-js/extra-typings'
import { existsSync } from 'node:fs'
import { exit } from 'node:process'
import { validateOrThrow } from '../../utils'
import { getDestinationInput, getSourceInput } from './prompts'
import { validateSourceInput } from './validators'

export default new Command('generate').description('Generate snark artifacts for a given source circom circuit').option(
  '-s, --source <path>',
  'Source circom file path',
)
  .option('-d, --destination <path>', 'Destination directory for the generated artifacts').action(
    async ({ destination, source }) => {
      try {
        validateOrThrow(source, validateSourceInput, 'Invalid circom file path')
        validateOrThrow(destination, existsSync, 'Invalid destination path')

        source ??= await getSourceInput()
        destination ??= await getDestinationInput(source)

        // TODO: ask for confirmation if destination already exists

        console.log('Generate project snark artifacts', { source, destination })
      } catch (error) {
        console.error(error.message)
        exit(1)
      }
    },
  )

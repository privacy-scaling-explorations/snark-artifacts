import { Command } from '@commander-js/extra-typings'
import { existsSync } from 'node:fs'
import { validateOrThrow, validateSourceInput } from 'validators'
import { getDestinationInput, getSourceInput } from './prompts'

export const generate = new Command('generate').alias('g').description(
  'Generate snark artifacts for a given source circom circuit',
).option(
  '-s, --source <path>',
  'Source circom file path',
)
  .option('-d, --destination <path>', 'Destination directory for the generated artifacts').action(
    async ({ destination, source }) => {
      console.log({ destination, source })
      validateOrThrow(source, validateSourceInput)
      validateOrThrow(destination, existsSync)

      source ??= await getSourceInput()
      destination ??= await getDestinationInput(source)

      // TODO: ask for confirmation if destination already exists

      console.log('Generate project snark artifacts', { source, destination })
    },
  )

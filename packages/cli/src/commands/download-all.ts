import { Argument, Command } from '@commander-js/extra-typings'

export const downloadAll = new Command('download-all').description(
  'Download all available artifacts for a given project',
)
  .addArgument(new Argument('<project>', 'Project name').choices(['semaphore', 'poseidon'] as const)) // TODO use Project enum
  .action(project => {
    console.log('Download all available artifacts for a given project', { project })
  })

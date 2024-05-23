import { Argument, Command } from '@commander-js/extra-typings'
import { projects } from '@zk-kit/artifacts'

export const downloadAll = new Command('download-all').description(
  'Download all available artifacts for a given project',
)
  .addArgument(new Argument('<project>', 'Project name').choices(projects))
  .action((project) => {
    // TODO prompt for inputs that were not provided
    // TODO: ask for confirmation if destination already exists
    console.log('Download all available artifacts for a given project', { project })
  })

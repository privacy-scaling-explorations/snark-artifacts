import { Argument, Command } from '@commander-js/extra-typings'
import { projects } from '@zk-kit/artifacts'

export const download = new Command('download').description('Download all available artifacts for a given project')
  .addArgument(new Argument('<project>', 'Project name').choices(projects))
  .option('-a,--args <args...>', 'Arguments of the circuit you want to generate artifacts for')
  .action((project, { args }) => {
    // TODO prompt for inputs that were not provided
    // TODO ask for confirmation if destination already exists
    // TODO download artifacts with maybeGetSnarkArtifacts from @zk-kit/artifacts
    console.log('Download artifacts for project:', project, 'with args:', args)
  })

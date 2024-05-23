import { Argument, Command } from '@commander-js/extra-typings'

export const download = new Command('download').description('Download all available artifacts for a given project')
  .addArgument(new Argument('<project>', 'Project name').choices(['semaphore', 'poseidon'] as const)) // TODO use Project enum
  .option('-a,--args <args...>', 'Arguments of the circuit you want to generate artifacts for')
  .action((project, { args }) => {
    // TODO prompts
    console.log('Download artifacts for project:', project, 'with args:', args)
  })

import { Argument, Command } from '@commander-js/extra-typings'
import { spinner } from 'cli/spinner'
import { validateNonEmptyInput, validateOrThrow, validateProject } from 'cli/validators'
import { maybeGetSnarkArtifacts } from 'index.node'
import { Project, projects } from 'projects'
import { getParametersInput, getProjectInput } from './prompts'

export const download = new Command('download').alias('d').description(
  'Download all available artifacts for a given project',
)
  .addArgument(new Argument('<project>', 'Project name').argOptional().choices(projects))
  .option('-p,--parameters <params...>', 'Parameters of the circuit you want to download artifacts for')
  .action(async (project, { parameters }) => {
    // TODO prompt for inputs that were not provided
    validateOrThrow(project, validateProject)
    project ??= await getProjectInput()

    if ([Project.SEMAPHORE, Project.POSEIDON].includes(project)) {
      validateOrThrow<string[]>(parameters, validateNonEmptyInput)
      parameters ??= await getParametersInput()
    }

    spinner.start()
    try {
      const { wasm, zkey } = await maybeGetSnarkArtifacts(project, { parameters })
      spinner.succeed()
      console.log(`Artifacts downloaded at:\n  ${wasm}\n  ${zkey}`)
    } catch (error) {
      spinner.fail(error.message)
    }
  })

import { Circomkit, type CircomkitConfig } from 'circomkit'
import { existsSync, readFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { chdir, cwd, exit } from 'node:process'
import { spinner } from '../../spinner.ts'
import { validateJsonFileInput, validateOrThrow } from '../../validators.ts'
import { getCircomkitConfigInput, getDestinationInput, selectCircuit } from './prompts.ts'

export async function setup(config: string, dirBuild: string) {
  const circomkitConfig = JSON.parse(readFileSync(config, 'utf8')) as CircomkitConfig
  chdir(dirname(config))
  const circuits = Object.keys(JSON.parse(readFileSync(circomkitConfig.circuits, 'utf8')))
  const circuit = await selectCircuit(circuits)
  const circomkit = new Circomkit({ ...JSON.parse(readFileSync(config, 'utf8')), dirBuild })

  return circomkit.setup(circuit)
}

async function generateAction(
  { config, destination }: { config?: string; destination?: string },
) {
  validateOrThrow(config, validateJsonFileInput)
  validateOrThrow(destination, existsSync)

  config ??= await getCircomkitConfigInput()
  const dirBuild = destination ?? await getDestinationInput(`${cwd()}/snark-artifacts`)
  await setup(config, dirBuild)
  spinner.succeed(`Snark artifacts generated successfully in ${dirBuild}`)
  exit(0)
}

export default generateAction

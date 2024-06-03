import { Circomkit, type CircomkitConfig } from 'circomkit'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { chdir, cwd } from 'node:process'
import { validateJsonFileInput, validateOrThrow } from '../../validators.ts'
import { getCircomkitConfigInput, getDestinationInput, selectCircuit } from './prompts.ts'

export async function setupCircomkit(config: string, destination?: string) {
  const circomkitConfig = JSON.parse(readFileSync(config, 'utf8')) as CircomkitConfig
  const localDir = cwd()
  chdir(dirname(config))
  const circuits = Object.keys(JSON.parse(readFileSync(circomkitConfig.circuits, 'utf8')))
  const circuit = await selectCircuit(circuits)
  const dirBuild = destination ?? await getDestinationInput(`${localDir}/${circuit}-snark-artifacts`)
  const circomkit = new Circomkit({ ...JSON.parse(readFileSync(config, 'utf8')), dirBuild })

  return { circomkit, circuit }
}

async function generateAction(
  { config, destination }: { config?: string; destination?: string },
) {
  validateOrThrow(config, validateJsonFileInput)
  validateOrThrow(destination, existsSync)

  config ??= await getCircomkitConfigInput()
  const { circomkit, circuit } = await setupCircomkit(config, destination)
  await circomkit.compile(circuit)
  const pkeyPath = await circomkit.ptau(circuit)
  await circomkit.vkey(circuit, join(dirname(config), pkeyPath))
}

export default generateAction

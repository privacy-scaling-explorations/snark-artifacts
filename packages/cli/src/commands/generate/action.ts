import { Circomkit, type CircomkitConfig, type CircuitConfig } from 'circomkit'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname } from 'node:path'
import { chdir, cwd, exit } from 'node:process'
import { spinner } from '../../spinner.ts'
import { validateJsonFileInput, validateOrThrow } from '../../validators.ts'
import { getCircomkitConfigInput, getDestinationInput, selectCircuit } from './prompts.ts'

async function setup(params: string[] | undefined, config: string, dirBuild: string) {
  // parse circomkit.json
  let circomkitConfig = JSON.parse(readFileSync(config, 'utf8')) as CircomkitConfig
  chdir(dirname(config))

  // parse circuits.json
  const circuitsConfig = JSON.parse(readFileSync(circomkitConfig.circuits, 'utf8')) as Record<string, CircuitConfig>
  const circuit = await selectCircuit(Object.keys(circuitsConfig))
  let { circuits } = circomkitConfig

  if (params !== undefined && params.length > 0) {
    circuits = `${tmpdir}/${[circuit, ...params, 'circuits'].join('-')}.json`
    dirBuild += `/${[circuit, ...params].join('-')}`
    writeFileSync(
      circuits,
      JSON.stringify({ ...circuitsConfig, [circuit]: { ...circuitsConfig[circuit], params } }),
      'utf8',
    )
  }

  // override circomkit config options
  circomkitConfig = { ...circomkitConfig, circuits, dirBuild }
  const circomkit = new Circomkit(circomkitConfig)
  return circomkit.setup(circuit)
}

async function generateAction(
  params: string[] | undefined,
  { config, destination }: { config?: string; destination?: string },
) {
  validateOrThrow(config, validateJsonFileInput)
  validateOrThrow(destination, existsSync)

  config ??= await getCircomkitConfigInput()
  const dirBuild = destination ?? await getDestinationInput(`${cwd()}/snark-artifacts`)
  await setup(params, config, dirBuild)
  spinner.succeed(`Snark artifacts generated successfully in ${dirBuild}`)
  exit(0)
}

export default generateAction

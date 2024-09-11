import { Circomkit, type CircomkitConfig, type CircuitConfig } from 'circomkit'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname } from 'node:path'
import { chdir, cwd, exit } from 'node:process'
import { Writable } from 'node:stream'
import { spinner } from '../../../cli/spinner'
import { validateJsonFileInput, validateOrThrow } from '../../../cli/validators'
import { getCircomkitConfigInput, getDestinationInput, selectCircuit } from './prompts'

class SilentStream extends Writable {
  _write(_chunk: any, _encoding: string, callback: () => void) {
    // Discard chunk
    callback()
  }
}

async function setup(circuit: string | undefined, params: string[] | undefined, config: string, dirBuild: string) {
  // parse circomkit.json
  let circomkitConfig = JSON.parse(readFileSync(config, 'utf8')) as CircomkitConfig
  chdir(dirname(config))

  // parse circuits.json
  const circuitsConfig = JSON.parse(readFileSync(circomkitConfig.circuits, 'utf8')) as Record<string, CircuitConfig>
  circuit ??= await selectCircuit(Object.keys(circuitsConfig))
  const { params: defaultParams } = circuitsConfig[circuit]!
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

  // temporarily redirect stdout to make all circomkit logs silent
  const write = process.stdout.write
  const silentStream = new SilentStream()
  // @ts-ignore
  process.stdout.write = silentStream.write.bind(silentStream)

  await circomkit.setup(circuit).finally(() => {
    process.stdout.write = write
  })

  return { circuit, params: params ?? defaultParams }
}

export async function generateActionNoExit(
  circuit: string | undefined,
  params: string[] | undefined,
  { config, destination }: { config?: string; destination?: string },
) {
  validateOrThrow(config, validateJsonFileInput)
  validateOrThrow(destination, existsSync)

  config ??= await getCircomkitConfigInput()
  destination ??= await getDestinationInput(`${cwd()}/snark-artifacts`)
  const result = await setup(circuit, params, config, destination)

  spinner.succeed(
    `Snark artifacts for ${circuit ?? result.circuit} with parameters ${
      params ?? result.params
    } generated successfully in ${destination}`,
  )
}

async function generateAction(...params: Parameters<typeof generateActionNoExit>) {
  await generateActionNoExit(...params)
  exit(0)
}

export default generateAction

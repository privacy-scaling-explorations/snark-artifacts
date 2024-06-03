import { Circomkit } from 'circomkit'
import { maybeDownload } from '@zk-kit/artifacts'
import { existsSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { withSpinner } from '../../spinner.ts'
import { validateCircomFileInput, validateIntegerInput, validateOrThrow } from '../../validators.ts'
import { getDestinationInput, getSourceInput } from './prompts.ts'

const circomkit = new Circomkit()

const ptau_url = (ptauPower: string) =>
  `https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_${ptauPower}.ptau`

const maybeDownloadPtau = async (ptauPower: string) =>
  withSpinner(async () => {
    await maybeDownload(ptau_url(ptauPower), `${tmpdir()}/powersOfTau28_hez_final_${ptauPower}.ptau`)
  }, 'downloading ptau file')

const compileCircuit = async (source: string, destination: string) =>
  withSpinner(async () => {
    // TODO handle cases where there is no circuits.json (src project does not use circomkit)
    await circomkit.compile(destination, {file:source})
  } , 'compiling circuit')

async function generateAction(
  { destination, ptauPower, source }: { destination?: string; ptauPower?: string; source?: string },
) {
  validateOrThrow(source, validateCircomFileInput)
  validateOrThrow(destination, existsSync)
  validateOrThrow(ptauPower, validateIntegerInput)

  source ??= await getSourceInput()
  destination ??= await getDestinationInput(source)

  mkdirSync(destination, { recursive: true })

  await compileCircuit(source, destination)

  // TODO: ask for confirmation if destination already exists

  console.log('Generate project snark artifacts', { source, destination })
}

export default generateAction

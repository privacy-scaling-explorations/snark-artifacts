import { maybeDownload } from '@zk-kit/artifacts'
import { existsSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { spinner } from '../../spinner.ts'
import { validateCircomFileInput, validateOrThrow } from '../../validators.ts'
import { getDestinationInput, getPtauPowerInput, getSourceInput } from './prompts.ts'

const ptau_url = (ptauPower: number) =>
  `https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_${ptauPower}.ptau`

async function generateAction(
  { destination, ptauPower, source }: { destination?: string; ptauPower?: string; source?: string },
) {
  validateOrThrow(source, validateCircomFileInput)
  validateOrThrow(destination, existsSync)

  source ??= await getSourceInput()
  console.log({ source })
  destination ??= await getDestinationInput(source)
  mkdirSync(destination, { recursive: true })
  const ptauPowerNumber = ptauPower ? Number.parseInt(ptauPower) : await getPtauPowerInput()

  spinner.start('Downloading ptau file')
  await maybeDownload(ptau_url(ptauPowerNumber), `${tmpdir()}/powersOfTau28_hez_final_${ptauPowerNumber}.ptau`)
  spinner.succeed('Downloaded ptau file')

  // TODO: ask for confirmation if destination already exists

  console.log('Generate project snark artifacts', { source, destination })
}

export default generateAction

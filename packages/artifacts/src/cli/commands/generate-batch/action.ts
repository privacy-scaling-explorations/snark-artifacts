import { readFileSync } from 'node:fs'
import { exit } from 'node:process'
import { spinner } from '../../../cli/spinner'
import { generateActionNoExit } from '../generate/action'

export default async function generateBatch(optionsPath: string, destination: string) {
  const options = JSON.parse(readFileSync(optionsPath, 'utf8')) as Record<
    string,
    { circuit: string; paramsList: string[][] }
  >

  spinner.start()
  for (const [config, { circuit, paramsList }] of Object.entries(options))
    for (const params of paramsList) await generateActionNoExit(circuit, params, { config, destination })

  spinner.succeed(`All snark artifacts generated successfully in ${destination}`)
  exit(0)
}

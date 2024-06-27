import { readFileSync } from 'node:fs'
import { exit } from 'node:process'
import { generateActionNoExit } from '../generate/action.ts'

export default async function generateBatch(optionsPath: string, destination: string) {
  const options = JSON.parse(readFileSync(optionsPath, 'utf8')) as Record<
    string,
    { circuit: string; paramsList: string[][] }
  >
  await Promise.all(
    Object.entries(options).flatMap(([config, { circuit, paramsList }]) => {
      paramsList.map(async (params) => {
        await generateActionNoExit(circuit, params, { config, destination })
      })
    }),
  )

  exit(0)
}
